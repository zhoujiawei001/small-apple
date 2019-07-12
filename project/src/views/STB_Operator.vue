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
      <section class="section_3">
        <appItemList
          :itemList="operatorList"
          :curIndex="curOperatorIndex"
          @handle-item="handleItemFn"
          :key="789"></appItemList>
      </section>
    </main>
    <footer>
      <span @click="goToMatch">下一步</span>
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
      curCityIndex: 0,
      curOperatorIndex: 0
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
        height: `calc(100% - ${11 * this.screenRem + this.statusBarHg + 'px'})`
      }
    }
  },
  created () {
    this.getAreaList(0).then(data => {
      this.provinceList = data
      this.getAreaList(this.provinceList[0].id).then(data => {
        this.citiesList = data
        this.getOperatorList(this.citiesList[0].id).then(data => {
          this.operatorList = data
        })
      })
    })
  },
  methods: {
    ...mapActions(['getAreaList', 'getOperatorList']),
    handleItemFn (item) {
      if (item.level === '1') {
        this.curProIndex = item.index
        this.getAreaList(item.id).then(data => {
          this.citiesList = data
          this.curCityIndex = 0
          this.getOperatorList(this.citiesList[0].id).then(data => {
            this.operatorList = data
            this.curOperatorIndex = 0
          })
        })
      } else if (item.level === '2') {
        this.curCityIndex = item.index
        this.getOperatorList(item.id).then(data => {
          this.operatorList = data
          this.curOperatorIndex = 0
        })
      } else {
        this.curOperatorIndex = item.index
      }
    },
    goToMatch () {
      this.$store.commit('setBid', this.operatorList[this.curOperatorIndex].bid)
      setTimeout(() => {
        this.$router.push({
          path: '/match',
          query: {
            bid: this.operatorList[this.curOperatorIndex].bid,
            zh: this.operatorList[this.curOperatorIndex].area_name,
            en: this.operatorList[this.curOperatorIndex].provider
          }
        })
      }, 200)
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
        background-color: $bgColorTheme;
    footer
      position absolute
      bottom 0
      width 100%
      height 6.2rem
      left 0
      setPosUseFlex()
      span
        width 10.2rem
        height 3.6rem
        text-align center
        line-height 3.6rem
        border-radius 4.2rem
        background-color #fff
        font-size $fontMiddleSize
        &:active
          background-color rgba(0,0,0,.1)
</style>
