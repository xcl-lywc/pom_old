/*************************************
*  create by xieyuanyuan date 2018/05/11
*  表格组件
**************************************/
<template>
  <!-- 表格 -->
  <div>
    <!-- 编辑表格时显示 -->
    <el-table
      v-if="!tableParams.isShowHeader"
      :stripe="true"
      :data="tableData"
      tooltip-effect="dark"
      border
      center
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- 多选 -->
      <el-table-column
        type="selection"
        width="55"
        v-if="tableParams.isOperation && isEditPage && tableParams.operationType == 'checkbox'">
      </el-table-column>
      <!-- 单选 -->
      <el-table-column
        width="30px"
        v-if="tableParams.isOperation && isEditPage && tableParams.operationType == 'radio'">
        <template slot-scope="scope">
          <el-radio 
            v-model="tableParams.value" 
            :label="scope.row.id">
          </el-radio> 
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableParams.cols"
        :key="index"
        :prop="item.keyName"
        :label="item.name">
        <template slot-scope="scope">
          {{ _convertValue(item,scope.row)}}
        </template>
      </el-table-column>
    </el-table>

    <!-- 历史记录显示 -->
    <table class="table-border-com" v-if="tableParams.isShowHeader" style="width: 100%">
      <tr>
        <th v-for="(item, index) in tableParams.cols"
          :key="index">{{item.name}}</th>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    props:{
      tableParams: {  
          required: true,
          // default: [],
      },
      taskId: {        
          required: true,
      },
      instanceId: {   
          required: true,
      },
      pageType: 'org', 
      isEditPage: true, //true为编辑状态，false为只显示，
    },
    data() {
        return {
          tableData: [],
          value: [],
        }
    },
    mounted() {
      // ---- 当不只是显示表头的时候才会查询数据 
      if(!this.tableParams.isShowHeader) this.getTableData();
    },
    watch:{
    },
    destoryed() {

    },
    methods:{
      /*
       * 查询表格数据
       */
      getTableData() {
        // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this
        this.$request.requestAxios('get', `${this.$util.basePath}/${this.tableParams.requestUrl}`, this._getTableDataParams(),
            (response) => {
                this.tableData = response.data.data;
            },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) :
                             this.$message.error(`${this.$util.basePath}/${this.tableParams.requestUrl}`);
         });
       },
      _getTableDataParams(){
        return {
          params: {
            taskId:       this.taskId,
            instanceId:   this.instanceId,
            partyOrgCode: this.pageType == 'org' ? sessionStorage.getItem('orgCode') : null,
           }
         }
       },
       /*
        * 转换数据
        * @params {object} item 表头数据
        * @params {object} row 当前行数据
        */
       _convertValue(item, row){
        if(item.dataType == 'text'){ //文本
          return row[item.keyName];
        }else if(item.dataType == 'controlTable'){ //对照表
          return this.$util.controlTable(row[item.keyName])
        }else{ //时间
          return this.$util._convertDate(row[item.keyName], item.dataType);
        }
       },
      handleSelectionChange(val){   
        this.tableParams.value = [];
        val.forEach((item) => {
          this.tableParams.value.push(item.questionId ? item.questionId : item.id);
        }) 
      },
    }
  }
</script>
<style type="text/css">
  .table-border-com th{
    border: 1px solid #ececec;
  }
</style>