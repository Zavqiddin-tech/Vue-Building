import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useAdminsStore = defineStore("admins", () => {
  const admins = ref([]);
  const adminRole = ref('')
  const setAdmins = (val) => {
    admins.value = val;
  };
  const setAdminRole = (val) => {
    adminRole.value = val;
  };

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_admins = async () => {
    await api
      .getAxios({
        url: "auth/admins",
      })
      .then((res) => {
        admins.value = [...res.data];
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
        admins.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_admin = async (id) => {
    return await api.getAxios({
      url: `auth/admins/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_admin = async (data) => {
    await api
      .putAxios({
        url: `auth/admins/${data.id}`,
        data,
      })
      .then((res) => {
        admins.value = [...res.data];
      });
  };
  const change_status = async (data) => {
    await api
      .putAxios({
        url: `auth/admins/changestatus`,
        data,
      })
      .then((res) => {
        admins.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_admin = async (id) => {
    await api
      .deleteAxios({
        url: `auth/admins/delete/${id}`,
      })
      .then(() => {
        admins.value = [...res.data];
      });
  };

  return {
    admins,
    adminRole,
    setAdmins,
    setAdminRole,
    get_all_admins,
    get_admin,
    new_admin,
    update_admin,
    change_status,
    delete_admin,
  };
});
