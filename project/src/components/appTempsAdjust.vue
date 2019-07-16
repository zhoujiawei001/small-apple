<template>
  <div class="app-temps flex">
    <span
      class="btn-reduce"
      @click="changeTemp('temp-')"
      @touchstart="touchstartTemp('temp-')"
      @touchend="touchendTemp('temp-')"
    >—</span>
    <div class="text">温度</div>
    <span
      class="btn-plus"
      @click="changeTemp('temp+')"
      @touchstart="touchstartTemp('temp+')"
      @touchend="touchendTemp('temp+')"
    >＋</span>
  </div>
</template>

<script>
export default {
  name: "appTempsAdjust",
  methods: {
    changeTemp (val) {
      this.$emit('handle-click', val)
    },
    touchstartTemp (val) {
      this.$emit('handle-start', val)
    },
    touchendTemp (val) {
      this.$emit('handle-end', val)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .app-temps
    width 100%
    background #fff
    height 7.2rem
    border-radius 3.6rem
    span
      setWH(3.6rem, 3.6rem)
      line-height 3.6rem
      setBorder()
      setFont(3rem, rgb(26,26,26), center)
      border-radius 100%
      &:active
        background-color rgba(0,0,0,.1)
    .btn-reduce
      margin-left 1.6rem
    .btn-plus
      margin-right 1.6rem
    .text
      setFont($fontMiddleSize, rgb(26,26,26), center)
</style>
