<script setup>
import { ref } from "vue";

// store
import { useMonthlyStore } from "@/stores/monthly";
const { get_month_invest } = useMonthlyStore();

// shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "@/components/ui/button/Button.vue";

const state = ref([]);
const open = async () => {
 await get_month_invest().then((res) => {
    state.value = [...res.data];
  });
};
</script>

<template>
  <Popover>
    <PopoverTrigger class="w-auto h-0">
      <Button @click="open()" class="mr-5"> Oylik rasxodlar </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[450px]">
      <ScrollArea class="h-[400px] rounded-md border p-4">
        <div class="flex items-center justify-center gap-2 text-lg font-medium">
          Oyma oy bo'lgan rasxodlar
        </div>
        <ul v-if="Array.isArray(state) && state.length > 0">
          <li v-for="item of state" class="pt-4 border-b-2">
            <div class="p-b-2 text-center text-sky-500">
              {{ item.month.split("-")[1] }} -
              {{ item.month.split("-")[0] }}
            </div>
            <div class="text-center">
              <span class="text-green-600"
                >${{ Number(item.totalPrice).toLocaleString() }}</span
              >
              |
              <span>{{ Number(item.totalConvert).toLocaleString() }} sum</span>
            </div>
          </li>
        </ul>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>
