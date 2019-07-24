<template>
  <!--电视盒子-->
  <div class="dev-box">
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
          <span class="text">{{$t('dev_tvBox.tvBox_power')}}</span>
        </div>
        <div
          class="tv-switch"
          @click="sendBody('tvpower')"
          @touchstart="longClickStart('tvpower')"
          @touchend="longClickEnd('tvpower')"
          :class="[{'btn-disable2': !cmdsKey.includes('tvpower')},{ 'learnActive': isLearn && curLearnKey === 'tvpower'}]">
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
      <div class="volume">
        <div class="box">
          <span
            class="add btn"
            @click="sendBody('vol+')"
            @touchstart="longClickStart('vol+')"
            @touchend="longClickEnd('vol+')"
            :class="[{'btn-disable2': !cmdsKey.includes('vol+')},{ 'learnActive': isLearn && curLearnKey === 'vol+'}]">＋</span>
          <span class="text">{{$t('pub.vol')}}</span>
          <span
            class="sub btn"
            @click="sendBody('vol-')"
            @touchstart="longClickStart('vol-')"
            @touchend="longClickEnd('vol-')"
            :class="[{'btn-disable2': !cmdsKey.includes('vol-')},{ 'learnActive': isLearn && curLearnKey === 'vol-'}]">—</span>
        </div>
      </div>
      <div class="flex function">
        <div class="left">
          <span
            class="home"
            @click="sendBody('boot')"
            @touchstart="longClickStart('boot')"
            @touchend="longClickEnd('boot')"
            :class="[{'btn-disable2': !cmdsKey.includes('boot')},{ 'learnActive': isLearn && curLearnKey === 'boot'}]"></span>
          <span
            class="menu btn"
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
          class="quiet"
          @click="sendBody('mute')"
          @touchstart="longClickStart('mute')"
          @touchend="longClickEnd('mute')"
          :class="[{'btn-disable2': !cmdsKey.includes('mute')},{ 'learnActive': isLearn && curLearnKey === 'mute'}]"></span>
          <span
            class="return"
            @click="sendBody('back')"
            @touchstart="longClickStart('back')"
            @touchend="longClickEnd('back')"
            :class="[{'btn-disable2': !cmdsKey.includes('back')},{ 'learnActive': isLearn && curLearnKey === 'back'}]"></span>
        </div>
      </div>
      <!-- 扩展键 -->
      <div style="padding: 2.4rem 4.2rem 0 4.2rem">
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
      <!-- 额外功能 -->
      <div class="extend-fn" v-if="false">
        <div class="left">
          <span>延时开机</span>
          <p>01:30</p>
        </div>
        <div class="right" v-if="false">
          <span>开机时长</span>
          <p>01:30</p>
        </div>
      </div>
    </div>
    <!-- learn底层提示 -->
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
    name: 'device10',
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
        tempCmds: ['back','boot','down','left','menu','ok','power','right','up','vol+','vol-',
          'mute','tvpower','av/tv','signal'],
        oldTempCmds: {
          'back': 1,
          'boot': 2,
          'down': 3,
          'left': 4,
          'menu': 5,
          'ok': 6,
          'power': 7,
          'right': 8,
          'up': 9,
          'vol+': 10,
          'vol-': 11,
          'mute': 12,
          'tvpower': 13,
          'av/tv': 14,
          'signal': 15
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-box
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2
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

          .home
            setIcon('../../assets/blue/home.png', '../../assets/white/home.png')

          .menu
            setIcon('../../assets/blue/menu.png', '../../assets/white/menu.png')

        .right
          setWH(5rem, 18rem)
          setPosUseFlex(column, space-between)

          .return
            setIcon('../../assets/blue/return.png', '../../assets/white/return.png')

          .quiet
            setIcon('../../assets/blue/quiet.png', '../../assets/white/quiet.png')

      .volume
        margin-bottom 1rem
        setPosUseFlexInit(row, center)

        .box
          setPosUseFlex(column, space-between)
          setWH(5.6rem, 15rem)
          background #fff
          border-radius 3rem

          .text
            setFont(1.3rem, $fontColorTheme2, center)

          .add, .sub
            border-radius 50%
            setWH(5.6rem, 5.6rem)
            line-height 5.6rem
            setFont(2.6rem, $fontColorTheme2, center)
      .extend-fn
        setPosUseFlex(row, space-between)
        padding 3.2rem 6rem
        .left
        .right
          height 8rem
          width 8rem
          border-radius .8rem
          font-size 1.2rem
          setPosUseFlex()
          &:active
            background-color rgba(0,0,0,.1)
        .left
        .right
          border 1px solid #fff
          p
            font-size 1.6rem
</style>
