<template>
  <a-row type="flex">
    <a-col flex="auto">
      <apexchart type="bar" :options="options" :series="series"></apexchart
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
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      resp: " ",
      isLoading: true,
    };
  },
  methods: {
    currentMenu(value) {
      console.log(value);
    },
    async fetchJobs() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "https://api.hh.ru/vacancies?text=golang",
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
    if (window.localStorage.getItem("HH") !== null) {
      this.resp = JSON.stringify(
        JSON.parse(window.localStorage.getItem("HH")),
        null,
        "\t"
      );
    } else {
      this.fetchJobs();
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
