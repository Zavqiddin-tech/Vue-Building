import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useHomeStore = defineStore("home", () => {
  const home = ref([]);

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_home = async () => {
    await api
      .getAxios({
        url: "sale/home/all",
      })
      .then((res) => {
        home.value = [...res.data];
      });
  };
  
  const get_all_home_not_busy = async () => {
   return await api
      .getAxios({
        url: "sale/home/all/not-busy",
      })
      
  };

  // Yangi ishchi qo'shish
  const new_home = async (data) => {
    await api
      .postAxios({
        url: "sale/home/create",
        data,
      })
      .then((res) => {
        home.value = [...home.value, res.data];
      });
  };

  // Bitta ishchini olish
  const get_home = async (id) => {
    return await api.getAxios({
      url: `sale/home/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_home = async (data) => {
    await api
      .putAxios({
        url: `sale/home/update/${data.id}`,
        data,
      })
      .then((res) => {
        home.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_home = async (id) => {
    await api
      .deleteAxios({
        url: `sale/home/delete/${id}`,
      })
      .then((res) => {
        home.value = [...res.data];
      });
  };

  return {
    home,
    get_all_home,
    get_all_home_not_busy,
    get_home,
    new_home,
    update_home,
    delete_home,
  };
});
