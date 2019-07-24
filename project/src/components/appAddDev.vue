<template>
  <div class="appAddDev" @click="$router.push('./type')">
    <img src="../assets/add.png" alt="">
    <p>{{$t('home.add_control')}}</p>
  </div>
</template>

<script>
export default {
  name: 'appAddDev'
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appAddDev
  margin-top .8rem
  height 6.4rem
  background-color: #fff;
  border-radius 4px
  display: flex
  flex-direction column
  align-items center
  justify-content center
  img
    height 2.4rem
    width 2.4rem
  p
    font-size $fontSmallSize
    margin-top .8rem
</style>
