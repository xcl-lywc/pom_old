/****************************************
*  create by xieyuanyuan date 2018/09/03
*  首页管理-个人中心-我的请假
****************************************/
<template>
  <div class="content-manage personal-top">
    <!-- 查询条件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未审批" name="1" status="1"></el-tab-pane>
      <el-tab-pane label="已同意" name="2" status="2"></el-tab-pane>
      <el-tab-pane label="未同意" name="3" status="3"></el-tab-pane>
    </el-tabs>
    <!-- 课程列表 -->
    <div v-if="listData" class="course-list-manage mart20">
      <el-table
        v-loading="isLoad"
        :stripe="true"
        class="table-cursor"
        :data="listData.rows"
        style="width: 100%"
        @row-click="rowClick">
        <el-table-column
          prop="applicationName"
          label="会议名称">
        </el-table-column>
        <el-table-column
          width="150px"
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
          prop="reason"
          label="请假理由">
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
    <!-- 详情 -->
    <el-dialog 
      class="task-detail-dialog dialog"
      title="请假流程"
      :visible.sync="detailDialogVisible"
      width="800px">
      <div>
        <!-- 展示全部，流程列表数据  -->
        <el-table
            v-if="activeNameTab != 1 && historyList.length"
            :show-header="false"
            :data="historyList"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column>
                <template slot-scope="scope">
                    <span class="pointer" 
                      @click=" historyProcessFun();  hisToryMathRandom++; hisToryData = scope.row " >
                        <i class="el-icon-news marr10"></i>{{scope.row.commentContent}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="creator">
            </el-table-column>
            <el-table-column
                align="right"
                width="195px">
                <template slot-scope="scope">
                    {{$util._convertDate(scope.row.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                </template>
            </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:{
      pageType: 'org', //org为组织平台， personal为个人中心
      typeId:   null,  //类型Id
    },
    components:{
    },
    data() {
      return {
        isLoad: true,
        listData: {rows: [], total: 0,},
        activeName: '1',
        elementPageData: {               //分页需要的数据
            defaultData:  this.$util.elementPagination,
            pageNum:      this.$util.elementPagination.pageNumDefault,
            pageSize:     this.$util.elementPagination.pageSizeDefault,
        },
        detailDialogVisible: false,
        historyList: [],
        currentActiveItem:   null, //当前被选中的数据
      }
    },
    mounted() {
      this.getQueryList();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 查询列表
      */
      getQueryList(){
        this.$request.requestAxios('get', `${basePath}/m_info/leave`, this._getListParam(),
          (response) => {
            this.listData = response.data.data;
            this.isLoad = false;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(`${basePath}/m_info/leave`);
            this.isLoad = false;
        });
      },
      /*
      * 查询参数组装
      */
      _getListParam(){
        return {
          params: {
            status:   this.activeName, 
            pageSize: this.elementPageData.pageSize,
            pageNum:  this.elementPageData.pageNum,
          }
        }
      },
      /*
       * 切换状态查询列表
       */
      handleClick(tab,event){
        // ---------------------- 设置为初始状态-----------------------
        this.elementPageData.pageNum = this.$util.elementPagination.pageNumDefault;
        this.elementPageData.pageSize = this.$util.elementPagination.pageSizeDefault;

        this.getQueryList();

      },
      /*
      * 改变当前页码触发此事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryList();
      },
      /*
      * 改变每页条数触发此事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryList();
      },
      /*
       * 点击某一行显示改行详情
       */
      rowClick(rowData){
        this.detailDialogVisible = true;
        this.getHistoryList(rowData);
      },
      /*
       * 回复列表
       */
      getHistoryList(rowData) {
        let self = this, data = null;
        self.$set(self, 'historyList', [])
        self.$request.requestAxios('get', basePath + '/t_tasks/review/list', self._getHistoryListParams(rowData), 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.$set(self, 'historyList', resposeData.data.rows);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/t_tasks/review/list - 失败')
        });
      },
      _getHistoryListParams(rowData){
	        return {
	            params: {
	                fromId:   rowData.taskId, 
	                fromType: '2', 
	                status:    2
	            }
	        }
      },
    }
  }
</script>