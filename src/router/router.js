import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home'
import UserList from '@/views/User'

Vue.use(Router)

export default new Router({
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
