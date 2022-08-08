import MainPage from "@/pages/MainPage";
import AboutPage from "@/pages/AboutPage";
import PostPage from "@/pages/PostPage";
import PostIdPage from "@/pages/PostIdPage";
import PostPageWithStore from "@/pages/PostPageWithStore";
import PostPageWithCompositionApi from "@/pages/PostPageWithCompositionApi";
import SalaryPage from "@/pages/SalaryPage";
import RegisterPage from "@/pages/RegisterPage";
import CompleteYouregistrationPage from "@/pages/CompleteYouregistrationPage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/store",
    component: PostPageWithStore,
  },
  {
    path: "/composition",
    component: PostPageWithCompositionApi,
  },
  {
    path: "/salary",
    component: SalaryPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/completeyourregistration",
    component: CompleteYouregistrationPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
