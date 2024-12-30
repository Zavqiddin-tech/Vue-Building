<script setup>
import { onMounted } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";

import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useContractStore } from "@/stores/sale/contract";
const { contract } = storeToRefs(useContractStore());
const { get_all_contract } = useContractStore();

const total = (a, b) => {
  return a - b;
};

onMounted(async () => {
  await get_all_contract();
});
</script>

<template>
  <div>
    <div
      v-if="Array.isArray(contract) && contract.length > 0"
      class="pt-8 flex flex-wrap gap-5"
    >
      <div
        v-for="item of contract"
        class="min-w-80 overflow-hidden rounded-xl border shadow-lg"
      >
        <img
          class="w-44 h-44 mt-3 rounded-full m-auto object-cover shadow-lg"
          src="@/assets/contract2.jpg"
          alt=""
        />
        <div class="p-3">
          <div class="text-xl font-semibold">{{ item.home.home }}</div>
          <div class="capitalize">
            Mijoz: {{ item.client.fName }} {{ item.client.lName }}
          </div>
          <div>Uy raqami: {{ item.home.home }}</div>
          <div class="my-1">
            <span class="px-3 rounded-2xl bg-yellow-300">Narxi</span>:
            {{ item.price.toLocaleString() }} so'm
          </div>
          <div>
            <span class="px-3 rounded-2xl bg-green-400">To'landi</span>:
            {{ item.paid.toLocaleString() }} so'm
          </div>
          <div>
            <span class="px-3 rounded-2xl text-white bg-pink-400"
              >Qarzdorlik</span
            >: {{ total(item.price, item.paid).toLocaleString() }} so'm
          </div>
          <div class="mt-5">
            <Button class="w-full" @click="router.push(`contracts/${item.id}`)"
              >Batafsil <i class="fa-regular fa-circle-check ml-2"></i
            ></Button>
          </div>
          <div class="mt-3 pt-1 flex justify-between border-t border-slate-300">
            <div>
              muallif:
              <span class="text-sky-500 underline">{{
                item.createdBy.userName
              }}</span>
            </div>
            <div>
              <Popover>
                <PopoverTrigger class="text-sky-500 underline">
                  batafsil</PopoverTrigger
                >
                <PopoverContent> {{ item.detail }} </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
