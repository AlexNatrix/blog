<template>
  <path
    :index="index"
    :d="region.path"
    class="state"
    @mouseover="showDialog(region)"
    @mouseout="isActive = false"
    :class="{ regionActive: isActive }"
  />
</template>

<script>
export default {
  props: {
    region: Object,
    index: Number,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    showDialog(region) {
      console.log(region);
      this.isActive = true;
    },
  },
};
</script>

<style></style>
