/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党校
**************************************/ 

<template>
  <div>
	  <!-- 面包屑 -->
	  <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
	    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	    <el-breadcrumb-item>网上党校</el-breadcrumb-item>
	  </el-breadcrumb>
	  <course-list class="pad20" :listType="false" routerName="Party_School_Detail"></course-list>
  </div>
</template>

<script>
  import Course_List from '../../common/manage/Course_List.vue'
  export default {
    components:{
      "course-list": Course_List, // 课程列表组件
    },
  }
</script>


