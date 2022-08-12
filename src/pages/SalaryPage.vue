<template>
  <a-row type="flex">
    <a-col flex="auto">
      <apexchart
        type="bar"
        :options="options"
        :series="series"
        :key="series.length"
      ></apexchart
    ></a-col>
    <a-col flex="25%"><my-menu @menuNewState="currentMenu" /></a-col>
  </a-row>
  <div>
    <pre>{{ resp }}</pre>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "series-1",
          data: [],
        },
      ],
      resp: " ",
      jobs: [],
      jobsCount: [],
      isLoading: true,
    };
  },
  methods: {
    setJobs() {
      const map = new Map();
      for (const item of JSON.parse(this.resp).items) {
        if (!item.created_at) {
          continue;
        }
        const date = new Date(Date.parse(item.created_at));
        if (map.has(date.getDate())) {
          const val = map.get(date.getDate()) + 1;
          map.set(date.getDate(), val);
        } else {
          map.set(date.getDate(), 1);
        }
      }
      this.options.xaxis.categories.push(...map.keys());
      this.series[0].data.push(...map.values());
      console.log("hi from " + this.jobs);
      console.log("hi from " + this.jobsCount);
    },
    currentMenu(value) {
      console.log(value);
    },
    async fetchJobs() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://api.hh.ru/vacancies?text=golang&per_page=100",
          {
            params: {
              _text: "golang",
            },
          }
        );
        this.resp = JSON.stringify(response.data, null, "\t");
        window.localStorage.setItem("HH", JSON.stringify(response.data));
      } catch (e) {
        alert("Error");
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.dispatchEvent(new Event("resize"));
    });
    if (window.localStorage.getItem("HH") !== null) {
      this.resp = JSON.stringify(
        JSON.parse(window.localStorage.getItem("HH")),
        null,
        "\t"
      );
      this.setJobs();
    } else {
      this.fetchJobs();
      this.setJobs();
    }
  },
};
</script>

<style scoped>
.chart {
  /* display: flex; */
  width: 75%;
}
</style>
