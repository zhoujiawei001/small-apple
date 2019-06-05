<template>
  <div class="dev-brands">
    <appHeader
      style="background-color: #f2f2f2"
      title="选择设备品牌"
      :hiddenMore="true"
      @back-icon="backFn"></appHeader>
    <main
      :style="styObj"
      ref="brand_list">
      <brandList
        :listData="listData"></brandList>
    </main>
    <letterList
      :letterArr="listDataKey"
      :letterIdx="letterIdx"
      @touchStart-letter="getLetterPosCli"
      @touchEnd-letter="removeLetterPos"
      @touchMove-letter="getLetterPosMove"></letterList>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
import brandList from '@/components/brand/brandList'
import letterList from '@/components/brand/letterList'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Brands',
  components: {
    appHeader,
    brandList,
    letterList
  },
  data () {
    return {
      listData: {com: []}, // 可展示列表数据列表
      letterArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      originalList: [], // 源数据列表
      listDataKey: [], // 包含每条数据首字母的数组
      scrollAreaArr: [], // 字母所在滚动区域
      letterIdx: 0, // 选中的字母位
      keyArr: [],
      itemArr: []
    }
  },
  computed: {
    ...mapState(['statusBarHg', 'brandScrollPos', 'tid']),
    ...mapGetters(['screenRem']),
    styObj () {
      return {
        top: 4.8 * this.screenRem + this.statusBarHg + 'px',
        height: `calc(100% - ${4.8 * this.screenRem + this.statusBarHg + 'px'})`
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem(`appBrands-${this.tid}`)) {
      let data = JSON.parse(window.sessionStorage.getItem(`appBrands-${this.tid}`))
      this.dataFormatting(data)
    } else {
      this.getDevBrandList()
        .then(data => {
          this.dataFormatting(data)
          window.sessionStorage.setItem(`appBrands-${this.tid}`, JSON.stringify(data))
        })
    }
  },
  mounted () {
    this.addEventFun()
  },
  methods: {
    ...mapActions(['getDevBrandList']),
    addEventFun () {
      this.$refs['brand_list'].scrollTop = this.brandScrollPos
      this.scrollAreaArr.forEach((item, index) => {
        if (this.brandScrollPos >= item[0] && this.brandScrollPos <= item[1]) {
          this.letterIdx = index
        }
      })
      console.log('ft', this.letterIdx)
      this.$refs['brand_list'].addEventListener('scroll', this.getBrandScroll)
    },
    getBrandScroll () {
      let $scroll = this.$refs['brand_list'].scrollTop
      this.$store.commit('setBrandScrollPos', $scroll)
      this.scrollAreaArr.forEach((item, index) => {
        if ($scroll >= item[0] && $scroll <= item[1]) {
          this.letterIdx = index
        }
      })
      console.log('letterIdx', this.letterIdx)
      this.$store.commit('setBrandScrollPos', $scroll)
    },
    /** 格式化初始数据 **/
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
      this.listDataKey = Object.keys(this.listData)
      let $total = 0
      this.listDataKey.forEach((val, index) => {
        let $arr = []
        $total += this.listData[val].length * 5.2 * this.screenRem
        let $num = (index + 1) * 5.2 * this.screenRem + $total
        if (val === 'com') {
          $arr = [0, $num]
        } else {
          $arr = [this.scrollAreaArr[index - 1][1], $num]
        }
        this.scrollAreaArr.push($arr)
      })
    },
    /** 点击右边字母跳转到对应的字母区域 **/
    getLetterPosCli (idx) {
      this.$refs['brand_list'].removeEventListener('scroll', this.getBrandScroll)
      this.letterIdx = idx
      console.log('idx', idx)
      this.selectedLetter(idx)
    },
    /** 手指移开字母并且添加滚动事件 **/
    removeLetterPos () {
      this.$refs['brand_list'].addEventListener('scroll', this.getBrandScroll)
    },
    /** 手指移动字母列表的时候添加事件 **/
    getLetterPosMove (e) {
      this.letterIdx = Math.round((e.changedTouches[0].clientY - 12 * this.screenRem) / (1.8 * this.screenRem))
      console.log('move', this.letterIdx)
      if (this.letterIdx < 0) {
        this.letterIdx = 0
      } else if (this.letterIdx > this.listDataKey.length - 1) {
        this.letterIdx = this.listDataKey.length - 1
      }
      this.selectedLetter(this.letterIdx)
    },
    /** 选中字母发生事件点击或手指移动公共方法 **/
    selectedLetter (idx) {
      this.$refs['brand_list'].setAttribute('style', `-webkit-overflow-scrolling: auto; top: ${4.8 * this.screenRem + this.statusBarHg}px; height: calc(100% - ${4.8 * this.screenRem + this.statusBarHg}px)`)
      this.$refs['brand_list'].scrollTop = this.scrollAreaArr[idx][0]
      this.$refs['brand_list'].setAttribute('style', `-webkit-overflow-scrolling: touch; top: ${4.8 * this.screenRem + this.statusBarHg}px; height: calc(100% - ${4.8 * this.screenRem + this.statusBarHg}px)`)
      this.$store.commit('setBrandScrollPos', this.scrollAreaArr[idx][0])
    },
    backFn () {
      this.$store.commit('setBrandScrollPos', 0)
      this.$router.go(-1)
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
    position absolute
    top: 6.8rem
    left: 0
    width 100%
    height calc(100% - 6.8rem)
    overflow scroll
    -webkit-overflow-scrolling: touch
</style>
