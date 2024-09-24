import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useDollarStore = defineStore("dollar", () => {
  const dollar = ref([]);

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_dollar = async () => {
    await api
      .getAxios({
        url: "dollar/all",
      })
      .then((res) => {
        dollar.value = [...res.data];
      });
  };


  // Yangi ishchi qo'shish
  const new_dollar = async (data) => {
    await api
      .postAxios({
        url: "dollar/create",
        data,
      })
      .then((res) => {
        dollar.value = [...res.data];
      })
  };

  // Bitta ishchini olish
  const get_dollar = async (id) => {
    return await api.getAxios({
      url: `dollar/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_dollar = async (data) => {
    await api
      .putAxios({
        url: `dollar/update/${data.id}`,
        data,
      })
      .then((res) => {
        dollar.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_dollar = async (id) => {
    await api
      .deleteAxios({
        url: `dollar/delete/${id}`,
      })
      .then((res) => {
        dollar.value = [...res.data];
      });
  };

  return {
    dollar,
    get_all_dollar,
    get_dollar,
    new_dollar,
    update_dollar,
    delete_dollar,
  };
});
