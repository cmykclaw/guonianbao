import { createRouter, createWebHistory } from 'vue-router'
import GiftBookView from '@/views/GiftBookView.vue'
import TipsView from '@/views/TipsView.vue'
import RelativesView from '@/views/RelativesView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/gifts',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/gifts',
    name: 'GiftRecords',
    component: GiftBookView,
  },
  {
    path: '/tips',
    name: 'Tips',
    component: TipsView,
  },
  {
    path: '/relatives',
    name: 'Relatives',
    component: RelativesView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.path === '/login' && token) {
    next('/gifts')
  } else if (to.path !== '/login' && !token && to.path !== '/') {
    next('/login')
  } else {
    next()
  }
})

export default router
