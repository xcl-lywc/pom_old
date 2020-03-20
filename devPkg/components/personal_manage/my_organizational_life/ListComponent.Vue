/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 我的通知
**************************************/ 
<template>
  <div class="content-manage personal-top">
    <!-- 查询条件 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未审批" name="1" status="1">
        <div></div>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="2" status="2">
        <div></div>
      </el-tab-pane>
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
          prop="lifeName"
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
      v-if="currentActiveItem"
      class="task-detail-dialog dialog"
      :title="`${currentActiveItem.lifeName}详情`"
      :visible.sync="detailDialogVisible"
      width="800px">
      <div>
        <p class="mart10">名称: {{currentActiveItem.lifeName}}</p>
        <p class="mart10">创建人: {{currentActiveItem.creator}}</p>
        <p class="mart10">创建时间: {{$util._convertDate(currentActiveItem.createTime, 'yyyy年MM月dd日')}}</p>
        <p class="mart10">内容: 
          <span v-html="currentActiveItem.lifeContent"></span>
        </p>
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
        this.$request.requestAxios('get', `${basePath}/party_member_infos/orglift`, this._getListParam(),
          (response) => {
            this.listData = response.data.data;
            this.isLoad = false;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(`${basePath}/party_member_infos/orglift`);
            this.isLoad = false;
        });
      },
      /*
      * 查询参数组装
      */
      _getListParam(){
        return {
          params: {
            type:     this.typeId,
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
        this.$request.requestAxios('get', `${basePath}/t_form_data/type/21`, "",
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
        this.getQueryList();
      },
      /*
       * 点击某一行显示改行详情
       */
      rowClick(rowData){
        this.detailDialogVisible = true;
        this.$request.requestAxios('get', `${basePath}/party_member_infos/orglift/${rowData.id}`, "",
          (response) => { //请求成功的回调...
            this.currentActiveItem = response.data.data;
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error(`${basePath}/party_member_infos/orglift/${rowData.id} - 失败`);
        });
      }
    }
  }
</script>