<script setup>
import exitDialog from '@/components/dialog/exit-dialog.vue';
import exitTable from '@/components/table/exit-table.vue';
import exitMonth from './month/exit-month.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Boshqa</div>
    <div>
      <exitMonth />
      <exitDialog />
    </div>
  </div>
  <exitTable />
</template>