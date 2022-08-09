<template>
  <div style="display: flex; flex: wrap; border: solid 2px teal">
    <div class="chart">
      <apexchart
        width="75%"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
    <div>
      <my-menu />
    </div>
  </div>
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
        //TODO:fix this.'this.totalPages' should start with zero;

        // this.totalPages = Math.ceil(
        //   response.headers["x-total-count"] / this.limit
        // );
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
