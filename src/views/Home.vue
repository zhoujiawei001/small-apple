<template>
  <div class="home wrapper">
    <div class="content">
      <appHeader></appHeader>
      <appBgImg></appBgImg>
      <main>
        <appStatusBar></appStatusBar>
        <appAddDev></appAddDev>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
        <appDevItem></appDevItem>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import appHeader from '@/components/appHeader'
import appBgImg from '@/components/appBgImg'
import appStatusBar from '@/components/appStatusBar'
import appAddDev from '@/components/appAddDev'
import appDevItem from '@/components/appDevItem'
import BScroll from 'better-scroll'
export default {
  name: 'home',
  components: {
    appHeader,
    appBgImg,
    appStatusBar,
    appAddDev,
    appDevItem
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollFun()
    })
  },
  methods: {
    scrollFun () {
      // const wrapper = document.querySelector('.wrapper')
      const scroll = new BScroll('.wrapper', {
        probeType: 3,
        bounce: {
          top: false,
          bottom: false
        }
      })
      scroll.on('scroll', pos => {
        console.log(pos)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .home
    height 100%
    main
      padding 1.2rem 1.6rem
      background-color #F2F2F2
</style>
