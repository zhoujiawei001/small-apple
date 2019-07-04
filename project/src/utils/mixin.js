import { mapActions, mapState } from 'vuex'
import { sendBodyToDev, watchVirtualKey, RC, assembleTS, parseHilinkData, postExtendToServe, removeRegisteredVirtualDevYk } from './pub'

export const viewsMixin = {
  data () {
    return {
      cmds: {},
      rc: JSON.parse(this.$route.query.rc),
      rc2: {},
      longClickTimer: null, // 长按定时器
      longClickNum: 0, // 判断长按还是点击的值
      curLearnKey: '', // 当前学习的按键
      hasLearnCodes: [], // 已经学过的码库
      isLearn: false, // true-正在学习
      tipsBox: false, // 提示框显示隐藏
      learnBoxText: '长按要学习的按键，进入学习状态，此键会闪烁，等待学习',
      learnTimeoutTimer: null, // 学习超时定时器
      learnTimeoutCount: 0, // 学习时间
      curNum: 1,
      loadingFlag: false,
      matchTimer: null, // 匹配超时定时器
      matchCount: 0, // 匹配次数
      cmdObj: {}
    }
  },
  watch: {
    'controlKey.feedKey': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        console.log('返回过来了')
        if (newVal === 2) {
          window.hilink.toast('2', '学习按键成功')
          this.learnBoxText = '学习成功，可点击该按键测试是否正确，如果不对，可再次学习'
          this.addHasLearnCodeToLocal()
        } else if (newVal === 3) {
          this.learnBoxText = '学习失败，请再次长按你想学习的按键，重新学习'
          window.hilink.toast('2', '学习按键失败')
        }
        this.isLearn = false
        clearInterval(this.learnTimeoutTimer)
        this.learnTimeoutTimer = null
        this.learnTimeoutCount = 0
      },
      deep: true
    },
    'loadRes.isFinish': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        console.log('watch-isFinish')
        if (newVal === 1) {
          this.registerVirtualDev().then(data => {
            if (data.errcode === 0) {
              this.rc2.devId = data.devId
              console.log('第二个RC', this.rc2)
              this.postYkDevToServe().then(data2 => {
                if (data2.errcode === 0) {
                  postExtendToServe(this.rc2).then(data3 => {
                    if (data3.errcode === 0) {
                      let cloneList = JSON.parse(JSON.stringify(this.addedDevList))
                      cloneList.push(this.rc2)
                      this.$store.commit('setAddedDevList', cloneList)
                      this.$store.commit('setBrandScrollPos', 0) // 成功之后设置品牌页面滚动距离为O
                      this.$router.push('/')
                    } else {
                      window.hilink.toast('2', '添加遥控失败')
                      removeRegisteredVirtualDevYk(this.rc2.devId)
                      this.handleMatchFailedFun()
                    }
                  })
                } else {
                  window.hilink.toast('2', '添加遥控失败')
                  removeRegisteredVirtualDevYk(this.rc2.devId)
                  this.handleMatchFailedFun()
                }
              })
            } else {
              window.hilink.toast('2', '添加遥控失败')
              this.handleMatchFailedFun()
            }
          })
        } else {
          window.hilink.toast('2', '下载码库失败')
          this.handleMatchFailedFun()
        }
      },
      deep: true
    }
  },
  created () {
    if (this.rc.pageType === 'matchPage') {
      this.getDevCodeLibAndInfo(this.rc.rid).then(data => {
        this.cmds = data.rc_command
        this.cmdObj = data
        this.defineRc(data)
      })
    } else {
      if (this.cmdList.hasOwnProperty(this.rc.rid)) {
        this.cmds = this.cmdList[this.rc.rid]
        console.log('cmds', this.cmds)
      } else {
        this.getDevCodeLibAndInfo(this.rc.rid).then(data => {
          this.cmds = data.rc_command
          this.$store.commit('updateCmdList', {
            [this.rc.rid]: data.rc_command
          })
        })
      }
    }
    watchVirtualKey(true).then(bool => {
      if (bool) {
        window.goBack = () => {
          if (this.isLearn) {
            this.tipsBox = true
          } else {
            this.$router.go(-1)
          }
        }
      }
    })
  },
  mounted () {
    if (window.localStorage.getItem(`learnCode_${this.rc.hid}`)) {
      this.hasLearnCodes = JSON.parse(window.localStorage.getItem(`learnCode_${this.rc.hid}`))
    }
    console.log('cmdsKey', this.cmdsKey)
  },
  computed: {
    ...mapState(['tid', 'addedDevList', 'cmdList', 'statusBarHg', 'controlKey', 'secondListTotal', 'secondList', 'loadRes']),
    cmdsKey () {
      if (this.rc.pageType === 'matchPage') {
        return Object.keys(this.cmds)
      } else {
        return this._.union(Object.keys(this.cmds), this.hasLearnCodes)
      }
    },
    title () {
      if (this.rc.pageType === 'matchPage') {
        return this.rc.hname
      } else {
        let arr = this.addedDevList.filter(item => item.hid === this.rc.hid)
        return arr[0].hname || arr[0].name
      }
    },
    styObjCont () {
      return {
        marginTop: `calc(4.8rem + ${this.statusBarHg}px)`,
        paddingBottom: this.rc.pageType === 'controlPage' ? 0 : '5.8rem'
      }
    }
  },
  methods: {
    ...mapActions(['getDevCodeLibAndInfo']),
    /** 下发指令 **/
    sendBody (val) {
      if (!this.cmdsKey.includes(val)) return
      if (this.rc.pageType === 'controlPage') {
        if (this.$isVibrate) {
          navigator.vibrate(100)
        }
        let body = {
          batch: {
            controlKey: {
              controlKey: this.tempCmds[val] + ''
            },
            deviceList: {
              list: [this.rc]
            }
          }
        }
        sendBodyToDev(body)
      } else if (this.rc.pageType === 'matchPage') {
        if (this.$isVibrate) {
          navigator.vibrate(100)
        }
        let body = {
          batch: {
            controlKey: {
              controlKey: this.cmds[val].src
            },
            deviceList: {
              list: [{
                zip: this.cmdObj.zip + ''
              }]
            }
          }
        }
        sendBodyToDev(body)
      }
    },
    sendBody2 (val) {
      if (!this.cmdsKey.includes(val)) return
      if (this.rc.pageType === 'learnPage') {
        if (this.$isVibrate) {
          navigator.vibrate(100)
        }
        let body = {
          batch: {
            controlKey: {
              controlKey: this.tempCmds[val] + ''
            },
            deviceList: {
              list: [this.rc]
            }
          }
        }
        sendBodyToDev(body)
      }
    },
    moreSet () {
      this.$router.push({
        path: '/setting',
        query: {
          name: this.title,
          hid: this.rc.hid,
          devId: this.rc.devId,
          tid: this.rc.tid
        }
      })
    },
    /** 长按事件 **/
    longClickStart (val) {
      if (this.rc.pageType === 'learnPage') {
        if (this.isLearn) return
        this.longClickNum = 0
        this.longClickTimer = setTimeout(() => {
          if (this.$isVibrate) {
            navigator.vibrate(100)
          }
          this.learnBoxText = '将遥控器正对准小苹果在1米以内，按一下相应按键，等待学习完成'
          let body = {
            batch: {
              controlKey: {
                controlKey: this.tempCmds[val] + '',
                feedKey: 1
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
          this.longClickNum = 1
          this.curLearnKey = val
          this.isLearn  = true
          this.handleLearnTimeout(val)
        }, 1000)
      }
    },
    longClickEnd (val) {
      console.log('longClickEnd', val)
      if (this.rc.pageType === 'learnPage') {
        if (this.isLearn) return
        clearTimeout(this.longClickTimer);
        this.longClickTimer = null
        if (this.longClickNum === 0) {
          console.log('longClickNum', this.longClickNum)
          this.sendBody2(val)
        }
      }
    },
    /** 添加已学过的码，并且不能重复,保存至localStorage **/
    addHasLearnCodeToLocal () {
      if (this.hasLearnCodes.includes(this.curLearnKey)) {
        window.localStorage.setItem(`learnCode_${this.rc.hid}`, JSON.stringify(this.hasLearnCodes))
      } else {
        this.hasLearnCodes.push(this.curLearnKey)
        window.localStorage.setItem(`learnCode_${this.rc.hid}`, JSON.stringify(this.hasLearnCodes))
      }
    },
    /** 点击返回 **/
    onClickBack () {
      if (this.isLearn) {
        this.tipsBox = true
      } else {
        this.$router.go(-1)
      }
    },
    /** 学习超时处理 **/
    handleLearnTimeout (val) {
      this.learnTimeoutTimer = setInterval(() => {
        this.learnTimeoutCount += 1
        if (this.learnTimeoutCount >= 10) {
          clearInterval(this.learnTimeoutTimer)
          this.learnTimeoutTimer = null
          this.isLearn = false
          this.learnTimeoutCount = 0
          let body = {
            batch: {
              controlKey: {
                controlKey: this.tempCmds[val] + '',
                feedKey: 0
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
          this.learnBoxText = '学习失败，请再次长按你想学习的按键，重新学习'
          window.hilink.toast('2', '学习按键失败')
        }
      }, 1000)
    },
    /** 离开页面销毁定时器 **/
    removeTimer () {
      clearInterval(this.learnTimeoutTimer)
      this.learnTimeoutTimer = null
      clearTimeout(this.longClickTimer)
      this.longClickTimer = null
      clearInterval(this.matchTimer)
      this.matchTimer = null
    },
    /** 结束学习 **/
    handleEnd () {
      if (this.isLearn) {
        if (this.$isVibrate) {
          navigator.vibrate(100)
        }
        clearInterval(this.learnTimeoutTimer)
        this.learnTimeoutTimer = null
        this.isLearn = false
        this.learnTimeoutCount = 0
        let body = {
          batch: {
            controlKey: {
              controlKey: this.tempCmds[this.curLearnKey] + '',
              feedKey: 0
            },
            deviceList: {
              list: [this.rc]
            }
          }
        }
        sendBodyToDev(body)
        this.learnBoxText = '长按要学习的按键，进入学习状态，此键会闪烁，等待学习'
        window.hilink.toast('2', '学习按键结束')
      } else {
        this.$router.go(-1)
      }
    },
    /** 二级匹配 **/
    handleLeft () {
      if (this.curNum === 1) return
      this.curNum--
      if (this.$isVibrate) {
        navigator.vibrate(100)
      }
      this.pubFun()
    },
    handleRight () {
      if (this.curNum === this.secondListTotal) return
      this.curNum++
      if (this.$isVibrate) {
        navigator.vibrate(100)
      }
      this.pubFun()
    },
    handleMid () {
      this.loadingFlag = true
      this.handleMatchTimeout()
      this.setUrlDomainToDev(this.rc2)
    },
    pubFun () {
      let $rid = this.secondList[this.curNum - 1].rid
      this.getDevCodeLibAndInfo($rid).then(data => {
        this.cmds = data.rc_command
        this.cmdObj = data
        console.log('curNum', this.cmds)
        this.defineRc(data)
      })
    },
    /** 重新定义RC **/
    defineRc (data) {
      this.rc2 = new RC(
        data.rid,
        data.name,
        this.rc.index,
        this.rc.code,
        data.be_rmodel,
        data.rmodel,
        data.bid,
        +data.be_rc_type,
        '',
        assembleTS(),
        this.rc.zip)
      console.log('第一个RC', this.rc2)
    },
    /** 下发参数给设备下载码库 **/
    setUrlDomainToDev (rc) {
      let body = {
        batch: {
          deviceList: {
            list: [rc]
          },
          cmdList: {
            url: {
              domain: 'http://hwh5.yaokantv.com',
              path: '/huawei/l.php',
              param: {
                m: 'live',
                c: 'remote_details',
                rid: rc.rid,
                zip: rc.zip
              }
            }
          }
        }
      }
      this.sendBodyInMatch(body).then(data => {
        if (data.errcode) {
          this.handleMatchFailedFun()
        }
      })
    },
    /** match页面的下发数据 **/
    sendBodyInMatch (body) {
      console.log('body', body)
      return new Promise(resolve => {
        window.setDeviceInfoCallbackInMatch = res => {
          console.log('setDeviceInfoCallbackInMatch', JSON.parse(res))
          resolve(JSON.parse(res))
        }
        window.hilink.setDeviceInfo('0', JSON.stringify(body), 'setDeviceInfoCallbackInMatch')
      })
    },
    /** 匹配超时处理 **/
    handleMatchTimeout () {
      this.matchTimer = setInterval(() => {
        this.matchCount++
        if (this.matchCount > 30) {
          window.hilink.toast('2', '匹配超时')
          this.handleMatchFailedFun()
        }
        console.log('matchCount', this.matchCount)
      }, 1000)
    },
    /** 匹配失败处理 **/
    handleMatchFailedFun () {
      this.loadingFlag = false
      clearInterval(this.matchTimer)
      this.matchTimer = null
      this.matchCount = 0
    },
    /** 注册虚拟设备到九宫格 **/
    registerVirtualDev () {
      return new Promise(resolve => {
        let body = {
          devInfo: {
            sn: this.rc2.hid,
            model: this.rc2.name,
            devType: '06C',
            manu: '092',
            prodId: this.selectRightProdId(this.tid),
            hiv: '1.0',
            mac: '',
            fwv: '1.0',
            hwv: '1.0',
            swv: '1.0'
          }
        }
        window.registerCallback2 = res => {
          console.log('registerCallback2', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        console.log('regiterInfraredHubDevice', body)
        window.hilink.regiterInfraredHubDevice(JSON.stringify(body), 'registerCallback2')
      })
    },
    selectRightProdId (tid) {
      let obj = {
        1: '113Y',
        2: '113X',
        6: '114B',
        7: '113Z',
        8: '114C',
        10: '114A'
      }
      return obj[tid]
    },
    /**云端上传虚拟遥控设备**/
    postYkDevToServe () {
      return new Promise(resolve => {
        let body = {
          type: 'VirtRemoteInfo',
          data: {
            gID: this.appDevId, // 小苹果的设备id
            dUID: {
              deviceList: {
                list: [this.rc2]
              }
            }
          }
        }
        window.postDeviceExtendDataByIdCallback2 = res => {
          console.log('postDeviceExtendDataByIdCallback2', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendDataById(this.rc2.devId, JSON.stringify(body), 'postDeviceExtendDataByIdCallback2')
      })
    },
  },
  beforeDestroy () {
    this.removeTimer()
  }
}
