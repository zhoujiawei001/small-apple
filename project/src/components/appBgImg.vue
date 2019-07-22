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
  height 22.6rem
  imgUrl("../assets/background2.png")
  position: relative
  .app_img
    position absolute
    bottom 2rem
    left 50%
    margin-left -9rem
    width 18rem
    height 18rem
  .app_logo
    position absolute
    bottom 2.4rem
    right 2.4rem
    height 1.6rem
</style>
