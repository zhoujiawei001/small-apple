<template>
  <div class="loading2">
    <div class="container">
      <img src="../assets/loading3.png" alt="">
      <p>正在匹配中...</p>
    </div>
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
    position absolute
    background rgba(0, 0, 0, .3)
    setWH()
    pointer-events none
    top 0
    .container
      position absolute
      padding 1.6rem
      top 50%
      left 50%
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
