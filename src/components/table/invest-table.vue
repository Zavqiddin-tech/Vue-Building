<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";

// store
import { useInvestStore } from "@/stores/invest/invest";
const { invest } = storeToRefs(useInvestStore());
const { get_all_invest, delete_invest } = useInvestStore();
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

const edit = async (id) => {
  setModal(true);
  setUpdateModal(true);
  setNowId(id);
};

const del = (id) => {
  if (confirm("O'chirilsinmi")) {
    delete_invest(id);
  }
};

onMounted(() => {
  get_all_invest();
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(invest) && invest.length > 0">
      <TableCaption>Sarmoyalar</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">Kim tomonidan</TableHead>
          <TableHead class="text-[16px]">Miqdori</TableHead>
          <TableHead class="text-[16px]">Qaysi kuni</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <!-- <TableHead class="text-[16px] text-right"> edit </TableHead> -->
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in invest" class="hover:bg-black/10">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell class="text-green-500">
            <i class="fa-solid fa-dollar-sign pr-1 text-green-600"></i>
            {{ item.amount.toLocaleString() }}
          </TableCell>
          <TableCell>
            <span
              v-if="convertDate(item.selectDate, 1)"
              class="py-1 px-3 rounded-full bg-lime-300 shadow-lg"
            >
              {{ convertDate(item.selectDate, 1) }}
            </span>
            <span
              v-else
              class="py-1 px-3 text-white rounded-full bg-red-400 shadow-lg"
            >
              {{ item.selectDate }}
            </span>
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
              <!-- <div
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
              </div> -->
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
