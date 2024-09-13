import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";
import { useTokenStore } from "@/stores/auth/token";
import { useAdminsStore } from "../admins/admins";
import cookies from "vue-cookies";
import router from "@/router";


export const useAuthStore = defineStore("auth", () => {
  const api = useApiStore();
  const tokenStore = useTokenStore();
  const { setAdmins, setAdminRole } = useAdminsStore();

  const regis = async (data) => {
    await api
      .postAxios({
        url: "auth/regis",
        data,
      })
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = async (data) => {
    await api
      .postAxios({
        url: "auth/login",
        data,
      })
      .then((res) => {
        if (res.data.accessToken) {
          tokenStore.setToken(res.data.accessToken);
          setAdminRole(res.data.role);
          if (res.data.role == "manager") {
            router.push("/podval");
          }
          if (res.data.role == "admin" || res.data.role == 'director') {
            router.push("/dashboard");
          }
        }
      });
  };

  const checkUser = async () => {
    if (cookies.isKey("build-token")) {
      tokenStore.setToken(cookies.get("build-token"));
    }
    let res = await api.getAxios({
      url: "auth/checkuser",
    });
    if (res.status == 200) {
      console.log("success");
    }
  };
  const checkAdmin = async () => {
    if (cookies.isKey("build-token")) {
      tokenStore.setToken(cookies.get("build-token"));
    }
    await api
      .getAxios({
        url: "auth/checkAdmin",
      })
      .then((res) => {
        setAdminRole(res.data.role);
        if (res.data.role == 'manager') {
          router.push('/podval')
        } else {
          console.log('success');
        }
      });
  };

  const get_admin = async () => {
    return await api.getAxios({
      url: "auth/one",
    });
  };

  const get_user = async (id) => {
    return await api.getAxios({
      url: `auth/one/${id}`,
    });
  };

  const update_admin = async (data) => {
    await api
      .patchAxios({
        url: `auth/update/admin/${data.id}`,
        data,
      })
      .then((res) => {
        setAdmins(res.data)
      });
  };

  return {
    regis,
    login,
    checkUser,
    checkAdmin,
    get_admin,
    get_user,
    update_admin,
  };
});
