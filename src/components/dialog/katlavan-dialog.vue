<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

//store
import { useModalStore } from "@/stores/modal";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();
import { useKatlavanStore } from "@/stores/katlavan/katlavan";
const { new_katlavan, update_katlavan, get_katlavan } = useKatlavanStore();

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const state = ref({});
const calendar = ref({});
const add = () => {
  let resDate = null;
  let newDay = String(calendar.value.date?.day).padStart(2, "0");
  let newMonth = String(calendar.value.date?.month).padStart(2, "0");
  let newYear = String(calendar.value.date?.year);
  resDate = new Date(`${newYear}-${newMonth}-${newDay}`);


  if (state.value.title && state.value.price) {
    if (updateModal.value) {
      if (resDate instanceof Date && !isNaN(resDate)) {
        update_katlavan({ ...state.value, selectDate: resDate });
        handleClose();
        state.value = {};
      } else {
        update_katlavan(state.value);
        handleClose();
        state.value = {};
      }
    } else {
      if (resDate && resDate instanceof Date && !isNaN(resDate)) {
        new_katlavan({ ...state.value, selectDate: resDate });
        handleClose();
        state.value = {};
      } else {
        toast({
          title: "E'tibor bering",
          description: "Sanani tanlang !",
        });
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
    const res = await get_katlavan(nowId.value);
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
        <DialogTitle>Katlavan rasxodlar</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <di>
        <div class="mb-4">
          <Input
            class="mt-2"
            v-model="state.title"
            id="title"
            placeholder="Nomini kiriting"
          />
        </div>
        <div class="mb-4">
          <Input
            class="mt-2"
            v-model="state.price"
            type="number"
            id="price"
            placeholder="narxini kiriting"
          />
        </div>
        <div class="mb-4">
          <Textarea
            class="w-full mt-2"
            v-model="state.detail"
            id="detail"
            placeholder="batafsil"
          />
        </div>
        <div class="mb-4">
          <Calendar
            v-model="calendar.date"
            :weekday-format="'short'"
            class="rounded-md border"
          />
        </div>
      </di>
      <DialogFooter>
        <Button @click="add()" class="bg-[#603cff] hover:bg-[#603cffbe]">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
