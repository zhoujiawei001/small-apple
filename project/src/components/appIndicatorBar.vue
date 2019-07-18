<template>
  <div class="indicator" @click="clickItem">
    <div class="left" :style="{color: devStatus? '#3EA0EA' : 'rgb(26,26,26)'}">
      <span>指示灯</span>
      <p>{{ devStatus ? '已开启' : '' }}</p>
    </div>
    <img class="right" :src="require(`../assets/indicator_${devStatus}.png`)" alt="">
  </div>
</template>

<script>
export default {
  name: "appIndicatorBar",
  props: {
    devStatus: {
      type: Number,
      default: 1
    }
  },
  methods: {
    clickItem () {
      this.$emit('handle-item')
    }
  }
}
</script>

<style scoped lang="stylus">
 @import "../style/mixin.styl"
 .indicator
    height 7.6rem
    padding 0 1.6rem
    position relative
    box-sizing initial
    border-radius .4rem
    background-color: #fff;
    margin-top 1.2rem
    .right
      width 3.8rem
      height 3.8rem
      position absolute
      top 50%
      right 2rem
      transform translateY(-50%)
    .left
      color #fff
      position absolute
      top 50%
      left 1.6rem
      transform translateY(-50%)
      span
        font-size 1.6rem
      p
        font-size 1.2rem
        margin-top .4rem
        color $fontColorTheme
</style>
