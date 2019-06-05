<template>
  <!--风扇-->
  <div class="dev-fan">
    <appHeader2 :title="title" @moreSet="moreSet()"></appHeader2>
    <div class="banner">
      <img src="../../assets/blue/fan.png" alt="fan.png">
    </div>
    <div class="container">
      <div class="btn-fun flex">
        <span class="shaking-head btn"
              @click="sendBody('oscillation')"
              :class="{'btn-disable2': !cmdsKey.includes('oscillation')}">摇头</span>
        <span class="wind-kind btn"
              @click="sendBody('mode')"
              :class="{'btn-disable2': !cmdsKey.includes('mode')}">风类</span>
        <span class="timer btn"
              @click="sendBody('timer')"
              :class="{'btn-disable2': !cmdsKey.includes('timer')}">定时</span>
      </div>
      <div class="power flex">
        <div class="fan-switch"
             @click="sendBody('power')"
             :class="{'btn-disable2': !cmdsKey.includes('power')}">
          <span class="img-box"></span>
          <span class="text">电源</span>
        </div>
        <div class="fan-wind-speed"
             @click="sendBody('fanspeed')"
             :class="{'btn-disable2': !cmdsKey.includes('fanspeed')}">
          <span class="img-box"></span>
          <span class="text">风速</span>
        </div>
      </div>
      <div class="extend flex">
        <span class="btn btn-disable2"
              v-for="(item, idx) in extendsList"
              :key="item"
              @click="onclickExtendBtn(idx)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device6',
    mixins: [viewsMixin],
    components: {
      appHeader2,
    },
    data () {
      return {
        extendsList: ['睡眠', '灯光', '负离子'],
        tempCmds: {
          "fanspeed": 1,
          "mode": 2,
          "mute": 3,
          "oscillation": 4,
          "power": 5,
          "poweroff": 6,
          "timer": 7
        }
      }
    },
    methods: {
      onclickExtendBtn(idx) {
        console.log(idx)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-fan
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2
    .banner
      setWH(100%, 28rem)
      setPosUseFlex()
      imgUrl("../../assets/background.png")
      img
        setWH(10rem, 10rem)
        transform translateY(3rem)
    .container
      flex 1
      .btn-fun
        padding 2rem 4rem
        >span
          setWH(5rem, 5rem)
          setFont(1.4rem, $fontColorTheme, center)
          line-height 5rem
          background #fff
          border-radius 50%
      .extend
        padding 2rem 4rem
        flex-wrap wrap
        >span
          setWH(28%, 4rem)
          setFont(1.4rem, $fontColorTheme, center)
          margin-bottom 1rem
          line-height 4rem
          background #fff
          border-radius 2rem
      .power
        padding 2rem 5rem
        .fan-switch
          setPosUseFlex()
          background #fff
          setFont(1.3rem, $fontColorTheme, center)
          padding 2rem 2rem 1rem 2rem
          border-radius 1rem
          .img-box
            setWH(3rem, 3rem)
            imgUrl('../../assets/blue/fan-switch.png')
          &:active
            color #ffffff
            background-color $fontColorTheme
            .img-box
              imgUrl('../../assets/white/fan-switch.png')
      .fan-wind-speed
        setPosUseFlex()
        background #fff
        setFont(1.3rem, $fontColorTheme, center)
        padding 2rem 2rem 1rem 2rem
        border-radius 1rem
        .img-box
          setWH(3rem, 3rem)
          imgUrl('../../assets/blue/fan.png')
        &:active
          color #ffffff
          background-color $fontColorTheme
          .img-box
            imgUrl('../../assets/white/fan.png')
</style>
