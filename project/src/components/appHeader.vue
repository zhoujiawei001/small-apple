<template>
  <div class="appHeader" :style="styObj">
<!--    <div class="back" @click="back">-->
<!--      <span></span>-->
<!--    </div>-->
<!--    <span class="title">{{title}}</span>-->
<!--    <div class="more" @click="handleMore" :class="{hiddenEle: hiddenMore || curPageType === 'learnPage' || curPageType === 'matchPage'}">-->
<!--      <span></span>-->
<!--    </div>-->
    <div class="left">
      <div class="back" @click="back">
        <span class="icon"></span>
      </div>
      <span class="title">{{title}}</span>
    </div>
    <div
      class="right"
      @click="handleMore"
      :class="{hiddenEle: hiddenMore || curPageType === 'learnPage' || curPageType === 'matchPage'}">
      <span></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'appHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    hiddenMore: {
      type: Boolean,
      default: false
    },
    curPageType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['statusBarHg']),
    styObj () {
      return {
        paddingTop: this.statusBarHg + 'px'
      }
    }
  },
  methods: {
    back () {
      if (this.$route.path !== '/') {
        this.$emit('back-icon')
      } else {
        window.hilink.finishDeviceActivity()
      }
    },
    handleMore () {
      this.$emit('set')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appHeader
  display: flex
  height: 4.8rem
  align-items center
  justify-content space-between
  flex-direction row
  padding 0 1rem
  position: fixed
  top: 0
  left: 0
  width calc(100% - 2rem)
  z-index: 9;
  box-sizing initial
  .left
    width calc(100% - 3.2rem)
    display flex
    justify-content left
    align-items center
    .back
      height 4rem
      width 3.2rem
      display: flex
      justify-content center
      align-items center
      .icon
        height 2rem
        width 2rem
        imgUrl('../assets/back.png')
    .title
      font-size 1.6rem
      max-width 16rem
      margin-left 1rem
      setEllipsisOne()
  .right
    height 4rem
    width 3.2rem
    display: flex
    justify-content center
    align-items center
    span
      height 2rem
      width 2rem
      imgUrl('../assets/more.png')
  .hiddenEle
    visibility: hidden
</style>
