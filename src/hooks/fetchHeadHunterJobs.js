import axios from "axios";
import { ref, onMounted } from "vue";

export default function fetchHeadHunterJobs(text) {
  const jobs = ref([]);
  const totalPages = ref(10);
  const isJobsLoading = ref(true);
  const jobsCountMap = ref(new Map());
  const countJobs = async (jobs, jobsCountMap) => {
    jobsCountMap.clear();
    for (const item of jobs) {
      if (!item.created_at) {
        continue;
      }
      console.log("KEKMAP" + item);
      //TODO: find more robust way to get date without new Date();
      const date = item.created_at.slice(0, 10);
      if (jobsCountMap.has(date)) {
        const val = jobsCountMap.get(date) + 1;
        jobsCountMap.set(date, val);
      } else {
        jobsCountMap.set(date, 1);
      }
    }
  };
  const fetchJobs = async (text, num = 0) => {
    try {
      const response = await axios.get("https://api.hh.ru/vacancies", {
        params: {
          text: text,
          per_page: 100,
          page: num,
        },
      });

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
    } finally {
      jobs.value.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
      countJobs(jobs.value, jobsCountMap.value);
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
    jobsCountMap,
  };
}
