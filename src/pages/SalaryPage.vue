<template>
  <div>
    <a-row type="flex">
      <a-col flex="auto" v-if="options">
        <a-spin
          :spinning="isJobsLoading"
          size="large"
          style="margin-top: auto; align: center"
          tip="Loading..."
        >
          <apexchart
            type="bar"
            :options="options"
            :series="series"
            :key="series.length"
          ></apexchart></a-spin
      ></a-col>
      <a-col flex="20%"><my-menu @menuNewState="currentMenu" /></a-col>
    </a-row>
  </div>
  <button @click.prevent="fetchMore">GET MORE</button>
</template>

<script>
import { computed, ref, watch } from "vue";
import fetchHeadHunterJobs from "@/hooks/fetchHeadHunterJobs";
import fetchMoreHeadHunterJobs from "@/hooks/fetchMoreHeadHunterJobs";
import { debounce } from "lodash";
export default {
  setup() {
    const currentJob = ref("java");
    const days = ref(1);
    const salaryRange = ref([]);
    const currentFramework = ref("none");
    const jobsCountMap = computed(() => {
      let badValues = 0;
      const jobsCounter = new Map();
      for (const item of jobs.value) {
        if (!item.created_at) {
          badValues++;
          continue;
        }
        //TODO: find more robust way to get date without new Date();
        const date = item.created_at.slice(0, 10);
        if (jobsCounter.has(date)) {
          const val = jobsCounter.get(date) + 1;
          jobsCounter.set(date, val);
        } else {
          jobsCounter.set(date, 1);
        }
      }
      console.log(`KEKMAP with ${badValues} values `);
      return jobsCounter;
    });
    const currentMenu = (val) => {
      console.log(val);
      [
        days.value,
        salaryRange.value,
        currentJob.value,
        currentFramework.value,
      ] = val;
    };
    const { fetchJobs, jobs, totalPages, isJobsLoading } = fetchHeadHunterJobs(
      currentJob.value
    );
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
        console.log("TOTASL PAGES = " + totalPages.value);
        console.log("NEW FROM WATCH = " + newVal);
        fetchJobs(
          newVal[3] === "none" ? newVal[2] : newVal[2] + " " + newVal[3]
        );
      }, 10)
    );
    const fetchMore = () => {
      fetchMoreJobs(currentJob.value);
    };
    const { fetchMoreJobs } = fetchMoreHeadHunterJobs(
      currentJob.value,
      totalPages,
      jobs
    );
    return {
      fetchJobs,
      fetchMore,
      options,
      series,
      jobs,
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
