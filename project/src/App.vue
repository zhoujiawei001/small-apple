<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { getExtendToServe } from './utils/pub'
export default {
  name: 'app',
  created () {
    this.$store.dispatch('initFun')
    getExtendToServe().then(data => {
      this.$store.commit('setAddedDevList', data)
    })
  },
  mounted () {
    try {
      window.hilink.setTitleVisible(false, 'app.setTitleCallback')
      window.hilink.getDevCacheAll('0', '', 'app.getDevInfoAllCallback')
      window.hilink.getStatusBarHeight('app.getBarCallback')
      const wd = document.body.clientWidth
      this.$store.commit('setScreenWd', wd)
    } catch (e) {
      console.warn(e)
    }
  }
}
</script>

