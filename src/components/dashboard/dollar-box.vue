<script setup>
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useModalStore } from "@/stores/modal";
import { useDollarStore } from "@/stores/dollar/dollar";
const { setModal, setUpdateModal, setNowId } = useModalStore();
const { dollar } = storeToRefs(useDollarStore());
const { delete_dollar } = useDollarStore();

// shadxn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Button from "../ui/button/Button.vue";

const edit = async (id) => {
  setModal(true);
  setUpdateModal(true);
  setNowId(id);
};

const del = (id) => {
  if (confirm("O'chirasizmi")) {
    delete_dollar(id);
  }
};
</script>

<template>
  <Popover>
    <PopoverTrigger class="w-auto h-0">
      <Button class="bg-lime-500 hover:bg-lime-600">
        Monitoring
        <i class="fa-solid fa-money-bill-trend-up pl-2 text-lg"></i>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[450px]">
      <ScrollArea class="h-[400px] rounded-md border p-4">
        <div class="flex items-center justify-center gap-2 text-lg font-medium">
          <i class="fa-solid fa-chart-pie text-4xl text-violet-500"></i>
          Valyuta monitoring
        </div>
        <ul v-if="Array.isArray(dollar) && dollar.length > 0">
          <li
            class="mt-4 flex items-center justify-between gap-4"
            v-for="item of dollar"
          >
            <div>
              <span
                v-if="convertDate(item.selectDate, 1)"
                class="py-1 px-3 rounded-full bg-lime-300 shadow-lg"
              >
                {{ convertDate(item.selectDate, 1) }}
              </span>
              <span
                v-else
                class="py-1 px-3 text-white rounded-full bg-red-400 shadow-lg"
              >
                {{ item.selectDate }}
              </span>
            </div>
            <div>
              <i
                class="fa-solid fa-money-bill-transfer text-xl text-green-500"
              ></i>
            </div>
            <div class="text-xl font-medium text-red-500">
              {{ Number(item.kurs).toLocaleString() }}
            </div>
            <div class="flex items-start gap-3">
              <div
                @click="edit(item.id)"
                class="cursor-pointer hover:text-blue-500 text-lg"
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
              <div
                @click="del(item.id)"
                class="cursor-pointer hover:text-blue-500 text-lg"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </li>
        </ul>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>
