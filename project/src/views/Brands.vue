<template>
  <div class="dev-brands">
    <appHeader
      style="background-color: #f2f2f2"
      title="选择设备品牌"
      :hiddenMore="true"></appHeader>
    <brandList :style="styObj" :listData="listData" id="brand_list"></brandList>
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
      ele: null, // 可滑动对象元素集合
      listDataKey: [], // 包含每条数据首字母的数组
      scrollAreaArr: [], // 字母所在滚动区域
      letterIdx: 0, // 选中的字母位
      keyArr: [],
      itemArr: []
    }
  },
  computed: {
    ...mapState(['brandData', 'statusBarHg', 'brandScrollPos']),
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
    // scrollTopPot () {
    //   return (this.keyArr.length + this.itemArr.length) * 5.2 * this.screenRem
    // }
  },
  created () {
    this.getDevBrandList()
      .then(data => {
        this.dataFormatting(data)
      })
  },
  mounted () {
    this.addEventFun()
  },
  methods: {
    ...mapActions(['getDevBrandList']),
    addEventFun () {
      this.ele = document.getElementById('brand_list')
      this.ele.addEventListener('scroll', this.getBrandScroll)
    },
    getBrandScroll () {
      let $scroll = this.ele.scrollTop
      this.$store.commit('setBrandScrollPos', $scroll)
      this.scrollAreaArr.forEach((item, index) => {
        if ($scroll > item[0] && $scroll < item[1]) {
          this.letterIdx = index
        }
      })
      console.log('letterIdx', this.letterIdx)
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
      this.ele.removeEventListener('scroll', this.getBrandScroll)
      this.letterIdx = idx
      console.log('idx', idx)
      this.selectedLetter(idx)
    },
    /** 手指移开字母并且添加滚动事件 **/
    removeLetterPos () {
      this.ele.addEventListener('scroll', this.getBrandScroll)
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
      // this.ele.setAttribute('style', '-wekit-overflow-scrolling: auto')
      this.ele.scrollTop = this.scrollAreaArr[idx][0]
      // this.ele.setAttribute('style', '-wekit-overflow-scrolling: touch')
      // let val = this.listDataKey[idx]
      // this.keyArr = []
      // this.itemArr = []
      // for (let i in this.listData) {
      //   if (i !== val) {
      //     this.keyArr.push(i)
      //     this.itemArr.push(this.listData[i])
      //   } else {
      //     break
      //   }
      // }
      // this.itemArr = this._.flatten(this.itemArr, true)
      // this.ele.setAttribute('style', '-webkit-overflow-scrolling:auto')
      // this.ele.scrollTop = this.scrollTopPot
      // this.ele.setAttribute('style', '-webkit-overflow-scrolling:touch')
      // this.$store.commit('setBrandScrollPos', $scroll)
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
