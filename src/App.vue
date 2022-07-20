<template>
  <div class="app">
  <my-button @click = "showDialog" style="margin:15px 0px">
    Create post...
  </my-button>  
  <my-dialog v-model:show="dialogVisible" @updateShow="hideDialog">
      <post-form @createPost="createPost"/>
  </my-dialog>
    <post-list :posts="posts" @deletePost = "deletePost" v-if="!isPostLoading"/>
  <my-hourglass-spinner v-else >Loading</my-hourglass-spinner>
  </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import MyButton from './components/UI/MyButton.vue';
import axios from 'axios'

export default{
  components: { PostList, PostForm, MyButton },
  data(){
    return{
      posts:[],
      dialogVisible:true,
      isPostLoading:true,
      spiner:'/'
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
    },
    async fetchPosts(){
      try{
        setTimeout(async ()=>{
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
          this.isPostLoading=false
        },10000)
      } catch(e){
        alert('Error')
      }
    },
  },
  mounted(){
    this.dialogVisible=false;
    this.fetchPosts();
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
