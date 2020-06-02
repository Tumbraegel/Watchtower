import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/film/:id',
    name: 'film',
    component: () => import('../views/Film.vue')
  },
  {
    path: '/genre',
    name: 'genre',
    component: () => import('../views/Genre.vue')
  },
  {
    path: '/user/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
