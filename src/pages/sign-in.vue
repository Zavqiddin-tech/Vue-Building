<script setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import signInTable from "@/components/table/sign-in-table.vue";
import { useAuthStore } from "@/stores/auth/auth";
const {regis} = useAuthStore()

//shadcn
import Button from "@/components/ui/button/Button.vue";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

// boshqa
const sheetToggle = ref(false);
const setSheetToggle = (val) => (sheetToggle.value = val);
const roles = ref(["admin", "director", "manager"])


// form
const formSchema = toTypedSchema(
  z.object({
		fName: z.string().min(2).max(50),
		lName: z.string().min(2).max(50),
    userName: z.string(),
    role: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
  })
);
const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit((values) => {
  regis(values)
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-xl font-semibold">Adminlar ro'yxati</div>
    <div><Button @click="setSheetToggle(true)" class="bg-[#603cff] hover:bg-[#603cffbe]">qo'shish</Button></div>
  </div>
  <signInTable />

  <!-- Sheet -->
  <Sheet v-model:open="sheetToggle">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          <form @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="fName">
              <FormItem class="mb-8">
                <FormLabel>Ismi</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    v-bind="componentField"
                    autocomplete="off"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="lName">
              <FormItem class="mb-8">
                <FormLabel>Familyasi</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    v-bind="componentField"
                    autocomplete="off"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="userName">
              <FormItem class="mb-8">
                <FormLabel>user-name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    v-bind="componentField"
                    autocomplete="off"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="role">
              <FormItem class="mb-8">
                <FormLabel>role</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue placeholder="Lavozim tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kim ?</SelectLabel>
                        <SelectItem v-for="item of roles" :value="item"> {{ item }} </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem class="mb-8">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    v-bind="componentField"
                    autocomplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit" class="bg-[#603cff] hover:bg-[#603cffbe]"> Submit </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
