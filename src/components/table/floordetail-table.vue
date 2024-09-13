<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";
import { useRoute } from "vue-router";
const routeId = useRoute().params.id


// store
import { useModalStore } from "@/stores/modal";
const { setModal, setUpdateModal, setNowId } = useModalStore();
import { useEachStore } from "@/stores/floor/each";
const { each } = storeToRefs(useEachStore());
const { get_all_each, delete_each } = useEachStore();

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
    delete_each(id, routeId);
  }
};

onMounted(() => {
  get_all_each(routeId);
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(each) && each.length > 0">
      <TableCaption>katlavan xarajatlari</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">Nomi</TableHead>
          <TableHead class="text-[16px]">Narxi</TableHead>
          <TableHead class="text-[16px]">Qaysi kuni</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <TableHead class="text-[16px]">Batafsil</TableHead>
          <TableHead class="text-[16px] text-right"> edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in each" class="hover:bg-black/10">
          <TableCell class="font-medium capitalize">
            {{ item.title }}
          </TableCell>
          <TableCell class="text-green-500">
            <i class="fa-solid fa-money-bills pr-2 text-green-600"></i>
            {{ item.price.toLocaleString() }}
          </TableCell>
          <TableCell>{{ item.selectDate }}</TableCell>
          <TableCell>{{ convertDate(item.createAt, 1) }}</TableCell>
          <TableCell>{{ item.createdBy.userName }}</TableCell>
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
