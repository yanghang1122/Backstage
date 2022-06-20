<template>
  <div class="">
    <el-row style="width: 100%;" >

      <el-col :span="6">
        <el-card class="box-card">
          <detail title="总销售额" count="$12554">
            <template slot="charts">
              <span>同比上升</span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥234</span>
            </template>

          </detail>
        </el-card>
      </el-col>


      <el-col :span="6">
        <el-card class="box-card">
          <detail title="访问量" count="6553476">
            <template slot="charts">
              <linechart></linechart>
            </template>


            <template slot="footer">
              <span>日访问量 123</span>
            </template>



          </detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <detail title="支付笔数" count="345">
            <template slot="charts">
              <barchart></barchart>
            </template>
            <template slot="footer">
              <span>转化率 123%</span>
            </template>
          </detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <detail title="运营活动效果" count="78%">

            <template slot="charts">
              <progesschart></progesschart>
            </template>


            <template slot="footer">
              <span>周同比123%</span>
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import detail from './detail/index.vue'
  import linechart from './linechart/index.vue'
  import barchart from './barchart/index.vue'
  import progesschart from './progesschart/index.vue'
  export default {
    name: "cart",
    components: {
      detail,
      linechart,
      barchart,
      progesschart

    }
  }
</script>

<style>
</style>
