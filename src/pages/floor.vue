<script setup>
import floorDialog from '@/components/dialog/floor-dialog.vue';
import floorTable from '@/components/table/floor-table.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Qavatlar</div>
    <div>
      <floorDialog />
    </div>
  </div>
  <floorTable />
</template>