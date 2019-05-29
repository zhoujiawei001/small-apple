<template>
  <!--灯泡-->
  <div class="dev-light">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="banner">
      <img src="../../assets/blue/light.png" alt="light.png">
    </div>
    <div class="container">
      <div>
        <span class="switch-on">开</span>
        <span class="switch-off">关</span>
      </div>
      <div class="power-box">
        <span class="power"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device8',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电风扇',
        temperature: 25
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-light
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
      padding 6rem
      >div
        setPosUseFlexInit(row, space-between, center)
        .switch-on, .switch-off
          setWH(8rem, 8rem)
          line-height 8rem
          setFont(2rem, $fontColorTheme, center)
          border-radius 50%
        .switch-on
          background #fff
        .switch-off
          background $fontColorTheme
          color #fff
      .power-box
        justify-content center
        margin-top 2rem
        .power
          setIcon('../../assets/blue/fan-switch.png', '../../assets/white/fan-switch.png', 8rem, 4rem)
</style>
