import { computed, ref } from "vue";

export default function userSortedPosts(posts) {
  const selectedSort = ref("");
  const sortedPosts = computed(() =>
    [...posts.value].sort((a, b) =>
      a[selectedSort.value]?.localeCompare(b[selectedSort.value])
    )
  );
  return {
    selectedSort,
    sortedPosts,
  };
}
