<template>
<div class="navbar" >
<div @click="$router.push('/')">Vue 3</div>
<div class="navbar_buttons" >
    <my-button @click="$router.push('/posts')">Posts</my-button>
    <my-button @click="$router.push('/about')" style:="margin-left: 20px">Info</my-button>
</div>
</div>
</template>

<script>
export default {
  name:"my-navbar"

}
</script>

<style scoped>
.navbar{
    height: 50px;
    background-color: gainsboro;
    box-shadow: 2px 2px 4px gray;
    display:flex;
    align-items: center;
    padding: 0 15px;
}

.navbar_buttons{
    margin-left: auto;
}

</style>