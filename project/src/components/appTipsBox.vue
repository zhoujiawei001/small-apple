<template>
  <div class="appTipsBox">
    <div class="content">
      <h5>提示</h5>
      <p>{{hintText}}</p>
      <div class="sure" @click="clickSure">
        确定
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'appTipsBox',
  props: ['hintText'],
  methods: {
    clickSure () {
      this.$emit('handle-sure')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appTipsBox
  width 100%
  height 100%
  position fixed
  top: 0
  left 0
  z-index 11
  .content
    width 84%
    setCenterUsePosition2()
    z-index: 10
    background-color: #fff;
    border-radius .8rem
    h5
      font-size 1.8rem
      text-align center
      height 4.6rem
      line-height 4.6rem
    p
      padding 0 1.6rem 1.6rem 1.6rem
      font-size 1.6rem
      text-align center
    .sure
      height 4.6rem
      font-size 1.6rem
      line-height 4.6rem
      text-align center
      border-top: 1px solid $bdColorTheme
      color $fontColorTheme
      &:active
        background-color rgba(0,0,0,.1)!important
  .mask
    width 100%
    height 100%
    position absolute
    top: 0
    left 0
    background rgba(0, 0, 0, .3)
</style>
