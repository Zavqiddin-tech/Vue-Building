<script setup>
import investDialog from "@/components/dialog/invest-dialog.vue";
import investTable from "@/components/table/invest-table.vue";
import investMonth from "./month/invest-month.vue";

import { storeToRefs } from "pinia";
import { useInvestStore } from "@/stores/invest/invest";
const { dilmurodResult, rustamResult } = storeToRefs(useInvestStore());
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Sarmoyalar</div>
    <div>
      <investMonth />
      <investDialog />
    </div>
  </div>
  <div class="my-5 flex gap-10">
    <div v-if="dilmurodResult.amount" class="pr-10 border-r border-gray-400">
      <div class="font-semibold">Dilmurod</div>
      <div class="text-green-600 font-medium">
        $ {{ dilmurodResult.amount.toLocaleString() }}
      </div>
      <div class="text-sky-600 font-medium">
        {{ dilmurodResult.convert.toLocaleString() }} UZS
      </div>
    </div>
    <div v-if="rustamResult.amount">
      <div class="font-semibold">Rustam aka</div>
      <div class="text-green-600 font-medium">
        $ {{ rustamResult.amount.toLocaleString() }}
      </div>
      <div class="text-sky-600 font-medium">
        {{ rustamResult.convert.toLocaleString() }} UZS
      </div>
    </div>
  </div>
  <investTable />
</template>
