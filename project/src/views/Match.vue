<template>
  <div class="dev-match">
    <appHeader
      title="逐个匹配"
      :hiddenMore="true"></appHeader>
    <div class="mt-section_1">
      <div class="icon-text">
        <img :src="require(`../assets/devIcon/${tid}.png`)" alt="">
        <p class="text">{{$route.query.zh}} {{$route.query.en}} {{typeName}}</p>
      </div>
      <div class="dec">
        <p>匹配前，请将{{typeName}}电源打开</p>
        <p>{{typeDec}}</p>
        <p>表示匹配成功， 点击 “下一步”</p>
      </div>
    </div>
    <div class="mt-section_2">
      <div class="container">
        <span class="number">{{currentNum}}/{{total}}</span>
        <div class="btn-plus" @click="sendCode('plus')">
          <img src="../assets/match_plus.png" alt="">
        </div>
        <div class="btn-reduce" @click="sendCode('reduce')">
          <img src="../assets/match_reduce.png" alt="">
        </div>
        <div class="text">
          正在匹配请勿离开
        </div>
        <div class="btn-next" @click="nextFun">
          下一步
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Match',
  data () {
    return {
      total: '--',
      modeList: [],
      currentNum: 0
    }
  },
  components: {
    appHeader
  },
  computed: {
    ...mapState(['tid']),
    typeName () {
      let obj = {
        1: '电视机顶盒',
        2: '电视机',
        6: '风扇',
        7: '空调',
        8: '灯泡',
        10: '电视盒子'
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
        10: '如果盒子打开或关闭'
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
    }
  },
  created () {
    this.getDevModeList(this.$route.query.bid)
      .then(data => {
        this.total = data.length
        this.modeList = data
      })
  },
  methods: {
    ...mapActions(['getDevModeList']),
    sendCode (val) {
      if (val === 'plus') {
        this.currentNum ++
        if (this.currentNum > this.total) {
          this.currentNum = 1
        }
      } else {
        this.currentNum --
        if (this.currentNum < 1) {
          this.currentNum = this.total
        }
      }
      console.log('currentNum', this.currentNum)
      console.log('currentCmd', this.currentCmd)
      console.log('currentCmdKeyArr', this.currentCmdKeyArr)
      console.log('currentCode', this.currentCode)
      console.log('currentZip', this.currentZip)
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
      console.log(body)
      try {
        window.hilink.setDeviceInfo('0', JSON.stringify(body), 'app.setDeviceInfoCallback')
      } catch (e) {
        console.warn('无setDeviceInfo接口')
      }
    },
    nextFun () {
    }
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
        color $fontColorTheme
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
    height calc(100% - 22.8rem)
    background-color: $bgColorTheme;
    position relative
    .container
      display flex
      align-items center
      flex-direction column
      color $fontColorTheme
      font-size 1.2rem
      setCenterUsePosition2()
      .number
        font-size 3.2rem
      .btn-reduce
      .btn-plus
        width 10.2rem
        height 8.4rem
        background-color: #fff;
        border-radius 1.2rem
        position relative
        img
          setCenterUsePosition2()
          width 5.4rem
      .btn-plus
        margin 2.2rem 0
      .text
        margin 2.4rem 0
        color $fontColorTheme
        font-weight bold
      .btn-next
        width 10.2rem
        height 3.6rem
        border-radius 2rem
        line-height 3.6rem
        text-align center
        background-color: #fff;
</style>
