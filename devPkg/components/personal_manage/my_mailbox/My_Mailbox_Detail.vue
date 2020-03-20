/****************************************
*  create by xieyuanyuan date 2018/05/21
*  首页管理-个人中心-我的信箱详情
****************************************/
<template>
	<div v-if="detail" class="content-manage personal-top collection-page">
    <el-card class="box-card" v-loading="isLoad">
      <p class="marb5">收件人：{{detail.addresseeName}}</p>
      <p class="marb5">发件人：{{!detail.anonym ? detail.createrName : '匿名'}}</p>
      <p class="marb5">发送时间：{{$util._convertDate(detail.sendTime, 'yyyy年MM月dd日 hh:mm:ss')}}</p>
    </el-card>
    <el-card class="box-card mart10" v-loading="isLoad">
      <div slot="header" class="clearfix">
        <span>正文</span>
      </div>
      <p class="marb5" v-html="detail.content"></p>
    </el-card>
    <el-card class="box-card mart10" v-loading="isLoad">
      <div slot="header" class="clearfix">
        <span>处理意见</span>
      </div>
      <p class="marb5">{{detail.opinion}}</p>
    </el-card>
    <el-card class="box-card mart10" v-loading="isLoad">
      <div slot="header" class="clearfix">
        <span>处理反馈</span>
        <span class="fr">
          <span class="fl">评分：</span>
          <el-rate class="fl" 
            v-model="detail.satisfaction"
            disabled
            show-score
            text-color="#ff9900"></el-rate>
        </span>
      </div>
      <p class="marb5">{{detail.assessment}}</p>
    </el-card>
    
    <el-card class="box-card mart10" v-loading="isLoad">
      <div slot="header" class="clearfix">
        <span>沟通记录</span>
      </div>
      <div>
        <div class="leave-message-detail">
          <div v-for="(itemComment, index) in comment.commentList" class="padt15 padl20">
            <h5>
              <img class="marr5" src="../../../images/urser_black_manage.png" />
              <span class="marr5">{{itemComment.creator}}</span> 
              <span>{{$util._convertDate(itemComment.createTime,'yyyy年MM月dd日')}}</span>
            </h5>
            <p class="marl20 padl15 padt5">{{itemComment.commentContent}}</p>
          </div>
        </div>
        <div class="leave-message text-right mart20">
           <el-input type="textarea" placeholder="请回复点什么吧" v-model="comment.commentContent"></el-input>
           <el-button size="small" type="primary" class="mart20 marr20" @click="replyAdd">评论</el-button>
        </div>
      </div>
    </el-card>
	</div> 
</template>

<script>
  export default {
    data() {
      return {
        isLoad:   true, //等待事件
        paramsId: this.$route.params.id,
        orgCode:  sessionStorage.getItem('orgCode'), //党组织code
        orgId:    sessionStorage.getItem('orgId'),   //党组织code
        detail:   null,
        comment: {
          commentContent: null,
          commentList:   [], //评论列表 

        }  
      }
    },
    mounted() {
       this.getQueryList();
    },
    methods: {
      /*
       * 查询课程列表
       */
      getQueryList(){
        this.$request.requestAxios('get', `${this.$util.basePath}/email/${this.paramsId}/details`, '',
          (response) => { //请求成功的回调...
            this.detail = response.data.data;
            this.getCommentList();
            this.isLoad = false;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(`${this.$util.basePath}/email/${this.paramsId}/details - 失败`);
            this.isLoad = false;
          });
       },
      /*
       * 评论列表
       */
      getCommentList() {
        let self = this, data = null;
        self.$request.requestAxios('get', basePath + '/t_tasks/review/list', {params: {fromId: self.detail.taskId, fromType: '2'}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.comment.commentList = resposeData.data.rows;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败')
        });
       },
      /*
       * 回复
       */
      replyAdd(id) {
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/t_tasks/review', 
          {fromId: self.detail.taskId, fromType: '2', commentContent: self.comment.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList();
            // ---------- 清空数据 --------
            self.comment.commentContent = null; 
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review - 失败')
        });
       },
    }
  }
</script>
