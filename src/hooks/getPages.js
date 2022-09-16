import fetchHeadHunterJobs from "@/hooks/RequestFetcher";

export default async function getPages(text, dateTo) {
  let k = [];
  const day = 24 * 60 * 60 * 1000;
  const remainingDate = 30 - (Date.now() - Date.parse(dateTo)) / day;
  if (remainingDate < 1) {
    return [];
  }
  const requestConfig = [...Array(Math.floor(~~remainingDate / 2)).keys()].map(
    (n) => {
      const ISOTo = new Date(Date.parse(dateTo) - 2 * n * day - n * day);
      const ISOFrom = new Date(
        Date.parse(dateTo) - 2 * (n + 1) * day - n * day
      );

      return {
        method: "get",
        url: "https://api.hh.ru/vacancies?",
        params: {
          text: text,
          per_page: 100,
          date_from: ISOFrom.toISOString().slice(0, 10),
          date_to: ISOTo.toISOString().slice(0, 10),
        },
      };
    }
  );
  console.log(requestConfig);
  await Promise.allSettled(
    requestConfig.map((rc) =>
      fetch(
        rc.url +
          new URLSearchParams({
            text: rc.params.text,
            per_page: rc.params.per_page,
            date_from: rc.params.date_from,
            date_to: rc.params.date_to,
          })
      )
    )
  )
    .then((res) =>
      Promise.allSettled(res.map(async (data) => await data.value.json()))
    )
    .then((resp) => {
      k = resp.flatMap((a, i) =>
        [...Array(a.value.pages).keys()].map((n) => {
          const temp = { ...requestConfig[i] };
          temp.params.page = n;
          return temp;
        })
      );
      console.log(k);
      console.log(resp);
    });

  return await fetchHeadHunterJobs(k);
}
