<template>
  <div class="dev-STB">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>
    <div class="top flex">
    </div>
  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device1',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电视机顶盒'
      }
    },
    methods: {
      backTo() {
        console.log('back')
      },
      moreSet() {
        console.log('set')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../style/mixin.styl"
  .dev-STB
    setWH()
    background #f2f2f2
</style>
