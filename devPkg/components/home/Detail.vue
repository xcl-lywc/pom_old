<template>
  <div v-if="newsDetailData">
    <!-- 右边内容 -->
    <div class="detail-wrapper">
      <!-- 面包屑 -->
      <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/' }">政策法规</el-breadcrumb-item> -->
        <el-breadcrumb-item>{{newsDetailData.articleName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="detail-content pad20" v-html="newsDetailData.articleContent"></div>
      <div class="padl20" v-if="newsDetailData.privateFiles" 
        v-for="(itemFile, indexFile) in JSON.parse(newsDetailData.privateFiles)" 
        :key="indexFile">
        附件{{indexFile + 1}}：
        <el-button 
          type="text"
          title="点击下载"
          @click="$util.downloadFile(itemFile.id)">
            {{itemFile.name}}
        </el-button>
        <el-button 
          style="display: none;"
          v-if="$util._validateFileFormat(itemFile.name)" 
          type="primary" 
          size="mini" 
          @click="$util.fileEditOrPreview(itemFile.id, 'onlyread')">可在线预览</el-button>
      </div>
      <div class="comment-wrapper pad20">
        <hr class="hr-manage">
        <div class="operation-block text-right">
          <el-checkbox :disabled="laudScore" v-model="newsDetailData.isLike" @change="newsLike">赞</el-checkbox>
          <el-button size="small" type="primary" :disabled="commentScore" @click="commentDialogVisible = true">评论</el-button>
          <el-button size="small" type="primary" :disabled="!newsDetailData.allowLearn" @click="learnNews">学习</el-button>
          <el-button size="small" type="primary" :disabled="errorScore" @click="errorDialogVisible = true">报错</el-button>
          <el-button size="small" type="primary" @click="collectionNews">{{newsDetailData.isCollection ? '取消收藏' : '收藏'}}</el-button>
        </div>
        <hr class="hr-manage">
        <div class="common-content">
          <div v-for="(itemComment, index) in commentList">
            <h4><img class="marr5" src="../../images/urser_black_manage.png" /><span class="marr5">{{itemComment.creator}}</span> <span>{{_convertDate(itemComment.createTime)}}</span></h4>
            <p class="marl20 padl5">{{itemComment.commentContent}}</p>
          </div>
        </div>
      </div>
      <hr class="hr-manage">
    </div>
    <!-- 评论模态框 -->
    <el-dialog
      class="dialog"
      title="评论"
      :visible.sync="commentDialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-input v-model="form.commentContent" type="textarea"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="commentDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="commentNewsYes">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 报错模态框 -->
    <el-dialog
      class="dialog"
      title="报错"
      :visible.sync="errorDialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-input v-model="form.errorContent" type="textarea"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="errorDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="errorCorrectionNews">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
    	return {
        commentDialogVisible: false,  //为true，显示评论弹框 ，false不显示
        errorDialogVisible:   false,  //为true，显示报错弹框 ，false不显示
        newsDetailData: null,         //新闻详情数据
        commentList: [],              //评论列表
        newsId: this.$route.params.id,
        linkChecked: true,      
        form: {                       //需提交后台的表单数据
          commentContent: '',   
          errorContent:   '',
        }
    	}
    },
    mounted(){
      this.getNewDetail();
      this.getCommentList();
    },
    methods: {
      /*
      * 查询新闻详情
      */
      getNewDetail() {
        let self = this, data = null;
        self.$request.requestAxios('get', basePath + '/a_info/'+ self.newsId +'/detail/from_org/' + this.$store.state.currentPartyOrg.code, "", 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.newsDetailData = resposeData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_info/'+ self.newsId +'/detail - 失败')
        });
      }, 
      /*
      * 评论列表
      */
      getCommentList() {
        let self = this, data = null;
        self.$request.requestAxios('get', basePath + '/a_reviewes/list', {params: {status: 2, fromId: self.newsId, fromType: '1'}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.commentList = resposeData.data.rows;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败')
        });
      },
      /*
      * 新闻点赞
      * @return data
      */
      newsLike() {
        let self = this, data = null;
        self.$request.requestAxios('get', basePath + '/a_like/'+ self.newsId +'/1/like', "", 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getNewDetail();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_like/'+ self.newsId +'/1/like - 失败')
        });
      },
      /*
      * 评论新闻
      */
      commentNewsYes() {
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/a_reviewes/review', 
          {fromId: self.newsId, fromType: '1', commentContent: self.form.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList();
            self.$message.success(resposeData.meta.message);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review')
        });

        // ------- 关闭弹框 ----------
        self.commentDialogVisible = false;
        // ---------- 清空数据 --------
        self.form.commentContent = null;
      },
      /*
      * 学习新闻
      * @return data
      */
      learnNews() {
        let self = this, data = null;
        self.$request.requestAxios('get', basePath + '/a_info/learn/' + this.newsId, '', 
          function(respose) {// 请求成功回调函数...
            self.getNewDetail();
            self.$message.success(respose.data.meta.message);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_info/learn/ - 失败')
        });
      },
      /*
      * 新闻报错
      * @return data
      */
      errorCorrectionNews() {  
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/a_errors/error', 
          {fromId: self.newsId, fromType: '1', errorContent: self.form.errorContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.$message('报错成功！！！！')
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_errors/error - 失败')
        });

        // ------- 关闭弹框 ----------
        self.errorDialogVisible = false;
        // ---------- 清空数据 --------
        self.form.errorContent = null;
      },
      /*
      * 收藏新闻
      * @return data
      */
      collectionNews() {  
        let self = this, data = null;
        self.$request.requestAxios('patch', basePath + '/a_collection/'+ self.newsId +'/1/collect/toggle',"", 
          function(respose) {// 请求成功回调函数...
            self.getNewDetail();
            self.$message(respose.data.meta.message)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_collection/'+ self.newsId +'/1/collect/toggle - 失败')
        });
        // ------- 关闭弹框 ----------
        self.errorDialogVisible = false;
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月' +
               new Date(date).getDate() + '日 ' +
               new Date(date).getHours() + ":" +
               new Date(date).getMinutes()+ ":" +
               new Date(date).getSeconds();
      },
    }
  };
</script>
