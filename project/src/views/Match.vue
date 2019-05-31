<template>
  <div class="dev-match">
    <appHeader
      title="逐个匹配"
      :hiddenMore="true"></appHeader>
    <div class="mt-section_1">
      <div class="icon-text">
        <img src="../assets/devIcon/1.png" alt="">
        <p class="text">同州 Coship 电视机顶盒</p>
      </div>
      <div class="dec">
        <p>匹配前，请将机顶盒电源打开</p>
        <p>如果电视上出现音量调整图标</p>
        <p>表示匹配成功， 点击 “下一步”</p>
      </div>
    </div>
    <div class="mt-section_2">
      <div class="container">
        <span class="number">1/27</span>
        <div class="btn-plus">
          <img src="../assets/match_plus.png" alt="">
        </div>
        <div class="btn-reduce">
          <img src="../assets/match_reduce.png" alt="">
        </div>
        <div class="text">
          正在匹配请勿离开
        </div>
        <div class="btn-next">
          下一步
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
export default {
  name: 'Match',
  components: {
    appHeader
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.dev-match
  width 100%
  height 100%
  .mt-section_1
    width 100%
    height 22.8rem
    imgUrl("../assets/background.png")
    position relative
    font-size 1.2rem
    .icon-text
      position absolute
      top 45%
      left 50%
      transform translate(-50%,-50%)
      display: flex
      justify-content: center
      align-items center
      flex-direction column
      img
        width 5rem
      .text
        color $fontColorTheme
    .dec
      width 100%
      position absolute
      bottom 1.6rem
      left 50%
      transform translateX(-50%)
      display: flex
      justify-content: center
      align-items center
      flex-direction column
      p:nth-child(2)
        padding .3rem 0
  .mt-section_2
    height calc(100% - 22.8rem)
    background-color: $bgColorTheme;
    position relative
    .container
      display flex
      align-items center
      flex-direction column
      color $fontColorTheme
      font-size 1.2rem
      setCenterUsePosition2()
      .number
        font-size 3.2rem
      .btn-reduce
      .btn-plus
        width 10.2rem
        height 8.4rem
        background-color: #fff;
        border-radius 1.2rem
        position relative
        img
          setCenterUsePosition2()
          width 5.4rem
      .btn-plus
        margin 2.2rem 0
      .text
        margin 2.4rem 0
        color $fontColorTheme
        font-weight bold
      .btn-next
        width 10.2rem
        height 3.6rem
        border-radius 2rem
        line-height 3.6rem
        text-align center
        background-color: #fff;
</style>
