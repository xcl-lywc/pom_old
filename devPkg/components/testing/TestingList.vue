/*********************图片考试 - 考试列表***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div style="position: relative;">
    <div class="add-button">
      <el-button icon="el-icon-circle-plus-outline" @click="formDialogVisible = true" circle></el-button>
    </div>
    <el-tabs v-model="activeTab" @tab-click="clickTab">
      <el-tab-pane label="待审批" :name="1"></el-tab-pane>
      <el-tab-pane label="未开始" :name="2"></el-tab-pane>
      <el-tab-pane label="进行中" :name="3"></el-tab-pane>
      <el-tab-pane label="已结束" :name="6"></el-tab-pane>
    </el-tabs>
    

    <div v-loading="cardsLoading" class="cards-wrap">
      <el-card v-for="(item, index) in listData" :key="`${index}列表`" class="card-item">
        <p class="title-wrap">
          <span class="text-bold">{{ item.theme }}</span> <span>创建者: {{ item.userName }}</span>
          <span class="right-date-time">创建时间: {{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh时：mm分')}}</span>
        </p>
        <p class="title-wrap">
          <span class="right-date-time">考试时间: {{$util._convertDate(item.beginTime, 'yyyy年MM月dd日 hh时：mm分')}} ~ {{$util._convertDate(item.endTime, 'yyyy年MM月dd日 hh时：mm分')}}</span>
        </p>
        <p class="bottom-wrap">
          <span><i class="fa fa-users"></i>&nbsp;{{ `${item.joinUser || 0}/${item.totalUser}` }}</span>
          <span><i class="fa fa-comments"></i>&nbsp;{{ item.commentNum }}</span>
          <span>总分: {{ item.totalScore }}</span>
          <span>
            <el-button v-show="activeTab == 6" @click="$router.push({name: 'Testing_Detail', params: {id: item.examId}})" type="primary" size="small">查看详情</el-button>
          </span>
        </p>
      </el-card>
      <p class="no-data-text" v-if="listData && listData.length <= 0"> 暂无数据 </p>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="currentPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      title="创建考试"
      :visible.sync="formDialogVisible"
      :close-on-click-modal="false"
      top="150px"
      width="65%"
      @close="resetForm"
      >
      <el-form ref="testForm" :model="testForm" :rules="rules" label-width="85px" v-loading="formDialogLoading">
        <div>
          <el-form-item
            label="考试主题:"
            prop="theme"
            :rules="{required: true, message: '请输入考试主题', trigger: 'blur'}">
            <el-input v-model="testForm.theme"></el-input>
          </el-form-item>
          <el-form-item
            label="考试要求:"
            prop="requirement"
            :rules="{required: true, message: '请输入考试要求', trigger: 'blur'}">
            <el-input v-model="testForm.requirement"></el-input>
          </el-form-item>

          <el-form :model="searchForm" ref="searchForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建时间" prop="date" label-width="85px">
                  <el-date-picker
                    class="fill-width"
                    type="daterange"
                    v-model="searchForm.date"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10" >
                <el-form-item label="关键字" label-width="85px">
                  <el-input class="fill-width" v-model="searchForm.theme" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button type="primary" size="small" @click="getListData('/test_papers/test_papers/choice/list', 'paperListData')">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            
            
          </el-form>
      
          <div v-loading="cardsLoading" class="cards-wrap">
            <el-table
              :data="paperListData"
              @cell-click="clickSingle"
              style="width: 100%; overflow-y: auto; max-height: 250px;"
              height="250">
              <el-table-column
                prop="theme"
                label="试卷题目">
                <template slot-scope="scope" >
                  <span :class="{'text-blue': tempTableId == scope.row.id}"><i class="el-icon-success" v-if="tempTableId == scope.row.id"></i> {{scope.row.theme}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="creatorName"
                label="创建者">
                <template slot-scope="scope">
                  <span :class="{'text-blue': tempTableId == scope.row.id}">{{ scope.row.creatorName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
                <template slot-scope="scope">
                  <span :class="{'text-blue': tempTableId == scope.row.id}">{{ $util._convertDate(scope.row.createTime, 'yyyy年MM月dd日 hh时：mm分') }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
            
        </div>
        <el-form-item
          label="已选试卷:"
          prop="testId"
          :rules="{required: true, message: '请在表格中选择一个试卷', trigger: 'change'}">
          <span>{{ tempTableName || "无" }}</span>
        </el-form-item>
        <el-form-item label="考试时间" prop="date">
          <el-date-picker
            class="fill-width"
            type="datetimerange"
            v-model="testForm.date"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参考组织" prop="partyOrgId" :rules="{required: true, message: '请选择一个参考组织', trigger: 'change'}">
          <el-tree
            ref="typeTree"
            :data="partyListData"
            class="tree-wrap"
            v-if="partyListData && partyListData.length > 0"
            node-key="id"
            :props="defaultProps"
            :expand-on-click-node="false"
            @node-click="clickPartyTree">
            <span class="custom-tree-node fill-width" slot-scope="{ node, data }">
              <div>
                <i v-if="data.id == testForm.partyOrgId" class="el-icon-circle-check text-blue"></i>
                <span :class="{'text-blue' : data.id == testForm.partyOrgId}">{{ node.label }}</span> 
                <i v-if="data.type == '4'" class="fa fa-star text-yellow" aria-hidden="true"></i>
              </div>
            </span>
          </el-tree>
        </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submitForm('testForm')">确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      let checkTime = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请选择时间区间'));
        } else {

          if(value[0] < new Date().getTime()) {
            callback(new Error('时间必须选择将来时间'));
          } else {
            if ((value[1] - value[0]) > 86400000) {
              callback(new Error('时间区间不可超过一天'));
            } else {
              callback();
            }
          }
        } 
      }
      return {
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),

        activeTab: 1,
        cardsLoading: false,

        listData: [],
        currentPage:     1,
        currentPerPage:  5,
        total:           0,

        formDialogVisible: false,
        formDialogLoading: false,
        testForm: {
          theme:       null,
          requirement: null,
          testId:      null,
          date:        null,
          userIds:     [JSON.parse(sessionStorage.getItem("userData"))["userId"]],
          partyOrgId:  null,
        },

        rules: {
          date: [
            { validator: checkTime, trigger: 'blur' },
            { required: true, message: '请选择时间', trigger: 'blur' },
          ],
        },
        searchForm: {
          theme: null,
          date:  [],
        },
        cardsLoading: false,

        paperListData: [],
        tempTableId:   null,
        tempTableName:   null,

        // currentPaperPage:     1,
        // currentPaperPerPage:  5,
        // totalPaper:           0,
        partyListData: [],   //组织列表list
        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },
      }
    },
    mounted () {
      this.getListData("/exames/exames/list", "listData")
      this.getPartyListData("partyListData")
    },
    methods: {
      /**
       * 获取列表数据
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getListData (url, target) {
        var self = this
        self.cardsLoading = true

        let search = {
          pageSize: self.currentPerPage,
          pageNum:  self.currentPage,
          status:   self.activeTab
        }

        if(target == "paperListData") {
          search.pageSize  = 999
          search.beginTime = self.searchForm.date[0]
          search.endTime   = self.searchForm.date[1]
          search.theme     = self.searchForm.theme
        }

        self.$request.requestAxios('post', `${basePath}${url}`, search, 
          (response) => {
            self[target] = response.data.data.rows;
            self.total   = response.data.data.total || 0;
            self.cardsLoading = false
          },
          (error) => {
            self.cardsLoading = false
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 获取党组织树
       * @return {[type]} [description]
       */
      getPartyListData (target) {
        let self = this
        self.$request.requestAxios('get', `${basePath}/party_orgs/partyorgstree`, null, 
          (response) => {
            self[target] = response.data.data
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
      },
      clickPartyTree (data) {
        this.testForm.partyOrgId = data.id
        this.$refs.testForm.validateField("partyOrgId")
      },
      /**
       * 点击顶部tabs 切换状态
       * @param  {[type]} tab   [description]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      clickTab (tab, event) {
        this.activeTab = tab.name
        this.currentPage = 1
        this.currentPerPage = 5
        this.getListData("/exames/exames/list", "listData")
      },
      clickSingle (item) {
        this.tempTableId = item.id
        this.$set(this.testForm, "testId", item.id)
        this.$refs.testForm.validateField("testId")
        this.tempTableName = item.theme
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this

        self.$refs[formName].validate((valid) => {
          if (valid) {
            
            let result = self.handleForm(formName)

            let config = {
              url:    `${basePath}/exames/exames/add/from_org/${self.orgCode}`,
              method: "post",
              data:   result
            }

            self.formDialogLoading = true

            self.$request.requestAxios(config.method, config.url, config.data, 
              (response) => {
                self.$message.success(response.data.meta.message)

                self.formDialogLoading = false
                self.formDialogVisible = false
                self.resetForm()
              },
              (error) => {
                self.$message.error(error.data.meta.message || "失败")
                self.formDialogLoading = false
              }
            )         
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        })
      },
      handleForm (formName) {

        let self = this
        let form = JSON.parse(JSON.stringify(self[formName]))

        form.beginTime = self[formName].date[0]
        form.endTime = self[formName].date[1]

        delete form.date

        return form
      },
      /**
       * 还原初始数据
       * @return {[type]} [description]
       */
      resetForm () {
        this.$refs["testForm"].resetFields()
        
        this.testForm = {
          theme:      null,
          testId:     null,
          date:       null,
          userIds:    [JSON.parse(sessionStorage.getItem("userData"))["userId"]],
          partyOrgId: null,
        }
        this.paperListData = [];
        this.tempTableId   = null;
        this.tempTableName = null;
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getListData("/exames/exames/list", "listData")
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getListData("/exames/exames/list", "listData")
      },
    }
  }
</script>

<style scoped>
  .text-blue {
    color: #409EFF;
  }
  .fill-width {
    width: 100%;
  }
  .card-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  .card-item:hover {
    box-shadow: 0 5px 15px #ccc;
    border: 1px solid #eee;
  }
  .title-wrap,
  .deadline,
  .bottom-wrap {
    margin: 8px 0;
  }
  .title-wrap,
  .bottom-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .card-item .type-icon {
    padding: 6.5px 15px;
    margin-right: 10px;
    color: #fff;
    background: #345173;
    border-radius: 5px;
  }
  .add-button {
    position: absolute;
    z-index: 99;
    right: 20px;
    font-size: 22px;
    color: #808080;
    cursor: pointer;
  }
  .add-button .el-button {
    font-size: 20px;
    border: none;
    padding: 0;
    color: #808080;
  }
  .no-data-text {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #bbb;
  }
  .tree-wrap {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
</style>