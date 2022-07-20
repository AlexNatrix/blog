<template>
  <div class="app">
  <my-button @click = "showDialog" style="margin:15px 0px">
    Create post...
  </my-button>  
  <my-dialog v-model:show="dialogVisible" @updateShow="hideDialog">
      <post-form @createPost="createPost"></post-form>
  </my-dialog>
  <post-list :posts="posts" @deletePost = "deletePost"></post-list>
  </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import MyButton from './components/UI/MyButton.vue';

export default{
  components: { PostList, PostForm, MyButton },
  data(){
    return{
      posts:[
        {id:1, title:"cock", body: "suck"},
        {id:2, title:"cock", body: "suck"},
        {id:3, title:"cock", body: "suck"},
      ],
      dialogVisible:true
    }
  },
  methods:{
    createPost(post){
      this.posts.push(post)
      this.dialogVisible=false
    },
    deletePost(post){
      this.posts = this.posts.filter((a)=>a.id!==post.id);
    },
    hideDialog(show){
      this.dialogVisible = show;
    },
    showDialog(){
      this.dialogVisible = true;
    }
  }
}
</script>

<style>
* {
  margin : 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  padding: 20px;
}
</style>
