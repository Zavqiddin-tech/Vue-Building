<script setup>
import { ref, watch } from "vue";
import { useInvestStore } from "@/stores/invest/invest";
const { new_invest, get_invest, update_invest } = useInvestStore();

import { useModalStore } from "@/stores/modal";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/toast/use-toast";
import { storeToRefs } from "pinia";
const { toast } = useToast();

const state = ref({});
const calendar = ref({});
const add = () => {
  let resDate = "";
  let newDay = String(calendar.value.date?.day).padStart(2, "0");
  let newMonth = String(calendar.value.date?.month).padStart(2, "0");
  let newYear = String(calendar.value.date?.year);
  resDate = `${newDay}-${newMonth}-${newYear}`;

  if (state.value.name && state.value.amount) {
    if (updateModal.value) {
      if (resDate.includes("undefined")) {
        update_invest(state.value);
        handleClose();
        state.value = {};
      } else {
        update_invest({ ...state.value, selectDate: resDate });
        handleClose();
        state.value = {};
      }
    } else {
      if (resDate.includes("undefined")) {
        toast({
          title: "E'tibor bering",
          description: "Sanani tanlang !",
        });
      } else {
        new_invest({ ...state.value, selectDate: resDate });
        handleClose();
        state.value = {};
      }
    }
  } else {
    toast({
      title: "E'tibor bering",
      description: "Barcha maydon to'ldirilishi shart !",
    });
  }
};

const handleClose = () => {
  setModal(false);
  setUpdateModal(false);
  setNowId("");
};

const onClose = (isOpen) => {
  if (isOpen == false) {
    handleClose();
  }
};

watch(updateModal, async () => {
  if (updateModal.value) {
    const res = await get_invest(nowId.value);
    if (res.status == 200) {
      state.value = res.data;
    }
  }
});
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">Kiritish</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          Sarmoya
          <span v-show="updateModal">yangilash</span></DialogTitle
        >
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Kim </Label>
          <Select v-model="state.name">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sarmoya egalari</SelectLabel>
                <SelectItem value="dilmurod"> Dilmurod </SelectItem>
                <SelectItem value="rustam aka"> Rustam aka </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="amount" class="text-right"> Qancha </Label>
          <Input
            class="col-span-3"
            type="number"
            v-model="state.amount"
            id="amount"
          />
        </div>
        <div>
          <Calendar
            v-model="calendar.date"
            :weekday-format="'short'"
            class="rounded-md border"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="add()" class="bg-[#603cff] hover:bg-[#603cffbe]">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- <Dialog v-model:open="toggle">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">qo'shish</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sarmoyani kiritish</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Kim </Label>
          <Select v-model="state.name">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sarmoya egalari</SelectLabel>
                <SelectItem value="dilmurod"> Dilmurod  </SelectItem>
                <SelectItem value="rustam aka"> Rustam aka </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="amount" class="text-right"> Qancha </Label>
          <Input class="col-span-3" type="number" v-model="state.amount" id="amount" />
        </div>
      </div>
      <DialogFooter>
        <Button @click="add()" class="bg-[#603cff] hover:bg-[#603cffbe]">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog> -->
</template>
