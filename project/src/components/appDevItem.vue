<template>
  <div class="appDevItem" @click="onclickItem">
    <div class="left">
      <img :src="require(`../assets/devIcon2/${item.tid}.png`)" alt="">
      <div class="info">
        <div class="info-txt">
          {{ item.hname || item.name}}
        </div>
        <p>{{typeName(item.tid)}}</p>
      </div>
    </div>
    <div class="right">
      <img src="../assets/switch_on.png" alt="" @click.stop.prevent="handleSwitch">
    </div>
  </div>
</template>

<script>
  import { sendBodyToDev } from '../utils/pub'
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
    },
    methods: {
      onclickItem () {
        this.$router.push({
          path: `/device${this.item.tid}`,
          query: {
            rc: JSON.stringify(this.item)
          }
        })
      },
      handleSwitch () {
        let body = {
          batch: {
            controlKey: {
              controlKey: this.item.src
            },
            deviceList: {
              list: [
                {
                  zip: this.item.zip2 + ''
                }
              ]
            }
          }
        }
        sendBodyToDev(body)
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
        width 32%
      .info
        width 68%
        padding-left 2.4rem
        .info-txt
          font-size 1.4rem
          setEllipsisOne()
        p
          margin-top .4rem
          font-size 1.2rem
          color $fontColorTheme
    .right
      width 4.8rem
      height 4.8rem
      img
        width 4.8rem
      &:active
        background-color $bgActiveColor
</style>
