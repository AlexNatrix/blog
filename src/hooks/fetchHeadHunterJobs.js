import axios from "axios";
import { ref, onMounted } from "vue";

export default function fetchHeadHunterJobs(text) {
  const jobs = ref([]);
  const totalPages = ref(0);
  const isJobsLoading = ref(true);
  const fetchJobs = async (text, num = 0) => {
    const requestConfig = {
      method: "get",
      url: "https://api.hh.ru/vacancies",
      params: {
        text: text,
        per_page: 100,
        page: num,
      },
    };
    try {
      const query = `?text=${requestConfig.params.text}&per_page=${requestConfig.params.per_page}&page=${requestConfig.params.page}`;
      const response = !window.sessionStorage.getItem(query)
        ? await axios(requestConfig)
        : JSON.parse(window.sessionStorage.getItem(query));
      window.sessionStorage.setItem(query, JSON.stringify(response));
      console.log(response);
      totalPages.value = response.data.pages;
      jobs.value = [
        ...response.data.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            salary: item.salary,
            address: item.address,
            area: item.area,
            url: item.url,
            employerName: item.employer.name,
            created_at: item.created_at,
          };
        }),
      ];
    } catch (e) {
      alert("Error");
      console.log("error on page " + num);
      console.log(e.name);
      console.log(e.message);
      console.log(e.stack);
    } finally {
      jobs.value.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
      isJobsLoading.value = false;
    }
    console.log(
      "END initial fetch WITH num:" + num + " totalPages:" + totalPages.value
    );
  };
  onMounted(fetchJobs(text));
  return {
    fetchJobs,
    jobs,
    totalPages,
    isJobsLoading,
  };
}
