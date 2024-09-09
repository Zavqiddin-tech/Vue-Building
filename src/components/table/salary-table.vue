<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useSalaryStore } from "@/stores/salary/salary";
const { salary } = storeToRefs(useSalaryStore());
const { get_all_salary, delete_salary } = useSalaryStore();
import { useModalStore } from '@/stores/modal';
const {setModal, setUpdateModal, setNowId} = useModalStore()

//shadcn
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const edit = async (id) => {
  setModal(true)
  setUpdateModal(true)
  setNowId(id)
}

const del = (id) => {
  if(confirm("O'chirilsinmi")) {
    delete_salary(id)
  }
}

onMounted(() => {
  get_all_salary();
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(salary) && salary.length > 0">
      <TableCaption>Salary xarajatlari</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">Ismi</TableHead>
          <TableHead class="text-[16px]">Miqdori</TableHead>
          <TableHead class="text-[16px]">Qaysi oy uchun</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <TableHead class="text-[16px] text-right"> edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in salary" class="hover:bg-black/10">
          <TableCell class="font-medium capitalize">
            {{ item.worker.fName }} {{ item.worker.lName }}
          </TableCell>
          <TableCell>{{ item.amount.toLocaleString() }}</TableCell>
          <TableCell>{{ item.paymentForMonth }}</TableCell>
          <TableCell>{{ convertDate(item.createAt, 1) }}</TableCell>
          <TableCell>{{ item.createdBy.userName }}</TableCell>
          
          <TableCell class="float-right">
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
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
