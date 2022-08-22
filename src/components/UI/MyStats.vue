<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic
        title="Fetched till:"
        :value="lastSearchedDate"
        style="margin-right: 50px"
      >
        <template #suffix> </template>
      </a-statistic>
    </a-col>
    <a-col :span="12">
      <a-statistic
        title="Total fetched:"
        :value="
          (Math.abs(fetchedJobs - totalJobs) < 6
            ? totalJobs
            : fetchedJobs
          ).toLocaleString()
        "
      >
        <template #suffix>
          <span>/ {{ totalJobs.toLocaleString() }}</span>
        </template>
      </a-statistic>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "my-stats",
  props: {
    totalJobs: {
      type: Number,
      required: true,
    },
    fetchedJobs: {
      type: Number,
      required: true,
    },
    lastSearchedDate: {
      type: String,
      required: true,
    },
  },
});
</script>
