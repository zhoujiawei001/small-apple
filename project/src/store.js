import Vue from 'vue'
import Vuex from 'vuex'
import $http from './utils/requset'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statusBarHg: 20, // 手机状态栏高度
    screenWd: 0, // 获取屏幕宽度
    tid: 1, // 设备类型ID
    bid: null, // 设备品牌ID
    typeData: [] // 设备类型数据
  },
  getters: {
    screenRem (state) {
      let h = state.screenWd
      if (h <= 320) {
        return 10
      } else if (h <= 360) {
        return 10
      } else if (h <= 375) {
        return 10.42
      } else if (h <= 400) {
        return 11.11
      } else if (h <= 414) {
        return 11.50
      } else {
        return 12
      }
    },
    typeList (state) {
      const arr = [1, 2, 6, 7, 8, 10]
      return state.typeData.filter(item => arr.includes(item.tid))
    }
  },
  mutations: {
    setStatusBarHg (state, payload) {
      state.statusBarHg = payload
    },
    setScreenWd (state, payload) {
      state.screenWd = payload
    },
    setTid (state, payload) {
      state.tid = payload
    },
    setBid (state, payload) {
      state.bid = payload
    },
    setTypeData (state, payload) {
      state.typeData = payload
    }
  },
  actions: {
    initFun ({ commit, state }) {
      window.app = {
        setTitleCallback (res) {
          console.log(res)
        },
        setDeviceInfoCallback (res) {
          console.log('setDeviceInfoCallback', res)
        }
      }
    },
    getDevTypeList ({ commit, getters}) {
      if (getters.typeList.length > 0) return
      $http.get('/huawei/l.php', {
        params: {
          m: 'live',
          c: 'be_rc_type'
        }
      }).then(res => {
        console.log('getDevTypeList', res.data.result)
        commit('setTypeData', res.data.result)
      })
    },
    getDevBrandList ({ commit, state }) {
      return new Promise(resolve => {
        $http.get(
          `/huawei/l.php?m=live&c=fname_list&rc_type=${state.tid}`
        ).then(res => {
          console.log('getDevBrandList', res.data.result)
          resolve(res.data.result)
        })
      })
    },
    getDevModeList ({commit, state}, bid) {
      return new Promise(resolve => {
        $http.get(
          `/huawei/l.php?m=live&c=area_fname&bid=${bid}&rc_type=${state.tid}&zip=1`
        ).then(res => {
          console.log('getDevModeList', res.data.result)
          resolve(res.data.result)
        })
      })
    }
  }
})
