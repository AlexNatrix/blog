/<template>
<h4 v-show="posts.length>0" style="color:teal"><strong>Posts: {{posts.length}} </strong></h4>
 <h4 v-show = "posts.length===0" style="color:red"><strong> No posts yet...</strong></h4> 
    <transition-group name="user-list">
      <div class = 'post' v-for:='post in posts'>
      <post-item :post = "post"       
      @deletePost = "$emit('deletePost',post)"/>
    </div>
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

<style scoped>
.post{
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.5s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.user-list-move{
  transition: transform 0.4s 
}
</style>