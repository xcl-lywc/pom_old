/*********************党组织简介***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-31
/************************************************/
<template>
  <div id="intro" class="orgmanage">
    <div v-if="partyForm">
      <div v-loading="loading" class="form-wrap">
        <table style="width: 100%" class="thead intro-table">
          <tbody>
            <tr>
              <td class="marl20">党组织名称：</td>
              <td class="marl20">{{partyForm.name ? partyForm.name : '无'}}</td>
            </tr>
            <tr>
              <td class="marl20">党组织头像：</td>
              <td class="marl20">{{partyForm.headImg ? '' : '无'}}
                <img width="200px" v-if="partyForm.headImg" :src="partyForm.headImg" class="avatar-img">
              </td>
            </tr>
            <tr>
              <td class="marl20">成立时间：</td>
              <td class="marl20">{{$util._convertDate(partyForm.createrOrgTime ? partyForm.createrOrgTime.date_time : partyForm.createrOrgTime, 'yyyy年MM月dd日')}}</td>
            </tr>
            <tr>
              <td class="marl20">党组织描述：</td>
              <td class="marl20">{{partyForm.description ? partyForm.description : '无'}}</td>
            </tr>
            <tr>
              <td class="marl20">地址：</td>
              <td class="marl20">{{partyForm.address ? partyForm.address : '无'}}</td>
            </tr>
            <tr>
              <td class="marl20">邮箱：</td>
              <td class="marl20">{{partyForm.email ? partyForm.email : '无'}}</td>
            </tr>
            <tr>
              <td class="marl20">电话：</td>
              <td class="marl20">{{partyForm.phoneNum ? partyForm.phoneNum : '无'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 人际关系 -->
      <div style="display: none;" class="personal-wrapper">
        <h1 class="title">|| 人际关系 <i @click="addRelationRow" class="el-icon-circle-plus"></i></h1>
        <el-table
          :data="relationsData"
          style="width: 100%">
          <el-table-column
            align="left"
            label="姓名">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.otherName}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.otherName) }" 
              v-model="scope.row.otherName"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="职业">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.otherPosition}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.otherPosition) }" 
              v-model="scope.row.otherPosition"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="关系">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.relationName}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.relationName) }" 
              v-model="scope.row.relationName"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="100px"
            label="操作">
            <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveRelationship('add', scope.row)" type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="delRelationship(scope.row.id, scope.row, scope.$index)" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
            
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 学历详情 -->
      <div style="display: none;" class="personal-wrapper">
        <h1 class="title">|| 学历详情 <i @click="addExperienceRow" class="el-icon-circle-plus"></i></h1>
        <el-table
          :data="experienceData"
          style="width: 100%">
          <el-table-column
            align="left"
            width="400px"
            label="开始结束时间">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">
                {{scope.row.beginTime != 1 ? $util._convertDate(scope.row.beginTime, 'yyyy年MM月dd日') : ''}} - {{scope.row.beginTime != 1 ? $util._convertDate(scope.row.endTime, 'yyyy年MM月dd日') : ''}}
              </span>
              <el-date-picker v-else
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.experienceBETime) }" 
                v-model="scope.row.experienceBETime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="学校名">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
              v-model="scope.row.address"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="学历">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
              v-model="scope.row.position"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="100px"
            label="操作">
            <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row)" title="保存" type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="delExperience(scope.row.id, scope.row, scope.$index)" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 个人荣誉 -->
      <div style="display: none;" class="personal-wrapper">
        <h1 class="title">|| 个人荣誉 <i @click="addArchivesesRow" class="el-icon-circle-plus"></i></h1>
        <el-table
          :data="archivesesData"
          style="width: 100%">
          <el-table-column
            align="left"
            width="250px"
            label="得奖日期">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">
                {{scope.row.time != 1 ? $util._convertDate(scope.row.time, 'yyyy年MM月dd日') : ''}}
              </span>
              <el-date-picker v-else
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.time) }" 
                v-model="scope.row.time"
                type="date">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="获奖地址">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
              v-model="scope.row.address"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="奖项名字">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.name}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.name) }" 
              v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column 
            width="100px"
            label="">
            <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveArchiveses('add', scope.row)" title="保存" type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="delArchiveses(scope.row.id, scope.row, scope.$index)" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      var checkTime = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请选择时间区间'));
        } else {
          if(value > new Date().getTime()) {
            callback(new Error('时间必须选当前时间之前'));
          } else {
            callback()
          }
        } 
      }
      return {
        loading:    false,
        orgId:      sessionStorage.getItem("orgId"),
        userData:   JSON.parse(sessionStorage.getItem('userData')),
        imgServer:  `${basePath}/sys/ueditor/file?action=uploadimage`,
        token:      { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("token"))}`},
        partyForm:  {},
        rules: {
          name: [
            { required: true, message: '请输入党组织名称', trigger: 'blur' }
          ],
          createrOrgTime: [
            { validator: checkTime, trigger: 'blur' },
            { validator: checkTime, trigger: 'change' },
            { required: true, message: '请选择成立时间', trigger: 'blur' }
          ]
        },
        focusStatus: false,       //打开对话框后, 开始输入地址的状态,在此状态下动态根据address更新latitude
        relationsData:       [],    //用户的社会关系列表
        experienceData:      [],    //用户的个人学历详情列表
        archivesesData:      [],    //用户的个人荣誉列表
      }
    },
    props: {
      treeId: {
        required: true,
      }
    },
    watch: {
      "partyForm.address": {
        handler (newV, oldV) {
          if(this.focusStatus) { // 当input聚焦时开启动态验证, 否则不进行验证
            this.checkAddress()
          }
        },
        deep: true
      },
      "treeId": { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          this.getDetail()
        },
        deep: true
      }
    },
    created () {

    },
    mounted () {
      this.getDetail();
    },
    
    methods: {
      /**
       * 根据treeId 查询详情
       * @return {[type]} [description]
       */
      getDetail () {
        let self = this

        self.loading     = true
        self.focusStatus = false

        self.axios({
          url:    `${basePath}/party_orgs/${self.treeId}/partyorg`,
          method: "get"
        }).then((response) => {
          self.partyForm = response.data.data
          self.loading = false
        }).catch((error) =>{
          self.loading = false
          self.$message.error(error)
        })
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集)
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this
        
        let config = {
          url:    `${basePath}/party_orgs/partyorg/update/${self.partyForm.id}/from_org/${self.treeId}`,
          method: "patch",
          data:   self.partyForm
        }

        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.loading = true
            self.axios(config).then(() => {
              self.$message.success("成功")

              //重新查询
              self.$nextTick(() => {
                if(self.$refs.partyForm){
                  self.$refs.partyForm.clearValidate();
                }
              })
              self.loading = false
              self.focusStatus = false
              self.getDetail()
              self.$emit("treeChanged")
            }).catch((error) =>{
              self.loading = false
              self.$message.error(error)
            })
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        })
      },
      /**
       * 上传成功, 写入img对应的path
       * @param  {[type]} response [description]
       * @param  {[type]} file     [description]
       * @param  {[type]} fileList [description]
       * @return none
       */
      uploadSuccess (response, file, fileList) {
        this.partyForm.headImg = response.data.path
      },
      /**
       * 地址校验, 根据输入的内容校验经纬度字段
       * @return {[type]} [description]
       */
      checkAddress () {
        if(this.partyForm.address) {
          this.mapLocation(this.partyForm.address)
        } else {
          this.partyForm.latitude  = null
          this.partyForm.longitude = null
          this.$refs.partyForm.validateField("latitude")
        }
      },
      /**
       * 根据输入的地址返回经纬度, 并记录到表单对象中
       * @return none
       */
      mapLocation (address) {
        let self = this
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 调用查询(异步)
        myGeo.getPoint(address, function(point){
          if (point) {
            self.partyForm.latitude  = point.lat
            self.partyForm.longitude = point.lng
            self.$refs.partyForm.validateField("latitude")
          }else{
            self.partyForm.latitude  = null
            self.partyForm.longitude = null
            self.$refs.partyForm.validateField("latitude")
          }
        }, "");
      },
      /*
      * 查询用户人际关系
      */
      getQueryRelationship(){
        this._getQueryUserManage('/relations/forType/forUser/' + this.orgId + '_' + this.userData.userId, 'relationsData');
      },
      /*
      * 查询用户相关经历
      */
      getQueryExperience(){
        this._getQueryUserManage('/experience/forType/forUser/' + this.orgId + '_' + this.userData.userId, 'experienceData');
      },
      /*
      * 查询用户获得相关荣誉
      */
      getQueryArchiveses(){
        this._getQueryUserManage('/archiveses/forType/forUser/' + this.orgId + '_' + this.userData.userId, 'archivesesData');
      },
      /*
      * 添加一行用户的社会关系
      */
      addRelationRow(){
        this.relationsData.push({
          "otherName": null,
          "otherPosition": null,
          "owner": 1,
          "relationName": null,
          "status": 1,
          "typeId": 1,
          'newAdd': 1,     //有此键表示新建
          'isBool': 1,  //默认第一次都为1，
        });
      },
      /*
      * 添加用户的社会关系
      * @params {string} type add为新增，update为编辑修改
      * @params {object} row 
      */
      saveRelationship(type, row){
        let self = this;
        if(self._validate(row)){
          // debugger
          self._add('/relations/create/forUser/' + this.orgId + '_' + this.userData.userId,  row, 
          function(res){
            self.getQueryRelationship();

          })
        }
        
      },
      _addRelationshipParams(){
        return {
          "otherName": "张三",
          "otherPosition": "开发",
          "owner": 1,
          "relationName": "父女",
          "status": 1,
          "typeId": 1
        }
      },
      
      /*
      * 删除指定ID的一条人际关系
      * @params {number/string} id 不为undefined时，表示不是新增的数据
      * @params {object} rowData 当前行数据
      * @params {number} index 当前行的下标
      */
      delRelationship(id,rowData,index){
        let self = this;
        if(id){
          self._del('/relations/delete/'+ id +'/forUser/' + self.orgId + '_' + self.userData.userId, 
          function(){
            self.getQueryRelationship();
          })
        }else{
          self.relationsData.splice(index,1)
        }
      },
      /*
      * 添加一行用户相关经历      
      */
      addExperienceRow(){
        this.experienceData.push({
          "address":   null,
          "beginTime": 1,     //默认为1，保存后将数据设置为真实的时间
          "endTime":   1,     //默认为1，保存后将数据设置为真实的时间
          'experienceBETime': null,
          "owner":     1,
          "position":  null,
          "status":    1,
          "typeId":    1,
          'newAdd':    1,     //有此键表示新建
          'isBool':    1,     //默认第一次都为1，
        });
      },
      /*
      * 添加用户相关经历
      * @params {string} type add为新增，update为编辑修改
      * @params {object} row 
      */
      saveExperience(type,row){
        let self = this;
        if(self._validate(row)){
          // -------------------------- 给开始结束时间赋值 ----------------------------
          row.beginTime = row.experienceBETime[0], row.endTime = row.experienceBETime[1];

          self._add('/experience/create/forUser/' + self.orgId + '_' + self.userData.userId,  row, 
          function(){
            self.getQueryExperience();
          });
        }
        
      },
      _addExperienceParams(){
        return {
          "address": "string",
          "beginTime": new Date('2018-08-09').getTime(),
          "endTime": new Date('2018-08-10').getTime(),
          "owner": 1,
          "position": "string",
          "status": 1,
          "typeId": 1
        }
      },
      /*
      * 删除指定ID的一条经历
      * @params {number/string} id 不为undefined时，表示不是新增的数据
      * @params {object} rowData 当前行数据
      * @params {number} index 当前行的下标
      */
      delExperience(id,rowData,index){
        let self = this;
        if(id){
          self._del('/experience/delete/'+ id +'/forUser/' + self.orgId + '_' + self.userData.userId, 
          function(){
            self.getQueryExperience();
          })
        }else{
          self.experienceData.splice(index,1)
        }
      },
      /*
      * 添加一行用户获得性结果档案      
      */
      addArchivesesRow(){
        this.archivesesData.push({
          "address":   null,
          "creater":   1,
          "name":      null,
          "owner":     1,
          "status":    1,
          "time":      null,
          "typeId":    1,
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
          self._add('/archiveses/create/forUser/' + self.orgId + '_' + self.userData.userId, row, 
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
            "time": new Date().getTime(),
            "typeId": 1
        }
      },
      /*
      * 删除指定ID的一条荣誉
      * @params {number/string} id 不为undefined时，表示不是新增的数据
      * @params {object} rowData 当前行数据
      * @params {number} index 当前行的下标
      */
      delArchiveses(id,rowData,index){
        let self = this;
        if(id){
          self._del('/archiveses/delete/'+ id +'/forUser/' + self.orgId + '_' + self.userData.userId, 
          function(){
            self.getQueryArchiveses();
          })
        }else{
          self.archivesesData.splice(index,1)
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
      */
      _getQueryUserManage(url,receiveDataName){
        let self = this;
        self.$request.requestAxios('get', basePath + url , {params: {typeId: 1}},
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self[receiveDataName] = responseData.data;
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
        let self = this;
        self.$request.requestAxios('post', basePath + url, params,
          function(response) { //请求成功的回调...
            var responseData = response.data;
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
              self.$message('删除成功！！', 20);
              successs();
            },20)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
        });
      },
    }
  }
</script>
<style scoped>
  .form-wrap {
    padding: 12px;
  }
  .avatar-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
  }
  .avatar-wrap:hover {
    border: 1px dashed #409EFF;
    color: #409EFF;
  }
  .avatar-img {
    max-width: 100%;
  }
  .intro-table tr td{
    line-height: 46px;
    border: 1px solid #e4e7ed;
    padding-left: 12px;
  }
  .intro-table tr td:nth-child(1){
    width: 150px;
  }
  tr:nth-child(2n){ background: #FAFAFA; }
</style>

<!-- 强制样式 -->
<style> 
  #intro .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
  #intro .el-tree-node__expand-icon.el-icon-caret-right{
    font-size: 18px;
    color: #000;
  }
  #intro .el-tree-node__expand-icon.el-icon-caret-right.is-leaf{
    color: transparent;
  }
  #intro .el-upload.el-upload--text {
    width: 100%;
  }
</style>