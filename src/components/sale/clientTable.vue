<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useClientStore } from "@/stores/sale/client";
const { client } = storeToRefs(useClientStore());
const { get_all_client } = useClientStore();
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

onMounted(async () => {
  await get_all_client();
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(client) && client.length > 0">
      <TableCaption>Mijozlar ro'yxati</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">#</TableHead>
          <TableHead class="text-[16px]">F.I.O</TableHead>
          <TableHead class="text-[16px]">Telefon</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <TableHead class="text-[16px] text-right"> edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item, index in client" class="hover:bg-black/10">
          <TableCell class="font-medium capitalize">
            {{ index + 1 }}
          </TableCell>
          <TableCell class="font-medium capitalize">
            {{ item.fName }} {{ item.lName }}
          </TableCell>
          <TableCell class="font-medium capitalize">
            <div class="text-sky-500">{{ item.phoneOne }} </div>
            <div>{{ item.phoneTwo }} </div>
          </TableCell>
          <TableCell>{{ convertDate(item.createAt, 1) }}</TableCell>
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
