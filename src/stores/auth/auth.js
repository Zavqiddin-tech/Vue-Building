import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";
import { useTokenStore } from "@/stores/auth/token";
import { useAdminsStore } from "../admins/admins";
import cookies from "vue-cookies";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const api = useApiStore();
  const tokenStore = useTokenStore();
  const { setAdmins } = useAdminsStore();

  const regis = async (data) => {
    await api
      .postAxios({
        url: "auth/regis",
        data,
      })
      .then((res) => {
        console.log(res.data);
        setAdmins(res.data.admins);
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
        console.log(res.data);
        if (res.data.accessToken) {
          tokenStore.setToken(res.data.accessToken);
          router.push("/dashboard");
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
    await api.getAxios({
      url: "auth/checkAdmin",
    });
  };

  const get_admin = async () => {
    return await api.getAxios({ url: "auth/one" });
  };

  return {
    regis,
    login,
    checkUser,
    checkAdmin,
    get_admin,
  };
});
