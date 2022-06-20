<template>
  <div class="progesschart" ref="progesschart">



  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: "progesschart",
    mounted() {
      let progesschart = echarts.init(this.$refs.progesschart)
      progesschart.setOption({
        xAxis: {
          show: false,
          min:0,
          max:100
        },
        yAxis: {
          show: false,
          type: 'category',
        },
        series: [{
          type: 'bar',
          data: [78],
          barWidth:20,
          showBackground:true,
          backgroundStyle:{
            color:"rgba(180, 180, 180, 0.2)"
          },
          
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
  .progesschart {
    width: 100%;
    height: 100%;
  }
</style>
