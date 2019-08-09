<template>
  <div class="dev-match">
    <appHeader2
      :title="$t('match.title')"
      @back-icon="onClickBack"></appHeader2>
    <div class="mt-section_1">
      <div class="icon-text">
        <img :src="require(`../assets/devIcon/${tid}.png`)" alt="">
        <p class="text">{{$route.query.zh}} {{$route.query.en}} {{$t(`pub.${typeName}`)}}</p>
      </div>
      <div class="dec" v-if="lang === 'zh'">
        <p>匹配前，请将{{$t(`pub.${typeName}`)}}电源打开</p>
        <p>{{typeDec}}</p>
        <p>表示匹配成功， 点击 “下一步”</p>
      </div>
      <div class="dec" v-else>
        <p>Please turn on the power of the {{$t(`pub.${typeName}`)}}</p>
        <p>{{typeDecEn}}</p>
        <p>To indicate successful match, click "next"</p>
      </div>
    </div>
    <div class="mt-section_2">
      <span class="number">{{total === '--'? '-' : currentNum}}/{{total}}</span>
      <div class="btn-icons">
        <div class="btn-reduce"
           :class="[{'btn-disable': tips || total === '--'}, {'active': isActiveRe}]"
           @touchstart.prevent="longHandleMatch('reduce')"
           @touchmove.prevent=""
           @touchend="endLongHandleMatch('reduce')">
          <img src="../assets/match_reduce.png" alt="">
        </div>
        <div class="btn-switch"
          :class="{'btn-disable': tips || total === '--'}"
          @click="sendCode('switch')">
          <img :src="matchIcon" alt="">
        </div>
        <div class="btn-plus"
           :class="[{'btn-disable': tips || total === '--'}, {'active': isActivePl}]"
           @touchstart="longHandleMatch('plus')"
           @touchmove="touchEndSure"
           @touchend.stop.prevent="endLongHandleMatch('plus')">
          <img src="../assets/match_plus.png" alt="">
        </div>
      </div>
      <div class="info">{{$t('match.longPress')}}</div>
      <div class="btn-next" :class="{'btn-disable': tips || tips2 || total === '--'}" @click="nextFun">
        {{$t('pub.next')}}
      </div>
    </div>
    <!-- 弹出框提示 -->
    <transition name="fade">
      <appTipsBox :hintText="$t('pub.match_leave')" v-if="tipsBox" @handle-sure="tipsBox = false"></appTipsBox>
    </transition>
    <app-loading2 v-if="tips"></app-loading2>
  </div>
</template>

<script>
import appHeader2 from '@/components/appHeader2'
import appTipsBox from '@/components/appTipsBox'
import appLoading2 from '@/components/appLoading2'
import {mapState, mapActions} from 'vuex'
import { sendBodyToDev2, RC, numArr, removeRegisteredVirtualDevYk, parseHilinkData, matchTimeoutSendOrder, postExtendToServe, assembleTS, watchVirtualKey } from '../utils/pub'
export default {
  name: 'Match',
  data () {
    return {
      total: '--',
      modeList: [],
      currentNum: 1,
      rc: {},
      allowIndexArr: [], // 可选index集合
      tips: false, // 小提示显示隐藏
      tips2: false, // 专门解决由上次发送指令导致下次发送不成功的情况
      tipsBox: false, // 提示框显示隐藏
      count: 0, // 下发匹配时间单位s
      timer: null, // 计算超时定时器
      longTimer: null, // 长按定时下发
      isActiveRe: false, // 控制按下去的背景颜色
      isActivePl: false, // 控制按下去的背景颜色
      longClickTimer: null, // 长按定时器
      longClickNum: 0, // 判断长按还是点击的值
      secondModeList: [] // 二级匹配数据
    }
  },
  components: {
    appHeader2,
    appTipsBox,
    appLoading2
  },
  watch: {
    'loadRes.isFinish': {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if (newVal === 1) {
          this.registerVirtualDev().then(data => {
            if (data.errcode === 0) {
              this.rc.devId = data.devId
              this.postYkDevToServe().then(data2 => {
                if (data2.errcode === 0) {
                  postExtendToServe(this.rc).then(data3 => {
                    if (data3.errcode === 0) {
                      let cloneList = JSON.parse(JSON.stringify(this.addedDevList))
                      cloneList.push(this.rc)
                      this.$store.commit('setAddedDevList', cloneList)
                      this.$store.commit('setBrandScrollPos', 0) // 成功之后设置品牌页面滚动距离为O
                      this.$router.push('/')
                    } else {
                      window.hilink.toast('2', this.$t('component.added_failed'))
                      removeRegisteredVirtualDevYk(this.rc.devId)
                      this.handleMatchFailedFun()
                    }
                  })
                } else {
                  window.hilink.toast('2', this.$t('component.added_failed'))
                  removeRegisteredVirtualDevYk(this.rc.devId)
                  this.handleMatchFailedFun()
                }
              })
            } else {
              window.hilink.toast('2', this.$t('component.added_failed'))
              this.handleMatchFailedFun()
            }
          })
        } else {
          window.hilink.toast('2', this.$t('component.download_failed'))
          this.handleMatchFailedFun()
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['tid','appDevId', 'addedDevList', 'loadRes', 'lang']),
    typeName () {
      let obj = {
        1: 'set_box',
        2: 'tv',
        6: 'fan',
        7: 'ac',
        8: 'light',
        10: 'tv_box'
      }
      return obj[this.tid]
    },
    typeDec () {
      let obj = {
        1: '如果电视上出现音量调节图标',
        2: '如果电视机打开或着关闭',
        6: '如果风扇打开或关闭',
        7: '如果空调“滴”的一声响',
        8: '如果灯泡打开或关闭',
        10: '如果盒子打开或关闭',
        40: '如果热水器打开或关闭'
      }
      return obj[this.tid]
    },
    typeDecEn () {
      let obj = {
        1: 'If the volume icon appears on the TV',
        2: 'If the TV is on or off',
        6: 'If the fan is on or off',
        7: 'If the air conditioner "drips" a sound',
        8: 'If the bulb is on or off',
        10: 'If the box is open or closed',
        40: 'If the water heater is on or off'
      }
      return obj[this.tid]
    },
    currentCmd () {
      return this.modeList[this.currentNum - 1]['rc_command']
    },
    currentCmdKeyArr () {
      return Object.keys(this.currentCmd)
    },
    currentCode () {
      return this.currentCmd[this.currentCmdKeyArr[0]].src
    },
    currentZip () {
      return this.modeList[this.currentNum - 1].zip
    },
    currentRid () {
      return this.modeList[this.currentNum - 1].rid
    },
    currentGroupId () {
      return this.modeList[this.currentNum - 1].group_id1
    },
    currentBid () {
      return this.modeList[this.currentNum - 1].bid
    },
    matchIcon () {
      return this.tid === 1? require('../assets/black/icon_vol.png') : require('../assets/blue/fan-switch.png')
    }
  },
  created () {
    this.getDevModeList(this.$route.query.bid)
      .then(data => {
        this.total = data.length
        this.modeList = data
      })
    this.initSomeData()
    watchVirtualKey(true).then(bool => {
      if (bool) {
        window.goBack = () => {
          if (this.tips) {
            this.tipsBox = true
          } else {
            this.$router.go(-1)
          }
        }
      }
    })
  },
  methods: {
    ...mapActions(['getDevModeList', 'getDevCodeLibAndInfo', 'getSecondLevelMatchData']),
    /** 初始化一些数据 **/
    initSomeData () {
      let arr = this.addedDevList.map(item => item.index)
      if (this.tid !== 7) {
        this.allowIndexArr = this._.difference(numArr(28), arr)
      } else {
        this.allowIndexArr = this._.difference([29, 30], arr)
      }
    },
    sendCode (val) {
      this.tips2 = true
      if (val === 'plus') {
        this.currentNum ++
        if (this.currentNum > this.total) {
          this.currentNum = 1
        }
      } else if (val === 'reduce') {
        this.currentNum --
        if (this.currentNum < 1) {
          this.currentNum = this.total
        }
      } else {
        console.log('currentNum', this.currentNum)
      }
      let body = {
        batch: {
          controlKey: {
            controlKey: this.currentCode
          },
          deviceList: {
            list: [
              {
                zip: this.currentZip + ''
              }
            ]
          }
        }
      }
      sendBodyToDev2(body, 'sendSrcToDevCallback').then(data => {
        this.tips2 = false
      })
    },
    /** 长按逐个匹配 **/
    longHandleMatch (val) {
      if (this.isActivePl || this.isActiveRe) return // 防止两个按钮同时点击出现定时错乱
      if (val === 'plus') {
        this.isActivePl = true
      } else {
        this.isActiveRe = true
      }
      this.longClickNum = 0
      this.longClickTimer = setTimeout(() => {
        this.longClickNum = 1
        this.sendCode(val)
        this.longTimer = setInterval(() => {
          this.sendCode(val)
        }, 1200)
      },1200)
    },
    /** touchMove事件 **/
    touchEndSure (e) {
      e.preventDefault()
    },
    /** 结束长按匹配 **/
    endLongHandleMatch (val) {
      if (val === 'plus') {
        if (this.isActiveRe) return // 防止两个按钮同时点击出现定时错乱
        this.isActivePl = false
      } else {
        if (this.isActivePl) return // 防止两个按钮同时点击出现定时错乱
        this.isActiveRe = false
      }
      clearInterval(this.longTimer)
      this.longTimer = null
      clearTimeout(this.longClickTimer)
      this.longClickTimer = null
      if (this.longClickNum === 0) {
        this.sendCode(val)
      }
    },
    nextFun () {
      if (this.tid !== 7) {
        this.$store.commit('setBid', this.currentBid)
        this.getSecondLevelMatchData(this.currentGroupId).then(data => {
          this.secondModeList = data
          this.$store.commit('setSecondList', this.secondModeList)
          this.$store.commit('setSecondListTotal', this.secondModeList.length)
          this.rc = {
            rid: this.secondModeList[0].rid,
            pageType: 'matchPage',
            hname: this.$route.query[this.lang] + ' ' + this.$t(`pub.${this.typeName}`),
            code: this.currentCode,
            zip: this.currentZip,
            index: this.allowIndexArr[0]
          }
          this.$router.push({
            path: `/device${this.tid}`,
            query: {
              rc: JSON.stringify(this.rc)
            }
          })
        })
      } else {
        this.handleMatchTimeout()
        this.getDevCodeLibAndInfo(this.currentRid)
          .then(data => {
            this.rc = new RC(
              data.rid,
              data.name + ' ' + this.$t(`pub.${this.typeName}`),
              this.allowIndexArr[0],
              this.currentCode,
              data.be_rmodel,
              data.rmodel,
              data.bid,
              +data.be_rc_type,
              '',
              assembleTS(),
              this.currentZip)
            this.tips = true
            this.setUrlDomainToDev(this.rc)
          })
      }

    },
    /** 下发参数给设备下载码库 **/
    setUrlDomainToDev (rc) {
      let body = {
        batch: {
          deviceList: {
            list: [rc]
          },
          cmdList: {
            url: {
              domain: 'http://hwapi.yaokantv.com',
              path: '/huawei/l.php',
              param: {
                m: 'live',
                c: 'remote_details',
                rid: rc.rid,
                zip: rc.zip
              }
            }
          }
        }
      }
      sendBodyToDev2(body, 'setDeviceInfoCallbackInMatch1').then(data => {
        if (data.errcode) {
          this.handleMatchFailedFun()
        }
      })
    },
    /** 引用蓝牙注册方式注册虚拟设备到九宫格 **/
    registerVirtualDev () {
      return new Promise(resolve => {
        let body = {
          devInfo: {
            sn: this.rc.hid,
            model: this.rc.rmodel || 'ac',
            devType: '06C',
            manu: '092',
            prodId: this.selectRightProdId(this.rc.tid),
            hiv: '1.0',
            mac: '',
            fwv: '1.0',
            hwv: '1.0',
            swv: '1.0'
          }
        }
        console.log('register_body', body)
        window.registerCallback = res => {
          console.log('register_result', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.regiterInfraredHubDevice(JSON.stringify(body), 'registerCallback')
      })
    },
    selectRightProdId (tid) {
      let obj = {
        1: '113Y',
        2: '113X',
        6: '114B',
        7: '113Z',
        8: '114C',
        10: '114A'
      }
      return obj[tid]
    },
    /**云端上传虚拟遥控设备**/
    postYkDevToServe () {
      return new Promise(resolve => {
        let body = {
          type: 'VirtRemoteInfo',
          data: {
            gID: this.appDevId, // 小苹果的设备id
            dUID: {
              deviceList: {
                list: [this.rc]
              }
            }
          }
        }
        console.log('postYkDevToServe_body', body)
        window.postDeviceExtendDataByIdCallback = res => {
          console.log('postYkDevToServe_result', parseHilinkData(res))
          resolve(parseHilinkData(res))
        }
        window.hilink.postDeviceExtendDataById(this.rc.devId, JSON.stringify(body), 'postDeviceExtendDataByIdCallback')
      })
    },
    /** 点击返回 **/
    onClickBack () {
      if (this.tips) {
        this.tipsBox = true
      } else {
        this.$router.go(-1)
      }
    },
    /** 匹配超时处理 **/
    handleMatchTimeout () {
      this.timer = setInterval(() => {
        this.count++
        if (this.count > 30) {
          window.hilink.toast('2', this.$t('component.match_timeout'))
          this.handleMatchFailedFun()
          matchTimeoutSendOrder()
        }
        console.log('time', this.count)
      }, 1000)
    },
    /** 匹配失败处理 **/
    handleMatchFailedFun () {
      this.tips = false
      clearInterval(this.timer)
      this.timer = null
      this.count = 0
    }
  },
  beforeDestroy () {
    // window.deviceEventCallback = null
    clearInterval(this.timer)
    watchVirtualKey(false)
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.dev-match
  width 100%
  height 100%
  .mt-section_1
    width 100%
    height 22.8rem
    imgUrl("../assets/background.png")
    position relative
    font-size 1.2rem
    .icon-text
      position absolute
      top 45%
      left 50%
      transform translate(-50%,-50%)
      display: flex
      justify-content: center
      align-items center
      flex-direction column
      img
        width 5rem
      .text
        width 25rem
        color $fontColorTheme
        text-align center
    .dec
      width 100%
      position absolute
      bottom 1.6rem
      left 50%
      transform translateX(-50%)
      display: flex
      justify-content: center
      align-items center
      flex-direction column
      p:nth-child(2)
        padding .3rem 0
  .mt-section_2
    padding 2.4rem 0
    height calc(100% - 22.8rem)
    background-color: $bgColorTheme;
    position relative
    .number
      font-size 3.2rem
      color $fontColorTheme
      position absolute
      left 50%
      top 2.4rem
      transform translateX(-50%)
    .btn-icons
      width 28.8rem
      position absolute
      top 10.8rem
      left 50%
      transform translateX(-50%)
      display: flex;
      justify-content space-between
      align-items center
      .btn-reduce
      .btn-switch
      .btn-plus
        width 9.2rem
        height 8.6rem
        background-color: #fff;
        border-radius 1.2rem
        position relative
        &:active
          background-color rgba(0,0,0,.1)
        img
          setCenterUsePosition2()
          width 5rem
      .active
        background-color rgba(0,0,0,.1)
    .info
      position absolute
      top 24rem
      left 50%
      transform translateX(-50%)
      width calc(100% - 10rem)
      text-align center
      font-size 1.2rem
    .btn-next
      position absolute
      bottom 2.4rem
      left 50%
      transform translateX(-50%)
      width 10.2rem
      height 3.6rem
      border-radius 2rem
      line-height 3.6rem
      text-align center
      background-color: #fff;
      font-size $fontMiddleSize
      &:active
        background-color rgba(0,0,0,.1)
</style>
