import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("counter", () => {
  const modal = ref(false);
  const updateModal = ref(false);
  const nowId = ref("");

  const setModal = (val) => (modal.value = val);
  const setUpdateModal = (val) => (updateModal.value = val);
  const setNowId = (val) => (nowId.value = val);
  return { modal, updateModal, nowId, setModal, setUpdateModal, setNowId };
});
