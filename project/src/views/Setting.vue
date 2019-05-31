<template>
  <div class="setting">
    <div :style="{height: statusBarHg + 'px'}"></div>
    <header>
      <div class="img-box" @click="$router.go(-1)"><img src="../assets/arrow-left.svg"></div>
      <div class="text">设置</div>
    </header>
    <div class="name flex" @click="showInput()">
      <span class="left">设备名称</span>
      <span class="right">{{devName}}</span>
      <span class="arrow-right"></span>
    </div>
    <div class="delete flex" @click="delFlag=true">
      <span class="left">删除设备</span>
      <span class="arrow-right"></span>
    </div>
    <div class="modify-devName" v-show="modifyFlag">
      <div class="container">
        <div class="title">设备名称</div>
        <div class="input-box">
          <input ref="input"
                 type="text"
                 placeholder="请输入设备名称"
                 v-model="inputValue"
                 @input="handleInput()">
          <div class="warn" v-show="warnFlag">请输入1-64个字符</div>
        </div>
        <div class="btn-groups">
          <span @click="modifyFlag=false">取消</span>
          <span @click="confirmModify()">确定</span>
        </div>
      </div>
    </div>
    <div class="del-dev" v-show="delFlag">
      <div class="container">
        <div class="title">删除设备</div>
        <div class="info">
          此操作会清楚手机和智能家居云中有关该设备的所有数据。设备删除后，若再次使用，许重新添加。
        </div>
        <div class="btn-groups">
          <span @click="delFlag=false">取消</span>
          <span @click="confirmDel()">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Setting',
    data () {
      return {
        devName: '格力空调',
        inputValue: '',
        modifyFlag: false,
        delFlag: false,
        warnFlag: false
      }
    },
    created () {
      this.inputValue = this.devName
    },
    computed: {
      ...mapState(['statusBarHg'])
    },
    methods: {
      // 确定改名
      confirmModify () {
        !this.warnFlag && (this.$emit('modifyDevName', this.inputValue))
      },
      handleInput () {
        const val = this.$refs.input.value.trim()
        this.warnFlag = val.length === 0 || val.length > 64
      },
      // 确定删除
      confirmDel () {

      },
      showInput () {
        this.modifyFlag = true
        setTimeout(() => {
          this.$refs.input.focus()
        }, 500)
      }
    }
  }
</script>


<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .setting
    header
      setPosUseFlexInit(row, flex-start, center)
      setHeight(4.8rem)
      padding 0 1rem
      border-bottom 2px solid #ddd
      display flex

      .img-box
        setWH(2.8rem, 2.8rem)
        margin-right 1rem

        img
          setWH()

      .text
        setFont(1.8rem)

    .name, .delete
      position relative
      margin 0 1rem
      border-bottom 1px solid #ddd
      setHeight(4.8rem)

      .left
        setFont(1.5rem)

      .right
        setFont(1.3rem, rgba(0, 0, 0, .5))
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

    .modify-devName,
    position absolute
      background rgba(0, 0, 0, .3)
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
          setFont(1.5rem, black, left, 600)

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

        .btn-groups
          setPosUseFlexInit(row, space-between, center)

          span
            setWH(48%, 3.6rem)
            line-height 3.6rem
            setFont(1.5rem, rgb(0, 91, 186), center)

            &:first-child
              border-right 1px solid #ddd

    .del-dev
      position absolute
      background rgba(0, 0, 0, .3)
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
          setFont(1.5rem, black, left, 600)

        .info
          setFont(1.5rem, black, left)
          padding 1.5rem 0

        .btn-groups
          setPosUseFlexInit(row, space-between, center)

          span
            setWH(48%, 3.6rem)
            line-height 3.6rem
            setFont(1.5rem, rgb(0, 91, 186), center)

            &:first-child
              border-right 1px solid #ddd

  @keyframes fadeIn
    0%
      opacity 0
    100%
      opacity 1
</style>
