/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 我的任务
**************************************/ 
/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务列表
**************************************/ 
<template>
  <div class="content-manage personal-top"> 
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
        <!-- <div class="fr add-btn-manage"><i @click="addTaskDialogVisibleFun" class="el-icon-circle-plus-outline"></i></div> -->
      </div>
      <!-- 列表内容 -->
      <div class="content-wrapper-manage content-wrapper-manage_task">
        <div class="content-wrapper-innter">
          <div class="task-list" v-for="(item, index) in listData.rows" :key="index">  
            <el-row class="title-message row">
              <el-col :span="12" class="title col-xs-6">
                <span class="" @click="detailDialogFun(item.id)" :title="item.content">{{item.taskType}}：{{item.content}}</span>
              </el-col>
              <el-col :span="6" class="position text-center" :title="item.assignee">{{item.assignee}}</el-col>
              <el-col :span="6" class="date fr">{{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}</el-col>
            </el-row>
            <el-row >
              <el-col :span="18" class="end-date">截止时间：{{$util._convertDate(item.endTime, 'yyyy年MM月dd日 hh:mm:ss')}}</el-col>
              <el-col v-if="activeName == 1" :span="6" class="text-right">
                <el-button 
                  @click="showTreeDialog(item)" 
                  type="primary" size="small">转交</el-button>
              </el-col>
              <!-- 自己发出的任务并且任务状态时间没有过期的情况 -->
              <el-col v-if="activeName == 'creator' && item.status == 1" :span="6" class="text-right">
                <el-button 
                  @click="returnTaskDialog(item)" 
                  type="primary" size="small">退回</el-button>
              </el-col>
            </el-row> 
            <p class="message-num">
              <span><img class="marr5" src="../../images/ifor_icon.png">{{item.reviewVo.total}}</span>
              <span class="marl20" v-if="item.allTask != 0">
                <img class="marr5" src="../../images/org_user_icon.png">{{item.finishs}}/{{item.allTask}}已完成
              </span>
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

      <!-- 任务详情 -->
      <task-detail :activeStatus="activeName" :detailId="singleTaskId" @closeDialog="closeDialogFun" :mathRandom="mathRandom" type="personal"></task-detail>
      <!-- 人员树 -->
      <el-dialog 
        class="dialog"
        title="转交给"
        :visible.sync="isTreeDialog"
        width="500px"> 
        <tree-selected 
          :mathRandom="treeMathRandom" 
          pageType="personal" 
          isEditPage="0" 
          :paramsData="treeParamsData" 
          isCheckbox="1"
          @treeValData="treeValDataFun"> 
        </tree-selected>
        <div class="text-center">
          <el-button @click="saveTree" type="primary" size="small">保存</el-button>
        </div>
      </el-dialog>
      <!-- 退回 -->
      <el-dialog 
        class="dialog"
        title="退回原因"
        :visible.sync="isReturnTaskDialog"
        width="500px"> 
        <el-form ref="returnTaskFrom" :model="returnTaskFrom"> 
          <el-form-item  
            prop="formData"
            :rules="[{ required: true, message: '退回原因不能为空', trigger: 'blur' },]">
            <el-input placeholder="请填写退回原因" type="textarea" v-model="returnTaskFrom.formData"></el-input>
          </el-form-item> 
        </el-form>
        <div class="text-right">
          <el-button @click="submitResultTask('returnTaskFrom')" type="primary" size="small">退回</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import Detail from '../task_manage/detail/Detail.vue'
  import Query_Tree_Selected  from '../task_manage/detail/Query_Tree_Selected.vue'
  export default {
    components:{
      "task-detail": Detail, // 头部固定内容
      "tree-selected": Query_Tree_Selected, // 头部固定内容
    },
    data() {
      return {
        isTreeDialog:            false,
        isReturnTaskDialog:      false,
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        basePath: basePath, 
        addTaskDialogVisible:    false, //新建任务模态框显示属性
        mathRandom:              0,     //随机数，用来查看详情使用
        treeMathRandom:          0,
        singleTaskId:            null,  //单个任务ID
        isAccountOrg:            true,  //执行人下面的所有数据，为true显示
        isCopyAccountOrg:        false, //抄送人下面的所有数据，为true显示 
        form: {                         //表单数据
          accountName:    null,       //执行人
          copyAccountName:null,       //抄送人
          copy:           null,       //抄送人ID
          endTime:        null,       //截止时间
          endTimeChecked: false,      //为true截止时间不能选择，
          formData:       null,       //内容
          partyCode:      null,       //执行人的支部
          userAccount:    null,       //执行人的人员
          companyCode:    null,       //执行人的职能部门
          remindTime:     '2',        //提醒时间
          privateFileIds: [] ,        //附件
          // assignee: sessionStorage.getItem('orgId'),
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
          isPartyorgChidrensTwo: false,
          isPartyrogMembers: false,
        },
        copyPerson: {                     //抄送人
          partyrogMembers: [],
          isPartyrogMembers: true
        },
        treeParamsData:{ //查询人员树需要的参数
          processId: null,
          value: null,
          valueId: null,
          requestUrl: '/party_member_infos/partyorgtree',
          checkboxType: false,
          title:    '人员组织树',
        },
        returnTaskFrom: {  //退回任务表单
          formData:   null,
          instanceId: null,
          taskId:     null,
        }
       
      }
    },
    computed:{
      bubbleStatusChange(){
        return this.$store.state.bubbleStatus;
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
          this.form.accountName = this._convertCheckedData(data.partyorgChidrens[0]).name
                             + this._convertCheckedData(data.partyorgChidrens[1]).name
                             + this._convertCheckedData(data.partyrogMembers).name;

          this.form.companyCode = this._convertCheckedData(data.partyorgChidrens[0]).accountsId;                   
          this.form.partyCode = this._convertCheckedData(data.partyorgChidrens[1]).accountsId;
          this.form.userAccount = this._convertCheckedData(data.partyrogMembers).accountsId;
          // ----- 当执行人不为null,将提示信息取消
          if(this.form.accountName){
            this.rules.accountName.required = false;
          }
        },
        deep: true
      },
      /*
      * 监听支部数据，然后绑定给抄送人
      */
      copyPerson: {
        handler: function (data) {
          this.form.copyAccountName = this._convertCheckedData(data.partyrogMembers).name;  
          this.form.copy = this._convertCheckedData(data.partyrogMembers).accountsId;          
        },
        deep: true
      },
      'form.endTimeChecked'(data){
        !data ? this.form.endTime = this.form.endTime : this.form.endTime = '' 
      }

    },
    mounted() {
      let self = this;
      this.getQueryTaskList();
    },
    destoryed() {
       
    },
    methods:{
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
        let self = this;
        self.$request.requestAxios('get', basePath + '/t_tasks/list', this._getTaskListParam(),
          function(response) {
            let responseData = response.data;
            self.listData = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/list');
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
        self.$request.requestAxios('get', basePath + '/party_orgs/members', {params: {id: self.orgId, function: 1}},
          function(response) {
            let responseData = response.data;
            // --------------- 执行人下面的人员 ----------------
            self.$set(self.executor, "partyrogMembers" , self._convertAddChecked(responseData.data));

            // --------------- 抄送人下面的人员 ----------------
            self.$set(self.copyPerson, "partyrogMembers" , JSON.parse(JSON.stringify(self._convertAddChecked(responseData.data))));
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/chidrens');
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
      getQueryTaskDetail(data){
        let self = this;
        self.$request.requestAxios('get', basePath + '/t_tasks/detail/' + data.id, "",
          function(response) {
            let responseData = response.data;
            self.$set(self, 'singleTaskDetail', responseData.data)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/detail');
        });
        // ----- 查询任务回复 -----
        self.getCommentList(data.id);
      },
      /*
      * 显示添加任务模态框
      */
      addTaskDialogVisibleFun(){
        this.addTaskDialogVisible = true;

        // --------- 非职能部门 ----------
        this.getQueryPartyrogChildrens(0);
        // --------- 职能部门 ------------
        this.getQueryPartyrogChildrens(1);

        this.getQueryPartyrogMembers();
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
        if(self.form.accountName){
          self.$refs[formName].validate((valid) => {
            if (valid) {
              self.$request.requestAxios('post', basePath + '/t_tasks/add', this._submitFormParamData(),
                function(response) {
                  let responseData = response.data;
                  self.getQueryTaskList();
                  self.form.formData = null;
                },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/add');
              });
            } else {
              console.log('提交失败');
              return false;
            }
          });
          
          // --------- 关闭弹框 ----------
          self.addTaskDialogVisible = false;
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
      * 拼接上传附件的URL地址
      */
      _convertFilesUrl(){
        return basePath + 'file/'+ this.orgCode +'/uplode';
      },
      /*
      * 附件上传成功后，获取成功后的数据
      */
      handleAvatarSuccess(res, file){
        this.form.privateFileIds.push(res.data)
      },
      handleRemove(file){
        let removeItem = file.response.data;  
        this.form.privateFileIds = $.grep(this.form.privateFileIds, function(value) {
         return value != removeItem;
        });
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
      * 评论列表
      */
      getCommentList(id) {
        let self = this, data = null;
        self.$set(self, 'commentList', [])
        self.$request.requestAxios('get', basePath + '/a_reviewes/list', {params: {status: 2, fromId: id, fromType: '2'}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.$set(self, 'commentList', resposeData.data.rows);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败', 20)
        });
      },
      /*
      * 回复
      */
      replyAdd(id) {
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/a_reviewes/review', 
          {fromId: id, fromType: '2', commentContent: self.form.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList(id);
            // ---------- 清空数据 --------
            self.form.commentContent = null; 

          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review - 失败')
        });
      },
      /*
       * 弹框关闭时，刷新列表数据,
       * 用途：在详情里面有的任务已经完成，那么在未完成任务里面将不再显示，
       */
      closeDialogFun(){
        this.getQueryTaskList();
      },
      /*
       * 显示树形弹框
       */
      showTreeDialog(item){ 
        this.treeMathRandom += 1;  
        this.treeParamsData.value = null; 
        this.treeParamsData.processId = item.taskVoList[0].processTaskId ; 
        this.isTreeDialog = true;
      },
      /*
       * 转交任务
       */
      saveTree() { 
        let self = this;
        self.$request.requestAxios('post', `${basePath}/t_tasks/turn/${this.treeParamsData.processId}?userId=${this.treeParamsData.valueId}`, '', 
          function(respose) {// 请求成功回调函数...
            self.getQueryTaskList();
            self.$message.success('转交成功');
            self.isTreeDialog = false;
          },function(error, status) {// 请求失败回调函数...
            self.isTreeDialog = false;
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败', 20);
        });
      },
      returnTaskDialog(item){
        this.returnTaskFrom.taskId = item.instanceId;
        this.returnTaskFrom.instanceId = item.id;
        this.returnTaskFrom.formData = null;
        this.isReturnTaskDialog = true;
      },
      submitResultTask(formName){ 
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('delete', `${basePath}/t_tasks/delete`, {data: this.returnTaskFrom}, 
              (respose) => {// 请求成功回调函数...
                this.getQueryTaskList(); 
                this.isReturnTaskDialog = false;
                this.$message.success(respose.data.meta.message)
              }, (error, status) => {// 请求失败回调函数...
                this.isReturnTaskDialog = false;
                status == 200 ? this.$message.error(error.data.meta.message) :
                                this.$message.error('/t_tasks/delete - 失败', 20);
            }); 
          } else { 
            return false;
          }
        });
      },
      /*
       * 获取树结构的值
       */
      treeValDataFun(val){ 
        // ---- 存储在数据库中的数据Id
        this.treeParamsData.valueId = val.id;
      }
    }
  }
</script>