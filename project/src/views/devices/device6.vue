<template>
  <!--风扇-->
  <div class="dev-fan">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="banner">
      <img src="../../assets/fan.png" alt="fan.png">
    </div>
    <div class="container">

    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device6',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电风扇'
      }
    },
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-fan
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2
    .header
      position fixed
      top 0
      width 100%
    .banner
      setWH(100%, 22.8rem)
      setPosUseFlex()
      img
        setWH(8rem, 8rem)
        transform translateY(3rem)
    .container
      flex 1

</style>
