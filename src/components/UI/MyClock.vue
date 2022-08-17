<template>
  <div
    title="Time"
    class="clock"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    {{
      clock.hours + clock.ident + clock.minutes + clock.ident + clock.seconds
    }}
    <div v-show="hover">
      {{ clock.date + "/" + clock.month + "/" + clock.year }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-clock",
  data() {
    return {
      startTime: Date.now(),
      hover: "",
      clock: {
        ident: ":",
        hours: 0,
        minutes: 0,
        seconds: 0,
        date: 0,
        month: 0,
        year: 0,
      },
    };
  },
  mounted() {
    setInterval(() => this.setTime(), 1000);
  },

  methods: {
    setTime() {
      const timeFormat = (a) => (a < 10 ? "0" + a : a);
      const time = new Date();
      this.clock.hours = timeFormat(time.getHours());
      this.clock.minutes = timeFormat(time.getMinutes());
      this.clock.seconds = timeFormat(time.getSeconds());
      this.clock.date = timeFormat(time.getDate());
      this.clock.month = timeFormat(time.getMonth());
      this.clock.year = timeFormat(time.getFullYear());
    },
  },
};
</script>

<style scoped>
.clock {
  font-family: "alarm clock";
  align-items: flex-end;
  padding: 5px 1px;
  background: none;
  color: teal;

  margin: 1px;
  border-radius: 10px;
  border-width: 5px;
}
</style>
