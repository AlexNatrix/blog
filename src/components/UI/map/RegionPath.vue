<template>
  <path
    :index="index"
    :d="region.path"
    class="state"
    @mouseover="isActive = true"
    @mouseout="isActive = false"
    @click="showTitleDialog(region)"
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
    showTitleDialog(region) {
      console.log(region);
      this.$modal.show("dialog", {});
    },
  },
};
</script>

<style></style>
