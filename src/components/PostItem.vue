<template>
<div class="post">
    <div>
      <div><strong>ID: </strong> {{post.id}}</div>
      <div><strong>Title: </strong> {{post.title}}</div>
      <div><strong>Body: </strong> {{post.body}}</div>
  </div>
  <div class="my_buttons">
    <my-button @click="$router.push(`/posts/${post.id}`)">Goto</my-button>
    <my-button @click="deletePost">Delete</my-button>
  </div>
</div>

</template>

<script>
export default {
    props:{
        post:{
            type:Object,
            required: true
        }
    },
    emits:['deletePost'],
    methods:{
        deletePost(){
            this.$emit('deletePost',this.post)
        }
    }
}
</script>

<style scoped>
.my_buttons{
  display:flex;
  justify-content: space-between;
}
.post{
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>