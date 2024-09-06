<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePodvalStore } from "@/stores/podval/podval";
const { new_podval, update_podval, get_podval } = usePodvalStore();

import { useWorkersStore } from "@/stores/workers/workers";
const { workers } = storeToRefs(useWorkersStore());
const { get_all_workers } = useWorkersStore();

import { useModalStore } from "@/stores/modal";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();

const state = ref({});
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
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const add = () => {
  if (state.value.title && state.value.price && state.value.detail) {
    if (updateModal.value) {
      update_podval(state.value);
      handleClose();
    } else {
      new_podval(state.value);
      handleClose();
    }
  } else {
    toast({
      title: "E'tibor bering",
      description: "Barcha maydon to'ldirilishi shart !",
    });
  }
};

const handleClose = () => {
  state.value = {};
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
    const res = await get_podval(nowId.value);
    if (res.status == 200) {
      state.value = res.data;
    }
  }
});

const test = () => {
  const newDate = `${state.value.paymentForMonth.month <= 9 ? '0' + state.value.paymentForMonth.month : state.value.paymentForMonth.month}-${state.value.paymentForMonth.year}`
  state.value = {...state.value}
  console.log(state.value);
}

onMounted(() => {
  get_all_workers();
});
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">Chiqim</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          Maoshni berish
          <span v-show="updateModal">yangilash</span></DialogTitle
        >
        <DialogDescription>
          ma'lumotlarni kiritishda e'tiborli bo'ling !
        </DialogDescription>
      </DialogHeader>
      <div>
        <div class="mb-4">
          <Select v-model="state.worker">
            <SelectTrigger>
              <SelectValue placeholder="Ishchini tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kim ?</SelectLabel>
                <SelectItem v-for="item of workers" :value="item.id">
                  {{ item.fName }} {{ item.lName }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="mb-4">
          <Label for="pay" class="text-right"> To'landi </Label>
          <Input class="mt-2" v-model="state.amount" type="number" id="pay" />
        </div>
        <div class="mb-4">
          <Calendar
            v-model="state.paymentForMonth"
            :weekday-format="'short'"
            class="rounded-md border"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="test()" class="bg-[#603cff] hover:bg-[#603cffbe]">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
