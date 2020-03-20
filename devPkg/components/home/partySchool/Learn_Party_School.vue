/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 党课学习
**************************************/ 
<template>
  <div v-if="courseDetail">
	  <!-- 面包屑 -->
	  <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
	    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name: 'Party_School_Detail', params: { id: courseId}}">{{courseDetail.lectureTitle}}详情</el-breadcrumb-item>
      
	    <el-breadcrumb-item>学习党课</el-breadcrumb-item>
	  </el-breadcrumb>
	  <learn-course-util :courseId="$route.params.courseId" :periodId="$route.params.periodId"></learn-course-util>
  </div>
</template>
<script>
  import Learn_Course_Util from '../../common/manage/Learn_Course_Util.vue'
  export default {
    components:{
      "learn-course-util": Learn_Course_Util, 
    },
    data(){
      return {
        courseId: this.$route.params.courseId,
        courseDetail: null, 
      }
    },
    mounted() {
      this.getQueryCourseDetail();
    },
    methods: {
      /*
      * 查询课程列表
      */
      getQueryCourseDetail(){
        this.$request.requestAxios('patch', basePath + '/l_lecture/'+ this.courseId +'/item', "",
          (response) => { //请求成功的回调...
            var responseData = response.data;
            this.courseDetail = responseData.data;
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error('/l_lecture/'+ this.courseId +'/item - 失败');
          });
      },
    }
  }
</script>