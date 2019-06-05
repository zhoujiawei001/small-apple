<template>
  <div class="loading">
    <div class="container">
      <div class="text">正在删除...</div>
      <div class="loading-svg">
        <img src="../assets/loading.svg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appLoading'
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .loading
    position absolute
    background rgba(0, 0, 0, .3)
    setWH()
    top 0

    .container
      position absolute
      background #fff
      border-radius .8rem
      setWH(95vw, 7rem)
      bottom 1rem
      left 50%
      transform translateX(-50%)
      padding 1rem 1.6rem
      setPosUseFlexInit(row, space-between, center)
      .text
        setFont(1.4rem)

      .loading-svg
        setWH(4rem, 4rem)
        animation loading 1.5s infinite
        img
          setWH()
  @keyframes loading
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
</style>
