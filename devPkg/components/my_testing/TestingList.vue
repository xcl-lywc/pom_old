/*********************图片考试 - 考试列表***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div style="position: relative;">
    <!-- <div class="add-button">
      <el-button icon="el-icon-circle-plus-outline" @click="formDialogVisible = true" circle></el-button>
    </div> -->
    <el-tabs v-model="activeTab" @tab-click="clickTab">
      <el-tab-pane label="待参与" :name="3"></el-tab-pane>
      <el-tab-pane label="已参与" :name="15"></el-tab-pane>
      <el-tab-pane label="已结束" :name="4"></el-tab-pane>
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
            <el-button v-if="activeTab == 3" @click="$router.push({name: 'Start_Testing', params: {id: item.examId}})" type="primary" size="small">开始考试</el-button>
            <el-button v-else @click="$router.push({name: 'My_Testing_Detail', params: {id: item.examId}})" type="primary" size="small">查看详情</el-button>
          </span>
        </p>
        <!-- <el-row :gutter="10">
          <el-col :span="18">
            {{ item.content }}
            <ul>
              <li v-for="(itemInner, indexInner) in item.answerList" :key="itemInner.id">{{ returnLetter(indexInner) }}、{{ itemInner.content }}</li>
            </ul>
          </el-col>
          <el-col :span="6" class="img-wrap">
            <div v-if="!item.picture" class="no-img-div">暂无图片</div>
            <img v-else :src="item.picture" alt="" style="height: 100px; width:100px;">
          </el-col>
          <el-col :span="24" class="question-info">
            <p>题型:
              <span v-if="item.type == 1">单选题</span>
              <span v-if="item.type == 2">多选题</span>
              <span v-if="item.type == 3">简答题</span>
            </p>
            <p>创建者: {{ item.creator }}</p>
            <p>分值: {{ item.score }}</p>
            <span>
              <el-button type="primary" size="small" @click="$router.push({name: 'Question_Detail', params: {id: item.id}})">查看解析</el-button>
              <el-button type="primary" size="small">试题蓝</el-button>
            </span>
          </el-col>
        </el-row> -->
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
      <el-form ref="testForm" :model="testForm" :rules="rules" label-width="85px">
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
          
          <el-form :model="searchForm" ref="searchForm" label-width="85px">
            <el-form-item label="创建时间" prop="date" :rules="{required: true, message: '请选择日期', trigger: 'blur'}">
              <el-date-picker
                type="daterange"
                v-model="searchForm.date"
                value-format="timestamp"
                :editable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-button type="primary" size="small" @click="getListData('/test_papers/test_papers/choice/list', 'paperListData')">搜索</el-button>
            </el-form-item>
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
            <!-- <el-pagination
              @size-change="handleSizePaperChange"
              @current-change="handleCurrentPaperChange"
              :current-page="currentPaperPage"
              :page-sizes="[5, 10, 20]"
              :page-size="currentPerPaperPage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalPaper">
            </el-pagination> -->
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
            :editable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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

        activeTab: 3,
        cardsLoading: false,

        listData: [],
        currentPage:     1,
        currentPerPage:  5,
        total:           0,

        formDialogVisible: false,

        testForm: {
          theme:       null,
          requirement: null,
          testId:      null,
          date:        null,
          userIds:     [JSON.parse(sessionStorage.getItem("userData"))["userId"]]
        },

        rules: {
          date: [
            { validator: checkTime, trigger: 'blur' },
            { required: true, message: '请选择时间', trigger: 'blur' },
          ],
        },
        searchForm: {
          date: [0, new Date().getTime()],
        },
        cardsLoading: false,

        paperListData: [],
        tempTableId:   null,
        tempTableName:   null,
        // currentPaperPage:     1,
        // currentPaperPerPage:  5,
        // totalPaper:           0,
      }
    },
    mounted () {
      this.getListData("/exames/exames/list", "listData")
    },
    methods: {
      /**
       * 获取列表数据
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getListData (url, target) {
        var self = this, examineesStatus = null;
        self.cardsLoading = true;
        if(self.activeTab == 3){
          examineesStatus = 1;
        }else if(self.activeTab == 15){
          examineesStatus = 3;
        }else if(self.activeTab == 4){
          examineesStatus = null;
        }

        let search = {
          pageSize:         self.currentPerPage,
          pageNum:          self.currentPage,
          status:           self.activeTab == 15 ? null : self.activeTab,
          userId:           JSON.parse(sessionStorage.getItem("userData")).userId,
          examineesStatus:  examineesStatus,
        }

        if(target == "paperListData") {
          search.pageSize = 999
          search.beginTime = self.searchForm.date[0]
          search.endTime = self.searchForm.date[1]
        }

        self.$request.requestAxios('post', `${basePath}${url}`, search, 
          (response) => {
            self[target] = response.data.data.rows;
            self.total   = response.data.data.total || 0;
            self.cardsLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.cardsLoading = false
          }
        )
        
      },
      /**
       * 点击顶部tabs 切换状态
       * @param  {[type]} tab   [description]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      clickTab (tab, event) {
        this.activeTab = tab.name
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

            self.formLoading = true

            self.$request.requestAxios(config.method, config.url, config.data, 
              (response) => {
                self.$message.success(response.data.meta.message)

                self.formLoading = false
                self.formDialogVisible = false
                self.resetForm()
              },
              (error) => {
                self.$message.error(error.data.meta.message || "失败")
                self.formLoading = false
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
          theme:  null,
          testId: null,
          date:   null,
          userIds: [JSON.parse(sessionStorage.getItem("userData"))["userId"]]
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
      // handleSizePaperChange(val) {
      //   this.currentPaperPerPage = val
      //   this.getListData("/exames/exames/list", "listData")
      // },
      // handleCurrentPaperChange(val) {
      //   this.currentPaperPage = val
      //   this.getListData("/exames/exames/list", "listData")
      // },
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
</style>