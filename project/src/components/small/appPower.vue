<template>
  <div
    class="appPower"
    @click="clickPower"
    @touchstart="touchStartFn"
    @touchend="touchEndFn">
    <img src="../../assets/fan-switch-off.png" alt="light.png">
    <p>电源</p>
  </div>
</template>

<script>
export default {
  name: "appPower",
  methods: {
    clickPower () {
      this.$emit('handle-power', 'power')
    },
    touchStartFn () {
      this.$emit('touchstart-fn', 'power')
    },
    touchEndFn () {
      this.$emit('touchstart-fn', 'power')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .appPower
    height 8rem
    width 8rem
    border-radius $bdRadMidSize
    font-size $fontMiddleSize
    setPosUseFlex()
    background-color: #fff;
    img
      width 3.2rem
      height 3.2rem
    &:active
      background-color: $bgActiveColor
</style>
