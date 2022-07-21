/<template>
<h4 v-show="posts.length>0" style="color:teal"><strong>Posts: {{posts.length}} </strong></h4>
 <h4 v-show = "posts.length===0" style="color:red"><strong> No posts yet...</strong></h4> 
    <transition-group name="user-list">
      <post-item 
       class = 'post'
       v-for:='post in posts'
       :post = "post"
       :key="post.id"       
      @deletePost = "$emit('deletePost',post)"/>
    </transition-group>
</template>

<script>
import PostItem from './PostItem.vue'
export default{
    components:{
      PostItem
    },
    props:{
        posts:{
            type: Array,
            required: true
        },
    },
    emits:['deletePost'],
    methods:{
    }
}

</script>

<style>
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.1s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.user-list-move{
  transition: transform 0.3s 
}
</style>