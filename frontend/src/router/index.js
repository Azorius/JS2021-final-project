import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
