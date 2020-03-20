/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务详情
**************************************/
<template>
    <div>
        <!-- 任务详情 -->
        <el-dialog 
            v-loading="isloading"
            class="task-detail-dialog dialog"
            title="任务详情"
            :visible.sync="showDialog"
            @close="closeDialog"
            width="75%">
            <div v-if="singleTaskDetail">
                <el-row>
                    <el-col :span="12" class="marb15">
                        任务名称：{{singleTaskDetail.taskName}}
                    </el-col>
                    <el-col :span="12" class="marb15">
                        分类：{{singleTaskDetail.taskType}}
                    </el-col>
                    <el-col :span="12" class="marb15">
                        {{singleTaskDetail.creator}}创建于 
                        {{$util._convertDate(singleTaskDetail.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                    </el-col>
                    <el-col :span="12" class="marb15">
                        截止时间：{{$util._convertDate(singleTaskDetail.endTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                    </el-col>
                    <!-- 描述： -->
                    <el-col :span="24" class="marb15 pad15 bordere2e2e2" >
                        <div v-for="(item, index) in singleTaskDetail.formData" :key="index" class="marb15">
                            <span>{{item.name}}:</span>
                            <span v-if=" item.type == 'text' ">{{item.value}}</span>
                            <span v-if=" item.type == 'img' "><img style="max-width: calc(100% - 80px)" :src="item.value" /></span>
                            <el-button 
                                v-if=" item.type == 'file' " 
                                class="el-button-ma" 
                                type="text"
                                style="padding:0;">
                                    <span @click="$util.UseFileUrldownload(item.value)">{{item.original}}</span>
                            </el-button>
                        </div>
                    </el-col>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>子任务</span>
                        </div>

                        <el-table
                            :data="childTaskList"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                            <el-table-column label="任务名字" prop="taskName"></el-table-column>
                            <el-table-column label="创建人" prop="assignee"></el-table-column>
                            <el-table-column label="开始日期">
                                <template slot-scope="scope">
                                    {{$util._convertDate(scope.row.createTime, 'yyyy年MM月dd日')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="结束日期">
                                <template slot-scope="scope">
                                    {{$util._convertDate(scope.row.endTime, 'yyyy年MM月dd日')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="所属阶段">
                                 <template slot-scope="scope">
                                    {{scope.row.taskVoList.length ? scope.row.taskVoList[0].processTaskName : ''}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                    <el-col :span="24"> 
                      <el-button   
                        v-if=" singleTaskDetail.taskTypeId == 98 "
                        class="mart20 marb20"
                        size="mini" 
                        type="primary"
                        @click=" downformDemalDialogVisible = true; ">
                          导出表单模板
                      </el-button>
                    </el-col>
                </el-row>
                <!-- 历史记录与流程图 start -->
                <el-container>
                    <el-main> 
                        <el-row>
                            <div>
                                <span class="marr15" style=" float: left;position: relative;top: 10px;">历史记录：</span>
                                <el-tabs v-model="activeNameTab" @tab-click="getHistoryList()">
                                    <el-tab-pane label="全部" name="3"></el-tab-pane>
                                    <el-tab-pane label="流程" name="2"></el-tab-pane>
                                    <el-tab-pane label="回复" name="1"></el-tab-pane>
                                </el-tabs>
                            </div>
                            <div v-if="activeNameTab != 1" class="fixed-box pad10">
                                <i class="el-icon-news marr10"></i>开始
                                <span class="fr">{{$util._convertDate(singleTaskDetail.createTime,'yyyy年MM月dd日 hh:mm:ss')}}</span>
                            </div>
                            <!-- 展示全部，流程列表数据  -->
                            <el-table
                                v-if="activeNameTab != 1 && historyList.length"
                                :show-header="false"
                                :data="historyList"
                                style="width: 100%"
                                :row-class-name="tableRowClassName">
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <span class="pointer" 
                                          @click=" historyProcessFun();  hisToryMathRandom++; hisToryData = scope.row " >
                                            <i class="el-icon-news marr10"></i>{{scope.row.commentContent}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="creator">
                                </el-table-column>
                                <el-table-column
                                    align="right"
                                    width="195px">
                                    <template slot-scope="scope">
                                        {{$util._convertDate(scope.row.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 展示回复列表数据  -->
                            <el-table
                                v-if="activeNameTab == 1"
                                :show-header="false"
                                :data="historyList"
                                style="width: 100%"
                                :row-class-name="tableRowClassName">
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <i class="el-icon-news marr10"></i>{{scope.row.commentContent}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="creator">
                                </el-table-column>
                                <el-table-column
                                    align="right">
                                    <template slot-scope="scope">
                                        {{$util._convertDate(scope.row.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 状态不为1（回复）并且详情下面有任务 -->
                            <div 
                                v-if="activeNameTab != 1 && singleTaskDetail.taskVoList ? singleTaskDetail.taskVoList.length ? true : false : false" class="fixed-box pad10">
                                <i class="el-icon-news marr10"></i>{{singleTaskDetail.taskVoList[0].processTaskName}}
                                <el-button 
                                    :title="activeStatus != 1 ? '不是你的任务哦，不能去完成！！' : ''"
                                    :disabled="activeStatus != 1"
                                    class="fr"
                                    size="mini" 
                                    type="primary"
                                    @click="goFinish()">
                                        去完成
                                </el-button>
                            </div>
                            <!-- 状态不等于回复，并且任务状态为2 -->
                            <div v-if="activeNameTab != 1 && singleTaskDetail.status == 2 " class="fixed-box pad10">
                                <i class="el-icon-news marr10"></i>结束
                                <span class="fr">{{$util._convertDate(singleTaskDetail.endTime,'yyyy年MM月dd日 hh:mm:ss')}}</span>
                            </div>

                            <el-upload
                              class="upload-demo marb20 mart20"
                              :headers="{Authorization: 'Bearer ' + userData.token}"
                              :action="`${$util.basePath}/file/${orgId}/uplode`"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              :before-remove="beforeRemove"
                              :before-upload="beforeAvatarUpload"
                              :on-success="handleAvatarSuccess"
                              :show-file-list="false"
                              :limit="100"
                              :on-exceed="handleExceed"
                              :file-list="fileList">
                              <el-button size="small" type="primary">上传附件</el-button>
                              <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
                            </el-upload>
                            <div v-if="singleTaskDetail.taskPrivateFile">
                                <p v-for="(itemFile, indxFile) in singleTaskDetail.taskPrivateFile">
                                    <el-button 
                                        class="el-button-ma" 
                                        type="text"
                                        style="padding:0;">
                                            <span @click="$util.downloadFile(itemFile.id)">{{itemFile.name}}</span>
                                    </el-button>
                                </p>
                            </div>
                            <div class="leave-message text-right mart20">
                                <el-input type="textarea" v-model="comment.commentContent" placeholder="请回复点什么吧"></el-input>
                                <el-button size="small" type="primary" @click="replyAdd(singleTaskDetail.id)">回复</el-button>
                            </div>
                        </el-row>
                    </el-main>
                    <el-aside width="200px" class="text-center" style="background: #dcf3f4;">
                        <p>流程进度：</p>
                        <img v-loading="isProcessImgLoading" :src="processImg" />
                    </el-aside>
                </el-container>
                <!-- 历史记录与流程图 end -->
            </div>
            <!-- 任务表单弹框 -->
            <el-dialog
                class="add-task-dialog dialog"
                :title="processName"
                :visible.sync="formDialogVisible"
                :close-on-click-modal="false"
                width="75%"
                append-to-body>
                <task-form :pageType="type" :processTaskId="processTaskId" :requestUrl="`${$util.basePath}/t_form_data/${processTaskId}`" :processName="processName" :instanceId="instanceId" :mathRandom="processMathRandom" @formDataEmit="formDataEmitFun"></task-form>
            </el-dialog>
        </el-dialog>
        <!-- 历史任务详情 -->
        <history-task-form
            :hisToryData="hisToryData" :processTaskId="processTaskId"
            :instanceId="instanceId" :mathRandom="hisToryMathRandom"></history-task-form>
        <!-- 导出表单模板 -->
        <el-dialog
            class="add-task-dialog dialog"
            title="导出表单模板"
            :visible.sync="downformDemalDialogVisible"
            :close-on-click-modal="false"
            width="450px"
            append-to-body>
            <el-form :model="typeForm" ref="typeForm" label-width="100px" class="demo-dynamic mart20">
              <el-form-item label="模板类型" prop="templateId" :rules="{required: true, message: '请选择模板类型', trigger: 'blur'}">
                <el-select v-model="typeForm.templateId" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in wrecordTypeData"
                    :key="item.id"
                    :label="item.name"
                    :value="index">
                  </el-option>
                </el-select> 
              </el-form-item>  
              <el-form-item class="no-border text-center marr20">
                <el-button type="primary" @click="downFromDemalSave('typeForm')">确 认</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import Task_Form from './Task_Form.vue'
    import History_Detail from './History_Detail.vue'
    export default {
        props:{
            activeStatus: null, //详情状态
            detailId: {   //详情ID
                required: true,
            },
            type: {       //org表示组织工作台，personal表示个人工作台
                required: true,
            },
            mathRandom: {
                type: Number, 
                required: true,
                default: 0,     //为0不显示弹框
            },
        },
        components:{
            "task-form":         Task_Form, //任务表单
            "history-task-form": History_Detail, //历史任务详情
            "personal-message": History_Detail, //历史任务详情
        },
        computed:{
            socketDataChange(){
                return this.$store.state.socketData;
            }
        },
        data() {
            return {
                downformDemalDialogVisible:     false,
                userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
                orgId:    this.type == 'org' ? 
                            sessionStorage.getItem('orgId') : 
                            JSON.parse(sessionStorage.getItem('userData')).orgId,     //党组织id
                orgCode:  sessionStorage.getItem('orgCode'),   //党组织code
                isloading:              true,
                showDialog:             false,
                formDialogVisible:      false,
                historyList: [],
                comment: {     //评论
                    commentContent:  null,
                },
                activeNameTab:          3, //1为回复，2为流程，3为全部 tab切换的值
                isProcessImgLoading:    true,
                singleTaskDetail:       null, //任务详情
                childTaskList:          [], //子任务列表
                processImg:             null, //流程图    
                processTaskId:          null, //流程任务ID
                instanceId:             null, //任务Id
                processMathRandom:      0,    //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
                processName:            [],   //流程名字
                hisToryMathRandom:      0,    //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
                hisToryData:            null, //历史详情数据
                formType:               null, //表单类型
                wrecordTypeData:        [],
                templateId:             null, //被选中需要下来的类型Id
                typeForm:   {
                  templateId: null,
                }
            }
        },
        mounted() { 
        },
        watch:{
            mathRandom:{
                handler(data){
                   if(data != 0 ){ //当页面不为0的情况先查询数据
                      this.showDialogFun(this.detailId);
                    } 
                },
                deep: true,
            },
            /*
             * 监听到详情有数据的情况下查询流程图
             */
            singleTaskDetail: {
                handler(data){
                  if(data){ //当页面不为0的情况先查询数据
                    this.getProcessImg();
                  }
                },
                deep: true,
            },
            /*
             * 监听到socket数据有变动，
             */
            socketDataChange(data){
                if(data){
                    // ---------- 后台传过来的socket数据 --------
                    let socketData = this.$store.state.socketData;
                    // 当前详情是显示的状态
                    if(this.$store.state.isTaskDetailShow){
                        // --------- socket中有infoId，并且infoId必须等于当前详情Id，
                        // --------- 关闭当前详情窗口，并提示当前任务已经被别人完成，请做其他任务
                        if(socketData.hasOwnProperty('infoId') ? socketData.infoId == this.detailId : false){
                            this.$emit('closeDialog');
                            this.showDialog = false;
                            this.formDialogVisible = false;
                            this.$message('该任务已完成，请做其他任务！');
                        }
                    }
                    // -------- 使用完数据后将数据清空，----- 
                    this.$store.state.socketData = null;
                }
            }
        },
        destoryed() {

        },
        methods:{
            /*
             * 工作记录类型
             */
            getWrecordType(){  
              this.$request.requestAxios('get', `${basePath}/wrecord/templete/from_org/${this.orgCode}` , {params: {instanceId: this.singleTaskDetail.instanceId}},
               (response) => { 
                this.wrecordTypeData = response.data.data;  
              }, (error, status) => {// 请求失败回调函数...
                  status == 200 ? this.$message.error(error.data.meta.message) :
                    this.$message.error('wrecord/type'); 
              }); 
            },
            /*
             * 显示详情弹框
             * @params {string/number} id 详情Id
             */
            showDialogFun(id){
                this.detailId = id;
                this.showDialog = true;
                this.getQueryTaskDetail();
                this.getHistoryList();
                this.getChildTaskList();
            },
            /*
             * 新建成功后，刷新页面
             */
            formDataEmitFun(data){
                this.getQueryTaskDetail();
                this.getHistoryList();
                this.getChildTaskList();
                this.formDialogVisible = false;
             },
            /*
             * 查询任务详情
             * @param {string/number} id 数据ID
             */
            getQueryTaskDetail(){
                let self = this;
                // ------ 显示弹框 ------
                self.showDialog = true;
                self.$request.requestAxios('get', basePath + '/t_tasks/' + self.detailId + '/detail/', "",
                    function(response) {
                        let responseData = response.data;
                        responseData.data.formData ? 
                            responseData.data.formData = JSON.parse(responseData.data.formData) : 
                            responseData.data.formData = null;
                        self.$set(self, 'singleTaskDetail', responseData.data);
                        if(responseData.data.taskTypeId == 98) {self.getWrecordType();}
                        self.isloading = false;
                    },function(error, status) {// 请求失败回调函数...
                        status == 200 ? self.$message.error(error.data.meta.message) :
                                        self.$message.error('/t_tasks/'+ id +'/detail');
                        self.isloading = false;
                });
             },
            /*
             * 查询子任务列表
             */
            getChildTaskList(){
                this.childTaskList = [];
                this.$request.requestAxios('get', basePath + '/t_tasks/childs/', {params: {'id': this.detailId}},
                    (response) => {
                        this.childTaskList = response.data.data;
                    },(error, status) => {// 请求失败回调函数...
                        status == 200 ? this.$message.error(error.data.meta.message) :
                                        this.$message.error('/t_tasks/childs');
                });
            },
            /*
             * 查询流程图
             */
            getProcessImg(){
                this.$request.requestAxios('get', basePath + '/activiti/img/', this._getProcessImgParams(),
                    (response) => {
                        this.processImg = window.URL.createObjectURL(new Blob([response.data]))
                        this.isProcessImgLoading = false;
                    },(error) => {
                        this.$message('/activiti/img/', 20);
                        this.isProcessImgLoading = false;
                    }
                );
            },
            _getProcessImgParams(){
                // ------ 文件流下载必须要指定responseType的类型为blob才能正确显示
                return { 
                    params: {processInstanceId: this.singleTaskDetail.instanceId},
                    responseType: "blob"
                }
            },
            /*
             * 回复列表
             */
            getHistoryList() {
                let self = this, data = null;
                self.$set(self, 'historyList', [])
                self.$request.requestAxios('get', basePath + '/t_tasks/review/list', self._getHistoryListParams(), 
                  function(respose) {// 请求成功回调函数...
                    let resposeData = respose.data;
                    self.$set(self, 'historyList', resposeData.data.rows);
                  },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                                    self.$message.error('/t_tasks/review/list - 失败')
                });
             },
            _getHistoryListParams(){
                return {
                    params: {
                        fromId: this.detailId, 
                        fromType: '2', 
                        status: this.activeNameTab == 3 ? '' :  this.activeNameTab
                    }
                }
            },
            /*
             * 回复
             */
            replyAdd(id) {
                let self = this, data = null;
                self.$request.requestAxios('post', basePath + '/t_tasks/review', 
                  {fromId: id, fromType: '2', commentContent: self.comment.commentContent}, 
                  function(respose) {// 请求成功回调函数...
                    let resposeData = respose.data;
                    self.getHistoryList();
                    // ---------- 清空数据 --------
                    self.comment.commentContent = null; 
                    self.$message(resposeData.meta.message, 20)

                  },function(error, status) {// 请求失败回调函数...
                        status == 200 ? self.$message.error(error.data.meta.message) :
                                        self.$message.error('/t_tasks/review - 失败')
                });
            },
            /*
             * 附件上传之前后，验证的数据大小
             */
            beforeAvatarUpload(file){
                return this.$util.verificationFileSize(file);
             },
            /*
             * 附件上传成功后，保存数据给数据库
             */
            handleAvatarSuccess(res, file){
                let self = this, data = null;
                self.$request.requestAxios('patch', `${basePath}/t_tasks/file/upload`, 
                    {id: self.detailId, privateFileIds: [res.data]}, 
                  function(respose) {// 请求成功回调函数...
                    let resposeData = respose.data;
                    self.getQueryTaskDetail();
                  },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                                    self.$message.error(`${basePath}/t_tasks/file/upload`)
                });
             },
             /*
              * 点击去完成需要操作的东西
              */
             goFinish(){
                this.processTaskId = this.singleTaskDetail.taskVoList[0].processTaskId; 
                this.instanceId = this.singleTaskDetail.id; 
                this.processMathRandom++; 
                this.processName = this.singleTaskDetail.taskVoList[0].processTaskName ; 
                this.formDialogVisible = true;
             },
            /*
             * 监听到弹框被关闭时，将isTaskDetailShow设置为false
             * 并广播closeDialog事件
             */
            closeDialog(){
                this.$store.state.isTaskDetailShow = false;
                this.$emit('closeDialog');
            },
            historyProcessFun(){
                if(this.singleTaskDetail){
                    if(this.singleTaskDetail.taskVoList){
                        if(this.singleTaskDetail.taskVoList.length){
                            this.processTaskId = this.singleTaskDetail.taskVoList[0].processTaskId;
                        }
                    }
                }
            },
            handleSelectionChange(ev){
              this.templateId = ev[0].id;
            },
            /*
             * 附件上传成功后，保存数据给数据库
             */
            downFromDemalSave(formName){ 
              let self = this;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  self.$request.requestAxios('get', `${basePath}/wrecord/download/from_org/${this.orgCode}`, 
                    {params: {instanceId: self.singleTaskDetail.instanceId, templateId: self.wrecordTypeData[self.typeForm.templateId].id, typeId: self.wrecordTypeData[self.typeForm.templateId].typeId}}, 
                    function(respose) {// 请求成功回调函数...
                      self.$message.success('成功');
                      self.$util._fileBold(respose);
                      self.downformDemalDialogVisible = false;
                    },function(error, status) {// 请求失败回调函数...
                      status == 200 ? self.$message.error(error.data.meta.message) :
                                      self.$message.error(`${basePath}/wrecord/download`);
                      self.downformDemalDialogVisible = false;
                  });
                } else { 
                  return false;
                }
              });
                
                
             },
        }
    }
</script>