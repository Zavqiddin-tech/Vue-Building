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
    console.log('get get');
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
  const get_worker = async (_id) => {
    return await api.getAxios({
      url: `workers/${_id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_worker = async (data) => {
    await api
      .putAxios({
        url: `workers/${data._id}`,
        data,
      })
      .then((res) => {
        workers.value = workers.value.map((item) => {
          if (item._id == res.data._id) return res.data;
          return item;
        });
        workers.value = [...workers.value];
      });
  };

  // Ishchini o'chirish
  const delete_worker = async (_id) => {
    await api
      .deleteAxios({
        url: `workers/${_id}`
      })
      .then(() => {
        workers.value = workers.value.filter((item) => {
          if (item._id == _id) return false;
          return item;
        });
        workers.value = [...workers.value];
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
