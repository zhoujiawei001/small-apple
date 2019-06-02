<template>
  <div class="home wrapper">
    <div class="content">
      <appBgImg id="app-bg" :style="styObjBg"></appBgImg>
      <main>
        <appStatusBar :class="clsObjStatusDown"></appStatusBar>
        <appAddDev :devNum="addedDevList.length" @handle-icon="tipsBox = true"></appAddDev>
        <appDevItem :item="item" v-for="(item, i) in addedDevList" :key="i"></appDevItem>
      </main>
    </div>
    <appHeader id="app-hd" :style="styObjHd" @set="jumpToSetting()"></appHeader>
    <appStatusBar :style="styObjStatus" :class="clsObjStatusUp"></appStatusBar>
    <transition name="fade">
      <appTipsBox v-if="tipsBox" @handle-sure="tipsBox = false"></appTipsBox>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import appHeader from '@/components/appHeader'
import appBgImg from '@/components/appBgImg'
import appStatusBar from '@/components/appStatusBar'
import appAddDev from '@/components/appAddDev'
import appDevItem from '@/components/appDevItem'
import appTipsBox from '@/components/appTipsBox'
import BScroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    appHeader,
    appBgImg,
    appStatusBar,
    appAddDev,
    appDevItem,
    appTipsBox
  },
  computed: {
    ...mapState(['addedDevList']),
    ...mapGetters(['screenRem']),
    styObjStatus () {
      return {
        position: 'fixed',
        top: this.headerHg + 'px',
        left: '1.6rem',
        width: 'calc(100% - 6.4rem)'
      }
    },
    styObjBg () {
      return {
        opacity: 1 - this.scrollHg / this.limitHg
      }
    },
    styObjHd () {
      return {
        backgroundColor: this.scrollHg > this.limitHg ? '#f2f2f2' : ''
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
      limitHg: 0,
      tipsBox: false
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollFun()
      this.headerHg = document.getElementById('app-hd').clientHeight
      this.bgImgHg = document.getElementById('app-bg').clientHeight
      this.limitHg = this.bgImgHg - this.headerHg + 1.2 * this.screenRem
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
      window.jumpToCallback = res => {
        console.log(res)
      }
      window.hilink.jumpTo(
        'com.huawei.smarthome.deviceSettingActivity',
        'jumpToCallback'
      )
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
