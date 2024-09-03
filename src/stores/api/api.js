
import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import router from "@/router";
import { useTokenStore } from "@/stores/auth/token";
import { useUrlStore } from "@/stores/api/url";

//shadcn
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()


export const useApiStore = defineStore("api", () => {
  const { url } = storeToRefs(useUrlStore());
  const tokenStore = useTokenStore();

  const getAxios = (payload) => {
    return axios
      .get(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          console.log(e);
          router.push("/auth");
          return false;
        }
      });
  };

  const postAxios = (payload) => {
    console.log(payload);
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          toast({
            title: 'Qayta urining',
            description: 'Login yoki parol xato',
          });
        }
        console.log(e.message);
      });
  };

  const putAxios = (payload) => {
    return axios
      .put(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const deleteAxios = (payload) => {
    return axios
      .delete(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return {
    getAxios,
    postAxios,
    putAxios,
    deleteAxios,
  };
});
