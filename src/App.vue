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
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>