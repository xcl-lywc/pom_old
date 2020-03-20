/*************************************
*  create by xieyuanyuan date 2018/07/06
*  首页管理 - 投票活动列表
**************************************/ 
<template>
  <el-main class="content-manage">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-if="pageType == 'org'" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未结束的" name="1" status="1"></el-tab-pane>
        <el-tab-pane label="已结束的" name="2" status="2"></el-tab-pane>
        <el-tab-pane label="我发出的" name="3" status="3"></el-tab-pane>
      </el-tabs>
      <el-tabs v-if="pageType == 'personal'" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未投票的" name="1" status="1"></el-tab-pane>
        <el-tab-pane label="已投票的/已结束" name="2" status="2"></el-tab-pane>
        <el-tab-pane label="我发出的" name="3" status="3"></el-tab-pane>
      </el-tabs>
      <div class="fr add-btn-manage" v-if="pageType == 'org'"><i @click=" mathRandom++ ; addDialogVisible = true;" class="el-icon-circle-plus-outline"></i></div>
    </div> 

    <!-- 列表 -->
    <div v-if="listData" class="course-list-manage">
        <!-- 列表内容 -->
        <div v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task">
            <div class="content-wrapper-innter">
              <div class="task-list metting-box-list" v-for="(item, index) in listData.rows" :key="index">  
                <el-row class="title-message">
                  <el-col :span="12" class="title">
                    <span class="padr15"><img src="../../../images/metting_icon1.png" /></span>
                    
                    <span v-if="pageType == 'org' && activeName != 3 " @click="$router.push({name: 'Activity_Detail', params: {id: item.id} })" :title="item.voteDesc">{{item.voteDesc}}</span>
                    <span v-if="pageType == 'personal' && activeName != 3 " @click="$router.push({name: 'Personal_Activity_Detail', params: {id: item.id} })" :title="item.voteDesc">{{item.voteDesc}}</span>

                    <span v-if=" activeName == 3 " style="cursor: initial;" :title="item.voteDesc">{{item.voteDesc}}</span>
                  
                  </el-col>
                  <el-col :span="4">
                    <span @click="" :title="item.content">创建者：{{item.creator}}</span>
                  </el-col>
                  <el-col :span="8" class="text-right">
                    <span @click="">
                      创建时间：{{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                    </span>
                  </el-col>
                </el-row>
                <p class="end-date">
                  投票时间：{{
                              $util._convertDate(item.beginTime,'yyyy年MM月dd日 hh:mm:ss') + '~' + 
                              $util._convertDate(item.endTime,'yyyy年MM月dd日 hh:mm:ss')
                            }} 
                </p>
                <p class="message-num metting-box">
                  <span><img class="marr5" src="../../../images/ifron#000.png">
                    {{item.reviewesCount}}
                  </span>
                  <span class="marl20"><img class="marr5" src="../../../images/learns.png">
                    {{item.affiPersonCount}}
                  </span>
                  <span class="fr marr20">{{_statusConvertFont(item.status)}}</span>
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
    </div>
    <!-- 新建表单 -->
    <el-dialog
        class="add-task-dialog dialog"
        title="创建投票"
        :visible.sync="addDialogVisible"
        :before-close="handleAddTaskDialogClose"
        width="800px">
        <!-- 新建任务 -->
        <task-form pageType="org" processTaskId="" :requestUrl="`${$util.basePath}/t_form_data/first/13`" processName="新建投票" instanceId="" :mathRandom="mathRandom" @formDataEmit="formDataEmitFun"></task-form>
    </el-dialog>

    
  </el-main>
</template>

<script>
  import Task_Form from '../../task_manage/detail/Task_Form.vue'
  export default {
    props: {
      pageType: null,
    },
    components:{
      "task-form":         Task_Form, //任务表单  
    },
    data() {
      return {
        isLoad:        true, //等待事件
        orgCode:       this.pageType == 'org' ? sessionStorage.getItem('orgCode') : 
                          JSON.parse(sessionStorage.getItem('userData')).orgCode,
        orgId:          this.pageType == 'org' ? sessionStorage.getItem('orgId') : 
                          JSON.parse(sessionStorage.getItem('userData')).orgId,
        elementPageData: {               //分页需要的数据
          defaultData:  this.$util.elementPagination,  
          pageNum:      this.$util.elementPagination.pageNumDefault,  
          pageSize:     this.$util.elementPagination.pageSizeDefault, 
        },
        activeName:       '1',
        addDialogVisible: false, //为true显示新增弹框
        recorderList:     [],   //记录人
        voteListData:     {rows: [], total: 0}, //选票列表
        isBallot:         true, //true为已勾选选票数据，
        form: {
          "dateRange": null,
          "beginTime": null,
          "createOrgCode": this.pageType == 'org' ? sessionStorage.getItem('orgCode') : 
                              JSON.parse(sessionStorage.getItem('userData')).orgCode,
          "endTime": null,
          "record": [],
          "ballotId": null,
        },
        voteForm: {     //选票表单
          "dateRange":      null,
          "ballotSpecial":  null,
        },
        listData: { rows:[], total: 0},      //课程数据
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        mathRandom:   0,    //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
      }
    },
    mounted() {
      this.getQueryList();
      this.getQueryaffiliatedUsers();
      this.pageType == 'org' ? this.getQueryVoteList() : '';
     },
    destoryed() {
       
    },
    methods:{
      /*
       * 新建成功后，刷新页面
       */
      formDataEmitFun(data){
        this.getQueryList();
        this.addDialogVisible = false;
       },
      /*
      * 查询列表
      */
      getQueryList(){
        let url = this.pageType == 'org' ? 
                `${this.$util.basePath}/v_vote/list/from_org/${this.orgCode}`:
                `${this.$util.basePath}/v_vote/list`;

        this.$request.requestAxios('post', url, this._getQueryListParams(),
          (response) => { //请求成功的回调...
            var responseData = response.data;
            this.listData = responseData.data;
            this.isLoad = false;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error( url + ' - 失败');
            this.isLoad = false;
          });
      },
      /*
      * 查询列表-查询条件
      */
      _getQueryListParams(){
        return { 
          status: this.activeName,
          pageSize: this.elementPageData.pageSize,
          pageNum: this.elementPageData.pageNum,
        }
      },
      /*
      * 改变当前页码触发此事件，并广播paginationChange事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryList();
      },
      /*
      * 改变每页条数触发此事件，并广播paginationChange事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryList();
      },
      /*
      * 查询选票列表
      */
      getQueryVoteList(){
        let url = this.pageType == 'org' ? 
                    `${this.$util.basePath}/v_ballot/list/from_org/${this.orgCode}` :
                    `${this.$util.basePath}/v_ballot/list`;

        this.$request.requestAxios('post', url, this._getQueryVoteListParams(),
          (response) => { //请求成功的回调...
            this.voteListData = response.data.data;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(url + ' - 失败');
        });
      },
      /*
      * 查询选票列表-查询条件
      */
      _getQueryVoteListParams(){
        return { 
            beginTime:       this.voteForm.dateRange ? new Date(this.voteForm.dateRange[0]).getTime() : null,
            endTime:         this.voteForm.dateRange ? new Date(this.voteForm.dateRange[1]).getTime() : null,
            ballotSpecial:   this.voteForm.ballotSpecial,
        }
      },
      /*
       * 状态转文字
       * @params {string/number} status 状态码
       */
      _statusConvertFont(status){
        switch(status){
          case 1:
              return '未结束';
            break;
          case 2:
              return '已结束';
            break;
          case 3:
              return '不参加';
            break;
          case 20:
              return '已取消';
            break;
          default:
            break;
        }
       },
      /*
       * 切换状态查询任务列表
       */
      handleClick(tab,event){
        // ---------------------- 设置为初始状态-----------------------
        this.elementPageData.pageNum = this.$util.elementPagination.pageNumDefault;
        this.elementPageData.pageSize = this.$util.elementPagination.pageSizeDefault;

        this.getQueryList();
       },
      /*
       * 根据党组织id获取成员
       */
      getQueryaffiliatedUsers(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_orgs/members', {params: {id: self.orgId}},
          function(response) {
            self.$set(self, "recorderList" , response.data.data);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/members');
        });
       },
      /*
       * 保存投票数据
       */
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid && this._validVoteChecked()) {
            this.$request.requestAxios('post', `${this.$util.basePath}/v_vote/add/from_org/${this.orgCode}`, 
                this._onSubmitParams(), 
              (response) => {
                this.getQueryList();
                this.$message.success({message: '创建成功！', duration: 1000});
                this.addDialogVisible = false;
              }, (error, status) => {
                status == 200 ? this.$message.error(error.data.meta.message) : 
                  this.$message.error(`${this.$util.basePath}/v_ballot/add/from_org/${this.orgCode} - 失败`);
                this.addDialogVisible = false;
              },
           );
          }else{
             return false;
          }
        })
       },
      _onSubmitParams(){
        return {
          "beginTime":     this.form.dateRange ? new Date(this.form.dateRange[0]).getTime() : null,
          "endTime":       this.form.dateRange ? new Date(this.form.dateRange[1]).getTime() : null,
          "createOrgCode": sessionStorage.getItem('orgCode'),
          "record":        this.form.record,
          "ballotId":      this.form.ballotId,
        }
      },
      /*
       * 验证是否有勾选选票
       */
      _validVoteChecked(){
        !this.form.ballotId ? this.isBallot = false : this.isBallot = true;

        return this.form.ballotId ? true : false;

      },
    }
  }
</script>