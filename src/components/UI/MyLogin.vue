<template>
  <div>
    <a-button type="text" @click="show">Login</a-button>
    <a-modal v-model:visible="visible" :footer="null" title="Log in" @ok="onOk">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </div>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
          Or
          <a-button type="link" style="padding: 0 0" @click="switchToSignIn"
            >register now!</a-button
          >
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, reactive, computed, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "my-login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  emits: ["switchToRegister"],

  setup(_, { emit }) {
    const visible = ref(false);
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });
    const switchToSignIn = (event) => {
      emit("switchToRegister", event.target.value);
    };

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const show = () => {
      visible.value = !visible.value;
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    return {
      visible,
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      switchToSignIn,
      show,
    };
  },
});
</script>

<style scoped>
.login-form {
  width: 100%;
  /* max-width: 300px; */
}
.login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-form-forgot {
  margin-bottom: 24px;
}
.login-form-button {
  width: 100%;
}
</style>
