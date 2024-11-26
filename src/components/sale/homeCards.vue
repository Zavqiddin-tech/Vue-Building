<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useHomeStore } from "@/stores/sale/home";
const { home } = storeToRefs(useHomeStore());
const { get_all_home } = useHomeStore();

onMounted(async () => {
  await get_all_home();
});
</script>

<template>
  <div>
    <div
      v-if="Array.isArray(home) && home.length > 0"
      class="pt-8 flex flex-wrap gap-5"
    >
      <div v-for="item of home" class="w-72 p-5 rounded-xl border shadow-lg">
        <img
          class="w-32 h-32 m-auto object-cover rounded-full shadow-lg shadow-black/50"
          src="../../assets/furniture.jpg"
          alt=""
        />
        <div class="pt-5 text-xl font-semibold">{{ item.home }}</div>
        <div>Xonalar soni: {{ item.count }} ta</div>
        <div v-if="item.isBusy">
          Holati: <span class="text-red-600 font-semibold">band</span>
        </div>
        <div v-else>
          Holati: <span class="text-green-600 font-semibold">aktiv</span>
        </div>
        <div class="mt-3 pt-1 flex  justify-between border-t border-slate-300">
            <div>
              muallif:
              <span class="text-sky-500 underline">{{
                item.createdBy.userName
              }}</span>
            </div>
            <div>
              <Popover>
              <PopoverTrigger
                class="text-sky-500 underline"
              >
                batafsil</PopoverTrigger
              >
              <PopoverContent> {{ item.detail }} </PopoverContent>
            </Popover>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
