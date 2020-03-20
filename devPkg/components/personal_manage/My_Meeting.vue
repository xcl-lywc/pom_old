/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务列表
**************************************/ 
<template>
  <div class="content-manage">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未结束的" name="1" status="1">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="已结束/取消/不参加的" name="2" status="2">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="我发出的" name="3" status="3">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="有任务的" name="4" status="4">
          <div></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 列表内容 -->
    <div class="content-wrapper-manage content-wrapper-manage_task">
      <div class="content-wrapper-innter">
        <div v-loading="isLoad" class="task-list metting-box-list" v-for="(item, index) in listData.rows" :key="index">  
          <el-row class="title-message">
            <el-col :span="24" class="title">
              <span class="padr15"><img src="../../images/metting_icon1.png" /></span>
              <span @click=" getQueryMeetingDetail(item.id); getCommentList();" :title="item.content">{{item.meetingContent}}</span>
            </el-col>
          </el-row>
          <p class="end-date">
            会议时间：{{
                        $util._convertDate(item.beginTime,'yyyy年MM月dd日 hh:mm:ss') + '~' + 
                        $util._convertDate(item.endTime,'yyyy年MM月dd日 hh:mm:ss')
                      }} 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            会议地点：{{item.meetingPlace}}</p>
          <p class="message-num metting-box">
            <span><img class="marr5" src="../../images/urser_black_manage.png">{{item.creator}}</span>
            <span class="marl20"><img class="marr5" src="../../images/time.png">
              {{$util._convertDate(item.createTime,'yyyy年MM月dd日 hh:mm:ss')}}
            </span>
            <!-- <span class="fr"><img class="marr5" src="../../images/yinzhang.png"></span> -->
            <span class="fr">{{_statusConvertFont(item.status)}}</span>
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

    <!-- 会议详情 -->
    <el-dialog 
      class="task-detail-dialog dialog"
      title="会议详情"
      :visible.sync="detailDialogVisible"
      width="800px">
      <div v-if="singleMeetingDetail">
        <p class="complete-detail"><img src="../../images/learns.png"/> {{singleMeetingDetail.meetingContent}}</p>
        <p class="complete-detail padl20 marl15">时间：
            {{$util._convertDate(singleMeetingDetail.beginTime,'yyyy年MM月dd日 hh:mm:ss') + '~' +
              $util._convertDate(singleMeetingDetail.endTime,'yyyy年MM月dd日 hh:mm:ss')
            }}
        </p>
        <p class="complete-detail padl20 marl15">地点：{{singleMeetingDetail.meetingPlace}}</p>
        <p class="complete-detail padl20 marl15">
          {{singleMeetingDetail.creator}}创建于
          {{$util._convertDate(singleMeetingDetail.createTime,'yyyy年MM月dd日 hh:mm:ss')}}</p>
        <div class="copy">
          <p>
            <img src="../../images/user#000.png"/>
            <span>
              <el-tabs v-model="tabActive">
                <el-tab-pane :label="`确认参加(${personNum(2)})`" name="2"></el-tab-pane>
                <el-tab-pane :label="`不参加(${personNum(3)})`" name="3"></el-tab-pane>
                <el-tab-pane :label="`未响应(${personNum(1)})`" name="1"></el-tab-pane>
              </el-tabs>  
            </span>
          </p>
          <p v-if="singleMeetingDetail.meetingPerson" class="head">
            <el-tooltip 
              v-for="(itemHead, itemHeadIndex) in singleMeetingDetail.meetingPerson" 
              v-if="itemHead.affiStatus == tabActive"
              :key="itemHeadIndex" 
              class="item" 
              effect="dark" 
              :content="'姓名：' + itemHead.userName" 
              placement="top-start">
              <img v-if="itemHead.picture" alt="暂无头像" :src="itemHead.picture"/>
              <img v-else alt="暂无头像" src="../../images/no_picture.png"/>
            </el-tooltip>
            <!-- 为2或者3，并且状态为1的情况下才能操作按钮 -->
            <el-button type="primary" size="mini" @click="participateFun(true)" v-show="tabActive == 2 && singleMeetingDetail.currentAffiStatus == 1">确认参加</el-button>
            <el-button type="primary" size="mini" @click="formDialogVisible = true; mathRandom++; " v-show="tabActive == 2 && singleMeetingDetail.currentAffiStatus == 1">请假</el-button>

            <el-button type="primary" size="mini"  @click="participateFun(false)" v-show="tabActive == 3 && singleMeetingDetail.currentAffiStatus == 1">不参加</el-button>
          </p>
        </div>
        <div class="copy">
          <p>
            <i class="fa fa-map-marker"></i>
            <span>已签到{{singleMeetingDetail.signPerson ? singleMeetingDetail.signPerson.length : 0}}</span>
          </p>
          <p v-if="singleMeetingDetail.signPerson" class="head">
            <el-tooltip 
              v-if="singleMeetingDetail.signPerson.length"
              v-for="(itemHead, itemHeadIndex) in singleMeetingDetail.signPerson" 
              :key="itemHeadIndex" 
              class="item" 
              effect="dark" 
              :content="'姓名：' + itemHead.userName" 
              placement="top-start">
              <img v-if="itemHead.picture" alt="暂无头像" :src="itemHead.picture"/>
              <img v-else alt="暂无头像" src="../../images/no_picture.png"/>
            </el-tooltip>
          </p>
          <p v-if="!singleMeetingDetail.signPerson" class="padl20 marl15">没有参与人</p>
        </div>
        <div class="copy">
          <p>
            <i class="el-icon-tickets"></i>
            <span>会议记录</span>
          </p>
          <!-- 必须是会议记录人才能查看，删除，和添加， -->
          <p class="head head-record">
            <!-- 有会议记录就显示 -->
            <el-button 
              v-if="singleMeetingDetail.meetingRecord" 
              class="el-button-ma" 
              type="text">
                <span @click="$util.downloadFile(singleMeetingDetail.meetingRecord.id)">{{singleMeetingDetail.meetingRecord.name}}</span>
                <i class="el-icon-error del" @click="fileDel()"></i>
            </el-button>
            <!-- 没有会议记录并且是否能上传会议记录的权限 -->
            <!-- <el-button 
              v-if="singleMeetingDetail.isRecord && !singleMeetingDetail.meetingRecord"  
              class="el-button-ma" 
              type="text" 
              @click="uploadRecord">
                上传会议记录
            </el-button> -->
            <el-button v-if="singleMeetingDetail.meetingRecord" type="text" size="small" @click="$util.downloadFile(singleMeetingDetail.meetingRecord.id)">{{singleMeetingDetail.meetingRecord.name}}</el-button>
            <span v-else> 暂无会议记录 </span>
          </p>
          <!-- 没有回忆记录并且没有添加会议记录 -->
          <p v-if="!singleMeetingDetail.isRecord && !singleMeetingDetail.meetingRecord" class="padl20 marl15">无</p>
        </div>
        <div class="copy">
          <p>
            <i class="fa fa-navicon"></i>
            <span>会议详情列表</span>
          </p>
          <p v-for="(item, index) in singleMeetingDetail.tasks" :key="index" class="padl20 marl15">
            <span>{{item.taskContent}}</span> <span class="fr">{{item.finishTask}}/{{item.allTask}}完成 </span>
          </p>
        </div>
        <div class="leave-message-detail">
          <img src="../../images/ifron#000.png"/>
          留言
          <div v-for="(itemComment, index) in commentList" class="padt15 padl20">
            <h5>
              <img class="marr5" src="../../images/urser_black_manage.png" />
              <span class="marr5">{{itemComment.creator}}</span> 
              <span>{{$util._convertDate(itemComment.createTime,'yyyy年MM月dd日')}}</span>
            </h5>
            <p class="marl20 padl15 padt5">{{itemComment.commentContent}}</p>
          </div>
        </div>
        <div class="leave-message text-right">
           <el-input type="textarea" placeholder="请回复点什么吧" v-model="commentContent"></el-input>
           <el-button size="small" type="primary" @click="replyAdd(singleMeetingDetail.id)">回复</el-button>
        </div>
        <!-- 表单弹框 -->
        <el-dialog
            class="add-task-dialog dialog"
            title="表单"
            :visible.sync="formDialogVisible"
            :close-on-click-modal="false"
            width="75%"
            append-to-body>
            <task-form :pageType="type" :meetingId="singleMeetingDetail.id" :requestUrl="`${$util.basePath}/t_form_data/first/87`" :mathRandom="mathRandom" @formDataEmit=" formDialogVisible = false; "></task-form>
        </el-dialog>
      </div>
    </el-dialog>
  </div>    
</template>
<script>
  import Task_Form from '../task_manage/detail/Task_Form.vue'
  export default {
    components:{
      "task-form":         Task_Form, //任务表单
    },
    data() {
      return { 
        formDialogVisible: false,
        isLoad:   true, 
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        addMettingDialogVisible: false, //会议弹框
        detailDialogVisible:     false, //任务详情模态框显示属性
        commentContent:          null, //评论内容
        elementPageData: {               //分页需要的数据
          defaultData:  this.$util.elementPagination,  
          pageNum:      this.$util.elementPagination.pageNumDefault,  
          pageSize:     this.$util.elementPagination.pageSizeDefault, 
        },
        activeName:          '1',                 //切换类型状态
        listData:            { total: 0, rows: [] }, //任务列表  
        singleMeetingDetail: null,           //任务详情  
        commentList:         [],             //评论列表       
        taskTypeList:        [],             //任务类型列表
        isAffiliatedUsers:   true,  //参会人下面的所有数据，为true显示
        isMeetingRecorder:   false, //参会记录人下面的所有数据，为true显示
        isAccounts:          true,  //参会人下面的所有数据，为true显示
        isCopy:              false, //参会记录人下面的所有数据，为true显示
        meetingId:           null,  //会议ID 
        tabActive: 2, //参会状态， 1未响应，2确认参加，3不参加  
        mathRandom: 0,
      }
     },
    computed: {
    },
    watch: {
     },
    mounted() {
      // ---- 任务列表
      this.getQueryList();
      // ---- 任务类型
      this.getQueryTaskType();
     },
    destoryed() {
     
     },
    methods:{
      /*
       * 计算人员不同情况下的数量
       * @params {string/number} status 1表示未响应，2表示参加，3表示未参加
       */
      personNum(status){
        let self = this,
            personList = this.singleMeetingDetail.meetingPerson,
            _count = 0;
        $.each(personList, function(index, item){
          item.affiStatus == status ? _count++ : _count;
        });
        return _count;
       },
      /*
       * 根据两个参数显示参会人和参会记录人的情况
       * @param {Boolean} isAffiliatedUsers,isMeetingRecorder
       */
      affiliatedUsersInput(isAffiliatedUsers, isMeetingRecorder){
        //参会人下面的所有数据，为true显示
        this.isAffiliatedUsers = isAffiliatedUsers;

        //参会记录人下面的所有数据，为true显示
        this.isMeetingRecorder = isMeetingRecorder;
       },
      /*
       * 根据两个参数显示执行人和抄送人记录人的情况
       * @param {Boolean} isAccounts,isAccounts
       */
      accountOrgInput(isAccounts, isCopy){
        //执行人下面的所有数据，为true显示
        this.isAccounts = isAccounts;

        //抄送人下面的所有数据，为true显示
        this.isCopy = isCopy;
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
      getQueryList(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/m_info/list/my', this._getListParam(),
          function(response) {
            let responseData = response.data;
            self.listData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/m_info/list/my');
            self.isLoad = false;
        });
       },
      /*
       * 查询参数组装
       */
      _getListParam(){
        return {
          params: {
            status:this.activeName,
            pageSize: this.elementPageData.pageSize,
            pageNum: this.elementPageData.pageNum,
          }
        }
       },
      /*
       * 查询任务类型
       */
      getQueryTaskType(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/m_info/task/type', '',
          function(response) {
            let responseData = response.data;
            self.taskTypeList = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/m_info/task/type');
        });
       },
      /*
       * 根据会议id获取参会成员
       */
      getQueryAttendExpoUsers(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/m_info/affiliate/' + self.meetingId, '',
          function(response) {
            let responseData = response.data;
            // --------------- 会议人下面的人员 ----------------
            self.$set(self.taskData, "accountsList" , self._convertAddChecked(responseData.data));

            // --------------- 会议记录人下面的人员 ----------------
            self.$set(self.taskData, "copyList" , JSON.parse(JSON.stringify(self._convertAddChecked(responseData.data))));
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/members', 20);
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
              dataJson.name += (item.name ? item.name : item.userName ? item.userName : '') + '，';
              item.hasOwnProperty("account") ? dataJson.accountsId.push(item.account) : dataJson.accountsId.push(item.id)
            }
          });
        }
        return dataJson;
       },
      /*
       * 查询任务详情
       * @param {object} data 单个任务数据
       */
      getQueryMeetingDetail(dataId){
        let self = this;
        // ------ 显示弹框 ------
        self.detailDialogVisible = true;
        self.$request.requestAxios('get', basePath + '/m_info/detail/' + dataId, "",
          function(response) {
            let responseData = response.data;
            self.$set(self, 'singleMeetingDetail', responseData.data)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/'+ dataId +'/detail');
        });
        self.meetingId = dataId;
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
       * 改变当前页码触发此事件
       * @param {number} val 当前页码
       */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryList();
       },
      /*
       * 改变每页条数触发此事件
       * @param {number} val 当前数据
       */
      handleSizeChange(val){ 
        this.elementPageData.pageSize = val;
        this.getQueryList();
       },
      /*
       * 提交会议表单
       */
      submitMeetingForm(formName) {
        let self = this;
        if(self.meetingForm.affiliatedUsersName && self.meetingForm.meetingRecorderName){
          self.$refs[formName].validate((valid) => {
            if (valid) {
              self.$request.requestAxios('post', basePath + '/m_info/add', this._submitFormParamData(),
                function(response) {
                  let responseData = response.data;
                  self.getQueryList();
                  self.$message(responseData.meta.message);
                },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/m_info/add');
              });
            } else {
              return false;
            }
          });
          this._mettingResetFields();
          // --------- 关闭弹框 ----------
          self.addMettingDialogVisible = false;
        }else{
          !self.meetingForm.affiliatedUsersName ? self.meetingRules.affiliatedUsersName.required = true : '';
          !self.meetingForm.meetingRecorderName ? self.meetingRules.meetingRecorderName.required = true : '';
        }
       },
      /*
       * 筛选表单数据
       */
      _submitFormParamData(){
        return {
          affiliatedUsers:      this.meetingForm.affiliatedUsers,//参会人账号
          meetingRecorder:      this.meetingForm.meetingRecorder,//参会记录人账号
          beginTime:            this.meetingForm.timeRange[0] ? new Date(this.meetingForm.timeRange[0]).getTime() : '',//开始时间
          endTime:              this.meetingForm.timeRange[1] ? new Date(this.meetingForm.timeRange[1]).getTime() : '',//结束时间
          meetingContent:       this.meetingForm.meetingContent,//会议内容
          meetingPlace:         this.meetingForm.meetingPlace,//会议地点
          privateFileIds:       this.meetingForm.privateFileIds,//附件
          remindTime:           parseInt(this.meetingForm.remindTime),//提醒时间
          createOrg:            this.meetingForm.createOrg, //组织ID
        };
       },
      /*
       * 关闭弹框清空之前的验证信息
       */
      handleAddMeetingDialogClose(done){
        this._mettingResetFields();
        done();
       },
      _mettingResetFields(){
        // 由于样式问题，此字段做了单独的验证
        this.meetingRules.affiliatedUsersName.required = false;
        this.meetingRules.meetingRecorderName.required = false;
        // 清空验证信息
        this.$refs.meetingForm.resetFields();
        this.fileList = [];
      },
      /*
       * 关闭弹框清空之前的验证信息
       */
      handleAddTaskDialogClose(done){
        this._taskResetFields();
        done();
       },
      _taskResetFields(){
         // 由于样式问题，此字段做了单独的验证
        this.taskRules.accountsName.required = false;
        // 清空验证信息
        this.$refs.taskForm.resetFields();
        this.fileList = [];
        // 关闭弹框
        
      },
      /*
       * 评论列表
       */
      getCommentList() {
        let self = this, data = null;
        self.commentList = [];
        self.$request.requestAxios('get', basePath + '/t_tasks/review/list', {params: {fromId: self.meetingId, fromType: '5'}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.commentList = resposeData.data.rows;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败')
        });
       },
      /*
       * 回复
       */
      replyAdd(id) {
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/t_tasks/review', 
          {fromId: id, fromType: '5', commentContent: self.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList();
            // ---------- 清空数据 --------
            self.commentContent = null; 
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review - 失败')
        });
       },
      /*
       * 状态转文字
       * @params {string/number} status 状态码
       */
      _statusConvertFont(status){
        console.log(status)
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
       * 参会
       * @params {Boolean} bool 为true参会，false不参会
       */
      participateFun(bool){
        let self = this, data = null;
        self.$request.requestAxios('patch', `${basePath}/m_info/affi/${self.meetingId}`, {affiliated: bool}, 
          function(respose) {// 请求成功回调函数...
            self.getQueryMeetingDetail(self.meetingId);
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`${basePath}/m_info/affi/${self.meetingId}`)
        });
       },
      /*
       * 删除会议记录
       */
      fileDel(){
        let self = this, data = null;
        self.$request.requestAxios('delete', `${basePath}/m_info/${self.meetingId}/record/`, '', 
          function(respose) {// 请求成功回调函数...
            self.getQueryMeetingDetail(self.meetingId);
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`${basePath}/m_info/${self.meetingId}/record/`)
        });
       },
      /*
       * 上传会议记录
       */
      uploadRecord(){
        let self = this, data = null;
        self.$request.requestAxios('delete', `${basePath}/m_info/${self.meetingId}/record/`, '', 
          function(respose) {// 请求成功回调函数...
            self.getQueryMeetingDetail(self.meetingId);
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`${basePath}/m_info/${self.meetingId}/record/`)
        });
       },
     }
  }
</script>