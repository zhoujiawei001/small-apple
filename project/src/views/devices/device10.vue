<template>
  <!--电视盒子-->
  <div class="dev-box">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="top flex">
      <div class="stb-switch">
        <span class="img-box"></span>
        <span class="text">机顶盒开关</span>
      </div>
      <div class="tv-switch">
        <span class="img-box"></span>
        <span class="text">电视机开关</span>
      </div>
      <div class="input-choose">
        <span class="img-box"></span>
        <span class="text">输入选择</span>
      </div>
    </div>
    <div class="volume">
      <div class="box">
        <span class="add btn">＋</span>
        <span class="text">音量</span>
        <span class="sub btn">—</span>
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
        <span class="quiet"></span>
        <span class="return"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device10',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电视机顶盒'
      }
    },
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-box
    setWH()
    background #F2F2F2
    .top
      padding 1rem 2rem
      .stb-switch, .tv-switch
        setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')
      .input-choose
        setBgImgAndText('../../assets/blue/stb-choose.png', '../../assets/white/stb-choose.png')
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
          setIcon('../../assets/blue/home.png', '../../assets/white/home.png')
        .back
          setWH(4rem, 4rem)
          line-height 4rem
          text-align center
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
