<template>
  <div class="sidebar pt-8 h-full rounded-xl bg-white">
    <div class="pb-5 text-2xl text-center font-extrabold border-b">ZAVQI UI</div>
    <ul class="mt-10 ml-10 flex flex-col gap-5">
      <li v-for="(route, index) in routes" :key="index">
        <router-link
          :to="route.path"
          :class="{ active: isActiveRoute(route.path) }"
        >
          <div class="flex items-center gap-4">
            <i :class="`${route.icon} text-[22px]`"></i>
            <span class="text-[18px]">{{ route.name }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

// Marshrutlar ro'yxati
const routes = [
  { name: "Dashboard", path: "/dashboard", icon: "fa-solid fa-house" },
  { name: "Sarmoya", path: "/invest", icon: "fa-solid fa-chart-simple" },
  { name: "Ishchilar", path: "/workers", icon: "fa-solid fa-user" },
  { name: "Oylish maosh", path: "/salary", icon: "fa-solid fa-sack-dollar" },
  { name: "Katlavan", path: "/katlavan", icon: "fa-solid fa-trowel-bricks" },
  { name: "Podval", path: "/podval", icon: "fa-solid fa-person-digging" },
  { name: "Sign in", path: "/signin", icon: "fa-solid fa-lock" },
  // Qo'shimcha marshrutlar qo'shishingiz mumkin
];

// Hozirgi marshrutni olish
const route = useRoute();

// Faol marshrutni tekshirish
const isActiveRoute = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  color: #7a7f90;
}

.sidebar ul li .active {
  color: #2b3674; /* Aktiv holat uchun rang */
  font-weight: 600;
  i {
    color: #603cff;
  }
}
</style>
