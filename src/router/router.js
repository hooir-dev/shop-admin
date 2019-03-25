import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home'
import UserList from '@/views/User'
import { getToken } from '@/utils/auth.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: '/user',
          component: UserList
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = getToken()
  if (!token) {
    return next('/login')
  }
  next()
})
export default router
