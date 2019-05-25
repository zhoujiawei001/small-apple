<template>
  <div class="appDevItem">
    <div class="left">
      <img src="../assets/air_conditioner.png" alt="">
      <div class="info">
        <span>大金空调</span>
        <p>开启(默认房间)</p>
      </div>
    </div>
    <img class="right" src="../assets/switch_on.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'appDevItem'
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appDevItem
  height 7.2rem
  margin-top 1.2rem
  display flex
  justify-content space-between
  align-items center
  background-color: #fff
  border-radius 4px
  padding 0 1.6rem
  .left
    width 60%
    display flex
    justify-content space-between
    align-items: center
    img
      width 42%
    .info
      span
        font-size 1.4rem
      p
        margin-top .4rem
        font-size 1.2rem
        color $fontColorTheme
  .right
    width 5.4rem
</style>
