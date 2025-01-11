import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth";

const salePages = [
  {
    path: "/sale/homes",
    component: () => import("@/pages/sale/homes.vue"),
    meta: { secure: true },
  },
  {
    path: "/sale/clients",
    component: () => import("@/pages/sale/clients.vue"),
    meta: { secure: true },
  },
  {
    path: "/sale/contracts",
    component: () => import("@/pages/sale/contracts.vue"),
    meta: { secure: true },
  },
  {
    path: "/sale/contracts/:id",
    component: () => import("@/pages/sale/contract-detail.vue"),
    meta: { secure: true },
  },
]

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
          path: "/sale",
          component: () => import("@/pages/sale.vue"),
          meta: { secure: true },
        },
        {
          path: "/invest",
          component: () => import("@/pages/invest.vue"),
          meta: { secure: true, position: true },
        },
        {
          path: "/floor",
          component: () => import("@/pages/floor.vue"),
          meta: { secure: true },
        },
        {
          path: "/floor/:id",
          component: () => import("@/pages/more/floor-detail.vue"),
          meta: { secure: true },
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
        ...salePages
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
