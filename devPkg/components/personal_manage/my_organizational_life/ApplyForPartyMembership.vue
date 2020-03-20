/****************************************
*  create by xieyuanyuan date 2018/09/03
*  首页管理-个人中心-入党申请
****************************************/
<template>
	<task-list pageType="personal" taskType="10" taskTitle="申请入党"></task-list>
</template>
<script>
  import Task_List from '../../task_manage/Task_List.vue'
  export default {
    components:{
      'task-list':      Task_List,
    },
    computed:{
    },
    data() {
      return{
        
      }
    },
    mounted() {
      
    },
    watch:{
    },
    methods:{
      
    }
  }
</script>