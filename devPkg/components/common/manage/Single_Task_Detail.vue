/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务列表
**************************************/ 
<template>
  <!-- 任务详情 -->
  <el-dialog 
    class="task-detail-dialog dialog"
    title="任务详情"
    :visible.sync="showDialog"
    width="800px">
    <div v-if="singleTaskDetail">
      <h4 class="remind-time">
        <span>{{ _remainingTime(singleTaskDetail.endTime) }}</span> 
        <!-- 后期新增此功能 -->
        <!-- <span class="fr">
          <img src="../../../images/edit_icon.png"/>
          <img src="../../../images/del24_icon.png"/>
        </span> -->
      </h4>
      <h4 class="title"><el-checkbox v-model="form.endTimeChecked">{{singleTaskDetail.taskName}}</el-checkbox></h4>
      <p class="deadline">截止时间：<img class="marr5" src="../../../images/time.png"/><span>{{_convertDate(singleTaskDetail.endTime)}}</span></p>
      <p class="learn">{{singleTaskDetail.creator}}</p>
      <!-- 后期新增此功能 -->
      <!-- <p class="text-right btn-complete">
        <el-button type="primary">去完成</el-button>
        <el-button type="info">已完成</el-button>
      </p> -->
      <p class="complete-detail"><img src="../../../images/learns.png"/><span>已完成{{singleTaskDetail.finishs}}</span><span>未完成{{singleTaskDetail.allTask-singleTaskDetail.finishs}}</span><span>未读6</span></p>
      <div class="copy">
        <p><img src="../../../images/user#000.png"/>抄送人</p>
        <p class="head">
          <el-tooltip 
            v-for="(itemHead, itemHeadIndex) in singleTaskDetail.copyList" 
            :key="itemHeadIndex" 
            class="item" 
            effect="dark" 
            :content="'姓名：' + itemHead.userName" 
            placement="top-start">
            <img v-if="itemHead.headImgUrl" alt="暂无头像" :src="itemHead.headImgUrl"/>
            <img v-else alt="暂无头像" src="../../../images/no_picture.png"/>
          </el-tooltip>
        </p>
      </div>
      <div class="leave-message-detail">
        <img src="../../../images/ifron#000.png"/>
        留言
        <div v-for="(itemComment, index) in commentList">
          <h5>
            <img class="marr5" src="../../../images/urser_black_manage.png" />
            <span class="marr5">{{itemComment.creator}}</span> 
            <span>{{_convertDate(itemComment.createTime)}}</span>
          </h5>
          <p class="marl20 padl20">{{itemComment.commentContent}}</p>
        </div>
      </div>
      <div class="leave-message text-right">
         <el-input type="textarea" placeholder="请回复点什么吧" v-model="form.commentContent"></el-input>
         <el-button size="small" type="primary" @click="replyAdd(singleTaskDetail.id)">回复</el-button>
      </div>
    </div>
  </el-dialog>   
</template>
<script>
  export default {
    props:{
      detailId: {   //详情ID
        required: true,
      },
      mathRandom: {
        type: Number, 
        required: true,
        default: 0,     //为0不显示弹框
      }
    },
    data() {
      return {
        singleTaskDetail: null,           //任务详情   
        form: {
          endTimeChecked: false,      //为true截止时间不能选择，
          commentContent: null,
        },
        showDialog: false,          //为true显示弹框
      }
    },
    mounted() {
    },
    watch:{
      mathRandom:{
        handler(data){
          if(data != 0 ){ //当页面不为0的情况先查询数据
            this.showDialog = true;
            this.getQueryTaskDetail(this.detailId);
          }
          console.log(data)
        },
        deep: true,
      },
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 查询任务详情
      * @param {string/number} id 数据ID
      */
      getQueryTaskDetail(id){
        let self = this;
        // ------ 显示弹框 ------
        self.showDialog = true;
        self.$request.requestAxios('get', basePath + '/t_tasks/detail/' + id, "",
          function(response) {
            let responseData = response.data;
            self.$set(self, 'singleTaskDetail', responseData.data)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/'+ id +'/detail');
        });
        // ----- 查询任务回复 -----
        self.getCommentList();
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月' +
               new Date(date).getDate() + '日' ;
      },
      /*
      * 计算离结束时间还有几天
      * @param { string } endTime 结束时间
      */
      _remainingTime(endTime){
        let timeDifference = parseInt((endTime - new Date().getTime())/1000/(60*60*24) + 1);
        if(timeDifference>0){
            timeDifference = '预期还有' + timeDifference + '天'; 
        }else{
            timeDifference = '已超时' + (-timeDifference) +'天';
        }
        return timeDifference;
      },
      /*
      * 评论列表
      */
      getCommentList() {
        let self = this, data = null;
        self.$set(self, 'commentList', [])
        self.$request.requestAxios('get', basePath + '/a_reviewes/list', {params: {status: 2, fromId: self.detailId, fromType: '2'}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.$set(self, 'commentList', resposeData.data.rows);
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
        self.$request.requestAxios('post', basePath + '/a_reviewes/review', 
          {fromId: id, fromType: '2', commentContent: self.form.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList();
            // ---------- 清空数据 --------
            self.form.commentContent = null; 
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review - 失败')
        });
      },
    }
  }
</script>