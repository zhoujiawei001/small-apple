<template>
  <div class="home wrapper">
    <div class="content">
      <appBgImg id="app-bg" :style="styObjBg"></appBgImg>
      <main>
        <appStatusBar :class="clsObjStatusDown"></appStatusBar>
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
    <div class="shade-bar" :style="styObjBar"></div>
    <appHeader id="app-hd" :style="styObjHd" @set="jumpToSetting()"></appHeader>
    <appStatusBar :style="styObjStatus" :class="clsObjStatusUp"></appStatusBar>
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
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    appHeader,
    appBgImg,
    appStatusBar,
    appAddDev,
    appDevItem
  },
  computed: {
    ...mapGetters(['screenRem']),
    styObjStatus () {
      return {
        position: 'fixed',
        top: this.headerHg + 1.2 * this.screenRem + 'px',
        left: '1.6rem',
        width: 'calc(100% - 6.4rem)'
      }
    },
    styObjBar () {
      return {
        position: 'fixed',
        top: this.headerHg + 'px',
        left: 0,
        width: '100%',
        height: '1.2rem',
        display: this.scrollHg >= this.limitHg ? 'block' : 'none',
        backgroundColor: '#f2f2f2'
      }
    },
    styObjBg () {
      return {
        opacity: 1 - this.scrollHg / this.limitHg
      }
    },
    styObjHd () {
      return {
        backgroundColor: this.scrollHg > this.limitHg ? '#fff' : ''
      }
    },
    clsObjStatusDown () {
      return {
        'hidden-ele1': this.scrollHg > this.limitHg
      }
    },
    clsObjStatusUp () {
      return {
        'hidden-ele2': this.scrollHg <= this.limitHg,
        'show-ele': this.scrollHg > this.limitHg
      }
    }
  },
  data () {
    return {
      headerHg: 0,
      bgImgHg: 0,
      scrollHg: 0,
      limitHg: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollFun()
      this.headerHg = document.getElementById('app-hd').clientHeight
      this.bgImgHg = document.getElementById('app-bg').clientHeight
      this.limitHg = this.bgImgHg - this.headerHg
      const wd = document.body.clientWidth
      this.$store.commit('setScreenWd', wd)
    })
  },
  methods: {
    scrollFun () {
      // const wrapper = document.querySelector('.wrapper')
      const scroll = new BScroll('.wrapper', {
        probeType: 3,
        click: true,
        bounce: {
          top: false,
          bottom: true
        }
      })
      scroll.on('scroll', pos => {
        this.scrollHg = -pos.y
      })
    },
    // 跳转至设置页面
    jumpToSetting() {
      this.$router.push('/setting')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .home
    height 100%
    background-color #F2F2F2
    main
      padding 1.2rem 1.6rem
      background-color #F2F2F2
      position relative
    .show-ele
      display: block
    .hidden-ele1
      visibility: hidden
    .hidden-ele2
      display: none
</style>
