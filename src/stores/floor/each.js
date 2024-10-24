import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useEachStore = defineStore("each", () => {
  const each = ref([]);
  const eachResult = ref({})

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_each = async (id) => {
    await api
      .getAxios({
        url: `each/all/${id}`,
      })
      .then((res) => {
        each.value = [...res.data];
      });
  };

    // natijani olish
    const get_each_result = async () => {
      await api
        .getAxios({
          url: "each/result",
        })
        .then((res) => {
          eachResult.value = res.data
        });
    };

  // Yangi ishchi qo'shish
  const new_each = async (data, id) => {
    await api
      .postAxios({
        url: `each/create/${id}`,
        data,
      })
      .then((res) => {
        each.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_each = async (id) => {
    return await api.getAxios({
      url: `each/one/${id}`,
    });
  };
  
  const get_oneEach_result = async (id) => {
    return await api.getAxios({
      url: `each/one/result/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_each = async (data, routeId) => {
    await api
      .putAxios({
        url: `each/update/${data.id}/${routeId}`,
        data,
      })
      .then((res) => {
        each.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_each = async (id, routeId) => {
    await api
      .deleteAxios({
        url: `each/delete/${id}/${routeId}`
      })
      .then((res) => {
        each.value = [...res.data];
      });
  };


 
  return {
    each,
    eachResult,
    get_all_each,
    get_each_result,
    get_oneEach_result,
    get_each,
    new_each,
    update_each,
    delete_each,
  };
});
