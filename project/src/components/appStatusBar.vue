<template>
  <div class="appStatusBar">
    <div class="left">
      <span>在线</span>
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
    background: radial-gradient(#6EC1FE, #3E9FE9)
    .right
      width 4.8rem
      height 4.8rem
      position absolute
      border-radius 50%
      top 50%
      right 1.6rem
      transform translateY(-50%)
      img
        width 4.8rem
    .left
      color #fff
      letter-spacing: 1px
      position absolute
      top 50%
      left 1.6rem
      transform translateY(-50%)
      span
        font-size 1.4rem
      p
        font-size 1.2rem
        margin-top .4rem
</style>
