/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 上课管理
**************************************/ 
<template>
  <div>
    <!-- 查询条件 -->
    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline" :gutter="20">
      <el-form-item label="发布时间：">
        <el-date-picker class="line" type="daterange" placeholder="选择日期" v-model="form.dateRange"></el-date-picker>
      </el-form-item>
      <el-form-item label="讲师：">
        <el-input type="text" v-model="form.docent"></el-input>
      </el-form-item>
      <!-- <el-form-item label="党课分类：">
        <el-select v-model="form.lectureType">
          <el-option v-for="(item, index) in typeListData" :key="index" :label="item.typeName" :value="item.typeId"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="search-input-icon ">
          <!-- <i class="el-icon-search"></i> -->
          <el-input style="width: 500px" placeholder="党课关键字" :title="form.keyWords" v-model="form.keyWords"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="onSubmit" type="primary" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 课程列表 -->
    <div v-if="listData" class="course-list-manage">
      <el-row v-loading="isLoad" class="content-wrapper-innter" :gutter="60">
        <el-col class="single-course-manage mart20" :span="8" v-for="(item, index) in listData.rows" :key="index">
          <div class="grid-content single-course-grid-content-manage bg-purple-dark">
            <p class="title">
              <span>{{item.lectureTitle}}</span>
              <img @click="collecOrNoClick(item)" v-if="item.isCollect" class="fr" src="../../../images/link.png">
              <img @click="collecOrNoClick(item)" v-else class="fr" src="../../../images/no_link.png">
            </p>
            <p class="img-wrapper" @click="jumpDetailPage(item)"><img :src="item.lectureCovers" alt="暂无图片"/></p>
            <p class="lecture-docent-wrapper"><span>讲师：{{item.lectureDocent}}</span> <span class="fr">{{_convertDate(item.created)}}</span> </p>
            <p class="lecture-like-wrapper"><span><img src="../../../images/urser_black_manage.png">已有{{item.lectureLike}}个人参与</span><span class="fr"><img src="../../../images/Fabulous_manage.png">{{item.lectureLike}}个赞</span></p>
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24" >
          <div class="grid-content bg-purple-dark">
              <el-pagination :span="24" class="ce-pagination"
                @size-change="handleSizeChange($event)"
                @current-change="handleCurrentChange($event)"
                :current-page="currentPage4"
                :page-sizes="[9, 18, 36, 72]"
                :page-size="9"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listData.total">
              </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>s

<script>
  export default {
    props: {
      listType: {
        type: Boolean,
        required: true,
        default: false,   //为false表示查询所有课程数据，true查询收藏课程数据
      },
      refresh: {
        default: 0, 
      },
      routerName: {   //路由名字
        required: true,
        default: 'Course_Detail', 
      }
    },
    data() {
      return {
        isLoad: true, //等待事件
        orgCode:  sessionStorage.getItem('orgCode'),   //党组织code
        userData:  JSON.parse(sessionStorage.getItem('userData')),   //党组织code
        elementPageData: {
          defaultData: this.$util.elementPagination,  //分页需要的数据
          pageNum: 1,  //查询课程需要的数据
          pageSize: 9, //查询课程需要的数据
        },  //分页参数

        form: {
          docent: null,      //讲师
          dateRange: null,   //时间段
          lectureType: null, //讲课类型
          keyWords: null,    //关键字
        },
        listData: { rows:[], total: 0},      //课程数据
        // typeListData: [],                    //党课类型列表
      }
    },
    mounted() {
      this.getQueryCourseList();
      // this.getQueryTypeList();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 提交查询课程列表数据
      */
      onSubmit(){
        this.getQueryCourseList();
        // this.getQueryTypeList();      
      },
      /*
      * 查询课程列表
      */
      getQueryCourseList(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/l_lecture/list', this._getQueryCourseListParams(),
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.listData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/l_lecture/list - 失败');
            self.isLoad = false;
          });
      },
      /*
      * 查询课程列表-查询条件
      */
      _getQueryCourseListParams(){
        return { 
          params: {
            collect:         this.listType,
            startDate:       this.form.dateRange ? new Date(this.form.dateRange[0]).getTime() : null,
            endDate:         this.form.dateRange ? new Date(this.form.dateRange[1]).getTime() : null,
            docent:          this.form.docent ? this.form.docent : null,
            keyWords:        this.form.keyWords ? this.form.keyWords : null,
            lectureType:     this.form.lectureType ? this.form.lectureType : null,
            lectureOrgCode:  this.routerName == 'Course_Detail' ? this.orgCode : this.userData.partyOrgCode, //为Course_Detail表示需要组织Code，否者是个人中心调用组件则不需要组织Code
            pageSize:        this.elementPageData.pageSize,
            pageNum:         this.elementPageData.pageNum,

          }
        }
      },
      /*
      * 查询党课分类列表
      */
      // getQueryTypeList(){
      //   let self = this;
      //   self.$request.requestAxios('get', basePath + '/l_type/list', "",
      //     function(response) { //请求成功的回调...
      //       var responseData = response.data;
      //       self.typeListData = responseData.data;
      //       self.isLoad = false;
      //     },function(error, status) {// 请求失败回调函数...
      //       status == 200 ? self.$message.error(error.data.meta.message) :
      //                       self.$message.error('/l_type/list - 失败');
      //       self.isLoad = false;
      //     });
      // },
      /*
      * 改变当前页码触发此事件，并广播paginationChange事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryCourseList();
      },
      /*
      * 改变每页条数触发此事件，并广播paginationChange事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryCourseList();
      },
      /*
      * 收藏/取消党课
      * @param { object } itemData 单个课程数据
      */
      collecOrNoClick(itemData){
        let self = this;
        self.$request.requestAxios('patch', basePath + '/a_collection/' + itemData.lectureId + '/2/collect/toggle', "",
          function(response) { //请求成功的回调...
            let responseData = response.data;
            // -------- 刷新列表页
            self.getQueryCourseList();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_collection/' + itemData.lectureId + '/2/collect/toggle - 失败');
        });
      },
      /*
      * 点击跳转详情页
      * @param { object } dataItem 课程
      */
      jumpDetailPage(dataItem){
        this.$router.push({name: this.routerName , params: {id: dataItem.lectureId} } );
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月' +
               new Date(date).getDate() + '日' ;
      },
    }
  }
</script>