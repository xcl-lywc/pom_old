/*******************************************************
 * author yuanyuan.xie  新闻递归 
 * date 2018/05/03 
 *******************************************************/
<template>
    <div v-loading="loading" class="pad20">
        <!-- 新闻 -->
        <ul class="padb20 mard20">
          <li v-for="(newItem, indexNew) in newsData.rows" :key="indexNew">
            <router-link :to="{name: 'News_Detail', params: {id: newItem.id} }" :key="newItem">
              <!-- <span class="fl padr5">{{indexNew+1}}.</span> -->
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
</template>
<script type="text/javascript">
    export default {
        name: 'items',
        props: {
            aTypeData: {    //类型数据
                required: true,
                type: Object,
                default:"",
            },
        },
        components: {},
        data() {
            return {
                loading: true,  //等待事件
                newsData:{              //新闻条数数据
                    rows: [], 
                    total: 0,
                }, 
                elementPageData: {               //分页需要的数据
                  defaultData:  this.$util.elementPagination,
                  pageNum:      this.$util.elementPagination.pageNumDefault,
                  pageSize:     this.$util.elementPagination.pageSizeDefault,
                },                   
            }
        },
        mounted(){
            this.getQueryNewsData(this.aTypeData)
        },
        methods: {
            /*
            * 改变当前页码触发此事件，并广播paginationChange事件
            * @param {number} val 当前页码
            */
            handleCurrentChange(val){
                this.elementPageData.pageNum = val;
                this.getQueryNewsData(this.aTypeData)
            },
            /*
            * 改变每页条数触发此事件，并广播paginationChange事件
            * @param {number} val 每页条数
            */
            handleSizeChange(val){
                this.elementPageData.pageSize = val;
                this.getQueryNewsData(this.aTypeData)
            },
            /*
            * 查询新闻数据
            * @param {{ object }} data 查询数据
            */
            getQueryNewsData(aTypeData){
                this.$request.requestAxios('get', basePath + '/a_info/article/list/from_org/' + this.$store.state.currentPartyOrg.code, this._queryNewsParams(), 
                  (respose) => {// 请求成功回调函数...
                    let resposeData = respose.data;
                    this.newsData.rows = resposeData.data.rows;
                    this.newsData.total = resposeData.data.total;
                    this.loading = false;
                  },(error,status) => {
                    status == 200 ? this.$message.error(error.data.meta.message) :
                                    this.$message.error('/a_info/article/list - 失败');
                    this.loading = false;
                  }
                );
            },
            _queryNewsParams(){
                // debugger
                return {
                  params: {
                      type:     this.aTypeData.atId,
                      pageSize: this.elementPageData.pageSize,
                      pageNum:  this.elementPageData.pageNum,
                  }
                } 
            },
            /*
            * 时间转换
            * @param {string} timeStamp 时间戳
            * @return time 返回转换后的时间
            */
            _dataCovert(timeStamp){
                return new Date(timeStamp).Format('yyyy-MM-dd');
            },
        }
    }
</script>