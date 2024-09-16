<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useWorkersStore } from "@/stores/workers/workers";
const { workers } = storeToRefs(useWorkersStore());
const { get_all_workers, delete_worker } = useWorkersStore();
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
  if(confirm("O'chirasizmi")) {
    delete_worker(id)
  }
}

onMounted(() => {
  get_all_workers();
});
</script>

<template>
  <div>
		<Table v-if="Array.isArray(workers) && workers.length > 0">
    <TableCaption>hamma ishchilar ro'xati</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Ism familya </TableHead>
        <TableHead>Lavozim</TableHead>
        <TableHead>Qo'shildi</TableHead>
        <TableHead>Telefon</TableHead>
        <TableHead>Author</TableHead>
        <TableHead class="text-right"> edit </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in workers" class="hover:bg-black/10">
        <TableCell class="font-medium capitalize">
          {{ item.fName }} {{ item.lName }}
        </TableCell>
        <TableCell>{{ item.position}}</TableCell>
        <TableCell>{{ convertDate(item.createAt, 1) }}</TableCell>
        <TableCell>{{ item.phone }}</TableCell>
        <TableCell>{{ item.createdWorker.userName }}</TableCell>
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
