<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

//store
import { useAuthStore } from "@/stores/auth/auth";
const {login} = useAuthStore()

//shadcn ui
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    userName: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
	login(values)
});
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-[#022726]">
    <div class="p-4 bg-white dark:bg-black w-[350px] rounded-lg">
      <div class="pb-6 flex justify-center">
        <div>
          <div class="text-2xl font-medium">Login</div>
        </div>
      </div>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="userName">
          <FormItem>
            <FormLabel>Username</FormLabel>
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
        <FormField  v-slot="{ componentField }" name="password">
          <FormItem class="mt-5">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                v-bind="componentField"
                autocomplete="off"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="mt-5 bg-green-500"> Submit </Button>
      </form>
    </div>
  </div>
</template>

<style lang="scss"></style>
