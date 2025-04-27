import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useClientStore = defineStore("client", () => {
  const client = ref([]);

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_client = async () => {
    await api
      .getAxios({
        url: "sale/client/all",
      })
      .then((res) => {
        client.value = [...res.data];
      });
  };

  // Yangi ishchi qo'shish
  const new_client = async (data) => {
    await api
      .postAxios({
        url: "sale/client/create",
        data,
      })
      .then((res) => {
        client.value = [res.data, ...client.value];
      });
  };

  // Bitta ishchini olish
  const get_client = async (id) => {
    return await api.getAxios({
      url: `sale/client/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_client = async (data) => {
    await api
      .putAxios({
        url: `sale/client/update/${data.id}`,
        data,
      })
      .then((res) => {
        client.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_client = async (id) => {
    await api
      .deleteAxios({
        url: `sale/client/delete/${id}`,
      })
      .then((res) => {
        
      });
  };

  return {
    client,
    get_all_client,
    get_client,
    new_client,
    update_client,
    delete_client,
  };
});
