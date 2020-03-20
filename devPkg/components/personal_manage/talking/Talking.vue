/*********************谈心谈话***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-09
/************************************************/
<template>
  <!-- <div style="width:100vw" class="container"> -->
  <div class="container">
    <!-- 右侧主体 -->
    <div class="main-page">
      <!-- <div class="add-study-button">
        <el-button icon="el-icon-circle-plus-outline" @click="addTalking" circle></el-button>
      </div> -->
      
      <el-tabs v-model="activeTab" @tab-click="clickTab">
        <el-tab-pane label="未开始的" :name="1"></el-tab-pane>
        <el-tab-pane label="已结束" :name="10"></el-tab-pane>
        <el-tab-pane label="已取消的" :name="3"></el-tab-pane>
        <el-tab-pane label="我创建的" :name="'meCreate'"></el-tab-pane>
      </el-tabs>
      <div v-if="listData && listData.length > 0" v-loading="cardsLoading">
        <el-card v-for="(item, index) in listData" class="card-item" :key="`item${index}`" @click.native="jumpPageClick(item)">
          <p class="title-wrap">
            <span class="text-bold">{{ item.theme }}</span> <span>{{ item.creator.name }}</span>
            <span class="right-date-time">创建时间: {{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh时：mm分')}}</span>
          </p>
          <p>谈话时间: {{$util._convertDate(item.beginTime, 'yyyy年MM月dd日 hh时：mm分')}} ~ {{$util._convertDate(item.endTime, 'yyyy年MM月dd日 hh时：mm分')}}</p>
          <p>谈话人: <span v-for="itemInner in item.initiatores" :key="itemInner.id">{{itemInner.name}} </span></p>
          <p>约谈对象: <span v-for="itemInner in item.talkers" :key="itemInner.id">{{itemInner.name}} </span></p>
          <p>活动地点: <span>{{item.address}}</span></p>

          <div class="bottom-wrap">
            <!-- <div class="complete-people">
              <img class="marr5" src="../../../images/org_user_icon.png">
              <span v-if="item.allTask == 0 || (item.finishs == item.allTask)">全部已完成</span>
              <span v-else>{{ item.finishs }}/{{ item.allTask }}已完成</span>
            </div> -->
            <div class="comment-count"><img class="marr5" src="../../../images/ifor_icon.png">{{ item.messageNum }}</div>
          </div>
        </el-card>
      </div>
      <p v-else class="no-data-text">暂无数据</p>
      <el-pagination
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="currentPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 添加学习教育 -->
    <el-dialog
      title="添加"
      :visible.sync="studyDialogVisible"
      :close-on-click-modal="false"
      @close="talkingDialogClosed"
      width="70vw">
      <el-row v-loading="studyDialogLoading" :gutter="20">
        <el-form ref="talkingForm" :model="talkingForm" :rules="rules" label-width="100px" size="small">
          <el-col :span="14">
            <el-form-item label="谈话人" prop="talkingList">
              <el-input type="text" readonly v-model="talkingNameList" @focus="activeType = 'talking'"></el-input>
            </el-form-item>
            <el-form-item label="被谈话人" prop="beTalkingList">
              <el-input type="text" readonly v-model="beTalkingNameList" @focus="activeType = 'beTalking'"></el-input>
            </el-form-item>
            <el-form-item label="谈话记录人" prop="talkingRecord">
              <el-input type="text" readonly v-model="talkingRecordName" @focus="activeType = 'talkingRecord'"></el-input>
            </el-form-item>
            <el-form-item label="谈话专题" prop="theme">
              <el-input type="text" v-model="talkingForm.theme"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="timeRange">
              <el-date-picker
                style="width: 100%"
                type="datetimerange"
                v-model="talkingForm.timeRange"
                value-format="timestamp"
                :editable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="谈话地点" prop="address">
              <el-input type="text" v-model="talkingForm.address"></el-input>
            </el-form-item>
            <el-form-item label="谈话内容" prop="content">
              <el-input type="textarea" v-model="talkingForm.content"></el-input>
            </el-form-item>
            <el-form-item label="附件">
              <el-upload
              :headers="{Authorization: 'Bearer ' + userData.token}"
              :action="_convertFilesUrl()"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeFileUpload"
              multiple
              :limit="100"
              :file-list="filesList">
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!</div>
            </el-upload>
            </el-form-item>

          </el-col>
          <!-- 谈话人员 -->
          <el-col :span="10" class="right-people-list-wrap">
            <h5 class="right-people-list-title" v-if="activeType == 'talking'">请选择谈话人</h5>
            <h5 class="right-people-list-title" v-if="activeType == 'beTalking'">请选择被谈话人</h5>
            <h5 class="right-people-list-title" v-if="activeType == 'talkingRecord'">请选择谈话记录人</h5>
            <el-collapse>
              <el-collapse-item title="职能部门" name="function" class="clear-margin-padding">
                <!-- 职能部门 手风琴 -->
                <el-collapse>
                  <el-collapse-item style="padding-bottom: 0; margin-bottom: 0;" v-for="item in funcListData" :key="item.id">
                    <template slot="title">
                      <i class="el-icon-caret-right"></i>{{ item.name }}
                    </template>
                    <!-- 职能部门的人员列表  ( 三种人员列表需要渲染三次 ) -->
                    <el-checkbox-group v-show="activeType == 'talking'" size="small" v-model="talkingForm.talkingList" >
                      <el-checkbox 
                        class="people-checkbox-item" 
                        v-for="itemInner in item.peopleList" 
                        :label="itemInner" 
                        :key="itemInner.id"
                      >{{ itemInner.name }}</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-show="activeType == 'beTalking'" size="small" v-model="talkingForm.beTalkingList" >
                      <el-checkbox
                        class="people-checkbox-item"
                        v-for="itemInner in item.peopleList"
                        :label="itemInner"
                        :key="itemInner.id">{{ itemInner.name }}</el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-show="activeType == 'talkingRecord'" size="small" v-model="talkingForm.talkingRecord" >
                      <el-radio
                        class="people-radio-item"
                        v-for="itemInner in item.peopleList"
                        :label="itemInner"
                        :key="itemInner.id">{{ itemInner.name }}</el-radio>
                    </el-radio-group>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>

              <el-collapse-item title="成员" name="people">
                <div class="participant-item-wrap">
                <!--  查询全部人员 ( 三种人员列表需要渲染三次 ) -->
                  <el-checkbox-group v-show="activeType == 'talking'" size="small" v-if="memberListData && memberListData.length > 0" v-model="talkingForm.talkingList"> 
                    <el-checkbox
                      class="people-checkbox-item"
                      v-for="item in memberListData"
                      :label="item"
                      :key="item.id">{{ item.name }}</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-show="activeType == 'beTalking'" size="small" v-if="memberListData && memberListData.length > 0" v-model="talkingForm.beTalkingList">
                    <el-checkbox 
                      class="people-checkbox-item"
                      v-for="item in memberListData"
                      :label="item"
                      :key="item.id">{{ item.name }}</el-checkbox>
                  </el-checkbox-group>
                  <el-radio-group v-show="activeType == 'talkingRecord'" size="small" v-if="memberListData && memberListData.length > 0" v-model="talkingForm.talkingRecord"> 
                    <el-radio
                      class="people-radio-item"
                      v-for="item in memberListData"
                      :label="item"
                      :key="item.id">{{ item.name }}</el-radio>
                  </el-radio-group>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>

        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="addStatus || studyDialogLoading" @click="submitForm('talkingForm')">确认</el-button>
        <el-button type="default" @click="studyDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from "qs"
  export default {
    data () {
      var checkTime = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请选择时间区间'));
        } else {
          if(value[0] < new Date().getTime()) {
            callback(new Error('时间必须选择将来时间'));
          } else {
            if ((value[1] - value[0]) > 86400000) {
              callback(new Error('时间区间不可超过一天'));
            } else {
              callback();
            }
          }
        } 
      }
      return {
        userData:           JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        orgId:              sessionStorage.getItem('orgId'),     //党组织id
        orgCode:            sessionStorage.getItem("orgCode"),
        cardsLoading:       false,
        detailLoading:      false,
        studyDialogLoading: false,

        activeTab:       1,     //tab对应的数据

        listData:        [],    //页面主体list
        currentPage:     1,
        currentPerPage:  5,
        total:           null,

        studyDialogVisible: false,

        /* ----- 表单需要使用的数据 ---- */

        activeType:      "talking", // 当前人员选择需要保存的目标 "talking" 谈话人 "beTalking" 被谈话人 "talkingRecord" 谈话记录人
        tempActiveList:  [], // 当前需要填入的人员列表

        activeFunctionType: null,
        funcListData:    [], //职能部门列表
        memberListData:  [], //成员列表
        memberData:      [], //成员 选中的对象

        talkingForm: {
          beginTime:         null,
          endTime:           null,
          timeRange:         null,
          talkingList:       [],   // 谈话人
          beTalkingList:     [],   // 被谈话人
          talkingRecord:     null, // 谈话记录人
          theme:             null,
          address:           null,
          content:           null,
        },

        talkingNameList:   [], //谈话人名称数组(仅用于input内展示)
        talkingIdList:     [], //谈话人Id数组

        beTalkingNameList: [], //被谈话人名称数组(仅用于input内展示)
        beTalkingIdList:   [], //被谈话人Id数组

        talkingRecordName: null,
        talkingRecordid:   null,

        rules: {
          talkingList: [
            { required: true, message: '请选择谈话人', trigger: 'change' },
          ],
          beTalkingList: [
            { required: true, message: '请选择被谈话人', trigger: 'change' },
          ],
          talkingRecord: [
            { required: true, message: '请选择谈话记录人', trigger: 'change' },
          ],
          timeRange: [
            { validator: checkTime, trigger: 'blur' },
            { required: true, message: '请选择时间', trigger: 'blur' },
          ],
          theme: [
            { required: true, message: '请输入谈话主题', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入谈话地址', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入谈话内容', trigger: 'blur' },
          ],
        },

        resource: JSON.parse(sessionStorage.getItem('resource')),
        filesList: []
      }
    },
    created () {

    },
    mounted () {

      let self = this
      self.getTalkingListData(1, 5)

      // 查询当前组织的下层职能部门列表
      this.$request.requestAxios("get", `${basePath}/party_orgs/chidrens`, {
          params : {
            id: parseInt(sessionStorage.getItem("orgId")),
            function: 1
          }
        }, 
        (response) => {
          if(response.data.data && response.data.data.length > 0) {
            // 追加人员, 职能部门的人员需要循环添加
            self.funcListData = response.data.data
            self.funcListData.forEach((item, index) => {
              self.getPeopleListData("function", item.id, item)
            })
          }
        },
        (error) => {
          self.orgType = null
        }
      )
      self.getPeopleListData("people", null, "memberListData")

    },
    watch: {
      //监听form外部的属性, 根据获得的值写入form中, 并触发表单验证
      "studyDateRange": {
        handler (newV, oldV) {
          if(!newV) {
            this.talkingForm.beginTime = null
            this.talkingForm.endTime   = null
          } else {
            this.talkingForm.beginTime = newV[0]
            this.talkingForm.endTime   = newV[1]
          }
          if(this.needValidate) {
            this.$refs.talkingForm.validateField("beginTime", (errorMessage) => {
              //验证未通过
              console.log(newV)
            })
          }
        },
        deep: false
      },
      "talkingForm.talkingList": {
        handler (newV, oldV) {
          let self = this
          self.talkingNameList = []
          self.talkingIdList   = []

          if(newV.length > 0) {
            newV.forEach((item, index) => {
              self.talkingNameList.push(item.name)
              self.talkingIdList.push(item.id)
            })
            self.talkingNameList = self.unique(self.talkingNameList)
            self.talkingIdList   = self.unique(self.talkingIdList)
          }
        },
        deep: true,
      },
      "talkingForm.beTalkingList": {
        handler (newV, oldV) {
          let self = this
          self.beTalkingNameList = []
          self.beTalkingIdList   = []

          if(newV.length > 0) {
            newV.forEach((item, index) => {
              self.beTalkingNameList.push(item.name)
              self.beTalkingIdList.push(item.id)
            })
            self.beTalkingNameList = self.unique(self.beTalkingNameList)
            self.beTalkingIdList   = self.unique(self.beTalkingIdList)
          }
        },
        deep: true,
      },
      "talkingForm.talkingRecord": {
        handler (newV, oldV) {
          let self = this
          if(!newV) {
            self.talkingRecordName = null
            self.talkingRecordId   = null
          } else {
            self.talkingRecordName = newV.name
            self.talkingRecordId   = newV.id
          }
        },
        deep: true,
      }
    },
    methods: {
      /**
       * 点击顶部tabs 切换状态
       * @param  {[type]} tab   [description]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      clickTab (tab, event) {
        this.activeTab = tab.name
        this.getTalkingListData(1, 5)
      },
      /**
       * 获取参与人员的 列表(function时需要遍历当下的所有的职能部门下的人员)
       * @param  {string} type   查询的类型 "function" 职能部门的人员 "people" 全部成员
       * @param  {number} funcId 职能部门对应的Id
       * @param  {object} target 数据要存入的位置(function时传obj 其余传string)
       * @return {[type]}        [description]
       */
      getPeopleListData (type, funcId, target) {
        let self = this
        
        let data = {
          params: {
            id: parseInt(sessionStorage.getItem("orgId")),
          }
        };

        let url;

        if (type == "function") { //根据职能部门的id 查询人员
          data.params.id   = funcId
          data.params.type = "partyorg"
          url              = `${basePath}/party_orgs/leader`
        } else { // 查询当前组织对应的人员
          url = `${basePath}/party_orgs/members`
        }

        self.$request.requestAxios("get", url, data, 
          (response) => {
            if(type == "function"){
              target.peopleList = response.data.data 
            } else {
              self[target] = response.data.data
            }
          },
          (error) => {

          }
        )

      },
      /**
       * 获取主体的谈心谈话列表
       * @param  {[type]} page    [description]
       * @param  {[type]} perPage [description]
       * @return {[type]}         [description]
       */
      getTalkingListData (page, perPage) {
        let self = this;

        // let search = qs.stringify({
        //   special:  self.activeSpecial,  //学习专题Id
        //   type:     2, // 固定为2
        //   orgId:    parseInt(sessionStorage.getItem("orgId")),
        //   status:   self.activeTab,
        //   pageSize: perPage || self.currentPerPage,
        //   pageNum:  page || self.currentPage
        // })
        // 
        self.cardsLoading = true

        let paramObj = {
          pageSize:  perPage || self.currentPerPage,
          pageNum:   page || self.currentPage,
          talker:    JSON.parse(sessionStorage.getItem("userData")).userId,
          creator:   JSON.parse(sessionStorage.getItem("userData")).userId,
          noteTaker: JSON.parse(sessionStorage.getItem("userData")).userId,
          initiator: JSON.parse(sessionStorage.getItem("userData")).userId,
          type: 1,
        }

        if(self.activeTab != "meCreate") {
          paramObj.converStatus = self.activeTab || 1
        } else {
          paramObj.creator = self.userData.userId
          delete paramObj.talker
          delete paramObj.noteTaker
          delete paramObj.initiator
          paramObj.type = 2
        }
        
        self.$request.requestAxios("post", `${basePath}/conversation/conversation/list/`, paramObj, 
          (response) => {
            self.listData = response.data.data.rows
            self.total    = response.data.data.total
            self.cardsLoading = false
          },
          (error) => {
            self.$message.error("查询列表失败")
            self.cardsLoading = false
          }
        )
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getTalkingListData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTalkingListData()
      },
      /**
       * 点击添加学习
       */
      addTalking () {
        this.studyDialogVisible = true
      },
      /**
       * 提交表单 根据不同的表单进行不同的逻辑处理
       * @param  {string} formName 表单的ref
       * @return none
       */
      submitForm(formName) {
        let self = this
        

        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.studyDialogLoading = true

            let submitForm = self.handleFormToService()

            self.$request.requestAxios("post", `${basePath}/conversation/conversation/add/`, submitForm, 
              (response) => {
                self.studyDialogVisible = false
                self.studyDialogLoading = false
                self.$message.success("成功")
                self.getTalkingListData(1, 5)
              },
              (error) => {
                self.studyDialogLoading = false
                self.$message.error(error.data.meta.message)
              }
            )
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        });
      },
      /**
       * 处理表单数据, 并返回一个新的表单, 用于保存至后台
       * @return {[type]} [description]
       */
      handleFormToService () {
        let self = this;
        let deepClone = JSON.parse(JSON.stringify(self.talkingForm))

        deepClone.partyOrgId  = parseInt(sessionStorage.getItem("orgId"))
        deepClone.initiatores = self.talkingIdList
        deepClone.talkers     = self.beTalkingIdList
        deepClone.noteTaker   = self.talkingRecordId

        let idArray = []
        self.filesList.forEach((item, index) => {
          idArray.push(item.response.data)
        })
        deepClone.privateFileIds = idArray.join()
        
        delete deepClone.talkingList
        delete deepClone.beTalkingList
        delete deepClone.talkingRecordId
        //处理时间
        deepClone.beginTime = deepClone.timeRange[0]
        deepClone.endTime   = deepClone.timeRange[1]
        delete deepClone.timeRange


        return deepClone
      },
      /**
       * 添加学习教育关闭的回调, 还原表单和验证
       * @return {[type]} [description]
       */
      talkingDialogClosed () {
        this.$refs["talkingForm"].resetFields()
      },
      /**
       * 数组去重
       * @param  {array} arr 需要去重的数组
       * @return {array}       去重后的数组(不影响原数组)
       */
      unique (arr) {
       var res = [];
       for(var i=0; i<arr.length; i++){
        if(res.indexOf(arr[i]) == -1){
         res.push(arr[i]);
        }
       }
       return res;
      },
      /*
       * 拼接上传附件的URL地址
       */
      _convertFilesUrl(){
        return basePath + '/file/'+ this.orgId +'/uplode';
      },
      /*
       * 附件上传之前，验证的数据大小
       */
      beforeFileUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
          this.$message.error('附件大小不能超过 100MB!');
        }
        return isLt2M;
      },
      handleSuccess (response, file, filesList) {
        this.filesList = filesList
      },
      handleRemove (file, filesList) {
        this.filesList = filesList
      },
      /*
       * 点击跳转二级页面，根据当前页面地址判断是跳转到个人中心，还是组织中心的二级页面
       */
      jumpPageClick(item){
        let currentPath = this.$route.path;
        currentPath.indexOf('my') == -1 ?
          this.$router.push({name: 'Talking_Detail', params: {id: item.id}}) :
          this.$router.push({name: 'My_Talking_Detail', params: {id: item.id}})
      }
    }
  };
</script>
 
<style scoped>
  .text-bold {
    font-weight: bold;
  }
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .main-page{
    position: relative;
    padding: 0 10px;
    width: calc(100vw - 275px);
    height: calc(100vh - 116px);
    overflow-y: auto;
    overflow-x: hidden;
    background: #f5f6f8;
  }
  .add-study-button {
    position: absolute;
    z-index: 99;
    right: 20px;
    top: 5px;
    font-size: 22px;
    color: #808080;
    cursor: pointer;
  }
  .add-study-button .el-button {
    font-size: 20px;
    border: none;
    padding: 0;
    color: #808080;
  }
  .no-data-text {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #bbb;
  }
  .right-people-list-wrap .people-checkbox-item {
    display: block;
    margin-left: 0;
  }
  .right-people-list-wrap .people-radio-item {
    display: block;
    margin-left: 0;
    height: 24px;
  }
  .right-people-list-wrap .right-people-list-title {
    font-weight: bold;
    margin: 6px 0;
  }
  /*列表*/
  .card-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .card-item:hover {
    box-shadow: 0 5px 15px #ccc;
    border: 1px solid #eee;
  }
  .title-wrap,
  .deadline,
  .bottom-wrap {
    margin: 8px 0;
  }
  .title-wrap,
  .bottom-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  /* 添加谈话 */
  .clear-margin-padding {
    padding: 0;
    margin: 0;
  }
  .validate-text {
    position: absolute;
    margin-top: -18px;
    font-size: 12px;
    color: #f56c6c;
  }
  .detail-item-wrap {
    display: flex;
    min-height: 32px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: flex-start;
  }
  .detail-item-wrap .detail-item-label {
    display: inline-block;
    width: 70px;
    line-height: 32px;
  }
  .detail-item-wrap .detail-item-content {
    display: inline-block;
    width: calc( 100% - 75px);
    line-height: 32px;
  }
  .review-list-wrap {
    max-height: 283px;
    overflow-y: auto;
  }
  .child-misson-wrap {
    text-align: center;
    border: 1px solid #ccc;
  }
  .review-item-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent; 
  }
  .review-item-wrap:last-child {
    border-bottom: none;
  }
  .review-item-wrap div {
    width: calc(100% - 60px);
  }
  .input-button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>

<style>
  .right-people-list-wrap .el-collapse-item__content {
    padding-bottom: 0!important;
  }

</style>