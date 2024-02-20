<template>
  <q-page class="flex flex-center">
    <div class="row justify-center">
      <div class="col-12 row justify-center">
        <q-img src="~/assets/logo.png" width="318px"></q-img>

      </div>
      <div class="col-12 row justify-center" style="margin-top: 10px;">
        There is no analytics involved on this application. Feel free and safe to use it. No external server is involved.
      </div>
      <div style="font-size:24px">
        No shitty ads, no privacy concerns, no tracking, no cookies, no external server, <span  style="font-size: 26px; color: rgb(21, 255, 44);">no bullshit</span>.
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
