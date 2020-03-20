/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 课时详情
**************************************/ 
<template>
  <course-detail-util :courseId="$route.params.id" pageType="org" routerName="Learn_Course"></course-detail-util>
</template>

<script>
  import Course_Detail_Util from '../common/manage/Course_Detail_Util.vue'
  export default {
    components:{
      "course-detail-util": Course_Detail_Util, // 头部固定内容
    },
  }
</script>