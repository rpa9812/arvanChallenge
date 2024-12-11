import { createRouter, createWebHistory } from "vue-router";

import ArticleList from "./pages/article/ArticleList.vue";
import LoginPage from "./pages/auth/LoginPage.vue";
import RegisterationPage from "./pages/auth/RegisterationPage.vue";
import CreateArticle from "./pages/article/CreateArticle.vue";
import EditArticle from "./pages/article/EditArticle.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    
    {
      path: "/articles",
      name:'ArticleList',
      component: ArticleList,
    },
    { path: "/articles/create",name:'CreateArticle', component: CreateArticle },
    { path: "/articles/edit/:slug",name:'EditArticle',  component: EditArticle },
    { path: "/login",name:'Login',  component: LoginPage },
    { path: "/register",name:'RegisterationPage',  component: RegisterationPage },
    { path: "/", redirect: "/login" },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token && to.name === 'RegisterationPage') {
    next(); 
  }
  else if (!token && to.name !== 'Login' ) {

    next({ name: 'Login' });
  } else if (token && to.name === 'Login') {

    next({ name: 'ArticleList' });
  } else {

    next();
  }
});




export default router;
