/<template>
<h4 v-show="posts.length>0" style="color:teal"><strong>Posts: {{posts.length}} </strong></h4>
 <h4 v-show = "posts.length===0" style="color:red"><strong> No posts yet...</strong></h4> 
    <div class = 'post' v-for:='post in posts'>
      <post-item :post = "post" 
       
      @deletePost = "$emit('deletePost',post)"></post-item>
    </div>
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
</style>