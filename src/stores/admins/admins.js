import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useAdminsStore = defineStore("admins", () => {
  const admins = ref([]);
	const setAdmins = (val) => {
		admins.value = val
	}

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_admins = async () => {
    await api
      .getAxios({
        url: "auth/admins",
      })
      .then((res) => {
				console.log(res.data);
        admins.value = [...res.data.admins];
      });
  };

  // Yangi ishchi qo'shish
  const new_admin = async (data) => {
    await api
      .postAxios({
        url: "auth/admins",
        data,
      })
      .then((res) => {
        admins.value = [res.data, ...admins.value];
      });
  };

  // Bitta ishchini olish
  const get_admin = async (_id) => {
    return await api.getAxios({
      url: `auth/admins/${_id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_admin = async (data) => {
    await api
      .putAxios({
        url: `auth/admins/${data._id}`,
        data,
      })
      .then((res) => {
        admins.value = admins.value.map((item) => {
          if (item._id == res.data._id) return res.data;
          return item;
        });
        admins.value = [...admins.value];
      });
  };
  const change_status = async (data) => {
    await api
      .putAxios({
        url: `auth/admins/changestatus`,
        data,
      })
      .then((res) => {
        admins.value = [...res.data.admins];
      });
  };

  // Ishchini o'chirish
  const delete_admin = async (_id) => {
    await api
      .deleteAxios({
        url: `auth/admins/delete/${_id}`
      })
      .then(() => {
        admins.value = admins.value.filter((item) => {
          if (item.id == _id) return false;
          return item;
        });
        admins.value = [...admins.value];
      });
  };


 
  return {
    admins,
		setAdmins,
    get_all_admins,
    get_admin,
    new_admin,
    update_admin,
    change_status,
    delete_admin,
  };
});
