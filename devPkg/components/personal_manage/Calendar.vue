<template>
  <div style="overflow-y: auto; height: calc(100vh - 60px)">
    <!-- 搜索表单 -->
    <el-form ref="dateForm" :model="dateForm" class="search-form" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-date-picker
              v-model="dateForm.date"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期"
              :clearable="false"
              :editable="false"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="getCalendarData">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 日历主体(需要根据星期 开头 和 结尾 补充空白天数的格) -->
    <el-row class="calendar-row" v-if="calendarData && calendarData.length > 0" >
      <el-col class="week-title" v-for="(item, index) in weekData" :key="`星期头部${index}`" :span="3">{{ item }}</el-col>
      <el-col class="empty-col" v-for="(item, index) in weekStart" :key="`开头空白${index}`" :span="3"></el-col>
      <el-col class="not-null-col" v-for="(item, index) in calendarData" :key="`天数${index}`" :span="3">
        <span class="day-number">{{ item.day }}</span>
        <p></p>
        <p class="check-time" v-if="item.createTime"><i class="fa fa-check-square-o check-icon" v-if="item.createTime"></i>  {{ _convertDate(item.createTime, true) }}</p>
      </el-col>
      <el-col class="empty-col" v-for="(item, index) in weekEnd" :key="`结尾空白${index}`" :span="3"></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dateForm: {
          date: this._convertDate(new Date(), false)
        },

        weekData:     ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"], // 星期数据
        weekStart:    null,  //当前日历data是以星期几开头, 用以填补开头空白部分
        weekEnd:      null,  //当前日历data是以星期几结尾, 用以填补开头空白部分
        calendarData: [],    //日历
      }
    },
    created () {

    },
    mounted () {
      //初始化查询
      this.getCalendarData()
    },
    watch: {
      //监听日历数据, 生成空白的数量
      calendarData: { 
        handler (newV, oldV) {
          if(newV && newV.length > 0) {
            newV.forEach((item, index) => {
              if(index == 0) {
                this.weekStart = item.week - 1
              }
              if(index == newV.length - 1) {
                this.weekEnd   = 7 - item.week || 0
              }
            })
          }
        },
        deep: true
      }
    },
    methods: {
      /**
       * 获取日历数据
       * @return {[type]} [description]
       */
      getCalendarData () {
        let self = this

        self.$request.requestAxios("get", `${basePath}/hr_user_sign/list?mouthDate=${self.dateForm.date}-01`, null, (response) => {
          if(response.data.meta.code == 0) {
            self.calendarData = response.data.data
          }
        },(error) => {
          self.$message.error("查询日历失败")
        })
      },
      /**
       * 格式化时间戳
       * @param  {number} date  时间戳
       * @param  {boolean} time 是否显示时分秒
       * @return {string}       格式化后的时间字符串
       */
      _convertDate(date, time){
        let month = null
        if(new Date(date).getMonth() + 1 < 10) {
          month = "0" + (new Date(date).getMonth() + 1)
        } else {
          month = new Date(date).getMonth() + 1
        }
        if (time) {
          return new Date(date).getHours() + ':' + new Date(date).getMinutes() + ':' + new Date(date).getSeconds();
        } else {
          return new Date(date).getFullYear() + '-' + month
        }
        
               
      },
      // /*
      // * 时间拼接
      // */
      // dateCovert(date){
      //   let myDate = null
      //   if(date) {
      //     myDate = new Date(date)
      //   } else {
      //     myDate = new Date()
      //   }
        
      //   let week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
      //   this.date = "阳历 " + myDate.getFullYear() + "年" + 
      //             ( myDate.getMonth() + 1 ) + "月" + 
      //             myDate.getDate() + "日&nbsp;&nbsp;&nbsp;&nbsp;" + 
      //             week[myDate.getDay()];
      // },
    },
  }
</script>

<style>
  .search-form .el-row {
    margin: 20px 10px!important;
  }
  .calendar-row {
    margin: 20px;
    border: 1px solid #d2d2d2;
  }
  .calendar-row .el-col-3.week-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
  .calendar-row .el-col-3 {
    width: 14.28555%!important;
    height: 110px;
    background: #fff;
    border: 1px solid #d2d2d2;
  }
  .calendar-row .el-col-3 .check-icon {
    position: absolute;
    right: 4px;
    bottom: 30px;
    font-size: 50px;
    color: #409EFF;
  }
  .calendar-row .empty-col {
    background: #f7f7f7;
  }
  .calendar-row .not-null-col {
    position: relative;
    padding: 10px;
  }
  .calendar-row .not-null-col .day-number {
    color: #0f57a2;
  }
  .calendar-row .not-null-col .check-time {
    position: absolute;
    bottom: 10px;
    right: 10px; 
  }
  .calendar-row .not-null-col:hover {
    background: #f5f5f5;
    cursor: pointer;
  }
</style>
