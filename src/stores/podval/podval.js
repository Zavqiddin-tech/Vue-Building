import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const usePodvalStore = defineStore("podval", () => {
  const podval = ref([]);

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_podval = async () => {
    await api
      .getAxios({
        url: "podval/all",
      })
      .then((res) => {
        console.log(res.data);
        podval.value = [...res.data];
      });
  };

  // Yangi ishchi qo'shish
  const new_podval = async (data) => {
    await api
      .postAxios({
        url: "podval/create",
        data,
      })
      .then((res) => {
				console.log(res.data);
        podval.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_podval = async (id) => {
    return await api.getAxios({
      url: `podval/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_podval = async (data) => {
    await api
      .putAxios({
        url: `podval/update/${data.id}`,
        data,
      })
      .then((res) => {
        console.log(res.data);
        
        podval.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_podval = async (_id) => {
    await api
      .deleteAxios({
        url: `podval/${_id}`
      })
      .then(() => {
        podval.value = podval.value.filter((item) => {
          if (item._id == _id) return false;
          return item;
        });
        podval.value = [...podval.value];
      });
  };


 
  return {
    podval,
    get_all_podval,
    get_podval,
    new_podval,
    update_podval,
    delete_podval,
  };
});
