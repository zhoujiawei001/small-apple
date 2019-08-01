<template>
  <div class="dev-brands">
    <appHeader2
      style="background-color: #f2f2f2"
      :title="$t('brand.select_brand')"
      @back-icon="backFn"></appHeader2>
    <brandSearch
      id="input"
      @handle-search="searchFn"></brandSearch>
    <main
      :style="styObj"
      ref="brand_list">
      <brandList
        :listData="listData"
        v-if="!keyword"></brandList>
      <ul
        v-else
        class="searchList">
        <li
          v-for="(item, idx) in keywordList"
          @click="goToMatch2(item)"
          :key="idx">{{item.zh}}  {{item.en}}</li>
      </ul>
      <div
        class="noData"
        v-show="keyword && keywordList.length === 0">
        <img src="../assets/noData.png" alt="">
        <p>{{$t('brand.no_match')}}</p>
      </div>
    </main>
    <letterList
      v-show="!keyword"
      :letterArr="listDataKey"
      :letterIdx="letterIdx"
      @touchStart-letter="getLetterPosCli"
      @touchEnd-letter="removeLetterPos"
      @touchMove-letter="getLetterPosMove"></letterList>
  </div>
</template>

<script>
import appHeader2 from '@/components/appHeader2'
import brandList from '@/components/brand/brandList'
import letterList from '@/components/brand/letterList'
import brandSearch from '@/components/brand/brandSearch'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Brands',
  components: {
    appHeader2,
    brandList,
    letterList,
    brandSearch
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
      itemArr: [],
      keyword: '', // 关键字
      keywordList: [] // 关键列表
    }
  },
  computed: {
    ...mapState(['statusBarHg', 'brandScrollPos', 'tid', 'lang']),
    ...mapGetters(['screenRem']),
    styObj () {
      return {
        top: 8.4 * this.screenRem + this.statusBarHg + 'px',
        height: `calc(100% - ${8.4 * this.screenRem + this.statusBarHg + 'px'})`
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
      this.$store.commit('setBrandScrollPos', $scroll)
    },
    /** 格式化初始数据 **/
    dataFormatting (originalData) {
      this.originalList = JSON.parse(JSON.stringify(originalData))
      if (this.tid === 40) {
        this.originalList = this.originalList.map(item => {
          item.common = 1
          return item
        })
      }
      this.listData.com = this.originalList.filter(item => item.common === 1)
      console.log('lang', this.lang)
      this.letterArr.forEach(key => {
        this.listData[key] = this.originalList.filter(item => this.lang === 'en'? item.en.slice(0, 1).toUpperCase() === key : item.sort_index.toUpperCase() === key)
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
      this.selectedLetter(idx)
    },
    /** 手指移开字母并且添加滚动事件 **/
    removeLetterPos () {
      this.$refs['brand_list'].addEventListener('scroll', this.getBrandScroll)
    },
    /** 手指移动字母列表的时候添加事件 **/
    getLetterPosMove (e) {
      this.letterIdx = Math.round((e.changedTouches[0].clientY - 12 * this.screenRem) / (1.8 * this.screenRem))
      if (this.letterIdx < 0) {
        this.letterIdx = 0
      } else if (this.letterIdx > this.listDataKey.length - 1) {
        this.letterIdx = this.listDataKey.length - 1
      }
      this.selectedLetter(this.letterIdx)
    },
    /** 选中字母发生事件点击或手指移动公共方法 **/
    selectedLetter (idx) {
      this.$refs['brand_list'].setAttribute('style', `-webkit-overflow-scrolling: auto; top: ${8.4 * this.screenRem + this.statusBarHg}px; height: calc(100% - ${8.4 * this.screenRem + this.statusBarHg}px)`)
      this.$refs['brand_list'].scrollTop = this.scrollAreaArr[idx][0] + 2
      this.$refs['brand_list'].setAttribute('style', `-webkit-overflow-scrolling: touch; top: ${8.4 * this.screenRem + this.statusBarHg}px; height: calc(100% - ${8.4 * this.screenRem + this.statusBarHg}px)`)
      this.$store.commit('setBrandScrollPos', this.scrollAreaArr[idx][0])
    },
    backFn () {
      this.$store.commit('setBrandScrollPos', 0)
      this.$router.go(-1)
    },
    /** 输入搜索框 **/
    searchFn (value) {
      this.keyword = value
      this.keywordList = this.originalList.filter(item => item.zh.indexOf(this.keyword) !== -1 || item.en.toLocaleLowerCase().indexOf(this.keyword.toLocaleLowerCase()) !== -1)
    },
    /** 进入match页面 */
    goToMatch2 (item) {
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
@import "../style/mixin.styl"
.dev-brands
  height 100%
  position relative
  main
    background-color: $bgColorTheme;
    position absolute
    top: 10.4rem
    left: 0
    width 100%
    height calc(100% - 10.4rem)
    overflow scroll
    -webkit-overflow-scrolling: touch
    ul.searchList
      padding 0 1.6rem
      li
        height 5.2rem
        line-height 5.2rem
        padding-left .8rem
        color rgb(26,26,26)
        font-size 1.2rem
        setBorderBot($borderColor2)
    div.noData
      position absolute
      top 42%
      left 50%
      transform translate(-50%, -50%)
      display flex
      flex-direction column
      align-items center
      img
        width 6.8rem
      p
        color #8a8a8a
        font-size 1.3rem
        margin-top .5rem
</style>
