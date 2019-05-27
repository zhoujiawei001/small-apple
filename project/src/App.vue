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
    try {
      window.hilink.setTitleVisible(false, 'app.setTitleCallback')
    } catch (e) {
      console.warn(e)
    }
  }
}
</script>
