<template>
  <a-spin :indicator="indicator" />
</template>
<script>
import { LoadingOutlined } from "@ant-design/icons-vue";
import { defineComponent, h } from "vue";
export default defineComponent({
  name: "my-hourglass-spinner",
  setup() {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: "3300%",
      },
      spin: true,
    });
    return {
      indicator,
    };
  },
});
</script>
