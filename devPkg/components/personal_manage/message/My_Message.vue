/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 我的信息
**************************************/ 
<template>
  <div class="personal-message content-manage personal-top">
    <!-- 个人基本信息 (如果是从历史记录跳转过来的那么就判断是否是只显示基本信息，否者的话，就直接显示) -->
    <my-message :hisToryData="hisToryData" :rosterId="rosterId" :mathRandom="mathRandom" :afferentUserId="afferentUserId"></my-message>
  </div>
</template>

<script>
  import myMessage from '../messageComponents/My_Message.vue';
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
      'my-message': myMessage, //个人基本信息
    },
    data() {
      return {}
    },
    watch:{
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