<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          In Browser Tools

        </q-toolbar-title>
        <div>By Adam Raźniewski <q-btn href="https://www.linkedin.com/in/razniewski/" size="sm" dense flat
            icon="fa-brands fa-linkedin-in" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

        <hr/>
        <q-item clickable href="https://github.com/Razikus/In-Browser-Tools/issues">
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Request other tool</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable href="/sbom.json">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-list" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Grab SBOM</q-item-label>
          <q-item-label  caption>Software Bill of Materials - sbom.sh</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Base64 decoder/encoder',
    caption: '',
    icon: 'school',
    link: '/base64'
  },
  {
    title: 'Offline password generator',
    caption: '',
    icon: 'lock',
    link: '/passwordgen'
  },
  {
    title: 'WEBP to JPEG/PNG',
    caption: '',
    icon: 'image',
    link: '/webptojpeg'
  },
  {
    title: 'JSON viewer',
    caption: '',
    icon: 'code',
    link: '/json'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
