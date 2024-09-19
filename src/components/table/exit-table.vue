<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useExitStore } from "@/stores/exit/exit";
const { exit } = storeToRefs(useExitStore());
const { get_all_exit, delete_exit } = useExitStore();
import { useModalStore } from "@/stores/modal";
const { setModal, setUpdateModal, setNowId } = useModalStore();

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
  setModal(true);
  setUpdateModal(true);
  setNowId(id);
};

const del = (id) => {
  if (confirm("O'chirasizmi")) {
    delete_exit(id);
  }
};

onMounted(() => {
  get_all_exit();
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(exit) && exit.length > 0">
      <TableCaption>Exit xarajatlari</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">Nomi</TableHead>
          <TableHead class="text-[16px]">Narxi</TableHead>
          <TableHead class="text-[16px]">Qaysi kuni</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Batafsil</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <TableHead class="text-[16px] text-right"> edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in exit" class="hover:bg-black/10">
          <TableCell class="font-medium capitalize">
            {{ item.title }}
          </TableCell>
          <TableCell class="text-green-500">
            <i class="fa-solid fa-money-bills pr-2 text-green-600"></i>
            {{ item.price.toLocaleString() }}
          </TableCell>
          <TableCell
            ><span class="py-1 px-3 rounded-full bg-lime-300 shadow-lg">{{
              item.selectDate
            }}</span></TableCell
          >
          <TableCell>{{ convertDate(item.createAt, 1) }}</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger
                class="p-2 bg-green-500 text-white rounded-lg shadow"
              >
                shu yerda</PopoverTrigger
              >
              <PopoverContent> {{ item.detail }} </PopoverContent>
            </Popover>
          </TableCell>
          <TableCell>
            <span
              class="inline-flex items-center rounded-md bg-pink-50 px-3 py-2 text-sm font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
              >{{ item.createdBy.userName }}
            </span>
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
