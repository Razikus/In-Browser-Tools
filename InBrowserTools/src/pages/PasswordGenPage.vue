<template>
  <q-page padding>
    <q-input label="Password generated" type="textarea" v-model="generatedPassword">

    </q-input>
    <q-slider v-model="characterLen" :min="5" :max="256" label switch-label-side />
    <q-input v-model="characterLen" type="number"></q-input>
    <q-toggle v-model="includeSpecialChars" label="Include Special Characters"></q-toggle>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  watch: {
    characterLen(newVal) {
      this.generatedPassword = this.generatePassword()
    },
    includeSpecialChars(newVal) {
      this.generatedPassword = this.generatePassword()
    }
  },
  mounted() {
    this.generatedPassword = this.generatePassword()
  },
  methods: {
    generatePassword() {
      let length = this.characterLen
      let basicChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let specialChars = ")(*&^%$#@!~!@-#$";
      let characters = basicChars + (this.includeSpecialChars ? specialChars : "");
      return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => characters[x % characters.length])
        .join('')
    },
  },
  setup() {
    return {
      characterLen: ref(64),
      generatedPassword: ref(""),
      includeSpecialChars: ref(true)
    }
  }
}
</script>
