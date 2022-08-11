<template>
  <a-slider v-model:value="days" :min="1" :max="30" />
  <a-input-number
    size="small"
    v-model:value="days"
    :min="1"
    :max="30"
    style="margin-left: 16px"
  />
  <a-slider v-model:value="salaryRange" range :min="0" :max="10000" />
  <div style="display: flex">
    <a-input-number
      size="small"
      v-model:value="salaryRange[0]"
      :min="0"
      :max="10000"
      style="margin-left: 16px"
    />
    <a-input-number
      size="small"
      v-model:value="salaryRange[1]"
      :min="0"
      :max="10000"
      style="margin-left: 16px"
    />
  </div>
  <br />
  <br />

  <a-radio-group
    @change="resetFramework"
    v-model:value="currentJob"
    button-style="solid"
  >
    <a-radio v-for:="job of jobs.keys()" :job="job" :value="job">{{
      job
    }}</a-radio>
  </a-radio-group>
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
  <div>
    <a-checkbox style="margin-top: 15px" v-model:checked="checked"
      >Checkbox</a-checkbox
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "my-menu",
  emits: ["menuNewState"],
  setup(_, { emit }) {
    const days = ref(30);
    const salaryRange = ref([0, 10000]);
    const currentJob = ref("java");
    const currentFramework = ref("none");
    const resetFramework = () => {
      currentFramework.value = "none";
    };
    watch([days, salaryRange, currentJob, currentFramework], (newVal) => {
      emit("menuNewState", newVal);
    });
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
      resetFramework,
      salaryRange,
      currentJob,
      currentFramework,
      toggleDisabled,
      jobs,
      size: ref(8),
      days,
    };
  },
});
</script>

<style scoped></style>
