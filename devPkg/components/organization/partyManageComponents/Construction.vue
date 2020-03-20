/*********************党组织构建***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-15
/************************************************/
<template>
  <div id="construction" class="content-area">
    <el-tree
        ref="partyTree"
        :data="partyListData"
        v-if="partyListData"
        v-loading="loading"
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="showControl(data)" @mouseout="tempId = null">
          <span> {{ node.label }} <i v-if="data.type == '4'" class="fa fa-star text-yellow" aria-hidden="true"></i></span>
          <span v-show="tempId == data.id" class="tree-right-operate">
            <el-button
              type="text"
              size="mini"
              v-if="data.type == '1' || data.type == '2'"
              @click="showPartyDialog('childLevel', 'new', data)">
              添加下级
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="showPartyDialog('sameLevel', 'edit', data)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="data.childrens && data.childrens.length <= 0"
              @click="() => deleteParty(node, data)">
              删除
            </el-button>
          </span>
        </span>
    </el-tree>
    <el-button
      v-else
      type="primary"
      size="mini"
      @click="showPartyDialog('topLevel', 'new', null)">
      开始构建
    </el-button>

    <el-dialog
      :title="tempOperateType == 'new' ? '新增' : '编辑'"
      :visible.sync="partyDialogVisible"
      :close-on-click-modal="false"
      width="80%"
      top="5vh"
      @before-close="focusStatus = false"
      @close="resetPartyForm"
      >
      <div v-loading="loading">
        <el-form :model="partyForm" ref="partyForm" :rules="rules" label-width="120px" size="small">
          <el-row>
          <el-col :span="12">
            <el-form-item
              prop="name"
              label="党组织名称"
              :rules="{ required: true, message: '请输入党组织名称', trigger: 'blur' }">
              <el-input v-model="partyForm.name"></el-input>
            </el-form-item>
            <el-form-item label="党组织头像">
              <el-upload
                class="avatar-wrap"
                :action="imgServer"
                :headers="token"
                :show-file-list="false"
                :on-success="uploadSuccess"
                name="upfile">
                <img v-if="partyForm.headImg" :src="partyForm.headImg" class="avatar-img">
                <i v-else class="el-icon-plus">上传头像</i>
              </el-upload>
            </el-form-item>
            <el-form-item
              prop="description"
              label="党组织描述"
              :rules="{ required: true, message: '请输入党组织描述', trigger: 'blur'}">
              <el-input v-model="partyForm.description" type="textarea" :rows="10"></el-input>
            </el-form-item>
            <el-form-item
              v-if="orgTree && orgTree.length > 0"
              label="所属公司组织"  >
              <el-cascader
                change-on-select
                class="fill-width"
                :options="orgTree"
                clearable
                :props="{
                  children: 'childrens',
                  label: 'name',
                  value: 'id',
                  checkStrictly: true,
                }"
                v-model="partyForm.orgIds">
              </el-cascader>
            </el-form-item>
            <el-form-item
              prop="latitude"
              label="所在地"
              :rules="{ required: true, message: '请输入正确的地址', trigger: 'blur'}">
              <el-input v-model="partyForm.address" type="text" @blur="checkAddress" @focus="focusStatus = true"></el-input>
            </el-form-item>
            <el-form-item
              prop="type"
              label="类型"
              :rules="{ required: true, message: '请选择组织类型', trigger: 'change' }">
              <el-select v-model="partyForm.type" class="fill-width">
                <el-option v-for="item in partyTypesList" :value="item.type" :label="item.name" :key="`类型${item.type}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="成立时间"
              prop="createrOrgTime.date_time">
              <el-date-picker class="fill-width" :type="$util.datePickerType(partyForm.createrOrgTime.type)" v-model="partyForm.createrOrgTime.date_time" value-format="timestamp" placeholder="请选择成立时间">
              </el-date-picker>
              <el-select class="date-picker-after" v-model="partyForm.createrOrgTime.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`成立时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="任期开始时间">
              <!-- prop="officeStart.date_time" -->
              <el-date-picker class="fill-width" :type="$util.datePickerType(partyForm.officeStart.type)" v-model="partyForm.officeStart.date_time" value-format="timestamp" placeholder="请选择任期开始时间"></el-date-picker>
              <el-select class="date-picker-after" v-model="partyForm.officeStart.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`任期开始时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="任期结束时间">
              <!-- prop="officeStop.date_time" -->
              <el-date-picker class="fill-width" :type="$util.datePickerType(partyForm.officeStop.type)" v-model="partyForm.officeStop.date_time" value-format="timestamp" placeholder="请选择任期结束时间"></el-date-picker>
              <el-select class="date-picker-after" v-model="partyForm.officeStop.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`任期结束时间${index}`"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <h5 class="position-title">组织职务<small>（不会保存重复添加的职务）</small></h5>
            <div class="position-wrap"> 
              <el-form-item
                v-if="partyForm.positions"
                v-for="(item, index) in partyForm.positions"
                :key="'职务'+ index"
                :prop="'positions.' + index + '.positionsName'"
                :rules="{ required: true, message: '职位名称不能为空', trigger: 'change' }"
                class="left-margin-50">
                <el-row :gutter="15">
                <el-col :span="18">
                  <el-select v-model="item.positionsName" class="fill-width">
                    <el-option v-for="itemInner in dictionaryPosition" :label="itemInner.value" :value="itemInner.key" :key="index + itemInner.key"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4"><el-button type="danger" @click.prevent="deletePosition(item)">删除</el-button></el-col>
                </el-row>
              </el-form-item>
              <el-form-item class="left-margin-50">
                <el-button @click="addPosition">新增职位</el-button>
              </el-form-item>
            </div>
          </el-col>
          </el-row>
        </el-form>        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="partyDialogVisible = false">取 消</el-button>
        <el-button :disabled="loading" type="primary" @click="submitForm('partyForm')">确 定</el-button>
      </span>
    </el-dialog>

    
    <div id="allmap"></div>
  </div>
</template>

<script>
  import treeInLevel from "../../common/treeInLevel.vue"
  export default {
    data() {
      var checkTime = (rule, value, callback) => {
        if(!value) {
          callback();
        } else {
          if(value > new Date().getTime()) {
            callback(new Error('时间必须选当前时间之前'));
          } else {
            callback()
          }
        } 
      }
      return {
        imgServer: `${basePath}/sys/ueditor/file?action=uploadimage`,
        token:     { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("userData")).token}`},
        orgCode:   sessionStorage.getItem('orgCode'),
        loading:   false,

        orgOriginList: [],   //原本的公司结构树模板, 仅在新增时使用(使用时需深拷贝)
        orgList:       [],   //公司结构树, 用于数据传递
        partyListData: [],   //党组织的树形结构
        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },

        //党组织表单
        partyForm: {
          name:         null,
          parentId:     null,
          description:  null,
          positions:    [
            {
              positionsName: null,
              display:       false
            }
          ],
          createrOrgTime: {
            type: 1,
            date_time: null,
          },
          officeStart:  {
            date_time:   null,
            type:        1,
          },
          officeStop:  {
            date_time:   null,
            type:        1,
          },
          address:        null,
          latitude:       null,
          longitude:      null,
          type:           null,
          orgUnitId:      null,
          orgIds:         []
        },
        orgTree:          [],  //公司组织树
        rules: { //验证
          'createrOrgTime.date_time': [
            { validator: checkTime, trigger: 'blur' },
            { validator: checkTime, trigger: 'change' },
            // { required: true, message: '请选择成立日期', trigger: 'blur' }
          ]
        },
        partyTypesList: [// 党组织类型数组
          {
            type: "1",
            name: "党委"
          },
          {
            type: "2",
            name: "党支部"
          },
          {
            type: "3",
            name: "党小组"
          },
          {
            type: "4",
            name: "职能部门"
          },
          {
            type: "5",
            name: "党支部下办公室"
          },
          {
            type: "6",
            name: "党总支"
          },
          {
            type: "7",
            name: "纪委"
          },
        ],
        typeName:           null,   //类型input名称
        tempLevel:          null,   //当前操作的层级 sameLevel本级 childLevel子级 topLevel 顶级
        tempId:             null,   //鼠标移动到对应的节点, 记录此节点id, 显示对应的操作按钮
        tempOperateType:    null,   //当前操作模式 new新增 edit编辑
        tempOperateObj:     {},     //当前触发操作的data对象
        parentType:         null,   //父节点的类型, 用于判断 添加或编辑节点的类型
        partyDialogVisible: false,

        focusStatus:      false,       //打开对话框后, 开始输入地址的状态,在此状态下动态根据address更新latitude

        dictionaryPosition: [],
      }
    },
    props: {
      treeId: {
        type: Number,
        required: true,
      }
    },
    components: {
      "tree-in-level": treeInLevel
    },
    mounted () {
      if(this.treeId != 0) {
        this.getDataList(`/party_orgs/${ this.treeId }/partyorgtree`, "partyListData")
        this.getDataList("/org_units/simpleorgunitstree", "orgTree")
      }
      window.c = this
      this.getDictionaryData()
    },
    watch : {
      "partyForm.address": {
        handler (newV, oldV) {
          if(this.focusStatus) { // 当input聚焦时开启动态验证, 否则不进行验证
            this.checkAddress()
          }
        },
        deep: true
      },
      treeId: { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          if(newV && newV != 0) {
            this.getDataList(`/party_orgs/${ newV }/partyorgtree`, "partyListData")
          }
        },
        deep: true
      }
    },
    methods: {
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
                case 8: //党组织职位
                  self.dictionaryPosition = item.list;
                  break;
                default:
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
       * 获取树形数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getDataList (url, target) {
        var self = this
        self.loading = true
        self.partyDialogVisible = false;

        self.$request.requestAxios('get', `${basePath}${url}`, null, 
          (response) => {
            if(target == "partyListData") {
              self[target] = [] //返回数据为对象,需要处理为数组
              self[target].push(response.data.data);
            } else {
              self[target] = response.data.data;
              self[target].forEach((item, index) => { //去掉空白childrens
                self.$util.traverseTree(item)
              })
            }
            self.loading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.loading = false
          }
        )
      },
      /**
       * 点击显示党组织dialog
       * @param {string} typeStr  添加顶层top 或是 添加子集层 child
       * @param {string} operate  当前操作模式
       * @param {object} data     当前点击的对象data
       */
      showPartyDialog (typeStr, operate, data) {
        let self = this;

        if(this.$refs.partyForm){
          this.$refs.partyForm.resetFields();
        }

        self.tempLevel          = typeStr;
        self.tempOperateObj     = data    //保存当前操作的data
        self.tempOperateType    = operate
        
        if(data && data.parentId) { //判断父节点type, 没有父节点则为null
          if (self.$refs.partyTree.getNode(data.parentId)) {
            self.parentType = self.$refs.partyTree.getNode(data.parentId).data.type
          } else {
            self.parentType = null
          }
        } else {
          self.parentType = null
        }

        self.loading     = true
        self.focusStatus = false

        if(operate == "edit") { //点击编辑, 查询详情, 使用返回的数据
          self.getPartyDetail(data)
        } else {
          self.partyDialogVisible = true
          self.$nextTick(() => {
            if(self.$refs.partyForm){
              self.$refs.partyForm.clearValidate();
            }
          })
          self.resetPartyForm()
        }
        self.loading = false
      },
      resetPartyForm () {
        if(this.$refs.partyForm) {
          this.$refs.partyForm.resetFields();
        }
        
        this.partyForm = {
          name:         null,
          parentId:     null,
          description:  null,
          positions:    [
            {
              positionsName: null,
              display:       false
            }
          ],
          createrOrgTime: {
            type: 1,
            date_time: null,
          },
          officeStart:  {
            date_time:   null,
            type:        1,
          },
          officeStop:  {
            date_time:   null,
            type:        1,
          },
          address:        null,
          latitude:       null,
          longitude:      null,
          type:           null,
          orgUnitId:      null,
          orgIds:         [],
        }
      },
      /**
       * 获取党组织详情中的数据(使用promise时需要将promise放在函数中, 否则将会立刻执行)
       * @return {[type]} [description]
       */
      getPartyDetail (item) {
        let self = this;
        //初始化promise对象, 完成异步操作后return此对象, 外部方法链式调用then进行下一步操作
        self.$request.requestAxios("get", `${basePath}/party_orgs/${item.id}/partyorg`, null, 
          (response) => {
            self.partyForm = response.data.data
            if(!self.partyForm.createrOrgTime) {
              self.partyForm.createrOrgTime = {
                type: 1,
                date_time: null,
              }
            }
            if(!self.partyForm.officeStart) {
              self.partyForm.officeStart = {
                type: 1,
                date_time: null,
              }
            }
            if(!self.partyForm.officeStop) {
              self.partyForm.officeStop = {
                type: 1,
                date_time: null,
              }
            }
            self.loading = false
            self.partyDialogVisible = true
            self.$nextTick(() => {
              if(self.$refs.partyForm) {
                self.$refs.partyForm.clearValidate();
              }
            })
          },
          (error) => {
            self.loading = false
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 地址校验, 根据输入的内容校验经纬度字段
       * @return {[type]} [description]
       */
      checkAddress () {
        if(this.partyForm.address) {
          this.mapLocation(this.partyForm.address)
        } else {
          this.partyForm.latitude  = null
          this.partyForm.longitude = null
          this.$refs.partyForm.validateField("latitude")
        }
      },
      /**
       * 根据输入的地址返回经纬度, 并记录到表单对象中
       * @return none
       */
      mapLocation (address) {
        let self = this
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 调用查询(异步)
        myGeo.getPoint(address, function(point){
          if (point) {
            self.partyForm.latitude  = point.lat
            self.partyForm.longitude = point.lng
            self.$refs.partyForm.validateField("latitude")
          }else{
            self.partyForm.latitude  = null
            self.partyForm.longitude = null
            self.$refs.partyForm.validateField("latitude")
          }
        }, "");
      },
      /**
       * 删除党组织
       * @param  {object} node 节点node
       * @param  {object} data 节点数据
       * @return {[type]}      [description]
       */
      deleteParty(node, data) {
        let self = this;
        self.$confirm(data.id == self.treeId ? "即将删除的是左侧已选中的组织, 确认删除?" : "确定删除吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$request.requestAxios("delete", `${basePath}/party_orgs/partyorg/delete/${data.id}/from_org/${self.orgCode}`, null,
            (reponse) => {
              self.$message.success("删除成功")
              //重新查询
              if(self.treeId != 0) {
                self.getDataList(`/party_orgs/${ this.treeId }/partyorgtree`, "partyListData")
              }
              if(data.id == self.treeId) { //删除当前选中的组织, 通知父组件初始化树图
                self.$emit("treeDeleted")
              } else {
                self.$emit("treeChanged") // 广播事件通知父组件
              }
            },
            (error) => {
              self.$message.error(error.data.meta.message)
            }
          )
        }).catch((error) =>{
          
        })
      },
      /**
       * 鼠标浮动, 显示对应的编辑按钮
       * @param  {object} data 当前树节点的数据
       * @return {[type]}      [description]
       */
      showControl(data) {
        this.tempId = data.id
      },
      addPositonItem () {
        if(!this.partyForm.positions) {
          this.partyForm.positions = []
        }
        this.partyForm.positions.push({
          name: null,
          display: false
        })
      },
      deletePositionItem (index) {
        this.partyForm.positions.splice(index, 1)
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this

        let config = {
          url:    `${basePath}/party_orgs/partyorg/add/from_org/${self.treeId}`,
          method: "post",
          data:   self.partyForm
        }

        if (self.tempLevel == "sameLevel") { //添加同级党组织
          self.partyForm.parentId   = self.tempOperateObj.parentId
        } else if (self.tempLevel == "childLevel") { // 添加本级公司的下级党组织
          self.partyForm.parentId = self.tempOperateObj.id
        } else { //点击添加顶层组织
          self.partyForm.parentId = null
        }
        
        if(self.tempOperateType == "edit") {
          config.url    = `${basePath}/party_orgs/partyorg/update/${self.tempOperateObj.id}/from_org/${self.orgCode}`
          config.method = "patch"
        }
        
        //追加选中公司的id数组
        // self.partyForm.companyId = self.$refs.companyEdit.getArray("id")

        self.$refs[formName].validate((valid) => {
          if (valid) {
              self.loading = true
              self.partyForm.orgUnitId = self.partyForm.orgIds[self.partyForm.orgIds.length - 1]
              self.$request.requestAxios(config.method, config.url, config.data, 
                (response) => {
                  self.$message.success(response.data.meta.message)
                  //重新查询
                  self.$emit("treeChanged") // 广播事件通知父组件
                  if(self.treeId != 0) {
                    self.getDataList(`/party_orgs/${ this.treeId }/partyorgtree`, "partyListData")
                  }
                  self.loading = false
                  self.partyDialogVisible = false
                },
                (error) => {
                  self.$message.error(error.data.meta.message)
                  self.loading = false
                }
              )         
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        })
      },
      /**
       * 删除职位
       * @param  {[type]} item [description]
       * @return {[type]}      [description]
       */
      deletePosition(item) {
        var index = this.partyForm.positions.indexOf(item)
        if (index !== -1) {
          this.partyForm.positions.splice(index, 1)
        }
      },
      /**
       * 点击添加一个职位, 默认数据position如果不为[], 则需转换后再操作
       */
      addPosition() {
        if(!this.partyForm.positions) {
          this.partyForm.positions = []
        }
        this.partyForm.positions.push({
          positionsName: null,
          display: false
        })
      },
      /**
       * 上传成功, 写入img对应的path
       * @param  {[type]} response [description]
       * @param  {[type]} file     [description]
       * @param  {[type]} fileList [description]
       * @return none
       */
      uploadSuccess (response, file, fileList) {
        this.partyForm.headImg = this.$util.fileBasePath + response.data.url
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fill-width {
    width: 100%;
  }
  .button-group {
    padding: 10px;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
  }
  .custom-tree-node .tree-right-operate {
    margin-left: 15px;
  }
  .position-wrap {
    position:  relative;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .position-title {
    position: absolute;
    top: -30px;
    margin: 0 0 0 50px;
    text-align: center;
    font-size: 14px;
  }
  /*上传头像*/
  .avatar-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
  }
  .avatar-wrap:hover {
    border: 1px dashed #409EFF;
    color: #409EFF;
  }
  .avatar-img {
    max-width: 100%;
  }
</style>

<!-- 强制样式 -->
<style> 
  #construction .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
</style>