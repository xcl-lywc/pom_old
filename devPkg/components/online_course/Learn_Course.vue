/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 学习党课
**************************************/ 
<template>
  <learn-course-util :courseId="$route.params.courseId" :periodId="$route.params.periodId"></learn-course-util>
</template>

<script>
  import Learn_Course_Util from '../common/manage/Learn_Course_Util.vue'
  export default {
    components:{
      "learn-course-util": Learn_Course_Util, // 头部固定内容
    },
  }
</script>