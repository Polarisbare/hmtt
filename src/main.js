import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vants'// 按需引入
// import Vant from 'vant'// 引入组件vant
import 'vant/lib/index.css'// 引入组件样式vant
import 'amfe-flexible'// 引入移动端适配插件 rem方案
// import { fetchAllChannels } from '@/api/index.js'// 引入方法
// async function getChannels () {
//   const res = await fetchAllChannels()
//   console.log(res)
// }
// getChannels()
// Vue.use(Vant)// 使用组件vant
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
