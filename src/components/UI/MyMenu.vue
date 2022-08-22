<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: wrap;
    "
  >
    <a-slider v-model:value="days" :min="1" :max="30" />
    <a-input-number
      size="small"
      v-model:value="days"
      :min="1"
      :max="30"
      style="margin-left: 16px"
    />
    <a-slider
      v-model:value="salaryRange"
      range
      :step="10000"
      :min="0"
      :max="1000000"
    />
    <div style="display: flex">
      <a-input-number
        size="small"
        v-model:value="salaryRange[0]"
        :min="0"
        :max="1000000"
        style="margin-left: 16px"
      />
      <a-input-number
        size="small"
        v-model:value="salaryRange[1]"
        :min="0"
        :max="1000000"
        style="margin-left: 16px"
      />
    </div>
    <a-divider />

    <a-radio-group
      @change="resetFramework"
      v-model:value="currentJob"
      button-style="solid"
    >
      <a-radio v-for:="job of jobs.keys()" :job="job" :value="job">{{
        job
      }}</a-radio>
    </a-radio-group>
    <div>
      <a-radio-group
        size="large"
        v-model:value="currentFramework"
        button-style="primary"
        style="margin-top: 15px"
      >
        <a-radio-button
          style="margin-top: 15px"
          v-for:="framework in jobs.get(currentJob).frameworks"
          :value="framework"
          >{{ framework }}</a-radio-button
        >
      </a-radio-group>
    </div>
    <a-divider />
    <div>
      <a-card title="Include" size="small">
        <div class="jobs_level_menu" style="margin: 6px 0px 6px">
          <p style="margin: 0px">Junior</p>
          <a-switch v-model:checked="junior" @change="switchHandler" />
        </div>
        <a-divider style="margin: 2px" />
        <div class="jobs_level_menu" style="margin: 6px 0px 6px">
          <p style="margin: 0px">Middle</p>
          <a-switch v-model:checked="middle" @change="switchHandler" />
        </div>
        <a-divider style="margin: 2px" />
        <div class="jobs_level_menu" style="margin: 6px 0px 6px">
          <p style="margin: 0px">Senior</p>
          <a-switch v-model:checked="senior" @change="switchHandler" />
        </div>
        <a-button @click="pieChart">Pie chart</a-button>
      </a-card>

      <!-- <a-button @click="clearCache">Clear cache</a-button> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { debounce } from "lodash";
export default defineComponent({
  name: "my-menu",
  emits: [["menuNewState"], ["pieChart"]],
  setup(_, context) {
    //TODO: DEBUG ONLY
    const clearCache = () => {
      window.sessionStorage.clear();
    };
    const days = ref(1);
    const salaryRange = ref([0, 1000000]);
    const currentJob = ref("java");
    const currentFramework = ref("none");
    const junior = ref(true);
    const middle = ref(true);
    const senior = ref(true);
    const resetFramework = () => {
      currentFramework.value = "none";
    };
    const pieChart = () => {
      context.emit("pieChart");
    };
    const switchHandler = (val) => (val = !val);
    watch(
      [days, salaryRange, currentJob, currentFramework, junior, middle, senior],
      debounce((newVal) => {
        context.emit("menuNewState", newVal);
      }, 100)
    );
    const jobs = new Map([
      ["java", { isActive: false, frameworks: ["none", "spring"] }],
      [
        "javascript",
        {
          isActive: false,
          frameworks: ["none", "vue", "react", "angular", "svelte"],
        },
      ],
      [
        "scala",
        { isActive: false, frameworks: ["none", "play", "cats effect", "zio"] },
      ],
      ["golang", { isActive: false, frameworks: ["none", "GIN", "BeeGO"] }],
    ]);
    const toggleDisabled = (disabled) => {
      disabled != disabled;
    };
    return {
      clearCache,
      resetFramework,
      salaryRange,
      currentJob,
      currentFramework,
      toggleDisabled,
      jobs,
      days,
      switchHandler,
      junior,
      middle,
      senior,
      pieChart,
    };
  },
});
</script>

<style scoped>
.jobs_level_menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0%;
}
</style>
