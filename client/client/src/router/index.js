import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/user/:id',
    name: 'DetailUser',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && !localStorage.accesstoken) next({ path: '/login' })
  if (to.path === '/login' && localStorage.accesstoken) next({ path: '/', query: { error: 'already log in' } })
  else next()
})

export default router
