<template>
  <div style="padding: 20px">
    <h1>Posts</h1>
    <my-input
      v-focus
      ref="search"
      v-model="searchQuery"
      placeholder="Search..."
    ></my-input>
    <div class="my_buttons">
      <my-button @click="showDialog"> Create post... </my-button>
      <my-select :options="sortOptions" v-model="selectedSort"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible" @updateShow="hideDialog">
      <post-form ref="form" @createPost="createPost" />
    </my-dialog>
    <post-list
      :posts="searchedAndSorted"
      @deletePost="deletePost"
      v-if="!isPostLoading"
    />
  </div>
  <my-hourglass-spinner
    v-if="isPostLoading"
    style="display: flex; justify-content: center"
  />
  <div v-intersection="loadMorePosts" class="observer"></div>
  <!-- <div class="page_wrapper">
    <div @click="changePage(pageNumber)"
    v-for="pageNumber in totalPages" 
    :key="pageNumber" 
    class ="page"
    :class = "{
      'current_page' : page===pageNumber  
      }"
    >{{pageNumber}}
    </div>
  </div> -->
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: { PostList, PostForm, MyButton },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: true,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      //TODO:fix this.Should start with zero;
      totalPages: 2,
      sortOptions: [
        { value: "title", name: "by Title" },
        { value: "body", name: "by Content" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    deletePost(post) {
      this.posts = this.posts.filter((a) => a.id !== post.id);
    },
    hideDialog(show) {
      this.dialogVisible = show;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      this.isPostLoading = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        //TODO:fix this.'this.totalPages' should start with zero;
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        alert("Error");
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Error");
      }
    },
    // changePage(pageNumber){
    //   this.page = pageNumber;
    // }
  },
  mounted() {
    this.dialogVisible = false;
    this.fetchPosts();
    this.$refs.search.$el.focus();
  },
  computed: {
    sortPosts() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      );
    },
    searchedAndSorted() {
      return this.sortPosts.filter((a) => a.title.includes(this.searchQuery));
    },
  },
  watch: {
    // page(){
    //   this.fetchPosts();
    // }
  },
};
</script>

<style>
.my_buttons {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
  margin-left: 20px;
}
.page {
  border: 1px solid black;
  margin: 1px;
  padding: 15px;
}
.current_page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>
