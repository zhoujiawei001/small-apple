<template>
  <!--灯泡-->
  <div class="dev-light">
    <appHeader2 :title="title" @moreSet="moreSet()"></appHeader2>
    <div class="banner">
      <img src="../../assets/blue/light.png" alt="light.png">
    </div>
    <div class="container">
      <div>
        <span class="switch-on btn"
              @click="sendBody('power')"
              :class="{'btn-disable2': !cmdsKey.includes('power')}">开</span>
        <span class="switch-off btn"
              @click="sendBody('poweroff')"
              :class="{'btn-disable2': !cmdsKey.includes('poweroff')}">关</span>
      </div>
      <div class="power-box">
        <span class="power"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device8',
    mixins: [viewsMixin],
    components: {
      appHeader2,
    },
    data () {
      return {
        tempCmds: {
          'power': 1,
          'poweroff': 2
        }
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

    .banner
      setWH(100%, 28rem)
      setPosUseFlex()
      imgUrl("../../assets/background.png")

      img
        setWH(10rem, 10rem)
        transform translateY(3rem)

    .container
      flex 1
      padding 6rem

      > div
        setPosUseFlexInit(row, space-between, center)

        .switch-on, .switch-off
          background #fff
          setWH(8rem, 8rem)
          line-height 8rem
          setFont(2rem, $fontColorTheme, center)
          border-radius 50%

      .power-box
        justify-content center
        margin-top 2rem
        border-radius 50%

        .power
          setIcon('../../assets/blue/fan-switch.png', '../../assets/white/fan-switch.png', 8rem, 4rem)
</style>
