<template>
  <q-page padding>
    <q-input label="Base64 Input" type="textarea" v-model="inputOriginal">

    </q-input>
    <q-input label="Base64 Output" type="textarea" :error="decodeError" v-model="outputOriginal">

    </q-input>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  watch: {
    inputOriginal(newValue) {
      this.outputOriginal = btoa(newValue)
    },
    outputOriginal(newValue) {
      try {
        this.inputOriginal = atob(newValue)
        this.decodeError = false
      } catch(err) {
        this.decodeError = true
      }      
    }
  },
  computed: {

  },
  setup() {
    return {
      inputOriginal: ref(''),
      outputOriginal: ref(''),
      decodeError: ref(false)
    }
  }
}
</script>
