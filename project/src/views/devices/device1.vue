<template>
  <!--机顶盒-->
  <div class="dev-STB">
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
          <span class="home"
                @click="sendBody('boot')"
                :class="{'btn-disable2': !cmdsKey.includes('boot')}"></span>
        </div>
        <div class="voice">
        <span class="up btn"
              @click="sendBody('vol+')"
              :class="{'btn-disable2': !cmdsKey.includes('vol+')}">＋</span>
          <span class="text">音量</span>
          <span class="down btn"
                @click="sendBody('vol-')"
                :class="{'btn-disable2': !cmdsKey.includes('vol-')}">—</span>
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
               :class="{'btn-disable2': !cmdsKey.includes('ok')}">OK</div>
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
      <div class="btn-forward-back-off flex">
      <span class="back-off"
            @click="sendBody('rew')"
            :class="{'btn-disable2': !cmdsKey.includes('rew')}"></span>
        <span class="pause"
              @click="sendBody('pause')"
              :class="{'btn-disable2': !cmdsKey.includes('pause')}"></span>
        <span class="forward"
              @click="sendBody('ff')"
              :class="{'btn-disable2': !cmdsKey.includes('ff')}"></span>
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
    name: 'device1',
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
          'pause': 23,
          'play': 24,
          'power': 25,
          'right': 26,
          'stop': 27,
          'up': 28,
          'vol+': 29,
          'vol-': 30,
          'blue': 31,
          'vv': 32,
          'yellow': 33,
          'epg': 34,
          'ff': 35,
          'green': 36,
          'guide': 37,
          'help': 38,
          'info': 39,
          'itv': 40,
          'next': 41,
          'previous': 42,
          'rec': 43,
          'red': 44,
          'rew': 45,
          'search': 46
        }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-STB
    background #F2F2F2
    setPosUseFlexInit(column)
    setWH()
    .header
      position fixed
      width 100%
    .container
      flex 1
      margin-top 6.8rem
      overflow auto
    .top
      padding 1rem 2rem
      .stb-switch, .tv-switch
        setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')
      .input-choose
        setBgImgAndText('../../assets/blue/stb-choose.png', '../../assets/white/stb-choose.png')
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
        .home
          setIcon('../../assets/blue/home.png', '../../assets/white/home.png')

    .function
      padding 1rem 2rem
      .mid
        position relative
        setPosUseFlex()
        setWH(18rem, 18rem)
        background #ffffff
        border-radius 50%
        >span
          position absolute
          display inline-block
          setWH(5rem, 5rem)
          line-height 5rem
          setFont(2rem, $fontColorTheme, center)
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
          setFont(3rem, $fontColorTheme, center)
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

    .btn-forward-back-off
      padding 1rem 2rem
      .forward
        setIcon('../../assets/blue/forward.png', '../../assets/white/forward.png', 5rem)
      .pause
        setIcon('../../assets/blue/pause.png', '../../assets/white/pause.png')
        setWH(12rem, 4rem)
        border-radius 2.5rem
      .back-off
        setIcon('../../assets/blue/back-off.png', '../../assets/white/back-off.png', 5rem)
    .tel-number
      padding 1rem 6rem
      setPosUseFlexInit(row, space-between, center, wrap)
      .item
        setFont(1.5rem, $fontColorTheme, center)
        margin-bottom 1rem
        setWH(30%, 4rem)
        line-height 4rem
        border-radius 2.5rem
</style>
