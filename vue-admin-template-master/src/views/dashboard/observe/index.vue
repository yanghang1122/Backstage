<template>
    <el-row :gutter="10">
      <el-col :span="12">
<search></search>

      </el-col>
      <el-col :span="12">
<category></category>

      </el-col>
    </el-row>
</template>

<script>
  import search from './search/index.vue'
  import category from './category/index.vue'
  export default{
    name:"observe",
    components:{
search,
category
    }
  }
</script>

<style>
</style>
