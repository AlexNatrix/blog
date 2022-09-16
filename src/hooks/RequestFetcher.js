export default async function fetchHeadHunterJobs(requestConfig) {
  let jobs = [];
  try {
    await Promise.allSettled(
      requestConfig.map((a) =>
        fetch(
          "https://api.hh.ru/vacancies?" +
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
          jobs = [
            ...jobs,
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
    console.log("Done fetching on page ");
  }
  return jobs;
}
