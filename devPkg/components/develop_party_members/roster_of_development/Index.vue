/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 组织工作台 - 发展党员
**************************************/ 
<template>
  <el-main  class="content-manage">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
  	    <el-tab-pane label="党员名册" name="1"></el-tab-pane>
  	    <el-tab-pane label="预备党员名册" name="2"></el-tab-pane>
  	    <el-tab-pane label="积极分子名册" name="3"></el-tab-pane>
  	    <el-tab-pane label="申请入党名册" name="4"></el-tab-pane>
  	  </el-tabs>
    </div>
    <!-- 党员名册 -->
	  <party-member v-if="activeName == 1"></party-member>
    <!-- 预备党员名册 -->
    <prepare-party-member v-if="activeName == 2"></prepare-party-member>
    <!-- 积极分子名册 -->
    <activist v-if="activeName == 3"></activist>
    <!-- 申请入党名册 -->
    <apply-party-membership v-if="activeName == 4"></apply-party-membership>

    <!-- 预备党员登记 -->

  </el-main>
</template>

<script>

  import PartyMember from './PartyMember.vue'
  import PreparePartyMember from './PreparePartyMember.vue'
  import Activist from './Activist.vue'
  import ApplyForPartyMembership from './ApplyForPartyMembership.vue'
  export default {
    data() {
      return {
        isLoad:        true,
        activeName:    '1',
        orgCode:       sessionStorage.getItem('orgCode'),  
      }
    },
    components: {
      'party-member': PartyMember,
      'prepare-party-member': PreparePartyMember,
      'activist': Activist,
      'apply-party-membership': ApplyForPartyMembership,
    },
    mounted() {
      
    },
    destoryed() {
       
    },
    methods:{
  	  /*
       * 切换改变页面数据
       */
      handleClick(){
        
       },
    }
  }
</script>