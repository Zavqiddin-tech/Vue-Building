<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { usePodvalStore } from "@/stores/podval/podval";
const { podval } = storeToRefs(usePodvalStore());
const { get_all_podval, get_podval } = usePodvalStore();
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const edit = async (id) => {
  setModal(true)
  setUpdateModal(true)
  setNowId(id)
}

onMounted(() => {
  get_all_podval();
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(podval) && podval.length > 0">
      <TableCaption>Podval xarajatlari</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">Nomi</TableHead>
          <TableHead class="text-[16px]">Miqdori</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <TableHead class="text-[16px]">Batafsil</TableHead>
          <TableHead class="text-[16px] text-right"> edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in podval" class="hover:bg-black/10">
          <TableCell class="font-medium capitalize">
            {{ item.title }}
          </TableCell>
          <TableCell>{{ item.price }}</TableCell>
          <TableCell>{{ convertDate(item.createAt) }}</TableCell>
          <TableCell>{{ item.createdBy.userName }}</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger class=" p-2 bg-green-500 text-white rounded-lg shadow"> shu yerda</PopoverTrigger>
              <PopoverContent> {{ item.detail }} </PopoverContent>
            </Popover>
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
