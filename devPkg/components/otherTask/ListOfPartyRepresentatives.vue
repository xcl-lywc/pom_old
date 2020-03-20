/**********************************************
*  create by xieyuanyuan date 2018/08/28
*  党代表名单
***********************************************/
<template>
  <div class="content-manage">
    <!-- 状态切换 -->
    <div class="sub-query-manage tabs-manage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未审核" name="1" status="1">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="审核中" name="2" status="2">
          <div></div>
        </el-tab-pane>
        <el-tab-pane label="已审核" name="3" status="3">
          <div></div>
        </el-tab-pane>
      </el-tabs>
      <div class="fr add-btn-manage">
        <el-button
          class="icon-plus_fx"
          @click=" showDialogVisible = true; form.userId = null; " 
          icon="el-icon-plus" 
          size="mini" 
          circle>
        </el-button>
      </div>
    </div>
    <el-table 
      v-loading="isLoad"
      class="mart20"
      :data="listData.rows"
      style="width: 100%">
      <el-table-column
        prop="account"
        label="账号"
        width="">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字">
      </el-table-column>
      <el-table-column
        label="出生年月">
        <template slot-scope="scope">
          {{$util._convertDate(scope.row.borthday, 'yyyy年MM月dd日')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="introducer"
        label="性别">
        <template slot-scope="scope">
          {{$util.controlTable(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="joinPartyTime"
        label="入党时间">
        <template slot-scope="scope">
          {{$util._convertDate(scope.row.joinPartyTime, 'yyyy年MM月dd日')}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否失联">
        <template slot-scope="scope">
          {{scope.row.lost? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否是流动党员">
        <template slot-scope="scope">
          {{scope.row.mobile? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="组织名称">
      </el-table-column>
      <el-table-column
        prop="qualification_time"
        label="转正时间">
        <template slot-scope="scope">
          {{$util._convertDate(scope.row.qualification_time, 'yyyy年MM月dd日')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180px">
        <template slot-scope="scope">
          <el-button
            @click="delClick(scope.row)" 
            type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="element-pagination-manage mart20">
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
    <!-- 新增党员名单 -->
    <el-dialog 
      class="add-task-dialog dialog"
      title="列为预备党员代表"
      :visible.sync="showDialogVisible"
      :before-close="handleAddTaskDialogClose"
      width="500px">
      <el-form :model="form" ref="form" label-width="80px" class="demo-ruleForm mar20">
        <el-form-item
          label="成员："
          prop="userId"
          :rules="[{ required: true, message: '请选择成员'},]">
          <el-select v-model="form.userId" placeholder="请选择">
            <el-option
              v-for="item in membersList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>  
</template>

<script>
  export default {
    computed:{
    },
    data() {
      return {
        orgCode:         sessionStorage.getItem('orgCode'),
        orgId:           sessionStorage.getItem('orgId'),
        userData:        JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        activeName:      '1',
        showDialogVisible:false, 
        listData:        { total: 0, rows: [] }, 
        elementPageData: {               //分页需要的数据
          defaultData:    this.$util.elementPagination,  
          pageNum:        this.$util.elementPagination.pageNumDefault,  
          pageSize:       this.$util.elementPagination.pageSizeDefault, 
        },
        membersList:     [],
        form:{
          userId: null,
        }
      }
    },
    mounted() {
      this.getQueryList();
      this.getQueryMembersList();
    },
    watch:{

    },
    methods:{
      /*
       * 查询党员名册列表
       */
      getQueryList(){
        if(!this.orgCode) return false;

        this.$request.requestAxios('get', `${basePath}/org_building/representative/from_org/${this.orgCode}`, this._queryListParams(),
          (response) => { //请求成功的回调...
            this.listData = response.data.data;
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error(`${basePath}/org_building/representative/from_org/${this.orgCode} - 失败`);
        });
      },
      _queryListParams(){
        return {params: {
          status:   this.activeName,
          pageSize: this.elementPageData.pageSize,
          pageNum:  this.elementPageData.pageNum,
        }}
      },
      /*
       * 查询党员信息
       */
      getQueryMembersList(){
        this.$request.requestAxios('get', `${basePath}/party_orgs/members`, {params: {id: this.orgId}},
          (response) => { //请求成功的回调...
            this.membersList = response.data.data;
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error(`${basePath}/party_orgs/members - 失败`);
        });
      },
      addParty(){

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
       * 提交党员数据
       */
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', `${basePath}/org_building/representative/from_org/${this.orgCode}`, {userId: this.form.userId},
              (response) => { //请求成功的回调...
                this.$message.success(response.data.meta.message);
                this.showDialogVisible = false;
                this.getQueryList();
              },(error,status) => {
                  status == 200 ? this.$message.error(error.data.meta.message) : 
                                  this.$message.error(`${basePath}/party_orgs/members - 失败`);
            });             
          } else {
            return false;
          }
        });
      },
      /*
       * 根据党员Id删除党员名册
       */
      delClick(data){
        this.$request.requestAxios('delete', 
          `${basePath}/org_building/representative/${data.id}/from_org/${this.orgCode}`, "",
          (response) => { //请求成功的回调...
            this.$message.success(response.data.meta.message);
            this.getQueryList();
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${basePath}/org_building/representative/${data.id}/from_org/${this.orgCode} - 失败`);
        });   
      },
      handleClick(){
        this.getQueryList();
      }
    }
  }
</script>