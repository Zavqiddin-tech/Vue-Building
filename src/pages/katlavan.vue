<script setup>
import katlavanDialog from '@/components/dialog/katlavan-dialog.vue';
import katlavanTable from '@/components/table/katlavan-table.vue';
import katlavanMonth from './month/katlavan-month.vue';
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Katlavan</div>
    <div>
      <katlavanMonth />
      <katlavanDialog />
    </div>
  </div>
  <katlavanTable />
</template>