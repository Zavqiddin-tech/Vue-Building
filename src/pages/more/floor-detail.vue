<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const routeId = useRoute().params.id
import floordetailDialog from '@/components/dialog/floordetail-dialog.vue';
import floordetailTable from '@/components/table/floordetail-table.vue';

import { useFloorStore } from '@/stores/floor/floor';
const {get_floor} = useFloorStore()


const oneFloor = ref({})
onMounted(async()=> {
 await get_floor(routeId).then(res => {
	oneFloor.value = res.data
 })
})
</script>

<template>
	<div class="flex items-center justify-between">
    <div class="text-xl font-semibold"><span class="text-6xl">{{ oneFloor.floorName}}</span> - qavat</div>
    <div>
      <floordetailDialog />
    </div>
  </div>
  <floordetailTable />
</template>