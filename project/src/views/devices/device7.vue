<template>
  <!--空调-->
  <div class="dev-AC">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="banner">
      <div class="temperature">
        {{temperature}}<span class="circle">°</span><span style="font-size: 7rem">c</span>
      </div>
      <div class="ac-icon flex">
        <span class="cold"></span>
        <span class="auto"></span>
        <span class="up-down"></span>
        <span class="left-right"></span>
      </div>
    </div>
    <div class="container">
      <div class="btn-function flex">
        <span class="btn">模式</span>
        <span class="btn">风量</span>
        <span class="btn">上下</span>
        <span class="btn">左右</span>
      </div>
      <div class="change-temperature flex">
        <span class="btn">—</span>
        <div class="text">温度</div>
        <span class="btn">＋</span>
      </div>
      <div class="timer-switch flex">
        <div class="timer-on">
          <span class="text">定时开机</span>
          <span class="detail">01:30</span>
        </div>
        <div class="ac-switch">
          <span class="img-box"></span>
          <span class="text">电源</span>
        </div>
        <div class="timer">
          <span class="text">开机时长</span>
          <span class="detail">01:30</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'
  import { sendBodyToDev } from '../../utils/pub'
  export default {
    name: 'device7',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '美的空调',
        temperature: 25,
        currentState: 'r_s0_26_u1_l1_p0' // 制冷_风量自动_26度_上下扫风开_左右扫风开_睡眠关
      }
    },
    methods: {
      /** 改变模式 **/
      changeMode () {
        let arr = this.currentState.split('_')
        switch (arr[0]) {
          case 'r': // 切自动
            arr[0] = 'a'
            this.currentState = arr.join('_') // a_s0_26_u1_l1_p0
            arr[2] = '16' // arr: [a, s0, 16, u1, l1, p0] 自动下无温度
            this.sendBody(arr)
            break
          case 'a': // 切除湿
            arr[0] = 'd'
            arr[1] = 's1' // 除湿模式风速挡只能位1挡
            this.currentState = arr.join('_') // d_s1_26_u1_l1_p0
            arr[2] = '16' // 除湿下无温度
            this.sendBody(arr)
            break
          case 'd': // 切送风
            arr[0] = 'w'
            if (arr[1] === 's0') {
              arr[1] = 's1'
            }
            this.currentState = arr.join('_')
            this.sendBody(arr)
        }
      },
      /** 发送指令 **/
      sendBody (arr) {
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
              up: objUp[arr[3]],
              left: objLf[arr[4]]
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
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-AC
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2
    .header
      position fixed
      top 0
      width 100%
    .banner
      setWH(100%, 22.8rem)
      setPosUseFlex(column, flex-end)
      background aliceblue
      .temperature
        setFont(8rem, $fontColorTheme, center, 100)
        .circle
          font-size 8rem
      .ac-icon
        width 100%
        padding 2rem
        span
          setWH(3rem, 3rem)
          &.cold
            imgUrl('../../assets/mode-cold.png')
          &.auto
            imgUrl('../../assets/mode-auto.png')
          &.up-down
            imgUrl('../../assets/dir-top-bottom.png')
          &.left-right
            imgUrl('../../assets/dir-left-right.png')
    .container
      flex 1
      .btn-function
        padding 2rem
        >span
          setWH(5rem, 5rem)
          setFont(1.4rem, $fontColorTheme, center)
          line-height 5rem
          background #fff
          border-radius 50%
      .change-temperature
        margin 2rem
        padding 0 2rem
        background #fff
        height 6rem
        border-radius 3rem
        span
          setWH(3rem, 3rem)
          line-height 3rem
          setBorder()
          setFont(2rem, $fontColorTheme, center)
        .text
          setFont(1.2rem, $fontColorTheme, center)
      .timer-switch
        padding 1rem 2rem
        .ac-switch
          setPosUseFlex()
          background #fff
          setFont(1.3rem, $fontColorTheme, center)
          padding 1rem 2rem
          border-radius 1rem
          .img-box
            setWH(3rem, 3rem)
            imgUrl('../../assets/blue/fan-switch.png')
          &:active
            color #ffffff
            background-color $fontColorTheme
            .img-box
              imgUrl('../../assets/white/fan-switch.png')
        .timer-on, .timer
          color $fontColorTheme
          setPosUseFlex()
          setWH(7rem, 7rem)
          border-radius 1rem
          setBorder(#fff)
          .detail
            font-size 1.7rem
</style>
