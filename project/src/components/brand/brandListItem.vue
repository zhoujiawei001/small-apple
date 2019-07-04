<template>
  <div class="brandListItem">
    <span class="title">{{title === 'com' ? '常用品牌' : title}}</span>
    <ul>
      <li v-for="(item, i) in itemArr" :key="i" @click="goToMatch(item)">{{item.zh}}  {{item.en}}</li>
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
      this.$router.push({
        path: '/match',
        query: {
          bid: item.bid,
          zh: item.zh,
          en: item.en
        }
      })
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
    font-size 1.4rem
    setBorderBot()
  ul
    li
      height 5.2rem
      line-height 5.2rem
      padding-left .8rem
      color rgb(26,26,26)
      font-size 1.2rem
      setBorderBot()
</style>
