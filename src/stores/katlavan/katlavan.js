import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";
import { data } from "autoprefixer";

export const useKatlavanStore = defineStore("katlavan", () => {
  const katlavan = ref([]);
  const katlavanResult = ref(0)

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_katlavan = async () => {
    await api
      .getAxios({
        url: "katlavan/all",
      })
      .then((res) => {
        console.log(res.data);
        katlavan.value = [...res.data.allKatlavan];
      });
  };

  // natijani olish
  const get_katlavan_result = async () => {
    console.log('get get');
    await api
      .getAxios({
        url: "katlavan/result",
      })
      .then((res) => {
        console.log(res.data);
        katlavanResult.value = res.data
      });
  };

  // Yangi ishchi qo'shish
  const new_katlavan = async (data) => {
    await api
      .postAxios({
        url: "katlavan/create",
        data,
      })
      .then((res) => {
				console.log(res.data);
        katlavan.value = [...res.data.allKatlavan];
      });
  };

  // Bitta ishchini olish
  const get_katlavan = async (_id) => {
    return await api.getAxios({
      url: `katlavan/${_id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_katlavan = async (data) => {
    await api
      .putAxios({
        url: `katlavan/${data._id}`,
        data,
      })
      .then((res) => {
        katlavan.value = katlavan.value.map((item) => {
          if (item._id == res.data._id) return res.data;
          return item;
        });
        katlavan.value = [...katlavan.value];
      });
  };

  // Ishchini o'chirish
  const delete_katlavan = async (_id) => {
    await api
      .deleteAxios({
        url: `katlavan/${_id}`
      })
      .then(() => {
        katlavan.value = katlavan.value.filter((item) => {
          if (item._id == _id) return false;
          return item;
        });
        katlavan.value = [...katlavan.value];
      });
  };


 
  return {
    katlavan,
    katlavanResult,
    get_all_katlavan,
    get_katlavan_result,
    get_katlavan,
    new_katlavan,
    update_katlavan,
    delete_katlavan,
  };
});
