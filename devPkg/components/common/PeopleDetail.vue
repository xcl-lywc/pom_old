/********************职工详情组件************************/
  Author: Mingzhang.Zhao
  Date:   2018-09-04
/************************************************/
<template>
  <div class="content-wrap">
  <!-- <el-button type="primary" @click="editPeople">编辑信息</el-button> -->
  <div class="detail-wrap">
    <div class="wrap-title">基本信息</div>
    <div class="detail-title">个人信息</div>
    <el-form ref="detailForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户头像:">
            <img :src="detailForm.picture" alt="用户头像" class="head-img">
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="姓名:">
            {{ detailForm.name }}
          </el-form-item>
            <el-form-item label="公司:">
            {{ detailForm.orgName }}
          </el-form-item>
          <el-form-item label="工号:">
            {{ detailForm.account }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别:">
            {{$util.controlTable(detailForm.sex)}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生日:">
            {{ $util._convertDate(detailForm.borthday, "yyyy年MM月dd日")}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机:">
            {{ detailForm.phoneNumber }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话:">
            {{ detailForm.mobilNumber }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定电话:">
          {{ detailForm.mobilNumber }}
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职务:">
            {{$util.controlTable(detailForm.position)}}
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item label="籍贯:">
            {{$util.controlTable(detailForm.nativePlace)}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文化程度:">
            {{$util.controlTable(detailForm.education)}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="政治面貌:">
            {{$util.controlTable(detailForm.outLook)}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婚姻状况:">
            {{$util.controlTable(detailForm.maritalStatus)}}
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-form>
  </div>
  <!-- 关系 -->
  <div class="detail-wrap">
    <div class="wrap-title">关系</div>
    <div v-for="(item, key, index) in relationsData" key="`${index}relationsData`">
      <div class="detail-title">{{ typeTextData.relations[index]}} </div>
      <el-table
        :data="item"
        style="width: 100%">
        <el-table-column
          align="left"
          label="姓名">
          <template slot-scope="scope">
            <span>{{scope.row.otherName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="职业">
          <template slot-scope="scope">
            <span>{{scope.row.otherPosition}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="关系">
          <template slot-scope="scope">
            <span>{{scope.row.relationName}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 经历 -->
  <div class="detail-wrap">
    <div class="wrap-title">经历</div>
    <div v-for="(item, key, index) in experienceData" key="`${index}experienceData`">
      <div class="detail-title">{{ typeTextData.experience[index]}} </div>
      <el-table
        :data="item"
        style="width: 100%">
        <el-table-column
            align="left"
            width="400px"
            label="开始结束时间">
            <template slot-scope="scope">
              <span>
                {{scope.row.beginTime != 1 ? _convertDate(scope.row.beginTime) : ''}} - {{scope.row.beginTime != 1 ? _convertDate(scope.row.endTime) : ''}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="名称">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="简述">
            <template slot-scope="scope">
              <span>{{scope.row.position}}</span>
            </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 获得性 -->
  <div class="detail-wrap">
    <div class="wrap-title">获得性</div>
    <div v-for="(item, key, index) in archivesesData" key="`${index}archivesesData`">
      <div class="detail-title">{{ typeTextData.archiveses[index]}} </div>
      <el-table
        :data="item"
        style="width: 100%">
        <el-table-column
            align="left"
            width="250px"
            label="得奖日期">
            <template slot-scope="scope">
              <span>{{scope.row.time != 1 ? _convertDate(scope.row.time) : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="获奖地址">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="奖项名字">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
    <!-- 人员信息编辑对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="编辑人员"
      :visible.sync="infoDialogVisible"
      width="40vw">
      <el-form ref="people" :model="peopleForm" label-width="100px" size="small">
        <el-form-item label="姓名"
          prop="name"
          :rules="[
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ]">
        <el-input type="text" v-model="peopleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="技术职务">
          <el-select v-model="peopleForm.position" class="fill-width">
            <el-option v-for="(item, index) in techPositionList" :value="item.key" :label="item.value" :key="`${index}技术职务`">{{item.value}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="peopleForm.sex" class="fill-width" placeholder="请选择性别">
            <el-option v-for="(item, index) in dictionaryGender" :value="item.key" :label="item.value" :key="`编辑-性别${index}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="peopleForm.nation" class="fill-width" placeholder="请选择民族">
            <el-option v-for="(item, index) in dictionaryNation" :value="item.key" :label="item.value" :key="`编辑-民族${index}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯"><el-input type="text" v-model="peopleForm.nationPlace"></el-input></el-form-item>
        <el-form-item label="文化程度">
          <el-select v-model="peopleForm.educationLevel" class="fill-width" placeholder="请选择学历">
            <el-option v-for="(item, index) in dictionaryEducation" :value="item.key" :label="item.value" :key="`编辑-学历${index}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月">
          <el-date-picker
            v-model="peopleForm.borthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            class="fill-width"
            :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参加工作时间">
          <el-date-picker
            v-model="peopleForm.workBorth"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            class="fill-width"
            :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="peopleForm.outLook" class="fill-width" placeholder="请选择政治面貌">
            <el-option v-for="(item, index) in dictionaryOutlook" :value="item.key" :label="item.value" :key="`编辑-政治面貌${index}`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="infoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPeopleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userData: JSON.parse(sessionStorage.getItem('userData')),
        orgId: 1, //暂定为1，后期可能会取消
        infoDialogVisible: false,
        peopleForm: {},
        detailForm: {},

        // 字典对照表数据, 从后台获取
        dictionaryGender:    {},
        dictionaryNation:    {},
        dictionaryEducation: {},
        dictionaryOutlook:   {},

        relationsData:       {    //用户的社会关系列表
          relationsData1:    []
        },
        experienceData:      {   //用户的个人学历详情列表
          experienceData1:  [],
          experienceData2:  [],
          experienceData3:  [],
          experienceData4:  [],
          experienceData5:  [],
          experienceData6:  [],
          experienceData7:  [],
        }, 
        archivesesData:      {    //用户的个人荣誉列表
          archivesesData1:  [],
          archivesesData2:  [],
          archivesesData3:  [],
          archivesesData4:  [],
          archivesesData5:  [],
        },
        // typeData:{
        //   relations:  [1], //人际关系
        //   experience: [1,2,3,4,5,6,7], //工作经历，学习经历，培训经历，团组织职务经历，党政职务经历，工会组织职务经历，党组织内职务经历
        //   archiveses: [1,2,3,4,5], //个人荣誉，技术职务，学历，学位，职业资格证书
        // },
        typeTextData:{
          relations:  ["人际关系"],
          experience: ["工作经历","学习经历","培训经历","团组织职务经历","党政职务经历","工会组织职务经历","党组织内职务经历"],
          archiveses: ["个人荣誉","技术职务","学历","学位","职业资格证书"],
        }
      }
    },
    props: {
      id: {
        type:     Number,
        required: true,
      }
    },
    mounted () {
      this.getDictionaryData()
      this.getQueryUserDetail()

      this.getQueryRelationship()
      this.getQueryExperience()
      this.getQueryArchiveses()
    },
    methods: {
      /*
       * 查询用户信息
       */
      getQueryUserDetail(){
        let self = this;

        self.$request.requestAxios('get', basePath + '/hr_users/info/'+ self.id +'/forUser/1_1', "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.detailForm = responseData.data;
            self.detailForm.messageId = "personalMessage";
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/hr_users/info/'+ self
                              .id +'/forUser/1_1 - 失败');
        });
      },
      /**
       * 点击编辑, 写入当前的人员数据
       * @param  {object} tableItem 当前点击表格对应的对象
       * @return none
       */
      editPeople () {
        this.infoDialogVisible = true
        let editForm = JSON.parse(JSON.stringify(this.detailForm))
      },
      /**
       * 获取字典表数据
       * @return {[type]} [description]
       */
      getDictionaryData () {
        let self = this;

        let config = {
          url: `${basePath}/contrast/all_contrast_info`,
          method: "get"
        }

        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            response.data.data.forEach((item) => {
              switch (item.id) {
                case 1:
                  self.dictionaryGender = item.list;
                  break;
                case 2:
                  self.dictionaryNation = item.list;
                  break;
                case 3:
                  self.dictionaryEducation = item.list;
                  break;
                case 6:
                  self.dictionaryOutlook = item.list;
                  break;
                case 17:
                  self.techPositionList = item.list
              }
            })
          },
          (error) => {
            self.$message.error("获取数据对照表失败, 部分功能无法使用")
          }
        )
      },
      /**
       * 转化对应字典表的数据, 数字 > 文字
       * @param  {string} type  所需要转化的字典表名
       * @param  {number} value 所需要转化的数据
       * @return {string}       值对应的字典表名称
       */
      dictionaryTransfer (type, value) {
        let self = this
        let target = {}
        switch (type) {
          case "gender":
            target = self.dictionaryGender;
            break;
          case "nation":
            target = self.dictionaryNation;
            break;
          case "education":
            target = self.dictionaryEducation;
            break;
          case "outlook":
            target = self.dictionaryOutlook;
            break;
        }

        for(let item in target) {
          if(target[item].key == value) {
            return target[item].value
          }
        }
      },
      /*
      * 查询用户人际关系
      */
      getQueryRelationship(){
        this.typeTextData.relations.forEach( (typeId, index) => {
          this._getQueryUserManage('/relations/forType/forUser/' + this.orgId + '_' + this.userData.userId, 'relationsData',  index+1);
        });
        
      },
      /*
      * 查询用户相关经历
      */
      getQueryExperience(){
        this.typeTextData.experience.forEach( (typeId, index) => {
          this._getQueryUserManage('/experience/forType/forUser/' + this.orgId + '_' + this.userData.userId, 'experienceData', index+1);
        });
        
      },
      /*
      * 查询用户获得相关荣誉
      */
      getQueryArchiveses(){
        this.typeTextData.archiveses.forEach( (typeId, index) => {
          this._getQueryUserManage('/archiveses/forType/forUser/' + this.orgId + '_' + this.userData.userId, 'archivesesData', index+1);
        });
        
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
            console.log(responseData)
            self[receiveDataName][receiveDataName + typeId] = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
          });
      },
    }
  }
</script>

<style scoped>
  .content-wrap {
    max-height: calc(100vh - 172px);
    overflow-y: auto;
  }
  .detail-wrap {
    margin: 15px;
    padding: 15px;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
  }
  .wrap-title {
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
  }
  .detail-title {
    height: 30px;
    line-height: 30px;
    margin-bottom: 15px;
    padding-left: 15px;
    background: #409EFF;
    color: #fff;

  }
  .head-img {
    max-height: 160px;
  }
</style>