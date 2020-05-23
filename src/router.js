import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', redirect: 'notes' },
  { path: '/notes', name: 'notes', component: () => import('./views/notes.vue') },
  { path: '/notes/:id', name: 'note', component: () => import('./views/note.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
