<script setup>
import axios from "axios";
import cookies from "vue-cookies";
import { storeToRefs } from "pinia";

import signInDialog from "@/components/dialog/sign-in-dialog.vue";
import signInTable from "@/components/table/sign-in-table.vue";
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Adminlar ro'yxati</div>
    <div>
      <signInDialog />
    </div>
  </div>
  <signInTable />
  <div class="mt-5 float-right">
    <div
      class="w-12 h-12 flex justify-center items-center bg-[#603cff] text-white rounded-full text-xl shadow-lg shadow-slate-400 cursor-pointer"
    >
      <i class="fa-solid fa-cloud-arrow-down"></i>
    </div>
  </div>
</template>
