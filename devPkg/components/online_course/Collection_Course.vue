/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 党课收藏
**************************************/ 
<template>
  <div class="content-manage">
    <course-list :listType="true" routerName="Course_Detail"></course-list>
  </div>
</template>

<script>
  import Course_List from '../common/manage/Course_List.vue'
  export default {
    components:{
      "course-list": Course_List, // 课程列表组件
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