<template>
  <!--空调-->
  <div class="dev-AC">
    <appHeader
      :title="title"
      @back-icon="$router.go(-1)"
      @set="moreSet"></appHeader>
    <div
      class="banner"
      :class="{'btn-disable': isSwitch === 'off'}"
      :style="bannerObj">
      <div class="temp-box">
        {{currentTemp}}<span class="circle">°</span><span style="font-size: 7rem">c</span>
      </div>
      <div class="ac-icon flex">
        <img :src="imgMode" alt="">
        <img :src="imgWind" alt="">
        <img :src="imgUpDown" alt="">
        <img :src="imgLeftRight" alt="">
      </div>
    </div>
    <div class="container">
      <div class="btn-function flex" :class="{'btn-disable': isSwitch === 'off'}">
        <span class="btn" @click="changeMode">{{$t('dev_ac.mode')}}</span>
        <span class="btn" @click="changeWind">{{$t('dev_ac.speed')}}</span>
        <span class="btn" @click="changeUpDown">{{$t('dev_ac.v_swing')}}</span>
        <span class="btn" :class="{'btn-disable': !isHorizontalSwing}" @click="changeLeftRight">{{$t('dev_ac.h_swing')}}</span>
      </div>
      <div class="change-temperature flex" :class="{'btn-disable': isSwitch === 'off'}">
        <span class="btn-reduce" @click="changeTemp('-')">—</span>
        <div class="text">{{$t('dev_ac.temp')}}</div>
        <span class="btn-plus" @click="changeTemp('+')">＋</span>
      </div>
      <div class="timer-switch flex">
        <div
          class="left"
          :class="{'btn-disable3': isSwitch === 'off'}"
          @click="closeDelayTime">
          <span class="text">{{$t('dev_ac.cancel_delay')}}</span>
        </div>
        <div
          class="middle"
          @click="clickSwitch"
          :style="switchObj">
          <span :style="switchIconObj"></span>
          <p class="text">{{$t('pub.power')}}</p>
        </div>
        <div
          class="right"
          :class="{'btn-disable3': isSwitch === 'off'}"
          @click="setDelayTime()">
          <span class="text">{{$t('dev_ac.delay_off')}}</span>
          <p
            class="detail"
            v-if="clickTimes > 0">
            <span>{{currentDelayTimeHour}}</span>
            <span>:</span>
            <span>{{currentDelayTimeMin}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import {sendBodyToDev, sendBodyToDev2, modifyDevSwitchByHid} from '../../utils/pub'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'device7',
    components: {
      appHeader
    },
    data() {
      return {
        isSwitch: JSON.parse(this.$route.query.rc).isSwitch,
        rc: JSON.parse(this.$route.query.rc),
        currentTemp: 26,
        currentState: 'r_s0_26_u1_l0_p0', // 制冷_风量自动_26度_上下扫风开_左右扫风关_睡眠关
        isHasStar: false, // 判断码库是否包含星星
        isOpenAirTemp: false,
        cmdskeys: [], // 码库Key键集合
        delayOpen: '', // 倒计时开
        delayClose: '', // 倒计时关
        currentDelayTime: '', // 当前倒计时
        currentDelayTimeHour: '', // 当前倒计时小时
        currentDelayTimeMin: '', // 当前倒计时分钟
        clickTimes: 0, // 点击时间
        delayTimer: null, // 倒计时定时器
        delayBody: {}, // 下发指令参数
        delayBodyTimer: null, // 下发指令定时器
        copyDelayBody: {},
        clickCounts: 0, // 点击次数
        listMin: [10, 20, 30],
        mode: [], // 当前空调支持的功能
        attr: {}, // 当前功能所对应的
        isHorizontalSwing: true // 是否有上下扫风
      }
    },
    created () {
      if (this.cmdList.hasOwnProperty(this.rc.rid)) {
        this.cmdskeys = this.cmdList[this.rc.rid]
        for (let i = 0; i < this.cmdskeys.length; i++) {
          if (this.cmdskeys[i].indexOf('*') !== -1) {
            this.isHasStar = true
            break
          }
        }
        console.log('isHasStar-for', this.isHasStar)
      } else {
        this.getDevCodeLibAndInfo(this.rc.rid).then(data => {
          this.cmdskeys = Object.keys(data.rc_command)
          for (let i = 0; i < this.cmdskeys.length; i++) {
            if (this.cmdskeys[i].indexOf('*') !== -1) {
              this.isHasStar = true
              break
            }
          }
          console.log('isHasStar-for', this.isHasStar)
          this.$store.commit('updateCmdList', {
            [this.rc.rid]: Object.keys(data.rc_command)
          })
        })
      }
      this.getACFnList(this.rc.rid).then(data => {
        console.log('qiqibaba', data.attributes.cold.swing)
        let swingArrs = data.attributes.cold.swing
        this.isHorizontalSwing = swingArrs.includes('horizontalOn')
        console.log('isHorizontalSwing', this.isHorizontalSwing)
      })
    },
    mounted () {
      // if (window.localStorage.getItem(`ac-switch__${this.rc.hid}`)) {
      //   this.isSwitch = window.localStorage.getItem(`ac-switch__${this.rc.hid}`)
      // }
      if (window.localStorage.getItem(`ac-state__${this.rc.hid}`)) {
        this.currentState = window.localStorage.getItem(`ac-state__${this.rc.hid}`)
        this.currentTemp = this.currentState.split('_')[2]
      }
      this.runDelay()
    },
    watch: {
      delay: {
        handler(val) {
          console.log('watch', val)
          let arr = val.filter(item => item.id === this.rc.index)
          if (arr[0].enable) {
            this.clearDelayTimer()
            this.clickCounts = 0
            this.delayTimer = setInterval(() => {
              this.clickTimes = arr[0].endTime - Date.parse(new Date()) / 1000
              console.log('clickTimes', this.clickTimes )
              if (this.clickTimes <= 0) {
                this.clearDelayTimer()
                this.clickCounts = 0
                this.clickTimes = 0
                this.currentDelayTime = ''
                this.currentDelayTimeHour = ''
                this.currentDelayTimeMin = ''
                this.isSwitch = 'off'
                this.changeSwitchPub()
              } else {
                this.currentDelayTime = this.changeTimeToStr(this.clickTimes)
                this.currentDelayTimeHour = this.changeTimeToStr2(this.clickTimes, 'h')
                this.currentDelayTimeMin = this.changeTimeToStr2(this.clickTimes, 'm')
              }
            }, 1000)
          } else {
            this.clickCounts = 0
            this.clearDelayTimer()
            this.clearDelayBodyTimer()
            this.clickTimes = 0
            this.currentDelayTime = ''
            this.currentDelayTimeHour = ''
            this.currentDelayTimeMin = ''
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapState(['addedDevList', 'cmdList', 'delay']),
      title () {
        let arr = this.addedDevList.filter(item => item.hid === this.rc.hid)
        return arr[0].hname || arr[0].name
      },
      imgMode () {
        return require(`../../assets/airIcon/mode_${this.currentState.split('_')[0]}.png`)
      },
      imgWind () {
        return require(`../../assets/airIcon/wind_${this.currentState.split('_')[1]}.png`)
      },
      imgUpDown () {
        return require(`../../assets/airIcon/upDown_${this.currentState.split('_')[3]}.png`)
      },
      imgLeftRight () {
        return require(`../../assets/airIcon/leftRight_${this.currentState.split('_')[4]}.png`)
      },
      currentDelay () { // 当前延时
        let arr = this.delay.filter(item => item.id === this.rc.index)
        return arr[0]
      },
      switchObj () {
        return {
          backgroundColor: this.isSwitch === 'on' ? '#3EA0EA' : '',
          color: this.isSwitch === 'on'? '#fff': 'rgb(26,26,26)'
        }
      },
      switchIconObj () {
        return {
          background: `url(${require(`../../assets/fan-switch-${this.isSwitch}.png`)}) no-repeat center`
        }
      },
      bannerObj () {
        return {
          background: this.isSwitch === 'on'? `url(${require(`../../assets/background.png`)}) no-repeat center` : `url(${require(`../../assets/airCondiner_off.jpg`)}) no-repeat center`
        }
      }
    },
    methods: {
      ...mapActions(['getDevCodeLibAndInfo', 'getACFnList']),
      /** 页面跳转 **/
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
      /** 改变模式 **/
      changeMode() {
        let arr = this.currentState.split('_')
        switch (arr[0]) {
          case 'r': // 切自动
            arr[0] = 'a'
            this.currentState = arr.join('_') // a_s0_26_u1_l1_p0
            arr[2] = '16' // arr: [a, s0, 16, u1, l1, p0] 自动下无温度
            this.sendBody('0',arr)
            break
          case 'a': // 切除湿
            arr[0] = 'd'
            arr[1] = 's1' // 除湿模式风速挡只能位1挡
            this.currentState = arr.join('_') // d_s1_26_u1_l1_p0
            arr[2] = '16' // 除湿下无温度
            this.sendBody('0',arr)
            break
          case 'd': // 切送风
            arr[0] = 'w'
            if (arr[1] === 's0') {
              arr[1] = 's1'
            }
            this.currentState = arr.join('_') // w_s1_26_u1_l1_p0
            this.sendBody('0',arr)
            break
          case 'w': // 切制热
            arr[0] = 'h'
            this.currentState = arr.join('_') // h_s1_26_u1_l1_p0
            this.sendBody('0',arr)
            break
          case 'h': // 切制冷
            arr[0] = 'r'
            this.currentState = arr.join('_') // r_s1_26_u1_l1_p0
            this.sendBody('0',arr)
            break
        }
      },
      /** 改变风速 **/
      changeWind() {
        let arr = this.currentState.split('_')
        switch (arr[1]) {
          case 's0':  // 切1档
            arr[1] = 's1'
            this.currentState = arr.join('_') // r_s1_26_u1_l1_p0
            if (arr[0] === 'a' || arr[0] === 'd') { // 如果是自动或者抽湿模式则去掉温度，规定为16度发送
              arr[2] = '16'
            }
            this.sendBody('0',arr)
            break
          case 's1':  // 切2档
            arr[1] = 's2'
            this.currentState = arr.join('_') // r_s2_26_u1_l1_p0
            if (arr[0] === 'a') {
              arr[2] = '16'
            } else if (arr[0] === 'd') {
              arr[2] = '16'
              arr[1] = 's1'
            }
            this.sendBody('0',arr)
            break
          case 's2':  // 切3档
            arr[1] = 's3'
            this.currentState = arr.join('_') // r_s3_26_u1_l1_p0
            if (arr[0] === 'a') {
              arr[2] = '16'
            } else if (arr[0] === 'd') {
              arr[2] = '16'
              arr[1] = 's1'
            }
            this.sendBody('0',arr)
            break
          case 's3':  // 切3档
            arr[1] = 's0'
            this.currentState = arr.join('_') // r_s0_26_u1_l1_p0
            if (arr[0] === 'a') {
              arr[2] = '16'
            } else if (arr[0] === 'd') {
              arr[2] = '16'
              arr[1] = 's1'
            } else if (arr[0] === 'w') {
              arr[1] = 's1'
              this.currentState = arr.join('_')
            }
            this.sendBody('0',arr)
            break
        }
      },
      /** 上下扫风切换 **/
      changeUpDown() {
        let arr = this.currentState.split('_')
        switch (arr[3]) {
          case 'u0': // 切上下扫风开
            arr[3] = 'u1'
            this.currentState = arr.join('_') // r_s0_26_u1_l1_p0
            if (!this.isHasStar) {
              if (arr[0] === 'a') {
                arr[2] = '16'
              } else if (arr[0] === 'd') {
                arr[2] = '16'
                arr[1] = 's1'
              } else if (arr[0] === 'w') {
                if (arr[1] === 's0') {
                  arr[1] = 's1'
                }
              }
              this.sendBody('0',arr)
            } else {
              this.sendBody('1', 4)
            }
            break
          case 'u1': // 切上下扫风关
            arr[3] = 'u0'
            this.currentState = arr.join('_') // r_s0_26_u0_l1_p0
            if (!this.isHasStar) {
              if (arr[0] === 'a') {
                arr[2] = '16'
              } else if (arr[0] === 'd') {
                arr[2] = '16'
                arr[1] = 's1'
              } else if (arr[0] === 'w') {
                if (arr[1] === 's0') {
                  arr[1] = 's1'
                }
              }
              this.sendBody('0',arr)
            } else {
              this.sendBody('1', 3)
            }
            break
        }
      },
      /** 左右扫风切换 **/
      changeLeftRight() {
        let arr = this.currentState.split('_')
        switch (arr[4]) {
          case 'l0': // 切左右扫风开
            arr[4] = 'l1'
            this.currentState = arr.join('_') // r_s0_26_u1_l1_p0
            if (!this.isHasStar) {
              if (arr[0] === 'a') {
                arr[2] = '16'
              } else if (arr[0] === 'd') {
                arr[2] = '16'
                arr[1] = 's1'
              } else if (arr[0] === 'w') {
                if (arr[1] === 's0') {
                  arr[1] = 's1'
                }
              }
              this.sendBody('0',arr)
            } else {
              this.sendBody('1', 6)
            }
            break
          case 'l1': // 切左右扫风关
            arr[4] = 'l0'
            this.currentState = arr.join('_') // r_s0_26_u0_l0_p0
            if (!this.isHasStar) {
              if (arr[0] === 'a') {
                arr[2] = '16'
              } else if (arr[0] === 'd') {
                arr[2] = '16'
                arr[1] = 's1'
              } else if (arr[0] === 'w') {
                if (arr[1] === 's0') {
                  arr[1] = 's1'
                }
              }
              this.sendBody('0',arr)
            } else {
              this.sendBody('1', 5)
            }
            break
        }
      },
      /** 温度改变 **/
      changeTemp(val) { // true 代表+ false 代表-
        console.log('changeTemp', val)
        if (!this.isOpenAirTemp) {
          this.isOpenAirTemp = true
          setTimeout(() => {
            this.isOpenAirTemp = false
            let mode = this.currentState.split('_')[0]
            if (mode === 'a' || mode === 'd') return
            if (val === '+' && this.currentTemp < 30) {
              this.currentTemp++
              let arr = this.currentState.split('_')
              arr[2] = this.currentTemp
              this.currentState = arr.join('_')
              this.sendTempPub(arr)
            } else if (val === '-' && this.currentTemp > 16) {
              this.currentTemp--
              let arr = this.currentState.split('_')
              arr[2] = this.currentTemp
              this.currentState = arr.join('_')
              this.sendTempPub(arr)
            }
          }, 500)
        }
      },
      /** 下发温度公共部分 **/
      sendTempPub (val) {
        let arr = JSON.parse(JSON.stringify(val))
        switch (arr[0]) {
          case 'h': // 当前为制热'
            this.sendBody('0', arr)
            break
          case 'w': //当前为送风
            if (arr[1] === 's0') {
              arr[1] = 's1'
            }
            this.sendBody('0', arr)
            break
          case 'd': //当前为除湿
            arr[2] = '16'
            if (arr[1] !== 's1') {
              arr[1] = 's1'
            }
            this.sendBody('0', arr)
            break
          case 'a': //当前为自动
            arr[2] = '16'
            this.sendBody('0', arr)
            break
          case 'r': //当前为制冷
            this.sendBody('0', arr)
            break
        }
      },
      /** 发送指令 **/
      sendBody(key, arr) {
        if (key === '0') {
          let objModes = {
            a: 0,
            d: 1,
            w: 2,
            h: 3,
            r: 4
          }
          let objWinds = {
            s0: 0,
            s1: 1,
            s2: 2,
            s3: 3
          }
          let objUp = {
            u0: 0,
            u1: 1
          }
          let objLf = {
            l0: 0,
            l1: 1
          }
          let body = {
            batch: {
              airKey: {
                mode: objModes[arr[0]],
                wind: objWinds[arr[1]],
                temp: +arr[2],
                up: this.isHasStar? 0 : objUp[arr[3]],
                left: this.isHasStar? 0 : objLf[arr[4]]
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        } else {
          let body = {
            batch: {
              airKey: {
                power: arr
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        }
      },
      /** 点击电源 **/
      clickSwitch () {
        if (this.isSwitch === 'on') {
          this.isSwitch = 'off'
          let body = {
            batch: {
              airKey: {
                power: 2
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          this.clickSwitchPub(body)
        } else {
          this.isSwitch = 'on'
          this.currentState = 'r_s0_26_u0_l0_p0'
          let body = {
            batch: {
              airKey: {
                left: 0,
                mode: 4,
                temp: 26,
                up: 0,
                wind: 0
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          this.clickSwitchPub(body)
        }
      },
      clickSwitchPub (body) {
        sendBodyToDev2(body, 'handleIconCallback2').then(data => {
          if (!data.errcode) {
            this.changeSwitchPub()
          }
        })
      },
      changeSwitchPub () {
        modifyDevSwitchByHid(this.rc.hid, this.isSwitch).then(data => {
          if (!data.errcode) {
            let newList = JSON.parse(JSON.stringify(this.addedDevList))
            newList = newList.map(item => {
              if (item.hid === this.rc.hid) {
                item.isSwitch = this.isSwitch
                return item
              } else {
                return item
              }
            })
            this.$store.commit('setAddedDevList', newList)
          }
        })
      },
      /** 保存状态到本地数据 **/
      saveStateToLocal () {
        window.localStorage.setItem(`ac-state__${this.rc.hid}`, this.currentState)
        // window.localStorage.setItem(`ac-switch__${this.rc.hid}`, this.isSwitch)
      },
      /** 设置延时
       * @param val 1-是延时开， 2是延时关
       * **/
      setDelayTime () {
        this.clickTimes += this.listMin[this.clickCounts] * 60
        if (this.clickTimes >= 24 * 3600) { // 延时时间最大不得超过12个小时
          this.clickTimes = 24 * 3600
        }
        this.clickCounts++
        if (this.clickTimes)
        if (this.clickCounts > 2) {
          this.clickCounts = 2
        }
        // this.clickTimes += 2 * 60
        this.currentDelayTime = this.changeTimeToStr(this.clickTimes)
        this.currentDelayTimeHour = this.changeTimeToStr2(this.clickTimes, 'h')
        this.currentDelayTimeMin = this.changeTimeToStr2(this.clickTimes, 'm')
        if (this.delayBodyTimer) {
          clearTimeout(this.delayBodyTimer)
          this.delayBodyTimer = null
        }
        if (this.delayTimer) {
          clearInterval(this.delayTimer)
          this.delayTimer = null
        }
        this.delayBodyTimer = setTimeout(() => {
          let obj = {
            id: this.currentDelay.id,
            enable: 1,
            endTime: this.changeTimeToTimestamp(this.clickTimes),
            duration: this.clickTimes,
            para: 'power',
            paraValue: '2',
            sid: 'airKey'
          }
          let body = {
            delay: {
              delay: [obj]
            }
          }
          sendBodyToDev2(body, 'setDelayCallback').then(res => {
            if (!res.errcode) {
              window.hilink.toast('2', this.$t('component.beginDelay'))
            }
          })
        }, 3000)
      },
      /** 关闭倒计时 **/
      closeDelayTime () {
        let body = {
          delay: {
            delay: [
              {
                id: this.currentDelay.id,
                enable: 0,
                endTime: 0,
                duration: 0,
                para: 'power',
                paraValue: '2',
                sid: 'airKey'
              }
            ]
          }
        }
        sendBodyToDev2(body, 'cancelDelayCallback').then(res => {
          if (!res.errcode) {
            window.hilink.toast('2', this.$t('component.cancelDelay'))
          }
        })
      },
      /** 直接发时间戳过去 **/
      changeTimeToTimestamp (sec) {
        let curTimestamp = Date.parse(new Date()) / 1000 // 当前时间戳
        return curTimestamp + sec // 将来时间戳
      },
      /** 补零方法 **/
      addZeroToBefore (num) {
        if (num < 10) {
          return '0' + num
        } else {
          return '' + num
        }
      },
      /** 将间隔时间s转化为00:00:00 **/
      changeTimeToStr (seconds) {
        let h = Math.floor(seconds / 3600)
        let min = Math.floor((seconds % 3600) / 60)
        let s = seconds % 60
        console.log(h,min,s)
        return this.addZeroToBefore(h) + ':' + this.addZeroToBefore(min)
      },
      /** 将间隔时间s转化为00:00 **/
      changeTimeToStr2 (seconds, val) {
        if (val === 'h') {
          return this.addZeroToBefore(Math.floor(seconds / 3600))
        } else {
          return this.addZeroToBefore(Math.floor((seconds % 3600) / 60))
        }
      },
      /** 一开始就运行倒计时 **/
      runDelay () {
        if (this.currentDelay.enable === 0) return
        this.clickTimes = this.currentDelay.enable ? this.currentDelay.endTime - Date.parse(new Date()) / 1000 : 0
        this.runDelayPub()
        this.delayTimer = setInterval(() => {
          this.runDelayPub()
        }, 1000)
      },
      runDelayPub () {
        this.clickTimes = this.currentDelay.endTime - Date.parse(new Date()) / 1000
        console.log('clickTimes', this.clickTimes)
        if (this.clickTimes < 0) {
          this.clearDelayTimer()
          this.clickCounts = 0
          this.clickTimes = 0
          this.currentDelayTime = ''
          this.currentDelayTimeHour = ''
          this.currentDelayTimeMin = ''
          this.isSwitch = 'off'
          this.changeSwitchPub()
        } else {
          this.currentDelayTime = this.changeTimeToStr(this.clickTimes)
          this.currentDelayTimeHour = this.changeTimeToStr2(this.clickTimes, 'h')
          this.currentDelayTimeMin = this.changeTimeToStr2(this.clickTimes, 'm')
        }
      },
      /** 消除delayTimer定时器 **/
      clearDelayTimer () {
        if (this.delayTimer) {
          clearInterval(this.delayTimer)
          this.delayTimer = null
        }
      },
      /** 消除delayBodyTimer定时器 **/
      clearDelayBodyTimer () {
        if (this.delayBodyTimer) {
          clearTimeout(this.delayBodyTimer)
          this.delayBodyTimer = null
        }
      }
    },
    beforeDestroy () {
      this.saveStateToLocal()
      this.clearDelayTimer()
      this.clearDelayBodyTimer()
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-AC
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2
    .banner
      setWH(100%, 28rem)
      setPosUseFlex(column, flex-end)
      background-size: cover!important
      position relative
      .temp-box
        setFont(8rem, rgb(26,26,26), center, 100)
        setCenterUsePosition2()
        .circle
          font-size 8rem
      .ac-icon
        width 100%
        padding 0 2.4rem 1.6rem 2.4rem
        img
          setWH(3rem, 3rem)

    .container
      flex 1
      padding 1.6rem
      setPosUseFlex(column, space-between)
      .btn-function
        width 100%
        > span
          setWH(5rem, 5rem)
          setFont(1.4rem, rgb(26,26,26), center)
          line-height 5rem
          background #fff
          border-radius 50%
      .change-temperature
        width 100%
        background #fff
        height 7.2rem
        border-radius 3.6rem
        span
          setWH(3.6rem, 3.6rem)
          line-height 3.6rem
          setBorder()
          setFont(3rem, rgb(26,26,26), center)
          border-radius 100%
          &:active
            background-color rgba(0,0,0,.1)
        .btn-reduce
          margin-left 1.6rem
        .btn-plus
          margin-right 1.6rem
        .text
          setFont($fontMiddleSize, rgb(26,26,26), center)
      .timer-switch
        width 100%
        setPosUseFlex(row, space-between)
        .left
        .middle
        .right
          height 8rem
          width 8rem
          border-radius .8rem
          font-size 1.2rem
          setPosUseFlex()
          &:active
            background-color rgba(0,0,0,.1)
        .left
        .right
          border 1px solid #fff
          p
            font-size 1.6rem
            span:nth-child(2)
              padding 0 .2rem
              animation fadeInOut 2s infinite
        .middle
          background-color: #fff;
          span
            width 3.2rem
            height 3.2rem
            background-size contain!important
</style>
