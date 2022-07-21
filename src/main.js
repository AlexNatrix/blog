import { createApp } from 'vue'
import App from './App.vue'
import components from "@/components/UI"
import router from "@/router/router"


let myApp = createApp(App);
//console.log(components)
components.forEach((component)=>myApp.component(component.name,component));

myApp
.use(router)
.mount('#app')
