/*************************************
*  create by xieyuanyuan date 2018/05/11
*  查询附件组件
**************************************/
<template>
 <div>
  <div v-if="fileType == 'read' && fileList"
    v-for="(item, index) in fileList"
    :key="index"
    style="width: 100%; height: 36px;">
    <el-button v-if="$util._validateFileFormat(item.fileName)" type="text" title='点击可在线编辑' @click="$util.fileEditOrPreview(item.fileId, 'read')">{{item.fileName}}</el-button>
    <!-- 不能在线编辑的就只可下载附件后，线下编辑在上传 -->
    <div v-if="!$util._validateFileFormat(item.fileName)" style="width: 100%; display: inline-block;">
      <el-button 
        type="text" title='该格式的文件只能先点击此文件名下载，线下编辑好后，再上传' class="fl marr20"
        @click="$util.downloadFile(item.fileId)">{{item.fileName}}</el-button>
      <el-upload
        class="upload-demo upload-demo-manage fl marl20"
        :action="`${$util.basePath}/file/${orgId}/${item.fileId}/uplode`"
        :headers="{Authorization: 'Bearer ' + userData.token}"
        :on-remove="handleRemove"
        :on-success="(res, file) => {handleAvatarSuccess(res, file, item)}"
        multiple
        :limit="2"
        :show-file-list="false">
        <el-button type="primary" size="mini">上传修改的附件</el-button>
      </el-upload>
    </div>
  </div>
  <!-- <div v-if="fileType == 'onlyread' && fileList"
    v-for="(item, index) in fileList"
    :key="index"
    style="width: 100%; height: 36px;">
    <el-button 
      type="text" title='点击可下载' class="fl marr20"
      @click="$util.downloadFile(item.fileId)">{{item.fileName}}</el-button>
    <el-button v-if="$util._validateFileFormat(item.fileName)" type="text" @click="$util.fileEditOrPreview(item.fileId, 'onlyread')">可在线预览</el-button>
  </div> -->
 </div>
</template>
<script>

  export default {
    props:{
      params: {  
          required: true,
      },
      taskId: {  
          required: true,
      },
      pageType: 'org',
      fileType: 'read', //read可编辑修改，onlyread只能查看下载
      
    },
    data() {
        return {
          userData: JSON.parse(sessionStorage.getItem('userData')),
          orgId: this.pageType == 'org' ? sessionStorage.getItem('orgId') : JSON.parse(sessionStorage.getItem('userData')).partyOrgId,
          fileList: [],
        }
    },
    mounted() {
      this.getFileList();
    },
    watch: {
    },
    destoryed() {

    },
    methods: {
      /*
       * 查询表单数据
       */
      getFileList() {
        // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this
        this.$request.requestAxios('get', `${this.$util.basePath}/${this.params.requestUrl}`, this._getTableDataParams(),
            (response) => {
                this.fileList = response.data.data;
                this.$emit('dataList', this.fileList);
            },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) :
                             this.$message.error(`${this.$util.basePath}/${this.params.requestUrl}`);
         });
       },
      _getTableDataParams(){
        return {
          params: {
            taskId:     this.taskId,
           }
         }
       },
      /*
       * 上传附件之前
       */
      handleAvatarSuccess(res, file, beforeFile){
        // beforeFile.fileName = file.name;
        res.meta.code == 0 ? this.$message.success('修改成功！') : this.$message.error(res.meta.message)
      }
    }
  }
</script>