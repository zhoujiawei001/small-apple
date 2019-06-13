<template>
  <div class="appAddDev">
    <img src="../assets/add.png" alt="" @click="clickAdd">
    <span>遥控器 {{devNum}} 个</span>
  </div>
</template>

<script>
export default {
  name: 'appAddDev',
  props: ['devNum'],
  methods: {
    clickAdd () {
      if (this.devNum >= 15) {
        this.$emit('handle-icon')
      } else {
        this.$router.push('./type')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appAddDev
  margin-top 1.2rem
  height 7.2rem
  background-color: #fff;
  border-radius 4px
  position relative
  img
    height 4.8rem
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  span
    color $fontColorTheme
    position absolute
    right 1.2rem
    bottom 1.2rem
    font-size 1.2rem
</style>
