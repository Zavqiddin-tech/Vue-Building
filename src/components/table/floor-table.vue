<script setup>
import { onMounted } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useFloorStore } from "@/stores/floor/floor";
const { floor } = storeToRefs(useFloorStore());
const { get_all_floor, delete_floor } = useFloorStore();
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
    delete_floor(id)
  }
}

const nextPage = (id) => {
  router.push(`floor/${id}`)
}

onMounted(() => {
  get_all_floor();
});
</script>

<template>
  <div>
		<Table v-if="Array.isArray(floor) && floor.length > 0">
    <TableCaption>qavatlar ro'yxati</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Qavat nomi</TableHead>
        <TableHead>Ma'lumot</TableHead>
        <TableHead>Qo'shildi</TableHead>
        <TableHead>Author</TableHead>
        <TableHead class="text-right"> edit </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in floor" class="hover:bg-black/10">
        <TableCell class="text-lg font-medium capitalize text-blue-600">
          {{ item.floorName }} - qavat
        </TableCell>
        <TableCell>
					<span @click="nextPage(item.id)" class="py-1 px-4 rounded-full text-white bg-[#603cff] cursor-pointer">kirish</span>
				</TableCell>
        <TableCell>{{ convertDate(item.createAt, 1) }}</TableCell>
        <TableCell>
          <span class="inline-flex items-center rounded-md bg-pink-50 px-3 py-2 text-sm font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">{{ item.createdBy.userName }}</span>
          
        </TableCell>
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
