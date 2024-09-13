import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useFloorStore = defineStore("floor", () => {
  const floor = ref([]);
  const floorResult = ref(0)

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_floor = async () => {
    await api
      .getAxios({
        url: "floor/all",
      })
      .then((res) => {
        floor.value = [...res.data];
      });
  };

    // natijani olish
    const get_floor_result = async () => {
      await api
        .getAxios({
          url: "floor/result",
        })
        .then((res) => {
          floorResult.value = res.data
        });
    };

  // Yangi ishchi qo'shish
  const new_floor = async (data) => {
    await api
      .postAxios({
        url: "floor/create",
        data,
      })
      .then((res) => {
        floor.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_floor = async (id) => {
    return await api.getAxios({
      url: `floor/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_floor = async (data) => {
    await api
      .putAxios({
        url: `floor/update/${data.id}`,
        data,
      })
      .then((res) => {
        floor.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_floor = async (_id) => {
    await api
      .deleteAxios({
        url: `floor/delete/${_id}`
      })
      .then((res) => {
        floor.value = [...res.data];
      });
  };


 
  return {
    floor,
    floorResult,
    get_all_floor,
    get_floor_result,
    get_floor,
    new_floor,
    update_floor,
    delete_floor,
  };
});
