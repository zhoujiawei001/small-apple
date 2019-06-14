<template>
  <!--空调-->
  <div class="dev-AC">
    <appHeader
      :title="title"
      @back-icon="$router.go(-1)"
      @set="moreSet"></appHeader>
    <div class="banner">
      <div class="temp-box">
        {{currentTemp}}<span class="circle">°</span><span style="font-size: 7rem">c</span>
      </div>
      <div class="ac-icon flex">
        <img :src="imgMode">
        <img :src="imgWind">
        <img :src="imgUpDown">
        <img :src="imgLeftRight">
      </div>
    </div>
    <div class="container">
      <div class="btn-function flex">
        <span class="btn" @click="changeMode">模式</span>
        <span class="btn" @click="changeWind">风量</span>
        <span class="btn" @click="changeUpDown">上下</span>
        <span class="btn" @click="changeLeftRight">左右</span>
      </div>
      <div class="change-temperature flex">
        <span class="btn-reduce" @click="changeTemp('-')">—</span>
        <div class="text">温度</div>
        <span class="btn-plus" @click="changeTemp('+')">＋</span>
      </div>
      <div class="timer-switch flex">
        <div class="left">
          <span class="text">定时开机</span>
          <p class="detail">01:30</p>
        </div>
        <div class="middle" @click="clickSwitch">
          <img src="../../assets/fan-switch-off.png" alt="">
          <p class="text">电源</p>
        </div>
        <div class="right">
          <span class="text">开机时长</span>
          <p class="detail">01:30</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import {sendBodyToDev} from '../../utils/pub'
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'device7',
    components: {
      appHeader
    },
    data() {
      return {
        switch: 'on',
        rc: JSON.parse(this.$route.query.rc),
        currentTemp: 26,
        currentState: 'r_s0_26_u1_l1_p0', // 制冷_风量自动_26度_上下扫风开_左右扫风开_睡眠关
        isHasStar: false, // 判断码库是否包含星星
        isOpenAirTemp: false,
        cmdskeys: [] // 码库Key键集合
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
    },
    computed: {
      ...mapState(['addedDevList', 'cmdList']),
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
      }
    },
    methods: {
      ...mapActions(['getDevCodeLibAndInfo']),
      /** 页面跳转 **/
      moreSet () {
        this.$router.push({
          path: '/setting',
          query: {
            name: this.title,
            hid: this.rc.hid,
            devId: this.rc.devId
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
        if (this.switch === 'on') {
          this.switch = 'off'
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
          sendBodyToDev(body)
        } else {
          this.switch = 'on'
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
          sendBodyToDev(body)
        }
      }
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
      imgUrl("../../assets/background.png")
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
        height 6rem
        border-radius 3rem
        span
          setWH(3rem, 3rem)
          line-height 3rem
          setBorder()
          setFont(2rem, rgb(26,26,26), center)
          border-radius 100%
          &:active
            background-color rgba(0,0,0,.1)
        .btn-reduce
          margin-left 1.6rem
        .btn-plus
          margin-right 1.6rem
        .text
          setFont(1.2rem, rgb(26,26,26), center)
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
        .middle
          background-color: #fff;
          img
            width 3.2rem
</style>
