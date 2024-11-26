import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useApiStore } from "@/stores/api/api";
import { useContractStore } from "./contract";

export const useMonitoringStore = defineStore("monitoring", () => {
  const monitoring = ref([]);

  const api = useApiStore();

  const { oneContract } = storeToRefs(useContractStore());

  // Barcha ishchilarni olish
  const get_all_monitoring = async (routeId) => {
    await api
      .getAxios({
        url: `sale/monitoring/all/${routeId}`,
      })
      .then((res) => {
        console.log(res.data);
        monitoring.value = [...res.data];
      });
  };

  // Yangi ishchi qo'shish
  const new_monitoring = async (data, routeId) => {
    await api
      .postAxios({
        url: `sale/monitoring/create/${routeId}`,
        data,
      })
      .then((res) => {
        monitoring.value = [res.data.newMonitoring, ...monitoring.value];
        oneContract.value = {...res.data.contract}
      });
  };

  // Bitta ishchini olish
  const get_monitoring = async (id) => {
    return await api.getAxios({
      url: `sale/monitoring/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_monitoring = async (data) => {
    await api
      .putAxios({
        url: `sale/monitoring/update/${data.id}`,
        data,
      })
      .then((res) => {
        monitoring.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_monitoring = async (id) => {
    await api
      .deleteAxios({
        url: `sale/monitoring/delete/${id}`,
      })
      .then((res) => {
        monitoring.value = [...res.data];
      });
  };

  return {
    monitoring,
    get_all_monitoring,
    get_monitoring,
    new_monitoring,
    update_monitoring,
    delete_monitoring,
  };
});
