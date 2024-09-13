<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/layout/sidebar.vue";
import hero from "@/components/layout/hero.vue";
</script>

<template>
  <div class="bg-[#F7F9FC]">
    <div class="max-w-[1920px] m-auto flex">
      <div class="w-[330px] h-screen p-5 sticky top-0 overflow-hidden">
        <Sidebar />
      </div>
      <div class="route p-5 w-full">
        <hero class="mb-10" />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.route {
  width: calc(100% - 330px);
}
</style>
