import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
import My from '@/views/My'
import Detail from '@/views/Detail'
import UserInfo from '@/views/My/UserInfo.vue'
import Filter from '@/views/filter'
import FilterRes from '@/views/filter/Filter-res.vue'

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
      },
      {
        path: '/filter',
        component: Filter
      }
    ]
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/filter-res', component: FilterRes
  }

]

const router = new VueRouter({
  routes
})

export default router
