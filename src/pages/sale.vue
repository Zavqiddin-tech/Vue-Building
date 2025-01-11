<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";
import Button from "@/components/ui/button/Button.vue";

import { useHomeStore } from "@/stores/sale/home";
import { useContractStore } from "@/stores/sale/contract";
const {homeResult} = storeToRefs(useHomeStore())
const {get_all_home} = useHomeStore()
const {contractResult} = storeToRefs(useContractStore())
const {get_all_contract} = useContractStore()

const nextPage = (val) => {
  router.push(`/sale/${val}`);
};

onMounted(() => {
get_all_home()
get_all_contract()
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Sotuv bo'limi</div>
    <Button
      class="bg-white text-black shadow-md shadow-black/50 hover:text-white hover:translate-x-2 transition-all"
      @click="nextPage('homes')"
      >Uy <i class="fa-solid fa-chevron-right ml-1"></i
    ></Button>
    <Button
      class="bg-white text-black shadow-md shadow-black/50 hover:text-white hover:translate-x-2 transition-all"
      @click="nextPage('clients')"
      >Mijozlar <i class="fa-solid fa-chevron-right ml-1"></i
    ></Button>
    <Button
      class="bg-white text-black shadow-md shadow-black/50 hover:text-white hover:translate-x-2 transition-all"
      @click="nextPage('contracts')"
      >Shartnoma <i class="fa-solid fa-chevron-right ml-1"></i
    ></Button>
  </div>
  <div class="pt-10 flex -ml-3 -mr-3">
    <div class="w-4/12 mb-6 px-3">
      <div v-if="homeResult.countHome"
        class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl shadow-lg"
      >
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-home"></i>
        </div>
        <div>
          <div class="text-xl font-medium">Uylar | {{ homeResult.countHome }} ta</div>

          <div class="pt-2 text-lg">
            <i class="fa-solid fa-lock-open text-green-500"></i> ochiq:
            <span class="text-2xl font-medium">{{ homeResult.openHome }}</span
            ><span class="text-base font-normal"> ta</span>
          </div>
          <div class="text-lg">
            <i class="fa-solid fa-lock text-pink-500"></i> yopiq:
            <span class="text-2xl font-medium">{{ homeResult.busyHome }}</span
            ><span class="text-base font-normal"> ta</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-4/12 mb-6 px-3">
      <div v-if="contractResult.count"
        class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl shadow-lg"
      >
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-address-card"></i>
        </div>
        <div>
          <div class="text-xl font-medium">Shartnoma | {{ contractResult.count }} ta</div>

          <div class="pt-2 text-lg">
            Umumiy:
            <span class="text-2xl font-medium">{{ contractResult.price.toLocaleString() }}</span
            ><span class="text-base font-normal"> uzs</span>
          </div>
          <div class="text-lg">
            <i class="fa-solid fa-circle-check text-xl text-green-500"></i>
            to'landi: <span class="text-xl font-medium text-green-500">{{ contractResult.paid.toLocaleString() }}</span
            ><span class="text-base font-normal"> uzs</span>
          </div>
          <div class="text-lg">
            <i class="fa-solid fa-circle-minus text-pink-500 text-xl"></i>
            qarzdorlik: <span class="text-xl font-medium text-pink-500">{{ contractResult.qarz.toLocaleString() }}</span
            ><span class="text-base font-normal"> uzs</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
