<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth/auth";
const {regis, get_user, update_admin} = useAuthStore()

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";
import { storeToRefs } from "pinia";
const { toast } = useToast();

const add = () => {
  if (state.value.fName && state.value.lName && state.value.userName && state.value.role) {
    if (updateModal.value) {
      update_admin(state.value)
      handleClose();
    } else {
      regis(state.value);
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
    const res = await get_user(nowId.value);
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
        <DialogTitle>
          Admin qo'shish
          <span v-show="updateModal">yangilash</span></DialogTitle
        >
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="ismmi" class="text-right"> Ismi </Label>
          <Input
            class="col-span-3"
            type="text"
            v-model="state.fName"
            id="ismi"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="familyasi" class="text-right"> Familyasi </Label>
          <Input
            class="col-span-3"
            type="text"
            v-model="state.lName"
            id="familyasi"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> @username </Label>
          <Input
            class="col-span-3"
            type="text"
            v-model="state.userName"
            id="username"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right"> Kim </Label>
          <Select v-model="state.role">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>role</SelectLabel>
                <SelectItem value="director"> Director</SelectItem>
                <SelectItem value="manager"> Manager</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
				<div class="grid grid-cols-4 items-center gap-4">
          <Label for="password" class="text-right"> parol </Label>
          <Input
            class="col-span-3"
            type="text"
            v-model="state.password"
            id="password"
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
</template>
