import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import NotFound from '../views/NotFound.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import LoginRegister from '../views/LoginRegister.vue'
import SinglePost from '../views/SinglePost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { header: 'Home' },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginRegister,
    meta: { header: 'Login' },
  },
  {
    path: '/register',
    alias: '/register',
    name: 'Register',
    component: LoginRegister,
    meta: { header: 'Register' },
  },
  {
    path: '/posts/edit/:id?',
    name: 'Edit',
    component: ArticleEdit,
    meta: { header: 'Edit Post' },
  },
  {
    path: '/posts/user',
    name: 'UserPosts',
    component: Posts,
    meta: { header: 'My Posts' },
  },
  {
    path: '/posts/:id',
    name: 'SinglePost',
    component: SinglePost,
    meta: { header: '' },
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    meta: { header: 'All Posts' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { header: '' },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
