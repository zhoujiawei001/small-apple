<template>
  <div class="dev-brands">
    <appHeader style="background-color: #f2f2f2"></appHeader>
    <main content=""></main>
  </div>
</template>

<script>
import appHeader from '@/components/appHeader'
export default {
  name: 'Brands',
  components: {
    appHeader
  },
  created () {
    this.$store.dispatch('getDevBrandList')
  }
}
</script>

<style scoped>

</style>
