import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/postDetail/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue'),
  },
  {
    path: '/album',
    name: 'AlbumList',
    component: () => import('../views/AlbumList.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue'),
    meta: {
      keepAlive: true,
    },
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  Vue.prototype.beforeRouter = from
  next()
})

export default router
