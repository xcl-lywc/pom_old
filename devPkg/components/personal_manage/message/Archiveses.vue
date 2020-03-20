/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 获得性
**************************************/ 
<template>
  <div class="personal-message content-manage personal-top"> 
    <!-- 获得性 -->
    <my-archiveses :hisToryData="hisToryData" :rosterId="rosterId" :mathRandom="mathRandom" :afferentUserId="afferentUserId"></my-archiveses>
  </div>
</template>

<script>
  import archiveses from '../messageComponents/Archiveses.vue';
  export default {
    props:{
      hisToryData:{ //当有表单数据时，表示是从任务哪儿发送过来的。
        required: false,
        default: null,
      },
      rosterId:{ //人员Id
        required: false,
        default: null,
      },
      mathRandom: { // 适用于花名册，查看详情
        required: false,
        default:  0,
      },
      afferentUserId:{ //父组件传入的用户Id
        required: false,
        default: null,
      }
    },
    components:{
      'my-archiveses': archiveses, //获得性
    },
    data() {
      return {}
    },
    mounted() { 
    },
    methods:{
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