<template>
  <div class="appStatusBar">
    <div class="left">
      <span>{{$t('home.online')}}</span>
      <p>{{devName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appStatusBar',
  props: {
    devName: {
      type: String,
      default: '遥控大师小苹果'
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    clickSwitch () {
      this.$emit('handle-icon')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .appStatusBar
    height 7.6rem
    padding 0 1.6rem
    position relative
    box-sizing initial
    border-radius: .4rem
    background: radial-gradient(#71c2ff, #3b9ee9)
    .left
      color #fff
      letter-spacing: 1px
      position absolute
      top 50%
      left 1.6rem
      transform translateY(-50%)
      span
        font-size $fontBigSize
      p
        width: 18rem;
        setEllipsisOne()
        font-size $fontSmallSize
        margin-top .2rem
</style>
