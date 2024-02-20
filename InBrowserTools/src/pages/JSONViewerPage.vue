<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-input filled v-model="jsonInput" label="Enter JSON" debounce="500" type="textarea" hint="Input valid JSON" />
    </div>
  <JsonEditorVue
  style="max-height: 512px;"
    v-model="prettyJson"
    v-bind="{/* local props & attrs */}"
  />
  </q-page>
</template>

<script>
import JsonEditorVue from 'json-editor-vue'
import { ref } from 'vue'
export default {
  name: 'ExamplePage',
  components: {
    JsonEditorVue
  },
  watch: {
    jsonInput() {
      this.updateJson()
    }
  },
  data() {
    return {
      jsonInput: ref(''),
      prettyJson: ref({}),
    }
  },
  methods: {
    updateJson() {
      try {
        this.prettyJson = JSON.parse(this.jsonInput.trim());
      } catch (e) {
        console.log(e)
        this.prettyJson = {}
      }
    }
  }
}
</script>

<style>
/* Optional: Add some styles if needed */
</style>
