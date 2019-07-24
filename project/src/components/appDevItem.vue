<template>
  <div class="appDevItem">
    <div class="left" @click="onclickItem">
      <img :src="require(`../assets/devIcon2/${item.tid}.png`)" alt="">
      <div class="info">
        <div class="info-txt">
          {{ item.hname || item.name}}
        </div>
        <p>{{$t(`pub.${typeName(item.tid)}`)}}</p>
      </div>
    </div>
    <div
      :class="['right', {'bgActive': isActive === true}]"
      @touchstart="isActive = true"
      @touchend="isActive = false">
      <img :src="require(`../assets/switch_${item.tid === 7 ? item.isSwitch : 'off'}.png`)" alt="" @click="handleSwitch">
    </div>
  </div>
</template>

<script>
  import { sendBodyToDev2 } from '../utils/pub'
  export default {
    name: 'appDevItem',
    props: ['item'],
    data () {
      return {
        isActive: false
      }
    },
    computed: {
      typeName () {
        return val => {
          let obj = {
            1: 'set_box',
            2: 'tv',
            6: 'fan',
            7: 'ac',
            8: 'light',
            10: 'tv_box'
          }
          return obj[val]
        }
      },
      queryObj () {
        let newObj = JSON.parse(JSON.stringify(this.item))
        newObj.pageType = 'controlPage'
        return newObj
      }
    },
    methods: {
      onclickItem () {
        this.$store.commit('setTid', this.item.tid)
        this.$router.push({
          path: `/device${this.item.tid}`,
          query: {
            rc: JSON.stringify(this.queryObj)
          }
        })
      },
      handleSwitch () {
        console.log('$isVibrate', this.$isVibrate)
        let obj = {};
        let body = {}
        if (this.item.tid === 7) {
          body = {
            batch: {
              airKey: {
                power: this.item.isSwitch === 'on'? 2 : 1
              },
              deviceList: {
                list: [this.item]
              }
            }
          }
        } else {
          body = {
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
        }
        sendBodyToDev2(body, 'handleIconCallback').then(data => {
          if (!data.errcode) {
            if (this.item.isSwitch === 'on') {
              obj = {
                isSwitch: 'off',
                hid: this.item.hid
              }
            } else {
              obj = {
                isSwitch: 'on',
                hid: this.item.hid
              }
            }
            if (this.item.tid !== 7) return
            this.$emit('handle-icon', obj)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .appDevItem
    height 6.4rem
    margin-top .8rem
    display flex
    justify-content space-between
    align-items center
    background-color: #fff
    border-radius 4px
    padding 0 .6rem 0 .8rem
    .left
      width calc(100% - 4.8rem)
      display flex
      align-items: center
      img
        width 6.4rem
        height 6.4rem
      .info
        width 68%
        padding-left .8rem
        .info-txt
          font-size $fontBigSize
          setEllipsisOne()
        p
          margin-top .4rem
          font-size $fontSmallSize
          color $fontColorHalfTrans
    .right
      width 4.8rem
      height 4.8rem
      border-radius 50%
      position relative
      img
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 2.8rem
</style>
