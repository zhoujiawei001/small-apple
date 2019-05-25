import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statusBarHg: 20 // 手机状态栏高度
  },
  mutations: {
    setStatusBarHg (state, payload) {
      state.statusBarHg = payload
    }
  },
  actions: {
    initFun ({ commit, state }) {
      window.app = {
        setTitleCallback (res) {
          console.log(res)
        }
      }
    }
  }
})
