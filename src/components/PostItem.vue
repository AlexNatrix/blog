<template>
  <div>
      <div><strong>Title: </strong> {{post.title}}</div>
      <div><strong>Body: </strong> {{post.body}}</div>
  </div>
  <div>
    <my-button @click="deletePost">Delete</my-button>
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

<style>
.post{
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>