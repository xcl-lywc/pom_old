/*************************************
*  create by xieyuanyuan date 2018/07/06
*  首页管理 - 选票列表
**************************************/ 
<template>
  <el-main class="content-manage">
    <!-- 查询条件 -->
    <el-form ref="form" :model="form" :gutter="20" label-width="100px">
      <el-form-item label="主题名称：">
          <el-input v-model="form.ballotSpecial" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker class="line marr20" type="daterange" placeholder="选择日期" v-model="form.dateRange"></el-date-picker>
        <el-button  @click="onSubmit" type="primary" size="mini">搜索</el-button>
        <div class="fr add-btn-manage">
            <router-link :to="{name: 'Create_Vote', params:{id:'add'}}">
                <div class="fr add-btn-manage"><i style="font-size: 20px" class="el-icon-circle-plus-outline"></i></div>
            </router-link>
        </div>
      </el-form-item>
    </el-form>

    <!-- 课程列表 -->
    <div v-if="listData" class="course-list-manage">
        <!-- 列表内容 -->
        <div  v-loading="isLoad" class="content-wrapper-manage content-wrapper-manage_task">
            <div class="content-wrapper-innter">
                <div class="task-list metting-box-list" v-for="(item, index) in listData.rows" :key="index">  
                  <el-row class="title-message">
                    <el-col :span="12" class="title">
                      <i class="btn-del_font_red el-icon-error padr15" @click.stop="delVoteData(item)"></i>
                      <span style="cursor: initial;">关于《{{item.ballotSpecial}}》投票</span>
                    </el-col>
                    <el-col :span="4">
                      <span @click="" :title="item.content">创建者：{{item.creator}}</span>
                    </el-col>
                    <el-col :span="8" class="text-right">
                      <span @click="">
                        创建时间： {{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}
                      </span>
                    </el-col>
                  </el-row>
                  <p class="message-num metting-box">
                    <el-button type="text" @click=" $router.push({name: 'Create_Vote', params: {id: item.id} }) ">编辑选票</el-button>
                    <el-button type="text" @click=" $router.push({name: 'Vote_Detail', params: {id: item.id} }) ">查看详情</el-button>
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
  </el-main>
</template>

<script>
  export default {
    prop:{
      pageType: 'org', 
    },
    data() {
      return {
        isLoad: true, //等待事件
        orgCode:  sessionStorage.getItem('orgCode'),   //党组织code
        elementPageData: {               //分页需要的数据
          defaultData:  this.$util.elementPagination,  
          pageNum:      this.$util.elementPagination.pageNumDefault,  
          pageSize:     this.$util.elementPagination.pageSizeDefault, 
        },
        form: {
          dateRange: null,    //时间段
          ballotSpecial: null,//主题
        },
        listData: { rows:[], total: 0},      //课程数据
      }
    },
    mounted() {
      this.getQueryList();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 提交查询课程列表数据
      */
      onSubmit(){
        this.getQueryList();
      },
      /*
      * 查询选票列表
      */
      getQueryList(){
        this.$request.requestAxios('post', `${this.$util.basePath}/v_ballot/list/from_org/${this.orgCode}`, this._getQueryListParams(),
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
      /*
      * 查询列表-查询条件
      */
      _getQueryListParams(){
        return { 
            beginTime:       this.form.dateRange ? new Date(this.form.dateRange[0]).getTime() : null,
            endTime:         this.form.dateRange ? new Date(this.form.dateRange[1]).getTime() : null,
            ballotSpecial:   this.form.ballotSpecial,
            pageSize: this.elementPageData.pageSize,
            pageNum: this.elementPageData.pageNum,
        }
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
       * 删除制定一条的选票数据
       */
      delVoteData(item){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._delVoteData(item);
        }).catch(() => {
                   
        });
        
      },
      _delVoteData(item){
        this.$request.requestAxios('delete', `${this.$util.basePath}/v_ballot/delete/${item.id}/from_org/${this.orgCode}`, '',
          (response) => { //请求成功的回调...
            this.$message.success(response.data.meta.message);
            this.getQueryList();
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
              this.$message.error(`${this.$util.basePath}/v_ballot/delete/${item.id}/from_org/${this.orgCode} - 失败`);
        });
      }
    }
  }
</script>