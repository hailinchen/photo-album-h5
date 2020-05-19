import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: {
      keepAlive: true,
      showFooter: true,
    },
  },
  {
    path: '/postDetail/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue'),
    meta: {
      showFooter: false
    }
  },
  {
    path: '/album',
    name: 'AlbumList',
    component: () => import('../views/AlbumList.vue'),
    meta: {
      keepAlive: true,
      showFooter: true,
    },
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue'),
    meta: {
      keepAlive: true,
      showFooter: true,
    },
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  Vue.prototype.beforeRouter = from
  console.log(to)
  next()
})

export default router
