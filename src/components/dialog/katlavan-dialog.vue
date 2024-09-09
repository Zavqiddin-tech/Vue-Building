<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";


//store
import { useModalStore } from '@/stores/modal';
const {modal, updateModal, nowId} = storeToRefs(useModalStore())
const {setModal, setUpdateModal, setNowId} = useModalStore()
import { useKatlavanStore } from "@/stores/katlavan/katlavan";
const { new_katlavan, update_katlavan, get_katlavan } = useKatlavanStore();

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
const add = () => {
	if(state.value.title && state.value.price) {
    if (updateModal.value) {
      update_katlavan(state.value)
      handleClose()
    } else {
      new_katlavan(state.value)
      handleClose()
    }
	} else {
		toast({
        title: "E'tibor bering",
        description: "Barcha maydon to'ldirilishi shart !",
      });
	}
}

const handleClose = () => {
  state.value = {}
    setModal(false)
    setUpdateModal(false)
    setNowId('')
}

const onClose = (isOpen)=> {
  if (isOpen == false) {
    handleClose()
  }
}

watch(updateModal, async () => {
  if (updateModal.value) {
    const res = await get_katlavan(nowId.value)
    if(res.status == 200) {
      state.value = res.data
    }
  }
})
</script>

<template>
  <Dialog v-model:open="modal" @update:open="onClose">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">Chiqim</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Katlavan rasxodlar</DialogTitle>
        <DialogDescription class="pt-3 text-red-400">
          Ma'lumotlarni to'g'ri kiriting !
        </DialogDescription>
      </DialogHeader>
      <div>
        <div class="mb-4">
          <Label for="title" class="text-right"> Nomi </Label>
          <Input class="mt-2" v-model="state.title" id="title" />
        </div>
        <div class="mb-4">
          <Label for="price" class="text-right"> Narxi </Label>
          <Input class="mt-2" v-model="state.price" type="number" id="price" />
        </div>
        <div class="mb-4">
          <Label for="detail" class="text-right"> Batafsil </Label>
          <Textarea class="w-full mt-2" v-model="state.detail" id="detail" />
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
