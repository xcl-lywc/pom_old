/*********************党组织构建***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-15
/************************************************/
<template>
  <div class="content-area">
    <el-row gutter="20px">
      <el-col :span="12" class="col-content"><div id="partyAgeChart" :style="{width: '100%', height: '500px'}"></div></el-col>
      <el-col :span="12" class="col-content"><div id="ageChart" :style="{width: '100%', height: '500px'}"></div></el-col>
      <el-col :span="12" class="col-content"><div id="orgCharts" :style="{width: '100%', height: '500px'}"></div></el-col>
      <el-col :span="12" class="col-content"><div id="statusCharts" :style="{width: '100%', height: '500px'}"></div></el-col>
      <el-col :span="24" class="col-content"><div id="peopleCharts" :style="{width: '100%', height: '500px'}"></div></el-col>
      <el-col :span="12" class="col-content"><div id="missionCharts" :style="{width: '100%', height: '500px'}"></div></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      orgCode:   sessionStorage.getItem('orgCode'),
    }
  },
  props: {
    treeId: {
      type: Number,
      required: true,
    }
  },
  mounted(){
    this.getChartsData("partyAgeChart")
    this.getChartsData("ageChart")
    this.getChartsData("orgCharts")
    this.getChartsData("peopleCharts")
    this.getChartsData("statusCharts")
    this.getMissionChart()
  },
  methods: {
    getMissionChart () {
      let self = this;
      let config = {
        url: `${basePath}/t_tasks/pie/count`,
        method: "post",
        data: {
          types: [1,2,3,4,5,6,7,8,10,11,12,14,15,16,17,18,19,20,21],
          partyOrgId: this.treeId
        }
      }

      self.$request.requestAxios(config.method, config.url, config.data,
        (response) => {
          this.drawPie("missionCharts", response.data.data, "任务数量");
        },
        (error) => {
          self.$message.error(error.message)
        }
      )
    },
    getChartsData (elementId) {
      let self = this;
      let targetUrl = ""
      let title = ""
      switch(elementId) {
        case "partyAgeChart":
          title = "党龄统计图"
          targetUrl = `${basePath}/party_member_infos/chart/partyage/from_org/${this.orgCode}?interval=1`
          break;
        case "ageChart":
          title = "年龄统计图"
          targetUrl = `${basePath}/party_member_infos/chart/age/from_org/${this.orgCode}?interval=2&beginAge=18`
          break;
        case "orgCharts":
          title = "党支部、党小组统计"
          targetUrl = `${basePath}/party_orgs/chart/org/from_org/${this.orgCode}`
          break;
        case "peopleCharts":
          title = "党员数目"
          targetUrl = `${basePath}/party_orgs/chart/mem/from_org/${this.orgCode}`
          break;
        case "statusCharts":
          title = "党员阶段统计图"
          targetUrl = `${basePath}/party_member_infos/chart/stage/from_org/${this.orgCode}`
          break;
        default:
          break;
      }
      
      let config = {
        url: targetUrl,
        method: "get"
      }

      self.$request.requestAxios(config.method, config.url, null,
        (response) => {
          if(elementId != "peopleCharts") {
            this.drawPie(elementId, response.data.data, title);
          } else {
            this.drawLine(elementId, response.data.data, title);
          }
        },
        (error) => {
          self.$message.error(error.message)
        }
      )
    },
    drawPie (elementId, data, title){
      // 基于准备好的dom，初始化echarts实例
      this[elementId] = null // 清空实例(已创建的情况)
      this[elementId] = this.$echarts.init(document.getElementById(elementId))

      // 绘制图表
      this[elementId].setOption({
        title : {
          text: title,
          x: 'center',
          top: 20,
        },
        color: ['#2f4554', '#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x : 'center',
          y : 'bottom',
          data: this.returnLegend(data)
        },
        calculable : true,
        series : [
          {
            name:'数量',
            type:'pie',
            radius : [20, 110],
            // center : ['25%', '50%'],
            roseType : 'radius',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: data
          },
        ]
      });
    },
    drawLine (elementId, data, title) {
      // 基于准备好的dom，初始化echarts实例
      this[elementId] = null // 清空实例(已创建的情况)
      this[elementId] = this.$echarts.init(document.getElementById(elementId))
      let handledData = this.handleLineData(data)
      // 绘制图表
      this[elementId].setOption({
        title : {
          text: title,
          x: 'center',
          top: 20,
        },
        color: ['#2f4554', '#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type : 'category',
          splitLine: {show:false},
          data : handledData.xAxis
        },
        yAxis: {
            type : 'value'
        },
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: handledData.transparentData
        },
        {
          name: '人数',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: handledData.data
        }
      ]
    });
    },
    handleLineData(data) {
      let arrays = {
        xAxis: [],
        transparentData: [],
        data: []
      }
      data.forEach((item, index) => {
        arrays.xAxis.push(item.name)
        arrays.transparentData.push(item.dValue)
        arrays.data.push(item.value)
      })

      return arrays
    },
    returnLegend(data) {
      let array = []

      data.forEach((item, index) => {
        array.push(item.name)
      })
      
      return array 
    }
  }
}
</script>
<style>
  .col-content {
    box-sizing: border-box;
    border: 1px solid #eee;
  }
</style>