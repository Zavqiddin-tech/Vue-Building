import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useContractStore = defineStore("contract", () => {
  const contract = ref([]);
  const oneContract = ref({})
  const contractResult = ref({})

  const api = useApiStore();

  // Barcha olish
  const get_all_contract = async () => {
    await api
      .getAxios({
        url: "sale/contract/all",
      })
      .then((res) => {
        contract.value = [...res.data];
        contractResult.value.count = contract.value.length
        let allPrice = 0
        let allPaid = 0
        for (let i = 0; i < contract.value.length; i++) {
         allPrice += contract.value[i].price
         allPaid += contract.value[i].paid
        }
        contractResult.value.price = allPrice
        contractResult.value.paid = allPaid
        contractResult.value.qarz = allPrice - allPaid

      });
  };

  // Yangi qo'shish
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
        contract.value = contract.value.map((item) => {
          if (item.id == res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
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
    contractResult,
    get_all_contract,
    get_contract,
    new_contract,
    update_contract,
    delete_contract,
  };
});
