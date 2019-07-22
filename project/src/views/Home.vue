<template>
  <div class="home wrapper">
    <div class="content">
      <appBgImg
        id="app-bg"
        :imgUrl="appIcon"
        :style="styObjBg"></appBgImg>
      <main>
        <appStatusBar
          :class="clsObjStatusDown"
          :devName="devName"
          :key="100"></appStatusBar>
        <appIndicatorBar
          :devStatus="appStatus"
          @handle-item="clickSwitchIcon"></appIndicatorBar>
        <appDevItem
          v-for="(item, i) in addedDevList"
          :item="item"
          :key="i"
          @handle-icon="handleIconSwitch"></appDevItem>
        <appAddDev></appAddDev>
      </main>
    </div>
    <appHeader id="app-hd" :style="styObjHd" @set="jumpToSetting()"></appHeader>
    <appStatusBar
      :style="styObjStatus"
      :class="clsObjStatusUp"
      :devName="devName"
      :key="101"></appStatusBar>
    <div class="mask-line" :class="clsObjStatusUp" :style="objMaskLine"></div>
    <transition name="fade">
      <appTipsBox
        v-if="tipsBox"
        @handle-sure="tipsBox = false"
        hintText="最多添加15个遥控设备"></appTipsBox>
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
import appIndicatorBar from '@/components/appIndicatorBar'
import BScroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
import { sendBodyToDev, modifyDevSwitchByHid, watchVirtualKey } from '../utils/pub'
export default {
  name: 'home',
  components: {
    appHeader,
    appBgImg,
    appStatusBar,
    appAddDev,
    appDevItem,
    appTipsBox,
    appIndicatorBar
  },
  computed: {
    ...mapState(['addedDevList', 'statusBarHg', 'devName', 'appStatus', 'roomName']),
    ...mapGetters(['screenRem']),
    headerHg () {
      return 4.8 * this.screenRem + this.statusBarHg
    },
    bgImgHg () {
      return 22.6 * this.screenRem
    },
    limitHg () {
      return this.bgImgHg - this.headerHg + 1.2 * this.screenRem - 2
    },
    styObjStatus () {
      return {
        position: 'fixed',
        top: this.headerHg + 2 + 'px',
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
    objMaskLine () {
      return {
        top: this.headerHg + 'px'
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
    },
    appIcon () {
      return require(`../assets/apple_${this.appStatus}.png`)
    }
  },
  data () {
    return {
      scrollHg: 0,
      tipsBox: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollFun()
    })
    watchVirtualKey(true).then(bool => {
      if (bool) {
        window.goBack = () => {
          window.hilink.finishDeviceActivity()
        }
      }
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
    },
    /** 点击开关按钮 **/
    clickSwitchIcon () {
      let status = this.appStatus ? 0 : 1
      let body = {
        ledOnoff: {
          ledOnoff: status
        }
      }
      sendBodyToDev(body)
    },
    handleIconSwitch (obj) {
      modifyDevSwitchByHid(obj.hid, obj.isSwitch).then(data => {
        if (!data.errcode) {
          let newList = JSON.parse(JSON.stringify(this.addedDevList))
          newList = newList.map(item => {
            if (item.hid === obj.hid) {
              item.isSwitch = obj.isSwitch
              return item
            } else {
              return item
            }
          })
          this.$store.commit('setAddedDevList', newList)
        }
      })
    }
  },
  beforeDestroy() {
    watchVirtualKey(false)
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
    .mask-line
      position fixed
      top 6.8rem
      left 0
      height 2px
      width 100%
      background-color: #f2f2f2;
</style>
