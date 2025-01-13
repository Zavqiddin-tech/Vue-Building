<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// Components
import dollarDialog from "../dialog/dollar-dialog.vue";
import dollarBox from "./dollar-box.vue";
import floorTabs from "./floor-tabs.vue";
import barChart from "../chart ui/bar-chart.vue";
import lineChart from "../chart ui/line-chart.vue";

import { useInvestStore } from "@/stores/invest/invest";
import { useContractStore } from "@/stores/sale/contract";
import { useSalaryStore } from "@/stores/salary/salary";
import { usePodvalStore } from "@/stores/podval/podval";
import { useKatlavanStore } from "@/stores/katlavan/katlavan";
import { useWorkersStore } from "@/stores/workers/workers";
import { useExitStore } from "@/stores/exit/exit";
import { useEachStore } from "@/stores/floor/each";
import { useDollarStore } from "@/stores/dollar/dollar";

const { investResult } = storeToRefs(useInvestStore());
const { contractResult } = storeToRefs(useContractStore());
const { salaryResult } = storeToRefs(useSalaryStore());
const { podvalResult } = storeToRefs(usePodvalStore());
const { katlavanResult } = storeToRefs(useKatlavanStore());
const { workersResult } = storeToRefs(useWorkersStore());
const { exitResult } = storeToRefs(useExitStore());
const { eachResult } = storeToRefs(useEachStore());
const { dollar } = storeToRefs(useDollarStore());

onMounted(() => {
  useInvestStore().get_invest_result();
  useContractStore().get_all_contract();
  useSalaryStore().get_salary_result();
  usePodvalStore().get_podval_result();
  useKatlavanStore().get_katlavan_result();
  useWorkersStore().get_worker_result();
  useExitStore().get_exit_result();
  useEachStore().get_each_result();
  useDollarStore().get_all_dollar();
});
</script>

<template>
  <div class="-ml-3 -mr-3 flex flex-wrap">
    <!-- Sarmoya -->
    <div class="w-6/12 mb-6 px-3">
      <div class="px-3 py-4 bg-white rounded-xl">
        <div v-if="Object.keys(investResult).length">
          <div>Sarmoya</div>
          <div v-if="investResult.total" class="pt-2 text-2xl font-bold">
            <i class="fa-solid fa-dollar-sign pr-1"></i
            >{{ investResult.total.toLocaleString() }}
          </div>
          <div v-if="investResult.convert" class="pt-2 text-xl">
            {{ investResult.convert.toLocaleString() }}
            <span class="text-base"> sum</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Valyuta -->
    <div class="w-6/12 mb-6 px-3">
      <div class="px-3 py-4 bg-white rounded-xl">
        <div class="flex justify-between">
          <div>
            <div>Valyuta</div>
            <div
              v-if="Array.isArray(dollar) && dollar.length > 0"
              class="pt-1 pb-4 text-2xl font-bold"
            >
              <div class="text-base font-normal">
                {{ convertDate(dollar[0].selectDate, 1) }}
              </div>
              <i class="fa-solid fa-dollar-sign"></i> 1 =
              <span>{{ Number(dollar[0].kurs).toLocaleString() }}</span>
              <span class="text-base font-normal"> sum</span>
            </div>
            <div v-else class="py-3 text-pink-500 animate-pulse">
              hali kiritilmagan
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <dollarDialog />
            <dollarBox v-if="Array.isArray(dollar) && dollar.length > 0" />
          </div>
        </div>
      </div>
    </div>
    <!-- Qavatlar -->
    <div class="w-6/12 h-full mb-6 px-3 ">
      <div class="px-3 h-full py-4 gap-4 bg-white rounded-xl">
        <floorTabs :result="eachResult" />
      </div>
    </div>
    <!-- Shartnoma -->
    <div class="w-6/12 mb-6 px-3">
      <div
        v-if="contractResult.count"
        class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl"
      >
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-address-card"></i>
        </div>
        <div>
          <div class="text-xl font-medium">
            Shartnoma | {{ contractResult.count }} ta
          </div>

          <div class="pt-2 text-lg">
            Umumiy:
            <span class="text-2xl font-medium">{{
              contractResult.price.toLocaleString()
            }}</span
            ><span class="text-base font-normal"> uzs</span>
          </div>
          <div class="text-lg">
            <i class="fa-solid fa-circle-check text-xl text-green-500"></i>
            to'landi:
            <span class="text-xl font-medium text-green-500">{{
              contractResult.paid.toLocaleString()
            }}</span
            ><span class="text-base font-normal"> uzs</span>
          </div>
          <div class="text-lg">
            <i class="fa-solid fa-circle-minus text-pink-500 text-xl"></i>
            qarzdorlik:
            <span class="text-xl font-medium text-pink-500">{{
              contractResult.qarz.toLocaleString()
            }}</span
            ><span class="text-base font-normal"> uzs</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Oylik maosh -->
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-dollar-sign"></i>
        </div>
        <div>
          <div>Oylik maosh</div>
          <div class="pt-2 text-2xl font-bold">
            {{ salaryResult.toLocaleString()
            }}<span class="text-base font-normal"> sum</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Katlavan -->
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div>
          <div>Katlavan</div>
          <div v-if="Object.keys(katlavanResult).length">
            <div v-if="katlavanResult.total" class="pt-2 text-2xl font-bold">
              {{ katlavanResult.total.toLocaleString() }}
              <span class="text-base font-normal"> sum</span>
            </div>
            <div
              v-if="katlavanResult.convert"
              class="pt-2 text-xl text-green-500"
            >
              <i class="fa-solid fa-dollar-sign pr-1"></i>
              {{ katlavanResult.convert.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Podval -->
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-store"></i>
        </div>
        <div>
          <div>Podval</div>
          <div v-if="Object.keys(podvalResult).length">
            <div v-if="podvalResult.total" class="pt-2 text-2xl font-bold">
              {{ podvalResult.total.toLocaleString() }}
              <span class="text-base font-normal"> sum</span>
            </div>
            <div
              v-if="podvalResult.convert"
              class="pt-2 text-xl text-green-500"
            >
              <i class="fa-solid fa-dollar-sign pr-1"></i>
              {{ podvalResult.convert.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Ishchilar soni -->
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-users"></i>
        </div>
        <div>
          <div>Ishchilar soni</div>
          <div class="pt-2 text-2xl font-bold">
            {{ workersResult.toLocaleString()
            }}<span class="text-base font-normal"> ta</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Boshqalar -->
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-regular fa-clipboard"></i>
        </div>
        <div>
          <div>Boshqalar</div>
          <div v-if="Object.keys(exitResult).length">
            <div v-if="exitResult.total" class="pt-2 text-2xl font-bold">
              {{ exitResult.total.toLocaleString() }}
              <span class="text-base font-normal"> sum</span>
            </div>
            <div v-if="exitResult.convert" class="pt-2 text-xl text-green-500">
              <i class="fa-solid fa-dollar-sign pr-1"></i>
              {{ exitResult.convert.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
