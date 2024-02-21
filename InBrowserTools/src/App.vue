<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

window.HTMLElement = HTMLElement

export default defineComponent({
  name: 'App'
})
</script>
