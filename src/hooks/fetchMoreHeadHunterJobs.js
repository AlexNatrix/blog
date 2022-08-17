import axios from "axios";

export default function fetchHeadHunterJobs(text, totalPages, jobs) {
  const query = (req) =>
    `?text=${req.params.text}&per_page=${req.params.per_page}&page=${req.params.page}`;
  const wssGet = (que) => JSON.parse(window.sessionStorage.getItem(que));

  const wssSet = (que, r) =>
    window.sessionStorage.setItem(que, JSON.stringify(r.value));

  const fetchMoreJobs = async (text) => {
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
    console.log("Request config = " + requestConfig.at(totalPages - 1).url);
    if (totalPages.value > 1) {
      // console.log(
      //   "trig = " +
      //     window.sessionStorage.getItem(query(requestConfig.at(totalPages - 1)))
      //       .value
      // );
      try {
        if (window.sessionStorage.getItem(query(requestConfig.at(-1)))) {
          jobs.value = [];
          requestConfig
            .map((r) => query(r))
            .forEach((q) => {
              jobs.value = [
                ...jobs.value,
                ...wssGet(q).data.items.map((item) => {
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
            });
        } else {
          await Promise.allSettled(
            requestConfig.slice(1).map((a) => axios(a))
          ).then((responses) => {
            console.log(responses);
            responses.forEach((r, i) => {
              wssSet(query(requestConfig.at(i + 1)), r);
              jobs.value = [
                ...jobs.value,
                ...r.value.data.items.map((item) => {
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
            });
          });
        }
      } catch (e) {
        alert("Error");
        console.log(e.name);
        console.log(e.message);
        console.log(e.stack);
      } finally {
        jobs.value.sort(
          (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
        );
        console.log("Done fetching on page ");
      }
    } else {
      console.log("END more fetch WITH num:totalPages:" + totalPages.value);
    }
  };
  return {
    fetchMoreJobs,
    jobs,
    text,
  };
}
