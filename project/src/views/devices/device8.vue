<template>
  <!--灯泡-->
  <div class="dev-light">
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <appBanner></appBanner>
    <div class="container" :style="styObjCont2">
      <div class="normal_fn">
        <div class="power-box1">
          <span
            class="switch-on btn"
            @click="sendBody('power')"
            @touchstart="longClickStart('power')"
            @touchend="longClickEnd('power')"
            :class="[{'btn-disable2': !cmdsKey.includes('power')},{ 'learnActive': isLearn && curLearnKey === 'power'}]">{{$t('pub.on')}}</span>
          <span
            class="switch-off btn"
            @click="sendBody('poweroff')"
            @touchstart="longClickStart('poweroff')"
            @touchend="longClickEnd('poweroff')"
            :class="[{'btn-disable2': !cmdsKey.includes('poweroff')},{ 'learnActive': isLearn && curLearnKey === 'poweroff'}]">{{$t('pub.off')}}</span>
        </div>
        <div class="power-box2">
          <span
            class="power"
            @click="sendBody('powerOnOff')"
            @touchstart="longClickStart('powerOnOff')"
            @touchend="longClickEnd('powerOnOff')"
            :class="[{'btn-disable2': !cmdsKey.includes('powerOnOff')},{ 'learnActive': isLearn && curLearnKey === 'powerOnOff'}]"></span>
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
  import appBanner from '@/components/appBanner'
  import { viewsMixin } from '@/utils/mixin'

  export default {
    name: 'device8',
    mixins: [viewsMixin],
    components: {
      appHeader,
      appTipsBox,
      appLearnTips,
      appMatchTips,
      appLoading2,
      appExpandKey,
      appBanner
    },
    data () {
      return {
        tempCmds: ['power','poweroff','powerOnOff'],
        oldTempCmds: {
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
    background #F2F2F2
    -webkit-overflow-scrolling: touch
    overflow-scrolling: touch
    .container
      position absolute
      top: 28rem
      height calc(100% - 28rem)
      width 100%
      padding-top 2.4rem
      overflow scroll
      .normal_fn
        width 100%
        .power-box1
          padding 0 6rem
          display: flex
          justify-content space-between
          .switch-on, .switch-off
            display inline-block
            background #fff
            setWH(8rem, 8rem)
            line-height 8rem
            setFont(2rem, $fontColorTheme2, center)
            border-radius 50%
        .power-box2
          display flex
          justify-content center
          margin-top 2rem
          border-radius 50%
          .power
            display inline-block
            setIcon('../../assets/blue/fan-switch.png', '../../assets/white/fan-switch.png', 8rem, 4rem)
</style>
