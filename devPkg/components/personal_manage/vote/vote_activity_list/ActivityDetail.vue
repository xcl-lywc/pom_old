/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 投票列表 - 投票详情
**************************************/ 
<template>
  <activity-detail pageType="personal"></activity-detail>
</template>

<script>
  import ActivityDetail from '../../../common/vote_activity_list/ActivityDetail.vue'
  export default {
    components: {
      'activity-detail': ActivityDetail,
    },
  }
</script>