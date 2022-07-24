import axios from 'axios'


export const postModule = {
    state: () => ({
        posts:[],
        isPostLoading:true,
        selectedSort:"",
        searchQuery:"",
        page:1,
        limit:10,
        //TODO:fix this.Should start with zero;
        totalPages:2,
        sortOptions:[
          {value:"title",name:"by Title"},
          {value:"body",name:"by Content"},
        ]
    }),
    getters:{
        sortPosts(state){
            return [...state.posts].sort((a,b)=>a[state.selectedSort]?.localeCompare(b[state.selectedSort]))
          },
          searchedAndSorted(state,getters){
            return getters.sortPosts.filter((a)=>a.title.includes(state.searchQuery))
          }
    },
    mutations:{
        setPosts(state,posts){
            state.posts = posts;
        },
        setPostsLoading(state,isPostLoading){
            state.isPostLoading = isPostLoading;
        },
        setSelectedSort(state,selectedSort){
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state,searchQuery){
            state.searchQuery= searchQuery;
        },
        setPage(state,page){
            state.page= page;
        },
        setTotalPages(state,totalPages){
            state.totalPages= totalPages;
        }
    },
    actions:{   
        async fetchPosts({state,commit}){
            commit('setPostsLoading',true)
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                  params:{
                    _page:state.page,
                    _limit:state.limit
                  }
            });
            //TODO:fix this.'this.totalPages' should start with zero;
            commit('setTotalPages',Math.ceil(response.headers['x-total-count']/state.limit))
            commit('setPosts',response.data)
            } catch(e){
              alert('Error')
            }finally{
                commit('setPostsLoading',false)
            }
          },
          async loadMorePosts({state,commit}){
            commit('setPage',state.page+1)
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                  params:{
                    _page:state.page,
                    _limit:state.limit
                  }
            });
            commit('setPosts',[...state.posts, ...response.data])
            } catch(e){
              alert('Error')
            }
          }
    },
    namespaced:true
}