<script setup>
import { ref } from "vue";
import { useKatlavanStore } from "@/stores/katlavan/katlavan";
const { new_katlavan } = useKatlavanStore();

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
const toggle = ref(false);
const setToggle = (val) => (toggle.value = val);
const add = () => {
  if (state.value.title && state.value.price && state.value.detail) {
    new_katlavan(state.value);
    state.value = {};
    setToggle(false);
  } else {
    toast({
      title: "E'tibor bering",
      description: "Barcha maydon to'ldirilishi shart !",
    });
  }
};
</script>

<template>
  <Dialog v-model:open="toggle">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">Chiqim</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Katlavan rasxodlar</DialogTitle>
        <DialogDescription>
          ma'lumotlarni kiritishda e'tiborli bo'ling !
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
