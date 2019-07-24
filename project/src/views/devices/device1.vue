<template>
  <!--机顶盒-->
  <div class="dev-STB">
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <div class="container" :style="styObjCont">
      <div class="top flex">
        <div
          class="stb-switch"
          @click="sendBody('power')"
          @touchstart="longClickStart('power')"
          @touchend="longClickEnd('power')"
          :class="[{'btn-disable2': !cmdsKey.includes('power')},{ 'learnActive': isLearn && curLearnKey === 'power'}]">
          <span class="img-box"></span>
          <span class="text">{{$t('dev_stbBox.stbBox_power')}}</span>
        </div>
        <div
          class="tv-switch"
          @click="sendBody('tvpower')"
          @touchstart="longClickStart('tvpower')"
          @touchend="longClickEnd('tvpower')"
          :class="[{'btn-disable2': !cmdsKey.includes('tvpower') && !cmdsKey.includes('av/tv')},{ 'learnActive': isLearn && curLearnKey === 'tvpower'}]">
          <span class="img-box"></span>
          <span class="text">{{$t('pub.tv_power')}}</span>
        </div>
        <div
          class="input-choose"
          @click="sendBody('signal')"
          @touchstart="longClickStart('signal')"
          @touchend="longClickEnd('signal')"
          :class="[{'btn-disable2': !cmdsKey.includes('signal')},{ 'learnActive': isLearn && curLearnKey === 'signal'}]">
          <span class="img-box"></span>
          <span class="text">{{$t('pub.source')}}</span>
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
          <span class="text">{{$t('pub.ch')}}</span>
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
            class="home"
            @click="sendBody('boot')"
            @touchstart="longClickStart('boot')"
            @touchend="longClickEnd('boot')"
            :class="[{'btn-disable2': !cmdsKey.includes('boot')},{ 'learnActive': isLearn && curLearnKey === 'boot'}]"></span>
        </div>
        <div class="voice">
          <span
            class="up btn"
            @click="sendBody('vol+')"
            @touchstart="longClickStart('vol+')"
            @touchend="longClickEnd('vol+')"
            :class="[{'btn-disable2': !cmdsKey.includes('vol+')},{ 'learnActive': isLearn && curLearnKey === 'vol+'}]">＋</span>
          <span class="text">{{$t('pub.vol')}}</span>
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
          <span
            class="back btn"
            @click="sendBody('exit')"
            @touchstart="longClickStart('exit')"
            @touchend="longClickEnd('exit')"
            :class="[{'btn-disable2': !cmdsKey.includes('exit')},{ 'learnActive': isLearn && curLearnKey === 'exit'}]">{{$t('pub.exit')}}</span>
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
            :class="[{'btn-disable2': !cmdsKey.includes('back')},{ 'learnActive': isLearn && curLearnKey === 'back'}]"></span>
        </div>
      </div>
      <div class="btn-forward-back-off flex">
        <span
          class="back-off"
          @click="sendBody('rew')"
          @touchstart="longClickStart('rew')"
          @touchend="longClickEnd('rew')"
          :class="[{'btn-disable2': !cmdsKey.includes('rew')},{ 'learnActive': isLearn && curLearnKey === 'rew'}]"></span>
        <div
          class="play"
          @click="sendBody('play')"
          @touchstart="longClickStart('play')"
          @touchend="longClickEnd('play')"
          :class="[{'btn-disable2': !cmdsKey.includes('play')},{ 'learnActive': isLearn && curLearnKey === 'play'}]">
          <img src="../../assets/blue/play.png" alt="">
        </div>
        <span
          class="forward"
          @click="sendBody('ff')"
          @touchstart="longClickStart('ff')"
          @touchend="longClickEnd('ff')"
          :class="[{'btn-disable2': !cmdsKey.includes('ff')},{ 'learnActive': isLearn && curLearnKey === 'ff'}]"></span>
      </div>
      <!-- 数字键 -->
      <div class="tel-number">
        <span
          class="item btn"
          v-for="(item, idx) of telNumber"
          :key="idx"
          @click="sendBody(item)"
          @touchstart="longClickStart(item)"
          @touchend="longClickEnd(item)"
          :class="[{'btn-disable2': !cmdsKey.includes(item)},{ 'learnActive': isLearn && curLearnKey === item}]">{{item}}</span>
      </div>
      <!-- 扩展键 -->
      <div style="padding: 0 4.2rem; margin-top: 1.2rem">
        <app-expand-key
          @click-fn="sendBody"
          @touchstart-fn="longClickStart"
          @touchend-fn="longClickEnd"
          :expandKeys="expandKeys"
          :cmds="cmds"
          :isLearn="isLearn"
          :curLearnKey="curLearnKey"
          v-if="expandKeys.length > 0">
        </app-expand-key>
      </div>
    </div>
    <!-- 底层提示 -->
    <appLearnTips
      v-if="rc.pageType === 'learnPage'"
      :learnBoxText="learnBoxText"
      :stage="learnStage"
      :btnText="isLearn? $t('component.end') : $t('component.finish')"
      @handle-end="handleEnd"></appLearnTips>
    <!-- match底层提示 -->
    <appMatchTips
      v-if="rc.pageType === 'matchPage'"
      :curNum="curNum"
      :total="secondListTotal"
      :typeName="typeName"
      @handle-left="handleLeft"
      @handle-right="handleRight"
      @handle-mid="handleMid"></appMatchTips>
    <!-- 返回提示框 -->
    <transition name="fade">
      <appTipsBox :hintText="hintText" v-if="tipsBox" @handle-sure="tipsBox = false"></appTipsBox>
    </transition>
    <!-- 加载中 -->
    <app-loading2 v-if="loadingFlag"></app-loading2>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import appTipsBox from '@/components/appTipsBox'
  import appLearnTips from '@/components/appLearnTips'
  import appMatchTips from '@/components/appMatchTips'
  import appLoading2 from '@/components/appLoading2'
  import appExpandKey from '@/components/appExpandKey'
  import { viewsMixin } from '@/utils/mixin'
  export default {
    name: 'device1',
    mixins: [viewsMixin],
    components: {
      appHeader,
      appTipsBox,
      appLearnTips,
      appMatchTips,
      appLoading2,
      appExpandKey
    },
    data () {
      return {
        telNumber: ['1', '2', '3', '4', '5', '6', '7', '8', '9','*','0','#'],
        tempCmds: ['0','1','2','3','4','5','6','7','8','9','#',
          '*','back','ch+','ch-','down','exit','left','menu',
          'mute','ok','play','power','right','up','vol+','vol-',
          'tvpower', 'av/tv','signal','ff','rew','boot'],
        oldTempCmds: {
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
          'pause': 23,
          'play': 24,
          'power': 25,
          'right': 26,
          'stop': 27,
          'up': 28,
          'vol+': 29,
          'vol-': 30,
          'blue': 31,
          'vv': 32,
          'yellow': 33,
          'epg': 34,
          'ff': 35,
          'green': 36,
          'guide': 37,
          'help': 38,
          'info': 39,
          'itv': 40,
          'next': 41,
          'previous': 42,
          'rec': 43,
          'red': 44,
          'rew': 45,
          'search': 46,
          'tvpower': 47,
          'av/tv': 48,
          'signal': 49
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-STB
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
        .stb-switch, .tv-switch
          width calc(100%/3)
          setBgImgAndText('../../assets/blue/stb-switch.png', '../../assets/white/stb-switch.png')
        .input-choose
          width calc(100%/3)
          setBgImgAndText('../../assets/blue/stb-choose.png', '../../assets/white/stb-choose.png')
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
          .home
            setIcon('../../assets/blue/home.png', '../../assets/white/home.png')

      .function
        padding 1rem 2rem
        .mid
          position relative
          setPosUseFlex()
          setWH(18rem, 18rem)
          background #ffffff
          border-radius 50%
          >span
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

      .btn-forward-back-off
        padding 1rem 2rem
        .forward
          setIcon('../../assets/blue/forward.png', '../../assets/white/forward.png', 4rem)
        .play
          setWH(12rem, 4rem)
          border-radius 2.5rem
          background-color: #fff;
          display: flex;
          justify-content: center
          align-items center
          &:active
            background-color: $bgActiveColor;
          img
            width 4rem
        .back-off
          setIcon('../../assets/blue/back-off.png', '../../assets/white/back-off.png', 4rem)
      .tel-number
        padding 1rem 6rem
        setPosUseFlexInit(row, space-between, center, wrap)
        .item
          setFont(1.5rem, $fontColorTheme2, center)
          margin-bottom 1rem
          setWH(30%, 4rem)
          line-height 4rem
          border-radius 2.5rem
</style>
