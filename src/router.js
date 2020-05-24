import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', redirect: 'notes' },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('./views/notes.vue'),
    meta: {
      title: 'Список заметок',
      metaTags: [
        {
          name: 'description',
          content: 'Создавайте и редактируйте, сортируйте ваши заметки'
        }
      ],
      head1: 'Список',
      head2: 'Заметок'
    }
  },
  {
    path: '/notes/add',
    name: 'note-add',
    component: () => import('./views/note.vue'),
    meta: {
      title: 'Новая заметка',
      metaTags: [
        {
          name: 'description',
          content: 'Создание вашей заметки со списком задач'
        }
      ]
    }
  },
  {
    path: '/notes/:id',
    name: 'note-edit',
    component: () => import('./views/note.vue'),
    meta: {
      title: 'Заметка',
      metaTags: [
        {
          name: 'description',
          content: 'Тут можно удобно отредактировать заметку и добавить в нее список задач'
        }
      ],
      head1: 'Заметка'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Updating Page Title & Metadata with Vue.js & vue-router
// https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title + (to.params && to.params.id ? '   #' + to.params.id : '') + ' | Тестовое задание'
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
