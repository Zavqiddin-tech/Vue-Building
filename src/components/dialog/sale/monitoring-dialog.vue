<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const routeId = useRoute().params.id;

//store
import { useModalStore } from "@/stores/modal";
import { useMonitoringStore } from "@/stores/sale/monitoring";
const { modal, updateModal, nowId } = storeToRefs(useModalStore());
const { setModal, setUpdateModal, setNowId } = useModalStore();
const { new_monitoring } = useMonitoringStore();

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
// shadcn

const state = ref({});
const add = () => {
  if (state.value.amount) {
    if (updateModal.value) {
      alert('hozircha update mavjud emas !!!')
    } else {
      new_monitoring(state.value, routeId);
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
    const res = await get_home(nowId.value);
    if (res.status == 200) {
      state.value = res.data;
    }
  }
});
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">To'lov</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>To'lov qilish</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label class="text-right"> To'lov </Label>
          <Input type="number" class="col-span-3" v-model="state.amount" />
        </div>
      </div>

      <div class="">
        <Textarea
          class="w-full mt-2"
          v-model="state.detail"
          id="detail"
          placeholder="batafsil, majburiy emas"
        />
      </div>

      <DialogFooter>
        <Button @click="add()" class="bg-[#603cff] hover:bg-[#603cffbe]">
          saqlash
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
