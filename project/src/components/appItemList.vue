<template>
  <ul class="appItemList">
    <li
      v-for="(item, index) in itemList"
      :class="{'selectCls': curIndex === index}"
      @click="clickItem(item, index)"
      :key="index">{{item.name || item.provider}}</li>
  </ul>
</template>

<script>
export default {
  name: "appItemList",
  props: {
    itemList: {
      type: Array
    },
    curIndex: {
      type: Number
    }
  },
  methods: {
    clickItem (item, index) {
      let obj = {...item}
      obj.index = index
      this.$emit('handle-item', obj)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  ul.appItemList
    li
      height 4.2rem
      line-height 4.2rem
      font-size $fontMiddleSize
      padding-left .8rem
      width calc(100 - .8rem)
      setEllipsisOne()
      setBorderBot()
    .selectCls
      background-color: $fontColorTheme;
      color #fff
      setBorderBot($fontColorTheme)
</style>
