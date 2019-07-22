<template>
  <div class="indicator" @click="clickItem">
    <div class="left" :style="{color: devStatus? '#007dff' : 'rgb(26,26,26)'}">
      <span>指示灯</span>
      <p>{{ devStatus ? '已开启' : '' }}</p>
    </div>
    <div class="right">
      <img :src="require(`../assets/indicator_${devStatus}.png`)" alt="">
    </div>
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
    height 6.4rem
    padding 0 .6rem 0 1.6rem
    position relative
    box-sizing initial
    border-radius .4rem
    background-color: #fff;
    margin-top .8rem
    .right
      width 4.8rem
      height 4.8rem
      position absolute
      top 50%
      right .6rem
      transform translateY(-50%)
      border-radius 50%
      img
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 2.8rem
    .left
      color #fff
      position absolute
      top 50%
      left 1.6rem
      transform translateY(-50%)
      span
        font-size $fontBigSize
      p
        font-size $fontSmallSize
        margin-top .4rem
        color $fontColorTheme
</style>
