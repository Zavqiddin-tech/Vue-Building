<script setup>
import router from '@/router';
import Button from '@/components/ui/button/Button.vue';
import homeAddDialog from '@/components/dialog/sale/home-add-dialog.vue';
import homeCards from '@/components/sale/homeCards.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Uylar bo'limi</div>
    <div>
      <Button @click="router.push('/sale')" class="mr-5"
        ><i class="fa-solid fa-angle-left"></i
      ></Button>
      <homeAddDialog />
    </div>
  </div>
  <homeCards />
</template>