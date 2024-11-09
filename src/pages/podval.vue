<script setup>
import podvalDialog from '@/components/dialog/podval-dialog.vue';
import podvalTable from '@/components/table/podval-table.vue';
import podvalMonth from './month/podval-month.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Podval</div>
    <div>
      <podvalMonth />
      <podvalDialog />
    </div>
  </div>
  <podvalTable />
</template>