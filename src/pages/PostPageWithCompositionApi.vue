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
      <post-form @createPost="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @deletePost="deletePost"
      v-if="!isPostLoading"
    />
    <my-hourglass-spinner v-else>Loading</my-hourglass-spinner>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyButton from "@/components/UI/MyButton.vue";
import userPosts from "@/hooks/userPosts";
import userSortedPosts from "@/hooks/userSortedPosts";
import userSortedAndSearchedPosts from "@/hooks/userSortedAndSearchedPosts";

export default {
  components: { PostList, PostForm, MyButton },
  data() {
    return {
      dialogVisible: true,
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
  },
  setup() {
    const { posts, totalPages, isPostLoading } = userPosts(10);
    const { selectedSort, sortedPosts } = userSortedPosts(posts);
    const { sortedAndSearchedPosts, searchQuery } =
      userSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      sortedAndSearchedPosts,
      searchQuery,
    };
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
