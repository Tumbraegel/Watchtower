import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/me',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/film/:id',
    name: 'film',
    component: () => import('../views/Film.vue'),
  },
  {
    path: '/genre',
    name: 'genre',
    component: () => import('../views/Genre.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/Statistics.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/Error.vue'),
  },
  {
    path: '/search-results',
    name: 'searchResults',
    component: () => import('../views/SearchResults.vue'),
  },
  {
    path: '/advanced-search',
    name: 'advancedSearch',
    component: () => import('../views/AdvancedSearch.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
