<template>
  <div class="dev-brands">
    <appHeader
      style="background-color: #f2f2f2"
      title="选择设备品牌"
      :hiddenMore="true"></appHeader>
    <main :style="styObj">
      <brandList :listData="listData"></brandList>
    </main>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
import brandList from '@/components/brand/brandList'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Brands',
  components: {
    appHeader,
    brandList
  },
  data () {
    return {
      listData: {
        com: []
      },
      letterArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      containLetters: [],
      originalList: []
    }
  },
  computed: {
    ...mapState(['brandData', 'statusBarHg']),
    ...mapGetters(['screenRem']),
    styObj () {
      return {
        position: 'absolute',
        top: 4.8 * this.screenRem + this.statusBarHg + 'px',
        left: 0,
        width: '100%',
        height: `calc(100% - ${4.8 * this.screenRem + this.statusBarHg + 'px'})`,
        overflow: 'scroll'
      }
    }
  },
  created () {
    this.getDevBrandList()
      .then(data => {
        this.dataFormatting(data)
      })
  },
  methods: {
    ...mapActions(['getDevBrandList']),
    dataFormatting (originalData) {
      this.originalList = JSON.parse(JSON.stringify(originalData))
      this.listData.com = this.originalList.slice(0, 6)
      this.letterArr.forEach(key => {
        this.listData[key] = this.originalList.filter(item => item.en.slice(0, 1).toUpperCase() === key)
      })
      for (let key in this.listData) {
        if (this.listData[key].length === 0) {
          delete this.listData[key]
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../style/mixin.styl"
.dev-brands
  height 100%
  position relative
  main
    background-color: $bgColorTheme;
</style>
