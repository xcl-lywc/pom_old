/*************************************
*  create by xieyuanyuan date 2018/07/06
*  首页管理 - 创建选票问卷
**************************************/ 
<template>
  <create-vote @createBack="createBackFun" :paramsId="paramsId"></create-vote>
</template>

<script>
  import CreateVote from '../../common/vote_activity_list/CreateVote.vue'
  export default {
    components: {
      'create-vote': CreateVote
    },
    data(){
      return {
        paramsId: this.$route.params.id,  //为add时表示，新增投票，否者为编辑
      }
    },
    methods:{
      /*
       * 选票回调
       */
      createBackFun(data){
        this.$message.success({message: '保存成功，将跳转到列表页！', duration: 1000});
        setTimeout(() => {
          this.$router.push({path: '/vote_index/vote_list'});
        },1500);
      }
    },
  }
</script>