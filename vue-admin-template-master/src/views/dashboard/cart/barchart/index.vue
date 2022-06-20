<template>
  <div class="barchart" ref="barchart">



  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: "barchart",
    mounted() {
      let linehart = echarts.init(this.$refs.barchart)
      linehart.setOption({
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'bar',
           data: [20, 24, 4, 28, 3, 7, 60],
              smooth: true
        }],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }
      });

    }
  }
</script>

<style>
  .barchart {
    width: 100%;
    height: 100%;
  }
</style>
