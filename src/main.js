import { createApp } from "vue";
import App from "./App.vue";
import components from "@/components/UI";
import router from "@/router/router";
import directives from "@/components/directives";
import store from "@/store";
import VueApexCharts from "vue3-apexcharts";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import './registerServiceWorker'

let myApp = createApp(App);
//console.log(components)
components.forEach((component) => myApp.component(component.name, component));
directives.forEach((d) => myApp.directive(d.name, d));

myApp.use(router).use(VueApexCharts).use(Antd).use(store).mount("#app");
