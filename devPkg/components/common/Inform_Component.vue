/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 我的通知
**************************************/ 
<template>
  <div class="content-manage personal-top">
    <!-- 查询条件 -->
    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline sub-query-manage" :gutter="20">
      <el-row class="marb15">
          <el-col :span="24">
            <el-input style="width: 70%;" placeholder="请输入内容" :title="form.noticeName" v-model="form.noticeName"></el-input>
            <el-button  @click="search" type="primary" size="mini">搜索</el-button>
          </el-col>

      </el-row>
      <!-- <el-row>
        <el-form-item label="发布单位">
          <el-select v-model="form.releaseUnit">
            <el-option label="上级单位" value="1"></el-option>
            <el-option label="兄弟单位" value="2"></el-option>
            <el-option label="下级单位" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知分类">
          <el-select v-model="form.noticeType">
            <el-option label="任务的通知" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-row> -->
    </el-form>
    <!-- 课程列表 -->
    <div v-if="listData" class="course-list-manage mart20">
      <el-table
        v-loading="isLoad"
        class="table-cursor"
        :stripe="true"
        :data="listData.rows"
        style="width: 100%"
        @row-click="rowClick">
        <el-table-column
          prop="noticeName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建者">
        </el-table-column>
        <el-table-column
          label="创建时间">
        <template slot-scope="scope">
          {{$util._convertDate(scope.row.createTime, 'yyyy年MM月dd日')}}
        </template>
        </el-table-column>
        <el-table-column
          prop="noticeContent"
          label="描述">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row class="mart20">
        <el-col :span="24" >
          <div class="grid-content bg-purple-dark">
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
        </el-col>
      </el-row>
    </div>
    <!-- 会议详情 -->
    <el-dialog 
      class="task-detail-dialog dialog"
      title="通知详情"
      :visible.sync="detailDialogVisible"
      width="800px"
      @close="detailHandleClose">
      <el-card class="single-course-manage box-card" v-if="currentActiveDetail">
        <div class="grid-content single-course-grid-content-manage bg-purple-dark pad5">
          <p class="title marb5">
            <span>名称：{{currentActiveDetail.noticeName}}</span>
          </p>
          <p class="marb5">通知到： {{currentActiveDetail.partyCode}}</p>
          <p class="marb5">描述：{{currentActiveDetail.noticeContent}}</p>
          <p class="marb5">附件个数：{{currentActiveDetail.privateFileNum}}</p>
          <p class="marb5">创建者：{{currentActiveDetail.creator}}</p>
          <p class="marb5">创建时间：{{$util._convertDate(currentActiveDetail.createTime, 'yyyy年MM月dd日')}}</p>
        </div>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item @click="showTaskDialog(item)" v-for="(item, index) in taskTypeList" :index="index" :key="index">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
      </el-card>
      <!-- 会议详情 -->
      <el-dialog 
        v-if="currentActiveType"
        class="task-detail-dialog dialog"
        :title="currentActiveType.name"
        :visible.sync="taskDialogVisible"
        width="75%"
        append-to-body>
        <task-form 
          :pageType="pageType" :processTaskId="currentActiveType.id" 
          :requestUrl="`${$util.basePath}/t_form_data/first/${currentActiveType.id}`" 
          :processName="currentActiveType.name" instanceId="" 
          :mathRandom="mathRandom"
          :parentTaskId="currentActiveDetail.fromId" 
          @formDataEmit="formDataEmitFun"></task-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import Task_Form from '../task_manage/detail/Task_Form.vue'
  export default {
    props:{
      pageType: 'org', //org为组织平台， personal为个人中心
    },
    components:{
      "task-form": Task_Form, // 头部固定内容
    },
    data() {
      return {
        isLoad: true,
        detailDialogVisible: false,
        taskDialogVisible:   false,
        orgCode: sessionStorage.getItem('orgCode'),
        form:{
          noticeName:  null,
          noticeType:  null,     //通知分类
          releaseUnit: null,    //发布单位
        },
        elementPageData: {      //分页需要的数据
          defaultData:  this.$util.elementPagination,  
          pageNum:      this.$util.elementPagination.pageNumDefault,  
          pageSize:     this.$util.elementPagination.pageSizeDefault, 
        },  //分页参数
        activeName: '1',                        //类型状态
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        listData: {},
        currentActiveDetail:  null, //当前被选中的详情
        taskTypeList:         null, //任务类型列表
        currentActiveType:    null, //当前被选中的类型
        mathRandom:           0,    //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
      }
    },
    mounted() {
      this.getQueryNoticeList();
      this.getQueryTaskTypeList();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 查询我的通知列表
      */
      getQueryNoticeList(){
        let self = this, url = null;
        this.pageType == 'org' ? url = `${basePath}/n_notice/list/from_org/${this.orgCode}` : url = `${basePath}/n_notice/list`; 
        self.$request.requestAxios('get', url, this._getNoticeListParam(),
          function(response) {
            let responseData = response.data;
            self.listData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url);
            self.isLoad = false;
        });
      },
      /*
      * 查询参数组装
      */
      _getNoticeListParam(){
        let self = this, paramsData = {
          params: {
            noticeName:  self.form.noticeName,
            // releaseUnit: self.form.releaseUnit,
            // noticeType:  self.form.noticeType,
            pageSize:    self.elementPageData.pageSize,
            pageNum:     self.elementPageData.pageNum,
          }
        }
        return paramsData;
      },
       /*
      * 点击搜索我的通知
      */
      search(){
        this.getQueryNoticeList();
      },
      /*
      * 切换状态查询任务列表
      */
      handleClick(tab,event){
        // ---------------------- 设置为初始状态-----------------------
        this.elementPageData.pageNum = this.$util.elementPagination.pageNumDefault;
        this.elementPageData.pageSize = this.$util.elementPagination.pageSizeDefault;

        this.getQueryNoticeList();

      },
      /*
      * 改变当前页码触发此事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryNoticeList();
      },
      /*
      * 改变每页条数触发此事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryNoticeList();
      },
      /*
       * 根据Id查询当前被选中的通知详情
       */
      getInformDetail(id){
        this.detailDialogVisible = true;
        this.$request.requestAxios('get', basePath + '/n_notice/'+ id +'/detail', '',
          (response) => {
            this.currentActiveDetail = response.data.data;
          }, (error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/n_notice/detail');
        });
      },
      /*
       * 查询可创建任务的类型列表
       */
      getQueryTaskTypeList(){
        let typeId = this.pageType == 'org' ? '1' : '21';
        this.$request.requestAxios('get', `${basePath}/t_form_data/type/${typeId}`, "",
          (response) => { //请求成功的回调...
            this.taskTypeList = response.data.data;
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error(`${basePath}/t_form_data/type/21 - 失败`);
        });
      },
      /*
       * 显示任务表单弹框
       */
      showTaskDialog(item){
        this.taskDialogVisible = true;
        this.currentActiveType = item;
        this.mathRandom++;
      },
      formDataEmitFun(){
        this.taskDialogVisible = false;
        this.getQueryTaskTypeList();
      },
      /*
       * 关闭详情弹框重查一遍列表数据
       */
      detailHandleClose(){
        this.getQueryNoticeList();
      },
      /*
       * 点击某一行显示改行详情
       */
      rowClick(rowData){
        this.getInformDetail(rowData.id);
      }
    }
  }
</script>
<style type="text/css">
  .inform .el-table__row{
    cursor: pointer;
  }
</style>