<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-file
        v-model="uploadedFile"
        label="Upload your WebP image"
        filled
      ></q-file>
    </div>
    <div class="q-pa-md" v-if="imageUrl">
      <q-img :src="imageUrl" alt="Preview" />
    </div>
    <div class="q-pa-md" v-if="imageUrl">
      <q-btn label="Download JPG" @click="downloadImage"></q-btn>
      <q-btn label="Download PNG" @click="downloadPNG"></q-btn>
    </div>
  </q-page>
</template>

<script>

import { ref } from 'vue';

export default {
  data() {
    return {
      uploadedFile: ref(null),
      imageUrl: ref(''),
    };
  },
  watch: {
    uploadedFile() {
      this.previewImage();
    },
  },
  methods: {
    previewImage() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.uploadedFile);
      fileReader.onload = (e) => {
        console.log(e);
        this.imageUrl = e.target.result;
        // This assumes the image is immediately in a displayable format,
        // for conversion functionality, you might need additional steps here.
      };
    },
    downloadImage() {
      if (!this.imageUrl) return;

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        // Convert and trigger download
        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'converted-image.jpg'; // Name of the downloaded file
          link.click();
          URL.revokeObjectURL(link.href); // Clean up
        }, 'image/jpeg');
      };
      image.src = this.imageUrl;
    },
    downloadPNG() {
      if (!this.imageUrl) return;

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        // Convert and trigger download
        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'converted-image.png'; // Name of the downloaded file
          link.click();
          URL.revokeObjectURL(link.href); // Clean up
        }, 'image/png');
      };
      image.src = this.imageUrl;
    },
  },
}
</script>
