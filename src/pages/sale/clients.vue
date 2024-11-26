<script setup>
import router from '@/router';
import clientAddDialog from '@/components/dialog/sale/client-add-dialog.vue';
import clientTable from '@/components/sale/clientTable.vue';

import Button from '@/components/ui/button/Button.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Mijozlar bo'limi</div>
    <div>
      <Button @click="router.push('/sale')" class="mr-5"
        ><i class="fa-solid fa-angle-left"></i
      ></Button>
      <clientAddDialog />
    </div>
  </div>
  <clientTable />
</template>