<template>
<div class="navbar" >
<div @click="$router.push('/')" >
<img  style = "width:40px; height:40px;cursor: pointer;" title = "Main" src = "./myLogo250trans.gif">
</div>
<h3 style = "color:teal; margin-left: 25px;">Хуйня какая то</h3>
<div class="navbar_buttons" >
    <a-button  type = "primary" @click="$router.push('/posts')" >Posts</a-button>
    <a-button type = "primary" @click="$router.push('/about')"  style:="margin-left: 20px">Info</a-button>
    <a-button type = "primary"  @click="$router.push('/store')"  style:="margin-left: 20px">store</a-button>
     <a-button type = "primary" @click="$router.push('/salary')" style:="margin-left: 20px">DevSalary</a-button>
    <a-button type = "primary" @click="$router.push('/composition')"  style:="margin-left: 20px">composition</a-button>
</div>
<div class="login">
    <my-login ref = "loginRef"  @switchToRegister = "switchToSignin" />
    <my-signin ref = "signinRef" />
</div>
<my-clock style:="margin-left: 20px"/>
</div>
</template>

<script>
import MyClock from './MyClock.vue';
import { ref } from "vue";
export default {
    name: "my-navbar",
    components: { MyClock},
    setup(){
        const loginRef = ref();
        const signinRef = ref();
        const switchToSignin = ()=>{
            console.log("cock",loginRef.value)
            loginRef.value?.show();
            signinRef.value?.show();
        };
        return{
            loginRef,
            signinRef,
            switchToSignin
        }
    }

}
</script>

<style scoped>
.navbar{
    height: 50px;
    background-color: azure;
    box-shadow: 2px 2px 4px gray;
    display:flex;
    align-items: center;
    padding: 0 15px;
}

.navbar_buttons{
    color: teal;
    display: flex;
    width: 60%;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-left: 20px;

}
.navbar_buttons > * {
    flex: 1;
    margin:1px;
}
.login{
    width: 15%;
    display:flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}
</style>