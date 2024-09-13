import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";
import { data } from "autoprefixer";

export const useKatlavanStore = defineStore("katlavan", () => {
  const katlavan = ref([]);
  const katlavanResult = ref(0);

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_katlavan = async () => {
    await api
      .getAxios({
        url: "katlavan/all",
      })
      .then((res) => {
        katlavan.value = [...res.data];
      });
  };

  // natijani olish
  const get_katlavan_result = async () => {
    await api
      .getAxios({
        url: "katlavan/result",
      })
      .then((res) => {
        katlavanResult.value = res.data;
      });
  };

  // Yangi ishchi qo'shish
  const new_katlavan = async (data) => {
    await api
      .postAxios({
        url: "katlavan/create",
        data,
      })
      .then((res) => {
        katlavan.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_katlavan = async (id) => {
    return await api.getAxios({
      url: `katlavan/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_katlavan = async (data) => {
    await api
      .putAxios({
        url: `katlavan/update/${data.id}`,
        data,
      })
      .then((res) => {
        katlavan.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_katlavan = async (id) => {
    await api
      .deleteAxios({
        url: `katlavan/delete/${id}`,
      })
      .then((res) => {
        katlavan.value = [...res.data];
      });
  };

  return {
    katlavan,
    katlavanResult,
    get_all_katlavan,
    get_katlavan_result,
    get_katlavan,
    new_katlavan,
    update_katlavan,
    delete_katlavan,
  };
});
