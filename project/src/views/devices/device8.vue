<template>
  <!--灯泡-->
  <div class="dev-light">
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <div class="banner">
      <img src="../../assets/devIcon2/8.png" alt="light.png">
    </div>
    <div class="container">
      <div>
        <span
          class="switch-on btn"
          @click="sendBody('power')"
          @touchstart="longClickStart('power')"
          @touchend="longClickEnd('power')"
          :class="[{'btn-disable2': !cmdsKey.includes('power')},{ 'learnActive': isLearn && curLearnKey === 'power'}]">开</span>
        <span
          class="switch-off btn"
          @click="sendBody('poweroff')"
          @touchstart="longClickStart('poweroff')"
          @touchend="longClickEnd('poweroff')"
          :class="[{'btn-disable2': !cmdsKey.includes('poweroff')},{ 'learnActive': isLearn && curLearnKey === 'poweroff'}]">关</span>
      </div>
      <div class="power-box">
        <span
          class="power"
          @click="sendBody('powerOnOff')"
          @touchstart="longClickStart('powerOnOff')"
          @touchend="longClickEnd('powerOnOff')"
          :class="[{'btn-disable2': !cmdsKey.includes('powerOnOff')},{ 'learnActive': isLearn && curLearnKey === 'powerOnOff'}]"></span>
      </div>
    </div>
    <!-- learn底层提示 -->
    <appLearnTips
      v-if="rc.pageType === 'learnPage'"
      :learnBoxText="learnBoxText"
      :btnText="isLearn? '结束' : '完成'"
      @handle-end="handleEnd"></appLearnTips>
    <!-- match底层提示 -->
    <appMatchTips
      v-if="rc.pageType === 'matchPage'"
      :curNum="curNum"
      :total="secondListTotal"
      @handle-left="handleLeft"
      @handle-right="handleRight"
      @handle-mid="handleMid"></appMatchTips>
    <!-- 返回提示框 -->
    <transition name="fade">
      <appTipsBox hintText="正在学习，请勿离开！" v-if="tipsBox" @handle-sure="tipsBox = false"></appTipsBox>
    </transition>
    <!-- 加载中 -->
    <appLoading loadingTxt="正在匹配中..." v-if="loadingFlag"></appLoading>
  </div>
</template>

<script>
  import appHeader from '@/components/appHeader'
  import appTipsBox from '@/components/appTipsBox'
  import appLearnTips from '@/components/appLearnTips'
  import appMatchTips from '@/components/appMatchTips'
  import appLoading from '@/components/appLoading'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device8',
    mixins: [viewsMixin],
    components: {
      appHeader,
      appTipsBox,
      appLearnTips,
      appMatchTips,
      appLoading
    },
    data () {
      return {
        tempCmds: {
          'power': 1,
          'poweroff': 2,
          'powerOnOff': 3
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-light
    setWH()
    setPosUseFlexInit(column)
    background #F2F2F2
    -webkit-overflow-scrolling: touch
    overflow-scrolling: touch
    .banner
      setWH(100%, 28rem)
      setPosUseFlex()
      imgUrl("../../assets/background.png")

      img
        setWH(20rem, 20rem)
        transform translateY(1.8rem)

    .container
      flex 1
      padding 6rem

      > div
        setPosUseFlexInit(row, space-between, center)

        .switch-on, .switch-off
          background #fff
          setWH(8rem, 8rem)
          line-height 8rem
          setFont(2rem, $fontColorTheme2, center)
          border-radius 50%

      .power-box
        justify-content center
        margin-top 2rem
        border-radius 50%

        .power
          setIcon('../../assets/blue/fan-switch.png', '../../assets/white/fan-switch.png', 8rem, 4rem)
</style>
