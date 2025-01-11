import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useInvestStore = defineStore("invest", () => {
  const invest = ref([]);
  const investResult = ref({});
  const dilmurodResult = ref({})
  const rustamResult = ref({})


  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_invest = async () => {
    await api
      .getAxios({
        url: "invest/all",
      })
      .then((res) => {
        invest.value = [...res.data];
        let dA = 0
        let dC = 0
        let rA = 0
        let rC = 0
        for(let i = 0; i < invest.value.length; i++) {
          if (invest.value[i].name == 'dilmurod') {
            dA += invest.value[i].amount
            dC += Number(invest.value[i].convert)
          } 
          if (invest.value[i].name == 'rustam aka') {
            rA += invest.value[i].amount
            rC += Number(invest.value[i].convert)
          } 
        }
        dilmurodResult.value.amount = dA
        dilmurodResult.value.convert = dC
        rustamResult.value.amount = rA
        rustamResult.value.convert = rC
      });
  };

  // natijani olish
  const get_invest_result = async () => {
    await api
      .getAxios({
        url: "invest/result",
      })
      .then((res) => {
        investResult.value = res.data;
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
        url: `invest/delete/${id}`,
      })
      .then((res) => {
        invest.value = [...res.data];
      });
  };

  return {
    invest,
    investResult,
    dilmurodResult,
    rustamResult,
    get_all_invest,
    get_invest_result,
    get_invest,
    new_invest,
    update_invest,
    delete_invest,
  };
});
