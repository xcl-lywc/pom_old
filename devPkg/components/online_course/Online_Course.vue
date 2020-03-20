/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 上课管理
**************************************/ 
<template>
  <div class="content-manage">
    <course-list :refresh="isOrgIdChange" :listType="false" routerName="Course_Detail"></course-list>
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
        isOrgIdChange: null,
      }
    },
    mounted() {
    },
    destoryed() {
       
    },
    methods:{
      pageLocalRefresh(){
        this.isOrgIdChange = sessionStorage.getItem('orgId');
      }
    }
  }
</script>