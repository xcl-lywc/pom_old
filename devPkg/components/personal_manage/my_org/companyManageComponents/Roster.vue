/********************职工花名册************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-23
/************************************************/
<template>
  <div style="width: 100%;padding: 10px;">
    <!-- <el-button :disabled="peopleChoosed.length == 0" @click="deletePeople" type="danger" size="small">批量删除</el-button> -->
    <!-- <el-table
    :data="peopleTableData"
    v-loading="tableLoading"
    stripe
    border
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column sortable prop="account" label="账号" width="120"></el-table-column>
      <el-table-column sortable prop="name" label="姓名"></el-table-column>
      <el-table-column sortable prop="position" label="技术职务" width="120">
        <template slot-scope="scope">
          {{$util.controlTable(scope.row.position)}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="sex" label="性别" width="80">
        <template slot-scope="scope">
          {{$util.controlTable(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="nation" label="民族" width="80">
        <template slot-scope="scope">
          {{$util.controlTable(scope.row.nation)}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="nationPlace" label="籍贯"></el-table-column>
      <el-table-column sortable prop="education" label="文化程度" width="120">
        <template slot-scope="scope">
          {{$util.controlTable(scope.row.education)}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="birthDayFormat" label="出生年月" width="120"><template slot-scope="scope">{{scope.row.birthDayFormat}}</template></el-table-column>
      <el-table-column sortable prop="workBirthFormat" label="参加工作时间" width="150"></el-table-column>
      <el-table-column sortable prop="outLook" label="政治面貌" width="120">
        <template slot-scope="scope">
          {{$util.controlTable(scope.row.outLook)}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="$router.push({name: 'PeopleDetail', params: {id: scope.row.userId}})" type="default" size="mini">查看</el-button>
          <el-button @click="deletePeople(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    

    <div class="people-table-wrap" v-loading="tableLoading">

      <el-table :data="peopleTableData" @selection-change="tableSelectChanged" stripe border> 
        <el-table-column fixed="left" type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="account" label="账号" sortable width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.sex) }}
          </template>
        </el-table-column>
        <el-table-column prop="nation" label="民族">
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.nation) }}
          </template>
        </el-table-column>
        <el-table-column prop="nationPlace" label="籍贯" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.nationPlace) }}
          </template>
        </el-table-column>
        <el-table-column prop="workBirthFormat" label="出生年月" width="130" show-overflow-tooltip>
          <template slot-scope="scope"> {{ $util.showDate(scope.row.borthday) }}</template>
        </el-table-column>
        <el-table-column prop="education" label="文化程度">
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.education) }}
          </template>
        </el-table-column>
        <el-table-column prop="nationPlace" label="党内职务" show-overflow-tooltip>
          <template slot-scope="scope"> 
            {{ $util.controlTable(scope.row.partyPosition)}}
          </template>
        </el-table-column>
        <el-table-column prop="nationPlace" label="行政职务" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $util.controlTable(scope.row.orgPosition)}}
          </template>
        </el-table-column>
        <el-table-column label="专业技术职称" width="120">
          <template slot-scope="scope">
            {{$util.controlTable(scope.row.tpost)}}
          </template>
        </el-table-column>
        <el-table-column prop="workBorth" label="参加工作时间" width="130" show-overflow-tooltip>
          <template slot-scope="scope"> {{ $util.showDate(scope.row.workBorth) }}</template>
        </el-table-column>
        <el-table-column prop="partyBorth" label="入党时间">
          <template slot-scope="scope"> {{ $util.showDate(scope.row.partyBorth) }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="80">
          <template slot-scope="scope">
            <!-- <el-tooltip :enterable="false" content="编辑基本信息" placement="top-start">
              <el-button @click="editPeople(scope.row)" type="default" size="mini"><i class="el-icon-edit"></i></el-button>
            </el-tooltip> -->
            <el-tooltip :enterable="false" content="查看" placement="top-start">
              <el-button @click="showDetailDialog(scope.row)" type="primary" size="mini"><i class="fa fa-eye"></i></el-button>
            </el-tooltip> 
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-footer>
        <el-pagination
          class="fr"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="currentPerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-footer>
    </div> 
    <!-- 用户详情 -->
    <el-dialog 
      class="task-detail-dialog dialog"
      title="用户详情"
      :visible.sync="detailDialogVisible"
      width="75%">
      <roster-detail :mathRandom="mathRandom" :afferentUserId="userId"></roster-detail>
    </el-dialog>
  </div>
</template>

<script>
  import qs from "qs"
  import importPeople from "../../../common/people_import/ImportPeople.vue"
  import detail from '../../My_Message.vue'
  export default {
    components: {
      "import-people": importPeople,
      "roster-detail": detail, // 人员详情
    },
    data() {
      return {
        orgCode: sessionStorage.getItem("orgCode"),
        tableLoading:   false,

        peopleTableData: [],
        // multiSelect:     [],
        
        total:           0,
        currentPage:     1,
        currentPerPage:  5,

        importPeopleDialogVisible: false,
        detailDialogVisible: false, //详情弹框
        mathRandom:          0, //随机数，用来查看详情使用
        userId:              null, //当前被查看详情的用户Id
        ////////////////////////从人员信息导入中复制////////////////////////
        
        multiFlag:       false, //批量操作的标识 false为单个操作
        peopleTableData: [],    //表格数据
        currentPage:     1,
        currentPerPage:  5,
        total:           null,
        peopleChoosed:   [],

        tempOperateType: 'new',

        
        infoDialogVisible: false,
        peopleForm: {     //当前编辑的人员表单
          name:           null,
          sex:            null,
          nation:         null,
          education: null,
          borthday:       null,
          partyBorth:     null,
          workBorth:      null,
          outLook:        null,
          idNumber:       null
        },

        companyDialogVisible: false,
        tempPeopleId:         null, //当前选中的人员的Id
        tempPeopleName:       null,
        tempOrg:              {},   //当前选中的公司对象
        orgList:              [],   //公司树形结构
        tempId:               null, //当前选中的公司
        defaultProps: {
          children: 'childrens',   //分类/专题树的配置
          label: 'name'
        },

        outlookDialogVisible: false,
        outlook:              null,

        // 字典对照表数据, 从后台获取
        dictionaryGender:      {},
        dictionaryNation:      {},
        dictionaryEducation:   {},
        dictionaryOutlook:     {},
        dictionaryNationPlace: {},
        techPositionList:      [],   //技术职务的数据
      }
    },
    props: {
      treeId: {
        required: true,
      }
    },
    watch: {
      "treeId": { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          this.getPeopleTableData()
        },
        deep: true
      }
    },
    created () {

    },
    mounted () {
      this.getPeopleTableData()
      this.getOrgList("/org_units/orgunitstree", "orgList")
    },
    methods: {
      /**
       * 获取公司数据(树)
       * @return none
       */
      getOrgList (url, target) {
        var self = this
        self.tableLoading = true
        self.orgDialogVisible = false;
        let config = {
          url: basePath + url,
          method: 'get',
        }
        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            self[target] = response.data.data;
            self.tableLoading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.tableLoading = false
          }
        )
      },
      /**
       * 获取表格数据
       * @return {[type]} [description]
       */
      getPeopleTableData () {
        let self = this

        self.tableLoading = true
        let config = {
          url: `${basePath}/hr_users/userList/${self.treeId}`,
          method: "get",
          params: { 
            pageSize:  self.currentPerPage,
            pageNum:   self.currentPage
          }
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params}, 
          (response) => {
            self.peopleTableData = response.data.data.rows
            self.total           = response.data.data.total
            self.transferData(self.peopleTableData) //数据转换
            self.tableLoading = false
          },
          (error) => {
            self.tableLoading = false
          }
        )
      },
      // handleSelectionChange (value) {
      //   this.multiSelect = value
      // },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.tableLoading = true
        this.getPeopleTableData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.tableLoading = true
        this.getPeopleTableData()
      },
      /**
       * 将返回的数据处理, 用于表格显示
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      transferData (data) {
        let self = this
        data.forEach((item, index) => {
          item.birthDayFormat   = self.common.timestampToTime(item.borthday).split(" ")[0]
          item.workBirthFormat  = self.common.timestampToTime(item.workBorth).split(" ")[0]
          item.partyBirthFormat = self.common.timestampToTime(item.partyBorth).split(" ")[0]
        })
      },
      /**
       * 删除人员
       * @return {[type]} [description]
       */
      deletePeople (tableItemId) {
        let self = this
  
        // let userIdArray = []

        // if(self.multiSelect.length > 0) {
        //   self.multiSelect.forEach((item, index) => {
        //     userIdArray.push(item.userId)
        //   })
        // } else {
        //   userIdArray.push(tableItem.userId)
        // }

        let config = {
          url:    `${basePath}/hr_users/batch/delete/from_org/${self.orgCode}`,
          method: "delete",
          data: {
            list: tableItemId ? [tableItemId] : self.peopleChoosed
          }
        }

        //config.data.list.push(tableItem.userId)

        self.$confirm("确认删除吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.tableLoading = true
          self.$request.requestAxios(config.method, config.url, { data: config.data },
            (response) => {
              self.$message({
                type: "success",
                message: "删除成功"
              })
              self.getPeopleTableData()
            },
            (error) => {
              self.$message.error(error.data.meta.message)
              self.tableLoading = false
            }
          )
        }).catch(() => {

        })

      },
      ////////////////////////从人员信息导入中复制////////////////////////

      /**
       * 当选中的table row发生变化时 记录变化后的选中人员数组
       * @param  {array} selection 选中的对象数组
       * @return none
       */
      tableSelectChanged (selection) {
        let self = this
        self.peopleChoosed = []
        if (selection) {
          selection.forEach((item, index) => {
            self.peopleChoosed.push(item.userId)
          })
        }
      },
      /**
       * 点击修改所属公司( 单个/ 批量), 单个记录当前id, 并修改当前的操作状态
       * @param  {object}  tableItem 当前点击表格对应的对象
       * @param  {boolean} multi     是否是批量操作
       * @return none
       */
      editPeopleCompany (tableItem, multi) {
        if (multi) {
          this.multiFlag = true
        } else {
          this.multiFlag      = false
          this.tempPeopleId   = tableItem.userId
          this.tempPeopleName = tableItem.name
        }
        this.tempOrg              = {}
        this.companyDialogVisible = true
      },
      /**
       * 点击树中的公司, 设置为选中
       * @param  {object} item 数据对象
       * @param  {object} node 节点对象
       * @return {[type]}      [description]
       */
      orgClicked (item, node) {
        this.tempOrg = item
      },
      /**
       * 提交 公司组织修改 (单个/ 批量)
       * @return {[type]}       [description]
       */
      submitOrg () {
        let self = this
        let config = {
          url: `${basePath}/hr_users/batch/update/org/${self.tempOrg.id}/from_org/${self.orgCode}`,
          method: "post",
          data: {
            list: []
          }
        }

        if (self.multiFlag) { //批量操作提交时需要给table变为loading
          self.tableLoading   = true
          config.data.list = self.peopleChoosed //批量时使用table的selection
        } else {
          config.data.list.push(self.tempPeopleId) //单个使用tempPeopleId
        }

        self.$request.requestAxios(config.method, config.url, config.data, 
          (response) => {
            self.$message.success("修改成功")
            self.companyDialogVisible = false
            self.getPeopleTableData()
          },
          (error) => {
            self.$message.error("修改失败")
            self.companyDialogVisible = false
            self.tableLoading = false
          }
        )
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月' +
               new Date(date).getDate() + '日' ;
      },
      showDetailDialog(item){
        this.mathRandom++;
        
        this.userId = item.userId;
        console.log(this.userId)
        this.$nextTick(() => {
          this.detailDialogVisible = true;
        })
      },
    }
  }
</script>

<style scoped>
  .warning-icon {
    margin-right: 10px;
    color: #E6A23C;
  }
  .tree-list-wrap {
    padding: 0;
  }
  .tree-list {
    position: fixed;
    width: 200px;
    background: #fff;
    padding: 10px;
  }
  .tree-list li{
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .tree-list li:hover {
    cursor: pointer;
    color: #409EFF;
  }
  .right-content {
    width: 100%;
  }
  .org-name {
    position: absolute;
    top: -45px;
    left: 10px;
    font-size: 16px;
  }
  .no-org-data {
    padding: 20px;
    margin-top: 20px;
    background: #fff;
  }
  .el-pagination {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
<!-- 强制样式 -->
<style>
  .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
  .el-tree-node__expand-icon.el-icon-caret-right{
    font-size: 18px;
    color: #000;
  }
  .el-tree-node__expand-icon.el-icon-caret-right.is-leaf{
    color: transparent;
  }
</style>