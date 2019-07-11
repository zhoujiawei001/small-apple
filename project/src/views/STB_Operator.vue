<template>
  <div class="STB-Operator">
    <appHeader
      style="background-color: #f2f2f2"
      title="选择电视运营商"
      :hiddenMore="true"
      @back-icon="$router.go(-1)"></appHeader>
    <main :style="styObj" class="container">
      <section class="section_1">
        <appItemList
          :itemList="provinceList"
          :curIndex="curProIndex"
          @handle-item="handleItemFn"
          :key="123"></appItemList>
      </section>
      <section class="section_2">
        <appItemList
          :itemList="citiesList"
          :curIndex="curCityIndex"
          @handle-item="handleItemFn"
          :key="456"></appItemList>
      </section>
      <section class="section_3"></section>
    </main>
    <footer>
      <span>下一步</span>
    </footer>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
import appItemList from '@/components/appItemList'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "operator",
  components: {
    appHeader,
    appItemList
  },
  data () {
    return {
      provinceList: [],
      citiesList: [],
      operatorList: [],
      curProIndex: 0,
      curCityIndex: 0
    }
  },
  computed: {
    ...mapState(['statusBarHg']),
    ...mapGetters(['screenRem']),
    styObj () {
      return {
        position: 'absolute',
        top: 4.8 * this.screenRem + this.statusBarHg + 'px',
        left: 0,
        width: '100%',
        height: `calc(100% - ${10 * this.screenRem + this.statusBarHg + 'px'})`
      }
    },
  },
  created () {
    this.getAreaList(0).then(data => {
      this.provinceList = data
      console.log('provinceList', this.provinceList)
    })
    this.getAreaList(1).then(data => {
      this.citiesList = data
      console.log('citiesList', this.citiesList)
    })
  },
  methods: {
    ...mapActions(['getAreaList']),
    handleItemFn (item) {
      if (item.level === '1') {
        this.curProIndex = item.index
        this.getAreaList(item.id).then(data => {
          this.citiesList = data
          this.curCityIndex = 0
        })
      } else if (item.level === '2') {
        this.curCityIndex = item.index
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .STB-Operator
    position relative
    setWH()
    background-color $bgColorTheme
    main
      position relative
      section
        height 100%
        position  absolute
        top 0
        overflow scroll
        setBorderBot()
        setBorderTop()
      .section_1
        width 24%
        background-color: $bgColorTheme;
        left: 0
      .section_2
        width 30%
        background-color: #fff;
        left 24%
      .section_3
        width 46%
        left 54%
        background-color: blue;
    footer
      position absolute
      bottom 0
      width 100%
      height 5.2rem
      left 0
      setPosUseFlex()
      span
        width 8rem
        height 3.6rem
        text-align center
        line-height 3.6rem
        border-radius 4.2rem
        background-color #fff
        font-size $fontMiddleSize
</style>
