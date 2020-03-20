/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 我的积分
**************************************/ 
<template>
  <div class="personal-message content-manage personal-top">
    <!-- 个人基本信息 -->
    <div class="personal-wrapper">
      <h1 class="title marb20">|| 积分列表</h1>
      <table style="width: 100%" class="el-table thead integral-table">
        <thead>
          <tr>
            <th class="is-leaf" v-for="(itemKey,index) in scoreData">{{itemKey.name}}</th>
            <th class="is-leaf">总计</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="marl20" v-for="(itemValue,index) in scoreData">{{itemValue.score}}</td>
            <td class="marl20">{{scoreTotal}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 积分历史 -->
    <div  class="personal-wrapper">
      <h1 class="title">|| 积分历史</h1>
      <el-card class="box-card">
        <div v-for="(item,index) in historyData.rows" 
             :key="index" 
             class="text item padb20">
             {{item.date}}：
             <span v-if="item.fromType == 18">“{{item.typeName }}”，获得积分“{{item.score}}”分。</span>
             <span v-else>
              你对{{item.typeName }} 《{{item.name }}》进行了“{{ item.operation}}”的操作，并获得积分“{{item.score}}”分。
             </span>
        </div>
      
      <div class="element-pagination-manage marb20">
          <el-pagination :span="24" class="ce-pagination"
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="currentPage4"
            :page-sizes="elementPageData.defaultData.pageSizes"
            :page-size="elementPageData.defaultData.pageSizeDefault"
            layout="total, sizes, prev, pager, next, jumper"
            :total="historyData.total">
          </el-pagination>
        </div>
        </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      /*
      * 总积分
      */
      scoreTotal(){
        // debugger
        let num = 0;
        $.each(this.scoreData, function(index,item){
          num += parseInt(item.score);
        })
        return num;
      },
     },
    components:{
    },
    data() {
      return {
        userData: JSON.parse(sessionStorage.getItem('userData')),
        orgId: 1, //暂定为1，后期可能会取消
        scoreData: [],
        elementPageData: {               //分页需要的数据
          defaultData:  this.$util.elementPagination,  
          pageNum:      this.$util.elementPagination.pageNumDefault,  
          pageSize:     this.$util.elementPagination.pageSizeDefault, 
        },
        historyData: { rows:[], total:0 },
      }
    },
    mounted() {
      this.getQueryScoreData();
      this.getQueryScoreHistoryData();
    },
    methods:{
      /*
      * 查询积分数据
      */
      getQueryScoreData(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/hr_user_score_count/score/count',"",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.scoreData = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/hr_user_score_count/score/count - 失败');
          });
      },
      /*
      * 查询积分历史记录
      */
      getQueryScoreHistoryData(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/hr_user_score/score/history', self._historyParams(),
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.historyData = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/hr_user_score/score/history - 失败');
          });
      },
      /*
      * 历史记录参数
      */
      _historyParams(){
        return {
          params: {
            pageNum: this.elementPageData.pageNum,
            pageSize: this.elementPageData.pageSize,
          }
        }
      },
      /*
      * 改变当前页码触发此事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQueryScoreHistoryData();
      },
      /*
      * 改变每页条数触发此事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQueryScoreHistoryData();
      },
    }
  }
</script>
<style>
  tr:nth-child(2n){ background: #FAFAFA; }
  .integral-table td{
    padding: 14px;
  }
</style>