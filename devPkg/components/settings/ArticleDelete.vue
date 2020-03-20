/*********************文章删除*************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-09
/****************************************************/
<template>
  <div v-loading="loading">
    <el-form :model="searchForm" ref="searchForm" label-width="100px" :inline="true" >
      <el-form-item label="分类" prop="type">
        <el-select v-model="searchForm.type">
          <el-option v-for="(item, index) in typeList" :label="item.atName" :key="item.atId" :value="item.atId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专题" prop="special">
        <el-select v-model="searchForm.special">
          <el-option v-for="(item, index) in specialList" :label="item.atName" :key="item.atId" :value="item.atId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="keyWords">
        <el-input v-model="searchForm.keyWords"></el-input>
      </el-form-item>
      </el-form-item>
        <el-button type="primary" @click="getTableData" size="small">查询</el-button>
        <el-button type="default" @click="resetForm" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章表格 -->
    <el-table
      ref="multipleTable"
      stripe
      :data="articleTableData.rows"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="55">
      </el-table-column>
      <el-table-column
        prop="articleName"
        label="文章题目">
      </el-table-column>
      <el-table-column
        prop="type"
        label="分类"
        width="160">
        <template slot-scope="scope">
          <el-tooltip v-for="item in scope.row.type" :key="item.atName + item.atId" effect="dark" :content="item.atName" placement="left-start">
            <div class="type-text-in-table">{{ item.atName }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="80">
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click="$router.push({name: 'Settings_Article_Detail', params: { id: scope.row.id, routername: 'Settings_Article_Delete' }})" type="default" size="small">查看</el-button>
          <el-button @click="clickEdit(scope)" type="default" size="small">修改</el-button>
          <el-button @click="deleteArticle(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="under-table">
      <el-button :disabled="multipleSelection.length <= 0" type="primary" @click="submitArticle(null, 'multi')">批量发布</el-button>
    </div> --> 
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
        searchForm: { //搜索表单
          type:     null,
          special:  null,
          keyWords: null
        },
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
        perPage:     5,
        loading: false,

        orgCode:  sessionStorage.getItem("orgCode"),

        typeList:    [],
        specialList: [],
      }
    },
    mounted: function () {
      this.getTypeSpecialList(1, "typeList")
      this.getTypeSpecialList(2, "specialList")
      this.getTableData()
    },
    methods: {
      /**
       * 根据类型获取分类/专题list数据
       * @param  {number} type 分类1 专题2
       * @param  {[type]} target 保存数据的名称
       * @return {[type]}      [description]
       */
      getTypeSpecialList(typeNum, target) {
        let self = this
        let config = {
          method: "get",
          url: `${basePath}/a_types/articletypes/from_org/${self.orgCode}`,
          params: {
            type: typeNum
          }
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params},
            (response) => {
              self[target] = response.data.data
            },
            (error) => {
              self.$message.error(error)
            }
          )
      },
      /**
       * 删除文章
       * @param  {object} item table Item(通过scope返回)
       * @return none       
       * */
      deleteArticle (id) {
        let self = this

        let config = {
          method: "delete",
          url: `${basePath}/a_info/delete/${id}/from_org/${self.orgCode}`,
        }

        self.$confirm("确定要删除吗?", "删除", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 点击确定
          self.$request.requestAxios(config.method, config.url, config.data,
            (response) => {
              self.$message.success("成功")
              self.getTableData()
            },
            (error) => {
              self.$message.error(error)
            }
          )
        }).catch(() => {})
      },
      /**
       * 获取表格数据
       * @param  {需要查询的页码} page 默认不需要传,查询特定页则传入对应的页数
       * @return {[type]}      [description]
       */
      getTableData () {
        let self = this;
        self.loading = true
        let form = JSON.parse(JSON.stringify(this.searchForm))

        form.pageNum  = self.currentPage
        form.pageSize = self.perPage

        let config = {
          method: "get",
          url: `${basePath}/a_info/article/list/from_org/${self.orgCode}`,
          params: form
        }

        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            self.loading = false
            self.articleTableData = response.data.data
            // if(response.data.data.rows <= 0 && self.currentPage > 0 ) {
            //   //当前页没有数据, 则查询前一页
            //   self.getTableData(self.currentPage -= 1)
            // }
          },
          (error) => {
            self.loading = false
            self.$message.error(error)
          }
        )
      },
      resetForm () {
        this.$refs.searchForm.resetFields();
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
        this.$router.push({
          name: "Settings_Edit_Article",
          params: {id: data.row.id}
        })
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