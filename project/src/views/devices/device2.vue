<template>
  <!--电视机-->
  <div class="dev-TV">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="top flex">
      <div class="tv-switch">
        <span class="img-box"></span>
        <span class="text">机顶盒开关</span>
      </div>
      <div class="input-choose">
        <span class="img-box"></span>
        <span class="text">输入选择</span>
      </div>
      <div class="home">
        <span class="img-box"></span>
        <span class="text">主页</span>
      </div>
    </div>
    <div class="channel-voice flex">
      <div class="channel">
        <span class="up btn">+</span>
        <span class="text">频道</span>
        <span class="down btn">-</span>
      </div>
      <div class="function">
        <span class="quiet"></span>
        <span class="back btn">退出</span>
      </div>
      <div class="voice">
        <span class="up btn">+</span>
        <span class="text">音量</span>
        <span class="down btn">-</span>
      </div>
    </div>
    <div class="flex function">
      <div class="left">
        <span class="menu"></span>
        <span class="back btn">退出</span>
      </div>
      <div class="mid">
        <div class="ok border-1px btn">ok</div>
        <span class="top-circle btn">○</span>
        <span class="bottom-circle btn">○</span>
        <span class="left-circle btn">○</span>
        <span class="right-circle btn">○</span>
      </div>
      <div class="right">
        <span class="return"></span>
      </div>
    </div>
    <div class="tel-number">
      <span class="item btn" v-for="(item, idx) of telNumber" @click="onClickTel(idx)">{{item}}</span>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device2',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电视机',
        telNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    methods: {
      backTo() {
        console.log('back')
      },
      moreSet() {
        console.log('set')
      },
      onClickTel(idx) {
        const num = idx + 1
        console.log(num)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-TV
    background #F2F2F2
    .top
      padding 1rem 2rem
      .tv-switch, .input-choose, .home
        setBgImgAndText('../../assets/home.png', '../../assets/back.png')
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
          setIcon('../../assets/quiet.png', '../../assets/home.png')
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
          setFont(4rem, $fontColorTheme, center)
          line-height 8rem
          border-radius 50%
      .left
        setWH(5rem, 18rem)
        setPosUseFlex(column, space-between)
        .menu
          setIcon('../../assets/menu.png', '../../assets/menu.png')
        .back
          setWH(4rem, 4rem)
          line-height 4rem
          text-align center
      .right
        setWH(5rem, 18rem)
        setPosUseFlex(column, space-between)
        .return
          setIcon('../../assets/return.png', '../../assets/return.png')

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
