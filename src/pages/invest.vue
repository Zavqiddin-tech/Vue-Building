<script setup>
import investDialog from '@/components/dialog/invest-dialog.vue';
import investTable from '@/components/table/invest-table.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Sarmoyalar</div>
    <div>
      <investDialog />
    </div>
  </div>
	<investTable />
</template>