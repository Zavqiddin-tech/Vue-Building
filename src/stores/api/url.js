import { ref } from "vue";
import { defineStore } from "pinia";

export const useUrlStore = defineStore("url", () => {
  const url = ref('http://185.217.131.172:3000/api');
  //const url = ref("/api")

  return {
    url,
  };
});
