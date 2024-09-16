<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useInvestStore } from "@/stores/invest/invest";
import { useSalaryStore } from "@/stores/salary/salary";
import { usePodvalStore } from "@/stores/podval/podval";
import { useKatlavanStore } from "@/stores/katlavan/katlavan";
import { useWorkersStore } from "@/stores/workers/workers";
import { useExitStore } from "@/stores/exit/exit";
import { useEachStore } from "@/stores/floor/each";

const { investResult } = storeToRefs(useInvestStore());
const { salaryResult } = storeToRefs(useSalaryStore());
const { podvalResult } = storeToRefs(usePodvalStore());
const { katlavanResult } = storeToRefs(useKatlavanStore());
const { workersResult } = storeToRefs(useWorkersStore());
const { exitResult } = storeToRefs(useExitStore());
const { eachResult } = storeToRefs(useEachStore());

onMounted(() => {
  useInvestStore().get_invest_result();
  useSalaryStore().get_salary_result();
  usePodvalStore().get_podval_result();
  useKatlavanStore().get_katlavan_result();
  useWorkersStore().get_worker_result();
  useExitStore().get_exit_result();
  useEachStore().get_each_result()
});
</script>

<template>
  <div class="-ml-3 -mr-3 flex flex-wrap">
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div>
          <div>Sarmoya</div>
          <div class="pt-2 text-2xl font-bold">
            <i class="fa-solid fa-dollar-sign pr-1"></i
            >{{ investResult.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
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
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div>
          <div>Katlavan</div>
          <div class="pt-2 text-2xl font-bold">
            {{ katlavanResult.toLocaleString()
            }}<span class="text-base font-normal"> sum</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-solid fa-store"></i>
        </div>
        <div>
          <div>Podval</div>
          <div class="pt-2 text-2xl font-bold">
            {{ podvalResult.toLocaleString()
            }}<span class="text-base font-normal"> sum</span>
          </div>
        </div>
      </div>
    </div>
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
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-regular fa-clipboard"></i>
        </div>
        <div>
          <div>Boshqalar</div>
          <div class="pt-2 text-2xl font-bold">
            {{ exitResult.toLocaleString()
            }}<span class="text-base font-normal"> sum</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-4/12 mb-6 px-3">
      <div class="px-3 py-4 flex items-center gap-4 bg-white rounded-xl">
        <div
          class="icon w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#e9edf1] text-[25px] text-[#603cff]"
        >
          <i class="fa-regular fa-building"></i>
        </div>
        <div>
          <div>1 - qavat</div>
          <div class="pt-2 text-2xl font-bold">
            {{ eachResult.toLocaleString()
            }}<span class="text-base font-normal"> sum</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
