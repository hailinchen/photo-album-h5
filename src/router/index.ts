import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/postDetail/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  Vue.prototype.beforeRouter = from
  next()
})

export default router
