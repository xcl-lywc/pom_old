/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务列表
**************************************/
<template>
  <div class="content-manage">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未完成的" name="1" status="1">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="已完成的" name="2" status="2">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="我执行的" name="assignee" status="assignee">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="我发出的" name="creator" status="creator">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="抄送我的" name="copy" status="copy">
          <div></div>
        </el-tab-pane>
      </el-tabs>
      <div v-if="taskType" class="fr add-btn-manage">
        <span @click="addTaskDialogVisibleFun"><i class="el-icon-circle-plus-outline"></i></span>
      </div>
      <div v-if="!taskType" class="fr add-btn-manage">
        <span @click="addTaskDialogVisibleFun(8)"><i class="el-icon-circle-plus-outline"></i>人员</span>
        <span @click="addTaskDialogVisibleFun(88)"><i class="el-icon-circle-plus-outline"></i>组织</span>
        <span @click="addTaskDialogVisibleFun('other')"><i class="el-icon-circle-plus-outline"></i>工作记录</span>
      </div> 
    </div>
    <!-- 列表内容 -->
    <div  v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task">
      <div class="content-wrapper-innter">
        <div class="task-list" v-for="(item, index) in listData.rows" :key="index">
          <el-row class="title-message row">
            <el-col :span="12" class="title">
              <span class="" @click="detailDialogFun(item.id)" :title="item.content">{{item.taskType}}：{{item.content}}</span>
            </el-col>
            <el-col :span="6" class="position text-center" :title="item.assignee">{{item.assignee}}</el-col>
            <el-col :span="6" class="date fr">{{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}</el-col>
          </el-row>
          <p class="end-date">截止时间：{{$util._convertDate(item.endTime, 'yyyy年MM月dd日 hh:mm:ss')}}</p>
          <p class="message-num">
            <span><img class="marr5" src="../../images/ifor_icon.png">{{item.reviewVo.total}}</span>
            <span class="marl20" v-if="item.allTask != 0">
              <img class="marr5" src="../../images/org_user_icon.png">{{item.finishs}}/{{item.allTask}}已完成
            </span>
            <!-- <span class="fr" v-if="activeName == 1"><el-button @click="submitCompleteForm(item.taskVoList[0].processTaskId)" size="mini" type="primary">去完成</el-button></span> -->
          </p>
        </div>
      </div>

      <div class="element-pagination-manage">
        <el-pagination :span="24" class="ce-pagination"
                       @size-change="handleSizeChange($event)"
                       @current-change="handleCurrentChange($event)"
                       :current-page="elementPageData.pageNum"
                       :page-sizes="elementPageData.defaultData.pageSizes"
                       :page-size="elementPageData.defaultData.pageSizeDefault"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="listData.total">
        </el-pagination>
      </div>
    </div>
    <!-- 新建任务 -->
    <el-dialog
      class="add-task-dialog dialog"
      :title="taskType ? taskTitle : '新建任务'"
      :visible.sync="addTaskDialogVisible"
      :before-close="handleAddTaskDialogClose"
      width="80vw">
      <!-- 暂时不需要 -->
      <div v-if="!taskType" style="display: none;">
        <el-form class="demo-ruleForm add-task-left" ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item class="is-error is-required" label="执行人:">
            <el-input :title="form.accountName" readonly="readonly" @focus="accountOrgInput(true,false)" isAccountOrg="true" isCopyAccountOrg="false" accountOrg="true" v-model="form.accountName"></el-input>
            <div v-show="rules.accountName.required" class="el-form-item__error">
              请选择执行人
            </div>
          </el-form-item>
          <el-form-item label="抄送人:">
            <el-input :title="form.copyAccountName" @focus="accountOrgInput(false,true)" readonly="readonly" isAccountOrg="false" isCopyAccountOrg="true" accountOrg="true" v-model="form.copyAccountName"></el-input>
          </el-form-item>
          <el-form-item label="截止时间:" prop="endTime">
            <el-col :span="14">
              <el-date-picker
                      :picker-options="pickerOptions"
                      :disabled="form.endTimeChecked"
                      type="datetime"
                      placeholder="选择日期"
                      v-model="form.endTime"
                      style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">&nbsp;</el-col>
            <el-col :span="8">
              <el-checkbox v-model="form.endTimeChecked">没有截止时间</el-checkbox>
            </el-col>
          </el-form-item>
          <el-form-item label="提醒时间:" prop="remindTime">
            <el-select v-model="form.remindTime" placeholder="">
              <el-option label="提前两天" value="2"></el-option>
              <el-option label="提前一天" value="1"></el-option>
              <el-option label="当天" value="0"></el-option>
              <el-option label="逾期一天" value="-1"></el-option>
              <el-option label="逾期两天" value="-2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容:" class="no-border" prop="formData">
            <el-input type="textarea" placeholder="请输入内容" v-model="form.formData"></el-input>
          </el-form-item>
          <el-form-item class="padb20" prop="privateFileIds">
            <el-upload
                    class="upload-demo upload-demo-manage"
                    :action="_convertFilesUrl()"
                    :headers="{Authorization: 'Bearer ' + userData.token}"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    multiple
                    :limit="100"
                    :on-exceed="handleExceed">
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
            </el-upload>
          </el-form-item>
          <el-form-item class="no-border text-right marr20">
            <el-button type="primary" size="small" @click="submitForm('form')">发 布</el-button>
          </el-form-item>
        </el-form>
        <!-- 执行人数据 -->
        <div v-show="isAccountOrg" class="add-task-right">
          <div class="org-list padl20" :class="{'org-list_open': executor.isPartyorgChidrensOne}">
            <h1>
              <span @click="openOrCloseOrg('executor','isPartyorgChidrensOne')">职能部门</span>
              <img @click="openOrCloseOrg('executor','isPartyorgChidrensOne')" class="fr" src="../../images/arrow_icon.png" />
            </h1>
            <div class="child-org">
              <p v-if="executor.partyorgChidrens[1].length != 0 " v-for="(item, index) in executor.partyorgChidrens[1]" :key="index">
                <el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>
              </p>
              <p v-if="executor.partyorgChidrens[1].length == 0" class="no-data-box">暂无数据</p>
            </div>
          </div>
          <div class="org-list padl20" :class="{'org-list_open': executor.isPartyorgChidrensTwo}">
            <h1>
              <span @click="openOrCloseOrg('executor','isPartyorgChidrensTwo')">支部</span>
              <img @click="openOrCloseOrg('executor','isPartyorgChidrensTwo')" class="fr" src="../../images/arrow_icon.png" />
            </h1>
            <div class="child-org">
              <p v-if="executor.partyorgChidrens[0].length > 0 " v-for="(item, index) in executor.partyorgChidrens[0]" :key="index">
                <el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>
              </p>
              <p v-if="executor.partyorgChidrens[0].length == 0" class="no-data-box">暂无数据</p>
            </div>
          </div>
          <div class="org-list padl20" :class="{'org-list_open': executor.isPartyrogMembers}">
            <h1>
              <span @click="openOrCloseOrg('executor','isPartyrogMembers')">成员</span>
              <!-- <img @click="openOrCloseOrg('executor','isPartyrogMembers')" class="fr" src="../../images/arrow_icon.png" /> -->
            </h1>
            <div class="child-org">
              <tree-selected 
                selectionType="checked"
                pageType="org" 
                @treeCheckedData="executorMemberTreeCheckedListFun"></tree-selected>

              <!-- <p v-if="executor.partyrogMembers.length == 0" class="no-data-box">暂无数据</p> -->
            </div>
          </div>
        </div>
        <!-- 抄送人数据 -->
        <div v-show="isCopyAccountOrg" class="add-task-right">
          <div class="org-list padl20" :class="{'org-list_open': copyPerson.isPartyrogMembers}">
            <h1>
              <span @click="openOrCloseOrg('copyPerson','isPartyrogMembers')">成员</span>
              <!-- <img @click="openOrCloseOrg('copyPerson','isPartyrogMembers')" class="fr" src="../../images/arrow_icon.png" /> -->
            </h1>
            <div class="child-org">
              <tree-selected 
                selectionType="checked"
                pageType="org" 
                @treeCheckedData="copyMemberTreeCheckedListFun"></tree-selected>
              <!-- <p v-if="copyPerson.partyrogMembers.length == 0" class="no-data-box">暂无数据</p> -->
            </div>
          </div>
        </div>
      </div>

      <!-- <task-form 
        v-if="!taskType" 
        :pageType="pageType" 
        :taskType="taskFirstId" 
        :requestUrl="`${$util.basePath}/t_form_data/first/${taskFirstId}`" 
        :mathRandom="mathRandomFormData"
        @formDataEmit="formDataEmitFun"></task-form> -->
      <!-- 当任务类型有值时就传入指定的类型Id，否则显示taskFirstId -->
      <task-form  
        :taskFirstId="taskFirstId"
        :formMoreDataListTypeIds="_ids('array')"
        :formMoreDataList="formDataList"
        :pageType="pageType" 
        :taskType="taskType ? taskType : taskFirstId" 
        :requestUrl="`${$util.basePath}/t_form_data/first/${taskType ? taskType : taskFirstId}`" 
        :mathRandom="mathRandomFormData" 
        @formDataEmit="formDataEmitFun"></task-form>
    </el-dialog>
    <!-- 任务详情 -->
    <task-detail :activeStatus="activeName" :detailId="singleTaskId" @closeDialog="closeDialogFun" :mathRandom="mathRandom" type="org"></task-detail>
    <!-- 有几个不同的表单合成的页面 --> 
    <el-dialog
      class="add-task-dialog dialog"
      title="请选择类型"
      :visible.sync="checkFromTypeDialog" 
      width="450px">
      <el-form>
        <el-form-item>
          <el-tree
            ref="wrecordTree"
            :data="wrecordTypeData" 
            :props="defaultProps"  
            node-key="id"
            show-checkbox >
          </el-tree>
        </el-form-item>
        <el-form-item class="no-border text-right marr20">
          <el-button type="primary" @click="submitType()">确 认</el-button>
        </el-form-item>
      </el-form> 
    </el-dialog>
  </div>
</template>
<script>
  import Detail from './detail/Detail.vue'
  import Task_Form from './detail/Task_Form.vue'
  import Query_Tree_Selected from '../common/tree_select/Query_Tree_Selected.vue'
  export default {
    props: {
      pageType: {
        required: false,
        default:  'org', //页面类型
      },      
      taskType:      null, //任务类型id
      taskTitle:     null, // 任务名字
      taskFirstId:   '8',  // 为8查询人员表单， 为88查询组织表单
    },
    components:{
      "task-detail": Detail,    // 任务详情
      "task-form":   Task_Form, //任务表单组件
      "tree-selected": Query_Tree_Selected ,//人员下拉树
    },
    computed:{
      bubbleStatusChange(){
        return this.$store.state.bubbleStatus;
      }
    },
    data() {
      return {
          formDataList: [],
          isLoad:       true,
          userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
          orgId:    sessionStorage.getItem('orgId'),     //党组织id
          orgCode:  sessionStorage.getItem('orgCode'),   //党组织code
          basePath: basePath,
          checkFromTypeDialog:     false, 
          addTaskDialogVisible:    false, //新建任务模态框显示属性
          mathRandom:              0,     //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
          mathRandomFormData:      0,     //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
          isAccountOrg:            true,  //执行人下面的所有数据，为true显示
          isCopyAccountOrg:        false, //抄送人下面的所有数据，为true显示
          singleTaskId:            null,  //单个任务ID
          // privateFileIds: [],
          fileList:                [],  //附件
          form: {                       //表单数据
              accountName:    null,       //执行人
              copyAccountName:null,       //抄送人
              copy:           [],       //抄送人ID
              endTime:        null,       //截止时间
              endTimeChecked: false,      //为true截止时间不能选择，
              formData:       null,       //内容
              partyCode:      null,       //执行人的支部
              userAccount:    [],       //执行人的人员
              companyCode:    null,       //执行人的职能部门
              remindTime:     '2',        //提醒时间
              privateFileIds: [],         //附件
              assignee: sessionStorage.getItem('orgId'),
              assiType: 2 ,
              proDefKeyId: 2,
              commentContent:  null,       //回复内容
          },
          rules: {                      //表单验证
              accountName: { required: false, message: '请选择执行人', trigger: 'blur' },
              formData: [{ required: true, message: '请填写内容', trigger: 'blur' }],
          },
          elementPageData: {               //分页需要的数据
              defaultData:  this.$util.elementPagination,
              pageNum:      this.$util.elementPagination.pageNumDefault,
              pageSize:     this.$util.elementPagination.pageSizeDefault,
          },
          activeName:     '1',                 //切换类型状态

          listData: { total: 0, rows: [] }, //任务列表
          singleTaskDetail: null,           //任务详情
          commentList:      [],             //评论列表
          executor: {                       //执行人数据
              partyorgChidrens: {   //党组织信息
                  0:   [],  //非职能部门数据
                  1:   [],  //职能部门数据
              } ,
              partyrogMembers:  [], //党组织下的成员
              isPartyorgChidrensOne: true,
              isPartyorgChidrensTwo: true,
              isPartyrogMembers: true,
          },
          copyPerson: {                     //抄送人
              partyrogMembers: [],
              isPartyrogMembers: true
          },
          pickerOptions: {
              disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7;
              },
          },
          defaultProps: {
            children: 'childrens',
            label: 'name'
          },
          wrecordTypeData: [],
      }
    },
    watch: {
      bubbleStatusChange(){ //当数据有变化，操作如下功能
        // 当前状态为未完成的状态，
        // 并且我的任务详情没有显示，那么就刷新一下当前列表
        if(this.activeName == 1 && !this.$store.state.isTaskDetailShow){ 
          this.getQueryTaskList();
        }
      },
      /*
      * 监听支部数据，然后绑定给执行人
      */
      executor: {
          handler: function (data) {
              this.executorChecked();
          },
          deep: true
      },
      /*
      * 监听支部数据，然后绑定给抄送人
      */
      copyPerson: {
          handler: function (data) {
              this.copyPersonChecked();
          },
          deep: true
      },
      /*
       * 监听截止时间状态,为false，清空截止时间
       */
      'form.endTimeChecked'(data){
          !data ? '' : this.form.endTime = ''
       },
      taskType(){
        this.getQueryTaskList();
      },
    },
    mounted() {
        this.getQueryTaskList();
        this.getWrecordType();
    },
    destoryed() {

    },
    methods:{
        /*
         * 工作记录类型
         */
        getWrecordType(){  
          this.$request.requestAxios('get', `${basePath}/wrecord/type/from_org/${this.orgCode}` , '',
           (response) => { 
            this.wrecordTypeData = response.data.data;  
          }, (error, status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                this.$message.error('wrecord/type'); 
          }); 
        },
        /*
         * 获取执行人被选中的数据
         */
        executorChecked(){
          let data = this.executor;
          this.form.accountName = this._convertCheckedData(data.partyorgChidrens[0]).name
              + this._convertCheckedData(data.partyorgChidrens[1]).name
              + this._membersConvert(data.partyrogMembers).name;

          this.form.companyCode = this._convertCheckedData(data.partyorgChidrens[0]).accountsId;
          this.form.partyCode = this._convertCheckedData(data.partyorgChidrens[1]).accountsId;
          this.form.userAccount = this._membersConvert(data.partyrogMembers).accountsId;
          
          // ----- 当执行人不为null,将提示信息取消
          if(this.form.accountName){
              this.rules.accountName.required = false;
          }
        },
        /*
         * 获取抄送人被选中的数据
         */
        copyPersonChecked(){
          let data = this.copyPerson;
          this.form.copyAccountName = this._membersConvert(data.partyrogMembers).name;
          this.form.copy = this._membersConvert(data.partyrogMembers).accountsId;
        },
        /*
        * 查看详情
        */
        detailDialogFun(id){
            this.singleTaskId = id;
            // ---------- 累加，避免重复，不能被监听 ------------------
            this.mathRandom += 1;
            // --------- 将详情页面，设置打开状态 -----
            this.$store.state.isTaskDetailShow = true;
        },
        /*
        * 刷新页面
        */
        pageLocalRefresh(){
            this.orgId = sessionStorage.getItem('orgId');
            this.getQueryTaskList();
        },
        /*
        * 根据两个参数显示抄送人和执行人的情况
        * @param {Boolean} isAccountOrg
        */
        accountOrgInput(isAccountOrg, isCopyAccountOrg){
            //执行人下面的所有数据，为true显示
            this.isAccountOrg = isAccountOrg;

            //抄送人下面的所有数据，为true显示
            this.isCopyAccountOrg = isCopyAccountOrg;
        },
        /*
        * 将参数设置为相反数
        * @param {keyPar} 父节点名称
        * @param {keyChi} 子节点名称
        */
        openOrCloseOrg(keyPar,keyChi){
            this[keyPar][keyChi] = !this[keyPar][keyChi];
        },
        /*
        * 查询任务列表
        */
        getQueryTaskList(){
            let self = this, url = '';
            this.pageType == 'org' ? url = basePath + '/t_tasks/list/org' : url = basePath + '/t_tasks/list'
            self.$request.requestAxios('get', url , this._getTaskListParam(),
                function(response) {
                    let responseData = response.data;
                    self.listData = responseData.data;
                    self.isLoad = false;
                },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                        self.$message.error(url);
                    self.isLoad = false;
                });
        },
        /*
        * 查询参数组装
        */
        _getTaskListParam(){
            let self = this, paramsData = {
                params: {
                    status:   '',
                    assignee: '',
                    creator:  '',
                    copy:     '',
                    orgId:    this.orgId,
                    pageSize: this.elementPageData.pageSize,
                    pageNum:  this.elementPageData.pageNum,
                    type:     this.taskType,
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
         * 根据党组织id获取下级党组织
         * @param {number} type 组织类型
         */
        getQueryPartyrogChildrens(type){
            let self = this;
            self.$request.requestAxios('get', basePath + '/party_orgs/chidrens', {params: {id: self.orgId, function: type}},
                function(response) {
                    let responseData = response.data;
                    self.$set(self.executor.partyorgChidrens, type , self._convertAddChecked(responseData.data));
                },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                        self.$message.error('/party_orgs/chidrens');
                });
        },
        /*
         * 根据党组织id获取成员
         */
        getQueryPartyrogMembers(){
            let self = this;
            self.$request.requestAxios('get', basePath + '/party_orgs/members', {params: {id: self.orgId}},
                function(response) {
                    let responseData = response.data;
                    // --------------- 执行人下面的人员 ----------------
                    // self.$set(self.executor, "partyrogMembers" , self._convertAddChecked(responseData.data));

                    // --------------- 抄送人下面的人员 ----------------
                    // self.$set(self.copyPerson, "partyrogMembers" , JSON.parse(JSON.stringify(self._convertAddChecked(responseData.data))));
                },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                        self.$message.error('/party_orgs/members');
                });
        },
        /*
         * 组装添加checked字段,并返回字段
         * @param { object } data 需组装的数据  必须是一个list
         * @return data
         */
        _convertAddChecked(data){
            $.each(data, function(index, item) {
                item.checked = false;
            });
            return data
        },
        /*
         * 组装被选中的数据
         * @param { object } data 需组装的数据  必须是一个list
         * @return accounts
         */
        _convertCheckedData(data){
            let dataJson = {
                name: '',
                accountsId: [],
            };
            if(data) {
                $.each(data, function(index, item){
                    if(item.checked){
                        dataJson.name += item.name + '，';
                        dataJson.accountsId.push(item.id); 
                    }
                });
            }
            return dataJson;
        },
        /*
         * 人员组装
         */
        _membersConvert(data){
           let dataJson = {
                name: '',
                accountsId: [],
            };
            if(data) {
                $.each(data, function(index, item){
                    dataJson.name += item.name + '，';
                    dataJson.accountsId.push(item.id); 
                });
            }
            return dataJson;
        },
        /*
        * 显示添加任务模态框
        */
        addTaskDialogVisibleFun(taskFirstId){
          if(taskFirstId == 'other'){
            this.taskFirstId = taskFirstId;
            this.checkFromTypeDialog = true; 
          }else{
            this.taskFirstId = taskFirstId;
            this.addTaskDialogVisible = true;
            this.mathRandomFormData ++;
          }
          
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
        * 提交表单
        */
        submitForm(formName) {
            let self = this;
            if(self.form.accountName){  //先验证执行人是否勾选
                self.$refs[formName].validate((valid) => {  //在验证其他文本框是否通过
                    if (valid) {
                        self.$request.requestAxios('post', basePath + '/t_tasks/add', this._submitFormParamData(),
                            function(response) {
                              let responseData = response.data;
                              self.getQueryTaskList();
                            },function(error, status) {
                              status == 200 ? self.$message.error(error.data.meta.message) : 
                                              self.$message.error('/t_tasks/add');
                            });

                        this._resetFields();

                        // --------- 关闭弹框 ----------
                        self.addTaskDialogVisible = false;
                    } else {
                        return false;
                    }
                });
            }else{
                self.rules.accountName.required = true;
            }
        },
        /*
        * 筛选表单数据
        */
        _submitFormParamData(){
            return {
                copy:           this.form.copy,
                endTime:        this.form.endTime ? this.form.endTime.getTime() : null,
                formData:       this.form.formData,
                partyCode:      this.form.partyCode,
                userAccount:    this.form.userAccount,
                companyCode:    this.form.companyCode,
                remindTime:     this.form.remindTime,
                privateFileIds: this.form.privateFileIds,
                assignee:       this.form.assignee,
                assiType:       this.form.assiType,
                proDefKeyId:    this.form.proDefKeyId,
            };
        },
        /*
         * 关闭弹框清空之前的验证信息
         */
        handleAddTaskDialogClose(done){
            this._resetFields();
            // 关闭弹框
            done();
        },
        /*
         * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
         */
        _resetFields(){
            // 由于样式问题，此字段做了单独的验证
            this.rules.accountName.required = false;
            // 清空验证信息
            this.$refs.form ? this.$refs.form.resetFields() : '';

            // 清空附件
            this.fileList = [];
        },
        /*
        * 拼接上传附件的URL地址
        */
        _convertFilesUrl(){
            return basePath + '/file/'+ this.orgId +'/uplode';
        },
        /*
        * 附件上传成功后，获取成功后的数据
        */
        handleAvatarSuccess(res, file){
            this.form.privateFileIds.push(res.data)
        },
        /*
        * 附件上传之前后，验证的数据大小
        */
        beforeAvatarUpload(file){
            const isLt2M = file.size / 1024 / 1024 < 100;
            if (!isLt2M) {
              this.$message.error('附件大小不能超过 100MB!');
            }
            return isLt2M;
        },
        handleRemove(file){
            if(file.response){
                let removeItem = file.response.data;
                this.form.privateFileIds = $.grep(this.form.privateFileIds, function(value) {
                    return value != removeItem;
                });
            }
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
         * 弹框关闭时，刷新列表数据,
         * 用途：在详情里面有的任务已经完成，那么在未完成任务里面将不再显示，
         */
        closeDialogFun(){
          this.getQueryTaskList();
        },
        /*
         * 新建成功后，刷新页面
         */
        formDataEmitFun(){
          this.getQueryTaskList();
          this.addTaskDialogVisible = false;
        },
        /*
         * 执行人人员数据
         */
        executorMemberTreeCheckedListFun(val, checkedData){
          // console.log(val, checkedData)
          this.executor.partyrogMembers = val;
          this.executorChecked();
        },
        /*
         * 抄送人人员数据
         */
        copyMemberTreeCheckedListFun(val, checkedData){
          // console.log(val, checkedData)
          this.copyPerson.partyrogMembers = val;
          this.copyPersonChecked();
        },
        submitType(ev){
          this.$request.requestAxios('get', `${this.$util.basePath}/wrecord/form/from_org/${this.orgCode}`, {params:  {"ids": this._ids('string') }}, (response) => {  
            this.formDataList = this._formCovert(response.data.data); 
            this.addTaskDialogVisible = true;
            this.mathRandomFormData ++;
            this.checkFromTypeDialog = false;
          }, (error, status) => {
            status == 200 ? this.$message.error(error.data.meta.message) : 
            this.$message.error(`wrecord/form/from_org - get失败`);
            this.checkFromTypeDialog = false;
          }); 
        }, 
        /*
         * 获取被选中类型的typeId
         * @params {string} string将数组转为字符串的格式，以逗号隔开；array就是传入数组的形式
         */
        _ids(returnType){
          let items = this.$refs.wrecordTree ? this.$refs.wrecordTree.getCheckedNodes() : [], ids = [];
          items.forEach( (item) => {
            if(item.typeId){
              ids.push(item.typeId);
            }
            
          })
          if(returnType == 'string'){
            return ids.join(',');
          }else{
            return ids;
          }
          
        },
        _formCovert(data){
          let formDataList = [];
          if(data){
            data.forEach( (item) => {
              if(item.inputs){
                item.inputs.forEach( (itemInput) => {
                  let bool = true;
                  formDataList.forEach( (itemForm) => {
                    if(itemForm.backstageKey[0].keyName == itemInput.backstageKey[0].keyName){
                      bool = false;
                    }
                  })
                  if(bool){ 
                    formDataList.push(itemInput);
                  }
                })
              } 
            })
          }
          return formDataList;
        }
    }
  }
</script>
<style lang="less">
  .add-btn-manage{
    span{ 
      font-weight: 100;
      font-size: 18px;
      margin-left: 15px;
    }
    i{
      margin-right: 5px;
      font-size: 22px;
      position: relative;
      top: 2px;
    }
  }
</style>