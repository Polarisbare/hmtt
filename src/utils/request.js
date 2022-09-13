// 封装axios 请求
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
// Do something before request is sent
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
  return Promise.reject(error)
})
export default instance
