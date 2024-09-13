import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import { useAdminsStore } from "@/stores/admins/admins";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/layout/default.vue"),
      children: [
        {
          path: "/dashboard",
          component: () => import("@/pages/dashboard.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/invest",
          component: () => import("@/pages/invest.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/workers",
          component: () => import("@/pages/workers.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/salary",
          component: () => import("@/pages/salary.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/katlavan",
          component: () => import("@/pages/katlavan.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/podval",
          component: () => import("@/pages/podval.vue"),
          meta: { secure: true },
        },
        {
          path: "/exit",
          component: () => import("@/pages/exit.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/signin",
          component: () => import("@/pages/sign-in.vue"),
          meta: { secure: true, position: true },
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/layout/auth.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.secure) {
    useAuthStore().checkUser();
  }
  if (to.meta.secure && to.meta.position) {
    useAuthStore().checkAdmin();
  }
  next();
});

export default router;
