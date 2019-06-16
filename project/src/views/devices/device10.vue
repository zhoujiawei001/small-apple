<template>
  <!--电视盒子-->
  <div class="dev-box">
    <appHeader
      :title="title"
      @back-icon="$router.go(-1)"
      @set="moreSet"></appHeader>
    <div class="container" :style="styObjCont">
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
      <!-- 额外功能 -->
      <div class="extend-fn">
        <div class="left">
          <span>延时开机</span>
          <p>01:30</p>
        </div>
        <div class="right">
          <span>开机时长</span>
          <p>01:30</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device10',
    mixins: [viewsMixin],
    components: {
      appHeader,
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
        padding 1rem 0

        .stb-switch, .tv-switch
          width calc(100%/3)
          setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')

        .input-choose
          width calc(100%/3)
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
            setFont(1.2rem, $fontColorTheme2, center, 800)
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
            setWH(7rem, 7rem)
            setFont(2rem, $fontColorTheme2, center, 300)
            line-height 7rem
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
          setWH(5.6rem, 15rem)
          background #fff
          border-radius 3rem

          .text
            setFont(1.3rem, $fontColorTheme2, center)

          .add, .sub
            border-radius 50%
            setWH(5.6rem, 5.6rem)
            line-height 5.6rem
            setFont(2.6rem, $fontColorTheme2, center)
      .extend-fn
        setPosUseFlex(row, space-between)
        padding 3.2rem 6rem
        .left
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
</style>
