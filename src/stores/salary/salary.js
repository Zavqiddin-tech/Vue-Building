import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api/api";

export const useSalaryStore = defineStore("salary", () => {
  const salary = ref([]);
  const salaryResult = ref(0)

  const api = useApiStore();

  // Barcha ishchilarni olish
  const get_all_salary = async () => {
    await api
      .getAxios({
        url: "salary/all",
      })
      .then((res) => {
        console.log(res.data);
        salary.value = [...res.data];
      });
  };

    // natijani olish
    const get_salary_result = async () => {
      await api
        .getAxios({
          url: "salary/result",
        })
        .then((res) => {
          salaryResult.value = res.data
        });
    };

  // Yangi ishchi qo'shish
  const new_salary = async (data) => {
    await api
      .postAxios({
        url: "salary/create",
        data,
      })
      .then((res) => {
				console.log(res.data);
        salary.value = [...res.data];
      });
  };

  // Bitta ishchini olish
  const get_salary = async (id) => {
    return await api.getAxios({
      url: `salary/one/${id}`,
    });
  };

  // Ma'lumotni yangilab saqlash
  const update_salary = async (data) => {
    await api
      .putAxios({
        url: `salary/update/${data.id}`,
        data,
      })
      .then((res) => {
        console.log(res.data);
        
        salary.value = [...res.data];
      });
  };

  // Ishchini o'chirish
  const delete_salary = async (_id) => {
    await api
      .deleteAxios({
        url: `salary/${_id}`
      })
      .then(() => {
        salary.value = salary.value.filter((item) => {
          if (item._id == _id) return false;
          return item;
        });
        salary.value = [...salary.value];
      });
  };


 
  return {
    salary,
    salaryResult,
    get_all_salary,
    get_salary_result,
    get_salary,
    new_salary,
    update_salary,
    delete_salary,
  };
});
