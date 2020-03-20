/*************************************
*  create by xieyuanyuan date 2018/07/11
*  登记积极分子名册组件
**************************************/ 
<template>
  <el-form ref="form" :model="form" label-width="150px">
    <el-form-item 
      v-if="pageType == 'org'"
      label="入党申请人：" 
      prop="userId"
      :rules="[{ required: true, message: '请选择入党申请人', trigger: ['blur', 'change'] },]">
      <el-select v-model="form.userId" filterable placeholder="请选择">
        <el-option
          v-for="item in userList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item 
      label="入党申请书："
      prop="applicationFile"
      :rules="[{ required: true, message: '请上传入党申请书', trigger: ['blur', 'click'] },]">
      <el-upload
          ref="applicationFile"
          class="upload-demo upload-demo-manage"
          :action="`${$util.basePath}/file/${orgId}/uplode`"
          :headers="{Authorization: 'Bearer ' + userData.token}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="(($event)=>{handleAvatarSuccess($event, 'applicationFile')})"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :on-exceed="handleExceed">
        <el-button size="mini" type="primary">上传附件</el-button>
        <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!（只可上传一个附件）</div>
      </el-upload>
    </el-form-item>
    <el-form-item 
      label="递交入党申请时间：" 
      prop="applicationDate"
      :rules="[{ required: true, message: '请输入递交入党申请时间', trigger: ['blur', 'change'] },]">
      <el-date-picker
        format="yyyy-MM-dd HH:mm"
        default-time="['09:00:00']"
        v-model="form.applicationDate"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item 
      label="考察谈话记录："
      prop="talkRecord"
      :rules="[{ required: true, message: '请上传考察谈话记录', trigger: ['blur', 'click'] },]">
      <el-upload
          ref="talkRecord"
          class="upload-demo upload-demo-manage"
          :action="`${$util.basePath}/file/${orgId}/uplode`"
          :headers="{Authorization: 'Bearer ' + userData.token}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="(($event)=>{handleAvatarSuccess($event, 'talkRecord')})"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :on-exceed="handleExceed">
        <el-button size="mini" type="primary">上传附件</el-button>
        <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!（只可上传一个附件）</div>
      </el-upload>
    </el-form-item>
    <el-form-item 
      label="团内推优表："
      prop="recommendFile"
      :rules="[{ required: true, message: '请上传团内推优表', trigger: ['blur', 'click'] },]">
      <el-upload
          ref="recommendFile"
          class="upload-demo upload-demo-manage"
          :action="`${$util.basePath}/file/${orgId}/uplode`"
          :headers="{Authorization: 'Bearer ' + userData.token}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="(($event)=>{handleAvatarSuccess($event, 'recommendFile')})"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :on-exceed="handleExceed">
        <el-button size="mini" type="primary">上传附件</el-button>
        <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!（只可上传一个附件）</div>
      </el-upload>
    </el-form-item>
    <el-form-item 
      class="input-text-box"
      label="支部会投票记录：">
      会议应该<el-input class="input-fix" @change="voteRecordChange($event, 0)" type="number" ></el-input></el-input>人，
      实到<el-input class="input-fix" @change="voteRecordChange($event, 1)" type="number" ></el-input></el-input>人，
      缺席<el-input class="input-fix" @change="voteRecordChange($event, 2)" type="number" ></el-input></el-input>人。
      <br/>
      <el-input class="input-fix" @change="voteRecordChange($event, 3)" type="number" ></el-input></el-input>人同意，
      <el-input class="input-fix" @change="voteRecordChange($event, 4)" type="number" ></el-input></el-input>人弃权，
      <el-input class="input-fix" @change="voteRecordChange($event, 5)" type="number" ></el-input></el-input>人反对。
      <br/>
    </el-form-item>
    <el-form-item 
      label="投票记录附件：" 
      prop="voteRecordFile"
      :rules="[{ required: true, message: '请上传投票记录附件', trigger: ['blur', 'click'] },]">
      <el-upload
          ref="voteRecordFile"
          class="upload-demo upload-demo-manage"
          :action="`${$util.basePath}/file/${orgId}/uplode`"
          :headers="{Authorization: 'Bearer ' + userData.token}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="(($event)=>{handleAvatarSuccess($event, 'voteRecordFile')})"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :on-exceed="handleExceed">
        <el-button size="mini" type="primary">上传附件</el-button>
        <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!（只可上传一个附件）</div>
      </el-upload>
    </el-form-item>
    <el-form-item 
      label="会议时间：" 
      prop="meetingDate"
      :rules="[{ required: true, message: '请输入会议时间', trigger: ['blur', 'change'] },]">
      <el-date-picker
        v-model="form.meetingDate"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        default-time="['09:00:00']"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item class="mart20 padt20">
      <el-button size="small" type="primary" @click="onSubmit('form')">确定</el-button>
      <el-button size="small" @click="dialogVisible = false">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props:{
      pageType:       null, //org表示组织工作台，personal表示个人工作台
      isDialogClose:  false, //为true，表示弹框已被关闭清空表单数据
      userList:       [], //非党员列表
    },
    data() {
      return {
        orgCode:  this.pageType == 'org' ? sessionStorage.getItem('orgCode') : 
                    JSON.parse(sessionStorage.getItem('userData')).orgCode,

        orgId:    this.pageType == 'org' ? sessionStorage.getItem('orgId') : 
                    JSON.parse(sessionStorage.getItem('userData')).orgId,
                    
        userData: JSON.parse(sessionStorage.getItem('userData')),
        userList: [],
        form: {
          "userId":             null, //用户ID
          "applicationDate":    null, //递交入党申请时间
          "applicationFile":    null, //入党申请书
          "meetingDate":        null, //会议时间
          "recommendFile":      null, //团内推优表
          "talkRecord":         null, //考察谈话记录
          "voteRecord":         null, //支部会投票记录
          "voteRecordNumList":  new Array(6), //将投票数据保存为数组
          "voteRecordFile":     null, //投票记录附件
        }
      }
    },
    mounted() {
    },
    destoryed() {
       
    },
    watch: {
      /*
       * 监听到弹框被关闭，清空数据
       */
      isDialogClose(bool){
        if(bool){
          this.$refs.applicationFile.clearFiles();
          this.$refs.recommendFile.clearFiles();
          this.$refs.talkRecord.clearFiles();
          this.$refs.voteRecordFile.clearFiles();
          this.$refs.form.resetFields();   
          this.form.voteRecordNumList = new Array(6);

        }
      },
    },
    methods:{
      /*
       * 采用了闭包的方式，将自己的参数传入在elementUI的方法中
       * @params {object} res 附件的信息
       * @params {string} fileKeyName 附件键名
       */
      handleAvatarSuccess(res,fileKeyName){
        this.form[fileKeyName] = res.data;
      },
      /*
       * 获取文本框的值并将值保存在数组中
       * @params {number} num 第几个文本框
       */
      voteRecordChange(val, num){
        this.form.voteRecordNumList[num] = val;
      },
      /*
       * 提交登记
       */
      onSubmit(formName){
        let url = this.pageType == 'org' ? 
                `${this.$util.basePath}/hr_join_party_application/activist/register/from_org/${this.orgCode}`:
                `${this.$util.basePath}/hr_join_party_application/activist/register`;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', url, this._onSubmitParmas(), 
              (response) => {
                this.getQueryList();
                this.$message.success(response.data.meta.message);
                this.dialogVisible = false;
              }, (error, status) => {
                status == 200 ? this.$message.error(error.data.meta.message) : 
                  this.$message.error(`${url} - 失败`);
                this.dialogVisible = false;
              },
           );
          } else {
            return false;
          }
        });
      },
      _onSubmitParmas(){
        let recNum = this.form.voteRecordNumList;
        this.form.voteRecord = `应到人数${ recNum[0] ? recNum[0] : 0 }人，
          实到${recNum[1] ? recNum[1] : 0 }人，
          缺席${recNum[2] ? recNum[2] : 0 }人。
          ${recNum[3] ? recNum[3] : 0 }人同意，
          ${recNum[4] ? recNum[4] : 0 }人弃权，
          ${recNum[5] ? recNum[5] : 0 }人反对。`;

        this.form.applicationDate = new Date(this.form.applicationDate).getTime();
        this.form.meetingDate = new Date(this.form.meetingDate).getTime();
        return this.form;
      },
    }
  }
</script>