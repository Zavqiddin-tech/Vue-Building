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
  <Tabs default-value="1-qavat" class="w-full">
    <TabsList class="w-full">
      <TabsTrigger v-for="item of floors" :value="item">
        {{ item }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="item of floors" :value="item">
      <div class="flex items-center gap-4">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-regular fa-building"></i>
        </div>
        <div>
          <div>1 - qavat</div>
          <div class="pt-2 text-2xl font-bold">
            {{ result.toLocaleString()
            }}<span class="text-base font-normal"> sum</span>
          </div>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>
