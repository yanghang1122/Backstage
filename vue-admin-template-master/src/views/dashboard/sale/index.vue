<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tabs style="width: 100%;" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>

      </el-tabs>

      <div class="header">
         <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
        <el-date-picker type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
          size='mini'
          value-format="yyyy-MM-dd"
          v-model="date"
          >
        </el-date-picker>
      </div>
    </div>


    <div class="center">
      <el-row>
        <el-col :span="18">
          <div class="" ref="mycharts" class="mycharts">

          </div>

        </el-col>
        <el-col :span="6">
          <div class="">
            <h3>门店{{title}}排名</h3>
            <ul>
              <li>
                <span class="rindex">0</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
              <li>
                <span class="rindex">1</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
              <li>
                <span>3</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
              <li>
                <span>4</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
              <li>
                <span>5</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
              <li>
                <span>6</span>
                <span>肯德基</span>
                <span>123123</span>
              </li>
            </ul>
          </div>


        </el-col>
      </el-row>
    </div>

  </el-card>
</template>

<script>
  import dayjs from "dayjs";
  import echarts from 'echarts';
  export default {
    name: "sale",
    data() {
      return {
        activeName: 'sale',
        linehart: null,
        date:''
      }
    },
    mounted() {
      this.linehart = echarts.init(this.$refs.mycharts)
      this.linehart.setOption({
        title: {
          text: "销售额"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 12, 4, 23, 23, 43, 34, 13, 26, 37, 85, 5]
        }]
      });

    },
    computed: {
      title() {
        return this.activeName == "sale" ? '销售额' : '访问量'
      }
    },
    watch: {
      activeName() {
        this.linehart.setOption({
          title: {
            text: this.title
          },
        });
      }
    },
    methods:{
      setDay() {
            const day = dayjs().format("YYYY-MM-DD");
            this.date = [day, day];
          },
          //本周
          setWeek() {
            const start = dayjs().day(1).format("YYYY-MM-DD");
            const end = dayjs().day(7).format("YYYY-MM-DD");
            this.date = [start, end];
          },
          //本月
          setMonth() {
            const start = dayjs().startOf("month").format("YYYY-MM-DD");
            const end = dayjs().endOf("month").format("YYYY-MM-DD");
            this.date = [start, end];
          },
          //本年
          setYear() {
            const start = dayjs().startOf("year").format("YYYY-MM-DD");
            const end = dayjs().endOf("year").format("YYYY-MM-DD");
            this.date = [start, end];
          },
    }
  }
</script>

<style scoped>
  .clearfix {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .header {
    position: absolute;
    right: 0;
  }

  .header span {
    margin: 0 10px;
  }

  .el-card__header {
    border-bottom: 0 !important;
  }

  .mycharts {
    width: 100%;
    height: 500px;
  }

  ul {
    list-style: none;
    padding: 10px;
  }

  li {
    margin: 15px;
  }

  li span {
    margin: 5px;
  }

  .rindex {
    position: relative;
    z-index: 1;
    margin: 0;
  }

  .rindex::before {
    content: '';
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background-color: red;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    z-index: -1;
  }
</style>
