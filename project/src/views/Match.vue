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
import { sendBodyToDev, RC, numArr, getExtendToServe, parseHilinkData, postExtendToServe } from '../utils/pub'
export default {
  name: 'Match',
  data () {
    return {
      total: '--',
      modeList: [],
      currentNum: 0,
      rc: {},
      allowIndexArr: [] // 可选index集合
    }
  },
  components: {
    appHeader
  },
  computed: {
    ...mapState(['tid','appDevId']),
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
    },
    currentRid () {
      return this.modeList[this.currentNum - 1].rid
    }
  },
  created () {
    this.getDevModeList(this.$route.query.bid)
      .then(data => {
        this.total = data.length
        this.modeList = data
      })
    getExtendToServe().then(data => {
      let arr = data.map(item => item.index)
      console.log('jjjj', arr)
      if (this.tid !== 7) {
        this.allowIndexArr = this._.difference(numArr(28), arr)
      } else {
        this.allowIndexArr = this._.difference([29, 30], arr)
      }
      console.log('allowIndexArr', this.allowIndexArr)
    })
  },
  mounted () {
    window.deviceEventCallback = res => {
      let loadResObj = parseHilinkData(res)
      console.log('loadRes', loadResObj)
      if (loadResObj.sid === 'loadRes') {
        let obj = loadResObj.data.loadRes
        if (obj.isFinish === 1) {
          this.registerVirtualDev().then(data => {
            this.rc.devId = data.devId
            console.log('第二个RC', this.rc)
            this.postYkDevToServe().then(data2 => {
              postExtendToServe(this.rc).then(data3 => {
              })
            })
          })
        }
      }
    }
  },
  methods: {
    ...mapActions(['getDevModeList', 'getDevCodeLibAndInfo']),
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
      sendBodyToDev(body)
    },
    nextFun () {
      this.getDevCodeLibAndInfo(this.currentRid)
        .then(data => {
          this.rc = new RC(data.rid, data.name, data.be_rmodel, data.rmodel, data.bid, +data.be_rc_type)
          this.rc.index = this.allowIndexArr[0]
          console.log('第一个RC', this.rc)
          this.setUrlDomainToDev(this.rc)
        })
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
              domain: 'http://hwh5.yaokantv.com',
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
      sendBodyToDev(body)
    },
    /** 注册虚拟设备到九宫格 **/
    registerVirtualDev () {
      return new Promise(resolve => {
        let body = {
          devInfo: {
            sn: this.rc.hid,
            model: this.rc.name,
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
        window.registerCallback = res => {
          console.log('registerCallback', res)
          let r_data = parseHilinkData(res)
          if (r_data.errcode === 0) {
            resolve(r_data)
          } else {
            console.log('注册失败')
          }
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
    /**云端上传遥控设备**/
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
        window.postDeviceExtendDataByIdCallback = res => {
          console.log('postDeviceExtendDataByIdCallback', parseHilinkData(res))
          let data = parseHilinkData(res)
          if (data.errcode === 0) {
            resolve(data)
          } else {
            console.log('上传遥控设备失败')
          }
        }
        window.hilink.postDeviceExtendDataById(this.rc.devId, JSON.stringify(body), 'postDeviceExtendDataByIdCallback')
      })
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
