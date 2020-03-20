/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务审批
**************************************/ 
<template>
  <div class="content-manage">
    <!-- 状态切换 -->
    <el-tabs class="tabls-manage" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="等待审批" name="1" status="1">
        <div></div>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="2" status="2">
        <div></div>
      </el-tab-pane>
      <el-tab-pane label="我发起的" name="assignee" status="assignee">
        <div></div>
      </el-tab-pane>
      <el-tab-pane label="我审批的" name="creator" status="creator">
        <div></div>
      </el-tab-pane>
      <el-tab-pane label="抄送我的" name="copy" status="copy">
        <div></div>
      </el-tab-pane>
    </el-tabs>
    <!-- 列表内容 -->
    <div v-loading="isLoad" v-if="listData" class="content-wrapper-manage content-wrapper-manage_task">
      <div class="content-wrapper-innter">
        <div class="task-list" v-for="(item, index) in listData.rows" :key="index">  
          <el-row class="title-message row">
            <el-col :span="6" class="title col-xs-6 padl20">
              <span class="title col-xs-6">
                <!-- 暂时屏蔽此功能 -->
                <!-- <el-checkbox hidden v-model="checked" class="marr20"></el-checkbox> -->
                <span @click="detailDialogFun(item)" :title="item.content">{{item.content}}</span>
              </span>
            </el-col>
            <el-col :span="12" class="position text-center" :title="item.assignee">{{item.assignee}}</el-col>
            <el-col :span="6" class="date fr">{{_convertDate(item.createTime)}}</el-col>
          </el-row>
          <p class="end-date">
            <span v-if="item.taskVoList ? item.taskVoList.length ? true : false : false ">希望在{{_convertDate(item.taskVoList[0].urgeTime)}}能完成</span>
            <span v-if="item.taskVoList ? item.taskVoList.length ? true : false : false  && activeName == 'assignee'" @click="urgeTaskDialogVisibleFun(item)" class="fr pointer marr20">催办</span>
            <span v-if="activeName == 1" @click="completeDialogVisibleFun(item)" class="fr pointer marr20">审批</span>
          </p>
          <p class="message-num">
            <span v-if="item.reviewVo"><img class="marr5" src="../../images/ifor_icon.png">{{item.reviewVo.total}}</span>
          </p>
        </div>
      </div>
      <div class="element-pagination-manage">
        <el-pagination :span="24" class="ce-pagination"
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
          :current-page="currentPage4"
          :page-sizes="elementPageData.defaultData.pageSizes"
          :page-size="elementPageData.defaultData.pageSizeDefault"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total">
        </el-pagination>
      </div>
    </div>
    <!-- 催办任务 -->
    <el-dialog 
      class="dialog"
      title="催办"
      :visible.sync="urgeTaskDialogVisible"
      width="500px">
      <div>
        <el-form class="demo-ruleForm add-task-left" ref="form" :model="form" label-width="80px">
          <el-form-item label="催办时间:">
            <el-col :span="11">
              <el-date-picker 
                :picker-options="pickerOptions" 
                type="date" 
                placeholder="选择日期" 
                v-model="form.urgeTime" 
                style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="内容:" class="no-border">
            <el-input type="textarea" placeholder="请输入内容" v-model="form.urgeMsg"></el-input>
          </el-form-item>
          <el-form-item class="no-border text-right marr20">
            <el-button type="primary" @click="submitUrgeForm('form')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 审批任务 -->
    <el-dialog 
      class="dialog"
      title="审批"
      :visible.sync="completeDialogVisible"
      width="500px">
      <div>
        <el-form class="demo-ruleForm add-task-left" ref="form" :model="form" label-width="80px">
          <el-form-item label="内容:" class="no-border">
            <el-input type="textarea" placeholder="请输入内容" v-model="form.approvalNote"></el-input>
          </el-form-item>
          <el-form-item class="no-border text-right marr20">
            <el-button type="primary" @click="submitCompleteForm('form')">审批</el-button>
            <el-button type="primary" @click="submitRejectForm('form')">驳回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 任务详情 -->
    <single-task_detail :detailId="singleTaskId" :mathRandom="mathRandom"></single-task_detail>

  </div>
</template>

<script>
  import Single_Task_Detail from '../common/manage/Single_Task_Detail.vue'
  export default {
    components:{
      "single-task_detail": Single_Task_Detail, // 头部固定内容
    },
    data() {
      return {
        bubbleStatus:      sessionStorage.getItem('bubbleStatus'),   //气泡状态
        isLoad:                 true,
        urgeTaskDialogVisible:  false, //催办任务模态框显示属性
        completeDialogVisible:  false, //审批任务
        mathRandom:             0,     //随机数，用来查看详情使用
        singleTaskId:           null,  //单个任务ID
        form: {                        //表单数据
          "processTaskId": null,
          "urgeMsg":       null,
          "urgeTime":      null,
          "urgId":         null,
          "taskId":        null,
          "approvalNote":  null,    //审批内容
        },
        elementPageData: {      //分页需要的数据
          defaultData:   this.$util.elementPagination,  
          pageNum:       this.$util.elementPagination.pageNumDefault,  
          pageSize:      this.$util.elementPagination.pageSizeDefault, 
        },  //分页参数
        activeName: '1',                        //类型状态
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        listData: { total: 0, rows: [] },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
      }
    },
    mounted() {
      this.getQueryTaskList();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 查看详情
      */
      detailDialogFun(item){
        this.singleTaskId = item.id; 
        // ---------- 累加，避免重复，不能被监听 ------------------
        this.mathRandom += 1;
      },
      /*
      * 刷新页面
      */
      pageLocalRefresh(){
        this.orgId = sessionStorage.getItem('orgId');
        this.getQueryTaskList();
      },
      /*
      * 查询任务列表
      */
      getQueryTaskList(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/t_tasks/approval/list', this._getTaskListParam(),
          function(response) {
            let responseData = response.data;
            self.listData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/approval/list');
            self.isLoad = false;
        });
      },
      /*
      * 查询参数组装
      */
      _getTaskListParam(){
        let self = this, paramsData = {
          params: {
            status:'',
            assignee: '',
            creator:'',
            copy:'',
            pageSize: this.elementPageData.pageSize,
            pageNum: this.elementPageData.pageNum,
          }
        }

        switch(this.activeName){
          case '1': 
            paramsData.params.status = this.activeName;
            break;
          case '2':
            paramsData.params.status = this.activeName;
            break;
          case 'assignee':
            paramsData.params.assignee = self.userData.userId;
            break;
          case 'creator':
            paramsData.params.creator = self.userData.userId;
            break;
          case 'copy':
            paramsData.params.copy = self.userData.userId;
            break;
        }
        return paramsData;
      },
      /*
      * 切换状态查询任务列表
      */
      handleClick(tab,event){
        // ---------------------- 设置为初始状态-----------------------
        this.elementPageData.pageNum = this.$util.elementPagination.pageNumDefault;
        this.elementPageData.pageSize = this.$util.elementPagination.pageSizeDefault;

        this.getQueryTaskList();

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
      * 改变当前页码触发此事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryTaskList();
      },
      /*
      * 改变每页条数触发此事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryTaskList();
      },
      /*
      * 显示催办弹框
      * @param {object} itemData 任务
      */
      urgeTaskDialogVisibleFun(itemData){
        this.urgeTaskDialogVisible = true;
        this.form.processTaskId = itemData.taskVoList[0].processTaskId;
      },
      /*
      * 显示审批弹框
      * @param {object} itemData 任务
      */
      completeDialogVisibleFun(itemData){
        this.completeDialogVisible = true;
        this.form.processTaskId = itemData.taskVoList[0].processTaskId;
      },
      /*
      * 提交催办表单
      */
      submitUrgeForm(formName) {
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('post', basePath + '/t_tasks/urge', this._submitUrgeParamData(),
              function(response) {
                let responseData = response.data;
                self.getQueryTaskList();
                self.form.urgeMsg = null;
              },function(error, status) {// 请求失败回调函数...
                status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/task');
            });
          } else {
            console.log('提交失败');
            return false;
          }
        });
        // --------- 关闭弹框 ----------
        self.urgeTaskDialogVisible = false;
      },
      /*
      * 催办表单参数
      */
      _submitUrgeParamData(){
        return {
          urgeTime:      this.form.urgeTime ? this.form.urgeTime.getTime() : null,
          urgeMsg:       this.form.urgeMsg,
          processTaskId: this.form.processTaskId,
        }
      },
      /*
      * 提交审批
      */
      submitCompleteForm(formName) {
        let self = this;
        self.$request.requestAxios('post', basePath + '/t_tasks/complete', this._submitCompleteParamData(),
          function(response) {
            let responseData = response.data;
            self.getQueryTaskList();
            self.$message(responseData.meta.message);

            self.form.approvalNote = null;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/complete');
        });
        // --------- 关闭弹框 ----------
        self.completeDialogVisible = false;
      },
      /*
      * 审批表单参数
      */
      _submitCompleteParamData(){
        console.log(this.form)
        return {
          "approvalNote": this.form.approvalNote,
          "taskId": this.form.processTaskId,
          "taskStatus": 2
        }
      },
      /*
      * 提交驳回
      */
      submitRejectForm(formName) {
        let self = this;
        self.$request.requestAxios('delete', basePath + '/t_tasks/reject/' + self.form.processTaskId , this._submitRejectParamData(),
          function(response) {
            let responseData = response.data;
            self.getQueryTaskList();
            self.$message(responseData.meta.message);
            self.form.approvalNote = null;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/' + self.form.taskId + '/reject');
        });
        // --------- 关闭弹框 ----------
        self.completeDialogVisible = false;
      },
      /*
      * 驳回表单参数
      */
      _submitRejectParamData(){
        return {
          data: {
            "approvalNote": this.form.approvalNote,
            "currentTaskId": this.form.processTaskId,
          }
        }

      }
    }
  }
</script>