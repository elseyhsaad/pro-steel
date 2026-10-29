
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './v2.css'
import './home-v3.css'

const paths = [
  '',
  'about',
  'partners',
  'experience',
  'products',
  'products/:id',
  'services',
  'markets',
  'markets/saudi-arabia',
  'markets/china',
  'markets/turkiye',
  'markets/syria',
  'markets/algeria',
  'quote',
  'contact'
]

const routes = paths.flatMap(path =>
  ['en', 'ar', 'tr'].map(lang => ({
    path: `/${lang}/${path}`,
    component: App,
    meta: {
      lang,
      page: path || 'home'
    }
  }))
)

routes.push(
  { path: '/', redirect: '/en/' },
  { path: '/:pathMatch(.*)*', redirect: '/en/' }
)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
