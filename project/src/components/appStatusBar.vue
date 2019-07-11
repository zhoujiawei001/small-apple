<template>
  <div class="appStatusBar" :style="objStyle">
    <div class="left">
      <span>夜灯{{devStatus ? '开启' : '关闭'}}</span>
      <p>{{devName}} {{devRoomName}}</p>
    </div>
    <div class="right" @click="clickSwitch"></div>
  </div>
</template>

<script>
export default {
  name: 'appStatusBar',
  props: {
    devStatus: {
      type: Number,
      default: 1
    },
    devName: {
      type: String,
      default: '遥控大师小苹果'
    },
    devRoomName: {
      type: String,
      default: '默认房间'
    }
  },
  computed: {
    objStyle () {
      return {
        // background: `url(${require(`../assets/appStatus_${this.devStatus}.png`)}) no-repeat center`,
        // backgroundSize: '100%'
        background: this.devStatus? 'radial-gradient(#6EC1FE, #3E9FE9)' : '#B5B5B5'
      }
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
    .right
      width 4.8rem
      height 4.8rem
      imgUrl2('../assets/switch.png')
      position absolute
      top 50%
      right 1.6rem
      transform translateY(-50%)
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
