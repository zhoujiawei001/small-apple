<template>
  <!--风扇-->
  <div class="dev-fan">
    <appHeader
      :title="title"
      :curPageType="rc.pageType"
      @back-icon="onClickBack"
      @set="moreSet"></appHeader>
    <div class="banner">
      <img src="../../assets/devIcon2/6.png" alt="fan.png">
    </div>
    <div class="container">
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
          <p>电源</p>
        </div>
        <div class="right" style="visibility: hidden;">
          <span>开机时长</span>
          <p>01:30</p>
        </div>
      </div>
      <ul class="btn-extend">
        <li
          v-for="(item, index) in extendsList"
          @click="sendBody(item.value)"
          @touchstart="longClickStart(item.value)"
          @touchend="longClickEnd(item.value)"
          :class="[{'btn-disable2': !cmdsKey.includes(item.value)},{ 'learnActive': isLearn && curLearnKey === item.value}]"
          :key="index">
          {{item.text}}
        </li>
      </ul>
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
    name: 'device6',
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
        // extendsList: ['风速', '摆头', '风类', '睡眠', '灯光', '负离子'],
        extendsList: [
          {
            text: '风速',
            value: 'fanspeed'
          },
          {
            text: '摆头',
            value: 'oscillation'
          },
          {
            text: '风类',
            value: 'mode'
          },
          {
            text: '睡眠',
            value: 'sleep'
          },
          {
            text: '灯光',
            value: 'light'
          },
          {
            text: '负离子',
            value: 'anion'
          }
        ],
        tempCmds: {
          "fanspeed": 1,
          "mode": 2,
          "mute": 3,
          "oscillation": 4,
          "power": 5,
          "poweroff": 6,
          "timer": 7,
          "anion": 8,
          "light": 9,
          "sleep": 10
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
      padding 3.2rem 1.6rem 0 1.6rem
      background-color #F2F2F2
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
      .btn-extend
        padding 4.6rem 2.4rem 0 2.4rem
        display flex
        flex-wrap wrap
        justify-content space-around
        li
          width 26.5%
          height 3.6rem
          background-color: #fff;
          border-radius 3.6rem
          line-height 3.6rem
          text-align center
          font-size 1.2rem
          &:active
            background-color rgba(0,0,0,.1)
        li:nth-child(-n+3)
          margin-bottom 1.8rem
        /*li:nth-child(2)*/
          /*margin 0 2rem 1.8rem 2rem*/
        li:nth-child(n+4)
          margin-top 1.8rem
        /*li:nth-child(5)*/
          /*margin 1.8rem 2rem 0 2rem*/
</style>
