<template>
  <div class="appHeader" :style="styObj">
    <span class="back" @click="back"></span>
    <span class="title">{{title}}</span>
    <span class="more" @click="handleMore" :class="{hiddenEle: hiddenMore}"></span>
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
  padding 0 1.6rem
  position: fixed
  top: 0
  left: 0
  width calc(100% - 3.2rem)
  z-index: 9;
  box-sizing initial
  .back
    height 2rem
    width 2rem
    imgUrl('../assets/back.png')
  .title
    font-size 1.6rem
    max-width 16rem
    setEllipsisOne()
  .more
    height 2rem
    width 2rem
    imgUrl('../assets/more.png')
  .hiddenEle
    visibility: hidden
</style>
