/*************************************
*  create by xieyuanyuan date 2018/05/30
*  首页管理 - 组织工作台 - 基本信息
**************************************/ 
<template>
  <div class="personal-message content-manage personal-top">
    <!-- 面包屑 -->
    <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>党组织基本信息</el-breadcrumb-item>
    </el-breadcrumb> 
    <!-- 个人基本信息 -->
    <div class="personal-wrapper">
      <h1 class="title marb20">|| 党组织基本信息</h1>
      <el-form v-loading="isLoad" ref="form" size="small" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark photo-message">
              <div class="photo">
                <img v-if="form.headImg" alt="暂无头像" :src="form.headImg" class="avatar">
                <img v-else src="../../../static/images/default-photo.jpg"/>
              </div>
              <div class="other">
                <p>名称：{{form.name ? form.name : '暂无'}}</p> 
                <p>邮箱：{{form.email ? form.email : '暂无'}}</p>
                <p>电话：{{form.phoneNum ? form.phoneNum : '暂无'}}</p>
                <p>地址：{{form.address ? form.address : '暂无'}}</p>
                <p>描述：{{form.description ? form.description : '暂无'}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 公告栏 -->
    <div class="personal-wrapper">
      <h1 class="title marb20">|| 公告栏</h1>
      <el-card v-if="noticeList" class="box-card">
        <el-container>
          <el-aside width="200px">
            <el-menu
              default-active="0"
              class="el-menu-vertical-demo">
              <el-menu-item 
                style="line-height: 32px; height: 32px;" @click="noticeMenulan(item)" 
                v-for="(item,index) in noticeList" 
                :key="index"
                :index="index">
                <span>{{item.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main style="padding: 0 20px;" v-if="noticeDetail" v-html="noticeDetail.content"></el-main>
        </el-container>
        <p v-if="noticeList ? !noticeList.length : true "> 暂无公告 </p>
      </el-card>
    </div>

    <!-- 编辑器 -->
    <div class="personal-wrapper">
      <h1 class="title marb20">|| 内容</h1>
      <div class="personal-wrapper" v-if="richTextList ? richTextList.length : false">
        <el-tabs v-model="activeName" type="card" @tab-click="richHandleClick">
          <el-tab-pane v-for="(item, index) in richTextList" :key="index" :label="item.name" :name="index"></el-tab-pane>
        </el-tabs>
        <el-card class="box-card">
          <div v-html="textHtml">
          </div>
        </el-card>
      </div>
      <el-card v-if="richTextList ? !richTextList.length : true "> 暂无内容</el-card>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        isLoad:         true,
        basePath:       basePath,
        paramId:        this.$route.params.id,
        userData:       JSON.parse(sessionStorage.getItem('userData')),
        orgCode:        sessionStorage.getItem('orgCode'),
        activeName:     '0', 
        richTextList:   [], //富文本列表信息
        noticeList:     null,// 公告栏
        noticeDetail:   null,//公告详情
        textHtml:       null,
        form:{
          "address":        null,
          "description":    null,
          "latitude":       null,
          "longitude":      null,
          "name":           null,
          "headImg":        null,
          "phoneNum":       null,
          "email":          null,
        },
      }
    },
    mounted() {
      this.getQueryOrgDetail();

      this.getQueryRichTextListById();

      this.getQueryNoticeList();
    },
    methods:{
      /*
      * 查询组织基本信息
      */
      getQueryOrgDetail(){
        let self = this;
        this.$request.requestAxios('get', basePath + '/party_orgs/'+ self.paramId +'/partyorg', "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            if(responseData.data){
              self.form = responseData.data;
            }
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/'+ self.paramId +'/partyorg - 失败');
            self.isLoad = false;
          });
      },
      /*
       * 根据组织ID获取所有的富文本信息
       */
      getQueryRichTextListById(){
        this.$request.requestAxios('get', basePath + '/party_orgs_rich_text/rich_text/idandname', 
            {params: {partyOrgId: this.paramId}},
          (response) => { //请求成功的回调...
            this.richTextList = response.data.data;
            if(this.richTextList.length){
              this.getRichTextDetailById();
            }
          }, (error,status) => { //请求失败的回调...
            status == 200 ? this.$message(error.data.meta.message) :
                            this.$message('/party_orgs_rich_text/rich_text/idandname - 失败');
        });
       },
      /*
       * 根据富文本Id查询富文本信息
       */
      getRichTextDetailById(){ 
        this.$request.requestAxios('get', basePath + '/party_orgs_rich_text/rich_text/details/',
            {params: {id: this.richTextList[this.activeName].id}},
          (response) => { //请求成功的回调...
            // ------------- 将数据绑定在编辑器中 -----------------
            this.$nextTick(() => { 
              this.textHtml = response.data.data.content; 
            });
          }, (error,status) => { //请求失败的回调...
            status == 200 ? this.$message(error.data.meta.message) :
                            this.$message('/party_orgs_rich_text/rich_text/details/ - 失败');
        });
      },
      /*
       * 切换文本标签，查询富文本数据
       */
      richHandleClick(){
        this.getRichTextDetailById();
      },
      /*
       * 党支部公告栏列表
       */
      getQueryNoticeList(){
        let self = this;
        this.$request.requestAxios('get', `${basePath}/party_org_notice/notice/list`, {params: {partyOrgId: this.paramId}},
          function(response) { //请求成功的回调...
            self.noticeList = response.data.data;
            // -------- 当列表有数据的情况，查询第一个数据的详情
            self.noticeList.length ? self.noticeMenulan(self.noticeList[0]) : '';
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_org_notice/notice/list - 失败');
        });
      },
      /*
       * 点击查询公告栏详情
       */
      noticeMenulan(item){
        this.$request.requestAxios('get', `${basePath}/party_org_notice/notice/details`, {params: {id: item.id}},
          (response) => { //请求成功的回调...
            this.noticeDetail = response.data.data;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/party_org_notice/notice/list - 失败');
        });
      },
    }
  }
</script>