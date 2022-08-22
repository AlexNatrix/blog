import { ref, onMounted } from "vue";

export default function fetchHeadHunterJobs(text) {
  const jobs = ref([]);
  const totalPages = ref(0);
  const isJobsLoading = ref(true);
  const totalJobs = ref(0);
  const lastSearchedDate = ref("");
  const fetchJobs = async (text) => {
    jobs.value = [];
    await fetch(
      "https://api.hh.ru/vacancies?order_by=publication_time&only_with_salary=true&" +
        new URLSearchParams({
          text: text,
          per_page: 100,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        totalPages.value = data.pages;
        totalJobs.value = data.found;
      })
      .catch((e) => {
        totalPages.value = 20;
        totalJobs.value = 2000;
        console.log("Error on initial fetch => " + e);
      });
    console.log("TOTAL = " + totalPages.value);
    isJobsLoading.value = true;
    const requestConfig = [...Array(totalPages.value).keys()].map((n) => {
      return {
        method: "get",
        url: "https://api.hh.ru/vacancies",
        params: {
          text: text,
          per_page: 100,
          page: n,
        },
      };
    });
    console.log(
      "Request lenght = " + requestConfig.length,
      "TOTAL PAGES = " + totalPages.value
    );
    //TODO : Implement better caching strategy than this
    console.log(
      "Request config = " + requestConfig.at(totalPages.value - 1).url
    );
    if (totalPages.value > 0) {
      try {
        await Promise.allSettled(
          requestConfig.map((a) =>
            fetch(
              "https://api.hh.ru/vacancies?order_by=publication_time&only_with_salary=true&" +
                new URLSearchParams({
                  text: a.params.text,
                  per_page: a.params.per_page,
                  page: a.params.page,
                })
            )
          )
        )
          .then((res) =>
            Promise.allSettled(res.map(async (data) => await data.value.json()))
          )
          .then((responses) => {
            responses.forEach((r) => {
              jobs.value = [
                ...jobs.value,
                ...r.value.items.map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    salary: item.salary,
                    address: item.address,
                    area: item.area,
                    url: item.url,
                    employerName: item.employer.name,
                    created_at: item.created_at,
                    published_at: item.published_at,
                  };
                }),
              ];
            });
          });
      } catch (e) {
        alert("Error");
        console.log(e.name);
        console.log(e.message);
        console.log(e.stack);
      } finally {
        const temp = jobs.value.filter(
          (a, i) =>
            !i ||
            Date.parse(jobs.value.at(i - 1).published_at) -
              Date.parse(a.published_at) <
              604800000 * 2
        );
        jobs.value = temp;
        lastSearchedDate.value = new Date(
          Date.parse(jobs.value.at(-1).published_at)
        )
          .toISOString()
          .slice(0, 10);
        isJobsLoading.value = false;
        console.log("Done fetching on page ");
      }
    } else {
      console.log("END  fetch WITH num:totalPages:" + totalPages.value);
    }
  };
  onMounted(fetchJobs(text));
  return {
    fetchJobs,
    jobs,
    totalPages,
    isJobsLoading,
    totalJobs,
    lastSearchedDate,
  };
}
