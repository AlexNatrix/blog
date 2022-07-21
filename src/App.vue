<template>
  <div class="app">
  <h1>Posts</h1>
  <my-input v-model="searchQuery" placeholder="Search..."></my-input>
  <div class = "my_buttons">
    <my-button @click = "showDialog">
      Create post...
    </my-button> 
  <my-select :options="sortOptions" v-model="selectedSort"></my-select>
  </div> 
  <my-dialog v-model:show="dialogVisible" @updateShow="hideDialog">
      <post-form @createPost="createPost"/>
  </my-dialog>
    <post-list :posts="searchedAndSorted" @deletePost = "deletePost" v-if="!isPostLoading"/>
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
      selectedSort:"",
      searchQuery:"",
      sortOptions:[
        {value:"title",name:"by Title"},
        {value:"body",name:"by Content"},
      ]
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
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
      } catch(e){
        alert('Error')
      }finally{
        this.isPostLoading=false
      }
    },
  },
  mounted(){
    this.dialogVisible=false;
    this.fetchPosts();
  },
  computed:{
    sortPosts(){
      return [...this.posts].sort((a,b)=>a[this.selectedSort]?.localeCompare(b[this.selectedSort]))
    },
    searchedAndSorted(){
      return this.sortPosts.filter((a)=>a.title.includes(this.searchQuery))
    }
  },
  watch:{
  },
}
</script>

<style>
* {
  margin : 0;
  padding: 0;
  box-sizing: border-box;
}
.my_buttons{
  margin:15px 0px;
  display:flex;
  justify-content: space-between;
}
.app{
  padding: 20px;
}
</style>
