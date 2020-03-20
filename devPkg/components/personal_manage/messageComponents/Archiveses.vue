/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 获得性
**************************************/ 
<template> 
  <!-- 获得性 -->
  <el-card v-loading="loading" class="box-card marb20" v-if="hisToryData ? hisToryData.fromType == 4 : true">
    <div style="font-size: 25px;" slot="header" class="clearfix">
      <span>获得性</span>
    </div>
    <!-- 个人荣誉 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 1 : true">
      <h1 class="title">|| 个人荣誉 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 1; addArchivesesRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="archivesesData.archivesesData1"
        style="width: 100%">
        <el-table-column
          align="left"
          width="250px"
          label="获得荣誉日期">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.dateTime != 1 ? _convertDate(scope.row.dateTime) : ''}}
            </span>
            <el-date-picker v-else
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.dateTime) }" 
              v-model="scope.row.dateTime"
              type="date">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="获得地址">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="荣誉名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.name}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.name) }" 
            v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column 
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveArchiveses('add', scope.row); editTypeId = 1;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delArchiveses('archivesesData1', scope.row.id, scope.row, scope.$index); editTypeId = 1;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 技术职称 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 2 : true">
      <h1 class="title">|| 技术职称 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 2; addArchivesesRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="archivesesData.archivesesData2"
        style="width: 100%">
        <el-table-column
          align="left"
          width="250px"
          label="获得职称日期">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.dateTime != 1 ? _convertDate(scope.row.dateTime) : ''}}
            </span>
            <el-date-picker v-else
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.dateTime) }" 
              v-model="scope.row.dateTime"
              type="date">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="获得地址">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="技术职称">
          <template slot-scope="scope"> 
            <span v-show="hisToryData || afferentUserId">{{$util.controlTable(scope.row.name)}}</span>
            <el-select v-show="!(hisToryData || afferentUserId)"
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.name) }" v-model="scope.row.name" placeholder="请选择">
              <el-option
                v-for="item in tPostOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column 
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveArchiveses('add', scope.row); editTypeId = 2;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delArchiveses('archivesesData2', scope.row.id, scope.row, scope.$index); editTypeId = 2;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 学历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 3 : true">
      <h1 class="title">|| 学历 <i v-if="!hisToryData && !afferentUserId" @click="  editTypeId = 3; addArchivesesRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="archivesesData.archivesesData3"
        style="width: 100%">
        <el-table-column
          align="left"
          width="250px"
          label="获得学历日期">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.dateTime != 1 ? _convertDate(scope.row.dateTime) : ''}}
            </span>
            <el-date-picker v-else
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.dateTime) }" 
              v-model="scope.row.dateTime"
              type="date">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="获得地址">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="学历名称">
          <template slot-scope="scope">
            <span v-show="hisToryData || afferentUserId">{{$util.controlTable(scope.row.name)}}</span>
            <el-select v-show="!(hisToryData || afferentUserId)"
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.name) }"
              v-model="scope.row.name" placeholder="请选择">
              <el-option
                v-for="item in educationOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column 
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveArchiveses('add', scope.row); editTypeId = 3;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delArchiveses('archivesesData3', scope.row.id, scope.row, scope.$index); editTypeId = 3;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 学位 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 4 : true">
      <h1 class="title">|| 学位 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 4; addArchivesesRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="archivesesData.archivesesData4"
        style="width: 100%">
        <el-table-column
          align="left"
          width="250px"
          label="获得学位日期">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.dateTime != 1 ? _convertDate(scope.row.dateTime) : ''}}
            </span>
            <el-date-picker v-else
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.dateTime) }" 
              v-model="scope.row.dateTime"
              type="date">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="获得地址">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="学位名称">
          <template slot-scope="scope">
            <span v-show="hisToryData || afferentUserId">{{$util.controlTable(scope.row.name)}}</span>
            <el-select v-show="!(hisToryData || afferentUserId)"
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.name) }"
              v-model="scope.row.name" placeholder="请选择">
              <el-option
                v-for="item in academicDegreeOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
            
          </template>
        </el-table-column>
        <el-table-column 
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveArchiveses('add', scope.row); editTypeId = 4;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delArchiveses('archivesesData4', scope.row.id, scope.row, scope.$index); editTypeId = 4;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 执业资格证书 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 5 : true">
      <h1 class="title">|| 执业资格证书 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 5; addArchivesesRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="archivesesData.archivesesData5"
        style="width: 100%">
        <el-table-column
          align="left"
          width="250px"
          label="获得执业资格证书日期">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.dateTime != 1 ? _convertDate(scope.row.dateTime) : ''}}
            </span>
            <el-date-picker v-else
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.dateTime) }" 
              v-model="scope.row.dateTime"
              type="date">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="获得地址">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="执业资格证书名称">
          <template slot-scope="scope">
            <span v-show="hisToryData || afferentUserId">{{$util.controlTable(scope.row.name)}}</span>
            <el-select v-show="!(hisToryData || afferentUserId)"
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.name) }"
              v-model="scope.row.name" placeholder="请选择">
              <el-option
                v-for="item in practiceOptions"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column 
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveArchiveses('add', scope.row); editTypeId = 5;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delArchiveses('archivesesData5', scope.row.id, scope.row, scope.$index); editTypeId = 5;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card> 
</template>

<script>
  export default {
    props:{
      hisToryData:{ //当有表单数据时，表示是从任务哪儿发送过来的。
        required: false,
        default: null,
      },
      rosterId:{ //人员Id
        required: false,
        default: null,
      },
      mathRandom: { // 适用于花名册，查看详情
        required: false,
        default:  0,
      },
      afferentUserId:{ //父组件传入的用户Id
        required: false,
        default: null,
      }
    },
    components:{
    },
    
    data() {
      let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码长度必须是6位以上!'));
        } else {
          if (this.resetPasswordForm.confirmPassword !== '') {
            this.$refs.resetPasswordForm.validateField('confirmPassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPasswordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else if (value.length < 6) {
          callback(new Error('密码长度必须是6位以上!'));
        } else {
          callback();
        }
      };
      return {
        loading: true,
        basePath: basePath,
        userData: JSON.parse(sessionStorage.getItem('userData')),
        orgId: 1, //暂定为1，后期可能会取消
        resetPasswordForm: {
          confirmPassword:  null,
          oldPassword:      null,
          newPassword:      null,
        },
        resetPasswordFormRules: {
          oldPassword: [
            { required: true, message: '请输入旧密码'}
          ],
          newPassword: [
            { required: true, message: '请输入新密码'},
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码'},
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        form:{
          "account":        null,
          "address":        null,
          "areaCodel":      null,
          "borthday":       null,
          "desc":           null,
          "education":      null,
          "englishLevel":   null,
          "idNumber":       null,
          "maritalStatus":  null,
          "mobilNumber":    null,
          "nativeName":     null,
          "nativePlace":    null,
          "outLook":        null,
          "phoneNumber":    null,
          "picture":        null,
          "position":       null,
          "tPost":          null,
          "sex":            null,
          "userId":         0,
          "name":                     null,
          "technicalJob":             null,
          "administrationJob":        null,
        },
        sexOptions:          [],   //性别列表
        nationOptions:       [],   //民族列表
        educationOptions:    [],   //最高学历列表
        academicDegreeOptions:      [],   //学位列表
        practiceOptions:     [],   //执业资格证书
        englishLevelOptions: [],   //外语等级列表
        marriageOptions:     [],   //婚姻状态列表
        outLookOptions:      [],   //政治面貌
        tPostOptions:        [],   //技术职务
        positionOptions:     [],   //岗位
        nativePlaceOptions:  [],   //籍贯
        relationshipOptions: [],   //人际关系
        relationsData:       {     //用户的社会关系列表
          relationsData1:    []
        },
        experienceData:      {     //用户的个人学历详情列表
          experienceData1:  [],
          experienceData2:  [],
          experienceData3:  [],
          experienceData4:  [],
          experienceData5:  [],
          experienceData6:  [],
          experienceData7:  [],
        }, 
        archivesesData:      {      //用户的个人荣誉列表
          archivesesData1:  [],
          archivesesData2:  [],
          archivesesData3:  [],
          archivesesData4:  [],
          archivesesData5:  [],
        },
        typeData:{
          relations:  [1], //人际关系
          experience: [1,2,3,4,5,6,7], //工作经历，学习经历，培训经历，团组织职务经历，党政职务经历，工会组织职务经历，党组织内职务经历
          archiveses: [1,2,3,4,5], //个人荣誉，技术职务，学历，学位，执业资格证书
        },
        editTypeId:        null, //当前被操作的类型Id
        orgChlidrensimple: [],   //支部数据
        partyMemberForm: {       //新增/编辑：党员基本信息
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
        "applicationDateFormat":'yyyy-MM-dd',
        "joinPartyDateFormat":  'yyyy-MM-dd',
        "qualificationTimeFormat":'yyyy-MM-dd',
        "lostTimeFormat":'yyyy-MM-dd',
      }
    },
    watch:{
      mathRandom(data){
        if(data){
          this.form = {
          "account":        null,
          "address":        null,
          "areaCodel":      null,
          "borthday":       null,
          "desc":           null,
          "education":      null,
          "englishLevel":   null,
          "idNumber":       null,
          "maritalStatus":  null,
          "mobilNumber":    null,
          "nativeName":     null,
          "nativePlace":    null,
          "outLook":        null,
          "phoneNumber":    null,
          "picture":        null,
          "position":       null,
          "tPost":          null,
          "sex":            null,
          "userId":         0,
          "name":           null
          };
          // ----- 将用户Id赋值为父组件传入的用户Id 
          this.userData.userId = this.afferentUserId;
          this.getQueryContrast();
          this.initTableData();
          // this.getQueryOrgList();
        }
      },
    },
    mounted() { 
      this.afferentUserId ? this.userData.userId = this.afferentUserId : '';
      this.getQueryContrast();
      this.initTableData();
      // this.getQueryOrgList();
    },
    methods:{
      /*
       * 获取所有对照表分类及对照键值对
       */
      getQueryContrast(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/contrast/all_contrast_info', "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self._getQueryContrast(responseData.data);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/contrast/all_contrast_info - 失败');
        });
      },
      _getQueryContrast(data){
        let self = this;
        $.each(data, function(index, item){
          switch(item.id){
            case 1:
                self.sexOptions = item.list;
              break;
            case 2:
                self.nationOptions = item.list;
              break;
            case 3:
                self.educationOptions = item.list;
              break;
            case 4:
                self.marriageOptions = item.list;
              break;
            case 5:
                self.englishLevelOptions = item.list;
              break;
            case 6:
                self.outLookOptions = item.list;
              break;
            case 9:
                self.nativePlaceOptions = item.list;
              break;
            case 10:
                self.positionOptions = item.list;
              break;
            case 13:
                self.academicDegreeOptions = item.list;
              break;
            case 14: 
                self.relationshipOptions = item.list;
              break;
            case 15:
                self.practiceOptions = item.list;
              break;
            case 17:
                self.tPostOptions = item.list;
              break;
           
            default: 
              break;
          }
        });
      },   
      /*
      * 查询用户获得相关荣誉
      */
      getQueryArchiveses(){
        this.typeData.archiveses.forEach( (typeId) => {
          this._getQueryUserManage('/archiveses/forUser/' + this.userData.userId, 'archivesesData',typeId);
        });
        
      },
      /*
      * 添加一行用户的社会关系
      */
      addRelationRow(){
        this.relationsData['relationsData' + this.editTypeId].push({
          "otherName": null,
          "otherPosition": null,
          "owner": 1,
          "relationName": null,
          "status": 1,
          "typeId": this.editTypeId,
          'newAdd': 1,     //有此键表示新建
          'isBool': 1,  //默认第一次都为1，
        });
      },     
      /*
      * 添加一行用户获得性结果档案      
      */
      addArchivesesRow(){
        this.archivesesData['archivesesData' + this.editTypeId].push({
          "address":   null,
          "creater":   1,
          "name":      null,
          "owner":     1,
          "status":    1,
          "dateTime":      null,
          "timeFormat": 'yyyy-MM-dd',
          "typeId":    this.editTypeId,
          'newAdd':    1,     //有此键表示新建
          'isBool':    1,     //默认第一次都为1，
        });
      },
      /*
      * 添加用户的获得性结果档案
      * @params {string} type add为新增，update为编辑修改
      * @params {object} row 
      */
      saveArchiveses(type, row){
        let self = this;
        if(self._validate(row)){
          self._add('/archiveses/create/forUser/' + self.userData.userId, row, 
          function(res){
            self.getQueryArchiveses();
          })
        }
      },
      _addArchivesesParams(){
        return  {
            "address": "string",
            "creater": 0,
            "name": "string",
            "owner": 1,
            "status": 1,
            "dateTime": new Date().getTime(),
            "timeFormat": 'yyyy-MM-dd',
            "typeId": this.editTypeId
        }
      },
      /*
      * 删除指定ID的一条荣誉
      * @params {string} arrayKey 指定的数组键
      * @params {number/string} id 不为undefined时，表示不是新增的数据
      * @params {object} rowData 当前行数据
      * @params {number} index 当前行的下标
      */
      delArchiveses(arrayKey,id,rowData,index){
        let self = this;
        if(id){
          self._del('/archiveses/delete/'+ id +'/forUser/' + self.userData.userId, 
          function(){
            self.getQueryArchiveses();
          })
        }else{
          self.archivesesData[arrayKey].splice(index,1)
        }
      },
      _validate(row){
        let bool = true; //为true表示数据都不为null
        $.each(row, function(key, item) {
          if(!item){
            bool = false;
            // -- 将文本框标红
            row.isBool = 2;
          }
        });
        return bool;
      },
      /*
      * 合并查询列表数据函数
      * @params { string } url 请求地址 
      * @params { string } receiveDataName 接收数据的变量
      * @params { string/number } typeId 类型Id
      */
      _getQueryUserManage(url,receiveDataName, typeId){
        let self = this;
        self.$request.requestAxios('get', basePath + url , {params: {typeId: typeId}},
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self[receiveDataName][receiveDataName + typeId] = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
          });
      },
      /*
      * 合并添加函数
      * @params {string} url 请求地址
      * @params {object} params 请求参数
      * @params {object} success 回调函数
      */
      _add(url, params, success){
        debugger
        let self = this;
        self.$request.requestAxios('post', basePath + url, params,
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.$message.success(responseData.data);
            success(responseData);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
          });
      },
      /*
      * 合并删除函数
      * @params {string} url 请求地址
      * @params {object} success 回调函数
      */
      _del(url, successs){
        let self = this;
        self.$request.requestAxios('delete', basePath + url, "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            setTimeout(function() {
              self.$message.success(responseData.data);
              successs();
            },20)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
        });
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
      * 图片上传成功后
      */
      handleAvatarSuccess(res, file) {
        this.form.picture = res.path;
      },
      /*
      * 上传头像验证
      */
      beforeAvatarUpload(file) {
        const isJPG = file.type;
        const isLt2M = file.size / 1024 / 1024 < 100;

        if (isJPG != "image/png" && isJPG != "image/jpeg" && isJPG != "image/bmp" && isJPG != "image/jpg") {
          this.$message.error('上传头像格式.png, .jpeg, .bmp, jpg!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /*
       * 查询党员信息
       */
      getQueryPartyMemberDetail(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_member_infos/'+ this.userData.memInfoId +'/detail', "",
          function(response) { //请求成功的回调...
            self.partyMemberForm = response.data.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/'+ this.userData.memInfoId +'/detail - 失败');
        });
      },
      /*
       * 查询组织列表数据
       */
      getQueryOrgList(){
        let self = this;
        self.orgChlidrensimple = [];
        self.$request.requestAxios('get',basePath + '/party_orgs/' + self.userData.partyOrgId + '/partyorgtree', "", 
          function(response) {
            // -------- 给当前的组织树赋值 -----------
            self._getQueryOrgList(response.data.data);
          },function(error, status) {
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/' + self.userData.partyOrgId + '/partyorgtree - 失败');
        });
      },
      /*
       * 排除掉不要的数据
       */
      _getQueryOrgList(data){
        let self = this;
        self.orgChlidrensimple.push(data);
        $.each(data.childrens, function(index, item) {
          self.orgChlidrensimple.push(item);
        })
      }, 
      /*
       * 初始化表格数据,当时从历史记录页面跳转过来的就显示历史数据；否则，直接根据接口查询
       */
      initTableData(){
        let hisTory = this.hisToryData
        if(hisTory){
          let formData = JSON.parse(hisTory.formData);
          switch(hisTory.fromType){
            case '1': //基本信息
              this.form = JSON.parse(this.hisToryData.formData)
              break;
            case '7': //党员信息
              this.partyMemberForm = JSON.parse(this.hisToryData.formData)
              break;
            case '6': //关系
              this.relationsData['relationsData' + formData.typeId] = [formData];
              break;
            case '3': //经历
              this.experienceData['experienceData' + formData.typeId] = [formData];
              break;
            case '4': //获得性
              this.archivesesData['archivesesData' + formData.typeId] = [formData];
              break;
          }
          this.loading = false;
        }else{ 
          if (this.userData.memInfoId) {
            this.getQueryPartyMemberDetail();
          }
          this.getQueryArchiveses();
          this.loading = false;
        }
      },
      resetPassword(formName){
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('patch', basePath + `/hr_users/password/`, this.resetPasswordForm,
              function(response) {
                self.$message.success(response.data.meta.message);
                self.$refs[formName].resetFields();
              },
              function(error, status) {
                status == 200 ? self.$message.error(error.data.meta.message) :
                  self.$message.error(`hr_users/password/ - 失败`);
            });
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="less">
  .date-type-div{
    position: relative;
    .type{
      position: absolute;
      right: 0;
      width: 100px;
      top: 0;
    }
  }
</style>