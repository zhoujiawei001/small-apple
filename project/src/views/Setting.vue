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
                 :value="devName">
        </div>
        <div class="btn-groups">
          <span @click="modifyFlag=false">取消</span>
          <span @click="confirmModify()">确定</span>
        </div>
      </div>
    </div>
    <div class="del-dev"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Setting',
    data () {
      return {
        devName: '格力空调',
        modifyFlag: false,
        delFlag: false
      }
    },
    computed: {
      ...mapState(['statusBarHg'])
    },
    methods: {
      confirmModify() {

      },
      showInput() {
        this.modifyFlag = true;
        setTimeout(() => {
          this.$refs.input.focus()
        }, 50)
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
    .modify-devName
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
            border-radius .8rem
            background-color rgba(0, 0, 0, 0.08)
            padding-left .8rem
            border none
            setFont(1.33rem)
            &:focus
              outline-color transparent
        .btn-groups
          setPosUseFlexInit(row, space-between, center)
          span
            setWH(48%, 3.6rem)
            line-height 3.6rem
            setFont(1.5rem, rgb(0,91,186), center)
            &:first-child
              border-right 1px solid #ddd

  @keyframes fadeIn
    0%
      opacity 0
    100%
      opacity 1
</style>
