/********************人员导入信息修改-组件************************/
  Author: Mingzhang.Zhao
  Date:   2018-10-12
/************************************************/
<template>
  <div class="width-wrap">
    <!-- 搜索表单 -->
    <el-form ref="searchForm" label-width="110px" class="people-search-form" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名：">
            <el-input type="text" v-model="searchForm.name" @keyup.enter.native="getPeopleTableData(1, currentPerPage)" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别：">
            <el-select v-model="searchForm.sex" class="fill-width" placeholder="请选择性别">
              <el-option v-for="(item, index) in dictionaryGender" :value="item.key" :label="item.value" :key="`搜索-性别${index}`"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文化程度：">
            <el-select v-model="searchForm.education" class="fill-width" placeholder="请选择学历">
              <el-option v-for="(item, index) in dictionaryEducation" :value="item.key" :label="item.value" :key="`搜索-学历${index}`"></el-option>
            </el-select>
            <!-- <el-input type="text" v-model="searchForm.education" @keyup.enter.native="getPeopleTableData(1, currentPerPage)" placeholder="请输入文化程度"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄：">
            <el-input-number class="fill-width" :min="0" type="number" v-model="searchForm.age" @keyup.enter.native="getPeopleTableData(1, currentPerPage)" placeholder="请输入年龄(岁)"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作年限：">
            <el-input-number class="fill-width" :min="0" type="number" v-model="searchForm.workAge" @keyup.enter.native="getPeopleTableData(1, currentPerPage)" placeholder="请输入工作年限(年)"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族：">
            <el-select v-model="searchForm.nationName" class="fill-width" placeholder="请选择民族(可输入筛选)" filterable>
              <el-option v-for="(item, index) in dictionaryNation" :value="item.key" :label="item.value" :key="`搜索-民族${index}`"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="14">
          <el-form-item class="search-button-group">
            <el-button type="default" @click="clearForm">重置</el-button>
            <el-button type="primary" @click="getPeopleTableData(1, currentPerPage)">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 操作按钮组 -->
    <div class="operate-button-group">
      <el-button :disabled="peopleChoosed.length <= 0" type="default" @click="editOutlook(null, true)" size="small">批量修改政治面貌</el-button>
      <el-button :disabled="peopleChoosed.length <= 0" type="default" @click="editPeopleCompany(null, true)" size="small">批量修改公司组织</el-button>
      <el-button :disabled="peopleChoosed.length <= 0" type="primary" @click="editFinish(null, true)" size="small">批量完成修改</el-button>
      <el-button :disabled="peopleChoosed.length <= 0" type="danger"  @click="deletePeople(null, true)" size="small">批量删除</el-button>
      <el-button type="default" class="add-people-button" @click="addPeople" size="small">添加人员 + </el-button>
    </div>

    <!-- 人员信息表格 -->
    <div class="people-table-wrap" v-loading="loading">
      <el-table :data="peopleTableData" @selection-change="tableSelectChanged" stripe border>
        <el-table-column fixed="left" type="selection" width="45"></el-table-column>
        <el-table-column fixed="left" type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名" width="90"></el-table-column>
        <el-table-column label="技术职务">
          <template slot-scope="scope">{{ dictionaryTransfer("position", scope.row.tPost) }}</template>
        </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">{{ dictionaryTransfer("gender", scope.row.sex) }}</template>
        </el-table-column>
        <el-table-column label="民族">
          <template slot-scope="scope">{{ dictionaryTransfer("nation", scope.row.nation) }}</template>
        </el-table-column>
        <el-table-column label="籍贯" prop="nationPlace" >
          <template slot-scope="scope">{{ dictionaryTransfer("nationPlace", scope.row.nationPlace)}}</template>
        </el-table-column>
        <el-table-column label="文化程度">
          <template slot-scope="scope">{{ dictionaryTransfer("education", scope.row.education) }}</template>
        </el-table-column>
        <el-table-column label="出生年月" width="120" show-overflow-tooltip>
          <template slot-scope="scope">{{ $util.showDate(scope.row.borthday)}}</template>
        </el-table-column>
        <el-table-column prop="complayOrg" label="所属公司" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="参加工作时间" width="120" show-overflow-tooltip>
          <template slot-scope="scope">{{ $util.showDate(scope.row.workBorth)}}</template>
        </el-table-column>
        <el-table-column width="90" label="政治面貌">
          <template slot-scope="scope">{{ dictionaryTransfer("outlook", scope.row.outLook) }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="310">
          <template slot-scope="scope">
            <el-tooltip :enterable="false" content="编辑基本信息" placement="top-start">
              <el-button @click="editPeople(scope.row)" type="default" size="mini"><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="编辑政治面貌" placement="top-start">
              <el-button @click="editOutlook(scope.row, false)" type="default" size="mini"><i class="el-icon-edit-outline"></i></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="修改公司组织" placement="top-start">
              <el-button @click="editPeopleCompany(scope.row, false)" type="default" size="mini"><i class="fa fa-sitemap"></i></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="完成修改" placement="top-start">
              <el-button @click="editFinish(scope.row, false)" type="primary" size="mini"><i class="el-icon-check"></i></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="删除人员" placement="top-start">
              <el-button @click="deletePeople(scope.row, false)" type="danger" size="mini"><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-footer>
        <el-pagination
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

    <!-- 人员信息编辑对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="tempOperateType == 'new'? '新增人员' : '编辑人员'"
      :visible.sync="infoDialogVisible"
      width="40vw">
      <el-form :model="peopleForm" label-width="100px" size="small" :rules="rules" ref="peopleForm">
        <el-form-item label="姓名"
          prop="name">
        <el-input type="text" v-model="peopleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="技术职务">
          <el-select v-model="peopleForm.tPost" class="fill-width">
            <el-option v-for="(item, index) in techPositionList" :value="item.key" :label="item.value" :key="`${index}技术职务`">{{item.value}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
        <!-- <el-input type="text" v-model="peopleForm.sex"></el-input> -->
          <el-select v-model="peopleForm.sex" class="fill-width" placeholder="请选择性别">
            <el-option v-for="(item, index) in dictionaryGender" :value="item.key" :label="item.value" :key="`编辑-性别${index}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop="idNumber">
          <el-input type="text" v-model="peopleForm.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="peopleForm.nation" class="fill-width" placeholder="请选择民族(可输入筛选)" filterable>
            <el-option v-for="(item, index) in dictionaryNation" :value="item.key" :label="item.value" :key="`编辑-民族${index}`"></el-option>
          </el-select>
        <!-- <el-input type="text" v-model="peopleForm.nation"></el-input> -->
        </el-form-item>
        <el-form-item label="籍贯">
          <el-select v-model="peopleForm.nationPlace" class="fill-width" placeholder="请选择籍贯(可输入筛选)" filterable>
            <el-option v-for="(item, index) in dictionaryNationPlace" :value="item.key" :label="item.value" :key="`编辑-籍贯${index}`"></el-option>
          </el-select>
        <!-- <el-input type="text" v-model="peopleForm.nationPlace"></el-input> -->
        </el-form-item>
        <el-form-item label="文化程度">
          <!-- <el-input type="text" v-model="peopleForm.education"></el-input> -->
          <el-select v-model="peopleForm.education" class="fill-width" placeholder="请选择学历">
            <el-option v-for="(item, index) in dictionaryEducation" :value="item.key" :label="item.value" :key="`编辑-学历${index}`"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="出生年月" prop="borthday">
          <el-date-picker
            v-model="peopleForm.borthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            class="fill-width"
            :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参加工作时间" prop="workBorth">
          <el-date-picker
            v-model="peopleForm.workBorth"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            class="fill-width"
            :editable="false">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item
          label="出生年月"
          prop="borthday.date_time">
          <el-date-picker class="fill-width" :type="$util.datePickerType(peopleForm.borthday.type)" v-model="peopleForm.borthday.date_time" value-format="timestamp" placeholder="请选择出生年月"></el-date-picker>
          <el-select class="date-picker-after" v-model="peopleForm.borthday.type">
            <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`出生年月${index}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="参加工作时间"
          prop="workBorth.date_time">
          <el-date-picker class="fill-width" :type="$util.datePickerType(peopleForm.workBorth.type)" v-model="peopleForm.workBorth.date_time" value-format="timestamp" placeholder="请选择参加工作时间"></el-date-picker>
          <el-select class="date-picker-after" v-model="peopleForm.workBorth.type">
            <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`参加工作时间${index}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select v-model="peopleForm.outLook" class="fill-width" placeholder="请选择政治面貌">
            <el-option v-for="(item, index) in dictionaryOutlook" :value="item.key" :label="item.value" :key="`编辑-政治面貌${index}`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="infoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPeopleForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 政治面貌修改/批量对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="编辑政治面貌"
      :visible.sync="outlookDialogVisible"
      width="40vw">
      <el-form ref="outlookForm" label-width="80px" size="small">
        <el-form-item label="政治面貌" required>
          <el-select v-model="outlook" class="fill-width" placeholder="请选择政治面貌">
            <el-option v-for="(item, index) in dictionaryOutlook" :value="item.key" :label="item.value" :key="`批量-政治面貌${index}`"></el-option>
          </el-select>
          <!-- <el-input v-model="" placeholder="请输入政治面貌"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="outlookDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOutlook" :disabled="!outlook">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 公司组织修改/批量对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="修改公司组织"
      :visible.sync="companyDialogVisible"
      width="40vw">
      <el-tree
        ref="typeTree"
        :data="orgList"
        v-if="orgList && orgList.length > 0"
        v-loading="loading"
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false"
        class="tree-in-model"
        @node-click="orgClicked">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>

      <p v-if="tempOrg.name" class="choosed-company">当前选中的公司：
        <span>{{ tempOrg.name }}</span>
      </p>

      <p v-else class="choosed-company">请点击选择公司</p>

      <span slot="footer">
        <el-button @click="companyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOrg" :disabled="!tempOrg.name">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import qs from "qs";

  export default {
    data () {
      var checkTime = (rule, value, callback) => {
        if(!value) {
          callback()
        } else {
          if(value > new Date().getTime()) {
            callback(new Error('时间必须选当前时间之前'));
          } else {
            callback()
          }
        } 
      }

      return {
        orgCode: sessionStorage.getItem("orgCode"),

        loading:        false,
        dialogLoading:  false,
        
        searchForm: {
          name:           null,
          sex:            null,
          education: null,
          age:            undefined,
          workAge:        undefined,
          nationName:     null
        },

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
          borthday:       {
            type: 1,
            date_time: null,
          },
          workBorth:      {
            type: 1,
            date_time: null,
          },
          // partyBorth:     null,
          outLook:        null,
          idNumber:       null
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          idNumber: [
            { required: true, min: 15, max: 18, message: '请输入正确的身份证号', trigger: 'blur' },
          ],
          borthday: [
            { validator: checkTime, trigger: 'blur' },
            { validator: checkTime, trigger: 'change' },
          ],
          workBorth: [
            { validator: checkTime, trigger: 'blur' },
            { validator: checkTime, trigger: 'change' },
          ]
        },
        companyDialogVisible: false,
        tempPeopleId:         null, //当前选中的人员的Id
        tempOrg:              {},   //当前选中的公司对象
        orgList:              [],   //分类的树形结构
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
        type: Number,
        default: null
      }
    },
    watch: {
      "treeId": {
        handler(newV, oldV) {
          this.getPeopleTableData()
        },
        deep: true
      }
    },
    mounted () {
      this.getDictionaryData()
      this.getPeopleTableData()
      this.getOrgList("/org_units/orgunitstree", "orgList")
    },
    methods: {
      /**
       * 清空 表单
       * @return {[type]} [description]
       */
      clearForm () {
        this.searchForm = {
          name:           null,
          sex:            null,
          education: null,
          age:            undefined,
          workAge:        undefined,
          nationName:     null
        }
      },
      /**
       * 获取字典表数据
       * @return {[type]} [description]
       */
      getDictionaryData () {
        let self = this;

        let config = {
          url: `${basePath}/contrast/all_contrast_info`,
          method: "get"
        }

        self.$request.requestAxios(config.method, config.url, null, 
          (response) => {
            response.data.data.forEach((item) => {
              switch (item.id) {
                case 1:
                  self.dictionaryGender      = item.list;
                  break;
                case 2:
                  self.dictionaryNation      = item.list;
                  break;
                case 3:
                  self.dictionaryEducation   = item.list;
                  break;
                case 6:
                  self.dictionaryOutlook     = item.list;
                  break;
                case 9:
                  self.dictionaryNationPlace = item.list;
                  break;
                case 17:
                  self.techPositionList      = item.list;
                  break;
              }
            })
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 转化对应字典表的数据, 数字 > 文字
       * @param  {string} type  所需要转化的字典表名
       * @param  {number} value 所需要转化的数据
       * @return {string}       值对应的字典表名称
       */
      dictionaryTransfer (type, value) {
        let self = this
        let target = {}
        switch (type) {
          case "gender":
            target = self.dictionaryGender;
            break;
          case "nation":
            target = self.dictionaryNation;
            break;
          case "education":
            target = self.dictionaryEducation;
            break;
          case "outlook":
            target = self.dictionaryOutlook;
            break;
          case "nationPlace":
            target = self.dictionaryNationPlace;
            break;
          case "position":
            target = self.techPositionList;
            break;
        }

        for(let item in target) {
          if(target[item].key == value) {
            return target[item].value
          }
        }

      },
      /**
       * 获取表格数据
       * @param  {number} page    页数/ 不传查询当前页
       * @param  {number} perPage 每页条数 / 不传查当前的每页
       * @return {object} 查询结束的promise
       */
      getPeopleTableData (page, perPage) {
        let self = this;

        self.loading = true
        let config = {
          url: `${basePath}/userimport/user/byselecter`,
          method: "post",
          data: self.searchForm
        }
        self.searchForm.pageNum = page || this.currentPage,
        self.searchForm.pageSize = perPage || this.currentPerPage
        self.searchForm.complayOgListStr = this.treeId

        let p = new Promise(function (resolve, reject) {
          self.$request.requestAxios(config.method, config.url, config.data, 
            (response) => {
              self.peopleTableData = response.data.data.rows
              self.total = response.data.data.total
              self.transferData(self.peopleTableData) //数据转换
              self.loading = false
              resolve("成功")
            },
            (error) => {
              self.peopleTableData = []
              self.total = null
              self.loading = false
              self.$message.error(error.data.meta.message)
              reject("失败")
            }
          )
        })
        
        return p
      },
      /**
       * 将返回的数据处理, 用于表格显示
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      transferData (data) {
        let self = this

        data.forEach((item, index) => {
          item.birthDayFormat   = self.$util.timestampToTime(item.borthday).split(" ")[0]
          item.workBirthFormat  = self.$util.timestampToTime(item.workBorth).split(" ")[0]
          // item.partyBirthFormat = self.$util.timestampToTime(item.partyBorth).split(" ")[0]
        })
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getPeopleTableData(null, val)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getPeopleTableData(val, null)
      },
      /**
       * 获取公司数据(树)
       * @return none
       */
      getOrgList (url, target) {
        var self = this
        self.loading = true
        self.orgDialogVisible = false;
        let config = {
          url: basePath + url,
          method: 'get',
        }
        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            self[target] = response.data.data;
            self.loading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.loading = false
          }
        )
      },
      /**
       * 添加人员
       */
      addPeople () {
        this.peopleForm = {     //还原人员表单
          name:           null,
          sex:            null,
          nation:         null,
          education: null,
          borthday:       {
            type: 1,
            date_time: null,
          },
          workBorth:      {
            type: 1,
            date_time: null,
          },
          // partyBorth:     null,
          outLook:        null
        }
        this.tempOperateType   = "new"
        this.infoDialogVisible = true
        if(this.$refs.peopleForm) {
          this.$refs.peopleForm.clearValidate()
        }
      },
      /**
       * 点击编辑, 写入当前的人员数据
       * @param  {object} tableItem 当前点击表格对应的对象
       * @return none
       */
      editPeople (tableItem) {
        this.tempOperateType   = "edit"
        this.infoDialogVisible = true
        let newForm = JSON.parse(JSON.stringify(tableItem))
        if(!newForm.borthday) {
          newForm.borthday = {
            type: 1,
            date_time: null,
          }
        }
        if(!newForm.workBorth) {
          newForm.workBorth = {
            type: 1,
            date_time: null,
          }
        }
        this.peopleForm = newForm
      },
      /**
       * 点击确定, 提交当前人员的修改
       * @return {[type]} [description]
       */
      submitPeopleForm () {
        let self = this

        self.peopleForm.userName    = "这是强制修改的名字"
        self.peopleForm.mobilNumber = 121212

        let config = {
          data: self.peopleForm
        }

        if (self.tempOperateType == "new") {
          config.url = `${basePath}/hr_users/add/from_org/${self.orgCode}`;
          config.method = "post";
        } else {
          config.url = `${basePath}/hr_users/update/${self.peopleForm.userId}`;
          config.method = "put";
        }

        self.$refs.peopleForm.validate((valid) => { // 表单验证
          if(valid) {
            self.$request.requestAxios(config.method, config.url, config.data, 
              (response) => {
                self.$message({
                  type: "success",
                  message: "成功"
                })
                self.$refs.peopleForm.clearValidate()
                self.getPeopleTableData().then(() =>{
                  self.infoDialogVisible = false
                }) // 重新查询
              },
              (error) => {
                self.$message.error(error.data.meta.message)
              }
            )
          } else {
            self.$message.error("请检查必填字段")
          }
        })
        
      },
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
          this.multiFlag    = false
          this.tempPeopleId = tableItem.userId
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
          self.loading   = true
          config.data.list = self.peopleChoosed //批量时使用table的selection
        } else {
          config.data.list.push(self.tempPeopleId) //单个使用tempPeopleId
        }

        self.$request.requestAxios(config.method, config.url, config.data, 
          (response) => {
            self.$message({
              type: "success",
              message: "修改成功"
            })
            self.getPeopleTableData().then(() => {
              self.companyDialogVisible = false
            })
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.companyDialogVisible = false
            self.loading = false
          }
        )
      },
      /**
       * 点击修改政治面貌(单个/ 批量), 单个记录当前id, 并修改当前的操作状态
       * @param  {object}  tableItem 当前点击表格对应的对象
       * @param  {boolean} multi     是否是批量操作
       * @return none
       */
      editOutlook (tableItem, multi) {
        if (multi) {
          this.multiFlag = true
        } else {
          this.multiFlag    = false
          this.tempPeopleId = tableItem.userId
        }
        this.outlook              = null
        this.outlookDialogVisible = true
      },
      submitOutlook () {
        let self = this
        let config = {
          url: `${basePath}/hr_users/batch/update/outlook/${self.outlook}/from_org/${self.orgCode}`,
          method: "post",
          data: {
            list: []
          }
        }

        if (self.multiFlag) { //批量操作提交时需要给table变为loading
          self.loading   = true
          config.data.list = self.peopleChoosed //批量时使用table的selection
        } else {
          config.data.list.push(self.tempPeopleId) //单个使用tempPeopleId
        }

        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            self.$message({
              type: "success",
              message: "修改成功"
            })
            
            self.getPeopleTableData().then(() => {
              self.outlookDialogVisible = false
            })
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.outlookDialogVisible = false
            self.loading = false
          }
        )
      },
      /**
       * 修改完成(单个/批量)
       * @param  {object}  tableItem 当前点击表格对应的对象
       * @param  {boolean} multi     是否是批量操作
       * @return {[type]}           [description]
       */
      editFinish (tableItem, multi) {
        let self = this
        let idsString = ""

        if (multi) {
          this.multiFlag = true
          idsString = self.peopleChoosed.join(",")
        } else {
          this.multiFlag = false
          idsString = tableItem.userId
        }

        let config = {
          url:    `${basePath}/userimport/user/${idsString}/buildFinish`,
          method: "get",
        }
        self.$confirm("确认完成吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true
          self.$request.requestAxios(config.method, config.url, null,
            (response) => {
              self.$message({
                type: "success",
                message: "已完成修改"
              })
              self.getPeopleTableData().then(() => {
                self.loading = false
              })
            },
            (error) => {
              self.$message.error(error.data.meta.message)
              self.loading = false
            }
          )
        }).catch(() => {

        })
      },
      /**
       * 删除人员(单个/批量)
       * @param  {object}  tableItem 当前点击表格对应的对象
       * @param  {boolean} multi     是否是批量操作
       * @return {[type]}           [description]
       */
      deletePeople (tableItem, multi) {
        let self = this
  
        let config = {
          url:    `${basePath}/hr_users/batch/delete/from_org/${self.orgCode}`,
          method: "delete",
          data: {
            list: []
          }
        }

        if (multi) {
          this.multiFlag = true
          config.data.list = self.peopleChoosed
        } else {
          this.multiFlag = false
          config.data.list.push(tableItem.userId)
        }

        self.$confirm("确认删除吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.loading = true
          self.$request.requestAxios(config.method, config.url, { data: config.data },
            (response) => {
              self.$message({
                type: "success",
                message: "删除成功"
              })
              self.getPeopleTableData().then(() => {
                self.loading = false
              })
            },
            (error) => {
              self.$message.error(error.data.meta.message)
              self.loading = false
            }
          )
        }).catch(() => {

        })
      },
    }
  };
</script>

<style scoped>
  .width-wrap {
    width: calc( 100vw - 725px);
  }
  .people-search-form {
    background: #fff;
    padding: 19px 10px 0 10px;
  }
  .people-search-form .search-button-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .add-people-button {
    float: right;
  }
  .operate-button-group {
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
  .people-table-wrap {
    padding-top: 20px;
  }
  .el-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .tree-in-model {
    height: 300px;
    overflow: auto;
  }
  .choosed-company {
    border-top: 1px solid #ccc;
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
