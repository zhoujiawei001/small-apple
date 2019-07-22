<template>
  <div class="setting">
    <!-- 头部 -->
    <appHeader2 style="background-color: #f2f2f2" @back-icon="$router.go(-1)" title="设置"></appHeader2>
    <!-- 中部 -->
    <main
      :style="styObj">
      <div class="name flex scale-1px" @click="showInput()">
        <span class="left">遥控器名称</span>
        <span class="right">{{devName}}</span>
        <span class="arrow-right"></span>
      </div>
      <div class="delete flex scale-1px" @click="delFlag=true">
        <span class="left">删除设备</span>
        <span class="arrow-right"></span>
      </div>
      <div
        class="delete flex"
        style="border: none"
        :class="{'btn-disable': $route.query.tid === 7}"
        @click="goToLearnPage">
        <span class="left" >遥控器按键学习</span>
        <span class="arrow-right"></span>
      </div>
    </main>
    <!-- 弹出框部分 -->
    <div class="modify-devName" v-if="modifyFlag">
      <div class="container">
        <div class="title">遥控器名称</div>
        <div class="input-box">
          <input ref="input"
                 type="text"
                 placeholder="请输入设备名称"
                 v-model="inputValue"
                 @input="handleInput()">
          <div class="warn" v-show="warnFlag">请输入1-64个字符</div>
        </div>
        <div class="btn-groups">
          <span class="left" @click="cancelModify()">取消</span>
          <span class="middle"></span>
          <span class="right" @click="confirmModify()">确定</span>
        </div>
      </div>
    </div>
    <div class="del-dev" v-show="delFlag">
      <div class="container">
        <div class="title">删除设备</div>
        <div class="info">
          此操作会清除手机和智能家居云中有关该设备的所有数据。设备删除后，若再次使用，需重新添加。
        </div>
        <div class="btn-groups">
          <span class="left" @click="delFlag=false">取消</span>
          <span class="middle"></span>
          <span class="right" @click="confirmDel()">删除</span>
        </div>
      </div>
    </div>
    <appLoading loadingTxt="正在删除..." v-show="loadingFlag"></appLoading>
  </div>
</template>

<script>
  import appLoading from '@/components/appLoading'
  import appHeader2 from '@/components/appHeader2'
  import { mapState,mapGetters } from 'vuex'
  import { modifyDevName, getExtendToServe, delAddedDev } from '@/utils/pub'

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
        modifyFlag: false,
        delFlag: false,
        warnFlag: false,
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
                this.modifyFlag = false
                this.devName = this.inputValue
                this.$store.commit('setAddedDevList', data)
                window.hilink.toast('2', '修改成功')
              })
            }
          })
        }
      }
      window.deleteInfraredHubDeviceCallback = (res) => {
        const _res = JSON.parse(res)
        if (!_res.errcode) {
          delAddedDev(this.hid).then(data => {
            if (data.errcode === 0) {
              getExtendToServe().then(data => {
                this.$store.commit('setAddedDevList', data)
                this.delLocalData()
                this.loadingFlag = false
                this.$router.push('/')
              })
            }
          })
        }
      }
    },
    mounted () {
      console.log('query', this.$route.query)
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
      // 确定改名
      confirmModify () {
        // !this.warnFlag && (this.$emit('modifyDevName', this.inputValue))
        if (!this.warnFlag) {
          window.hilink.modifyDeviceNameByDevId(
            this.devId,
            this.inputValue,
            'modifyDeviceNameByDevIdCallback'
          )
        }
      },
      handleInput () {
        const val = this.$refs.input.value.trim()
        this.warnFlag = val.length === 0 || val.length > 64
      },
      // 确定删除
      confirmDel () {
        this.loadingFlag = true
        this.delFlag = false
        window.hilink.deleteInfraredHubDevice(
          this.devId,
          'deleteInfraredHubDeviceCallback'
        )
      },
      // 取消删除
      cancelModify () {
        this.inputValue = this.devName
        this.modifyFlag = false
        this.warnFlag = false
      },
      showInput () {
        this.modifyFlag = true
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
          setFont($fontSmallSize, rgba(0,0,0,.4))
          margin-right 1.3rem

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
    .modify-devName
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
        padding 1rem 2rem

        .title
          setFont(1.6rem, black, left)

        .input-box
          margin 2rem 0 1.5rem 0

          input
            setWH(100%, 3.2rem)
            background-color #fff
            border none
            border-bottom 1px solid #000
            setFont(1.33rem, black, left, 500)
            caret-color rgb(0, 91, 186)

            &:focus
              outline-color transparent

          .warn
            margin-top .2rem
            setFont(1rem, red, left, 600)

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
        padding 1rem 2rem

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
