<script setup>
import { ref } from "vue";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const floors = ref([
  "1-qavat",
  "2-qavat",
  "3-qavat",
  "4-qavat",
  "5-qavat",
  "6-qavat",
]);

const props = defineProps(["result"]);
</script>

<template>
  <div class="flex items-center gap-4">
    <div
      class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
    >
      <i class="fa-regular fa-building"></i>
    </div>
    <div>
      <div>Umumiy qavatlar</div>
      <div v-if="Object.keys(result).length">
        <div v-if="result.total" class="pt-2 text-2xl font-bold">
          {{ result.total.toLocaleString() }}
          <span class="text-base font-normal"> sum</span>
        </div>
        <div v-if="result.convert" class="pt-2 text-xl text-green-500">
          <i class="fa-solid fa-dollar-sign pr-1"></i>
          {{ result.convert.toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>
