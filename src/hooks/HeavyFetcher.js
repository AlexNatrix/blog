import getPages from "./getPages";

export default async function fetchAll(text, lastSearchedDate) {
  //   const jobs = ref([]);
  //   const totalPages = ref(0);
  //   const isJobsLoading = ref(true);
  //   const totalJobs = ref(0);
  //   const lastSearchedDate = ref("");
  let dateTo = Date.parse(lastSearchedDate.value);
  let dateFrom = dateTo - (Date.now() - dateTo);
  let dates = [];
  let i = 0;
  while ((Date.now() - dateFrom) / (24 * 60 * 60 * 1000) < 30 && i < 100) {
    i++;
    console.log("Diff = " + (Date.now() - dateFrom) / (24 * 60 * 60 * 1000));
    let kekTo = new Date(dateTo);
    let kekFrom = new Date(dateFrom);
    const params = {
      text: text,
      per_page: 100,
      onlyWithSalary: "false",
      //ISO 8601 - YYYY-MM-DD or seconds precision YYYY-MM-DDThh:mm:ss±hhmm
      dateFrom: kekFrom.toISOString().slice(0, 10),
      dateTo: kekTo.toISOString().slice(0, 10),
    };
    const currentPages = await getPages(params);
    console.log(currentPages);
    if (currentPages === 20) {
      dateFrom = dateFrom + 24 * 60 * 60 * 1000;
    } else if (currentPages <= 5) {
      dateFrom -= 24 * 60 * 60 * 1000 * 3;
    } else {
      dates.push(dateFrom, dateTo);
      dateTo = dateFrom;
      dateFrom -= 24 * 60 * 60 * 1000 * 2;
      console.log(dates);
    }
  }
  //const intervals = Promise.all();
  //   const fetchJobs = async (text) => {
  //     if (totalPages.value > 0) {
  //       try {
  //         await Promise.allSettled(
  //           requestConfig.map((a) =>
  //             fetch(
  //               "https://api.hh.ru/vacancies&only_with_salary=true&" +
  //                 new URLSearchParams({
  //                   text: a.params.text,
  //                   per_page: a.params.per_page,
  //                   page: a.params.page,
  //                 })
  //             )
  //           )
  //         )
  //           .then((res) =>
  //             Promise.allSettled(res.map(async (data) => await data.value.json()))
  //           )
  //           .then((responses) => {
  //             responses.forEach((r) => {
  //               jobs.value = [
  //                 ...jobs.value,
  //                 ...r.value.items.map((item) => {
  //                   return {
  //                     id: item.id,
  //                     name: item.name,
  //                     salary: item.salary,
  //                     address: item.address,
  //                     area: item.area,
  //                     url: item.url,
  //                     employerName: item.employer.name,
  //                     created_at: item.created_at,
  //                     published_at: item.published_at,
  //                   };
  //                 }),
  //               ];
  //             });
  //           });
  //       } catch (e) {
  //         alert("Error");
  //         console.log(e.name);
  //         console.log(e.message);
  //         console.log(e.stack);
  //       } finally {
  //         const temp = jobs.value.filter(
  //           (a, i) =>
  //             !i ||
  //             Date.parse(jobs.value.at(i - 1).published_at) -
  //               Date.parse(a.published_at) <
  //               604800000 * 2
  //         );
  //         jobs.value = temp;
  //         lastSearchedDate.value = new Date(
  //           Date.parse(jobs.value.at(-1).published_at)
  //         )
  //           .toISOString()
  //           .slice(0, 10);
  //         isJobsLoading.value = false;
  //         console.log("Done fetching on page ");
  //       }
  //     } else {
  //       console.log("END  fetch WITH num:totalPages:" + totalPages.value);
  //     }
  //   };
  //   onMounted(fetchJobs(text));
  return {
    fetchAll,
  };
}
