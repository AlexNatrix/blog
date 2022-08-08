
import {computed,  ref} from 'vue';

export default  function userSortedAndSearchedPosts(sortedPosts) {
        const searchQuery = ref('')
        const sortedAndSearchedPosts = computed(() =>
            sortedPosts.value.filter((a)=>a.title.includes(searchQuery.value))
        )
        return {
            sortedAndSearchedPosts,searchQuery
        }
}