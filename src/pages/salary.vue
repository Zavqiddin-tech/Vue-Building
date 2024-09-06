<script setup>

import salaryDialog from '@/components/dialog/salary-dialog.vue';
import salaryTable from '@/components/table/salary-table.vue';

// shadcn 
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Oylik maosh jadvali</div>
    <div>
      <salaryDialog />
    </div>
  </div>
  <salaryTable />
</template>
