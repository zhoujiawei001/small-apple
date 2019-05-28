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

  export default {
    name: 'device7',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电风扇',
        temperature: 25
      }
    },
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
            imgUrl('../../assets/fan-switch-off.png')
          &:active
            color #ffffff
            background-color $fontColorTheme
            .img-box
              imgUrl('../../assets/fan-switch-off.png')
        .timer-on, .timer
          color $fontColorTheme
          setPosUseFlex()
          setWH(7rem, 7rem)
          border-radius 1rem
          setBorder(#fff)
          .detail
            font-size 1.7rem
</style>
