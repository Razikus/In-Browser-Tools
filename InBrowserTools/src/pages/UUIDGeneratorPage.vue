<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-select v-model="selectedVersion" emit-value :options="uuidVersions" label="Select UUID version" />
      <q-btn color="primary" @click="generateUUID" label="Generate UUID" class="q-ma-md"/>
      <q-input style="font-size: 30px;" v-model="uuid" label="Generated UUID" readonly />
      <q-btn color="primary" @click="copyUUID" icon="content_copy" class="q-ma-md" :disable="!uuid">Copy</q-btn>

      <div class="q-mt-lg">
        <q-slider v-model="batchSize" :min="1" :max="1000" label="Batch Size" />
        <q-btn color="primary" @click="generateBatchUUID" :label="'Generate Batch UUID: ' + batchSize" class="q-ma-md"/>
        <q-btn color="primary" @click="copyBatchUUID" icon="content_copy" class="q-ml-md" :disable="batchUUIDs.length === 0">Copy Batch</q-btn>
        <q-btn color="primary" @click="copyBatchUUIDAsJSON" icon="content_copy" class="q-ml-md" :disable="batchUUIDs.length === 0">Copy as Json Array</q-btn>
        <div v-for="(uuid, index) in batchUUIDs" :key="index" class="q-mt-md">{{ uuid }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
import { uuidv7 } from 'uuidv7';

export default {
  name: 'UuidGeneratorPage',
  watch: {
    batchSize() {
      this.generateBatchUUID();
    }
  },
  setup() {
    const selectedVersion = ref('v4');
    const uuid = ref(uuidv4());
    const batchUUIDs = ref([]);
    const batchSize = ref(1);
    const uuidVersions = [
      { label: 'UUID v1', value: 'v1' },
      { label: 'UUID v4', value: 'v4' },
      { label: 'UUID v7', value: 'v7' }
    ];

    const generateUUID = () => {
      switch (selectedVersion.value) {
        case 'v1':
          uuid.value = uuidv1();
          break;
        case 'v4':
          uuid.value = uuidv4();
          break;
        case 'v7':
          uuid.value = uuidv7();
          break;
      }
    };

    const copyUUID = async () => {
      if (uuid.value) {
        await navigator.clipboard.writeText(uuid.value);
      }
    };

    const generateBatchUUID = () => {
      batchUUIDs.value = [];
      for (let i = 0; i < batchSize.value; i++) {
        switch (selectedVersion.value) {
          case 'v1':
            batchUUIDs.value.push(uuidv1());
            break;
          case 'v4':
            batchUUIDs.value.push(uuidv4());
            break;
          case 'v7':
            batchUUIDs.value.push(uuidv7());
            break;
        }
      }
    };
    

    const copyBatchUUID = async () => {
      if (batchUUIDs.value.length > 0) {
        await navigator.clipboard.writeText(batchUUIDs.value.join('\n'));
        alert('Batch UUIDs copied to clipboard!');
      }
    };
    

    const copyBatchUUIDAsJSON = async () => {
      if (batchUUIDs.value.length > 0) {
        await navigator.clipboard.writeText(JSON.stringify(batchUUIDs.value));
        alert('Batch UUIDs copied to clipboard!');
      }
    };

    return { selectedVersion, copyBatchUUIDAsJSON, uuid, uuidVersions, generateUUID, copyUUID, batchUUIDs, batchSize, generateBatchUUID, copyBatchUUID };
  },
};
</script>
