/*************************************
*  create by xieyuanyuan date 2018/07/06
*  首页管理 - 投票活动列表
**************************************/ 
<template>
  <activity-list pageType="org"></activity-list>
</template>

<script>
  import ActivityList from '../../common/vote_activity_list/ActivityList.vue'
  export default {
    components: {
      'activity-list': ActivityList,
    },
  }
</script>