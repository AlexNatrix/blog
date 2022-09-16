import getPages from "./getPages";
import { ref } from "vue";

export default async function fetchAll(text, lastSearchedDate) {
  const jobs = ref([]);
  //   const totalPages = ref(0);
  //   const isJobsLoading = ref(true);
  //   const totalJobs = ref(0);
  //   const lastSearchedDate = ref("");
  jobs.value = await getPages(text, lastSearchedDate.value);
  return {
    jobs,
  };
}
