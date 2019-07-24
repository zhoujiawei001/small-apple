<template>
  <!--风扇-->
  <div class="dev-fan">
    <!-- 头部 -->
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <!-- 广告图片 -->
    <appBanner></appBanner>
    <div class="container" :style="styObjCont2">
      <div class="btn-standard">
        <div class="left" style="visibility: hidden;">
          <span>延时开机</span>
          <p>01:30</p>
        </div>
        <div
          class="middle"
          @click="sendBody('power')"
          @touchstart="longClickStart('power')"
          @touchend="longClickEnd('power')"
          :class="[{'btn-disable2': !cmdsKey.includes('power')},{ 'learnActive': isLearn && curLearnKey === 'power'}]">
          <img src="../../assets/fan-switch-off.png" alt="">
          <p>{{$t('pub.power')}}</p>
        </div>
        <div class="right" style="visibility: hidden;">
          <span>开机时长</span>
          <p>01:30</p>
        </div>
      </div>
      <ul class="btn-normal">
        <li
          v-for="(item, index) in fnList"
          :key="index">
          <span
            @click="sendBody(item.value)"
            @touchstart="longClickStart(item.value)"
            @touchend="longClickEnd(item.value)"
            :class="[{'btn-disable2': !cmdsKey.includes(item.value)},{ 'learnActive': isLearn && curLearnKey === item.value}]">{{$t(`dev_fan.${item.value}`)}}</span>
        </li>
      </ul>
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
    name: 'device6',
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
        fnList: [
          {
            text: '风速',
            value: 'speed'
          },
          {
            text: '模式',
            value: 'mode'
          },
          {
            text: '定时',
            value: 'timer'
          },
          {
            text: '摇头',
            value: 'oscillation'
          }
        ],
        tempCmds: ['power', 'poweroff','fanspeed','mode','timer','oscillation'],
        oldTempCmds: {
          'fanspeed': 1,
          'mode': 2,
          'mute': 3,
          'oscillation': 4,
          'power': 5,
          'poweroff': 6,
          'timer': 7
        }
      }
    },
    methods: {
      onclickExtendBtn(idx) {
        console.log(idx)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-fan
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
      .btn-standard
        setPosUseFlex(row, space-between)
        .left
        .middle
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
        .middle
          background-color: #fff;
          img
            width 3.2rem
      .btn-normal
        padding 3.8rem 4.2rem 0 4.2rem
        display flex
        flex-wrap wrap
        justify-content space-around
        li
          width 50%
          font-size 1.4rem
          display flex
          justify-content center
          span
            display: inline-block;
            setWH(8.6rem, 4.4rem)
            background-color: #fff;
            border-radius 4.4rem
            line-height 4.4rem
            text-align center
            &:active
              background-color rgba(0,0,0,.1)
        li:nth-child(-n + 2)
          margin-bottom 2.4rem
</style>
