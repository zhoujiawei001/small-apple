<template>
  <!--风扇-->
  <div class="dev-fan">
    <appHeader2 :title="title" @backTo="backTo()" @moreSet="moreSet()"></appHeader2>

  </div>
</template>

<script>
  import appHeader2 from '@/components/appHeader2'

  export default {
    name: 'device6',
    components: {
      appHeader2,
    },
    data () {
      return {
        title: '电风扇'
      }
    },
  }
</script>

<style scoped lang="stylus">
</style>
