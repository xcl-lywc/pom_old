<template>
  <div class="content-manage">
    <el-button type="primary" @click="$router.push({name: 'My_Talking_Talking'})">返回</el-button>
    <div class="detail-wrap" v-loading="detailLoading">
      <p><span class="detail-label">谈话主题:</span>{{detailData.theme}}</p>
      <p><span class="detail-label">谈话内容:</span>{{detailData.content}}</p>
      <p><span class="detail-label">谈话时间:</span>{{$util._convertDate(detailData.beginTime, "yyyy年MM月dd日 hh时：mm分")}} ~ {{$util._convertDate(detailData.endTime, "yyyy年MM月dd日 hh时：mm分")}}</p>
      <p><span class="detail-label">谈话地点:</span>{{detailData.address}}</p>
      <p>
        <span class="detail-label">谈话记录表:</span>
        <el-button v-if="detailData.recordInfo" class="download-button" type="text" size="small" @click="$util.downloadFile(detailData.recordInfo.id)">{{ detailData.recordInfo.name }}</el-button>
        <span> 未上传谈话记录表 </span>
      </p>
      <p>
        <span class="detail-label">附件列表:</span>
        <el-upload
          class="detail-right-div"
          :headers="{Authorization: 'Bearer ' + userData.token}"
          :action="_convertFilesUrl()"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeFileUpload"
          :show-file-list="false"
          :file-list="detailData.privateFile"
          multiple
          :limit="100" >
          <el-button size="small" type="primary">上传附件</el-button>
          <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
        </el-upload>
      </p>
      <div style="padding-left: 100px;" v-if="detailData.privateFile" 
        v-for="(itemFile, indexFile) in detailData.privateFile" 
        :key="indexFile">
        <el-button 
          type="text"
          title="点击下载"
          @click="$util.downloadFile(itemFile.id)">
            {{itemFile.name}}
        </el-button>
        <el-button 
          v-if="$util._validateFileFormat(itemFile.name)" 
          type="primary" 
          size="mini" 
          @click="$util.fileEditOrPreview(itemFile.id, 'onlyread')">可在线预览</el-button>
        <!-- <el-button size="mini" type="danger" @click="removeFile(itemFile.id)">删除</el-button> -->
      </div>
      <p><span class="detail-label">谈话人:</span> <span v-for="item in detailData.initiatorList" :key="item.id">{{item.name}}， </span></p>
      <p><span class="detail-label">约谈对象:</span><span v-for="item in detailData.talkerList" :key="item.id">{{item.name}}， </span></p>

      <div class="review-list-wrap">
        <div v-for="(item, index) in reviewData" :key="`评论${index}`" class="review-item-wrap">
          <img :src="item.picture" style="width: 50px;height: 50px;">
          <div>
            <p>{{ item.creator }} {{ $util._convertDate(item.createTime, 'yyyy-MM-dd') }}</p>
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
        detailData: {
          recordInfo: {
            name: "暂无文件",
            id: 0
          },
          privateFile: []
        },
        reviewData: {},
        reviewForm: { //评论表单
          commentContent: null,
          fromType:       6,
          fromId:         this.$route.params.id,  
        },
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      /**
       * [getDetail description]
       * @return {[type]} [description]
       */
      getDetail () {
        let self = this
        // self.detailLoading = true
        self.$request.requestAxios("get", `${basePath}/conversation/conversation/details/`,
          {
            params: {
              id: self.$route.params.id
            }
          },
          (response) => {
            self.detailData = response.data.data
            self.getReviewData(self.detailData.taskId)
            self.reviewForm.fromId = self.$route.params.id //任务Id赋值
            self.detailLoading = false
            if(!response.data.data.taskId) {
              self.$message.error("taskId为空 无法使用评论功能!")
            }
          },
          (error) => {
            self.$message.error("获取详情失败")
            self.detailLoading = false
          }
        )
      },
      getReviewData (taskId) {
        let self = this
        self.$request.requestAxios("get", `${basePath}/t_tasks/review/list?fromId=${self.$route.params.id}&fromType=6`, null, 
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
            // self[formName].fromId = self.tempDetailId
            self.$request.requestAxios("post", `${basePath}/t_tasks/review`, self[formName], 
              (response) => {
                if(response.data.meta.code === 0){
                  self.$message.success("成功")
                  self.getReviewData();
                  self[formName].commentContent = null;
                  self.$refs[formName].resetFields()
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
      /*
       * 拼接上传附件的URL地址
       */
      _convertFilesUrl(){
        return basePath + '/file/'+ this.userData.partyOrgId +'/uplode';
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
        let self = this
        this.detailData.privateFile.push({
          id: response.data,
          name: file.name
        })
        self.$request.requestAxios("post", `${basePath}/conversation/private_file/update/${self.$route.params.id}/from_org/${self.userData.orgCode}`,
          {
            fileIds: this.detailData.privateFile.map((item) => { return item.id }).join(",")
          },
          (response) => {
            self.getDetail()
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
      },
      removeFile (id) {
        let self = this;
        $.each(self.detailData.privateFile, (index, item) => {
          if(item.id == id){
            self.detailData.privateFile.splice(index,1);
          }
        }) 
        self.$request.requestAxios("post", `${basePath}/conversation/private_file/update/${self.$route.params.id}/from_org/${self.orgCode}`,
          {
            fileIds: this.detailData.privateFile.map((item) => { return item.id }).join(",")
          },
          (response) => {
            self.getDetail()
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
      },
      handleTalkingSuccess (response, file, filesList) {
        let self = this
        self.detailData.recordInfo = filesList
        //上传记录表之后立刻保存至后台
        self.$request.requestAxios("post", `${basePath}/conversation/record/upload/${self.$route.params.id}/`,
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
    }
  }
</script>

<style scoped>
  .detail-wrap {
    background: #fff; 
  }
  .detail-wrap p {
    padding: 15px 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: top;
  }
  .detail-wrap p .detail-label {
    display: inline-block;
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
  .download-button {
    padding: 0;
  }
</style>