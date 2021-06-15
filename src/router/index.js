import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import('../views/Survey.vue')
  },
  {
    path: '/license',
    name: 'LicenseList',
    component: () => import('../views/LicenseList.vue')
  },
  {
    path: '*',
    redirect: { name: '404' }
  },
  {
    path: '/404',
    name: '404',
    alias: '*',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
