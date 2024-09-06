import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: ()=> import('@/layout/default.vue'),
      children: [
        {
          path: '/dashboard',
          component: ()=> import('@/pages/dashboard.vue'),
          meta: {secure: true}
        },
        {
          path: '/invest',
          component: ()=> import('@/pages/invest.vue'),
          meta: {secure: true}
        },
        {
          path: '/workers',
          component: ()=> import('@/pages/workers.vue'),
          meta: {secure: true}
        },
        {
          path: '/salary',
          component: ()=> import('@/pages/salary.vue'),
          meta: {secure: true}
        },
        {
          path: '/katlavan',
          component: ()=> import('@/pages/katlavan.vue'),
          meta: {secure: true}
        },
        {
          path: '/podval',
          component: ()=> import('@/pages/podval.vue'),
          meta: {secure: true}
        },
        {
          path: '/signin',
          component: ()=> import('@/pages/sign-in.vue'),
          meta: {secure: true}
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=> import("@/layout/auth.vue"),
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/signin') {
    useAuthStore().checkAdmin()
  }
  if (to.meta.secure) {
    useAuthStore().checkUser()
  }
  next()
})

export default router
