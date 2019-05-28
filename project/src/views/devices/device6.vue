<template>
  <!--风扇-->
  <div class="dev-fan">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="banner">
      <img src="../../assets/fan.png" alt="fan.png">
    </div>
    <div class="container">
      <div class="btn-fun flex">
        <span class="shaking-head btn">摇头</span>
        <span class="wind-kind btn">风类</span>
        <span class="timer btn">定时</span>
      </div>
      <div class="power flex">
        <div class="fan-switch">
          <span class="img-box"></span>
          <span class="text">电源</span>
        </div>
        <div class="fan-wind-speed">
          <span class="img-box"></span>
          <span class="text">风速</span>
        </div>
      </div>
      <div class="extend flex">
        <span class="btn"
              v-for="(item, idx) in extendsList"
              @click="onclickExtendBtn(idx)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device6',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电风扇',
        extendsList: ['睡眠', '灯光', '负离子','睡眠', '灯光', '负离子']
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
    .header
      position fixed
      top 0
      width 100%
    .banner
      setWH(100%, 22.8rem)
      setPosUseFlex()
      img
        setWH(8rem, 8rem)
        transform translateY(3rem)
    .container
      flex 1
      .btn-fun
        padding 2rem 3rem
        >span
          setWH(5rem, 5rem)
          setFont(1.4rem, $fontColorTheme, center)
          line-height 5rem
          background #fff
          border-radius 50%
      .extend
        padding 2rem 3rem
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
            imgUrl('../../assets/fan-switch-off.png')
          &:active
            color #ffffff
            background-color $fontColorTheme
            .img-box
              imgUrl('../../assets/fan-switch-off.png')
      .fan-wind-speed
        setPosUseFlex()
        background #fff
        setFont(1.3rem, $fontColorTheme, center)
        padding 2rem 2rem 1rem 2rem
        border-radius 1rem
        .img-box
          setWH(3rem, 3rem)
          imgUrl('../../assets/fan.png')
        &:active
          color #ffffff
          background-color $fontColorTheme
          .img-box
            imgUrl('../../assets/fan.png')
</style>
