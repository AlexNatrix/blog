import { createApp } from 'vue'
import App from './App.vue'
import components from "@/components/UI"
import router from "@/router/router"
import directives from "@/components/directives"
import store from "@/store"


let myApp = createApp(App);
//console.log(components)
components.forEach((component)=>myApp.component(component.name,component));
directives.forEach((d)=>myApp.directive(d.name,d))

myApp
.use(router)
.use(store)
.mount('#app')
