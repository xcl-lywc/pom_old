/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 投票列表 - 投票详情
**************************************/ 
<template>
  <vote pageType="org"></vote>
</template>

<script>
  import Vote from '../../common/vote_activity_list/Vote.vue'
  export default {
    components: {
      'vote': Vote,
    },
  }
</script>