import { createRouter, createWebHistory } from 'vue-router'
// import HomeViewDefault from '../views/HomeViewDefault.vue'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/UserList.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name:'UserList',
      component: UserList,
    },
    { 
      path: '/register', 
      name: 'Register', 
      component: RegisterView, 
    }
  ],
})

export default router
