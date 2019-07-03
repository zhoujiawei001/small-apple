import { mapActions, mapState } from 'vuex'
import { sendBodyToDev, watchVirtualKey } from './pub'

export const viewsMixin = {
  data () {
    return {
      cmds: {},
      rc: JSON.parse(this.$route.query.rc),
      longClickTimer: null, // 长按定时器
      longClickNum: 0, // 判断长按还是点击的值
      curLearnKey: '', // 当前学习的按键
      hasLearnCodes: [], // 已经学过的码库
      isLearn: false, // true-正在学习
      tipsBox: false, // 提示框显示隐藏
      learnBoxText: '长按要学习的按键，进入学习状态，此键会闪烁，等待学习',
      learnTimeoutTimer: null, // 学习超时定时器
      learnTimeoutCount: 0 // 学习时间
    }
  },
  created () {
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
    }
  },
  computed: {
    ...mapState(['addedDevList', 'cmdList', 'statusBarHg', 'controlKey']),
    cmdsKey () {
      return this._.union(Object.keys(this.cmds), this.hasLearnCodes)
    },
    title () {
      let arr = this.addedDevList.filter(item => item.hid === this.rc.hid)
      return arr[0].hname || arr[0].name
    },
    styObjCont () {
      return {
        marginTop: `calc(4.8rem + ${this.statusBarHg}px)`,
        paddingBottom: this.rc.pageType === 'learnPage' ? '5.8rem' : 0
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
    }
  },
  beforeDestroy () {
    this.removeTimer()
  }
}
