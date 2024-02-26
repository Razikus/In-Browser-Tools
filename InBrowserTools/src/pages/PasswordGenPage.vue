<template>
  <q-page padding>
    <q-input label="Password generated" type="textarea" v-model="generatedPassword">

    </q-input>
    <q-slider v-model="characterLen" :min="5" :max="256" label switch-label-side />
    <q-input v-model="characterLen" type="number"></q-input>
    <q-toggle v-model="includeSpecialChars" label="Include Special Characters"></q-toggle>
    <q-input label="Basic Characters" v-model="basicChars"></q-input>
    <q-input label="Special Characters" v-model="specialChars"></q-input>
    <hr style="margin-top: 30px;" />
    <div style="margin-top: 30px;">
      <p>
        Batch generate passwords
      </p>
      <q-slider v-model="batchgen" :min="1" :max="100" label switch-label-side />
      <p v-for="password in batchGenerated" :key="password"><q-btn label="COPY" @click="copyPassword(password)"
          color="primary"></q-btn><span style="margin-left: 20px;">{{ password }}</span> </p>
    </div>


  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  watch: {
    characterLen(newVal) {
      this.generatedPassword = this.generatePassword()
      this.batchGenNow()
    },
    includeSpecialChars(newVal) {
      this.generatedPassword = this.generatePassword()
      this.batchGenNow()
    },
    basicChars(newVal) {
      this.generatedPassword = this.generatePassword()
      this.batchGenNow()
    },
    specialChars(newVal) {
      this.generatedPassword = this.generatePassword()
      this.batchGenNow()
    },
    batchgen(newVal) {
      this.batchGenNow()
    }
  },
  mounted() {
    this.generatedPassword = this.generatePassword()
    this.batchGenNow()
  },
  methods: {
    copyPassword(what) {
      navigator.clipboard.writeText(what)
      this.$q.notify({
        message: 'Password copied to clipboard',
        color: 'positive',
        position: 'top'
      })
    },
    batchGenNow() {
      this.batchGenerated = []
      for (let i = 0; i < this.batchgen; i++) {
        this.batchGenerated.push(this.generatePassword())
      }
    },
    generatePassword() {
      let length = this.characterLen
      let characters = this.basicChars + (this.includeSpecialChars ? this.specialChars : "");
      return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => characters[x % characters.length])
        .join('')
    },
  },
  setup() {
    let $q = useQuasar()
    return {
      $q: $q,
      characterLen: ref(64),
      generatedPassword: ref(""),
      includeSpecialChars: ref(true),
      basicChars: ref("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),
      specialChars: ref(")(*&^%$#@!~!@-#$"),
      batchGenerated: ref([]),
      batchgen: ref(50)
    }
  }
}
</script>
