<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const routeId = useRoute().params.id;
import { convertDate } from "@/func/date";
import monitoringDialog from "@/components/dialog/sale/monitoring-dialog.vue";
import monitoringTable from "@/components/sale/monitoringTable.vue";

import { useContractStore } from "@/stores/sale/contract";
const {oneContract} = storeToRefs(useContractStore())
const { get_contract } = useContractStore();

const total = (a, b) => {
  return a - b;
};

onMounted(async () => {
  await get_contract(routeId)
});
</script>

<template>
  <div v-if="Object.keys(oneContract).length">
    <div class="pb-3">
     
      <div><i class="fa-regular fa-clock"></i> {{ convertDate(oneContract.createAt) }}</div>
    </div>
    <div class="-ml-3 -mr-3 flex flex-wrap">
      <div class="w-full sm:w-6/12 md:w-4/12 mb-6 px-3">
        <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
          <div
            class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-blue-500"
          >
            <i class="fa-solid fa-money-bill"></i>
          </div>
          <div>
            <div>Narxi</div>
            <div class="pt-2 text-xl font-bold">
              {{ oneContract.price.toLocaleString() }}
              <span class="text-base font-normal"> sum</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-6/12 md:w-4/12 mb-6 px-3">
        <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
          <div
            class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-green-500"
          >
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <div>To'landi</div>
            <div class="pt-2 text-xl font-bold">
              {{ oneContract.paid.toLocaleString() }}
              <span class="text-base font-normal"> sum</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-full md:w-4/12 mb-6 px-3">
        <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
          <div
            class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-pink-500"
          >
            <i class="fa-solid fa-circle-minus"></i>
          </div>
          <div>
            <div>Qarzdorlik</div>
            <div class="pt-2 text-xl font-bold">
              {{ total(oneContract.price, oneContract.paid).toLocaleString() }}
              <span class="text-base font-normal"> sum</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 flex justify-evenly">
      <div class="min-w-80 p-5 flex items-center bg-white rounded-xl shadow-lg">
        <div class="mr-6"><i class="fa-regular fa-user text-4xl"></i></div>
        <div>
          <div class="mb-1 capitalize font-medium">
            {{ oneContract.client.fName }} {{ oneContract.client.lName }}
          </div>
          <div class="text-sm">{{ oneContract.client.phoneOne }}</div>
          <div class="text-sm">{{ oneContract.client.phoneTwo }}</div>
        </div>
      </div>
      <div class="min-w-80 p-5 flex items-center bg-white rounded-xl shadow-lg">
        <div class="mr-6"><i class="fa-solid fa-home text-4xl"></i></div>
        <div>
          <div class="mb-1 capitalize font-medium">
            {{ oneContract.home.home }}
          </div>
          <div class="font-medium">Xonalar: {{ oneContract.home.count }} ta</div>
        </div>
      </div>
    </div>
    <div class="mt-28 flex justify-between items-center">
      <div class="text-lg font-medium">Monitoring</div>
      <monitoringDialog />
    </div>
  </div>
  <monitoringTable class="mt-5"/>
</template>

<style lang="scss"></style>
