<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('initFun')
  },
  mounted () {
    // window.hilink.setTitleVisible(false, 'app.setTitleCallback')
  }
}
</script>
