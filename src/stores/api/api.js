
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
          toast({
            title: 'Ogohlantirish',
            description: e?.response?.data?.message,
          });
          router.push("/auth");
          return false;
        }
      });
  };

  const postAxios = (payload) => {
    return axios
      .post(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        if (e.response.status == 401) {
          toast({
            title: 'Qayta urining',
            description: e?.response?.data?.message,
          });
        }
        toast({
          title: 'Ogohlantirish',
          description: e?.response?.data?.message,
        });
      });
  };

  const putAxios = (payload) => {
    return axios
      .put(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        toast({
          title: 'Ogohlantirish',
          description: e?.response?.data?.message,
        });
      });
  };

  const patchAxios = (payload) => {
    return axios
      .patch(`${url.value}/${payload.url}`, payload.data, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        toast({
          title: 'Ogohlantirish',
          description: e?.response?.data?.message,
        });
      });
  }

  const deleteAxios = (payload) => {
    return axios
      .delete(`${url.value}/${payload.url}`, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      })
      .catch((e) => {
        toast({
          title: 'Ogohlantirish',
          description: e?.response?.data?.message,
        });
      });
  };
  return {
    getAxios,
    postAxios,
    putAxios,
    patchAxios,
    deleteAxios,
  };
});
