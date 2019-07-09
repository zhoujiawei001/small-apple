<template>
  <ul class="expandKey">
    <li
      v-for="(item, idx) of expandKeysCopy"
      :key="idx">
      <span
        class="item btn"
        @click="sendBody(item)"
        @touchstart="longClickStart(item)"
        @touchend="longClickEnd(item)"><i>{{cmds[item]['kn']}}</i></span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "appExpandKey",
    props: {
      expandKeys: {
        type: Array,
        default: () => {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'mmkk']
        }
      },
      cmds: {
        type: Object
      }
    },
    computed: {
      expandKeysCopy () {
        return this.expandKeys.filter(item => item.indexOf('_r') === -1)
      }
    },
    methods: {
      sendBody (item) {
        this.$emit('click-fn', item)
      },
      longClickStart (item) {
        this.$emit('touchstart-fn', item)
      },
      longClickEnd (item) {
        this.$emit('touchend-fn', item)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  ul.expandKey
    padding 2.4rem 4.2rem
    display flex
    flex-wrap wrap
    li
      width 33.333%
      margin-bottom 2rem
      setPosUseFlexInit(row, center, center, wrap)
      span.item
        setFont(1.5rem, $fontColorTheme2, center)
        setWH(7.6rem, 4.4rem)
        line-height 4.4rem
        border-radius 4.4rem
        setPosUseFlexInit(row, center, center, wrap)
        i
          display inline-block
          width 6.4rem
          height 3.6rem
          line-height 3.6rem
          setEllipsisOne()
          font-style:normal
</style>
