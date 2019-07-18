<template>
  <div class="bot-tips">
    <img :src="require(`../assets/learn-apple_${stage}.png`)" class="left" alt="">
    <div class="middle">
      {{learnBoxText}}
    </div>
    <div class="right">
      <span @click="endFn">{{btnText}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appLearnTips',
    props: {
      learnBoxText: {
        type: String,
        default: ''
      },
      btnText: {
        type: String,
        default: ''
      },
      stage: {
        type: Number
      }
    },
    methods: {
      endFn () {
        this.$emit('handle-end')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../style/mixin.styl'
  .bot-tips
    position fixed
    bottom 0
    left 0
    width 100%
    height 5.8rem
    background-color: $fontColorTheme;
    font-size 1.2rem
    display: flex
    justify-content space-between
    align-items center
    color #fff
    .left
      width 24%
      height 100%
      object-fit: contain;
      /*background: url("../assets/learn-apple_1.png") no-repeat center*/
      /*background-size: contain*/
    .middle
      width 52%
      padding 0 1.2rem
    .right
      width 24%
      display: flex
      justify-content left
      align-items center
      height 100%
      padding-left 1rem
      span
        width calc(100% - 1rem)
        height 3.2rem
        border 1px solid #fff
        border-radius 3rem
        line-height 3.2rem
        text-align center
</style>
