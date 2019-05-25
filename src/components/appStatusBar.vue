<template>
  <div class="appStatusBar">
    <div class="left">
      <span>夜灯开启</span>
      <p>遥控大师小苹果</p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'appStatusBar'
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .appStatusBar
    height 7.6rem
    padding 0 1.6rem
    imgUrl('../assets/appStatus_on.png')
    display: flex
    justify-content: space-between;
    align-items: center
    .right
      width 5.4rem
      height 5.4rem
      imgUrl2('../assets/switch.png')
    .left
      color #fff
      letter-spacing: 1px
      span
        font-size 1.4rem
      p
        font-size 1.2rem
        margin-top .4rem
</style>
