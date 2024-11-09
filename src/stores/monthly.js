import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useMonthlyStore = defineStore("monthly", () => {
  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_month_invest = async () => {
   return await api
      .getAxios({
        url: "invest/month",
      })
  };
  const get_month_each = async (id) => {
   return await api
      .getAxios({
        url: `each/month/${id}`,
      })
  };
  const get_month_salary = async () => {
   return await api
      .getAxios({
        url: 'salary/month',
      })
  };
  const get_month_katlavan = async () => {
   return await api
      .getAxios({
        url: "katlavan/month",
      })
  };
  const get_month_podval = async () => {
   return await api
      .getAxios({
        url: "podval/month",
      })
  };
  const get_month_exit = async () => {
   return await api
      .getAxios({
        url: "exit/month",
      })
  };

  return {
    get_month_invest,
    get_month_each,
    get_month_salary,
    get_month_katlavan,
    get_month_podval,
    get_month_exit,
  };
});
