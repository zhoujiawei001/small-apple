<template>
  <div class="appBgImg">
    <img class="app_img" :src="imgUrl" alt="">
    <img class="app_logo" src="../assets/logo.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'appBgImg',
  props: ['imgUrl']
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appBgImg
  width 100%
  height 24rem
  imgUrl("../assets/background.png")
  position: relative
  .app_img
    position absolute
    top 50%
    left 50%
    margin-left -6.4rem
    margin-top -5rem
    width 12.8rem
    height 12.8rem
  .app_logo
    position absolute
    bottom 2.4rem
    right 2.4rem
    width 10rem
</style>
