<template>
  <div class="loading">
    <div class="container">
      <div class="text">{{loadingTxt}}</div>
      <div class="loading-svg">
        <img src="../assets/loading3.png" alt="">
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: 'appLoading',
    props: ['loadingTxt']
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .loading
    position absolute
    setWH()
    top 0
    left 0
    z-index: 9;
    .container
      position absolute
      background #fff
      border-radius .8rem
      setWH(95vw, 7rem)
      bottom 1rem
      left 50%
      transform translateX(-50%)
      padding 1rem 1.6rem
      z-index: 9;
      setPosUseFlexInit(row, space-between, center)
      .text
        setFont(1.4rem)

      .loading-svg
        setWH(4rem, 4rem)
        animation loading 1.5s infinite
        img
          setWH()
</style>
