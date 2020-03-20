/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 个人中心 - 我的通知
**************************************/ 
<template>
  <inform pageType="personal"></inform>
</template>

<script>
  import inform from '../common/Inform_Component.vue'
  export default {
    components:{
      "inform": inform, // 头部固定内容
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    destoryed() {
       
    },
    methods:{
    }
  }
</script>