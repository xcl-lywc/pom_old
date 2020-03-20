/*********************主题活动-详情***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-11
/************************************************/
<template>
  <div class="content-manage">
    <el-button type="primary" @click="$router.push({name: 'Theme_Theme'})">返回</el-button>
    <div class="detail-wrap" v-loading="detailLoading">
      <p class="detail-item"><span class="detail-label">活动名称:</span>{{detailData.name}}</p>
      <p class="detail-item"><span class="detail-label">活动地点:</span>{{detailData.address}}</p>
      <p class="detail-item"><span class="detail-label">活动时间:</span>{{$util._convertDate(detailData.beginTime, "yyyy年MM月dd日 hh时：mm分")}} ~ {{$util._convertDate(detailData.endTime, "yyyy年MM月dd日 hh时：mm分")}}</p>
      <p class="detail-item"><span class="detail-label">活动方案:</span>
          <!-- <el-button type="text" size="small" href="javascript:void(0)" @click="downloadFile(JSON.parse(detailData.plan)[0].fileId)">{{fileName}}</el-button> -->
          <el-button 
          type="text"
          size="small"
          title="点击下载"
          @click="downloadFile(JSON.parse(detailData.plan)[0].fileId)">
          {{fileName}}
        </el-button>
        <el-button 
          v-if="$util._validateFileFormat(fileName)" 
          type="primary" 
          size="mini" 
          @click="$util.fileEditOrPreview(JSON.parse(detailData.plan)[0].fileId, 'onlyread')">可在线预览</el-button>
      </p>

      <el-card class="box-card mart20 marb20">
        <div slot="header" class="clearfix">
          <span>活动安排</span>
          <el-button class="fr" type="primary" size="mini" @click="showAdd">新增</el-button>
        </div>
        <el-table
          :data="detailData.activeStages"
          stripe
          style="width: 100%">
          <el-table-column
            prop="stageName"
            label="阶段名称">
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="开始时间">
            <template slot-scope="scope">
              {{$util._convertDate(scope.row.beginTime, "yyyy年MM月dd日 hh时：mm分")}}
            </template>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间">
            <template slot-scope="scope">
              {{$util._convertDate(scope.row.endTime, "yyyy年MM月dd日 hh时：mm分")}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作" 
            width="250px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" 
                :disabled="scope.row.status == 2" 
                @click="showEdit(scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" 
                :disabled="scope.row.status == 2" 
                @click="showInsert(scope.row)">插入</el-button>
              <el-button type="danger"  size="mini" :disabled="scope.row.status == 2" @click="delActiveStages(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <!-- <el-button type="primary" class="fr mart20 marb20" size="mini" >提交</el-button> -->
        </div>
      </el-card>
      <div class="review-list-wrap">
        <div v-for="(item, index) in reviewData" :key="`评论${index}`" class="review-item-wrap">
          <img :src="item.picture" style="width: 50px;height: 50px;">
          <div>
            <p>{{ item.creator }} {{ $util._convertDate(item.createTime, "yyyy年MM月dd日 hh时：mm分") }}</p>
            <p>{{ item.commentContent }}</p>
          </div>
        </div>
        <div class="no-data-text" v-if="reviewData && reviewData.length == 0">暂无评论</div>
      </div>
      <el-form ref="reviewForm" :model="reviewForm" size="small" @submit.native.prevent>
        <el-form-item
          prop="commentContent"
          :rules="[
            { required: true, message: '请输入评论内容', trigger: '' }
          ]">
          <div class="input-button-group">
            <el-input ref="commentInput" type="text" v-model="reviewForm.commentContent" @keyup.enter.native="submitForm('reviewForm')"></el-input>
            <el-button type="primary" @click="submitForm('reviewForm')">发送</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增/编辑/插入活动安排 -->
    <el-dialog
      class="add-task-dialog dialog"
      :title="activeStagesTitle"
      :visible.sync="activeStagesDialogVisible"
      :before-close="handleAddTaskDialogClose"
      width="800px">
        <el-form class="mart20" ref="activeStagesForm" label-width="120px" :model="activeStagesForm" style="width: 100%;">
          <el-form-item label="阶段名称：">
            <el-input v-model="activeStagesForm.stageName"></el-input>
          </el-form-item>
          <el-form-item label="阶段时间：">
            <el-date-picker
              v-model="activeStagesTimeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="活动描述：">
            <el-input type="textarea" v-model="activeStagesForm.description"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button size="mini" type="primary" @click="submitActiveStage">保存</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userData:           JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        orgId:              sessionStorage.getItem('orgId'),     //党组织id
        orgCode:            sessionStorage.getItem("orgCode"),

        detailLoading: false,
        activeStagesDialogVisible: false,   //活动安排弹框
        detailData: {},
        reviewData: {},
        reviewForm: { //评论表单
          commentContent: null,
          fromType:       6,
          fromId:         null
        },
        opearRowItem: null, //被操作行的数据
        activeStagesTimeRange: null,
        activeStagesForm:{
          "beginTime":    null,
          "description":  null,
          "endTime":      null,
          "id":           null,
          "stageName":    null,
        },
        activeStagesStatus: 0, // 0新增，1编辑，2插入
      }
    },
    mounted () {
      this.getDetail()
    },
    computed: {
      fileName () {
        if(this.detailData.plan) {
          return JSON.parse(this.detailData.plan)[0].fileName
        } else {
          return null
        }
      },
      activeStagesTitle(){
        switch(this.activeStagesStatus){
          case 0:
            return '新增';
            break;
          case 1:
            return '编辑';
            break;
          case 2:
            return '插入';
            break;
        }
      }
    },
    methods: {
      /**
       * [getDetail description]
       * @return {[type]} [description]
       */
      getDetail () {
        let self = this
        self.detailLoading = true
        self.$request.requestAxios("get", `${basePath}/activity/${self.$route.params.id}/details`, null,
          (response) => {
            response.data.data.recordInfo = []
            self.detailData = response.data.data
            self.getReviewData(self.detailData.taskId)
            self.$nextTick(() => {
              self.detailLoading = false
            })
          },
          (error) => {
            self.$message.error("获取详情失败")
            self.detailLoading = false
          }
        )
      },
      getReviewData (taskId) {
        let self = this
        self.$request.requestAxios("get", `${basePath}/t_tasks/review/list?fromId=${taskId}&fromType=6`, null, 
          (response) => {
            self.reviewData = response.data.data.rows
          },
          (error) => {
            self.$message.error("获取评论失败")
        })
      },
      /**
       * 提交表单 根据不同的表单进行不同的逻辑处理
       * @param  {string} formName 表单的ref
       * @return none
       */
      submitForm(formName) {
        let self = this
        //提交评论的表单
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self[formName].fromId = self.detailData.taskId
            self.$request.requestAxios("post", `${basePath}/t_tasks/review`, self[formName], 
              (response) => {
                if(response.data.meta.code === 0){
                  self.resetDetailForm()
                  self.getDetail()
                  self.$message.success("成功")
                } else {
                  self.$message.error(response.data.meta.message)
                } 
              },
              (error) => {
                self.$message.error("失败")
              }
            )
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        });
      },
      resetDetailForm () {
        this.$refs["commentInput"].blur()
        this.$refs["reviewForm"].resetFields()
        this.reviewForm = { //评论表单
          commentContent: null,
          fromType:       6,
          fromId:         null
        }
      },
      /*
       * 拼接上传附件的URL地址
       */
      _convertFilesUrl(){
        return basePath + '/file/'+ this.orgId +'/uplode';
      },
      /*
       * 附件上传之前，验证的数据大小
       */
      beforeFileUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
          this.$message.error('附件大小不能超过 100MB!');
        }
        return isLt2M;
      },
      handleSuccess (response, file, filesList) {
        this.detailData.privateFile = filesList
      },
      handleRemove (file, filesList) {
        this.detailData.privateFile = filesList
      },
      handleTalkingSuccess (response, file, filesList) {
        let self = this
        self.detailData.recordInfo = filesList
        //上传记录表之后立刻保存至后台
        self.$request.requestAxios("patch", `${basePath}/conversation/record/update/${self.$route.params.id}/from_org/${self.orgCode}`,
          {
            record: file.response.data
          },
          (response) => {
            self.getDetail()
          },
          (error) => {
            self.$message.error("修改谈话记录失败")
          }
        )
      },
      handleTalkingRemove (file, filesList) {
        this.detailData.recordInfo = filesList
      },
      /**
       * 下载文件
       * @param  {[type]} fileId [description]
       * @return {[type]}        [description]
       */
      downloadFile (fileId) {
        this.$util.downloadFile(fileId)
      },
      /*
       * 删除指定一条活动安排
       */
      delActiveStages(item){
        this.$request.requestAxios("delete", `${basePath}/activity/stage/${item.id}`, '', 
          (response) => {
            this.getDetail();
            this.$message.success('删除成功！');
          },
          (error, status) => {
            status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${basePath}/activity/stage${item.id} - 失败`);
         })
       },
      /*
       * 保存活动安排
       */
      submitActiveStage(){
        if(this.activeStagesStatus == 1){
          this._editActiveState();
        }else{
          this._addActiveState();
        }
        
       },
      _addActiveState(){
        this.$request.requestAxios("post", `${basePath}/activity/stage/${this.$route.params.id}`, this._activeStagesParams(), 
          (response) => {
            this.getDetail();
            this.activeStagesDialogVisible = false;
            this.$message.success('成功！');
          },
          (error, status) => {
            this.activeStagesDialogVisible = false;
            status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${basePath}/activity/stage${item.id} - 失败`);
         })
       },
      _editActiveState() {
        this.$request.requestAxios("put", `${basePath}/activity/stage`, this._activeStagesParams(), 
          (response) => {
            this.activeStagesDialogVisible = false;
            this.getDetail();
            this.$message.success('成功！');
          },
          (error, status) => {
            this.activeStagesDialogVisible = false;
            status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${basePath}/activity/stage${item.id} - 失败`);
         })
       },
      _activeStagesParams(){
        this.activeStagesForm.beginTime = new Date(this.activeStagesTimeRange[0]).getTime();
        this.activeStagesForm.endTime = new Date(this.activeStagesTimeRange[1]).getTime();
        if(this.activeStagesStatus != 1){
          // ---- 当没有上一列数据，就不用传lastState给后台 -------
          if(this.opearRowItem){
            this.activeStagesForm.lastStage = this.opearRowItem.id;
          }
        }
        return this.activeStagesForm;
       },
      showEdit(item){
        this.activeStagesStatus = 1; 
        this.activeStagesDialogVisible = true; 
        this.opearRowItem = item; 
        this.activeStagesForm = item;
        this.activeStagesTimeRange = [new Date(item.beginTime),new Date(item.endTime)];

      },
      showInsert(item){
        this.activeStagesStatus = 2; 
        this.activeStagesDialogVisible = true; 
        this.opearRowItem = item; 
        this.activeStagesTimeRange = null;
        this.activeStagesForm.stageName = null;
        // this.$refs.activeStagesForm.resetFields();
      },
      showAdd(){
        this.activeStagesStatus = 0; 
        this.activeStagesDialogVisible = true; 
        // --------------- 要有一个活动安排才能赋值 -------------
        if(this.detailData.activeStages.length){
          this.opearRowItem = this.detailData.activeStages[this.detailData.activeStages.length-1];
        }else{
          this.opearRowItem = null;
        }
        this.activeStagesTimeRange = null;
        this.activeStagesForm.stageName = null;
        // this.$refs.activeStagesForm.resetFields();
      }
    }
  }
</script>

<style scoped>
  .detail-wrap {
    background: #fff; 
  }
  .detail-wrap .detail-item {
    padding: 10px 5px;
    line-height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .detail-wrap .detail-item .detail-label {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    width: 80px;
    margin-right: 10px;
    text-align: right;
  }
  .detail-wrap .detail-right-div {
    width: calc( 100% - 90px)
  }
  .review-list-wrap {
    max-height: 283px;
    overflow-y: auto;
  }
  .review-item-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent; 
  }
  .review-item-wrap:last-child {
    border-bottom: none;
  }
  .review-item-wrap div {
    width: calc(100% - 60px);
  }
  .input-button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>