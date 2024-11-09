<script setup>

import salaryDialog from '@/components/dialog/salary-dialog.vue';
import salaryTable from '@/components/table/salary-table.vue';
import salaryMonth from './month/salary-month.vue';
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Oylik maosh jadvali</div>
    <div>
      <salaryMonth />
      <salaryDialog />
    </div>
  </div>
  <salaryTable />
</template>
