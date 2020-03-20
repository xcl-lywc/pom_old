/*****************************************
*  create by xieyuanyuan date 2018/05/29
*  个人中心 - 我的收藏 - 文章
******************************************/ 
<template>
  <div>
    <div class="course-list-manage">
      <div class="content-wrapper-innter">
        <!-- 查询条件 -->
        <el-form ref="form" :model="form" class="sub-query-manage" :gutter="20">
          <el-row>
            <el-form-item class="course-form-item-manage">
              <el-col :span="4" class="pad-r20">
                <el-form-item>
                  <el-select @change="classificationChange" style="width: 100%" v-model="form.classification">
                    <el-option label="分类" value="1"></el-option>
                    <el-option label="专题" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="pad-r20">
                <el-form-item>
                  <el-select @change="typeOrSpecialChange" style="width: 100%" v-model="form.typeOrSpecial">
                    <el-option v-if="form.classification == 1" label="全部分类" value=""></el-option>
                    <el-option v-else label="全部专题" value=""></el-option>

                    <el-option v-for="(item, index) in articletypes" :label="item.atName" :value="item.atId" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16" class="pad-r20 search-input-icon">
                <el-form-item>
                  <i class="el-icon-search" @click="onSubmit"></i>
                  <el-input placeholder="请输入内容" v-model="form.keyWords"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <!-- 内容块 -->
        <el-table
          class="mart20 marb20"
          :stripe="true"
          :data="listData.rows">
          <el-table-column
            label="题目">
            <template slot-scope="scope">
              <router-link :to="{name: 'News_Detail', params: {id: scope.row.id}}">{{scope.row.articleName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="收藏时间">
            <template slot-scope="scope">
              {{_convertDate(scope.row.collectTime)}}
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="isCollectionNews(scope.row)">取消收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-row>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoad: true,       //等待事件
        elementPageData: {  //分页参数
          defaultData: this.$util.elementPagination,  //分页需要的数据
          pageNum: this.$util.elementPagination.pageNumDefault,  //查询课程需要的数据
          pageSize: this.$util.elementPagination.pageSizeDefault, //查询课程需要的数据
        },  
        articletypes:     [],  //分类列表
        form: {
          classification: '1',
          typeOrSpecial:  '', //分类或者专题
          keyWords:       null, //关键字
        },
        listData: { rows:[], total: 0},      //课程数据
      }
    },
    mounted() {
      this.getArticletypes();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 大类别改变查询一次分类列表
      */
      classificationChange(){
        this.getArticletypes();
      },
      /*
      *  子分类改变查询文章列表数据
      */
      typeOrSpecialChange(){
        this.getQueryList();
      },
      /*
      * 查询分类列表
      */
      getArticletypes(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/a_types/articletypes/' + this.$util.homeFromOrg, {params: { type: self.form.classification}},
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.articletypes = responseData.data;
            self.form.typeOrSpecial = '';
            // ------------- 默认选中第一个 -------------
            // self.form.typeOrSpecial = responseData.data[0].atId;

            // ---- 同步查询 
            self.getQueryList();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_types/articletypes - 失败');
          });
      },
      /*
      * 提交查询课程列表数据
      */
      onSubmit(){
        this.getQueryList();
      },
      /*
      * 查询课程列表
      */
      getQueryList(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/a_info/collect/list/' + this.$util.homeFromOrg, this._getQueryListParams(),
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.listData = responseData.data;
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            self.isLoad = false;
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_info/collect/list - 失败');
          });
      },
      /*
      * 查询课程列表-查询条件
      */
      _getQueryListParams(){
        let paramsData = {
            keyWords: this.form.keyWords,
            pageSize: this.elementPageData.pageSize,
            pageNum: this.elementPageData.pageNum,
          }
        if(this.form.classification == '1'){ //分类
          paramsData.type = this.form.typeOrSpecial;
        }else{
          paramsData.special = this.form.typeOrSpecial;
        }

        return { params: paramsData}
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
      * 收藏/取消党课
      * @param { object } itemData 单个课程数据
      */
      collecOrNoClick(itemData){
        let self = this;
        self.$request.requestAxios('patch', basePath + '/a_collection/' + itemData.lectureId + '/2/collect/toggle', "",
          function(response) { //请求成功的回调...
            let responseData = response.data;
            // -------- 刷新列表页
            self.getQueryList();
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
        console.log(dataItem)
        this.$router.push({name: 'Course_Detail' , params: {id: dataItem.lectureId} } );
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月' +
               new Date(date).getDate() + '日' ;
      },
      /*
      * 取消收藏
      * @return data
      */
      isCollectionNews(rowData) {  
        let self = this, data = null;
        self.$request.requestAxios('patch', basePath + '/a_collection/'+ rowData.id +'/1/collect/toggle',"", 
          function(respose) {// 请求成功回调函数... 
            self.$message('取消成功');
            self.getQueryList();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_collection/'+ self.newsId +'/1/collect/toggle - 失败')
        });
        // ------- 关闭弹框 ----------
        self.errorDialogVisible = false;
      },
    }
  }
</script>