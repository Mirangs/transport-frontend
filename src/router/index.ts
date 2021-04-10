import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/transport',
    name: 'Transport',
    component: () => import(/* webpackChunkName: "transport" */ '../views/Transport.vue'),
  },
  {
    path: '/route',
    name: 'Route',
    component: () => import(/* webpackChunkName: "route" */ '../views/Route.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
