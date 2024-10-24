<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const routeId = useRoute().params.id;
import floordetailDialog from "@/components/dialog/floordetail-dialog.vue";
import floordetailTable from "@/components/table/floordetail-table.vue";

import { useFloorStore } from "@/stores/floor/floor";
import { useEachStore } from "@/stores/floor/each";
const { get_floor } = useFloorStore();
const { get_oneEach_result } = useEachStore();

const oneFloor = ref({});
const each = ref({});
onMounted(async () => {
  await get_floor(routeId).then((res) => {
    oneFloor.value = res.data;
  });
  await get_oneEach_result(routeId).then((res) => {
    each.value = { ...res.data };
  });
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div v-if="oneFloor.floorName" class="text-xl font-semibold">
      <span class="text-6xl">{{ oneFloor.floorName }}</span> - qavat
    </div>
    <div>
      <floordetailDialog />
    </div>
  </div>
  <div v-if="each.total" class="my-5">
    <div class="font-medium">Jami: {{ each.total.toLocaleString() }} sum</div>
    <div class="text-green-600 font-medium">
      <i class="fa-solid fa-dollar-sign"></i>
      {{ each.convert.toLocaleString() }}
    </div>
  </div>
  <floordetailTable />
</template>
