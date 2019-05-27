<template>
  <div class="dev-STB">
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
    <div class="channel-voice flex">
      <div class="channel">
        <span class="up btn">+</span>
        <span class="text">频道</span>
        <span class="down btn">-</span>
      </div>
      <div class="function">
        <span class="quiet"></span>
        <span class="home"></span>
      </div>
      <div class="voice">
        <span class="up btn">+</span>
        <span class="text">音量</span>
        <span class="down btn">-</span>
      </div>
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device1',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电视机顶盒'
      }
    },
    methods: {
      backTo() {
        console.log('back')
      },
      moreSet() {
        console.log('set')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-STB
    setWH()
    background #F2F2F2
    .top
      padding 1rem 2rem
      .stb-switch, .tv-switch, .input-choose
        setBgImgAndText('../../assets/switch_off.png', '../../assets/back.png')
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

</style>
