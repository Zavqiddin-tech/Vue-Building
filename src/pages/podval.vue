<script setup>
import podvalDialog from '@/components/dialog/podval-dialog.vue';
import podvalTable from '@/components/table/podval-table.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Podval</div>
    <div>
      <podvalDialog />
    </div>
  </div>
  <podvalTable />
</template>