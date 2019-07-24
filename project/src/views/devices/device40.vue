<template>
  <div class="dev-hot">
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <appBanner></appBanner>
    <div class="container" :style="styObjCont2">
      <appTempsAdjust
        @handle-click="sendBody"
        @handle-start="longClickStart"
        @handle-end="longClickEnd"
      ></appTempsAdjust>
      <div class="power">
        <appPower
          @handle-power="sendBody"
          @touchstart-fn="longClickStart"
          @touchend-fn="longClickEnd"
          ></appPower>
      </div>
      <!-- 扩展键 -->
      <div style="padding: 0 2rem">
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
      :btnText="isLearn? '结束' : '完成'"
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
  import appBanner from '@/components/appBanner'
  import appTempsAdjust from '@/components/appTempsAdjust'
  import appPower from '@/components/small/appPower'
  import appExpandKey from '@/components/appExpandKey'
  import appTipsBox from '@/components/appTipsBox'
  import appLearnTips from '@/components/appLearnTips'
  import appMatchTips from '@/components/appMatchTips'
  import appLoading2 from '@/components/appLoading2'
  import { viewsMixin } from '@/utils/mixin'
  export default {
    name: "device40",
    mixins: [viewsMixin],
    components: {
      appHeader,
      appBanner,
      appTempsAdjust,
      appPower,
      appExpandKey,
      appTipsBox,
      appLearnTips,
      appMatchTips,
      appLoading2
    },
    data () {
      return {
        tempCmds: ['power','temp-','temp+'],
        oldTempCmds: {
          'power': 1,
          'temp-': 2,
          'temp+': 3
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
 .dev-hot
   setWH()
   background #F2F2F2
   -webkit-overflow-scrolling: touch
   overflow-scrolling: touch
   .container
     position absolute
     top: 28rem
     height calc(100% - 28rem)
     width 100%
     padding 2.4rem 1.6rem 0 1.6rem
     overflow scroll
     background-color: $bgColorTheme;
     .power
       width 100%
       display: flex
       justify-content center
       margin 4.2rem 0
</style>
