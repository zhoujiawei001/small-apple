<template>
  <div class="appHeader2" :style="styObj">
    <div class="back" @click="back">
      <span></span>
    </div>
    <div class="text">{{title}}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'appHeader2',
    props: {
      title: {
        type: String
      }
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
    }
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .appHeader2
    display: flex
    height: 4.8rem
    align-items center
    flex-direction row
    padding 0 1rem
    position: fixed
    top: 0
    left: 0
    width calc(100% - 2rem)
    z-index: 9;
    box-sizing initial
    .back
      height 4rem
      width 3.2rem
      display: flex
      justify-content center
      align-items center
      span
        height 2rem
        width 2rem
        imgUrl('../assets/back.png')
    .text
      font-size 1.6rem
      max-width 16rem
      margin-left 1rem
      setEllipsisOne()

</style>
