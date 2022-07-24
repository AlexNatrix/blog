import { createStore } from "vuex";
import { postModule } from "./PostModule";

export default createStore({
    modules:{
        post:postModule
    }
})