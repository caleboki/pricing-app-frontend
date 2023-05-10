import { createRouter, createWebHistory } from 'vue-router'
import SignupForm from '@/components/SignupForm.vue'
import LoginForm from '@/components/LoginForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/signup',
      name: 'Signup',
      component: SignupForm
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    }
  ]
})

export default router
