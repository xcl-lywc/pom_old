/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 个人中心 - 党员档案登记
**************************************/ 
<template>
  <el-main  class="content-manage">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-model="activeName">
  	    <el-tab-pane label="积极分子登记" name="2"></el-tab-pane>
        <el-tab-pane label="预备党员登记" name="3"></el-tab-pane>
        <el-tab-pane label="转正申请登记" name="1"></el-tab-pane>
  	  </el-tabs>
    </div>
    <el-card class="box-card mart20">
      <!-- 党员名册 -->
      <partyMember pageType="personal" v-if="activeName == 1"></partyMember>
      <!-- 积极分子名册 -->
      <activist-register pageType="personal" v-if="activeName == 2"></activist-register>
      <!-- 预备党员名册 -->
      <preparePartymember pageType="personal" v-if="activeName == 3"></preparePartymember>
    </el-card>
  </el-main>
</template>

<script>
  import ActivistRegister from '../common/develop_party_members/ActivistRegister.vue'
  import PartyMemberRegister from '../common/develop_party_members/PartyMemberRegister.vue'
  import PreparePartyMemberRegister from '../common/develop_party_members/PreparePartyMemberRegister.vue'
  export default {
    components: {
      'activist-register': ActivistRegister,
      'partyMember': PartyMemberRegister,
      'preparePartymember': PreparePartyMemberRegister
    },
    data() {
      return {
        activeName: '2',
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