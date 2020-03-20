/*************************************
*  create by xieyuanyuan date 2018/05/23
*  首页管理 - 组织管理 - 党员花名册
**************************************/ 
<template>
  <!-- <div> -->
    <!-- <menu-manage @orgChange="pageLocalRefresh" :subMenuIndex="2" pageTitle="党员花名册"></menu-manage> -->
    <div style="width: 100%;padding: 10px;">
      <div class="mart20">
        <el-form class="demo-form-inline" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:">
                <el-input v-model="formScreen.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号:">
                <el-input v-model="formScreen.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="失联党员:">
                <!-- <el-checkbox v-model="formScreen.lost">失联党员</el-checkbox> -->
                <el-select v-model="formScreen.lost" placeholder="请选择" class="fill-width">
                  <el-option
                    v-for="item in lostOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流动党员:">
              <!-- <el-checkbox v-model="formScreen.mobile">流动党员</el-checkbox> -->
                <el-select v-model="formScreen.mobile" placeholder="请选择" class="fill-width">
                  <el-option
                    v-for="item in mobileOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="党龄:">
                <div class="el-form-item__content">
                  <div class="input-range">
                    <input @keyup="validateNumber($event)" v-model="formScreen.minPartyAge" type="number" min="0" autocomplete="off" class="el-input__inner" /> ~
                    <input @keyup="validateNumber($event)" v-model="formScreen.macPartyAge" type="number" min="0" autocomplete="off" class="el-input__inner" />
                  </div> 
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄:">
                <div class="el-form-item__content">
                  <div class="input-range">
                    <input @keyup="validateNumber($event)" v-model="formScreen.minAge" type="number" min="0" autocomplete="off" class="el-input__inner" /> ~
                    <input @keyup="validateNumber($event)" v-model="formScreen.maxAge" type="number" min="0" autocomplete="off" class="el-input__inner" />
                  </div> 
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="button-group">
              <el-button :disabled="companyUser.length == 0" @click="addOrUploadDialogVisibleFun ('add')" size="small" type="default">新增</el-button>
              <el-button type="primary" size="small" @click="onSubmitPartyorgMembers">查询</el-button>
              <el-button @click="importPeopleDialogVisible = true" size="small" type="default">导入</el-button>
              <el-button @click="resetForm" size="small" type="default">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table 
        v-loading="isLoad"
        stripe
        border
        class="mart20"
        :data="tableData">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <!-- <el-table-column
          prop="account"
          label="账号"
          sortable
          width="140">
        </el-table-column>
        <el-table-column
          prop="name"
          sortable
          label="名字">
        </el-table-column>
        <el-table-column
          sortable
          label="申请时间"
          width="150">
          <template slot-scope="scope">
            {{_convertDate(scope.row.applicationTime)}}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="introducer"
          label="入党介绍人"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="joinPartyTime"
          label="入党时间"
          width="150">
          <template slot-scope="scope">
            {{_convertDate(scope.row.joinPartyTime)}}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="lost"
          align="center"
          label="失联">
          <template slot-scope="scope">
            {{scope.row.lost? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="mobile"
          align="center"
          label="流动党员"
          width="120">
          <template slot-scope="scope">
            {{scope.row.mobile? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="orgName"
          label="党支部名称"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="qualification_time"
          label="转正时间"
          width="150">
          <template slot-scope="scope">
            {{_convertDate(scope.row.qualification_time)}}
          </template>
        </el-table-column> -->
        <el-table-column prop="account" label="账号" sortable width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.sex) }}
          </template>
        </el-table-column>
        <el-table-column prop="nation" label="民族">
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.nation) }}
          </template>
        </el-table-column>
        <el-table-column prop="nationPlace" label="籍贯" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.nationPlace) }}
          </template>
        </el-table-column>
        <el-table-column prop="workBirthFormat" label="出生年月" width="130" show-overflow-tooltip>
          <template slot-scope="scope"> {{ $util.showDate(scope.row.borthday) }}</template>
        </el-table-column>
        <el-table-column prop="education" label="最高学位">
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.education) }}
          </template>
        </el-table-column>
        <el-table-column prop="partyJob" label="党内职务" show-overflow-tooltip>
          <template slot-scope="scope"> 
            {{ scope.row.partyJob || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="administrationJob" label="行政职务" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.administrationJob || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="tPost" label="技术职称" width="120">
          <template slot-scope="scope">
            {{$util.controlTable(scope.row.tPost)}}
          </template>
        </el-table-column>
        <el-table-column prop="partyCommitteeName" label="所属党委" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="partyBranchName" label="所属支部" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="partyGroupName" label="所属党小组" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="workBorth" label="参加工作时间" width="130" show-overflow-tooltip>
          <template slot-scope="scope"> {{ $util.showDate(scope.row.workBorth) }}</template>
        </el-table-column>
        <el-table-column prop="partyBorth" label="入党时间" width="130" show-overflow-tooltip>
          <template slot-scope="scope"> {{ $util.showDate(scope.row.partyBorth) }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-tooltip :enterable="false" content="查看" placement="top-start">
              <el-button @click="showDetailDialog(scope.row)" type="primary" size="mini"><i class="fa fa-eye"></i></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="编辑" placement="top-start">
              <el-button @click="addOrUploadDialogVisibleFun('update', scope.row)" type="default" size="mini"><i class="fa el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="删除" placement="top-start">
              <el-button @click="delClick(scope.row)" type="danger" size="mini"><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="currentPerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-footer>

      <!-- 新建花名册 -->
      <el-dialog 
        class="dialog"
        title="党员花名册"
        :visible.sync="addOrUploadDialogVisible"
        @close="rosterDialogClosed"
        width="700px">
        <div>
          <el-form class="demo-ruleForm add-task-left" ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item  label="职工:">
             <el-select v-if="dialogType != 'update'" v-model="form.userId" placeholder="请选择" class="fill-width">
                <el-option
                  v-for="item in companyUser"
                  :key="item.userId"
                  :label="item.name"
                  v-model="item.userId">
                </el-option>
              </el-select>
              <span v-else>{{ form.name }}</span>
            </el-form-item>
            <!-- <el-form-item  v-if="orgChlidrensimple.length != 0" label="所属支部:">
              <el-select v-model="form.partyOrgsId" placeholder="请选择">
                <el-option
                  v-for="item in orgChlidrensimple"
                  :key="item.id"
                  :label="item.name"
                  v-model="item.id">
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item
              v-show="partyTree && partyTree.length > 0"
              label="所属组织:">
              <el-cascader
                change-on-select
                class="fill-width"
                :options="partyTree"
                :props="{
                  children: 'childrens',
                  label: 'name',
                  value: 'id'
                }"
                v-model="form.partyOrgIds">
              </el-cascader>
            </el-form-item>
            <el-form-item label="申请时间:" prop="applicationDate.date_time">
              <el-date-picker value-format="timestamp" :type="$util.datePickerType(form.applicationDate.type)" placeholder="选择日期" v-model="form.applicationDate.date_time" class="fill-width"></el-date-picker>
              <el-select class="date-picker-after" v-model="form.applicationDate.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`申请时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="介绍者:" class="no-border" prop="introducer">
              <el-input placeholder="请输入介绍者" v-model="form.introducer"></el-input>
            </el-form-item>
            <el-form-item label="入党时间:" class="no-border" prop="joinPartyDate.date_time">
              <el-date-picker value-format="timestamp" :type="$util.datePickerType(form.joinPartyDate.type)" placeholder="选择入党时间" v-model="form.joinPartyDate.date_time" class="fill-width"></el-date-picker>
              <el-select class="date-picker-after" v-model="form.joinPartyDate.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`入党时间${index}`"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否失联:" class="no-border">
              <el-radio-group v-model="form.lost">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.lost" label="失联时间:" class="no-border" prop="lostTime">
              <el-date-picker value-format="timestamp" type="date" placeholder="选择失联时间" v-model="form.lostTime" class="fill-width"></el-date-picker>
            </el-form-item>

            <el-form-item label="是否是流动党员:" class="no-border">
              <el-radio-group v-model="form.mobile">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="转正时间:" class="no-border" prop="qualificationTime">
              <el-date-picker value-format="timestamp" :type="$util.datePickerType(form.qualificationTime.type)" placeholder="选择转正时间" v-model="form.qualificationTime.date_time" class="fill-width"></el-date-picker>
              <el-select class="date-picker-after" v-model="form.qualificationTime.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`转正时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="no-border text-right marr20">
              <el-button type="primary" @click="saveClick('form')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <!-- 人员导入 -->
      <el-dialog 
        class="dialog"
        title="导入人员"
        :visible.sync="importPeopleDialogVisible"
        width="700px">
        <div>
          <import-people importType="party" @uploadSuccess="importPeopleDialogVisible = false"></import-people>
        </div>
      </el-dialog>
      <!-- 用户详情 -->
      <el-dialog 
        class="task-detail-dialog dialog"
        title="用户详情"
        :visible.sync="detailDialogVisible"
        width="75%">
        <roster-detail :mathRandom="mathRandom" :afferentUserId="userId"></roster-detail>
      </el-dialog>
    </div>
    
  <!-- </div> -->
</template>

<script>
  // import { request } from '../../../js/utils.js'
  import $            from "jquery"
  import importPeople from "../../common/people_import/ImportPeople.vue"
  import detail from '../../personal_manage/My_Message.vue'
  export default {
    components: {
      "import-people": importPeople,
      "roster-detail": detail, // 人员详情
    },
    data() {
      return {
        isLoad: true,
        orgCode:   sessionStorage.getItem('orgCode'),
        userData: JSON.parse(sessionStorage.getItem('userData')),
        addOrUploadDialogVisible: false,    //新建或者修改花名册弹框
        dialogType:      'add',     //  add为新增，update为修改
        tableData:        [],       //花名册数据,
        companyUser:      [],       //组织下所有公司成员
        orgChlidrensimple:[],       //支部数据
        newOrupdateUrl:   null,     
        lostOptions: [              //失联状态
          {label: '是', value: 1},
          {label: '否', value: 0},
          // {label: '都不是', value: 2},
        ],
        mobileOptions: [              //失联状态
          {label: '是', value: 1},
          {label: '否', value: 0},
          // {label: '都不是', value: 2},
        ],
        form: {                   // 新增/修改花名册的筛选条件
          applicationDate:      {
            type: 1,
            date_time: null
          },
          "introducer":           null,
          joinPartyDate:        {
            type: 1,
            date_time: null
          },
          "lost":                 true,
          lostTime:               null,
          "mobile":               true,
          "partyOrgIds":          [],   // 级联的数组
          "partyOrgsId":          null, // 最终的目标数据
          qualificationTime:    {
            type: 1,
            date_time: null
          },
          "userId":               null,
        },
        formScreen: {             // 查询列表的筛选条件
          partyOrgIdList: [this.treeId],
          name:         null,
          account:      null,
          minAge:       null,
          maxAge:       null,
          minPartyAge:  null,
          macPartyAge:  null,
          lost:           0,
          mobile:         0,
        },
        rules: {      //验证信息
          userId: [
            { required: true, message: '请选择职工', trigger: 'change' },
          ],
          'applicationDate.date_time': [
            { required: true, message: '请选择申请时间', trigger: 'change' },
          ],
          introducer: [
            { required: true, message: '请输入介绍人', trigger: 'blur' }
          ],
          'joinPartyDate.date_time': [
            { required: true, message: '请选择入党时间', trigger: 'change' }
          ],
          'lostTime': [
            { required: true, message: '请选择失联时间', trigger: 'change' }
          ],
          'qualificationTime.date_time': [
            { required: true, message: '请选择转正时间', trigger: 'change' }
          ]
        },
        total:          0,
        currentPerPage: 5,
        currentPage:    1,
        partyTree:      [],

        importPeopleDialogVisible: false,
        detailDialogVisible: false, //详情弹框
        mathRandom:          0, //随机数，用来查看详情使用
        userId:              null, //当前被查看详情的用户Id
      }
    },
    props: {
      treeId: {
        type: Number,
        required: true,
      }
    },
    watch : {
      treeId: { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          if(newV){
            this.formScreen.partyOrgIdList = [newV]
            this.partyorgMembers();
            this.getCompanyUser();
            this.getQueryOrgList();
          }
        },
        deep: true
      }
    },
    mounted() {
      this.getPartyList()
      this.partyorgMembers();
      this.getCompanyUser();
      this.getQueryOrgList();
    },
    methods:{
      // pageLocalRefresh(){
      //   this.partyorgMembers();
      //   this.getCompanyUser();
      //   this.getQueryOrgList();
      // },
      /**
       * 获取党组织数据(全部)
       * @return none
       */
      getPartyList () {
        var self = this

        let config = {
          url: `${basePath}/party_orgs/partyorgstree`,
          method: 'get',
        }

        self.$request.requestAxios(config.method, config.url, null, 
          (response) => {
            let data = JSON.parse(JSON.stringify(response.data.data))
            data.forEach((item, index) => {
              this.$util.traverseTree(item)
            })
            this.partyTree = data
          },
          (error) => {
            self.$message.error(error.data.meta.message);
          }
        )
      },
      /*
      * 查询党员花名册
      */
      partyorgMembers(){
        let self = this;
        let form = JSON.parse(JSON.stringify(self.formScreen))
        form.pageNum  = self.currentPage
        form.pageSize = self.currentPerPage
        //处理数据年龄数据类型
        form.minAge      = self.formScreen.minAge ? parseInt(self.formScreen.minAge) : null
        form.maxAge      = self.formScreen.maxAge ? parseInt(self.formScreen.maxAge) : null
        form.minPartyAge = self.formScreen.minPartyAge ? parseInt(self.formScreen.minPartyAge) : null
        form.macPartyAge = self.formScreen.macPartyAge ? parseInt(self.formScreen.macPartyAge) : null
        self.isLoad = true

        self.$request.requestAxios('post', basePath + '/hr_users/userList', form,
          function(response) {
            let responseData = response.data;
            if(responseData.meta.code === 0){
              self.tableData = responseData.data.rows;
              self.total     = responseData.data.total;
            }else{
              self.$message(responseData.meta.message, 20);
            }
            self.isLoad = false;
          },function(error) {
            self.isLoad = false;
            self.$message.error("失败", 20);
        });
      },
      // _formScreenParams(){
      //   let form = new FormData();
      //   form.append('name',       this.formScreen.name);
      //   form.append('account',        this.formScreen.account);
      //   form.append('minAge',       this.formScreen.minAge);
      //   form.append('maxAge',       this.formScreen.maxAge);
      //   form.append('minPartyAge',  this.formScreen.minPartyAge);
      //   form.append('macPartyAge',  this.formScreen.macPartyAge);
      //   form.append('lost',           this.formScreen.lost);
      //   form.append('mobile',         this.formScreen.mobile);
      //   return form;
      // },
      /*
      * 点击查询按钮，查询数据
      */
      onSubmitPartyorgMembers(){
        this.partyorgMembers();
      },
      /*
      * 显示党员花名册弹框
      * @params {string} title 弹框title
      * @params {object} rowData 当前需要修改的数据
      */
      addOrUploadDialogVisibleFun(type, rowData){
        this.dialogType = type;

        this.addOrUploadDialogVisible = true;
        // ---- add 为新增，update为编辑 -----
        if(this.dialogType != 'add') {
          this.getQueryById(rowData)
        } else {
          this._initForm("add");
        }
      },
      /*
      * 查询指定ID的党员花名册
      * @param { object } rowData 当前需要修改的数据
      */
      getQueryById(rowData){
        let self = this;
        let config = {
          url: `${basePath}/party_member_infos/${rowData.infoId}/detail`,
          method: "get",
          data: null,
        }
        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            self.form = response.data.data;
            if(!self.form.applicationDate) {
              self.form.applicationDate = {
                type: 1,
                date_time: null,
              }
            }
            if(!self.form.joinPartyDate) {
              self.form.joinPartyDate = {
                type: 1,
                date_time: null,
              }
            }
            if(!self.form.qualificationTime) {
              self.form.qualificationTime = {
                type: 1,
                date_time: null,
              }
            }
            self.$nextTick(() => {
              self._initForm();
            })
          },
          (error) => {
            self.$message.error(error.data.meta.message);
          }
        )
      },
      /*
      * 新建花名册
      * @params {string} formName 表单数据名字
      */
      saveClick(formName){
        this.dialogType == 'add' ? this._saveAdd(formName) : this._updateAdd(formName);
      },
      _saveAdd(formName){
        let self = this;
        console.log(this.form.joinPartyDate < this.form.qualificationTime)
        self.$refs[formName].validate((valid) => {
          console.log
          if (valid) {
            if(this.form.qualificationTime.date_time && (this.form.joinPartyDate.date_time < this.form.qualificationTime.date_time)) {
              self.$request.requestAxios('post', basePath + `/party_member_infos/info/add/from_org/${self.orgCode}`, self._saveParams(),
                function(response) {
                  let responseData = response.data;
                  if(responseData.meta.code === 0){
                    self.partyorgMembers();
                  }else{
                    self.$message(responseData.meta.message, 20);
                  }
                },
                function(error) {
                  self.$message.error(error.data.meta.message);
              });

              self.addOrUploadDialogVisible = false;
              self._initForm();
            } else {
              self.$message.error("转正时间不能小于入党时间");
            }
          } else {
            return false;
          }
        });
      },
      _updateAdd(formName, row){
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.form.qualificationTime.date_time && (this.form.joinPartyDate.date_time < this.form.qualificationTime.date_time)) {
            self.$request.requestAxios('put', basePath + `/party_member_infos/info/update/${self.form.id}/from_org/${self.orgCode}`, self._saveParams(),
              function(response) {
                let responseData = response.data;
                if(responseData.meta.code === 0){
                  self.partyorgMembers();
                  self.$message.success(responseData.meta.message, 20);
                }else{
                  self.$message(responseData.meta.message, 20);
                }
              },
              function(error) {
                self.$message.error(error.data.meta.message);
            });
            self.addOrUploadDialogVisible = false;
            self._initForm();
            } else {
              self.$message.error("转正时间不能小于入党时间");
            }
          } else {
            return false;
          }
        });
      },
      _saveParams(){
        this.form.partyOrgsId = this.form.partyOrgIds[this.form.partyOrgIds.length - 1]
        return this.form;
      },
      /*
      * 初始化表单数据
      */
      _initForm(addFlag){
        this.$nextTick(() => {
          if(addFlag) { //新增时清空未被prop控制的数据, 并重置验证
            this.form.userId      = null
            this.form.lost        = true
            this.form.lostTime    = null
            this.form.partyOrgIds = []
            this.$refs.form.resetFields()
          } else { //编辑时仅需还原验证状态
            this.$refs.form.clearValidate()
          }
        })
      },
      /*
      * 删除一条指定ID花名册
      * @params {object} row 当前需要删除的数据
      */
      delClick(row){
        let self = this;
        self.$confirm("删除后需要重新添加", "确认删除?", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}
        ).then(() => {
          self.$request.requestAxios('delete', basePath + `/party_member_infos/info/delete/${row.infoId}/from_org/${self.orgCode}`, "",
            function(response) {
              let responseData = response.data;
              if(responseData.meta.code === 0){
                self.partyorgMembers();
              }
              self.$message.success(responseData.meta.message, 20);
            },function(error) {
              self.$message.error('失败', 20);
          });
        }).catch(() => {})
      },
      /*
      * 查询组织下所有公司成员
      */
      getCompanyUser(){
        let self = this;
        self.$request.requestAxios('get', basePath + `/party_mem_positions/${self.treeId}/company/user`, "",
          function(response) {
            let responseData = response.data;
            if(responseData.meta.code === 0){
              self.companyUser = responseData.data;
            }else{
              self.$message(responseData.meta.message, 20);
            }
          },function(error) {
            self.$message.error('失败', 20);
        });
      },
      /*
      * 查询组织列表数据
      */
      getQueryOrgList(){
        let self = this;
        self.orgChlidrensimple = [];
        self.$request.requestAxios('get',basePath + '/party_orgs/' + self.treeId + '/partyorgtree', "", 
          function(response) {
            let responseData = response.data;
            if(responseData.meta.code === 0){
              
              // -------- 给当前的组织树赋值 -----------
              self._getQueryOrgList(responseData.data);
            }else{
              self.$message.error(responseData.meta.message, 20);
            }
          },function(error) {
            self.$message.error("失败", 20);
        });
      },
      /*
      * 排除掉不要的数据
      */
      _getQueryOrgList(data){
        let self = this;
        self.orgChlidrensimple.push(data);
        $.each(data.childrens, function(index, item) {
          self.orgChlidrensimple.push(item)
        })
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月' +
               new Date(date).getDate() + '日' ;
      },
      handleCascaderChange(val){
        console.log(val)
      },
      /*
      * 禁止输入负数
      */
      validateNumber(evt){
        if(evt.keyCode == 189 || evt.keyCode == 169 || evt.keyCode == 69 || evt.keyCode == 109 || evt.keyCode == 13){
          // ---- 禁止输入
          evt.preventDefault();
          $(evt.target).val('');
        }
      },
      resetForm () {
        this.formScreen = {             // 查询列表的筛选条件
          partyOrgIdList: [this.treeId],
          name:           null,
          account:        null,
          minAge:         null,
          maxAge:         null,
          minPartyAge:    null,
          macPartyAge:    null,
          lost:           0,
          mobile:         0,
        }
      },
      rosterDialogClosed () {
        this.$nextTick(() => { //清空验证
          if(this.$refs.form){
            this.$refs.form.resetFields()
          }
        })
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.partyorgMembers()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.partyorgMembers()
      },
      compareString(a,b) {
        return a.localeCompare(b)
      },
      showDetailDialog(item){
        this.mathRandom++;
        this.userId = item.userId;
        this.detailDialogVisible = true;
      },
    }
  }
</script>

<style scoped>
  .input-range {
    display: flex;
    flex-direction: row;
  }
  .button-group {
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .el-footer {
    display: flex;
    align-items: center;
  }
</style>