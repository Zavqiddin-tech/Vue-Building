import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useInvestStore = defineStore("invest", () => {
  const invest = ref([]);

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_invest = async () => {
    await api
      .getAxios({
        url: "invest/all",
      })
      .then((res) => {
        console.log(res.data);
        invest.value = [...res.data];
      });
  };

  // Yangi ishchi qo'shish
  const new_invest = async (data) => {
    await api
      .postAxios({
        url: "invest/create",
        data,
      })
      .then((res) => {
				console.log(res.data);
        invest.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_invest = async (id) => {
    return await api.getAxios({
      url: `invest/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_invest = async (data) => {
    await api
      .putAxios({
        url: `invest/update/${data.id}`,
        data,
      })
      .then((res) => {
        console.log(res.data);
        
        invest.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_invest = async (_id) => {
    await api
      .deleteAxios({
        url: `invest/${_id}`
      })
      .then(() => {
        invest.value = invest.value.filter((item) => {
          if (item._id == _id) return false;
          return item;
        });
        invest.value = [...invest.value];
      });
  };


 
  return {
    invest,
    get_all_invest,
    get_invest,
    new_invest,
    update_invest,
    delete_invest,
  };
});
