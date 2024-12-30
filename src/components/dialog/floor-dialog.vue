<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

//store
import { useModalStore } from "@/stores/modal";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();
import { useFloorStore } from "@/stores/floor/floor";
const { new_floor, get_floor, update_floor } = useFloorStore();

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
const add = () => {
  if (state.value.floorName) {
    if (updateModal.value) {
      update_floor(state.value);
      handleClose();
      state.value = {};
    } else {
      new_floor(state.value);
      handleClose();
      state.value = {};
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
    const res = await get_floor(nowId.value);
    if (res.status == 200) {
      state.value = res.data;
    }
  }
});
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">qo'shish</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Qavatni qo'shing</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Qavat nomi </Label>
          <Input class="col-span-3" v-model="state.floorName" />
        </div>
      </div>
      <DialogFooter>
        <Button @click="add()" class="bg-[#603cff] hover:bg-[#603cffbe]">
          saqlash
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
