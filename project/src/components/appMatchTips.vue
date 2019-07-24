<template>
  <div class="appMatchTips">
    <span class="left" @click="leftFn"></span>
    <div class="middle" @click="midFn">
      <span>{{curNum}}/{{total}}</span>
      &nbsp;
      <span>{{$t('pub.use_this')}}</span>
    </div>
    <span class="right" @click="rightFn"></span>
  </div>
</template>

<script>
export default {
  name: 'appMatchTips',
  props: ['curNum', 'total', 'typeName'],
  methods: {
    leftFn () {
      if (this.$isVibrate) {
        navigator.vibrate(100)
      }
      this.$emit('handle-left')
    },
    midFn () {
      this.$emit('handle-mid')
    },
    rightFn () {
      if (this.$isVibrate) {
        navigator.vibrate(100)
      }
      this.$emit('handle-right')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .appMatchTips
    position fixed
    bottom 0
    left 0
    width 100%
    height 5.8rem
    background-color: $fontColorTheme;
    font-size 1.4rem
    display: flex
    justify-content space-between
    align-items center
    color #fff
    padding: 0 .5rem
    .left
    .right
      width 3.6rem
      height 3rem
    .left
      background: url("../assets/white/match_left.png") no-repeat center
      background-size contain
    .right
      background url("../assets/white/match_right.png") no-repeat center
      background-size contain
    .middle
      padding .4rem 1.2rem
      border 1px solid #fff
</style>
