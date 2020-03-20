/*************************************
*  create by xieyuanyuan date 2018/07/011
*  首页管理 - 组织工作台 - 发展党员 - 申请入党名册
**************************************/ 
<template>
  <div v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task">
    <div class="content-wrapper-innter">
      <el-table
        :stripe="true"
        :data="listData.rows"
        style="width: 100%">
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="性别">
          <template slot-scope="scope">
            {{$util.controlTable(scope.row.sex)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="出生年月">
          <template slot-scope="scope">
            {{$util._convertDate(scope.row.birthday, 'yyyy年MM月dd日')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="文化程度">
          <template slot-scope="scope">
            {{$util.controlTable(scope.row.education)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="参加工作时间">
          <template slot-scope="scope">
            {{$util._convertDate(scope.row.hireDate, 'yyyy年MM月dd日')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="申请入党时间">
          <template slot-scope="scope">
            {{$util._convertDate(scope.row.joinPartyDate, 'yyyy年MM月dd日')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="discription"
          label="备注">
        </el-table-column>
        <!-- <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">转积极分子</el-button>
          </template>
        </el-table-column> -->
      </el-table>
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
</template>

<script>
  export default {
    data() {
      return {
        isLoad:           true,
        orgCode:          sessionStorage.getItem('orgCode'),
        orgId:            sessionStorage.getItem('orgId'),
        elementPageData: {               //分页需要的数据
            defaultData:  this.$util.elementPagination,
            pageNum:      this.$util.elementPagination.pageNumDefault,
            pageSize:     this.$util.elementPagination.pageSizeDefault,
        },
        listData:         {rows: [], total: 0,}  
      }
    },
    mounted() {
      this.getQueryList();
      
    },
    destoryed() {
       
    },
    methods:{
      /*
       * 查询列表数据
       */
      getQueryList(){
        this.$request.requestAxios('get', `${this.$util.basePath}/hr_join_party_application/list/from_org/${this.orgCode}`,
            this._getQueryListParam(), 
            (response) => {
              this.listData = response.data.data;
              this.isLoad = false;
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${this.$util.basePath}/hr_join_party_application/list/from_org/${this.orgCode} - 失败`);
              this.isLoad = false;
            },
         );
       },
      _getQueryListParam(){
        return {
          params: {
              status:   4,
              orgId:    this.orgId,
              pageSize: this.elementPageData.pageSize,
              pageNum:  this.elementPageData.pageNum,
          }
        }
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
    }
  }
</script>