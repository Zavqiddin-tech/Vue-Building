<script setup>
import katlavanDialog from '@/components/dialog/katlavan-dialog.vue';
import katlavanTable from '@/components/table/katlavan-table.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Katlavan</div>
    <div>
      <katlavanDialog />
    </div>
  </div>
  <katlavanTable />
</template>