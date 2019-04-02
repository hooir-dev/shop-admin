<template>
  <div>
    <div id="main" ref="main" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.main)

    // 显示标题，图例和空的坐标轴
    this.myChart.setOption({
      title: {
        text: '异步数据加载示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: []
      }]
    })
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:8080/data.json'
      })
      // 填入数据
      this.myChart.setOption({
        xAxis: {
          data: data.categories
        },
        series: [{
          // 根据名字对应到相应的系列
          name: '销量',
          data: data.data
        }]
      })
    }
  }
}
</script>
<style scoped>
</style>
