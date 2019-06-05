<template>
  <!--电视盒子-->
  <div class="dev-box">
    <appHeader2 :title="title" @moreSet="moreSet()"></appHeader2>
    <div class="container">
      <div class="top flex">
        <div class="stb-switch"
             @click="sendBody('power')"
             :class="{'btn-disable2': !cmdsKey.includes('power')}">
          <span class="img-box"></span>
          <span class="text">机顶盒开关</span>
        </div>
        <div class="tv-switch btn-disable2">
          <span class="img-box"></span>
          <span class="text">电视机开关</span>
        </div>
        <div class="input-choose btn-disable2">
          <span class="img-box"></span>
          <span class="text">输入选择</span>
        </div>
      </div>
      <div class="volume">
        <div class="box">
        <span class="add btn"
              @click="sendBody('vol+')"
              :class="{'btn-disable2': !cmdsKey.includes('vol+')}">＋</span>
          <span class="text">音量</span>
          <span class="sub btn"
                @click="sendBody('vol-')"
                :class="{'btn-disable2': !cmdsKey.includes('vol-')}">—</span>
        </div>
      </div>
      <div class="flex function">
        <div class="left">
        <span class="home"
              @click="sendBody('boot')"
              :class="{'btn-disable2': !cmdsKey.includes('boot')}"></span>
          <span class="menu btn"
                @click="sendBody('menu')"
                :class="{'btn-disable2': !cmdsKey.includes('menu')}"></span>
        </div>
        <div class="mid">
          <div class="ok border-1px btn"
               @click="sendBody('ok')"
               :class="{'btn-disable2': !cmdsKey.includes('ok')}">OK
          </div>
          <span class="top-circle btn"
                @click="sendBody('up')"
                :class="{'btn-disable2': !cmdsKey.includes('up')}">○</span>
          <span class="bottom-circle btn"
                @click="sendBody('down')"
                :class="{'btn-disable2': !cmdsKey.includes('down')}">○</span>
          <span class="left-circle btn"
                @click="sendBody('left')"
                :class="{'btn-disable2': !cmdsKey.includes('left')}">○</span>
          <span class="right-circle btn"
                @click="sendBody('right')"
                :class="{'btn-disable2': !cmdsKey.includes('right')}">○</span>
        </div>
        <div class="right">
        <span class="quiet"
              @click="sendBody('mute')"
              :class="{'btn-disable2': !cmdsKey.includes('mute')}"></span>
          <span class="return"
                @click="sendBody('back')"
                :class="{'btn-disable2': !cmdsKey.includes('back')}"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device10',
    mixins: [viewsMixin],
    components: {
      appHeader2,
    },
    data () {
      return {
        tempCmds: {
          'back': 1,
          'boot': 2,
          'down': 3,
          'left': 4,
          'menu': 5,
          'ok': 6,
          'power': 7,
          'right': 8,
          'up': 9,
          'vol+': 10,
          'vol-': 11,
          'mute': 12
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-box
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2

    .container
      flex 1
      margin-top 6.8rem
      overflow auto

    .top
      padding 1rem 2rem

      .stb-switch, .tv-switch
        width 33%
        setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')

      .input-choose
        width 33%
        setBgImgAndText('../../assets/blue/stb-choose.png', '../../assets/white/stb-choose.png')

    .function
      padding 1rem 2rem

      .mid
        position relative
        setPosUseFlex()
        setWH(18rem, 18rem)
        background #ffffff
        border-radius 50%

        > span
          position absolute
          display inline-block
          setWH(5rem, 5rem)
          line-height 5rem
          setFont(1rem, $fontColorTheme, center, 800)
          border-radius 50%

          &.top-circle
            top 0

          &.left-circle
            left 0

          &.right-circle
            right 0

          &.bottom-circle
            bottom 0

        .ok
          setWH(8rem, 8rem)
          setFont(3rem, $fontColorTheme, center, 300)
          line-height 8rem
          border-radius 50%

      .left
        setWH(5rem, 18rem)
        setPosUseFlex(column, space-between)

        .home
          setIcon('../../assets/blue/home.png', '../../assets/white/home.png')

        .menu
          setIcon('../../assets/blue/menu.png', '../../assets/white/menu.png')

      .right
        setWH(5rem, 18rem)
        setPosUseFlex(column, space-between)

        .return
          setIcon('../../assets/blue/return.png', '../../assets/white/return.png')

        .quiet
          setIcon('../../assets/blue/quiet.png', '../../assets/white/quiet.png')

    .volume
      margin-bottom 1rem
      setPosUseFlexInit(row, center)

      .box
        setPosUseFlex(column, space-between)
        setWH(5rem, 12rem)
        background #fff
        border-radius 3rem

        .text
          setFont(1rem, $fontColorTheme, center)

        .add, .sub
          border-radius 50%
          setWH(5rem, 5rem)
          line-height 5rem
          setFont(3rem, $fontColorTheme, center)
</style>
