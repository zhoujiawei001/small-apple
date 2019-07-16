<template>
  <div class="header">
    <div class="empty-header" :style="{height: statusBarHg + 'px'}"></div>
    <header>
      <span class="icon-back" @click="backTo()">
        <img src="../assets/back.png" alt="">
      </span>
      <div class="title">{{title}}</div>
      <span class="icon-more" @click="moreSet()">
        <img src="../assets/more.png" alt="">
      </span>
    </header>
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
    data () {
      return {}
    },
    computed: {
      ...mapState(['statusBarHg'])
    },
    methods: {
      backTo() {
        // this.$emit('backTo')
        this.$router.go(-1)
      },
      moreSet() {
        this.$emit('moreSet')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .header
    position fixed
    top 0
    width 100%
    header
      setPosUseFlexInit(row, space-between, center)
      .title
        setFont(1.8rem, black, center)
        setEllipsisOne()
      >span
        setHeight(4.8rem)
        padding 0 1.6rem
        img
          setWH(2rem,2rem)
          vertical-align middle

</style>
