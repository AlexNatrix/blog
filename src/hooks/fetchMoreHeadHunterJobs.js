import axios from "axios";

export default function fetchHeadHunterJobs(text, totalPages, jobs) {
  const fetchMoreJobs = async (num = 1) => {
    if (num < totalPages.value) {
      try {
        const response = await axios.get("https://api.hh.ru/vacancies", {
          params: {
            text: text,
            per_page: 100,
            page: num,
          },
        });
        jobs.value = [
          ...jobs.value,
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
        setTimeout(() => {}, 5000);
        await fetchMoreJobs(num + 1);
      } catch (e) {
        alert("Error");
        console.log("error on page " + num);
      } finally {
        jobs.value.sort(
          (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
        );
        console.log("Done fetching on page " + num);
      }
    } else {
      console.log(
        "END more fetch WITH num:" + num + " totalPages:" + totalPages.value
      );
    }
  };
  return {
    fetchMoreJobs,
    jobs,
  };
}
