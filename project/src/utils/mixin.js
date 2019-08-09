import { mapActions, mapState } from 'vuex'
import { sendBodyToDev, sendBodyToDev2, watchVirtualKey, RC, assembleTS, parseHilinkData, postExtendToServe, removeRegisteredVirtualDevYk, matchTimeoutSendOrder } from './pub'

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
      learnBoxText: this.$t('component.learn_txt1'),
      learnStage: 0, // 学习阶段 0-开始学习/学习失败/学习成功， 1-正在学习
      learnTimeoutTimer: null, // 学习超时定时器
      learnTimeoutCount: 0, // 学习时间
      curNum: 1,
      loadingFlag: false,
      matchTimer: null, // 匹配超时定时器
      matchCount: 0, // 匹配次数
      cmdObj: {},
      isHasR: false, // 判断码库Key键是否含有'_r'
      curIsHasR: '', // 当前是否带'_r'
      hintText: '', // 提示文字
      typeName: '' // 设备型号
    }
  },
  watch: {
    'controlKey.feedKey': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if (this.rc.pageType !== 'learnPage') return
        if (newVal === 2) {
          window.hilink.toast('2', this.$t('component.learn_success'))
          this.learnBoxText = this.$t('component.learn_txt3')
          this.learnStage = 0
          this.addHasLearnCodeToLocal()
        } else if (newVal === 3) {
          this.learnBoxText = this.$t('component.learn_txt4')
          this.learnStage = 0
          window.hilink.toast('2', this.$t('component.failed'))
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
        if (this.rc.pageType !== 'matchPage') return
        if (newVal === 1) {
          this.registerVirtualDev().then(data => {
            if (data.errcode === 0) {
              this.rc2.devId = data.devId
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
                      window.hilink.toast('2', this.$t('component.added_failed'))
                      removeRegisteredVirtualDevYk(this.rc2.devId)
                      this.handleMatchFailedFun()
                    }
                  })
                } else {
                  window.hilink.toast('2', this.$t('component.added_failed'))
                  removeRegisteredVirtualDevYk(this.rc2.devId)
                  this.handleMatchFailedFun()
                }
              })
            } else {
              window.hilink.toast('2', this.$t('component.added_failed'))
              this.handleMatchFailedFun()
            }
          })
        } else {
          window.hilink.toast('2', this.$t('component.download_failed'))
          this.handleMatchFailedFun()
        }
      },
      deep: true
    }
  },
  created () {
    if (this.rc.pageType === 'matchPage') {
      this.getDevCodeLibAndInfo(this.rc.rid).then(data => {
        this.cmds = JSON.parse(JSON.stringify(data.rc_command))
        this.cmdObj = data
        this.typeName = data.rmodel
        this.defineRc(data)
        this.isHasRFn(Object.keys(this.cmds))
      })
    } else {
      if (this.cmdList.hasOwnProperty(this.rc.rid)) {
        this.cmds = this.cmdList[this.rc.rid]
      } else {
        this.getDevCodeLibAndInfo(this.rc.rid).then(data => {
          this.cmds = data.rc_command
          this.$store.commit('updateCmdList', {
            [this.rc.rid]: data.rc_command
          })
        })
      }
    }
  },
  mounted () {
    if (window.localStorage.getItem(`learnCode_${this.rc.hid}`)) {
      this.hasLearnCodes = JSON.parse(window.localStorage.getItem(`learnCode_${this.rc.hid}`))
    }
    if ( window.localStorage.getItem('curIsHasR') === '' || window.localStorage.getItem('curIsHasR') === '_r') {
      this.curIsHasR = window.localStorage.getItem('curIsHasR')
    }
    watchVirtualKey(true).then(bool => {
      if (bool) {
        window.goBack = () => {
          if (this.isLearn || this.loadingFlag) {
            this.hintText = this.isLearn? this.$t('pub.learn_leave') : this.$t('pub.match_leave')
            this.tipsBox = true
          } else {
            this.$router.go(-1)
          }
        }
      }
    })
  },
  computed: {
    ...mapState(['tid', 'addedDevList', 'cmdList', 'statusBarHg', 'controlKey', 'secondListTotal', 'secondList', 'loadRes', 'appDevId']),
    typesName () {
      let obj = {
        1: 'set_box',
        2: 'tv',
        6: 'fan',
        7: 'ac',
        8: 'light',
        10: 'tv_box'
      }
      return obj[this.tid]
    },
    cmdsKey () {
      if (this.rc.pageType === 'matchPage') {
        return Object.keys(this.cmds)
      } else {
        return this._.union(Object.keys(this.cmds), this.hasLearnCodes)
      }
    },
    normalAllKey () {
      return this.tempCmds
    },
    oldKeyArr () {
      return Object.keys(this.oldTempCmds)
    },
    len () {
      return 60 - this.oldKeyArr.length
    },
    extraExpandKeys () { // 额外扩展健
      return this._.difference(this.cmdsKey, this.oldKeyArr).filter(item => item.slice(-2) !== '_r')
    },
    dropExtraExpandKeys () { // 需要丢弃的扩展键
      return this.extraExpandKeys.slice(this.len, this.extraExpandKeys.length)
    },
    expandKeys0 () { // 所有扩展键0
      return this._.difference(this.cmdsKey, this.normalAllKey)
    },
    expandKeys () { // 所有扩展键
      return this._.difference(this.expandKeys0, this.dropExtraExpandKeys)
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
    },
    styObjCont2 () {
      return {
        paddingBottom: this.rc.pageType === 'controlPage' ? 0 : '5.8rem'
      }
    },
  },
  methods: {
    ...mapActions(['getDevCodeLibAndInfo']),
    /** 下发指令 **/
    sendBody (val) {
      console.log('触发了click')
      if (val === 'tvpower' && this.cmdsKey.includes('av/tv')) {
        if (this.rc.pageType === 'controlPage') {
          console.log('sendBody_control', 'av/tv')
          let body = {
            batch: {
              controlKey: {
                controlKey: this.oldTempCmds['av/tv'] + ''
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        } else if (this.rc.pageType === 'matchPage') {
          console.log('sendBody_match', 'av/tv')
          let body = {
            batch: {
              controlKey: {
                controlKey: this.cmds[this.isHasR? ('av/tv' + this.curIsHasR) : 'av/tv']? this.cmds[this.isHasR? ('av/tv' + this.curIsHasR) : 'av/tv'].src : this.cmds['av/tv'].src
              },
              deviceList: {
                list: [{
                  zip: this.cmdObj.zip + ''
                }]
              }
            }
          }
          sendBodyToDev2(body, 'setDeviceInfoCallbackIsHasR').then(data => {
            if (!data.errcode) {
              if (this.isHasR) {
                let $val = ('av/tv' + this.curIsHasR).indexOf('_r') !== -1? ('av/tv' + this.curIsHasR) : ('av/tv' + '_r')
                if (this.cmds[$val]) {
                  this.curIsHasR = this.curIsHasR? '' : '_r'
                }
              }
            }
          })
        }
      } else {
        if (!this.cmdsKey.includes(val)) return
        if (this.rc.pageType === 'controlPage') {
          console.log('sendBody_control', val)
          let body = {
            batch: {
              controlKey: {
                controlKey: this.calcExpandControlKey(val)
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        } else if (this.rc.pageType === 'matchPage') {
          console.log('sendBody_match', val)
          let body = {
            batch: {
              controlKey: {
                controlKey: this.cmds[this.isHasR? (val + this.curIsHasR) : val]? this.cmds[this.isHasR? (val + this.curIsHasR) : val].src : this.cmds[val].src
              },
              deviceList: {
                list: [{
                  zip: this.cmdObj.zip + ''
                }]
              }
            }
          }
          sendBodyToDev2(body, 'setDeviceInfoCallbackIsHasR').then(data => {
            if (!data.errcode) {
              if (this.isHasR) {
                let $val = (val + this.curIsHasR).indexOf('_r') !== -1? (val + this.curIsHasR) : (val + '_r')
                if (this.cmds[$val]) {
                  this.curIsHasR = this.curIsHasR? '' : '_r'
                }
              }
            }
          })
        } else if (this.rc.pageType === 'learnPage') {
          console.log('sendBody_learn', val)
          let body = {
            batch: {
              controlKey: {
                controlKey: this.calcExpandControlKey(val)
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        }
      }
    },
    sendBody2 (val) {
      if (!this.cmdsKey.includes(val)) return
      if (this.rc.pageType === 'learnPage') {
        console.log('sendBody2_learn', val)
        let body = {
          batch: {
            controlKey: {
              controlKey: this.calcExpandControlKey(val)
            },
            deviceList: {
              list: [this.rc]
            }
          }
        }
        sendBodyToDev(body)
      }
    },
    /** 计算扩展键的发码位数 **/
    calcExpandControlKey (val) {
      if (this.oldKeyArr.includes(val)) {
        return this.oldTempCmds[val] + ''
      } else {
        console.log('extraExpandKeys', this.extraExpandKeys)
        let controlKey = this.extraExpandKeys.indexOf(val) + this.oldKeyArr.length + 1
        return  controlKey + ''
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
          this.learnBoxText = this.$t('component.learn_txt2')
          this.learnStage = 1
          let body = {
            batch: {
              controlKey: {
                controlKey: this.calcExpandControlKey(val),
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
      if (this.rc.pageType === 'learnPage') {
        if (this.isLearn) return
        clearTimeout(this.longClickTimer);
        this.longClickTimer = null
        if (this.longClickNum === 0) {
          // this.sendBody2(val)
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
      if (this.isLearn || this.loadingFlag) {
        this.hintText = this.isLearn? this.$t('pub.learn_leave') : this.$t('pub.match_leave')
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
                controlKey: this.calcExpandControlKey(val),
                feedKey: 0
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
          this.learnBoxText = this.$t('component.learn_txt4')
          this.learnStage = 0
          window.hilink.toast('2', this.$t('component.learn_failed'))
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
        clearInterval(this.learnTimeoutTimer)
        this.learnTimeoutTimer = null
        this.isLearn = false
        this.learnTimeoutCount = 0
        let body = {
          batch: {
            controlKey: {
              controlKey: this.calcExpandControlKey[this.curLearnKey],
              feedKey: 0
            },
            deviceList: {
              list: [this.rc]
            }
          }
        }
        sendBodyToDev(body)
        this.learnBoxText = this.$t('component.learn_txt1')
        this.learnStage = 0
        window.hilink.toast('2', this.$t('component.learn_end'))
      } else {
        this.$router.go(-1)
      }
    },
    /** 二级匹配 **/
    handleLeft () {
      if (this.curNum === 1) return
      this.curNum--
      this.pubFun()
    },
    handleRight () {
      if (this.curNum === this.secondListTotal) return
      this.curNum++
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
        this.isHasR = false
        this.typeName = data.rmodel
        console.log('cmdObj', this.cmdObj)
        console.log('cmds', this.cmds)
        this.defineRc(data)
        this.isHasRFn(Object.keys(this.cmds))
      })
    },
    /** 重新定义RC **/
    defineRc (data) {
      this.rc2 = new RC(
        data.rid,
        data.name + ' ' + this.$t(`pub.${this.typesName}`),
        this.rc.index,
        data.rc_command.power.src,
        data.be_rmodel,
        data.rmodel,
        data.bid,
        +data.be_rc_type,
        '',
        assembleTS(),
        this.rc.zip)
    },
    /** 下发参数给设备下载码库 **/
    setUrlDomainToDev (rc) {
      let $params = this.tid === 1? {c: 'remote_details_stb', rid: rc.rid} : {c: 'remote_details', rid: rc.rid, zip: 1, real_key: 1}
      let body = {
        batch: {
          deviceList: {
            list: [rc]
          },
          cmdList: {
            url: {
              domain: 'http://hwh5.yaokantv.com',
              path: '/huawei/l.php',
              param: $params
            }
          }
        }
      }
      sendBodyToDev2(body, 'setDeviceInfoCallbackInMatch2').then(data => {
        if (data.errcode) {
          this.handleMatchFailedFun()
        }
      })
    },
    /** 匹配超时处理 **/
    handleMatchTimeout () {
      this.matchTimer = setInterval(() => {
        this.matchCount++
        if (this.matchCount > 30) {
          window.hilink.toast('2', this.$t('component.match_timeout'))
          this.handleMatchFailedFun()
          matchTimeoutSendOrder()
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
            model: this.rc2.rmodel || 'setBox',
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
        console.log('register_body', body)
        window.registerCallback2 = res => {
          console.log('register_result', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
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
        console.log('postYkDevToServe_body', body)
        window.postDeviceExtendDataByIdCallback2 = res => {
          console.log('postYkDevToServe_result', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendDataById(this.rc2.devId, JSON.stringify(body), 'postDeviceExtendDataByIdCallback2')
      })
    },
    /** 判断码库是否包含“_r” 的key键*/
    isHasRFn (cmdsKey) {
      for (let i = 0; i < cmdsKey.length; i++) {
        if (cmdsKey[i].indexOf('_r') !== -1) {
          this.isHasR = true
          break
        }
      }
      console.log('isHasR', this.isHasR)
    },
    /** 将是否包含“_r”的KEY键保存在localStorage中 **/
    saveIsHasRToLocal () {
      window.localStorage.setItem('curIsHasR',this.curIsHasR)
    }
  },
  beforeDestroy () {
    this.removeTimer()
    this.saveIsHasRToLocal()
    watchVirtualKey(false)
  }
}
