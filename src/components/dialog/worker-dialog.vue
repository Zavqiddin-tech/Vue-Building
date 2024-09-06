<script setup >
import {ref} from 'vue'
import { useWorkersStore } from '@/stores/workers/workers';
const {new_worker} = useWorkersStore()

const state = ref({})
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
const toggle = ref(false)
const setToggle = (val) => toggle.value = val
const add = () => {
	if(state.value.fName && state.value.lName && state.value.phone) {
		new_worker(state.value)
		state.value = {}
		setToggle(false)
	}
}
</script>

<template>
  <Dialog v-model:open="toggle">
    <DialogTrigger as-child>
      <Button class="bg-[#603cff] hover:bg-[#603cffbe]">qo'shish</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Ismi </Label>
          <Input class="col-span-3" v-model="state.fName"/>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Familyasi </Label>
          <Input class="col-span-3" v-model="state.lName"/>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Telefon </Label>
          <Input class="col-span-3" v-model="state.phone"/>
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
