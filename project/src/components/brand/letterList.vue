<template>
  <div class="letterList">
    <ul @touchmove.stop="moveItems">
      <li
        @touchstart.stop="handleItem(idx)"
        @touchend.stop="handleItemEnd"
        v-for="(item, idx) in letterArr"
        :key="idx">
        <span :class="{active: letterIdx === idx}">{{item === 'com'? '↑' : item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'letterList',
  props: ['letterArr', 'letterIdx'],
  methods: {
    handleItem (idx) {
      this.$emit('touchStart-letter', idx)
    },
    handleItemEnd () {
      this.$emit('touchEnd-letter')
    },
    moveItems (e) {
      this.$emit('touchMove-letter', e)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../style/mixin.styl"
.letterList
  position fixed
  top 12rem
  right .6rem
  ul
    li
      padding .1rem
      span
        display: inline-block;
        height 1.6rem
        width 1.6rem
        text-align center
        line-height 1.6rem
        font-size 1.2rem
        border-radius 50%
      .active
        background-color rgb(100, 100, 100)
        color: #fff
</style>
