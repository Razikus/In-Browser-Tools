<template>
  <q-page padding>
    <p>
      All this conversion runs in your browser. It can be quite heavy for your computer to handle.
    </p>
    <q-file v-model="selectedFile" filled use-chips label="Select video" />
    <div v-if="video"><video controls :src="video" />
      <p>VIDEO LOADED. CLICK START EVEN IF THERE IS NO PREVIEW</p>
    </div>
    <q-btn :disabled="!video" class="q-mt-md" color="primary" @click="transcode" label="Start" /> <q-input style="display: inline-block; width: 512px;" hint="Do not change if you don't know what you do. These are ffmpeg arguments. input.avi and output.mp4 must be same" v-model="args"></q-input>
    <q-banner class="q-mt-md" dense inline-actions>
      {{ message }}
    </q-banner>
    <div v-if="videoConverted"><video  controls :src="videoConverted" />
      <p>Right click and save video as</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  watch: {
    selectedFile: function (val) {
      this.onVideoSelect(val)
    }
  },
  setup() {
    const $q = useQuasar()
    const ffmpeg = new FFmpeg()
    const message = ref('Load video first. Click Start to transcode.')
    const video = ref('')
    const args = ref('-i input.avi output.mp4')

    const videoConverted = ref('')
    const selectedFile = ref(null)

    async function onVideoSelect(file) {
      if (file) {
        video.value = URL.createObjectURL(file)
        message.value = 'Video selected. Click Start to transcode.'
      }
    }
    function parse_cmdline(cmdline) {
      var re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;
      var next_arg = ['', '', cmdline];
      var args = [];
      while (next_arg = re_next_arg.exec(next_arg[2])) {
        var quoted_arg = next_arg[1];
        var unquoted_arg = "";
        while (quoted_arg.length > 0) {
          if (/^"/.test(quoted_arg)) {
            var quoted_part = /^"((?:\\.|[^"])*)"(.*)$/.exec(quoted_arg);
            unquoted_arg += quoted_part[1].replace(/\\(.)/g, "$1");
            quoted_arg = quoted_part[2];
          } else if (/^'/.test(quoted_arg)) {
            var quoted_part = /^'([^']*)'(.*)$/.exec(quoted_arg);
            unquoted_arg += quoted_part[1];
            quoted_arg = quoted_part[2];
          } else if (/^\\/.test(quoted_arg)) {
            unquoted_arg += quoted_arg[1];
            quoted_arg = quoted_arg.substring(2);
          } else {
            unquoted_arg += quoted_arg[0];
            quoted_arg = quoted_arg.substring(1);
          }
        }
        args[args.length] = unquoted_arg;
      }
      return args;
    }

    async function transcode() {
      const baseURL = window.location.origin + window.location.pathname
      if (!selectedFile.value || selectedFile.value.length === 0) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Please select a video file first.',
        })
        return
      }

      message.value = 'Loading ffmpeg-core'
      ffmpeg.on('log', ({ message: msg }) => {
        message.value = "FROM FFMPEG: " + msg
      })

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
      })
      message.value = 'Transcording started'
      let ss = await fetchFile(video.value)
      await ffmpeg.writeFile('input.avi', await fetchFile(video.value))
      let parsedArgs = parse_cmdline(args.value)
      await ffmpeg.exec(parsedArgs)
      message.value = 'Completed transcoding'
      const data = await ffmpeg.readFile('output.mp4')
      videoConverted.value = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    }

    return {
      video,
      selectedFile,
      message,
      transcode,
      onVideoSelect,
      videoConverted,
      args
    }
  }
})
</script>
