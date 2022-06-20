<template>
  <div class="">
    <cart></cart>
    <sale></sale>
     <observe></observe>
  </div>
</template>

<script>

import cart from './cart/index.vue'
import sale from './sale/index.vue'
import observe from './observe/index.vue'
export default {
  name: 'Dashboard',
  components:{
    cart,
    sale,
    observe
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
