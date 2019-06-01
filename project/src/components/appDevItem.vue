<template>
  <div class="appDevItem">
    <div class="left">
      <img :src="require(`../assets/devIcon2/${item.tid}.png`)" alt="">
      <div class="info">
        <div class="info-txt">
          {{item.name}}
        </div>
        <p>{{typeName(item.tid)}}</p>
      </div>
    </div>
    <img class="right" src="../assets/switch_on.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'appDevItem',
  props: ['item'],
  computed: {
    typeName () {
      return val => {
        let obj = {
          1: '电视机顶盒',
          2: '电视机',
          6: '风扇',
          7: '空调',
          8: '灯泡',
          10: '电视盒子'
        }
        return obj[val]
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.appDevItem
  height 7.2rem
  margin-top 1.2rem
  display flex
  justify-content space-between
  align-items center
  background-color: #fff
  border-radius 4px
  padding 0 1.6rem
  .left
    width 68%
    display flex
    justify-content space-between
    align-items: center
    img
      width 36%
    .info
      width 64%
      padding-left 1.6rem
      .info-txt
        font-size 1.4rem
        setEllipsisOne()
      p
        margin-top .4rem
        font-size 1.2rem
        color $fontColorTheme
  .right
    width 5.4rem
</style>
