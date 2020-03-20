/*********************主题活动***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-11
/************************************************/
<template>
  <div style="width:100vw" class="container">
    <!-- 右侧主体 -->
    <div class="main-page">
      <div class="add-study-button">
        <el-button icon="el-icon-circle-plus-outline" @click=" themeDialogVisible = true; mathRandom++ " circle></el-button>
      </div>
      
      <el-tabs v-model="activeTab" @tab-click="clickTab">
        <el-tab-pane label="未结束的" :name="'notEnd'"></el-tab-pane>
        <el-tab-pane label="已结束/取消的" :name="'end'"></el-tab-pane>
        <el-tab-pane label="我创建的" :name="'create'"></el-tab-pane>
      </el-tabs>
      <div v-if="listData && listData.length > 0" v-loading="cardsLoading">
        <el-card v-for="(item, index) in listData" class="card-item" :key="`item${index}`" @click.native="$router.push({name: 'Theme_Detail', params: {id: item.id}})">
          <p class="title-wrap">
            <span class="text-bold">{{ item.name }}</span> <span>{{ item.creater }}</span>
            <span class="right-date-time">创建时间: {{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh时：mm分')}}</span>
          </p>
          <p>活动时间: {{$util._convertDate(item.beginTime, 'yyyy年MM月dd日 hh时：mm分')}} ~ {{$util._convertDate(item.endTime, 'yyyy年MM月dd日 hh时：mm分')}}</p>
          <p>活动地点: <span>{{item.address}}</span></p>

          <div class="bottom-wrap">
            <!-- <div class="complete-people">
              <img class="marr5" src="../../images/org_user_icon.png">
              <span v-if="item.allTask == 0 || (item.finishs == item.allTask)">全部已完成</span>
              <span v-else>{{ item.finishs }}/{{ item.allTask }}已完成</span>
            </div> -->
            <div class="comment-count"><img class="marr5" src="../../images/ifor_icon.png">{{ item.commitNumber }}</div>
          </div>
        </el-card>
      </div>
      <p v-else class="no-data-text">暂无数据</p>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="currentPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    

      <!-- 添加学习教育 -->
       <el-dialog
        class="add-task-dialog dialog"
        title="添加主题"
        :visible.sync="themeDialogVisible"
        :close-on-click-modal="false"
        width="70vw">
        <task-form pageType="org" processTaskId="" :requestUrl="`${$util.basePath}/t_form_data/first/16`" processName="新建主题" instanceId="" :mathRandom="mathRandom" @formDataEmit="formDataEmitFun"></task-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import Task_Form from '../task_manage/detail/Task_Form.vue'
  import qs   from "qs"
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
        mathRandom:   0,    //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
        userData:           JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        orgId:              sessionStorage.getItem('orgId'),     //党组织id
        orgCode:            sessionStorage.getItem("orgCode"),
        cardsLoading:       false,
        detailLoading:      false,
        themeDialogLoading: false,

        activeTab:       'notEnd',     //tab对应的数据

        listData:        [],    //页面主体list
        currentPage:     1,
        currentPerPage:  5,
        total:           null,

        themeDialogVisible: false,

        /* ----- 表单需要使用的数据 ---- */
        themeForm: {
          name:      null,
          address:   null,
          timeRange: null,
          beginTime: null,
          endTime:   null,
          plan:      [],
          fileList:  [],
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          address: [
            { required: true, message: '请输入活动地点', trigger: 'change' },
          ],
          fileList: [
            { required: true, message: '请上传活动方案文件', trigger: 'change' }
          ],
          timeRange: [
            { validator: checkTime, trigger: 'blur' },
            { required: true, message: '请选择时间', trigger: 'blur' },
          ],
        },

        resource: JSON.parse(sessionStorage.getItem('resource')),
      }
    },
    components:{
      "task-form":         Task_Form, //任务表单  
    },
    created () {

    },
    mounted () {
      window.t = this

      let self = this
      self.getThemeListData()
    },
    watch: {

    },
    methods: {
      /*
       * 新建成功后，刷新页面
       */
      formDataEmitFun(data){
        this.getThemeListData();
        this.themeDialogVisible = false;
      },
      /**
       * 点击顶部tabs 切换状态
       * @param  {[type]} tab   [description]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      clickTab (tab, event) {
        this.activeTab = tab.name
        this.getThemeListData()
      },
      /**
       * 获取主体的谈心谈话列表
       * @return {[type]} [description]
       */
      getThemeListData (page, perPage) {
        let self = this;

        

        let search = {
          orgId:    parseInt(sessionStorage.getItem("orgId")),
          pageSize: perPage || self.currentPerPage,
          pageNum:  page || self.currentPage,
          status:   null
        }

        switch(self.activeTab) {
          case "notEnd":
            search.status = [2,3];
            break;
          case "end":
            search.status = [4,5];
            break;
          default:
            delete search.status
            break;
        }

        self.$request.requestAxios("post", `${basePath}/activity/orgactivity/from_org/${self.orgCode}`,  search, 
          (response) => {
            self.listData = response.data.data.rows
          },
          (error) => {
        })
      },
      handleSizeChange(val) {
        this.currentPerPage = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      /**
       * 点击添加学习
       */
      addTalking () {
        this.themeDialogVisible = true
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
            self.themeDialogLoading = true

            let submitForm = self.handleFormToService()

            self.$request.requestAxios("post", `${basePath}/activity/add/from_org/${self.orgCode}`, submitForm, 
              (response) => {
                self.themeDialogVisible = false
                self.themeDialogLoading = false
                self.$message.success("成功")
                self.getThemeListData()
              },
              (error) => {
                self.themeDialogLoading = false
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
        let deepClone = JSON.parse(JSON.stringify(self.themeForm))

        deepClone.beginTime = deepClone.timeRange[0]
        deepClone.endTime   = deepClone.timeRange[1]
        delete deepClone.timeRange
        deepClone.plan = JSON.stringify({
          id:   deepClone.fileList[0].response.data,
          name: deepClone.fileList[0].name
        })
        return deepClone
      },
      /**
       * 添加学习教育关闭的回调, 还原表单和验证
       * @return {[type]} [description]
       */
      talkingDialogClosed () {
        this.$refs["themeForm"].resetFields()
        this.themeForm.timeRange  = null
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
        this.themeForm.fileList = filesList
        this.$refs.themeForm.validate((valid) => {
          if (valid) {

          } else {

          }
        })
      },
      handleRemove (file, filesList) {
        this.themeForm.fileList = filesList
        this.$refs.themeForm.validate((valid) => {
          if (valid) {

          } else {
            
          }
        })
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