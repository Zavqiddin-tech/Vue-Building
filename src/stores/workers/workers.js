import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useWorkersStore = defineStore("workers", () => {
  const workers = ref([]);
  const workersResult = ref(0)

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_workers = async () => {
    await api
      .getAxios({
        url: "workers/all",
      })
      .then((res) => {
        workers.value = [...res.data];
      });
  };

  // natijani olish
  const get_worker_result = async () => {
    await api
      .getAxios({
        url: "workers/result",
      })
      .then((res) => {
        workersResult.value = res.data
      });
  };

  // Yangi ishchi qo'shish
  const new_worker = async (data) => {
    await api
      .postAxios({
        url: "workers/create",
        data,
      })
      .then((res) => {
        workers.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_worker = async (id) => {
    return await api.getAxios({
      url: `workers/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_worker = async (data) => {
    await api
      .putAxios({
        url: `workers/update/${data.id}`,
        data,
      })
      .then((res) => {
        workers.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_worker = async (id) => {
    await api
      .deleteAxios({
        url: `workers/delete/${id}`
      })
      .then((res) => {
        workers.value = [...res.data];
      });
  };


 
  return {
    workers,
    workersResult,
    get_all_workers,
    get_worker_result,
    get_worker,
    new_worker,
    update_worker,
    delete_worker,
  };
});
