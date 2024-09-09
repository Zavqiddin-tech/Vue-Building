<script setup>
import { ref, onMounted } from "vue";
import cookies from "vue-cookies";
import { convertDate } from "@/func/date";
import { useAuthStore } from "@/stores/auth/auth";
const { checkAdmin, get_admin } = useAuthStore();
const state = ref({ fName: "", lName: "" });

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LogOut = () => {
  cookies.remove("build-token");
  location.reload();
};

onMounted(async () => {
  const res = await get_admin();
  if (res.status == 200) {
    state.value = res.data;
    console.log(res.data);
  }
});
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="text-2xl font-bold">
      <div>Life Town building</div>
      <div class="pt-2 text-base font-light">
        Qurilish boshqaruvi va hisobotlar jamlanmasi
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div>
        {{ convertDate(new Date(), 1) }}
      </div>
      <div
        class="w-10 h-10 text-[20px] flex justify-center items-center rounded-md bg-gray-200"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <Popover>
        <PopoverTrigger>
          <Avatar class="bg-[#603cff]">
            <AvatarImage
              src="https://github.com/radix-vue.png"
              alt="@radix-vue"
            />
            <AvatarFallback
              ><span class="text-base text-white font-medium uppercase"
                >{{ state.fName[0] }} {{ state.lName[0] }}</span
              ></AvatarFallback
            >
          </Avatar>
        </PopoverTrigger>
        <PopoverContent class="bg-white/20 backdrop-blur">
          <div v-if="state">
            <div class="pb-2 text-center capitalize">{{ state.fName }}</div>
            <div
              class="w-12 h-12 m-auto mb-2 rounded-full flex justify-center items-center text-xl text-white font-semibold bg-[#603cff] capitalize"
            >
              {{ state.fName[0] }}
            </div>
            <div class="text-center capitalize">
              {{ state.fName }} {{ state.lName }}
            </div>
            <div class="px-3 py-2 text-base hover:bg-black/10 rounded-md">
              @ {{ state.userName }}
            </div>
            <div class="px-3 py-2 hover:bg-black/10 rounded-md">
              <i class="fa-regular fa-circle-user"></i> {{ state.role }}
            </div>
          </div>
          <div
            @click="LogOut()"
            class="px-3 py-2 hover:bg-black/10 rounded-md cursor-pointer"
          >
            <i class="fa-solid fa-power-off"></i> Chqish
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
