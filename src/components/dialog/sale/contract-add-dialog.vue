<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

//store
import { useModalStore } from "@/stores/modal";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();
import { useHomeStore } from "@/stores/sale/home";
import { useClientStore } from "@/stores/sale/client";
import { useContractStore } from "@/stores/sale/contract";
const { get_all_home_not_busy } = useHomeStore();
const { get_all_client } = useClientStore();
const { client } = storeToRefs(useClientStore());
const {new_contract} = useContractStore()

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const state = ref({});
const notBusyHomes = ref([]);
const add = () => {
  if (state.value.price && state.value.home && state.value.client) {
    if (updateModal.value) {
      alert('update mavjud emas !!!')
    } else {
      new_contract({ ...state.value });
      handleClose();
      state.value = {}
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
    const res = await get_exit(nowId.value);
    if (res.status == 200) {
      state.value = res.data;
    }
  }
});

onMounted(async () => {
  await get_all_home_not_busy().then((res) => {
    notBusyHomes.value = [...res.data];
  });
  await get_all_client()
});
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">Kiritish</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Shartnoma qilish bo'limi</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div>
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
          <Select v-model="state.home">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Uyni tanlang" />
            </SelectTrigger>
            <SelectContent
              v-if="Array.isArray(notBusyHomes) && notBusyHomes.length > 0"
            >
              <SelectGroup>
                <SelectLabel>Bo'sh uylar ro'yxati</SelectLabel>
                <SelectItem v-for="item of notBusyHomes" :value="item.id">
                  {{ item.home }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="mb-4">
          <Select v-model="state.client">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Mijozni tanlang" />
            </SelectTrigger>
            <SelectContent
              v-if="Array.isArray(client) && client.length > 0"
            >
              <SelectGroup>
                <SelectLabel>Mijozlar o'yxati</SelectLabel>
                <SelectItem v-for="item of client" :value="item.id">
                  {{ item.fName }} {{ item.lName }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="mb-4">
          <Textarea
            class="w-full mt-2"
            v-model="state.detail"
            id="detail"
            placeholder="batafsil, majburiy emas"
          />
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
