<template>
  <div class="setting">
    <!-- 头部 -->
    <appHeader2 style="background-color: #f2f2f2" @back-icon="$router.go(-1)" :title="$t('setting.set')"></appHeader2>
    <!-- 中部 -->
    <main
      :style="styObj">
      <div class="name flex scale-1px" @click="showInput()">
        <span class="left">{{$t('setting.control_name')}}</span>
        <span class="right">{{devName}}</span>
        <span class="arrow-right"></span>
      </div>
      <div class="delete flex scale-1px" @click="delFlag=true">
        <span class="left">{{$t('setting.remove_dev')}}</span>
        <span class="arrow-right"></span>
      </div>
      <div
        class="delete flex"
        style="border: none"
        :class="{'btn-disable': $route.query.tid === 7}"
        @click="goToLearnPage">
        <span class="left" >{{$t('setting.learn')}}</span>
        <span class="arrow-right"></span>
      </div>
    </main>
    <!-- 弹出框部分 -->
    <div class="modify-devName__Adr" v-if="modifyFlagAdr">
      <div class="container">
        <div class="title">{{$t('setting.control_name')}}</div>
        <div class="input-box">
          <input
            ref="input"
            type="text"
            :placeholder="$t('setting.form_placeholder')"
            v-model="inputValue"
            @input="handleInput()">
        </div>
        <div class="warn" v-show="warnValue === 1">{{$t('setting.form_tips')}}</div>
        <div class="warn" v-show="warnValue === 2">{{$t('setting.form_tips2')}}</div>
        <div class="warn" v-show="warnValue === 3">{{$t('setting.form_tips3')}}</div>
        <div class="btn-groups__adr">
          <span class="left" @click="cancelModify()">{{$t('pub.cancel')}}</span>
          <span class="middle"></span>
          <span class="right" @click="confirmModify()">{{$t('pub.sure')}}</span>
        </div>
      </div>
    </div>
    <div class="modify-devName__Ios" v-if="modifyFlagIos">
      <div class="container">
        <div class="title">{{$t('setting.control_name')}}</div>
        <div class="input-box scale-1px">
          <input
            ref="input"
            type="text"
            :placeholder="$t('setting.form_placeholder')"
            v-model="inputValue"
            @input="handleInput()">
        </div>
        <div class="btn-groups__ios">
          <span class="left" @click="cancelModify()">{{$t('pub.cancel')}}</span>
          <span class="middle"></span>
          <span class="right" @click="confirmModify()">{{$t('pub.sure')}}</span>
        </div>
      </div>
    </div>
    <div class="del-dev" v-show="delFlag">
      <div class="container">
        <div class="title">{{$t('setting.remove_dev')}}</div>
        <div class="info">{{$t('setting.remove_tips')}}</div>
        <div class="btn-groups">
          <span class="left" @click="delFlag=false">{{$t('pub.cancel')}}</span>
          <span class="middle"></span>
          <span class="right" @click="confirmDel()">{{$t('pub.remove')}}</span>
        </div>
      </div>
    </div>
    <appLoading :loadingTxt="$t('setting.removing')" v-show="loadingFlag"></appLoading>
  </div>
</template>

<script>
  import appLoading from '@/components/appLoading'
  import appHeader2 from '@/components/appHeader2'
  import { mapState,mapGetters } from 'vuex'
  import { modifyDevName, getExtendToServe, delAddedDev, isAndroid } from '@/utils/pub'
  const regEn = /[/""{}\\]/;
  const regAllSpace = /^[ ]+$/;
  export default {
    name: 'Setting',
    components: {
      appLoading,
      appHeader2
    },
    data () {
      return {
        devName: '',
        inputValue: '',
        modifyFlagAdr: false,
        modifyFlagIos: false,
        delFlag: false,
        warnValue: 0, // 0-输入字符格式正确，1-请输入1-64位字符，2-遥控器名称不能包含特殊字符，3-遥控器名称不能全为空格
        loadingFlag: false,
        devId: this.$route.query.devId,
        hid: this.$route.query.hid
      }
    },
    created () {
      this.devName = this.inputValue = this.$route.query.name
      window.modifyDeviceNameByDevIdCallback = (res) => {
        const _res = JSON.parse(res)
        if (!_res.errcode) {
          modifyDevName(this.hid, this.inputValue).then((data) => {
            if (data.errcode === 0) {
              getExtendToServe().then(data => {
                console.log('修改成功', data)
                if (isAndroid()) {
                  this.modifyFlagAdr = false
                } else {
                  this.modifyFlagIos = false
                }
                this.devName = this.inputValue
                this.$store.commit('setAddedDevList', data)
                window.hilink.toast('2', this.$t('component.modified_success'))
              })
            }
          })
        }
      }
      window.deleteInfraredHubDeviceCallback = (res) => {
        const _res = JSON.parse(res)
        console.log('deleteInfrared_result', _res)
        if (!_res.errcode) {
          delAddedDev(this.hid).then(data => {
            if (data.errcode === 0) {
              getExtendToServe().then(data => {
                this.$store.commit('setAddedDevList', data)
                this.delLocalData()
                this.loadingFlag = false
                this.$router.push('/')
              })
            } else {
              this.loadingFlag = false
              window.hilink.toast('2', this.$t('component.delete_failed'))
            }
          })
        } else {
          this.loadingFlag = false
          window.hilink.toast('2', this.$t('component.delete_failed'))
        }
      }
    },
    mounted () {
      console.log('query', this.$route.query)
      if (isAndroid()) {
        console.log('这是安卓')
      } else {
        console.log('这是IOS')
      }
    },
    computed: {
      ...mapState(['statusBarHg', 'addedDevList']),
      ...mapGetters(['screenRem']),
      queryObj () {
        let newList = this.addedDevList.filter(item => item.hid === this.hid)
        newList[0].pageType = 'learnPage'
        return newList[0]
      },
      styObj () {
        return {
          top: 4.8 * this.screenRem + this.statusBarHg + 'px',
          height: `calc(100% - ${4.8 * this.screenRem + this.statusBarHg + 'px'})`
        }
      }
    },
    methods: {
      // 监听输入
      handleInput () {
        this.warnValue = 0;
      },
      // 确定改名
      confirmModify () {
        const val = this.$refs.input.value
        if (isAndroid()) {
          if (val.length === 0 || val.length > 64) {
            this.warnValue = 1;
          } else if (regEn.test(val)){
            this.warnValue = 2;
          } else if (regAllSpace.test(val)) {
            this.warnValue = 3;
          } else {
            this.warnValue = 0;
          }
        } else {
          if (val.length === 0 || val.length > 64) {
            this.warnValue = 1;
            window.hilink.toast('2', this.$t('setting.form_tips'))
          } else if (regEn.test(val)){
            this.warnValue = 2;
            window.hilink.toast('2', this.$t('setting.form_tips2'))
          } else if (regAllSpace.test(val)) {
            this.warnValue = 3;
            window.hilink.toast('2', this.$t('setting.form_tips3'))
          } else {
            this.warnValue = 0;
          }
        }
        console.log('warnValue', this.warnValue)
        if (!this.warnValue) {
          window.hilink.modifyDeviceNameByDevId(
            this.devId,
            this.inputValue,
            'modifyDeviceNameByDevIdCallback'
          )
        }
      },
      // 确定删除
      confirmDel () {
        this.loadingFlag = true
        this.delFlag = false
        console.log('deleteInfrared_body', this.devId)
        window.hilink.deleteInfraredHubDevice(
          this.devId,
          'deleteInfraredHubDeviceCallback'
        )
      },
      // 取消删除
      cancelModify () {
        this.inputValue = this.devName
        if (isAndroid()) {
          this.modifyFlagAdr = false
        } else {
          this.modifyFlagIos = false
        }
        this.warnValue= 0;
      },
      showInput () {
        if (isAndroid()) {
          this.modifyFlagAdr = true
        } else {
          this.modifyFlagIos = true
        }
        setTimeout(() => {
          this.$refs.input.focus()
        }, 500)
      },
      /** 跳去学习页面 **/
      goToLearnPage () {
        this.$router.push({
          path:`/device${this.$route.query.tid}`,
          query: {
            rc: JSON.stringify(this.queryObj)
          }
        })
      },
      /** 删除设备在本地缓存数据 **/
      delLocalData () {
        window.localStorage.removeItem(`learnCode_${this.hid}`)
      }
    },
    destroyed () {
      window.modifyDeviceNameByDevIdCallback = null
    }
  }
</script>


<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .setting
    position relative
    height 100%
    width 100%
    main
      position absolute
      top: 6.8rem
      left: 0
      width 100%
      height calc(100% - 6.8rem)
      overflow scroll
      -webkit-overflow-scrolling: touch
      .name, .delete
        position relative
        margin 0 1.6rem
        border-bottom 1px solid #ddd
        setHeight(4.6rem)

        .left
          setFont($fontMiddleSize)

        .right
          width 18rem;
          setEllipsisOne()
          setFont($fontSmallSize, rgba(0,0,0,.4))
          margin-right 1.3rem
          text-align right

        .arrow-right
          border 1px solid #c8c8cd
          border-bottom-width 0
          border-left-width 0
          content ""
          top 38%
          right 0
          position absolute
          width 1rem
          height 1rem
          transform rotate(45deg)
    .modify-devName__Adr
      position absolute
      background rgba(0, 0, 0, .2)
      z-index: 99;
      setWH()
      top 0

      .container
        position absolute
        background #fff
        border-radius .8rem
        animation fadeIn .3s linear
        setWH(98vw, auto)
        bottom .5rem
        left 50%
        transform translateX(-50%)
        padding 1.5rem 2rem 1.2rem 2rem

        .title
          setFont(1.6rem, black, left)

        .input-box
          margin 2rem 0 0 0
          position relative
          &:after
            position absolute
            bottom -1px
            left 0
            content: ''
            height 1px
            width 100%
            background-color #000
            -webkit-transform scaleY(0.5)
            transform scaleY(0.5)
            -webkit-transform-origin 0 0
            transform-origin 0 0
          input
            setWH(100%, 3.2rem)
            background-color #fff
            border none
            setFont(1.33rem, black, left, 500)
            caret-color rgb(0, 91, 186)
            &:focus
              outline-color transparent
            &::-webkit-input-placeholder
              color: rgba(0,0,0,.2)

        .warn
          margin-top .2rem
          setFont(1.2rem, rgb(255,51,32), left)
        .btn-groups__adr
          margin-top 1.5rem;
          display: flex
          justify-content space-between
          align-items center
          span.left,
          span.right
            width 40%
            height 3.6rem
            line-height 3.6rem
            setFont(1.5rem, rgb(0, 91, 186), center)
          span.middle
            width 1px!important
            height 2.4rem
            background-color: #ddd;
            transform scaleX(.5)
    .modify-devName__Ios
      position absolute
      background rgba(0, 0, 0, .3)
      z-index: 99;
      setWH()
      top 0
      .container
        position absolute
        background #fff
        border-radius 1.4rem
        animation fadeIn .3s linear
        setWH(68vw, auto)
        top 23%
        left 50%
        transform translateX(-50%)
        padding 1rem 0 0 0

        .title
          setFont(1.6rem, black, center)

        .input-box
          padding 1.2rem 2rem
          position relative
          input
            position relative
            setWH(100%, 2.4rem)
            background-color #fff
            border-radius initial
            border: 1px solid rgba(0,0,0,.2);
            setFont(1.33rem, black, left, 500)
            caret-color rgb(0, 91, 186)
            -webkit-appearance: none;
            appearance: none;

            &:focus
              outline-color transparent
            &::-webkit-input-placeholder
              color: rgba(0,0,0,.2)
          .warn
            margin-top .2rem
            setFont(1.2rem, rgb(255,51,32), left)
        .btn-groups__ios
          display: flex
          justify-content space-between
          align-items center
          span.left,
          span.right
            width 50%
            height 4rem
            line-height 4rem
            setFont(1.5rem, rgb(0, 91, 186), center)
          span.middle
            width 1px!important
            height 4rem
            background-color: #ddd;
            transform scaleX(.5)

    .del-dev
      position absolute
      background rgba(0, 0, 0, .2)
      z-index: 99;
      setWH()
      top 0

      .container
        position absolute
        background #fff
        border-radius .8rem
        animation fadeIn .3s linear
        setWH(98vw, auto)
        bottom .5rem
        left 50%
        transform translateX(-50%)
        padding 1.5rem 2rem 1.2rem 2rem

        .title
          setFont(1.6rem, black, left)

        .info
          setFont(1.3rem, black, left)
          padding 1.5rem 0
  @keyframes fadeIn
    0%
      opacity 0
    100%
      opacity 1
  .btn-groups
    display: flex
    justify-content space-between
    align-items center
    span.left,
    span.right
      width 40%
      height 3.6rem
      line-height 3.6rem
      setFont(1.5rem, rgb(0, 91, 186), center)
    span.middle
      width 1px!important
      height 2.4rem
      background-color: #ddd;
      transform scaleX(.5)
</style>
