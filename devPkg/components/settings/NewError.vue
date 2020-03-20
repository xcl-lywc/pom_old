/*********************新报错*************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-14
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
        prop="errorContent"
        label="报错内容">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="提错人"
        width="80">
      </el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button @click="submitArticle(scope, 'single')" type="primary" size="small">发布</el-button>
          <el-button :disabled="scope.row.fromType != '1'" @click="clickEdit(scope)" type="default" size="small">修改</el-button>
          <el-button @click="showRejectDialog(scope)" type="danger" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="under-table">
      <el-button :disabled="multipleSelection.length <= 0" type="primary" @click="submitArticle(null, 'multi')">批量发布</el-button>
      <el-button :disabled="multipleSelection.length <= 0" type="danger" @click="rejectMulti">批量驳回</el-button>
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
        orgCode: sessionStorage.getItem("orgCode"),
        articleTableData:  {//文章表格数据
          rows: [],
          total: null
        },  
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
          url:    `${basePath}/a_errors/examine`,
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
       * 批量驳回
       * @return {[type]} [description]
       */
      rejectMulti () {
         this.$confirm("确定要驳回吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          this.rejectArticle(this.multipleSelection)
        }).catch(()=> {

        })
      },
      /**
       * 驳回文章
       * @param  {object} item table Item(通过scope返回)
       * @return none       
       * */
      rejectArticle (idArray) {
        let self = this
        let config = {
          method: "post",
          url:    `${basePath}/a_errors/examine`,
          data: {
            fromId: idArray || [self.tempChoosedItem.row.id],
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
          url: `${basePath}/a_errors/list/from_org/${self.orgCode}`,
          params: {
            pageNum:  page || this.currentPage,
            pageSize: this.perPage,
            status:   1,
            fromType: 1
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
      },
      /**
       * 点击分页 > 每页条数的回调
       * @param  {number} val 当前点击的页数
       * @return none
       */
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableData()
      },
      /**
       * 点击编辑按钮, 跳转
       * @param  {object} data 表格的scope对象
       * @return none
       */
      clickEdit (data) {
        if(data.row.fromType == "1") {
          this.$router.push({
            name: "Settings_Edit_Article",
            params: {id: data.row.fromId}
          })
        }
      },
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