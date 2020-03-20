/****************************************
*  create by xieyuanyuan date 2018/05/21
*  首页管理-新闻列表
****************************************/
<template>
  <div class="row">
    <!-- 面包屑 -->
    <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{paramObject.atName}}</el-breadcrumb-item>
    </el-breadcrumb> 
    <div class="col-xs-12 mr-bot20 news-types-model">
      <div class="pad20">
        <!-- 新闻 -->
        <ul class="padb20 mard20">
          <li v-for="(newItem, indexNew) in newsData.rows" :key="indexNew">
            <router-link :to="{name: 'News_Detail', params: {id: newItem.id} }" :key="newItem">
              <span class="fl padr5">{{indexNew+1}}.</span>
              <span class="fl text">{{newItem.articleName}}</span>  
              <span class="fr">{{_dataCovert(newItem.createTime)}}</span>
            </router-link>
          </li>
        </ul>
        <div class="clear"></div>
        <!-- 分页 -->
        <el-pagination class="ce-pagination"
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
          :current-page="currentPage4"
          :page-sizes="elementPageData.defaultData.pageSizes"
          :page-size="elementPageData.defaultData.pageSizeDefault"
          layout="total, sizes, prev, pager, next, jumper"
          :total="newsData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        elementPageData: {               //分页需要的数据
          defaultData:  this.$util.elementPagination,
          pageNum:      this.$util.elementPagination.pageNumDefault,
          pageSize:     this.$util.elementPagination.pageSizeDefault,
        },
        allarticletypes: {newsData: {}, types: {}}, //新闻，栏目数据
        paramObject: JSON.parse(this.$route.params.object),
        newsData: {rows:[], total: 0,}
      }
    },
    created(){
      
    },
    mounted(){
      this.getQueryNewsData();
    },
    methods: {
      /*
      * 查询新闻数据
      */
      getQueryNewsData(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/a_info/article/list/from_org/' + this.$store.state.currentPartyOrg.code, self._getQueryNewsParams(),
          function(respose) {// 请求成功回调函数...
            var resposeData = respose.data;
            self.newsData.rows = resposeData.data.rows;
            self.newsData.total = resposeData.data.total;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_info/article/list - 失败')
          }
        );
      },
      _getQueryNewsParams(){
        
        let self = this;
        let paramsData = {
          params: {
              pageSize: this.elementPageData.pageSize,
              pageNum:  this.elementPageData.pageNum,
          }
        } 
        if(self.paramObject.atType == 2){
          paramsData.params.special = self.paramObject.atId;
        }else{
          paramsData.params.type = self.paramObject.atId;
        }
        return paramsData;
      },
      /*
      * 时间转换
      * @param {string} timeStamp 时间戳
      * @return time 返回转换后的时间
      */
      _dataCovert(timeStamp){
          return new Date(timeStamp).Format('yyyy-MM-dd');
      },
      /*
      * 改变当前页码触发此事件，并广播paginationChange事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
          this.elementPageData.pageNum = val;
          this.getQueryNewsData()
      },
      /*
      * 改变每页条数触发此事件，并广播paginationChange事件
      * @param {number} val 每页条数
      */
      handleSizeChange(val){
          this.elementPageData.pageSize = val;
          this.getQueryNewsData()
      },
    }
  };
</script>
