<template>
  <a-spin size="large" tip="Loading...">
    <a-alert
      message="Alert message title"
      description="Further details about the context of this alert."
    ></a-alert>
  </a-spin>
</template>

<script>
export default {
  name: "my-modal-loader",
};
</script>

<style scoped>
.login-form {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.01);
  /* max-width: 300px; */
}
</style>
