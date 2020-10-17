<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isshowFootGuide"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from '@/components/FooterGuide/FooterGuide'
export default {
  components:{
    FooterGuide
  },
  async mounted(){ 
  this.$store.dispatch('getAddress')
  this.$store.dispatch('autoLogin')//加载的时候就去执行是否有token
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>