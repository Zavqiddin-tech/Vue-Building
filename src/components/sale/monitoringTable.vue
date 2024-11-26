<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { convertDate } from "@/func/date";
import { useRoute } from "vue-router";
const routeId = useRoute().params.id;

// store
import { useModalStore } from "@/stores/modal";
import { useMonitoringStore } from "@/stores/sale/monitoring";
const { setModal, setUpdateModal, setNowId } = useModalStore();
const { monitoring } = storeToRefs(useMonitoringStore());
const { get_all_monitoring } = useMonitoringStore();

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
  await get_all_monitoring(routeId);
});
</script>

<template>
  <div>
    <Table v-if="Array.isArray(monitoring) && monitoring.length > 0">
      <TableCaption>To'lov tarixi</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="text-[16px]">#</TableHead>
          <TableHead class="text-[16px]">summa</TableHead>
          <TableHead class="text-[16px]">Kiritildi</TableHead>
          <TableHead class="text-[16px]">Author</TableHead>
          <TableHead class="text-[16px]">Batafsil</TableHead>
          <TableHead class="text-[16px] text-right"> edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in monitoring" class="hover:bg-black/10">
          <TableCell class="font-medium capitalize">
            {{ index + 1 }}
          </TableCell>
          <TableCell class="font-medium capitalize">
            <span
              class="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-pink-700/10"
              >{{ item.amount.toLocaleString() }}
            </span>
          </TableCell>
          <TableCell>{{ convertDate(item.createAt) }}</TableCell>
          <TableCell>
            <span
              class="inline-flex items-center rounded-md bg-pink-50 px-3 py-2 text-sm font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
              >{{ item.createdBy.userName }}
            </span>
          </TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger class="text-sky-500 underline">
                shu yerda</PopoverTrigger
              >
              <PopoverContent> {{ item.detail }} </PopoverContent>
            </Popover>
          </TableCell>
          <TableCell class="float-right">
            <!--   <div class="flex items-start gap-3">
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
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
