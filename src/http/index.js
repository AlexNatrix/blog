import axios from "axios";

export const API_URL = "http://localhost:8000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.register = async (email, password) => {
  try {
    const response = await $api.post(
      $api.baseURL + "/register",
      JSON.parse({
        email: email,
        password: password,
      })
    );
    //const val = response.data;
    console.log(response.status);
  } catch (e) {
    alert("Error");
    //   } finally {
    //     self.$router.push("/");
  }
};

export default $api;
