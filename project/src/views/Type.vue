<template>
  <div class="dev-tp">
    <appHeader
      style="background-color: #f2f2f2"
      title="选择遥控设备类型"
      :hiddenMore="true"></appHeader>
    <main :style="styObj" class="wrapper">
      <ul class="content">
        <li
          v-for="(item, i) in typeList"
          :key="i"
          :class="{removeRgBd: (i + 1)%3 === 0}"
          @click="handleItem(item.tid)">
          <img :src="require(`../assets/devIcon/${item.tid}.png`)" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
import { mapState, mapGetters } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'type',
  components: {
    appHeader
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['statusBarHg']),
    ...mapGetters(['screenRem', 'typeList']),
    styObj () {
      return {
        position: 'absolute',
        top: 4.8 * this.screenRem + this.statusBarHg + 'px',
        left: 0,
        width: '100%',
        height: `calc(100% - ${4.8 * this.screenRem + this.statusBarHg + 'px'})`
      }
    }
  },
  created () {
    this.$store.dispatch('getDevTypeList')
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollFun()
    })
  },
  methods: {
    scrollFun () {
      // const wrapper = document.querySelector('.wrapper')
      const scroll = new BScroll('.wrapper', {
        probeType: 3,
        click: true,
        bounce: {
          top: true,
          bottom: true
        }
      })
      scroll.on('scroll', pos => {})
    },
    handleItem (tid) {
      this.$store.commit('setTid', tid)
      this.$router.push('/brands')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../style/mixin.styl"
  .dev-tp
    setWH()
    position relative
    .wrapper
      background-color #f2f2f2
      .content
        display flex
        flex-wrap wrap
        background-color #f2f2f2
        box-sizing border-box
        border-top 1px solid #ddd
        li
          width calc(100% / 3)
          height calc(100vw / 3)
          border-right 1px solid #ddd
          border-bottom 1px solid #ddd
          box-sizing border-box
          display flex
          align-items: center
          justify-content center
          flex-direction column
          font-size 1.2rem
          img
            width 4.2rem
          p
            margin-top 1.8rem
        .removeRgBd
          border-right none
</style>
