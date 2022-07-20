<template>
    <form class="form" @submit.prevent>
      <h4>Create post</h4>
      <my-input v-model="post.title" placeholder="type title =>">
      </my-input>
      <my-input v-model="post.body" 
      @input="post.body = $event.target.value" 
      placeholder="type text...">
      </my-input>
      <my-button 
      @click="createPost" 
      style = "margin-top: 15px"
      >
      Add
      </my-button>
    </form>
</template>

<script>
export default{
    data(){
        return{
            post:{
                title:"",
                body:""
            }
        }
    },
    methods:{
    createPost(){
      this.post.id = Date.now();
      this.$emit("createPost",this.post)
      this.post = {
          title:"",
          body:""
      }
    }
  }
}
</script>

<style scoped>
.form{
  display:flex;
  flex-direction: column;
}
</style>