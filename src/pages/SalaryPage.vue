<template>
  <div>
    <a-row type="flex" :gutter="[16, 8]">
      <a-col flex="auto" v-if="options" style="justify-content: space-between">
        <a-spin
          :spinning="isJobsLoading"
          size="large"
          style="margin-top: auto; align: center"
          tip="Loading..."
        >
          <apexchart
            :options="options"
            :series="series"
            :key="series.length"
          ></apexchart> </a-spin
      ></a-col>
      <a-col flex="20%"
        ><my-menu @menuNewState="currentMenu" @pieChart="showPieChart" />
      </a-col>
    </a-row>
    <a-divider />
    <my-stats
      :lastSearchedDate="lastSearchedDate"
      :totalJobs="totalJobs"
      :fetchedJobs="jobs.length"
    />
  </div>
  <button @click.prevent="fetchMore">GET MORE</button>
</template>

<script>
import { computed, ref, watch } from "vue";

import fetchHeadHunterJobs from "@/hooks/fetchHeadHunterJobs";
import fetchAll from "@/hooks/HeavyFetcher";
import { debounce } from "lodash";

export default {
  setup() {
    const currentJob = ref("java");
    const days = ref(1);
    const salaryRange = ref([]);
    const currentFramework = ref("none");

    const filteredJobs = computed(() => {
      return [...jobs.value].filter(
        (a) =>
          parseInt(a.salary.from) > (salaryRange.value[0] || 0) &&
          parseInt(a.salary.to) < (salaryRange.value[1] + 1 || 9007199254740991)
      );
    });
    const jobsCountMap = computed(() => {
      let badValues = 0;
      const jobsCounter = new Map();
      for (const item of filteredJobs.value) {
        if (!item.published_at) {
          badValues++;
          continue;
        }
        //TODO: find more robust way to get date without new Date();
        const date = item.published_at.slice(5, 10);
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
    const {
      fetchJobs,
      jobs,
      totalPages,
      isJobsLoading,
      totalJobs,
      lastSearchedDate,
    } = fetchHeadHunterJobs(currentJob.value);
    const options = computed(() => {
      return {
        chart: {
          height: "500px",
          foreColor: "#ccc",
          toolbar: {
            show: false,
          },
          type: "bar",
          id: currentJob.value,
          range: 200,
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },

        title: {
          text: "HeahHunter.ru",
          align: "left",
          margin: 20,
          offsetY: 25,
          offsetX: 20,
        },
        subtitle: {
          margin: 30,
          text: "Statistics",
          offsetY: 55,
          offsetX: 20,
        },
        tooltip: {
          theme: "dark",
        },
        theme: {
          palette: "palette3", // upto palette10
        },

        grid: {
          borderColor: "#535A6C",
          xaxis: {
            lines: {
              show: true,
            },
          },
        },

        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            horizontal: false,
          },
        },
        fill: {
          opacity: 1,
        },
        xaxis: {
          labels: {
            hideOverlappingLabels: true,
          },
          type: "datetime",
          lines: {
            show: true,
          },
          categories: [...jobsCountMap.value.keys()],
        },
        yaxis: {
          max: function (max) {
            return 1.25 * max;
          },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },

        noData: {
          text: "Nothing to show",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "teal",
            fontSize: "14px",
            fontFamily: undefined,
          },
        },
      };
    });
    const series = computed(() => [
      {
        name: currentJob.value + " series",
        data: [...jobsCountMap.value.values()],
      },
    ]);

    watch(
      [currentJob, currentFramework],
      debounce((newVal) => {
        console.log("TOTASL PAGES = " + totalPages.value);
        console.log("NEW FROM WATCH = " + newVal);
        fetchJobs(
          newVal[1] === "none" ? newVal[0] : newVal[0] + " " + newVal[1]
        );
      }, 10)
    );
    const fetchMore = () => {
      fetchAll(currentJob.value + "frontend", lastSearchedDate);
      console.log("In development");
    };

    return {
      fetchJobs,
      fetchMore,
      options,
      series,
      jobs,
      isJobsLoading,
      currentMenu,
      lastSearchedDate,
      totalJobs,
    };
  },
};
</script>

<style>
.chart {
  /* display: flex; */
  width: 75%;
}
</style>
