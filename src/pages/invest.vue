<script setup>
import investDialog from '@/components/dialog/invest-dialog.vue';
import investTable from '@/components/table/invest-table.vue';
import investMonth from './month/invest-month.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Sarmoyalar</div>
    <div>
      <investMonth />
      <investDialog />
    </div>
  </div>
	<investTable />
</template>