export default async function getPages(params) {
  console.log("params from getPages");
  console.log(params);
  let totalPages = 0;
  await fetch(
    "https://api.hh.ru/vacancies?order_by=publication_time&" +
      new URLSearchParams({
        text: params.text,
        per_page: 100,
        only_with_salary: params.onlyWithSalary,
        //ISO 8601 - YYYY-MM-DD or seconds precision YYYY-MM-DDThh:mm:ss±hhmm
        date_from: params.dateFrom,
        date_to: params.dateTo,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      totalPages = data.pages;
    })
    .catch((e) => {
      totalPages = 20;
      console.log("Error on page fetch => " + e);
    });
  console.log("TOTAL from = " + totalPages);
  return totalPages;
}
