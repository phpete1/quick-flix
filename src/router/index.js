import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/movies/:id',
    name: 'movies',
    component: () => import('../views/TitleView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes
})

export default router
