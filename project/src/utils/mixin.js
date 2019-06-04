import { mapActions, mapState } from 'vuex'
import { sendBodyToDev } from './pub'

export const viewsMixin = {
  data () {
    return {
      cmds: {},
      rc: JSON.parse(this.$route.query.rc),
    }
  },
  created () {
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
  },
  computed: {
    ...mapState(['addedDevList', 'cmdList']),
    cmdsKey () {
      console.log('keys', Object.keys(this.cmds))
      return Object.keys(this.cmds)
    },
    title () {
      let arr = this.addedDevList.filter(item => item.hid === this.rc.hid)
      return arr[0].hname || arr[0].name
    }
  },
  methods: {
    ...mapActions(['getDevCodeLibAndInfo']),
    /** 下发指令 **/
    sendBody (val) {
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
    },
    moreSet () {
      this.$router.push({
        path: '/setting',
        query: {
          name: this.title,
          hid: this.rc.hid,
          devId: this.rc.devId
        }
      })
    }
  }
}
