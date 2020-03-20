/*************************************
*  create by xieyuanyuan date 2018/06/21
*  首页管理 - 网上党课 - 课时详情
**************************************/ 
<template>
  <div>
	  <!-- 面包屑 -->
	  <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
	    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	    <el-breadcrumb-item>党课详情</el-breadcrumb-item>
	  </el-breadcrumb>
	  <course-detail-util :courseId="$route.params.id" routerName="Learn_Party_School"></course-detail-util>
  </div>
</template>

<script>
  import Course_Detail_Util from '../../common/manage/Course_Detail_Util.vue'
  export default {
    components:{
      "course-detail-util": Course_Detail_Util, 
    },
  }
</script>