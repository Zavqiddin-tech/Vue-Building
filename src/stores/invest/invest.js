import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useInvestStore = defineStore("invest", () => {
  const invest = ref([]);
  const investResult = ref(0)

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

    // natijani olish
    const get_invest_result = async () => {
      console.log('get get');
      await api
        .getAxios({
          url: "invest/result",
        })
        .then((res) => {
          console.log(res.data);
          investResult.value = res.data
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
        invest.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_invest = async (id) => {
    await api
      .deleteAxios({
        url: `invest/delete/${id}`
      })
      .then((res) => {
        invest.value = [...res.data];
      });
  };


 
  return {
    invest,
    investResult,
    get_all_invest,
    get_invest_result,
    get_invest,
    new_invest,
    update_invest,
    delete_invest,
  };
});
