<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import { useAdminsStore } from "@/stores/admins/admins";
const { adminRole } = storeToRefs(useAdminsStore());

// Marshrutlar ro'yxati
const routes = [
  {
    name: "Dashboard",
    position: true,
    path: "/dashboard",
    icon: "fa-solid fa-house",
  },
  {
    name: "Sotuv bo'limi",
    position: true,
    path: "/sale",
    icon: "fa-solid fa-tags",
  },
  {
    name: "Sarmoya",
    position: true,
    path: "/invest",
    icon: "fa-solid fa-chart-simple",
  },
  {
    name: "Qavat",
    position: true,
    path: "/floor",
    icon: "fa-solid fa-arrow-right-to-city",
  },
  {
    name: "Ishchilar",
    position: true,
    path: "/workers",
    icon: "fa-solid fa-user",
  },
  {
    name: "Oylik maosh",
    position: true,
    path: "/salary",
    icon: "fa-solid fa-sack-dollar",
  },
  {
    name: "Katlavan",
    position: true,
    path: "/katlavan",
    icon: "fa-solid fa-layer-group",
  },
  { name: "Podval", path: "/podval", icon: "fa-solid fa-store" },
  {
    name: "Boshqalar",
    position: true,
    path: "/exit",
    icon: "fa-solid fa-file-lines",
  },
  {
    name: "Sozlamalar",
    position: true,
    path: "/signin",
    icon: "fa-solid fa-gear",
  },
  // Qo'shimcha marshrutlar qo'shishingiz mumkin
];
const managerRoutes = [
  { name: "Sotuv bo'limi", path: "/sale", icon: "fa-solid fa-tags" },
  { name: "Qavat", path: "/floor", icon: "fa-solid fa-arrow-right-to-city" },
  { name: "Podval", path: "/podval", icon: "fa-solid fa-store" },
];

// Hozirgi marshrutni olish
const router = useRoute();

// Faol marshrutni tekshirish
const isActiveRoute = (path) => {
  return router.path === path;
};

onMounted(async () => {
  await useAuthStore().checkAdmin();
});
</script>

<template>
  <div class="sidebar pt-8 h-full rounded-xl bg-white">
    <div class="pb-5 text-2xl text-center font-extrabold border-b">
      <i class="fa-solid fa-hashtag"></i> ZAVQI UI
    </div>
    <ul
      v-if="adminRole == 'admin' || adminRole == 'director'"
      class="admin-list mt-10 ml-10 flex flex-col gap-6"
    >
      <li v-for="(route, index) in routes" :key="index">
        <router-link
          :to="route.path"
          :class="{ active: isActiveRoute(route.path) }"
        >
          <div class="flex items-center gap-3">
            <i :class="`${route.icon} text-[22px]`"></i>
            <span class="text-[18px]">{{ route.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <ul v-else class="mt-10 ml-10 flex flex-col gap-6">
      <li v-for="(route, index) in managerRoutes" :key="index">
        <router-link
          :to="route.path"
          :class="{ active: isActiveRoute(route.path) }"
        >
          <div class="flex items-center gap-3">
            <i :class="`${route.icon} text-[22px]`"></i>
            <span class="text-[18px]">{{ route.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar ul {
  height: 100%;
  position: relative;
  list-style-type: none;
  padding: 0;
}

.sidebar .admin-list li {
  color: #7a7f90;
  &:last-child {
    position: absolute;
    bottom: 120px;
  }
}

.sidebar ul li .active {
  color: #2b3674; /* Aktiv holat uchun rang */
  font-weight: 600;
  i {
    color: #603cff;
  }
}
</style>
