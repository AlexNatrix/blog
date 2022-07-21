import MainPage from '@/pages/MainPage'
import AboutPage from '@/pages/AboutPage'
import PostPage from '@/pages/PostPage'
import {createRouter,createWebHistory} from "vue-router"


const routes = [
    {
        path: '/',
        component : MainPage
    },
    {
        path: '/posts',
        component : PostPage
    },
    {
        path: '/about',
        component : AboutPage
    },

]


const router = createRouter(
    {
        routes,
        history: createWebHistory()
    }
)

export default router;