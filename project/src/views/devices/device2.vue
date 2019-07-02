<template>
  <!--电视机-->
  <div class="dev-TV">
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <div class="container" :style="styObjCont">
      <div class="top flex">
        <div
          class="tv-switch"
          @click="sendBody('power')"
          @touchstart="longClickStart('power')"
          @touchend="longClickEnd('power')"
          :class="[{'btn-disable2': !cmdsKey.includes('power')},{ 'learnActive': isLearn && curLearnKey === 'power'}]">
          <span class="img-box"></span>
          <span class="text">机顶盒开关</span>
        </div>
        <div
          class="input-choose"
          @click="sendBody('signal')"
          @touchstart="longClickStart('signal')"
          @touchend="longClickEnd('signal')"
          :class="[{'btn-disable2': !cmdsKey.includes('signal')},{ 'learnActive': isLearn && curLearnKey === 'signal'}]">
          <span class="img-box"></span>
          <span class="text">输入选择</span>
        </div>
        <div
          class="home"
          @click="sendBody('boot')"
          @touchstart="longClickStart('boot')"
          @touchend="longClickEnd('boot')"
          :class="[{'btn-disable2': !cmdsKey.includes('boot')},{ 'learnActive': isLearn && curLearnKey === 'boot'}]">
          <span class="img-box"></span>
          <span class="text">主页</span>
        </div>
      </div>
      <div class="channel-voice flex">
        <div class="channel">
          <span
            class="up btn"
            @click="sendBody('ch+')"
            @touchstart="longClickStart('ch+')"
            @touchend="longClickEnd('ch+')"
            :class="[{'btn-disable2': !cmdsKey.includes('ch+')},{ 'learnActive': isLearn && curLearnKey === 'ch+'}]">＋</span>
          <span class="text">频道</span>
          <span
            class="down btn"
            @click="sendBody('ch-')"
            @touchstart="longClickStart('ch-')"
            @touchend="longClickEnd('ch-')"
            :class="[{'btn-disable2': !cmdsKey.includes('ch-')},{ 'learnActive': isLearn && curLearnKey === 'ch-'}]">—</span>
        </div>
        <div class="function">
          <span
            class="quiet"
            @click="sendBody('mute')"
            @touchstart="longClickStart('mute')"
            @touchend="longClickEnd('mute')"
            :class="[{'btn-disable2': !cmdsKey.includes('mute')},{ 'learnActive': isLearn && curLearnKey === 'mute'}]"></span>
          <span
            class="back btn"
            @click="sendBody('exit')"
            @touchstart="longClickStart('exit')"
            @touchend="longClickEnd('exit')"
            :class="[{'btn-disable2': !cmdsKey.includes('exit')},{ 'learnActive': isLearn && curLearnKey === 'exit'}]">退出</span>
        </div>
        <div class="voice">
          <span
            class="up btn"
            @click="sendBody('vol+')"
            @touchstart="longClickStart('vol+')"
            @touchend="longClickEnd('vol+')"
            :class="[{'btn-disable2': !cmdsKey.includes('vol+')},{ 'learnActive': isLearn && curLearnKey === 'vol+'}]">＋</span>
          <span class="text">音量</span>
          <span
            class="down btn"
            @click="sendBody('vol-')"
            @touchstart="longClickStart('vol-')"
            @touchend="longClickEnd('vol-')"
            :class="[{'btn-disable2': !cmdsKey.includes('vol-')},{ 'learnActive': isLearn && curLearnKey === 'vol-'}]">—</span>
        </div>
      </div>
      <div class="flex function">
        <div class="left">
          <span
            class="menu"
            @click="sendBody('menu')"
            @touchstart="longClickStart('menu')"
            @touchend="longClickEnd('menu')"
            :class="[{'btn-disable2': !cmdsKey.includes('menu')},{ 'learnActive': isLearn && curLearnKey === 'menu'}]"></span>
        </div>
        <div class="mid">
          <div
            class="ok border-1px btn"
            @click="sendBody('ok')"
            @touchstart="longClickStart('ok')"
            @touchend="longClickEnd('ok')"
            :class="[{'btn-disable2': !cmdsKey.includes('ok')},{ 'learnActive': isLearn && curLearnKey === 'ok'}]">OK
          </div>
          <span
            class="top-circle btn"
            @click="sendBody('up')"
            @touchstart="longClickStart('up')"
            @touchend="longClickEnd('up')"
            :class="[{'btn-disable2': !cmdsKey.includes('up')},{ 'learnActive': isLearn && curLearnKey === 'up'}]">○</span>
          <span
            class="bottom-circle btn"
            @click="sendBody('down')"
            @touchstart="longClickStart('down')"
            @touchend="longClickEnd('down')"
            :class="[{'btn-disable2': !cmdsKey.includes('down')},{ 'learnActive': isLearn && curLearnKey === 'down'}]">○</span>
          <span
            class="left-circle btn"
            @click="sendBody('left')"
            @touchstart="longClickStart('left')"
            @touchend="longClickEnd('left')"
            :class="[{'btn-disable2': !cmdsKey.includes('left')},{ 'learnActive': isLearn && curLearnKey === 'left'}]">○</span>
          <span
            class="right-circle btn"
            @click="sendBody('right')"
            @touchstart="longClickStart('right')"
            @touchend="longClickEnd('right')"
            :class="[{'btn-disable2': !cmdsKey.includes('right')},{ 'learnActive': isLearn && curLearnKey === 'right'}]">○</span>
        </div>
        <div class="right">
          <span
            class="return"
            @click="sendBody('back')"
            @touchstart="longClickStart('back')"
            @touchend="longClickEnd('back')"
            :class="[{'btn-disable2': !cmdsKey.includes('back')}, { 'learnActive': isLearn && curLearnKey === 'back'}]"></span>
        </div>
      </div>
      <div class="tel-number">
        <span
          class="item btn"
          v-for="(item, idx) of telNumber"
          :key="idx"
          @click="sendBody(item)"
          @touchstart="longClickStart(item)"
          @touchend="longClickEnd(item)"
          :class="[{'btn-disable2': !cmdsKey.includes(item)},{ 'learnActive': isLearn && curLearnKey === item}]">{{item}}</span>
        <span
          class="item btn"
          @touchstart="longClickStart('*')"
          @touchend="longClickEnd('*')"
          @click="sendBody('*')"
          :class="[{'btn-disable2': !cmdsKey.includes('*')},{ 'learnActive': isLearn && curLearnKey === '*'}]">*</span>
        <span
          class="item btn"
          @click="sendBody('0')"
          @touchstart="longClickStart('0')"
          @touchend="longClickEnd('0')"
          :class="[{'btn-disable2': !cmdsKey.includes('0')},{ 'learnActive': isLearn && curLearnKey === '0'}]">0</span>
        <span
          class="item btn"
          @touchstart="longClickStart('#')"
          @touchend="longClickEnd('#')"
          @click="sendBody('#')"
          :class="[{'btn-disable2': !cmdsKey.includes('#')},{ 'learnActive': isLearn && curLearnKey === '#'}]">#</span>
      </div>
    </div>
    <!-- 底层提示 -->
    <appLearnTips
      v-if="rc.pageType === 'learnPage'"
      :learnBoxText="learnBoxText"
      :btnText="isLearn? '结束' : '完成'"
      @handle-end="handleEnd"></appLearnTips>
    <!-- 返回提示框 -->
    <transition name="fade">
      <appTipsBox hintText="正在学习，请勿离开！" v-if="tipsBox" @handle-sure="tipsBox = false"></appTipsBox>
    </transition>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import appTipsBox from '@/components/appTipsBox'
  import appLearnTips from '@/components/appLearnTips'
  // import { viewsMixin } from '@/utils/mixin'
  import { mapState, mapActions } from 'vuex'
  import { sendBodyToDev, watchVirtualKey } from '../../utils/pub'

  export default {
    name: 'device2',
    // mixins: [viewsMixin],
    components: {
      appHeader,
      appTipsBox,
      appLearnTips
    },
    data () {
      return {
        telNumber: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        tempCmds: {
          '0': 1,
          '1': 2,
          '2': 3,
          '3': 4,
          '4': 5,
          '5': 6,
          '6': 7,
          '7': 8,
          '8': 9,
          '9': 10,
          '#': 11,
          '*': 12,
          'back': 13,
          'boot': 14,
          'ch+': 15,
          'ch-': 16,
          'down': 17,
          'exit': 18,
          'left': 19,
          'menu': 20,
          'mute': 21,
          'ok': 22,
          'power': 23,
          'right': 24,
          'up': 25,
          'vol+': 26,
          'vol-': 27,
          'signal': 28,
          'next': 29,
          'tv/radio': 30,
          'screenshot': 31,
          'green': 32,
          'guide': 33,
          'help': 34,
          'info': 35,
          'itv': 36,
          'vv': 37,
          'yellow': 38,
          'search': 39,
          'stop': 40,
          'previous': 41,
          'rec': 42,
          'red': 43,
          'rew': 44,
          'pause': 45,
          'play': 46,
          'blue': 47,
          'epg': 48,
          'ff': 49
        }, // mix从这下面
        cmds: {},
        rc: JSON.parse(this.$route.query.rc),
        longClickTimer: null, // 长按定时器
        longClickNum: 0, // 判断长按还是点击的值
        curLearnKey: '', // 当前学习的按键
        hasLearnCodes: [], // 已经学过的码库
        isLearn: false, // true-正在学习
        tipsBox: false, // 提示框显示隐藏
        learnBoxText: '长按要学习的按键，进入学习状态，此键会闪烁，等待学习',
        learnTimeoutTimer: null, // 学习超时定时器
        learnTimeoutCount: 0 // 学习时间
      }
    },
    watch: {
      'controlKey.feedKey': {
        handler(newVal, oldVal) {
          if (newVal === 2) {
            window.hilink.toast('2', '学习按键成功')
            this.learnBoxText = '学习成功，可点击该按键测试是否正确，如果不对，可再次学习'
            this.addHasLearnCodeToLocal()
          } else if (newVal === 3) {
            this.learnBoxText = '学习失败，请再次长按你想学习的按键，重新学习'
            window.hilink.toast('2', '学习按键失败')
          }
          this.isLearn = false
          clearInterval(this.learnTimeoutTimer)
          this.learnTimeoutTimer = null
          this.learnTimeoutCount = 0
        },
        deep: true
      }
    },
    created () {
      if (this.cmdList.hasOwnProperty(this.rc.rid)) {
        this.cmds = this.cmdList[this.rc.rid]
        console.log('cmds', this.cmds)
      } else {
        this.getDevCodeLibAndInfo(this.rc.rid).then(data => {
          this.cmds = data.rc_command
          this.$store.commit('updateCmdList', {
            [this.rc.rid]: data.rc_command
          })
        })
      }
      watchVirtualKey(true).then(bool => {
        if (bool) {
          window.goBack = () => {
            if (this.isLearn) {
              this.tipsBox = true
            } else {
              this.$router.go(-1)
            }
          }
        }
      })
    },
    mounted () {
      if (window.localStorage.getItem(`learnCode_${this.rc.hid}`)) {
        this.hasLearnCodes = JSON.parse(window.localStorage.getItem(`learnCode_${this.rc.hid}`))
      }
      console.log('cmdsKey', this.cmdsKey)
    },
    computed: {
      ...mapState(['addedDevList', 'cmdList', 'statusBarHg', 'controlKey']),
      cmdsKey () {
        return this._.union(Object.keys(this.cmds), this.hasLearnCodes)
      },
      title () {
        let arr = this.addedDevList.filter(item => item.hid === this.rc.hid)
        return arr[0].hname || arr[0].name
      },
      styObjCont () {
        return {
          marginTop: `calc(4.8rem + ${this.statusBarHg}px)`,
          paddingBottom: this.rc.pageType === 'learnPage' ? '5.8rem' : 0
        }
      }
    },
    methods: {
      ...mapActions(['getDevCodeLibAndInfo']),
      /** 下发指令 **/
      sendBody (val) {
        if (!this.cmdsKey.includes(val)) return
        if (this.rc.pageType === 'controlPage') {
          if (this.$isVibrate) {
            navigator.vibrate(100)
          }
          let body = {
            batch: {
              controlKey: {
                controlKey: this.tempCmds[val] + ''
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        }
      },
      sendBody2 (val) {
        if (!this.cmdsKey.includes(val)) return
        if (this.rc.pageType === 'learnPage') {
          if (this.$isVibrate) {
            navigator.vibrate(100)
          }
          let body = {
            batch: {
              controlKey: {
                controlKey: this.tempCmds[val] + ''
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
        }
      },
      moreSet () {
        this.$router.push({
          path: '/setting',
          query: {
            name: this.title,
            hid: this.rc.hid,
            devId: this.rc.devId,
            tid: this.rc.tid
          }
        })
      },
      /** 长按事件 **/
      longClickStart (val) {
        if (this.rc.pageType === 'learnPage') {
          if (this.isLearn) return
          this.longClickNum = 0
          this.longClickTimer = setTimeout(() => {
            if (this.$isVibrate) {
              navigator.vibrate(100)
            }
            this.learnBoxText = '将遥控器正对准小苹果在1米以内，按一下相应按键，等待学习完成'
            let body = {
              batch: {
                controlKey: {
                  controlKey: this.tempCmds[val] + '',
                  feedKey: 1
                },
                deviceList: {
                  list: [this.rc]
                }
              }
            }
            sendBodyToDev(body)
            this.longClickNum = 1
            this.curLearnKey = val
            this.isLearn  = true
            this.handleLearnTimeout(val)
          }, 1000)
        }
      },
      longClickEnd (val) {
        console.log('longClickEnd', val)
        if (this.rc.pageType === 'learnPage') {
          if (this.isLearn) return
          clearTimeout(this.longClickTimer);
          this.longClickTimer = null
          if (this.longClickNum === 0) {
            console.log('longClickNum', this.longClickNum)
            this.sendBody2(val)
          }
        }
      },
      /** 添加已学过的码，并且不能重复,保存至localStorage **/
      addHasLearnCodeToLocal () {
        if (this.hasLearnCodes.includes(this.curLearnKey)) {
          window.localStorage.setItem(`learnCode_${this.rc.hid}`, JSON.stringify(this.hasLearnCodes))
        } else {
          this.hasLearnCodes.push(this.curLearnKey)
          window.localStorage.setItem(`learnCode_${this.rc.hid}`, JSON.stringify(this.hasLearnCodes))
        }
      },
      /** 点击返回 **/
      onClickBack () {
        if (this.isLearn) {
          this.tipsBox = true
        } else {
          this.$router.go(-1)
        }
      },
      /** 学习超时处理 **/
      handleLearnTimeout (val) {
        this.learnTimeoutTimer = setInterval(() => {
          this.learnTimeoutCount += 1
          if (this.learnTimeoutCount >= 10) {
            clearInterval(this.learnTimeoutTimer)
            this.learnTimeoutTimer = null
            this.isLearn = false
            this.learnTimeoutCount = 0
            let body = {
              batch: {
                controlKey: {
                  controlKey: this.tempCmds[val] + '',
                  feedKey: 0
                },
                deviceList: {
                  list: [this.rc]
                }
              }
            }
            sendBodyToDev(body)
            this.learnBoxText = '学习失败，请再次长按你想学习的按键，重新学习'
            window.hilink.toast('2', '学习按键失败')
          }
        }, 1000)
      },
      /** 离开页面销毁定时器 **/
      removeTimer () {
        clearInterval(this.learnTimeoutTimer)
        this.learnTimeoutTimer = null
        clearTimeout(this.longClickTimer)
        this.longClickTimer = null
      },
      /** 结束学习 **/
      handleEnd () {
        if (this.isLearn) {
          if (this.$isVibrate) {
            navigator.vibrate(100)
          }
          clearInterval(this.learnTimeoutTimer)
          this.learnTimeoutTimer = null
          this.isLearn = false
          this.learnTimeoutCount = 0
          let body = {
            batch: {
              controlKey: {
                controlKey: this.tempCmds[this.curLearnKey] + '',
                feedKey: 0
              },
              deviceList: {
                list: [this.rc]
              }
            }
          }
          sendBodyToDev(body)
          this.learnBoxText = '长按要学习的按键，进入学习状态，此键会闪烁，等待学习'
          window.hilink.toast('2', '学习按键结束')
        } else {
          this.$router.go(-1)
        }
      }
    },
    beforeDestroy () {
      this.removeTimer()
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-TV
    background #F2F2F2
    setPosUseFlexInit(column)
    setWH()
    -webkit-overflow-scrolling: touch
    overflow-scrolling: touch
    .container
      flex 1
      margin-top 6.8rem
      overflow auto
      .top
        padding 1rem 0
        .tv-switch
          width calc(100%/3)
          setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')
        .input-choose
          width calc(100%/3)
          setBgImgAndText('../../assets/blue/stb-choose.png', '../../assets/white/stb-choose.png')
        .home
          width calc(100%/3)
          setBgImgAndText('../../assets/blue/home.png', '../../assets/white/home.png')
      .channel-voice
        padding 1rem 5rem
        .channel, .voice
          setWH(5.6rem, 15rem)
          background #ffffff
          border-radius 3rem
          setPosUseFlex(column, space-between)
          .text
            setFont(1.3rem, $fontColorTheme2, center)
          .up, .down
            border-radius 50%
            setWH(5.6rem, 5.6rem)
            line-height 5.6rem
            setFont(2.6rem, $fontColorTheme2, center)

        .function
          setWH(5rem, 15rem)
          setPosUseFlex(column, space-between)
          .quiet
            setIcon('../../assets/blue/quiet.png', '../../assets/white/quiet.png')
          .back
            setWH(4rem, 4rem)
            line-height 4rem
      .function
        padding 1rem 2rem
        .mid
          position relative
          setPosUseFlex()
          setWH(18rem, 18rem)
          background #ffffff
          border-radius 50%
          > span
            position absolute
            display inline-block
            setWH(5rem, 5rem)
            line-height 5rem
            setFont(1.2rem, $fontColorTheme2, center, 800)
            border-radius 50%

            &.top-circle
              left 50%
              transform translateX(-50%)
              top 0

            &.left-circle
              left 0
              top: 50%
              transform translateY(-50%)

            &.right-circle
              top: 50%
              transform translateY(-50%)
              right 0

            &.bottom-circle
              bottom 0
              left 50%
              transform translateX(-50%)

          .ok
            setWH(7rem, 7rem)
            setFont(2rem, $fontColorTheme2, center, 300)
            line-height 7rem
            border-radius 50%

        .left
          setWH(5rem, 18rem)
          setPosUseFlex(column, space-between)

          .menu
            setIcon('../../assets/blue/menu.png', '../../assets/white/menu.png')

          .back
            setWH(4rem, 4rem)
            line-height 4rem
            text-align center

        .right
          setWH(5rem, 18rem)
          setPosUseFlex(column, space-between)

          .return
            setIcon('../../assets/blue/return.png', '../../assets/white/return.png')

      .tel-number
        padding 1rem 6rem
        setPosUseFlexInit(row, space-between, center, wrap)

        .item
          setFont(2rem, $fontColorTheme2, center)
          margin-bottom 1rem
          setWH(6.5rem, 6.5rem)
          line-height 6.5rem
          border-radius 50%
</style>
