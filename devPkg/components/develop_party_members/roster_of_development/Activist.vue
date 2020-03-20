/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 组织工作台 - 发展党员 - 积极分子名册
**************************************/ 
<template>
  <div v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task" style="position: relative;">
    <div class="fr add-btn-manage" style="position: absolute; right: 0; top: -65px;">
      <el-button :disabled="!userList.length" :title="!userList.length ? '没有人员可登记' : ''" size="mini" @click="dialogVisible = true; isDialogClose = false; ">登记</el-button>
    </div>
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
          label="入党时间">
          <template slot-scope="scope">
            {{$util._convertDate(scope.row.joinPartyDate, 'yyyy年MM月dd日')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="technicalPosition"
          label="现任岗位">
        </el-table-column>
        <el-table-column
          prop="partyMemberCardNum"
          label="列为入党积极分子时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="计划发展时间">
          <template slot-scope="scope">
            {{$util._convertDate(scope.row.joinPartyDate, 'yyyy年MM月dd日')}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" 
              @click="developDialogVisible = true; developForm.userId = scope.row.userId; developUserName = scope.row.userName; ">列为发展对象</el-button>
          </template>
        </el-table-column>
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

    <!-- 登记弹框 -->
    <el-dialog
      class="add-task-dialog dialog"
      title="登记"
      :visible.sync="dialogVisible"
      :before-close="handleDialogClose"
      @close="dialogClose"
      width="800px">
      <div class="mart20">
        <my-register-form  :isDialogClose="isDialogClose" pageType="org" :userList="userList" @registerSuccess="registerSuccessFun"></my-register-form>
      </div>
    </el-dialog>

    <!-- 列为发展对象弹框 -->
    <el-dialog
      class="add-task-dialog dialog"
      title="列为发展对象"
      :visible.sync="developDialogVisible"
      :before-close="handleDialogClose"
      width="800px">
      <div class="mart20">
        <el-form ref="developForm" :model="developForm" label-width="130px">
          <el-form-item 
            label="姓名：">
            {{developUserName}}
          </el-form-item>
          <el-form-item 
            label="时间："
            prop="applicationTime"
            :rules="[{ required: true, message: '请选择时间', trigger: ['blur'] },]">
            <el-date-picker
              v-model="developForm.applicationTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item 
            class="line"
            label="入党介绍人一："
            prop="introducer[0]"
            :rules="[{ required: true, message: '请将填写入党介绍人一', trigger: ['blur', 'click'] },]">
            <el-input v-model="developForm.introducer[0]"></el-input>
          </el-form-item>
          <el-form-item 
            class="line"
            label="入党介绍人二："
            prop="introducer[1]"
            :rules="[{ required: true, message: '请将填写入党介绍人二', trigger: ['blur', 'click'] },]">
            <el-input v-model="developForm.introducer[1]"></el-input>
          </el-form-item>
          <el-form-item class="mart20 padt20">
            <el-button size="small" type="primary" @click="onDevelopSubmit('developForm')">确定</el-button>
            <el-button size="small" @click="developDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ActivistRegister from '../../common/develop_party_members/ActivistRegister.vue'
  export default {
    components: {
      'my-register-form': ActivistRegister,
    },
    data() {
      return {
        isLoad:           true,
        orgCode:          sessionStorage.getItem('orgCode'),
        orgId:            sessionStorage.getItem('orgId'),
        userData:         JSON.parse(sessionStorage.getItem('userData')),
        dialogVisible:    false,
        elementPageData: {               //分页需要的数据
            defaultData:  this.$util.elementPagination,
            pageNum:      this.$util.elementPagination.pageNumDefault,
            pageSize:     this.$util.elementPagination.pageSizeDefault,
        },
        listData:         {rows: [], total: 0,},
        developDialogVisible: false, //列为发展对象弹框属性
        developUserName:      null, //发展对象姓名
        developForm: {
          "applicationTime": null,
          "introducer":      new Array(2),
          "orgId":           sessionStorage.getItem('orgId'),
          "userId":          null,
        },
        isDialogClose:    false,  //为true，表示弹框已被关闭清空表单数据
        userList:         [],
      }
    },
    mounted() {
      this.getQueryList();
      this.getQueryUserList();
      
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 查询非党员列表
      */
      getQueryUserList(){
        this.$request.requestAxios('get', basePath + '/hr_join_party_application/nopartymember', {params: {status: 3}},
          (response) => {
            let responseData = response.data;
            this.userList = responseData.data;
          }, (error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/hr_join_party_application/nopartymember');
        });
      },
      /*
       * 关闭弹框
       */
      dialogClose(){
        this.isDialogClose = true;
      },
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
              status:   3,
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
      /*
       * 登记成功或失败后，关闭弹窗
       */
      registerSuccessFun(){
        this.dialogVisible = false;
       },
      onDevelopSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', `${this.$util.basePath}/hr_join_party_application/develop/from_org/${this.orgCode}`, this._onDevelopSubmitParams(), 
              (response) => {
                this.getQueryList();
                this.$message.success(response.data.meta.message);
                this.developDialogVisible = false;
              }, (error, status) => {
                status == 200 ? this.$message.error(error.data.meta.message) : 
                  this.$message.error(`${this.$util.basePath}/hr_join_party_application/develop/from_org/${this.orgCode} - 失败`);
                this.developDialogVisible = false;
              },
             );
          } else {
            return false;
          }
        });
      },
      _onDevelopSubmitParams(){
        this.developForm.applicationTime = new Date(this.developForm.applicationTime).getTime();
        return this.developForm;
      }
    }
  }
</script>