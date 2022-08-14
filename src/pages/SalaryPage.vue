<template>
  <a-row type="flex">
    <a-col flex="auto" v-if="options">
      <apexchart
        type="bar"
        :options="options"
        :series="series"
        :key="series.length"
      ></apexchart
    ></a-col>
    <a-col flex="25%"><my-menu @menuNewState="currentMenu" /></a-col>
  </a-row>
  <!-- <div>
    <pre>{{ jobs }}</pre>
  </div> -->
</template>

<script>
import { computed, ref, watch } from "vue";
import fetchHeadHunterJobs from "@/hooks/fetchHeadHunterJobs";
import fetchMoreHeadHunterJobs from "@/hooks/fetchMoreHeadHunterJobs";
import { debounce } from "lodash";
export default {
  data() {
    return {
      resp: " ",
      jobsCount: [],
    };
  },
  setup() {
    const currentJob = ref("java");
    const days = ref(1);
    const salaryRange = ref([]);
    const currentFramework = ref("none");
    const currentMenu = (val) => {
      console.log(val);
      [
        days.value,
        salaryRange.value,
        currentJob.value,
        currentFramework.value,
      ] = val;
    };
    const { fetchJobs, jobs, totalPages, isJobsLoading, jobsCountMap } =
      fetchHeadHunterJobs(currentJob.value);
    const options = computed(() => {
      return {
        chart: {
          id: currentJob.value,
        },
        xaxis: {
          categories: [...jobsCountMap.value.keys()],
        },
      };
    });
    const series = computed(() => [
      {
        name: currentJob.value + "series",
        data: [...jobsCountMap.value.values()],
      },
    ]);
    watch(
      [days, salaryRange, currentJob, currentFramework],
      debounce((newVal) => {
        console.log(newVal);
        fetchJobs(
          newVal[3] === "none" ? newVal[2] : newVal[2] + " " + newVal[3]
        );
      }, 10)
    );
    // watch(
    //   jobs,
    //   debounce((newVal) => countJobs(newVal, jobsCountMap.value), 500),
    //   {
    //     flush: "post",
    //   }
    // );
    // watch(
    //   jobs,
    //   debounce((newVal) => {
    //     for (const item of newVal) {
    //       if (!item.created_at) {
    //         continue;
    //       }
    //       //TODO: find more robust way to get date without new Date();
    //       const date = item.created_at.slice(0, 10);
    //       if (jobsCountMap.value.has(date)) {
    //         const val = jobsCountMap.value.get(date) + 1;
    //         jobsCountMap.value.set(date, val);
    //       } else {
    //         jobsCountMap.value.set(date, 1);
    //       }
    //     }
    //   }, 5000),
    //   { flush: "pre" }
    // );
    const { fetchMoreJobs } = fetchMoreHeadHunterJobs("java", totalPages, jobs);
    // onMounted();

    return {
      fetchJobs,
      fetchMoreJobs,
      options,
      series,
      jobs,
      totalPages,
      isJobsLoading,
      currentMenu,
    };
  },
};
</script>

<style scoped>
.chart {
  /* display: flex; */
  width: 75%;
}
</style>
