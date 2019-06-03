<template>
  <div class="brandList">
    <brandListItem
      v-for="(item, val) in listData"
      :key="val"
      :title="val"
      :itemArr="item"></brandListItem>
  </div>
</template>

<script>
import brandListItem from './brandListItem'
export default {
  name: 'brandList',
  props: ['listData'],
  components: {
    brandListItem
  }
}
</script>

<style scoped lang="stylus">
@import "../../style/mixin.styl"
.brandList
  background-color $bgColorTheme
  padding 0 3.6rem 0 1.6rem
</style>
