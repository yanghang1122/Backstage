<template>
  <div class="linechart" ref="linechart">



  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: "linechart",
    mounted() {
      let linehart = echarts.init(this.$refs.linechart)
      linehart.setOption({
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
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
  .linechart {
    width: 100%;
    height: 100%;
  }
</style>
