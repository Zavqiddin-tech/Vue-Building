<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useModalStore } from '@/stores/modal';
const {setModal, setUpdateModal, setNowId} = useModalStore()

import { useAdminsStore } from "@/stores/admins/admins";
const { admins } = storeToRefs(useAdminsStore());
const { get_all_admins, change_status, delete_admin } = useAdminsStore();


const changeStatus = (data) => {
  change_status(data)
}


const edit = async (id) => {
  setModal(true)
  setUpdateModal(true)
  setNowId(id)
}

const del = (id) => {
  if (confirm("O'chirilsinmi ?")) {
    delete_admin(id)
  }
};

onMounted(() => {
  get_all_admins();
});
</script>

<template>
  <div class="wrapper">
    <table
      v-if="Array.isArray(admins) && admins.length > 0"
      class="table-auto w-full"
    >
      <thead class="border-b border-zinc-400 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium">Ism familya</th>
          <th class="py-4 font-medium">Kiritildi</th>
          <th class="py-4 font-medium">Holati</th>
          <th class="py-4 font-medium">user-name</th>
          <th class="py-4 font-medium">role</th>
          <th class="py-4 font-medium text-right">edit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of admins"
          class="border-b border-zinc-300 hover:bg-black hover:bg-opacity-20"
        >
          <td class="min-w-8 py-3">
            {{ index + 1 }}
          </td>
          <td class="min-w-40 name">{{ item.fName }} {{ item.lName }}</td>

          <td>
            {{ convertDate(item.createAt, 1) }}
          </td>
          <td class="min-w-24">
            <span
              @click="changeStatus({id: item.id, status: item.status})"
              v-if="item.status == 1"
              class="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-black ring-1 ring-inset ring-slate-600 cursor-pointer"
            >
              <span class="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
              Active</span
            >
            <span
              @click="changeStatus({id: item.id, status: item.status})"
              v-if="item.status == 0"
              class="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-black ring-1 ring-inset ring-slate-600 cursor-pointer"
            >
              <span class="w-2 h-2 mr-1 rounded-full bg-pink-600"></span>
              Inactive</span
            >
          </td>

          <td class="min-w-28 py-3">
            <span class="text-sm font-medium text-sky-600 underline">{{
              item.userName
            }}</span>
          </td>

          <td class="min-w-28 py-3">
            <span
              class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset"
              >{{ item.role }}</span
            >
          </td>

          <td class="float-end py-3">
            <!-- <div class="flex items-start gap-3">
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
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
