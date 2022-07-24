<template>
  <div style="padding: 20px;">
  <h1>Posts</h1>
  <my-input 
    v-focus 
    :model-value="searchQuery"
    @update:model-value = "setSearchQuery"
    placeholder="Search...">
   </my-input>
  <div class = "my_buttons">
    <my-button @click = "showDialog">
      Create post...
    </my-button> 
  <my-select 
        :options="sortOptions" 
        @update:model-value="setSelectedSort"
        :model-value="selectedSort">
    </my-select>
  </div> 
  <my-dialog v-model:show="dialogVisible" @updateShow="hideDialog">
      <post-form @createPost="createPost"/>
  </my-dialog>
    <post-list :posts="searchedAndSorted" @deletePost = "deletePost" v-if="!isPostLoading"/>
  <my-hourglass-spinner v-else >Loading</my-hourglass-spinner>
  </div>
  <div v-intersection = "loadMorePosts" class="observer"></div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import MyButton from '@/components/UI/MyButton.vue';
import {mapState,mapGetters,mapActions, mapMutations} from 'vuex';
export default{
components: { PostList, PostForm, MyButton },
  data(){
    return{
      dialogVisible:true
  }
  }, 
  methods:{
    ...mapMutations({
        setPage:'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
        loadMorePosts:'post/loadMorePosts',
        fetchPosts:'post/fetchPosts'

    }),
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
    // changePage(pageNumber){
    //   this.page = pageNumber;
    // }
  },
  mounted(){
    this.dialogVisible=false;
    this.fetchPosts();
  },
  computed:{
    ...mapState({
        posts:state=>state.post.posts,
        isPostLoading:state=>state.post.isPostLoading,
        selectedSort:state=>state.post.selectedSort,
        searchQuery:state=>state.post.searchQuery,
        page:state=>state.post.page,
        limit:state=>state.post.limit,
        //TODO:fix this.Should start with zero;
        totalPages:state=>state.post.totalPages,
        sortOptions:state=>state.post.sortOptions
    }),
    ...mapGetters({
        sortPosts : 'post/sortPosts',
        searchedAndSorted: 'post/searchedAndSorted'
    })
  },
  watch:{
    // page(){
    //   this.fetchPosts();
    // }
  },
}
</script>

<style>
.my_buttons{
  margin:15px 0px;
  display:flex;
  justify-content: space-between;
}
.page_wrapper{
  display:flex;
  margin-top:15px;
  margin-left: 20px;
}
.page{
  border: 1px solid black; 
  margin: 1px;
  padding: 15px;
}
.current_page{
  border: 2px solid teal;
}
.observer{
  height: 30px;
  background: green;
}
</style>
