<template>
  <el-main>
  	<el-card class="box-card">
	  <div slot="header" class="clearfix marl20">
	    <span>向党靠拢</span>
	  </div>
	  <div>
	  	<el-button @click=" joinPartyDialogVisible = true " type="text" class="text-center marr20">
	  		<i style="font-size: 50px; color: rgba(0,0,0,.5);" class="fa fa-envelope marb10"></i>
	  		<br/>
	  		<span>入党申请</span>
	  	</el-button>
	  	<el-button @click=" formalApplyDialogVisible = true " type="text" class="text-center ">
	  		<i style="font-size: 50px; color: rgba(0,0,0,.5);" class="fa fa-user-plus marb10"></i>
	  		<br/>
	  		<span>转正申请</span>
	  	</el-button>
	  </div>
	</el-card>

	<!-- 入党申请弹框 -->
	<el-dialog
      class="add-task-dialog dialog"
      title="入党申请"
      :visible.sync="joinPartyDialogVisible"
      :before-close="handleAddTaskDialogClose"
      @close="joinPartyDialogClose"
      width="600px">
	    <div style="width: 100%;">
	    	<el-form :model="applyForm" ref="applyForm" label-width="120px" class="demo-ruleForm mart20">
				  <el-form-item 
				  	label="入党申请书：" 
				  	prop="applicationFile"
				  	:rules="[{ required: true, message: '请上传入党申请书'},]">
				    <el-upload
				      ref="applicationJoinFile"
					  class="upload-demo"
					  :action="`${$util.basePath}/file/${userData.orgId}/uplode`"
					  :headers="{Authorization: 'Bearer ' + userData.token}"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :on-success="applicationFileSuccess"
					  :before-upload="applicationFileBefore"
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="mini" type="primary">点击上传</el-button>
					  <div slot="tip" class="">附件大小不能超过 100MB!</div>
					</el-upload>
				  </el-form-item>
				  <hr/>
				  <el-form-item 
				  	label="团内推优表：" 
				  	prop="recommendFile"
				  	:rules="[{ required: true, message: '请上传团内推优表'},]">
				    <el-upload
				      ref="recommendFile"
					  class="upload-demo"
					  :action="`${$util.basePath}/file/${userData.orgId}/uplode`"
					  :headers="{Authorization: 'Bearer ' + userData.token}"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :on-success="recommendFileSuccess"
					 	:before-upload="recommendFileBefore"
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="mini" type="primary">点击上传</el-button>
					  <div slot="tip" class="">附件大小不能超过 100MB!</div>
					</el-upload>
				  </el-form-item>
				</el-form>
			</div>
	    </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click=" joinPartyDialogVisible = false " size="mini">取 消</el-button>
		    <el-button type="primary" @click="onSubmitApply('applyForm')" size="mini">确 定</el-button>
		  </span>
	</el-dialog>
	<!-- 转正申请弹框 -->
	<el-dialog
      class="add-task-dialog dialog"
      title="转正申请"
      :visible.sync="formalApplyDialogVisible"
      :before-close="handleAddTaskDialogClose"
      @close="formalApplyDialogClose"
      width="600px">
	    <div style="width: 100%;">
	    	<el-form :model="formalForm" ref="formalForm" label-width="120px" class="demo-ruleForm mart20">
				  <el-form-item 
				  	label="转正申请书：" 
				  	prop="applicationFile"
				  	:rules="[{ required: true, message: '请上传转正申请书'},]">
				    <el-upload
				      ref="applicationFile"
					  class="upload-demo"
					  :action="`${$util.basePath}/file/${userData.orgId}/uplode`"
					  :headers="{Authorization: 'Bearer ' + userData.token}"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :on-success="formalFileSuccess"
					  :before-upload="formalFileBefore"
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="mini" type="primary">点击上传</el-button>
					  <div slot="tip" class="">附件大小不能超过 100MB!</div>
					</el-upload>
				  </el-form-item>
				</el-form>
			</div>
	    </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click=" formalApplyDialogVisible = false " size="mini">取 消</el-button>
		    <el-button type="primary" @click="onSubmitFormal('formalForm')" size="mini">确 定</el-button>
		  </span>
	</el-dialog>
  </el-main>
</template> 

<script>
  export default {
    data() {
      return {
      	userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
      	joinPartyDialogVisible:   false, //入党申请模态框显示属性
      	formalApplyDialogVisible: false, //转正申请模态框显示属性
      	applyForm: {	//入党申请表单
      		applicationFile: null,
      		recommendFile:   null, //团内推优表
      	},
      	formalForm: { //转正申请表单
      		applicationFile: null,
      	}
      }
    },
    created () {

    },
    mounted () {
    },
    watch: {
    },
    methods: {
    	joinPartyDialogClose(){
    		this.$nextTick( ()=> {
    			this.$refs.applicationJoinFile.clearFiles();
    			this.$refs.recommendFile.clearFiles();
    		});
    		
    	},
    	formalApplyDialogClose(){
    		this.$nextTick( ()=> {
    			this.$refs.applicationFile.clearFiles();
    		});
    	},
    	/*
    	 * 提交入党申请
    	 */
    	onSubmitApply(formName){
    		this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', `${this.$util.basePath}/hr_join_party_application/add/from_org/${this.userData.orgCode}`, this.applyForm,
		          (response) => {
		              this.$message.success(response.data.meta.message);
		              this.joinPartyDialogVisible = false;
		          }, (error, status) => {// 请求失败回调函数...
		              status == 200 ? this.$message.error(error.data.meta.message) :
		                		this.$message.error( `${this.$util.basePath}/hr_join_party_application/add/from_org/${this.userData.orgCode}-失败`);
		              this.joinPartyDialogVisible = false;
		          });
          } else {
            return false;
          }
        });
    	},
    	/*
    	 * 提交转正申请
    	 */
    	onSubmitFormal(formName){
  		  this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', `${this.$util.basePath}/hr_join_party_application/join/from_org/${this.userData.orgCode}`, this.formalForm,
		          (response) => {
		              this.$message.success(response.data.meta.message);
		              this.joinPartyDialogVisible = false;
		          }, (error, status) => {// 请求失败回调函数...
		              status == 200 ? this.$message.error(error.data.meta.message) :
		                		this.$message.error( `${this.$util.basePath}/hr_join_party_application/join/from_org/${this.userData.orgCode}-失败`);
		              this.joinPartyDialogVisible = false;
		          });
          } else {
            return false;
          }
        });
    	},
    	/*
       * 附件上传成功后，获取成功后的申请附件数据
       */
    	applicationFileSuccess(res, file){
    		this.applyForm.applicationFile = res.data;
    	},
    	/*
       * 附件上传成功后，获取成功后的团内推优附件数据
       */
    	recommendFileSuccess(res, file){
    		this.applyForm.recommendFile = res.data;
    	},
    	/*
       * 附件上传成功后，获取成功后的团内推优附件数据
       */
    	formalFileSuccess(res, file){
    		this.formalForm.applicationFile = res.data;
    	},
    	/*
       * 附件上传之前后，验证的数据大小
       */
      applicationFileBefore(file){
         return this.$util.verificationFileSize(file);
      },
      /*
       * 附件上传之前后，验证的数据大小
       */
      recommendFileBefore(file){
         return this.$util.verificationFileSize(file);
      },
      /*
       * 附件上传之前后，验证的数据大小
       */
      formalFileBefore(file){
         return this.$util.verificationFileSize(file);
      },
    },
  }
</script>
