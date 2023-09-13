import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/playVideo/dash',
    name: 'playDashVideo',
    component: () => import('@/views/0_playDashVideo/index.vue')
  },
  {
    path: '/webCodecs/decode/video',
    name: 'decodeVideo',
    component: () => import('@/views/1_decodeMp4Video/index.vue')
  },
  {
    path: '/webCodecs/create/video',
    name: 'createVideo',
    component: () => import('@/views/2_createMp4Video/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
