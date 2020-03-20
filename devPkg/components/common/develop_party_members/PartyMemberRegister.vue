/*************************************
*  create by xieyuanyuan date 2018/07/12
*  党员名册登记
**************************************/ 
<template>
  <!-- 登记 -->
  <el-form ref="form" :model="form" label-width="130px">
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
      style="width: 55%; display: inline-block;"
      class="line"
      label="入党介绍人："
      prop="introducer[0]"
      :rules="[{ required: true, message: '请将填写一号入党介绍人', trigger: ['blur', 'click'] },]">
      <el-input v-model="form.introducer[0]"></el-input>
    </el-form-item>
    <el-form-item 
      label-width="0"
      style="width: 40%; display: inline-block;"
      class="line"
      prop="introducer[1]"
      :rules="[{ required: true, message: '请将填写二号入党介绍人', trigger: ['blur', 'click'] },]">
      <el-input v-model="form.introducer[1]"></el-input>
    </el-form-item>
    <el-form-item 
      label="思想汇报："
      prop="thoughtReport"
      :rules="[{ required: true, message: '请上传思想汇报', trigger: ['blur', 'click'] },]">
      <el-upload
        ref="thoughtReport"
        class="upload-demo upload-demo-manage"
        :action="`${$util.basePath}/file/${orgId}/uplode`"
        :headers="{Authorization: 'Bearer ' + userData.token}"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="(($event)=>{handleAvatarSuccess($event, 'thoughtReport')})"
        :before-upload="beforeAvatarUpload"
        :before-remove="beforeRemove"
        :file-list="fileList"
        multiple
        :limit="100"
        :on-exceed="handleExceed">
        <el-button size="mini" type="primary">上传附件</el-button>
        <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
      </el-upload>
    </el-form-item>
    <el-form-item 
      label="转正申请书：" 
      prop="joinPartyFile"
      :rules="[{ required: true, message: '请输入转正申请书', trigger: ['blur', 'change'] },]">
      <el-upload
          ref="joinPartyFile"
          class="upload-demo upload-demo-manage"
          :action="`${$util.basePath}/file/${orgId}/uplode`"
          :headers="{Authorization: 'Bearer ' + userData.token}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="(($event)=>{handleAvatarSuccess($event, 'joinPartyFile')})"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          :file-list="fileList"
          multiple
          :limit="100"
          :on-exceed="handleExceed">
        <el-button size="mini" type="primary">上传附件</el-button>
        <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
      </el-upload>
    </el-form-item>
    <el-form-item 
      label="支部会议时间："
      prop="meetingDate"
      :rules="[{ required: true, message: '请输入支部会议时间', trigger: ['blur', 'click'] },]">
      <el-date-picker
        format="yyyy-MM-dd HH:mm"
        default-time="['09:00:00']"
        v-model="form.meetingDate"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item 
      class="input-text-box"
      label="投票概况：">
      会议应该<el-input class="input-fix" v-model="form.voteRecordNumList[0]" type="number" ></el-input></el-input>人，
      实到<el-input class="input-fix" v-model="form.voteRecordNumList[1]" type="number" ></el-input></el-input>人，
      缺席<el-input class="input-fix" v-model="form.voteRecordNumList[2]" type="number" ></el-input></el-input>人。
      <br/>
      <el-input class="input-fix" v-model="form.voteRecordNumList[3]" type="number" ></el-input></el-input>人同意，
      <el-input class="input-fix" v-model="form.voteRecordNumList[4]" type="number" ></el-input></el-input>人弃权，
      <el-input class="input-fix" v-model="form.voteRecordNumList[5]" type="number" ></el-input></el-input>人反对。
      <br/>
    </el-form-item>
    <el-form-item 
      label="投票记录表：" 
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
        form: {
          "userId":           null, //用户ID
          "introducer":       new Array(2), //介绍人
          "joinPartyFile":    null,//转正申请书
          "meetingDate":      null,//支部会议时间
          "thoughtReport":    [],//思想汇报
          "voteRecord":       null,//投票概况
          "voteRecordNumList": new Array(6), //将投票数据保存为数组
          "voteRecordFile":   null,//投票记录表
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
          this.$refs.joinPartyFile.clearFiles();
          this.$refs.thoughtReport.clearFiles();
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
        fileKeyName == 'thoughtReport' ? this.form[fileKeyName].push(res.data) : this.form[fileKeyName] = res.data;
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
                `${this.$util.basePath}/hr_join_party_application/join/register/from_org/${this.orgCode}`:
                `${this.$util.basePath}/hr_join_party_application/join/register`;

         this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', url, this._onSubmitParmas(), 
              (response) => {
                this.getQueryList();
                this.$message.success(response.data.meta.message);
                this.$emit('registerSuccess');
              }, (error, status) => {
                status == 200 ? this.$message.error(error.data.meta.message) : 
                  this.$message.error(`${url} - 失败`);
                this.$emit('registerSuccess');
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

        this.form.meetingDate = new Date(this.form.meetingDate).getTime();
        return this.form;
      },
    }
  }
</script>