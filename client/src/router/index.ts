import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/UserList.vue'
import RegisterUser from '@/views/RegisterView.vue'
import Loginview from '@/views/LoginView.vue'
<<<<<<< HEAD
// import StudyMethodSelector from '@/components/StudyMethodSelector.vue'

=======
import MethodSelectView from '@/views/MethodSelectView.vue'
import TimerView from '@/views/TimerView.vue'
>>>>>>> 911f4d94b74ee778b5053f01767c706741f9ba61
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
      component: RegisterUser, 
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: Loginview
    },
    {
      path: '/timer',
      name: 'TimerView',
      component: TimerView
    },
    {
      path: '/method-selection',
      name: 'MethodSelection',
      component: MethodSelectView
    }
  ],
})

export default router
