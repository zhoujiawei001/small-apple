<template>
  <div class="brandSearch" :style="styObj">
    <input
      @input="searchFn"
      @focus="getFocusFn"
      @blur="loseFocusFn"
      ref="input"
      v-model="value"
      type="text"
      :placeholder="$t('brand.search')">
    <img class="icon" src="../../assets/search.png" alt="">
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: "brandSearch",
  data () {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['statusBarHg']),
    ...mapGetters(['screenRem']),
    styObj () {
      return {
        top: 4.8 * this.screenRem + this.statusBarHg + 'px',
        height: '3.6rem'
      }
    }
  },
  methods: {
    searchFn () {
      this.$emit('handle-search', this.value)
    },
    getFocusFn () {
      this.$emit('handle-getFocus')
    },
    loseFocusFn () {}
  }
}
</script>

<style scoped lang="stylus">
@import "../../style/mixin.styl"
.brandSearch
  position absolute
  top: 6.8rem
  left: 0
  width 100%
  height 3.6rem
  padding 0 1.6rem
  background-color: $bgColorTheme;
  input
    width 100%
    height 100%
    border: none
    border-radius .4rem
    padding-left 2.8rem
    &:focus
      outline-color transparent
  img.icon
    position absolute
    height 2rem
    width 2rem
    left 2rem
    top 50%
    margin-top -1rem
</style>
