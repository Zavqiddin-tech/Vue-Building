import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useContractStore = defineStore("contract", () => {
  const contract = ref([]);
  const oneContract = ref({})

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_contract = async () => {
    await api
      .getAxios({
        url: "sale/contract/all",
      })
      .then((res) => {
        contract.value = [...res.data];
      });
  };

  // Yangi ishchi qo'shish
  const new_contract = async (data) => {
    await api
      .postAxios({
        url: "sale/contract/create",
        data,
      })
      .then((res) => {
        contract.value = [...contract.value, res.data];
      });
  };

  // Bitta ishchini olish
  const get_contract = async (id) => {
    await api.getAxios({
      url: `sale/contract/one/${id}`,
    }).then(res => {
      oneContract.value = {...res.data}
    })
  };

  // Ma'lumotni yangilab saqlash
  const update_contract = async (data) => {
    await api
      .putAxios({
        url: `sale/contract/update/${data.id}`,
        data,
      })
      .then((res) => {
        contract.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_contract = async (id) => {
    await api
      .deleteAxios({
        url: `sale/contract/delete/${id}`,
      })
      .then((res) => {
        contract.value = [...res.data];
      });
  };

  return {
    contract,
    oneContract,
    get_all_contract,
    get_contract,
    new_contract,
    update_contract,
    delete_contract,
  };
});
