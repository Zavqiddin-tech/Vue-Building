<script setup>
import signInDialog from "@/components/dialog/sign-in-dialog.vue";
import signInTable from "@/components/table/sign-in-table.vue";
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Adminlar ro'yxati</div>
    <div><signInDialog /></div>
  </div>
  
  <signInTable />
</template>
