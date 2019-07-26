<template>
  <div class="loading2">
    <div class="container">
      <img src="../assets/loading3.png" alt="">
      <p>{{$t('pub.match_now')}}</p>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: 'appLoading2'
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .loading2
    position fixed
    setWH()
    top 0
    left 0
    z-index 9
    .container
      position absolute
      padding 1.6rem
      top 50%
      left 50%
      z-index: 9
      transform translate(-50%, -50%)
      background-color: #fff;
      display: flex
      flex-direction column
      align-items center
      border-radius .8rem
      img
        setWH(4.2rem, 4.2rem)
        animation loading 1.5s infinite
      p
        font-size 1.2rem
        margin-top .5rem
        color #8a8a8a
</style>
