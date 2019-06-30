import { mapActions, mapState } from 'vuex'
import { sendBodyToDev } from './pub'

export const viewsMixin = {
  data () {
    return {
      cmds: {},
      rc: JSON.parse(this.$route.query.rc),
      longClickTimer: null, // 长按定时器
      longClickNum: 0 // 判断长按还是点击的值
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
  },
  computed: {
    ...mapState(['addedDevList', 'cmdList', 'statusBarHg']),
    cmdsKey () {
      return Object.keys(this.cmds)
    },
    title () {
      let arr = this.addedDevList.filter(item => item.hid === this.rc.hid)
      return arr[0].hname || arr[0].name
    },
    styObjCont () {
      return {
        marginTop: `calc(4.8rem + ${this.statusBarHg}px)`
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
      console.log('rc', this.rc);
      if (this.rc.pageType === 'learnPage') {
        this.longClickNum = 0
        this.longClickTimer = setTimeout(() => {
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
        }, 500)
      }
    },
    longClickEnd (val) {
      if (this.rc.pageType === 'learnPage') {
        clearTimeout(this.longClickTimer);
        if(this.longClickTimer !== 0 && this.longClickNum ===0){//点击
          // this.sendBody (val)
        }
      }
    }
  }
}
