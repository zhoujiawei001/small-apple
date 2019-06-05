<template>
  <!--电视机-->
  <div class="dev-TV">
    <appHeader2 :title="title"
                @moreSet="moreSet()"></appHeader2>
    <div class="container">
      <div class="top flex">
        <div class="tv-switch"
             @click="sendBody('power')"
             :class="{'btn-disable2': !cmdsKey.includes('power')}">
          <span class="img-box"></span>
          <span class="text">机顶盒开关</span>
        </div>
        <div class="input-choose"
             @click="sendBody('signal')"
             :class="{'btn-disable2': !cmdsKey.includes('signal')}">
          <span class="img-box"></span>
          <span class="text">输入选择</span>
        </div>
        <div class="home"
             @click="sendBody('boot')"
             :class="{'btn-disable2': !cmdsKey.includes('boot')}">
          <span class="img-box"></span>
          <span class="text">主页</span>
        </div>
      </div>
      <div class="channel-voice flex">
        <div class="channel">
          <span class="up btn"
                @click="sendBody('ch+')"
                :class="{'btn-disable2': !cmdsKey.includes('ch+')}">＋</span>
          <span class="text">频道</span>
          <span class="down btn"
                @click="sendBody('ch-')"
                :class="{'btn-disable2': !cmdsKey.includes('ch-')}">—</span>
        </div>
        <div class="function">
          <span class="quiet"
                @click="sendBody('mute')"
                :class="{'btn-disable2': !cmdsKey.includes('mute')}"></span>
          <span class="back btn"
                @click="sendBody('exit')"
                :class="{'btn-disable2': !cmdsKey.includes('exit')}">退出</span>
        </div>
        <div class="voice">
          <span class="up btn"
                @click="sendBody('vol+')"
                :class="{'btn-disable2': !cmdsKey.includes('vol+')}">＋</span>
          <span class="text">音量</span>
          <span class="down btn"
                @click="sendBody('vol+')"
                :class="{'btn-disable2': !cmdsKey.includes('vol+')}">—</span>
        </div>
      </div>
      <div class="flex function">
        <div class="left">
          <span class="menu"
                @click="sendBody('menu')"
                :class="{'btn-disable2': !cmdsKey.includes('menu')}"></span>
          <span class="back btn"
                @click="sendBody('exit')"
                :class="{'btn-disable2': !cmdsKey.includes('exit')}">退出</span>
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
          <span class="return"
                @click="sendBody('back')"
                :class="{'btn-disable2': !cmdsKey.includes('back')}"></span>
        </div>
      </div>
      <div class="tel-number">
        <span class="item btn"
              v-for="(item, idx) of telNumber"
              :key="item"
              :class="{'btn-disable2': !cmdsKey.includes(item+'')}"
              @click="sendBody(item)">{{item}}</span>
        <span class="item btn"
              :class="{'btn-disable2': !cmdsKey.includes('-/--')}"
              @click="sendBody('-/--')">-/--</span>
        <span class="item btn"
              :class="{'btn-disable2': !cmdsKey.includes('1')}"
              @click="sendBody('1')">0</span>
        <span class="item btn"
              :class="{'btn-disable2': !cmdsKey.includes('#')}"
              @click="sendBody('#')">#</span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device2',
    mixins: [viewsMixin],
    components: {
      appHeader2,
    },
    data () {
      return {
        telNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        tempCmds: {
          '0': 1,
          '1': 2,
          '2': 3,
          '3': 4,
          '4': 5,
          '5': 6,
          '6': 7,
          '7': 8,
          '8': 9,
          '9': 10,
          '#': 11,
          '*': 12,
          'back': 13,
          'boot': 14,
          'ch+': 15,
          'ch-': 16,
          'down': 17,
          'exit': 18,
          'left': 19,
          'menu': 20,
          'mute': 21,
          'ok': 22,
          'power': 23,
          'right': 24,
          'up': 25,
          'vol+': 26,
          'vol-': 27,
          'signal': 28,
          'next': 29,
          'tv/radio': 30,
          'screenshot': 31,
          'green': 32,
          'guide': 33,
          'help': 34,
          'info': 35,
          'itv': 36,
          'vv': 37,
          'yellow': 38,
          'search': 39,
          'stop': 40,
          'previous': 41,
          'rec': 42,
          'red': 43,
          'rew': 44,
          'pause': 45,
          'play': 46,
          'blue': 47,
          'epg': 48,
          'ff': 49
        }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-TV
    background #F2F2F2
    setPosUseFlexInit(column)
    setWH()

    .container
      flex 1
      margin-top 6.8rem
      overflow auto

    .top
      padding 1rem 2rem

      .tv-switch
        width 33%
        setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')

      .input-choose
        width 33%
        setBgImgAndText('../../assets/blue/stb-choose.png', '../../assets/white/stb-choose.png')

      .home
        width 33%
        setBgImgAndText('../../assets/blue/home.png', '../../assets/white/home.png')

    .channel-voice
      padding 1rem 6rem

      .channel, .voice
        setWH(5rem, 15rem)
        background #ffffff
        border-radius 2.5rem
        setPosUseFlex(column, space-between)

        .text
          setFont(1.5rem, $fontColorTheme, center)

        .up, .down
          border-radius 50%
          setWH(5rem, 5rem)
          line-height 5rem
          setFont(3rem, $fontColorTheme, center)

      .function
        setWH(5rem, 15rem)
        setPosUseFlex(column, space-between)

        .quiet
          setIcon('../../assets/blue/quiet.png', '../../assets/white/quiet.png')

        .back
          setWH(4rem, 4rem)
          line-height 4rem

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

        .menu
          setIcon('../../assets/blue/menu.png', '../../assets/white/menu.png')

        .back
          setWH(4rem, 4rem)
          line-height 4rem
          text-align center

      .right
        setWH(5rem, 18rem)
        setPosUseFlex(column, space-between)

        .return
          setIcon('../../assets/blue/return.png', '../../assets/white/return.png')

    .tel-number
      padding 1rem 6rem
      setPosUseFlexInit(row, space-between, center, wrap)

      .item
        setFont(2.5rem, $fontColorTheme, center)
        margin-bottom 1rem
        setWH(6.5rem, 6.5rem)
        line-height 6.5rem
        border-radius 50%
</style>
