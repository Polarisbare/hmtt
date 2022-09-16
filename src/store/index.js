import { loginApi } from '@/api'
import Vue from 'vue'
import Vuex from 'vuex'
import { getTokenFn, setTokenFn, removeTokenFn } from '@/utils/ls.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getTokenFn() || ''
  },
  mutations: {
    // gaibiantoken同步方法
    setToken (state, newToken) {
      state.token = newToken
      // ls   本地存一份
      setTokenFn(newToken)
    },
    // 删除token
    removeToken (state) {
      state.token = ''
      removeTokenFn()
    }
  },
  actions: {
    // 改变token异步方法
    async fetchLogin (context, form) {
      // 调用登录接口
      const { data } = await loginApi(form)
      // console.log(res)
      const token = data.token
      context.commit('setToken', token)
    }
  }
})
