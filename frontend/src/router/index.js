import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import NotFound from '../views/NotFound.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import LoginRegister from '../views/LoginRegister.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    alias: '/register',
    name: 'LoginRegister',
    component: LoginRegister,
  },
  {
    path: '/posts/edit/:id?',
    name: 'Edit',
    component: ArticleEdit,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
