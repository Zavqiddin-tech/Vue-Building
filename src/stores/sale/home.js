import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useHomeStore = defineStore("home", () => {
  const home = ref([]);
  const homeResult = ref({});

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_home = async () => {
    await api
      .getAxios({
        url: "sale/home/all",
      })
      .then((res) => {
        home.value = [...res.data];
        homeResult.value.countHome = home.value.length
        let openHome = 0
        let busyHome = 0
        for (let i = 0; i < home.value.length; i++) {
          if (home.value[i].isBusy == false) {
            openHome += 1 
          }
          if (home.value[i].isBusy == true) {
            busyHome += 1 
          }
        }
        homeResult.value.openHome = openHome
        homeResult.value.busyHome = busyHome
      });
  };

  const get_all_home_not_busy = async () => {
    return await api.getAxios({
      url: "sale/home/all/not-busy",
    });
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
        home.value = home.value.map((item) => {
          if (item.id == res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
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
    homeResult,
    get_all_home,
    get_all_home_not_busy,
    get_home,
    new_home,
    update_home,
    delete_home,
  };
});
