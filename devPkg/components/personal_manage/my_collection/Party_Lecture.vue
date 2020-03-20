/*************************************
*  create by xieyuanyuan date 2018/05/29
*  个人中心 - 我的收藏 - 网上党课
**************************************/ 
<template>
  <div class="content-manage">
    <course-list :listType="true" routerName="Party_School_Detail"></course-list>
  </div>
</template>

<script>
  import Course_List from '../../common/manage/Course_List.vue'
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