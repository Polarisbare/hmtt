import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
import My from '@/views/My'
import Detail from '@/views/Detail'
import UserInfo from '@/views/My/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      {
        path: 'my',
        component: My
      },
      {
        path: '/user-info',
        component: UserInfo
      }
    ]
  },
  {
    path: '/detail',
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
