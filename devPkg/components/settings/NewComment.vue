/*********************新评论*************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-09
/****************************************************/
<template>
  <div v-loading="loading">
    <!-- 文章表格 -->
    <el-table
      ref="multipleTable"
      stripe
      :data="articleTableData.rows"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="multiSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"
        width="55">
      </el-table-column>
      <el-table-column
        prop="commentContent"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="author"
        label="评论文章"
        width="200">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="作者"
        width="80">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="submitArticle(scope, 'single')" type="primary" size="small">发布</el-button>
          <el-button @click="showRejectDialog(scope)" type="danger" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="under-table">
      <el-button :disabled="multipleSelection.length <= 0" type="primary" @click="submitArticle(null, 'multi')">批量发布</el-button>
    </div> 
    <!-- 分页 -->
    <div class="page-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleTableData.total">
      </el-pagination>
    </div>

    <!-- 驳回dialog -->
    <el-dialog
      title="驳回"
      width="35%"
      :visible.sync="rejectDialogVisible">
      <el-form ref="form" :model="rejectForm" size="small">
        <el-form-item>
          <el-input type="textarea" rows="5" v-model="rejectForm.rejectReason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectArticle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        articleTableData:  {//文章表格数据
          rows: [],
          total: null
        },  
        //articleTable
        rejectDialogVisible: false,
        rejectForm: {
          rejectReason: null
        },
        tempChoosedItem:   [],  //当前选中
        
        multipleSelection: [],

        currentPage: 1,  //当前页
        perPage: 5,
        loading: false,
      }
    },
    mounted: function () {
      this.getTableData()
    },
    methods: {
      /**
       * 多选操作
       * @param  {array} array  当前选中的元素数组
       * @return none
       */
      multiSelectionChange (array) {
        var self = this
        self.multipleSelection = []
        array.forEach(function(item, index) {
          self.multipleSelection.push(item.id)
        })
      },
      /**
       * 发布文章
       * @param  {object} item table Item(通过scope返回)
       * @return none
       */
      submitArticle (item, typeStr) {
        let self = this;

        let config = {
          method: "post",
          url: `${basePath}/a_reviewes/examine`,
          data: {
            fromId: null,
            status: 2
          }
        }
        if(typeStr == "multi") {
          config.data.fromId = self.multipleSelection
        } else {
          config.data.fromId = [item.row.id]
        }
        self.$confirm("确定要发布吗?", "发布", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 点击确定
          self.$request.requestAxios(config.method, config.url, config.data,
            (response) => {
              self.$message({
                message: "发布成功!",
                type: "success"
              })
              self.getTableData()
            },
            (error) => {
              self.$message.error(error)
            }
          )
        }).catch(() => {})
      },
      /**
       * 显示驳回dialog
       * @param  {object} item 当前操作的表格元素
       * @return none
       */
      showRejectDialog (item) {
        this.rejectForm.rejectReason = null;
        this.rejectDialogVisible     = true;
        this.tempChoosedItem         = item;
      },
      /**
       * 驳回文章
       * @param  {object} item table Item(通过scope返回)
       * @return none       
       * */
      rejectArticle () {
        let self = this
        let config = {
          method: "post",
          url:    `${basePath}/a_reviewes/examine`,
          data: {
            fromId: [self.tempChoosedItem.row.id],
            status: 3
          }
        }
        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            self.$message({
              message: "驳回成功!",
              type: "success"
            })
            self.getTableData()
            self.rejectDialogVisible = false
          },
          (error) => {
            self.$message.error(error)
          }
        )
      },
      /**
       * 获取表格数据
       * @param  {需要查询的页码} page 默认不需要传,查询特定页则传入对应的页数
       * @return {[type]}      [description]
       */
      getTableData: function (page) {
        let self = this;
        self.loading = true
        let config = {
          method: "get",
          url:    `${basePath}/a_reviewes/list`,
          params: {
            pageNum: page || self.currentPage,
            pageSize: self.perPage,
            status: 1
          }
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            self.loading = false
            self.articleTableData = response.data.data
            if(response.data.data.rows <= 0 && self.currentPage > 0 ) {
              //当前页没有数据, 则查询前一页
              self.getTableData(self.currentPage -= 1)
            }
          },
          (error) => {
            self.loading = false
            self.$message.error(error)
          }
        )
      },
      /**
       * 点击分页 > 每页条数的回调
       * @param  {number} val 每页的显示条数
       * @return none
       */
      handleSizeChange(val) {
        this.perPage = val
        this.getTableData()
        console.log(`每页 ${val} 条`);
      },
      /**
       * 点击分页 > 每页条数的回调
       * @param  {number} val 当前点击的页数
       * @return none
       */
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableData()
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .type-text-in-table {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
  }
  .under-table {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #fff;
  }
  .page-wrap {
    background: #fff;
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>