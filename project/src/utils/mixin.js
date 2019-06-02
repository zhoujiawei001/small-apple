import { mapActions } from 'vuex'
import { sendBodyToDev } from './pub'

export const viewsMixin = {
  data () {
    return {
      cmds: {},
      rc: this.$route.query.rc,
    }
  },
  created () {
    // console.log('rid', this.$route.query.rid)
    this.getDevCodeLibAndInfo(this.$route.query.rc.rid).then(data => {
      console.log('device2', data)
      this.cmds = data.rc_command
    })
  },
  computed: {
    cmdsKey () {
      return Object.keys(this.cmds)
    }
  },
  methods: {
    ...mapActions(['getDevCodeLibAndInfo']),
    /** 下发指令 **/
    sendBody (val) {
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
  }
}
