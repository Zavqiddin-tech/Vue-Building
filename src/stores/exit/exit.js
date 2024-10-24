import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useExitStore = defineStore("exit", () => {
  const exit = ref([]);
  const exitResult = ref({})

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_exit = async () => {
    await api
      .getAxios({
        url: "exit/all",
      })
      .then((res) => {
        exit.value = [...res.data];
      });
  };

    // natijani olish
    const get_exit_result = async () => {
      await api
        .getAxios({
          url: "exit/result",
        })
        .then((res) => {
          exitResult.value = res.data
        });
    };

  // Yangi ishchi qo'shish
  const new_exit = async (data) => {
    await api
      .postAxios({
        url: "exit/create",
        data,
      })
      .then((res) => {
        exit.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_exit = async (id) => {
    return await api.getAxios({
      url: `exit/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_exit = async (data) => {
    await api
      .putAxios({
        url: `exit/update/${data.id}`,
        data,
      })
      .then((res) => {
        exit.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_exit = async (_id) => {
    await api
      .deleteAxios({
        url: `exit/delete/${_id}`
      })
      .then((res) => {
        exit.value = [...res.data];
      });
  };


 
  return {
    exit,
    exitResult,
    get_all_exit,
    get_exit_result,
    get_exit,
    new_exit,
    update_exit,
    delete_exit,
  };
});
