<script setup>
import router from "@/router";

import Button from "@/components/ui/button/Button.vue";

const nextPage = (val) => {
  router.push(`/sale/${val}`);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Sotuv bo'limi</div>
    <Button
      class="bg-white text-black shadow-md shadow-black/50 hover:text-white hover:translate-x-2 transition-all"
      @click="nextPage('homes')"
      >Uy <i class="fa-solid fa-chevron-right ml-1"></i
    ></Button>
    <Button
      class="bg-white text-black shadow-md shadow-black/50 hover:text-white hover:translate-x-2 transition-all"
      @click="nextPage('clients')"
      >Mijozlar <i class="fa-solid fa-chevron-right ml-1"></i
    ></Button>
    <Button
      class="bg-white text-black shadow-md shadow-black/50 hover:text-white hover:translate-x-2 transition-all"
      @click="nextPage('contracts')"
      >Shartnoma <i class="fa-solid fa-chevron-right ml-1"></i
    ></Button>
  </div>
</template>