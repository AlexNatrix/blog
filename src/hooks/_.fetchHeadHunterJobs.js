// import axios from "axios";
// import { ref, onMounted } from "vue";

// export default function fetchHeadHunterJobs(text) {
//   const jobs = ref([]);
//   const totalPages = ref(0);
//   const isJobsLoading = ref(true);
//   const fetchJobs = async (text, num = 0) => {
//     isJobsLoading.value = true;
//     const requestConfig = {
//       method: "get",
//       url: "https://api.hh.ru/vacancies?order_by=publication_time",
//       params: {
//         text: text,
//         per_page: 100,
//         page: num,
//       },
//     };
//     try {
//       const response = await axios(requestConfig);
//       totalPages.value = response.data.pages;
//       jobs.value = [
//         ...response.data.items.map((item) => {
//           return {
//             id: item.id,
//             name: item.name,
//             salary: item.salary,
//             address: item.address,
//             area: item.area,
//             url: item.url,
//             employerName: item.employer.name,
//             created_at: item.created_at,
//           };
//         }),
//       ];
//     } catch (e) {
//       alert("Error");
//       console.log("error on page " + num);
//       console.log(e.name);
//       console.log(e.message);
//       console.log(e.stack);
//     } finally {
//       jobs.value.sort(
//         (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
//       );
//       isJobsLoading.value = false;
//     }
//     console.log(
//       "END initial fetch WITH num:" + num + " totalPages:" + totalPages.value
//     );
//   };

//   return {
//     fetchJobs,
//     jobs,
//     totalPages,
//     isJobsLoading,
//   };
// }
