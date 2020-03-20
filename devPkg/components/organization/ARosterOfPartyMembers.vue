/*************************************
*  create by xieyuanyuan date 2018/05/23
*  首页管理 - 组织管理 - 党员花名册
**************************************/ 
<template>
    <div class="content-manage">
      <div class="mart20">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="padr20" label="姓名:">
            <el-input v-model="formScreen.userName"></el-input>
          </el-form-item>
          <el-form-item class="padr20" label="账号:">
            <el-input v-model="formScreen.account"></el-input>
          </el-form-item>
          <el-form-item class="padr20" label="失联党员:">
            <!-- <el-checkbox v-model="formScreen.lost">失联党员</el-checkbox> -->
            <el-select v-model="formScreen.lost" placeholder="请选择">
              <el-option
                v-for="item in lostOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="padr20" label="流动党员:">
            <!-- <el-checkbox v-model="formScreen.mobile">流动党员</el-checkbox> -->
            <el-select v-model="formScreen.mobile" placeholder="请选择">
              <el-option
                v-for="item in mobileOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <br/>
          <el-form-item label="党龄:">
            <div class="el-form-item__content">
              <div class="el-input">
                <input style="width: 50%; display: inline-block;" @keyup="validateNumber($event)" v-model="formScreen.smallPartyAge" type="number" min="0" autocomplete="off" class="el-input__inner" />
                <span>~</span>
                <input style="width: calc(50% - 22px); display: inline-block;" @keyup="validateNumber($event)" v-model="formScreen.largePartyAge" type="number" min="0" autocomplete="off" class="el-input__inner" />
              </div> 
            </div>
          </el-form-item>
          <el-form-item label="年龄:">
            <div class="el-form-item__content">
              <div class="el-input">
                <input style="width: 50%; display: inline-block;" @keyup="validateNumber($event)" v-model="formScreen.smallAge" type="number" min="0" autocomplete="off" class="el-input__inner" />
                <span>~</span>
                <input style="width: calc(50% - 22px); display: inline-block;" @keyup="validateNumber($event)" v-model="formScreen.largeAge" type="number" min="0" autocomplete="off" class="el-input__inner" />
              </div> 
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmitPartyorgMembers">查询</el-button>
          </el-form-item>
          <el-form-item class="padl20">
            <!-- 满足公司成员个数不为0，并且有此权限，才能操作此按钮 -->
            <el-button :disabled="!(companyUser.length != 0 && resourceManage.isAddMember)" 
              :title="!(companyUser.length != 0 && resourceManage.isAddMember) ? 
                     '满足公司成员个数不为0，并且有此权限，才能操作此按钮' : ''" 
              @click="addOrUploadDialogVisibleFun ('add')" 
              size="small" type="primary">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table 
        v-loading="isLoad"
        class="mart20"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="account"
          label="账号"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名字">
        </el-table-column>
        <el-table-column
          label="申请时间">
          <template slot-scope="scope">
            {{_convertDate(scope.row.applicationTime)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="introducer"
          label="介绍者">
        </el-table-column>
        <el-table-column
          prop="joinPartyTime"
          label="入党时间">
          <template slot-scope="scope">
            {{_convertDate(scope.row.joinPartyTime)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否失联">
          <template slot-scope="scope">
            {{scope.row.lost? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否是流动党员">
          <template slot-scope="scope">
            {{scope.row.mobile? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="组织名称">
        </el-table-column>
        <el-table-column
          prop="qualification_time"
          label="转正时间">
          <template slot-scope="scope">
            {{_convertDate(scope.row.qualification_time)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180px">
          <template slot-scope="scope">
            <el-button 
              :disabled="!resourceManage.isUpdateMember" 
              :title="!resourceManage.isUpdateMember ? '无权限': ''" 
              @click="addOrUploadDialogVisibleFun ('update', scope.row)" 
              type="primary" size="mini">编辑</el-button>

            <el-button :disabled="!resourceManage.isDeleteMember" 
              :title="!resourceManage.isDeleteMember ? '无权限': ''" 
              @click="delClick(scope.row)" 
              type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新建花名册 -->
      <el-dialog 
        class="dialog"
        :title="dialogType=='add'? '新建花名册' : '编辑花名册'"
        :visible.sync="addOrUploadDialogVisible"
        width="700px">
        <div>
          <el-form class="demo-ruleForm add-task-left" ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item v-if="dialogType != 'update'" label="职工:">
             <el-select v-model="form.userId" placeholder="请选择">
              <el-option
                v-for="item in companyUser"
                :key="item.userId"
                :label="item.name"
                v-model="item.userId">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item  v-if="orgChlidrensimple.length != 0" label="所属支部:">
              <el-select v-model="form.partyOrgsId" placeholder="请选择">
                <el-option
                  v-for="item in orgChlidrensimple"
                  :key="item.id"
                  :label="item.name"
                  v-model="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请时间:" prop="applicationDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.applicationDate" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item label="介绍者:" class="no-border" prop="introducer">
              <el-input placeholder="请输入介绍者" v-model="form.introducer"></el-input>
            </el-form-item>
            <el-form-item label="入党时间:" class="no-border" prop="joinPartyDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.joinPartyDate" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否失联:" class="no-border">
              <el-radio-group v-model="form.lost">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="form.lost" label="失联时间:" class="no-border" prop="lostTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.lostTime" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item v-else label="失联时间:" class="no-border no-required">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.lostTime" style="width: 100%"></el-date-picker>
            </el-form-item>

            <el-form-item label="是否是流动党员:" class="no-border">
              <el-radio-group v-model="form.mobile">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="转正时间:" class="no-border" prop="qualificationTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.qualificationTime" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item class="no-border text-right marr20">
              <el-button type="primary" @click="saveClick('form')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        resource: JSON.parse(sessionStorage.getItem('resource')),
        resourceManage: {      //权限管理, 为false按钮不能操作
          isAddMember:    false,      
          isUpdateMember: false,
          isDeleteMember: false,
        }, 
        isLoad: true,
        orgId: sessionStorage.getItem('orgId'),  
        orgCode: sessionStorage.getItem('orgCode'),  
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
          {label: '请选择', value: 2},
        ],
        mobileOptions: [              //失联状态
          {label: '是', value: 1},
          {label: '否', value: 0},
          {label: '请选择', value: 2},
        ],
        form: {                   // 新增/修改花名册的筛选条件
          "applicationDate":      null,
          "introducer":           null,
          "joinPartyDate":        null,
          "lost":                 true,
          "lostTime":             null,
          "mobile":               true,
          "partyOrgsId":          null,
          "qualificationTime":    null,
          "userId":               null,
        },
        formScreen: {             // 查询列表的筛选条件
          orgId:          sessionStorage.getItem('orgId'),
          userName:       null,
          account:        null,
          smallAge:       null,
          largeAge:       null,
          smallPartyAge:  null,
          largePartyAge:  null,
          lost:           2,
          mobile:         2,
        },
        rules: {      //验证信息
          applicationDate: [
            { required: true, message: '请选择申请时间', trigger: 'change' },
          ],
          introducer: [
            { required: true, message: '请输入介绍人', trigger: 'blur' }
          ],
          joinPartyDate: [
            { required: true, message: '请选择入党时间' ,}
          ],
          lostTime: [
            {required: true, message: '请选择失联时间',}
          ],
          qualificationTime: [
            {required: true, message: '请选择转正时间', }
          ]
        }
      }
    },
    mounted() {
      // ---- 获取权限 ----
      this.resourceFun();

      this.partyorgMembers();
      this.getCompanyUser();
      this.getQueryOrgList();
    },
    methods:{
      /*
      * 查询党员花名册
      */
      partyorgMembers(){
        let self = this;
        self.$request.requestAxios('post', basePath + '/party_member_infos/all/formore', self.formScreen,
          function(response) {
            let responseData = response.data;
            self.tableData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/all/formore');
            self.isLoad = false;
        });
      },
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
        console.log(this.dialogType)
        this.addOrUploadDialogVisible = true;
        // ---- add 为新增，update为编辑 -----
        this.dialogType == 'add' ? this._initForm() : this.getQueryById(rowData);
      },
      /*
      * 查询指定ID的党员花名册
      * @param { object } rowData 当前需要修改的数据
      */
      getQueryById(rowData){
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_member_infos/'+ rowData.partyInfoId +'/detail', "",
          function(response) {
            let responseData = response.data;
            self.form = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/'+ rowData.partyInfoId +'/detail');
        });
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
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('post', basePath + '/party_member_infos/info/add/from_org/' + self.orgCode , self._saveParams(),
              function(response) {
                let responseData = response.data;
                self.partyorgMembers();
              },function(error, status) {// 请求失败回调函数...
                status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/info/add/from_org/');
            });
            self.addOrUploadDialogVisible = false;
            self._initForm();
          } else {
            return false;
          }
        });
      },
      _updateAdd(formName, row){
        let self = this;
        console.log(self.form)
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('put', basePath + '/party_member_infos/info/update/'+ self.form.id +'/from_org/'+ self.orgCode, self._saveParams(),
              function(response) {
                let responseData = response.data;
                self.partyorgMembers();
              },function(error, status) {// 请求失败回调函数...
                    status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/info/update/'+ self.form.id +'/from_org/'+ self.orgCode);
            });
            self.addOrUploadDialogVisible = false;
            self._initForm();
          } else {
            return false;
          }
        });
      },
      _saveParams(){
        this.form.applicationDate = new Date(this.form.applicationDate).getTime();
        this.form.joinPartyDate = new Date(this.form.joinPartyDate).getTime();
        this.form.lostTime = this.form.lostTime ? new Date(this.form.lostTime).getTime() : '';
        this.form.qualificationTime = new Date(this.form.qualificationTime).getTime();
        this.form.partyOrgsId = this.orgChlidrensimple.length == 0 ? this.orgId : this.form.partyOrgsId;
        return this.form;
      },
      /*
      * 初始化表单数据
      */
      _initForm(){
       this.form = {
          "applicationDate":      null,
          "introducer":           null,
          "joinPartyDate":        null,
          "lost":                 true,
          "lostTime":             null,
          "mobile":               true,
          "partyOrgsId":          null,
          "qualificationTime":    null,
          "userId":               null,
        }
      },
      /*
      * 删除一条指定ID花名册
      * @params {object} row 当前需要删除的数据
      */
      delClick(row){
        let self = this;
        self.$request.requestAxios('delete', basePath + '/party_member_infos/info/delete/'+ row.partyInfoId +'/from_org/'+ self.orgCode, "",
          function(response) {
            self.partyorgMembers();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/info/delete/'+ row.partyInfoId +'/from_org/'+ self.orgCode);
        });
      },
      /*
      * 查询组织下所有公司成员
      */
      getCompanyUser(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_mem_positions/'+ self.orgId +'/company/user', "",
          function(response) {
            let responseData = response.data;
            self.companyUser = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_mem_positions/'+ self.orgId +'/company/user');
        });
      },
      /*
      * 查询组织列表数据
      */
      getQueryOrgList(){
        let self = this;
        self.orgChlidrensimple = [];
        self.$request.requestAxios('get',basePath + '/party_orgs/' + self.orgId + '/partyorgtree', "", 
          function(response) {
            let responseData = response.data;
            // -------- 给当前的组织树赋值 -----------
            self._getQueryOrgList(responseData.data);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/' + self.orgId + '/partyorgtree - 失败');
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
          console.log(evt.keyCode)
          // ---- 禁止输入
          evt.preventDefault();  
          $(evt.target).val('');
        }
      },
      /*
      * 获取权限
      */
      resourceFun(){
        let self = this;
        $.each(self.resource, function(index, item){
          switch(item){
            case 9:
              self.resourceManage.isAddMember = true;
              break;
            case 14:
              self.resourceManage.isUpdateMember = true;
              break;
            case 15:
              self.resourceManage.isDeleteMember = true;
              break; 
          }
        });
      },
    }
  }
</script>