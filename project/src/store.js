import Vue from 'vue'
import Vuex from 'vuex'
import $http from './utils/requset'
import { parseHilinkData, getExtendToServe } from './utils/pub'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appDevId: '',
    statusBarHg: 20, // 手机状态栏高度
    screenWd: 0, // 获取屏幕宽度
    tid: 1, // 设备类型ID
    bid: null, // 设备品牌ID
    typeData: [], // 设备类型数据
    addedDevList: [], // 已经添加的遥控设备
    brandScrollPos: null, // brand页面滚动的距离
    cmdList: {}, //码库
  },
  getters: {
    screenRem (state) { // 当前手机屏幕下1rem为多少px
      let h = state.screenWd
      if (h >= 750) {
        return 20.83
      } else if (h >= 480) {
        return 13.33
      } else if (h >= 414) {
        return 11.5
      } else if (h >= 400) {
        return 11.11
      } else if (h >= 375) {
        return 10.42
      } else {
        return 10
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
    },
    setAddedDevList (state, payload) {
      state.addedDevList = payload
    },
    setBrandScrollPos (state, payload) {
      state.brandScrollPos = payload
    },
    updateCmdList(state, payload) {
      Object.assign(state.cmdList, payload)
    }
  },
  actions: {
    initFun ({ commit, state }) {
      window.onResume = () =>{}
      window.app = {
        getDevInfoAllCallback (res) {
          let data = parseHilinkData(res)
          state.appDevId = data.devId
        },
        setTitleCallback (res) {
          console.log(res)
        },
        setDeviceInfoCallback (res) {
          console.log('setDeviceInfoCallback', res)
        },
        getBarCallback (res) {
          console.log(JSON.parse(res))
          let data = JSON.parse(res)
          commit('setStatusBarHg', data.statusBarHeight)
        },
        /** 获取设备类型返回函数 **/
        getRCTypeResultCallback (res) {
          let data = parseHilinkData(res)
          // console.log('获取设备类型返回函数', data)
          commit('setTypeData', data.result)
        }
      }
    },
    /** 获取设备类型数据 **/
    getDevTypeList ({ commit, getters}) {
      if (getters.typeList.length > 0) return
      // $http.get('/huawei/l.php', {
      //   params: {
      //     m: 'live',
      //     c: 'be_rc_type'
      //   }
      // }).then(res => {
      //   console.log('getDevTypeList', res.data.result)
      //   commit('setTypeData', res.data.result)
      // })
      let reqParams = {
        domain: 'http://hwh5.yaokantv.com',
        path: '/huawei/l.php',
        method: 'GET',
        param: {
          m: 'live',
          c: 'be_rc_type'
        }
      }
      window.hilink.requestThirdPartConfig(JSON.stringify(reqParams), 'app.getRCTypeResultCallback')
    },
    /** 获取设备品牌数据 **/
    getDevBrandList ({ commit, state }) {
      return new Promise(resolve => {
        // $http.get(
        //   `/huawei/l.php?m=live&c=fname_list&rc_type=${state.tid}`
        // ).then(res => {
        //   console.log('getDevBrandList', res.data.result)
        //   resolve(res.data.result)
        // })
        let reqParams = {
          domain: 'http://hwh5.yaokantv.com',
          path: `/huawei/l.php?m=live&c=fname_list&rc_type=${state.tid}`,
          method: 'POST',
          param: {
            m: 'live',
            c: 'fname_list',
            rc_type: state.tid
          }
        }
        window.getBrandResultCallback = res => {
          let data = parseHilinkData(res)
          // console.log('获取设备品牌数据', data)
          resolve(data.result)
        }
        window.hilink.requestThirdPartConfig(JSON.stringify(reqParams), 'getBrandResultCallback')
      })
    },
    /** 获取设备型号数据 **/
    getDevModeList ({commit, state}, bid) {
      return new Promise(resolve => {
        // $http.get(
        //   `/huawei/l.php?m=live&c=area_fname&bid=${bid}&rc_type=${state.tid}&zip=1`
        // ).then(res => {
        //   console.log('getDevModeList', res.data.result)
        //   resolve(res.data.result)
        // })
        let reqParams = {
          domain: 'http://hwh5.yaokantv.com',
          path: `/huawei/l.php?m=live&c=area_fname&bid=${bid}&rc_type=${state.tid}&zip=1`,
          method: 'POST',
          param: {
            m: 'live',
            c: 'area_fname',
            bid: bid,
            rc_type: state.tid,
            zip: 1
          }
        }
        window.getMatchResultCallback = res => {
          let data = parseHilinkData(res)
          // console.log('获取设备型号数据', data)
          resolve(data.result)
        }
        window.hilink.requestThirdPartConfig(JSON.stringify(reqParams), 'getMatchResultCallback')
      })
    },
    /** 获取设备码库和基本信息 **/
    getDevCodeLibAndInfo ({commit, state}, rid) {
      return new Promise(resolve => {
        // $http.get(
        //   `/huawei/l.php?m=live&c=remote_details&rid=${rid}&zip=1`
        // ).then(res => {
        //   console.log('getDevCodeLibAndInfo', res.data)
        //   resolve(res.data)
        // })
        let reqParams = {
          domain: 'http://hwh5.yaokantv.com',
          path: `/huawei/l.php?m=live&c=remote_details&rid=${rid}&zip=1`,
          method: 'POST',
          param: {
            m: 'live',
            c: 'remote_details',
            rid: rid,
            zip: 1
          }
        }
        window.getRCResultCallback = res => {
          let data = parseHilinkData(res)
          // console.log('获取设备码库和基本信息', data)
          resolve(data)
        }
        window.hilink.requestThirdPartConfig(JSON.stringify(reqParams), 'getRCResultCallback')
      })
    }
  }
})
