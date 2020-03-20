/****************************************
*  create by xieyuanyuan date 2018/05/21
*  首页管理-个人中心-我的信箱列表
****************************************/
<template>
	<div class="content-manage personal-top collection-page">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发件箱" name="1" status="1">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="收件箱" name="2" status="2">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="3" status="3">
          <div></div>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="fr add-btn-manage"><i @click=" addDialogVisible = true " class="el-icon-circle-plus-outline"></i></div> -->
    </div> 
    <!-- 列表 -->
    <div v-if="listData" class="course-list-manage">
        <!-- 列表内容 -->
        <div v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task">
            <div class="content-wrapper-innter">
              <div class="task-list metting-box-list" v-for="(item, index) in listData.rows" :key="index">  
                <el-row class="title-message">
                  <el-col :span="12" class="title">
                    <span 
                      @click="$router.push({name: 'Personal_Mailbox_Detail', params: {id: item.emailId} })" 
                      :title="item.name">
                      题目：《{{item.name}}》
                    </span>
                  </el-col>
                  <el-col :span="4">
                    <span class="position text-center" @click="" :title="item.content">{{item.createrName}}</span>
                  </el-col>
                  <el-col :span="8" class="text-right end-date">
                    <span @click="">
                      创建时间：{{$util._convertDate(item.createrTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                    </span>
                  </el-col>
                </el-row>
                <p class="message-num metting-box">
                  {{_numTurnChinese(item.curStatus)}}
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
    </div>
	</div> 
</template>

<script>
  export default {
    data() {
      return {
        isLoad:   true, //等待事件
        orgCode:  sessionStorage.getItem('orgCode'), //党组织code
        orgId:    sessionStorage.getItem('orgId'),   //党组织code
        elementPageData: {               //分页需要的数据
          defaultData:  this.$util.elementPagination,  
          pageNum:      this.$util.elementPagination.pageNumDefault,  
          pageSize:     this.$util.elementPagination.pageSizeDefault, 
        },
        activeName:       '1',
        listData: {rows: [], total: 0},
      }
    },
    mounted() {
       this.getQueryList();
    },
    methods: {
      /*
       * 查询课程列表
       */
      getQueryList(){
        this.$request.requestAxios('get', this._requestUrl(), 
            this._getQueryListParams(),
          (response) => { //请求成功的回调...
            var responseData = response.data;
            this.listData = responseData.data;
            this.isLoad = false;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/v_ballot/list/from_org - 失败');
            this.isLoad = false;
          });
       },
      _requestUrl(){
        switch(this.activeName){
          case '1': //发件箱
            return `${this.$util.basePath}/email/outbox`;
            break;
          case '2': //收件箱
            return `${this.$util.basePath}/email/inbox`;
            break;
          case '3': //草稿箱
            return `${this.$util.basePath}/email/drafts`;
            break;
        }
      },
      /*
      * 查询列表-查询条件
      */
      _getQueryListParams(){
        return { 
          params: {
            pageSize: this.elementPageData.pageSize,
            pageNum:  this.elementPageData.pageNum,
          }
        }
      },
      /*
       * 切换状态查询列表数据
       */
      handleClick(){
        this.getQueryList();
      },
      /*
      * 改变当前页码触发此事件，并广播paginationChange事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryList();
      },
      /*
      * 改变每页条数触发此事件，并广播paginationChange事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryList();
      },
      /*
       * 状态数字转为中文
       * @params {number/string} status 1、草稿；2、已发送；3、书记已处理；4、用户已反馈
       */
      _numTurnChinese(status){
        switch(status){
          case 1: 
            return `草稿`;
            break;
          case 2: 
            return `已发送`;
            break;
          case 3: 
            return `书记已处理`;
            break;
          case 4: 
            return `用户已反馈`;
            break;
          default:
            break;

        }
      },
    }
  }
</script>
