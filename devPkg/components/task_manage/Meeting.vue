/*************************************
*  create by xieyuanyuan date 2018/06/15
*  首页管理 - 任务管理 - 我的会议
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
      <div class="fr add-btn-manage">
        <el-button
          :title="!resourceManage.isAddMember ? '无权限' : ''"
          class="icon-plus_fx"
          :disabled="!resourceManage.isAddMember" 
          @click="addMettingDialogVisibleFun" 
          icon="el-icon-plus" 
          size="mini" 
          circle>
        </el-button>
        <!-- <i @click="addMettingDialogVisibleFun" class="el-icon-circle-plus-outline"></i> -->
      </div>
    </div>
    <!-- 列表内容 -->
    <div v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task">
      <div class="content-wrapper-innter">
        <div class="task-list metting-box-list" v-for="(item, index) in listData.rows" :key="index">  
          <el-row class="title-message" style="padding-left: 40px;">
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
    <!-- 添加会议 -->
    <el-dialog 
      class="add-task-dialog dialog"
      title="新建会议"
      :before-close="handleAddMeetingDialogClose"
      :visible.sync="addMettingDialogVisible"
      width="800px">
      <div>
        <el-form class="demo-ruleForm add-task-left" ref="meetingForm" :rules="meetingRules" :model="meetingForm" label-width="120px">
          <el-form-item class="is-error is-required" label="参会人员:">
            <el-input 
              :title="meetingForm.affiliatedUsersName" 
              readonly="readonly" 
              @focus="affiliatedUsersInput(true,false)"  
              v-model="meetingForm.affiliatedUsersName">
            </el-input>
            <div v-show="meetingRules.affiliatedUsersName.required" class="el-form-item__error">
              {{ meetingRules.affiliatedUsersName.message }}
            </div>
          </el-form-item>
          <el-form-item class="is-error is-required" label="参会记录人:">
            <el-input 
              :title="meetingForm.meetingRecorderName" 
              readonly="readonly" 
              @focus="affiliatedUsersInput(false,true)"
              v-model="meetingForm.meetingRecorderName">
            </el-input>
            <div v-show="meetingRules.meetingRecorderName.required" class="el-form-item__error">
               {{ meetingRules.meetingRecorderName.message }}
            </div>
          </el-form-item>
          <el-form-item label="会议地点:" prop="meetingPlace">
            <el-input placeholder="请输入内容" v-model="meetingForm.meetingPlace"></el-input>
          </el-form-item>

          <el-form-item label="会议时间:" prop="timeRange">
            <el-col :span="24">
              <el-date-picker 
                format="yyyy-MM-dd HH:mm"
                :default-time="['09:00:00','09:00:00']"
                :picker-options="pickerOptions" 
                type="datetimerange" placeholder="选择日期" v-model="meetingForm.timeRange" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="会议提醒:" prop="remindTime">
            <el-select v-model="meetingForm.remindTime" placeholder="">
              <el-option label="提前两天" value="2"></el-option>
              <el-option label="提前一天" value="1"></el-option>
              <el-option label="当天"     value="0"></el-option>
              <el-option label="逾期一天" value="-1"></el-option>
              <el-option label="逾期两天" value="-2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容:" class="no-border" prop="meetingContent">
            <el-input type="textarea" placeholder="请输入内容" v-model="meetingForm.meetingContent"></el-input>
          </el-form-item>
          <el-form-item class="padb20">
            <el-upload
              class="upload-demo upload-demo-manage"
              :action="_convertFilesUrl()"
              :headers="{Authorization: 'Bearer ' + userData.token}"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-remove="beforeRemove"
              :before-upload="beforeAvatarUpload"
              multiple
              :limit="100"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
            </el-upload>
          </el-form-item>
          <el-form-item class="no-border text-right marr20">
            <el-button type="primary" @click="submitMeetingForm('meetingForm')">发 布</el-button>
          </el-form-item>
        </el-form>
        <!-- 参会人员数据 -->
        <div v-show="isAffiliatedUsers" class="add-task-right">
          <div class="org-list padl20" :class="{'org-list_open': meeting.isAffiliatedUsers}">
            <h1>
              <span @click="openOrCloseOrg('meeting','isaffiliatedUsers')">请勾选参会人员</span> 
            </h1>
            <div class="child-org">
              <tree-selected 
                selectionType="checked"
                pageType="org" 
                @treeCheckedData=" treeCheckedData('affiliatedUsers',$event) "></tree-selected>
            </div>
          </div>
        </div>
        <!-- 参会记录人员数据 -->
        <div v-show="isMeetingRecorder" class="add-task-right">
          <div class="org-list padl20" :class="{'org-list_open': meeting.isMeetingRecorder}">
            <h1>
              <span @click="openOrCloseOrg('meeting','isMeetingRecorder')">请勾选参会记录人员</span> 
            </h1>
            <div class="child-org">
              <tree-selected 
                selectionType="checked"
                pageType="org" 
                @treeCheckedData=" treeCheckedData('meetingRecorder',$event) "></tree-selected>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

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
            <!-- 为查询状态为2或者3，并且详情查询出来的currentAffiStatus状态为1的情况下才能操作按钮 -->
            <el-button type="primary" size="mini" @click="participateFun(true)" v-show="tabActive == 2 && singleMeetingDetail.currentAffiStatus == 1">确认参加</el-button>
            <el-button type="primary" size="mini" @click=" formDialogVisible = true; mathRandom++; " v-show="tabActive == 2 && singleMeetingDetail.currentAffiStatus == 1">请假</el-button>
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
          <div class="head head-record">
            <!-- 有会议记录就显示 -->
            <el-button 
              v-if="singleMeetingDetail.meetingRecord" 
              class="el-button-ma marb20" 
              type="text">
                <span @click="$util.downloadFile(singleMeetingDetail.meetingRecord.id)">{{singleMeetingDetail.meetingRecord.name}}</span>
                <i class="el-icon-error del" @click="fileDel()"></i>
            </el-button>
            <!-- 没有会议记录并且是否能上传会议记录的权限 -->
            <el-upload
              v-if="singleMeetingDetail.isRecord && !singleMeetingDetail.meetingRecord"  
              class="upload-demo marb20"
              :headers="{Authorization: 'Bearer ' + userData.token}"
              :action="_convertFilesUrl()"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccessRecord"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">上传会议记录</el-button>
              <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
            </el-upload>
          </div>
          <!-- 没有回忆记录并且没有添加会议记录 -->
          <p v-if="!singleMeetingDetail.isRecord && !singleMeetingDetail.meetingRecord" class="padl20 marl15">无</p>
        </div>
        <div class="copy">
          <p>
            <i class="fa fa-navicon"></i>
            <span>会议详情列表</span>
            <el-button class="pointer fr" type="primary" size="mini" @click=" addTaskDialogVisibleFun ">添加会议任务</el-button>
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
           <el-input type="textarea" placeholder="请回复点什么吧" v-model="meetingForm.commentContent"></el-input>
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

    <!-- 新建会议任务 -->
    <el-dialog 
      class="add-task-dialog dialog"
      title="新建会议任务"
      :visible.sync="addTaskDialogVisible"
      :before-close="handleAddTaskDialogClose"
      width="800px">
      <div>
        <el-form class="demo-ruleForm add-task-left" ref="taskForm" :rules="taskRules" :model="taskForm" label-width="120px">
          <el-form-item class="is-error is-required" label="执行人:">
            <el-input :title="taskForm.accountsName" readonly="readonly" @focus="accountOrgInput(true,false)" v-model="taskForm.accountsName"></el-input>
            <div v-show="taskRules.accountsName.required" class="el-form-item__error">
              请选择执行人
            </div>
          </el-form-item>
          <!-- <el-form-item label="抄送人:" >
            <el-input :title="taskForm.copyName" @focus="accountOrgInput(false,true)" readonly="readonly" v-model="taskForm.copyName"></el-input>
          </el-form-item>
          <el-form-item label="截止时间:" prop="endTime">
            <el-col :span="11">
              <el-date-picker :picker-options="pickerOptions1" :disabled="taskForm.endTimeChecked" type="date" placeholder="选择日期" v-model="taskForm.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">&nbsp;</el-col>
            <el-col :span="11">
            </el-col>
          </el-form-item>
          <el-form-item label="提醒时间:" prop="remindTime">
            <el-select v-model="taskForm.remindTime" placeholder="">
              <el-option label="提前两天" value="2"></el-option>
              <el-option label="提前一天" value="1"></el-option>
              <el-option label="当天" value="0"></el-option>
              <el-option label="逾期一天" value="-1"></el-option>
              <el-option label="逾期两天" value="-2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会议任务类型:" prop="tTypeId">
            <el-select v-model="taskForm.tTypeId" placeholder="">
              <el-option v-for="(itemType, indexType) in taskTypeList" :key="indexType" :label="itemType.typeName" :value="itemType.id"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="内容:" class="no-border" prop="meetingTaskInfo">
            <el-input type="textarea" placeholder="请输入内容" v-model="taskForm.meetingTaskInfo"></el-input>
          </el-form-item>
          <el-form-item class="padb20">
            <el-upload
              class="upload-demo upload-demo-manage"
              :headers="{Authorization: 'Bearer ' + userData.token}"
              :action="_convertFilesUrl()"
              :on-preview="handlePreviewTask"
              :on-remove="handleRemoveTask"
              :on-success="handleAvatarSuccessTask"
              :before-remove="beforeRemove"
              :before-upload="beforeAvatarUpload"
              multiple
              :limit="100"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
            </el-upload>
          </el-form-item>
          <el-form-item class="no-border text-right marr20">
            <el-button type="primary" @click="submitTaskForm('taskForm')">发 布</el-button>
          </el-form-item>
        </el-form>
        <!-- 执行人人数据 -->
        <div v-show="isAccounts" class="add-task-right">
          <div class="org-list padl20" :class="{'org-list_open': taskData.isAccounts}">
            <h1>
              <span @click="openOrCloseOrg('taskData','isAccounts')">请选择执行人</span> 
            </h1>
            <div class="child-org"> 
              <tree-selected 
                selectionType="checked"
                pageType="org" 
                @treeCheckedData=" treeCheckedData('accounts',$event) "></tree-selected>
            </div>
          </div>
        </div>
        <!-- 抄送人数据 -->
        <div v-show="isCopy" class="add-task-right">
          <div class="org-list padl20" :class="{'org-list_open': taskData.isCopy}">
            <h1>
              <span @click="openOrCloseOrg('taskData','isCopy')">请选择抄送人</span> 
            </h1>
            <div class="child-org">
              <tree-selected 
                selectionType="checked"
                pageType="org" 
                @treeCheckedData=" treeCheckedData('copy',$event) "></tree-selected>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>    
</template>
<script>
  import Task_Form from './detail/Task_Form.vue'
  import Query_Tree_Selected from '../common/tree_select/Query_Tree_Selected.vue'
  export default {
    components:{
      "task-form":         Task_Form, //任务表单
      "tree-selected": Query_Tree_Selected ,//人员下拉树
    },
    data() {
      return {
        formDialogVisible: false, 
        resource: JSON.parse(sessionStorage.getItem('resource')),
        resourceManage: {      //权限管理, 为false按钮不能操作
          isAddMember:    false,      
        }, 
        isLoad:   true, 
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        orgId:    sessionStorage.getItem('orgId'),     //党组织id
        orgCode:  sessionStorage.getItem('orgCode'),   //党组织code
        addMettingDialogVisible: false, //会议弹框
        addTaskDialogVisible:    false, //新建任务模态框显示属性
        detailDialogVisible:     false, //任务详情模态框显示属性
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
        fileList:            [], //附件
        taskForm:{         //会议任务表单
          accounts:       [], //执行人账号
          copy:           [], //抄送人账号
          accountsName:   [], //执行人名字
          copyName:       [], //抄送人名字
          endTime:        null,//截止时间
          endTimeChecked: null,//true为需要截止时间，
          meetingId:      0, //会议ID
          meetingTaskInfo:null, //会议任务内容
          partyOrgId:     sessionStorage.getItem('orgId'), //组织ID
          privateFileIds: [], //附件
          remindTime:     '0', //提醒时间
          tTypeId:        '', //任务类型ID
        },
        taskData: {     //会议任务人数据                
          accountsList:  [], //执行人
          isAccounts:    true,
          copyList:      [], //抄送人人
          isCopy:        true,
        },
        taskRules: {                      //表单验证
          accountsName: { required: false, message: '请选择执行人人', trigger: 'blur' },
          meetingTaskInfo: [{ required: true, message: '请填写内容', trigger: 'blur' }],
        },
        meetingForm: {
          affiliatedUsers:      [],//参会人账号
          affiliatedUsersName:  null,//参会人名字
          meetingRecorder:      [],//参会记录人账号
          meetingRecorderName:  null,//参会记录人名字
          beginTime:            null,//开始时间
          endTime:              null,//结束时间
          timeRange:            null,//时间范围
          meetingContent:       null,//会议内容
          meetingPlace:         null,//会议地点
          privateFileIds:       [],//附件
          remindTime:           '0',//提醒时间
          commentContent:       null,//评论内容
          createOrg:            sessionStorage.getItem('orgId'),
        },
        meetingRules: {                      //表单验证
          affiliatedUsersName: { required: false, message: '请选择参会人', trigger: 'blur' },
          meetingRecorderName: { required: false, message: '请选择会议记录人', trigger: 'blur' },
          meetingContent: [{ required: true, message: '请填写会议内容', trigger: 'blur' }],
          meetingPlace: [{ required: true, message: '请填写会议内容', trigger: 'blur' }],
          timeRange: [{ required: true, message: '请填写会议时间', trigger: 'blur' }],
        },
        meeting: {                        //会议人数据                
          affiliatedUsersList:  [], //会议人
          isAffiliatedUsers:    true,
          meetingRecorderList:  [], //会议记录人
          isMeetingRecorder:    true,
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        }, 
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },   
        tabActive: '2', //参会状态， 1未响应，2确认参加，3不参加  
        mathRandom: 0,
      }
     },
    computed: {
    },
    watch: {
      /*
       * 监听会议数据，然后绑定给执行人
       */
      meeting: {
        handler: function (data) {
          this.meetingForm.affiliatedUsersName = this.resolveCheckedUserData(data.affiliatedUsersList).name;
          this.meetingForm.affiliatedUsers = this.resolveCheckedUserData(data.affiliatedUsersList).accountsId;
          this.meetingForm.meetingRecorderName = this.resolveCheckedUserData(data.meetingRecorderList).name;
          this.meetingForm.meetingRecorder = this.resolveCheckedUserData(data.meetingRecorderList).accountsId;

          // ----- 当会议记录人不为null,将提示信息取消
          this.meetingForm.affiliatedUsersName ? this.meetingRules.affiliatedUsersName.required = false : '';
          this.meetingForm.meetingRecorderName ? this.meetingRules.meetingRecorderName.required = false : '';
        },
        deep: true
       },
      /*
       * 监听任务会议数据，然后绑定给执行人
       */
      taskData: {
        handler: function (data) {
          this.taskForm.accountsName = this.resolveCheckedUserData(data.accountsList).name;
          this.taskForm.accounts = this.resolveCheckedUserData(data.accountsList).accountsId;
          this.taskForm.copyName = this.resolveCheckedUserData(data.copyList).name;
          this.taskForm.copy = this.resolveCheckedUserData(data.copyList).accountsId;

          // ----- 当执行人不为null,将提示信息取消
          this.taskForm.accountsName ? this.taskRules.accountsName.required = false : '';
        },
        deep: true
       },
      /*
       * 监听截止时间状态,为false，清空截止时间
       */
      'taskForm.endTimeChecked'(data){
        !data ? '' : this.taskForm.endTime = '' 
      }
     },
    mounted() {
      // ---- 任务列表
      this.getQueryList();
      // ---- 任务类型
      this.getQueryTaskType();

      this.resourceFun();
     },
    destoryed() {
     
     },
    methods:{
      /*
       * 分解被选中的人员数据
       */
      resolveCheckedUserData(data){
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
      * 获取权限
      */
      resourceFun(){
        let self = this;
        $.each(self.resource, function(index, item){
          switch(item){
            case 23:
              self.resourceManage.isAddMember = true;
              break;
          }
        });
      },
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
        self.$request.requestAxios('get', basePath + '/m_info/list', this._getListParam(),
          function(response) {
            let responseData = response.data;
            self.listData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/m_info/list');
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
            createOrg: this.orgId,
            pageSize: this.elementPageData.pageSize,
            pageNum: this.elementPageData.pageNum,
          }
        }
       },
      /*
       * 根据党组织id获取成员
       */
      getQueryaffiliatedUsers(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_orgs/members', {params: {id: self.orgId}},
          function(response) {
            let responseData = response.data;
            // --------------- 会议人下面的人员 ----------------
            self.$set(self.meeting, "affiliatedUsersList" , self._convertAddChecked(responseData.data));

            // --------------- 会议记录人下面的人员 ----------------
            self.$set(self.meeting, "meetingRecorderList" , JSON.parse(JSON.stringify(self._convertAddChecked(responseData.data))));
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/members');
        });
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
       * @param { string }  idName 用户键名
       * @return accounts
       */
      _convertCheckedData(data, idName){
        let dataJson = {
          name: '',
          accountsId: [],
        };
        if(data) {
          $.each(data, function(index, item){
            if(item.checked){
              dataJson.name += (item.name ? item.name : item.userName ? item.userName : '') + '，';
              dataJson.accountsId.push(item[idName]);
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
       * 显示添加任务模态框
       */
      addTaskDialogVisibleFun(){
        this.addTaskDialogVisible = true;
        this.taskForm.meetingId = this.meetingId;

        // ----- 将折叠状态改为展开
        this.taskData.isAccounts = true;
        this.taskData.isCopy = true;
       },
      /*
       * 显示添加会议模态框
       */
      addMettingDialogVisibleFun(){
        this.addMettingDialogVisible = true; 
        // this.getQueryaffiliatedUsers();
        // ----- 将折叠状态改为展开
        this.meeting.isMeetingRecorder = true;
        this.meeting.isAffiliatedUsers = true;
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
              self.$request.requestAxios('post', basePath + '/m_info/add/', this._submitFormParamData(),
                function(response) {
                  let responseData = response.data;
                  self.getQueryList();
                },function(error,status) {
                  status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/m_info/add');
              });
              self._mettingResetFields();
              // --------- 关闭弹框 ----------
              self.addMettingDialogVisible = false;
            } else {
              return false;
            }
          });
          
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
       * 提交会议表单
       */
      /*
       * 提交任务表单
       */
      submitTaskForm(formName) {
        let self = this;
        if(self.taskForm.accountsName){
          self.$refs[formName].validate((valid) => {
            if (valid) {
              self.$request.requestAxios('post', basePath + '/m_info/task/add', this._submitTaskFormParamData(),
                function(response) {
                  let responseData = response.data;
                  self.$message(responseData.meta.message, 20);
                },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                                    self.$message.error('/m_info/task/add');
              });
            } else {
              return false;
            }
          });
          this._taskResetFields();
          // --------- 关闭弹框 ----------
          self.addTaskDialogVisible = false;
        }else{
          !self.taskForm.accountsName ? self.taskRules.accountsName.required = true : '';
        }
       },
      /*
       * 筛选表单数据
       */
      _submitTaskFormParamData(){
        return {
          accounts:       this.taskForm.accounts, //执行人账号
          copy:           this.taskForm.copy, //抄送人账号
          endTime:        this.taskForm.endTime ? new Date(this.taskForm.endTime).getTime() : null,//截止时间
          meetingId:      this.taskForm.meetingId, //会议ID
          meetingTaskInfo:this.taskForm.meetingTaskInfo, //会议任务内容
          partyOrgId:     sessionStorage.getItem('orgId'), //组织ID
          privateFileIds: this.taskForm.privateFileIds, //附件
          remindTime:     parseInt(this.taskForm.remindTime), //提醒时间
          tTypeId:        parseInt(this.taskForm.tTypeId), //任务类型ID
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
       * 拼接上传附件的URL地址
       */
      _convertFilesUrl(){
        return basePath + '/file/'+ this.orgId +'/uplode';
       },
      /*
       * 附件上传成功后，获取成功后的数据
       */
      handleAvatarSuccess(res, file){
        this.meetingForm.privateFileIds.push(res.data)
       },
      handleRemove(file){
        if(file.response){
          let removeItem = file.response.data;  
          this.meetingForm.privateFileIds = $.grep(this.meetingForm.privateFileIds, function(value) {
           return value != removeItem;
          });
        }
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
      /*
       * 任务附件上传成功后，获取成功后的数据
       */
      handleAvatarSuccessTask(res, file){
        this.taskForm.privateFileIds.push(res.data)
       },
      handleRemoveTask(file){
        if(file.response){
          let removeItem = file.response.data;  
          this.taskForm.privateFileIds = $.grep(this.taskForm.privateFileIds, function(value) {
           return value != removeItem;
          });
        }
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
          {fromId: id, fromType: '5', commentContent: self.meetingForm.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList();
            // ---------- 清空数据 --------
            self.meetingForm.commentContent = null; 
           
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
            let resposeData = respose.data;
            self.getQueryMeetingDetail(self.meetingId);
            // ---------- 清空数据 --------
            self.meetingForm.commentContent = null; 
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`${basePath}/m_info/affi/${self.meetingId}`)
        });
       },
      /*
       * 删除会议记录
       */
      fileDel(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._fileDel();
        }).catch(() => {
                  
        });
       },
      _fileDel(){
        let data = null;
        this.$request.requestAxios('delete', `${basePath}/m_info/${this.meetingId}/record/`, '', 
          (respose) => {// 请求成功回调函数...
            let resposeData = respose.data;
            this.getQueryMeetingDetail(this.meetingId);
            // ---------- 清空数据 --------
            this.meetingForm.commentContent = null; 
           
          }, (error, status) => {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`${basePath}/m_info/${this.meetingId}/record/`)
        });
      }, 
      /*
       * 上传会议成功后，再把数据传给数据库
       */
      handleAvatarSuccessRecord(res, file){
        let self = this, data = null;
        self.$request.requestAxios('patch', `${basePath}/m_info/${self.meetingId}/upload/${res.data}`, '', 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getQueryMeetingDetail(self.meetingId);
            // ---------- 清空数据 --------
            self.meetingForm.commentContent = null; 
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`${basePath}/m_info/${self.meetingId}/upload/${res.data}`)
        });
      },
      /*
       * 获取被选中的人员数据
       * @params {string} userType 人员类型
       * @params {object} data 被选中的人员数据
       */
      treeCheckedData(userType, data){
        // debugger
        if(userType == 'affiliatedUsers'){ // 参会人
          this.meeting.affiliatedUsersList = data;
        }else if(userType == 'meetingRecorder'){ //会议记录人
          this.meeting.meetingRecorderList = data;
        }else if(userType == 'accounts'){ //执行人
          this.taskData.accountsList = data;
        }else if(userType == 'copy'){ //抄送人
          this.taskData.copyList = data;
        }
      }
     }
  }
</script>