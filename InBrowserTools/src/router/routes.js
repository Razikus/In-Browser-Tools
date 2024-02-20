
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'base64', component: () => import('pages/Base64Page.vue') },
      { path: 'passwordgen', component: () => import('pages/PasswordGenPage.vue') },
      { path: 'webptojpeg', component: () => import('pages/WebpToJPEGPage.vue') },
      { path: 'json', component: () => import('pages/JSONViewerPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
