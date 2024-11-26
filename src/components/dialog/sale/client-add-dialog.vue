<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

//store
import { useModalStore } from "@/stores/modal";
import { useClientStore } from "@/stores/sale/client";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();
const { new_client, update_client, get_client } = useClientStore();

// shadcn
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
// shadcn

const state = ref({});
const add = () => {
  if (
    state.value.fName &&
    state.value.lName &&
    state.value.phoneOne &&
    state.value.phoneTwo
  ) {
    if (updateModal.value) {
      update_client(state.value);
      handleClose();
      state.value = {};
    } else {
      new_client(state.value);
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
    const res = await get_client(nowId.value);
    if (res.status == 200) {
      state.value = res.data;
    }
  }
});
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">Mijoz</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Mijozni qo'shing</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right"> Ismi </Label>
          <Input class="col-span-3" v-model="state.fName" />
        </div>
      </div>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right"> Familyasi </Label>
          <Input class="col-span-3" v-model="state.lName" />
        </div>
      </div>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right"> Telefon 1 </Label>
          <Input class="col-span-3" v-model="state.phoneOne" />
        </div>
      </div>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right"> Telefon 2 </Label>
          <Input class="col-span-3" v-model="state.phoneTwo" />
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
