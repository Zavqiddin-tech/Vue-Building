<script setup>
import { onMounted } from "vue";
import router from "@/router";
import contractAddDialog from "@/components/dialog/sale/contract-add-dialog.vue";
import contractCards from "@/components/sale/contractCards.vue";
import Button from "@/components/ui/button/Button.vue";



</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Shartnoma bo'limi</div>
    <div>
      <Button @click="router.push('/sale')" class="mr-5"
        ><i class="fa-solid fa-angle-left"></i
      ></Button>
      <contractAddDialog />
    </div>
  </div>
  <contractCards />
</template>
