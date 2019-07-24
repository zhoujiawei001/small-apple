<template>
  <div class="brandListItem">
    <span class="title">{{title === 'com' ? $t('brand.common') : title}}</span>
    <ul>
      <li
        v-for="(item, i) in itemArr" :key="i"
        @click="goToMatch(item)">{{item.zh}}  {{item.en}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'brandListItem',
  props: ['title', 'itemArr'],
  methods: {
    goToMatch (item) {
      this.$store.commit('setBid', item.bid)
      setTimeout(() => {
        this.$router.push({
          path: '/match',
          query: {
            bid: item.bid,
            zh: item.zh,
            en: item.en
          }
        })
      }, 200)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../style/mixin.styl"
.brandListItem
  .title
    height 5.2rem
    line-height 5.2rem
    display: block;
    padding-left .8rem
    font-size $fontMiddleSize
    setBorderBot($borderColor2)
  ul
    li
      height 5.2rem
      line-height 5.2rem
      padding-left .8rem
      font-size $fontSmallSize
      setBorderBot($borderColor2)
</style>
