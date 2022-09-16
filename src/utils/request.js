// 封装axios 请求
import axios from 'axios'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
// Do something before request is sent
// 携带token
  config.headers.Authorization = `Bearer ${store.state.token}`
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
// Do something before response is sent
  return response.data
}, error => {
// Do something with response error
  if (error.response.status === 401) {
    store.commit('removeToken')
    // 当token存在异常时   会直接到登录页面   当你再次登陆的时候会返回到当初token有误的页面
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return Promise.reject(error)
})
export default instance
