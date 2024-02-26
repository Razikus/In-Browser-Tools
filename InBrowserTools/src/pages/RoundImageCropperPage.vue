<template>
  <q-page padding>
    <q-file v-model="file" label="Select an image" accept="image/*" />
    <q-input label="Resolution X * X" v-model="xresolution" type="number"></q-input>
    <div style="max-width: 80%;">
      <canvas ref="canvas" width="300" height="300"></canvas>
    </div>
    <div>
      <q-btn color="primary" id="button" label="Crop (after that right click on image and save as)" @click="cropImage" />
    </div>
    <div id="result">


    </div>
  </q-page>
</template>

<script>

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { ref } from 'vue';

export default {
  setup() {
    return {
      file: ref(null),
      cropper: ref(null),
      croppable: ref(false),
      xresolution: ref(512)
    }
  },
  watch: {
    file() {
      this.loadFileToCanvas();
    },
    xresolution(newResolution) {
      this.setNewResolution(newResolution)
    }
  },
  methods: {
    async setNewResolution(newResolution) {

      let x = this.cropper.setData({
        width: Number(newResolution)
      })

    },
    loadFileToCanvas() {
      var reader = new FileReader();
      reader.onload = (e) => {
        var image = this.$refs.canvas
        let context = image.getContext('2d');
        let loadedImage = new Image()
        loadedImage.onload = () => {
          this.$refs.canvas.width = loadedImage.width;
          this.$refs.canvas.height = loadedImage.height;
          context.drawImage(loadedImage, 0, 0);
          let image = this.$refs.canvas;
          var cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            ready: () => {
              this.croppable = true;
            },
          });
          this.cropper = cropper;
        }
        loadedImage.src = e.target.result;
      }
      reader.readAsDataURL(this.file);
    },
    cropImage() {
      var croppedCanvas;
      var roundedCanvas;
      var roundedImage;

      if (!this.croppable) {
        return;
      }

      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();

      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);

      // Show
      roundedImage = document.createElement('img');
      roundedImage.src = roundedCanvas.toDataURL()
      let result = document.getElementById('result');
      result.innerHTML = '';
      result.appendChild(roundedImage);

    },

    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      return canvas;
    }
  },
}
</script>

<style>
.cropper-view-box,
.cropper-face {
  border-radius: 50%;
}

/* The css styles for `outline` do not follow `border-radius` on iOS/Safari (#979). */
.cropper-view-box {
  outline: 0;
  box-shadow: 0 0 0 1px #39f;
}
</style>