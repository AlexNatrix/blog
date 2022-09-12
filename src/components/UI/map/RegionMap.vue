<template>
  <svg viewBox="0 0 990 560" xmlns="http://www.w3.org/2000/svg">
    <g>
      <RegionPath
        v-for="(item, key) in regions"
        :key="key"
        :index="key"
        :region="item"
      />
    </g>
  </svg>
</template>

<script>
import RegionPath from "./RegionPath";
import data_json from "./data.json";
export default {
  name: "region-map",
  data() {
    return {
      regions: data_json,
    };
  },
  components: {
    RegionPath,
  },
};
</script>

<style lang="less" scoped>
svg {
  width: 100%;
  height: 100vh;
  .state {
    stroke-width: 1;
    stroke: #fff;
    -webkit-transition: stroke 0.5s, stroke-width 0.5s;
    -o-transition: stroke 0.5s, stroke-width 0.5s;
    transition: stroke 0.5s, stroke-width 0.5s;
  }
}
svg .state:hover,
.state.active {
  cursor: pointer;
  stroke-width: 1;
  stroke: #000;
}
path {
  fill: #2f80ed;
  opacity: 0.75;
}
.regionActive {
  fill: #eb5757;
  opacity: 0.75;
}
p {
  margin: 0 0 10px;
}
.close {
  float: right;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.75;
}
</style>
