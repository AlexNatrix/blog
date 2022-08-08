<template>
  <a-button type="primary" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    New account
  </a-button>
  <a-drawer
    title="Create a new account"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Email" name="email">
            <a-input
              v-model:value="form.email"
              type="email"
              placeholder="Please enter your email"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item has-feedback label="Password" name="pass">
            <a-input-password
              v-model:value="form.pass"
              type="password"
              autocomplete="off"
            />
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item has-feedback label="Confirm" name="checkPass">
            <a-input-password
              v-model:value="form.checkPass"
              type="password"
              autocomplete="off"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              maxlength="256"
              v-model:value="form.description"
              :rows="4"
              placeholder="please enter description (limit 256 symbols)"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="register">Submit</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
export default defineComponent({
  name: "my-drawier",
  components: {
    PlusOutlined,
  },

  setup() {
    const formRef = ref(null);
    const form = reactive({
      email: "",
      pass: "",
      checkPass: "",
      description: "",
    });
    let validatePass = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (form.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else if (value !== form.pass) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      email: [
        {
          required: true,
          message: "Please enter email",
        },
      ],
      pass: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          required: true,
          validator: validatePass2,
          trigger: "change",
        },
      ],
      description: [
        {
          message: "Please enter description",
        },
      ],
    };
    const visible = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };
    const register = async () => {
      let k = "";
      try {
        const str = { email: form.email, password: form.password };
        console.log(str);
        const response = await axios.post(
          "http://localhost:8000/register",
          JSON.stringify(str)
        );
        k = response.data;
        console.log(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        if (k !== `Email ${form.email} already registered!`) {
          window.location = "/completeyourregistration";
        }
      }
    };

    return {
      form,
      formRef,
      rules,
      visible,
      showDrawer,
      onClose,
      register,
    };
  },
});
</script>
