import { createRouter, createWebHistory } from "vue-router";

import ArticleList from "./pages/ArticleList.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterationPage from "./pages/RegisterationPage.vue";
import CreateArticle from "./pages/CreateArticle.vue";
import EditArticle from "./pages/EditArticle.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/articles" },
    {
      path: "/articles",
      component: ArticleList,
    },
    { path: "/articles/create", component: CreateArticle },
    { path: "/articles/edit/:slug", component: EditArticle },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterationPage },
  ],
});

export default router;
