<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDollarStore } from "@/stores/dollar/dollar";
const { get_all_dollar } = useDollarStore();
const { dollar } = storeToRefs(useDollarStore());

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "../ui/button/Button.vue";

onMounted(() => {
  get_all_dollar();
});
</script>

<template>
  <Popover>
    <PopoverTrigger class="w-auto h-0">
      <Button class="bg-lime-500 hover:bg-lime-600">
        Monitoring
        <i class="fa-solid fa-money-bill-trend-up pl-2 text-lg"></i>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[400px]">
      <ScrollArea class="h-[400px] rounded-md border p-4">
        <div class="flex items-center justify-center gap-2 text-lg font-medium">
					<i class="fa-solid fa-chart-pie text-4xl text-violet-500"></i>
					Valyuta monitoring
				</div>
        <ul v-if="dollar">
          <li class="mt-4 flex items-center gap-4" v-for="item of dollar">
            <div>
              {{ item.selectDate }}
            </div>
            <div><i class="fa-solid fa-money-bill-transfer text-xl text-green-500"></i></div>
            <div class="text-xl font-medium text-red-500">
              {{ Number(item.kurs).toLocaleString() }}
            </div>
          </li>
        </ul>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>
