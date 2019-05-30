<template>
  <div class="appHeader" :style="styObj">
    <span class="back" @click="back"></span>
    <span class="more" @click="set"></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'appHeader',
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
      window.hilink.finishDeviceActivity()
    },
    set() {
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
  padding 0 1.6rem
  position: fixed
  top: 0
  left: 0
  width calc(100% - 3.2rem)
  z-index: 9;
  box-sizing initial
  span
    height 2rem
    width 2rem
  .back
    imgUrl('../assets/back.png')
  .more
    imgUrl('../assets/more.png')
</style>
