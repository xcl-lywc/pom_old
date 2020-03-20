/*************************************
*  create by xieyuanyuan date 2018/12/03
*  时间选择器
**************************************/ 
<template>
   <div class="date-type-div">
    <!-- 时间区间，由于年-月elementui不支持区间选择只能写两个时间组件 -->
    <div v-if="isTimeRange">
      <el-date-picker  
        :disabled="isDisabled" 
        :type="dateTypeCom" 
        placeholder="选择日期" 
        v-model="beginDatetime" 
        style="width: 40%"
        @change="((val) => (dataRangeChange(val,'bengin')))">
      </el-date-picker>
      -
      <el-date-picker  
        :disabled="isDisabled" 
        :type="dateTypeCom" 
        placeholder="选择日期" 
        v-model="endDatetime" 
        style="width: 50%"
        :picker-options="minTime"
        @change="((val) => (dataRangeChange(val,'end')))">
      </el-date-picker> 
    </div>
    <el-date-picker 
      v-if="!isTimeRange"
      :disabled="isDisabled" 
      :type="dateTypeCom" 
      placeholder="选择日期" 
      v-model="value" 
      style="width: 100%"
      @change="dateChange">-
    </el-date-picker> 
    <el-select v-show="!isDisabled" class="type" v-model="dateType" @change="selectChange">
      <el-option label="年" value="1"></el-option>
      <el-option label="年-月" value="2"></el-option>
      <el-option label="年-月-日" value="3"></el-option>
      <el-option label="年-月-日 时:分:秒" value="4"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    props:{
      dateType:{ //时间类型 
        default: '1', //1为年，2为年-月，3为年-月-日 4为年-月-日 时:分:秒
      }, 
      isDisabled:{ //为true禁用时间器
        default: false, 
      },
      value: {  //时间值
        default: null,
      },
      isTimeRange:{  //true是一个时间区间，否则不是
        default: false,
      },
      beginDatetime:{ //用于时间区间
        default: null,
      },
      endDatetime:{  //用于时间区间
        default: null,
      }
    },
    computed:{
      dateTypeCom(){
        // ------------------ 将数字转为字符串 ----------------- 
        this.dateType = this.dateType ? this.dateType.toString() : ''; 

        if(this.dateType == 1){
          return 'year';
        }else if(this.dateType == 2){
          return 'month';
        }else if(this.dateType == 3){
          return 'date';
        }else {
          return 'datetime';
        }
      } 
    },
    components:{
    },
    data() { 
      return {
        dateTypeString: '1', //用于下拉
        minTime: null, // 日期区间中结束日期的最小值
      }
    },
    watch:{
    },
    mounted() {
    },
    methods:{
      /*
       * 广播时间类型
       */
      selectChange(val){ 
        this.$emit('dateTypeEmit', val);
      },
      /*
       * 广播时间
       */
      dateChange(val){  
        this.$emit('dateEmit', new Date(val).getTime())
      },
      /*
       * 时间区间
       */
      dataRangeChange(val, dataType){
        if(dataType == 'bengin'){
          // ----------- 结束时间小于开始时间，将结束时间绑定为开始时间
          if(this.endDatetime < this.beginDatetime){ 
            this.endDatetime = this.beginDatetime;
            this.$emit('dateEmit', [this.beginDatetime, this.beginDatetime]);
          }else{
            this.$emit('dateEmit', [this.beginDatetime, this.endDatetime]);
          }
        }else{
          if(this.endDatetime < this.beginDatetime){ 
            this.beginDatetime = this.endDatetime;
            this.$emit('dateEmit', [this.beginDatetime, this.beginDatetime]);
          }else{
            this.$emit('dateEmit', [this.beginDatetime, this.endDatetime]);
          }
        }
        
         
      }
    }
  }
</script>
<style lang="less">
  .date-type-div{
    position: relative;
    .type{
      position: absolute;
      right: 0;
      width: 100px;
      top: 0;
    }
  }
</style>