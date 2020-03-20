/*********************公司组织构建***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-14
  TODO 默认党组织功能
/************************************************/
<template>
  <div class="content-area" id="company-construction">
    <el-tree
      ref="typeTree"
      :data="orgList"
      v-if="orgList"
      v-loading="loading"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="showContorl(data)" @mouseout="tempId = null">
        <span>{{ node.label }}</span>
        <span v-show="tempId == data.id" class="tree-right-operate">
          <el-button
            type="text"
            size="mini"
            @click="showCompanyDialog('childLevel', 'new', data)">
            添加下级
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="showCompanyDialog('sameLevel', 'edit', data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="data.childrens && data.childrens.length <= 0"
            @click="() => deleteOrg(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-button
      v-else
      type="primary"
      size="mini"
      @click="showCompanyDialog('topLevel', 'new', null)">
      开始构建
    </el-button>

    <el-dialog
      :title="tempOperateType == 'new' ? '新增' : '编辑'"
      :visible.sync="orgDialogVisible"
      :close-on-click-modal="false"
      width="80%">
      <div v-loading="loading">
        <el-form :model="orgForm" ref="orgForm" :rules="rules" label-width="120px" size="small">
          <el-row>
          <el-col :span="12">
            <el-form-item
              prop="name"
              label="公司/部门名称"
              :rules="{ required: true, message: '请输入公司/部门名称', trigger: 'blur' }">
              <el-input v-model="orgForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司头像">
              <el-upload
                class="avatar-wrap"
                :action="imgServer"
                :headers="token"
                :show-file-list="false"
                :on-success="uploadSuccess"
                name="upfile">
                  <img v-if="orgForm.photo" :src="orgForm.photo" class="avatar-img">
                  <i v-else class="el-icon-plus">上传头像</i>
              </el-upload>
            </el-form-item>
            <el-form-item
              v-if="partyTree && partyTree.length > 0"
              label="所属党组织">
              <el-cascader
                change-on-select
                class="fill-width"
                :options="partyTree"
                :props="{
                  children: 'childrens',
                  label: 'name',
                  value: 'id'
                }"
                v-model="orgForm.partyCode">
              </el-cascader>
            </el-form-item>
            <el-form-item
              v-if="guildTree && guildTree.length > 0"
              label="所属工会组织">
              <el-cascader
                change-on-select
                class="fill-width"
                :options="guildTree"
                :props="{
                  children: 'childrens',
                  label: 'name',
                  value: 'id'
                }"
                v-model="orgForm.guildIds">
              </el-cascader>
            </el-form-item>
            <el-form-item
              v-if="groupTree && groupTree.length > 0"
              label="所属团组织">
              <el-cascader
                change-on-select
                class="fill-width"
                :options="groupTree"
                :props="{
                  children: 'childrens',
                  label: 'name',
                  value: 'id'
                }"
                v-model="orgForm.groupIds">
              </el-cascader>
            </el-form-item>
            <el-form-item v-else label="所属团组织">
              当前没有任何团组织
            </el-form-item>
            <el-form-item
              label="成立时间"
              prop="buildTime.date_time">
              <!--  -->
              <el-date-picker class="fill-width" :type="$util.datePickerType(orgForm.buildTime.type)" v-model="orgForm.buildTime.date_time" value-format="timestamp" placeholder="请选择成立时间"></el-date-picker>
              <el-select class="date-picker-after" v-model="orgForm.buildTime.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`成立时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="任期开始时间">
              <!-- prop="officeStart.date_time" -->
              <el-date-picker class="fill-width" :type="$util.datePickerType(orgForm.officeStart.type)" v-model="orgForm.officeStart.date_time" value-format="timestamp" placeholder="请选择任期开始时间"></el-date-picker>
              <el-select class="date-picker-after" v-model="orgForm.officeStart.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`任期开始时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="任期开始时间">
              <!-- prop="officeStart.date_time" -->
              <el-date-picker class="fill-width" :type="$util.datePickerType(orgForm.officeStart.type)" v-model="orgForm.officeStart.date_time" value-format="timestamp" placeholder="请选择任期开始时间"></el-date-picker>
              <el-select class="date-picker-after" v-model="orgForm.officeStart.type">
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`任期开始时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="任期结束时间">
              <!-- prop="officeStop.date_time" -->
              <el-date-picker class="fill-width" :type="$util.datePickerType(orgForm.officeStop.type)" v-model="orgForm.officeStop.date_time" value-format="timestamp" placeholder="请选择任期结束时间"></el-date-picker>
              <el-select class="date-picker-after" v-model="orgForm.officeStop.type" >
                <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`任期结束时间${index}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="description"
              label="公司/部门描述"
              :rules="{ required: true, message: '请输入公司/部门描述', trigger: 'blur' }">
              <el-input v-model="orgForm.description" type="textarea" :rows="10"></el-input>
            </el-form-item>
            <el-form-item
              label="地址"
              prop="latitude"
              :rules="{ required: true, message: '请输入正确的地址', trigger: 'blur' }">
              <el-input v-model="orgForm.address" type="text" @blur="checkAddress" @focus="focusStatus = true"></el-input>
            </el-form-item>
            <el-form-item
              label="邮箱">
              <el-input v-model="orgForm.mailbox" type="text"></el-input>
            </el-form-item>
            <el-form-item
              label="电话">
              <el-input v-model="orgForm.phone" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <h5 class="position-title">职位列表<small>（不会保存重复添加的职位）</small></h5>
            <el-form-item
              v-for="(item, index) in orgForm.positions"
              :key="'职位' + index"
              :prop="'positions.' + index + '.nameId'"
              :rules="{ required: true, message: '职位名称不能为空', trigger: 'change' }"
              class="left-margin-50">
              <el-row :gutter="15">
              <el-col :span="19">
                <el-select v-model="item.nameId" class="fill-width">
                  <el-option v-for="itemInner in dictionaryPosition" :label="itemInner.value" :value="itemInner.key" :key="index + itemInner.key"></el-option>
                </el-select>
              </el-col>
              <!-- <el-col :span="4">
                <el-checkbox label="显示" v-model="item.display" name="display"></el-checkbox>
              </el-col> -->
              <el-col :span="4"><el-button type="danger" @click.prevent="deletePosition(item)">删除</el-button></el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="left-margin-50">
              <el-button @click="addPosition">新增职位</el-button>
            </el-form-item>
          </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="orgDialogVisible = false">取 消</el-button>
        <el-button :disabled="loading" type="primary" @click="submitForm('orgForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>

  export default {
    data() {
      var checkTime = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请选择时间区间'));
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
        token:     { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("token"))}`},
        orgCode: sessionStorage.getItem("orgCode"),
        loading: false,

        orgList:       [],     //公司的树形结构
        partyTree:     [],     //党组织的树形结构
        defaultProps: {
          children: 'childrens',   //分类/专题树的配置
          label: 'name'
        },

        //公司表单
        orgForm: {
          name:         null, //
          parentId:     null, //
          buildTime:    {
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
          partyCode:    [], //树形选中的array
          partyOrgId:   null, //最终选中的所属党组织id
          description:  null, 
          mailbox:      null,
          address:      null,
          phone:        null,
          positions:    [
            {
              nameId: null,
              // display: false
            }
          ],
          latitude:       null,
          longitude:      null,
          type:           null,
        },
        rules: {
          'buildTime.date_time': [
            { validator: checkTime, trigger: 'blur' },
            { validator: checkTime, trigger: 'change' },
            // { required: true, message: '请选择成立时间', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择层级类型', trigger: 'change' }
          ],
          orgLevel: [
            { required: true, message: '请选择层级', trigger: 'change' }
          ],
        },
        focusStatus:       false,  //打开对话框后, 开始输入地址的状态,在此状态下动态根据address更新latitude

        typeName:          null,   //类型input名称
        tempLevel:         null,   //当前操作的层级 sameLevel本级 childLevel子级 topLevel 顶级
        tempId:            null,   //鼠标移动到对应的节点, 记录此节点id, 显示对应的操作按钮
        tempOperateType:   null,   //当前操作模式 new新增 edit编辑
        tempOperateObj:    {},     //当前触发操作的data对象
        orgDialogVisible:  false,

        dictionaryPosition: [],

        groupTree:          [],  //团组织树
        guildTree:          [],  //工会组织树
      }
    },
    props: {
      treeId: {
        type: Number,
        required: true,
      }
    },
    watch: {
      "orgForm.address": {
        handler (newV, oldV) {
          if(this.focusStatus) { // 当input聚焦时开启动态验证, 否则不进行验证
            this.checkAddress()
          }
        },
        deep: true
      },
      treeId: { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          console.log(newV)
          if(newV && newV != 0) {
            this.getDataList(`/org_units/${this.treeId}/orgunitstree`, "orgList")
          }
        },
        deep: true
      }
    },
    created () {
      this.getGuildtree();
      this.getGrouptree();
    },
    mounted () {
      if(this.treeId != 0) {
        this.getDataList(`/org_units/${this.treeId}/orgunitstree`, "orgList")
      }
      this.getPartyList()
      this.getDictionaryData()
    },
    methods: {
      /**
       * 获取字典表数据
       * @return {[type]} [description]
       */
      getDictionaryData () {
        let self = this;
        JSON.parse(sessionStorage.getItem('controlTable')).forEach((item) => {
          switch (item.id) {
            case 7: //公司组织
              self.dictionaryPosition = item.list;
              break;
            default:
              break;
          }
        })
      },
      /**
       * 获取公司树形数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getDataList (url, target) {
        var self = this
        self.loading = true
        self.orgDialogVisible = false;
        let config = {
          url: basePath + url,
          method: 'get',
        }
        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            self[target] = []
            self[target].push(response.data.data);
            self.loading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.loading = false
          }
        )
      },
      /**
       * 获取党组织数据(全部)
       * @return none
       */
      getPartyList () {
        var self = this

        let config = {
          url: `${basePath}/party_orgs/partyorgstree`,
          method: 'get',
        }

        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            let data = JSON.parse(JSON.stringify(response.data.data))
            data.forEach((item, index) => {
              this.$util.traverseTree(item)
            })
            this.partyTree = data
          },
          (error) => {
            this.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 点击显示分类输入dialog
       * @param {string} typeStr  添加顶层top 或是 添加子集层 child
       * @param {string} operate  当前操作模式
       * @param {object} data     当前点击的对象data
       */
      showCompanyDialog (typeStr, operate, data) {
        let self = this;
        self.orgDialogVisible = true;
        self.tempLevel         = typeStr;
        self.tempOperateObj    = data //保存当前操作的data
        self.tempOperateType   = operate
        // if(self.$refs.orgForm) { //显示dialog时重置验证状态 
        //   self.$refs.orgForm.resetFields();
        // }
        if(operate == "edit") {  //编辑查询详情后赋值
          self.loading = true
          let config = {
            url:    `${basePath}/org_units/${data.id}/orgunit`,
            method: "get"
          }
          self.$request.requestAxios(config.method, config,url, null,
            (response) => {
              self.orgForm = response.data.data
              if(!self.orgForm.buildTime) {
                self.orgForm.buildTime = {
                  type: 1,
                  date_time: null,
                }
              }
              if(!self.orgForm.officeStart) {
                self.orgForm.officeStart = {
                  type: 1,
                  date_time: null,
                }
              }
              if(!self.orgForm.officeStop) {
                self.orgForm.officeStop = {
                  type: 1,
                  date_time: null,
                }
              }
              self.loading = false
                self.$nextTick(() => {
                if(self.$refs.orgForm){
                  self.$refs.orgForm.clearValidate();
                }
              })
            },
            (error) =>{
              self.loading = false
              this.$message.error(error.data.meta.message)
            }
          )
        } else {
          self.orgForm = { //新增时清空数据
            name:         null,
            parentId:     null,
            description:  null,
            partyCode:    [],
            partyOrgId:   null,
            buildTime:    {
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
            mailbox:      null,
            address:      null,
            phone:        null,
            positions:    [],
            latitude:     null,
            longitude:    null,
            type:         null,
            parentId:     data.id,
          }
          self.$nextTick(() => {
            if(self.$refs.orgForm){
              self.$refs.orgForm.clearValidate();
            }
          })
        }
      },
      deleteOrg(node, data) {
        let self = this;
        self.$confirm(data.id == self.treeId ? "即将删除的是左侧已选中的组织, 确认删除?" : "确定删除?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let config = {
            url:    `${basePath}/org_units/orgunit/delete/${data.id}/from_org/${self.orgCode}`,
            method: "delete"
          }
          self.$request.requestAxios(config.method, config.url, null,
            (response) => {
              self.$message.success("删除成功")
              //重新查询
              if(self.treeId != 0) {
                self.getDataList(`/org_units/${this.treeId}/orgunitstree`, "orgList")
              }
              
              if( data.id == self.treeId ) { //删除当前选中的组织, 通知父组件初始化树图
                self.$emit("treeDeleted")
              } else {
                self.$emit("treeChanged") // 广播事件通知父组件
              }

            },
            (error) =>{
              this.$message.error(error.data.meta.message)
            }
          )
        }).catch((error) => {})
      },
      /**
       * 鼠标浮动, 显示对应的编辑按钮
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      showContorl(data) {
        this.tempId = data.id
      },
      addPositonItem () {
        if(!this.orgForm.positions) {
          this.orgForm.positions = []
        }
        this.orgForm.positions.push({
          nameId: null,
          // display: false
        })
      },
      deletePositionItem (index) {
        this.orgForm.positions.splice(index, 1)
      },


      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集)
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this
        
        let config = {
          url:    `${basePath}/org_units/orgunit/add/from_org/${self.orgCode}`,
          method: "post",
          data:   self.orgForm
        }
        
        if (self.tempLevel == "sameLevel") { //添加同级公司
          self.orgForm.parentId   = self.tempOperateObj.parentId
        } else if (self.tempLevel == "childLevel") { // 添加本级公司的下级公司
          self.orgForm.parentId = self.tempOperateObj.id
        } else { //点击添加顶层组织
          self.orgForm.parentId = null
        }

        if (self.tempOperateType == "edit") {
          config.method = "patch";
          config.url    =  `${basePath}/org_units/orgunit/update/${self.tempOperateObj.id}/from_org/${self.orgCode}`;
        } 


        self.$refs[formName].validate((valid) => {
          if (valid) {

            self.loading = true
            //写入选中的组织Id 删除xxxCode字段(仅用于展示)
            if(self.orgForm.partyCode && self.orgForm.partyCode.length > 0) {
              self.orgForm.partyOrgId = self.orgForm.partyCode[self.orgForm.partyCode.length - 1]
              delete self.orgForm.partyCode
            }
            if(self.orgForm.guildIds && self.orgForm.guildIds.length > 0) {
              self.orgForm.guildId = self.orgForm.guildIds[self.orgForm.guildIds.length - 1]
              delete self.orgForm.guildIds
            }
            if(self.orgForm.groupIds && self.orgForm.groupIds.length > 0) {
              self.orgForm.groupId = self.orgForm.groupIds[self.orgForm.groupIds.length - 1]
              delete self.orgForm.groupIds
            }
            

            self.$request.requestAxios(config.method, config.url, config.data,
              (response) => {
                self.$message.success("成功")
                //重新查询
                if(self.treeId != 0) {
                  self.getDataList(`/org_units/${this.treeId}/orgunitstree`, "orgList")
                }
                self.$emit("treeChanged")
                self.loading = false
                self.orgDialogVisible = false
              },
              (error) =>{
                self.loading = false
                self.$message.error(error.data.meta.message)
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
        var index = this.orgForm.positions.indexOf(item)
        if (index !== -1) {
          this.orgForm.positions.splice(index, 1)
        }
      },
      /**
       * 点击添加一个职位, 默认数据position如果不为[], 则需转换后再操作
       */
      addPosition() {
        if(!this.orgForm.positions) {
          this.orgForm.positions = []
        }
        this.orgForm.positions.push({
          nameId: null,
          // display: false
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
        this.orgForm.photo = this.$util.fileBasePath + response.data.url
      },
      /**
       * 地址校验, 根据输入的内容校验经纬度字段
       * @return {[type]} [description]
       */
      checkAddress () {
        if(this.orgForm.address) {
          this.mapLocation(this.orgForm.address)
        } else {
          this.orgForm.latitude  = null
          this.orgForm.longitude = null
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
            self.orgForm.latitude  = point.lat
            self.orgForm.longitude = point.lng
          }else{
            self.orgForm.latitude  = null
            self.orgForm.longitude = null
          }
        }, "");
      },
      /*
       * 查询版本列表
       */
      getVersionList(){
        let self = this
        this.$request.requestAxios("get", `${basePath}/version/versions`, null,
          (response) => {
            this.versionList = response.data.data;
         },
         (error)=>{
            self.$message.error(error.data.meta.message)
          }
        );
       },
      /*
       * 获取工会组织树 
       */
      getGuildtree() {
        let self = this
        this.$request.requestAxios("get", `${basePath}/guild/guildtree`, null,
          (response) => {
            let data = JSON.parse(JSON.stringify(response.data.data))
            data.forEach((item, index) => {
              this.common.traverseTree(item)
            })
            this.guildTree = data
          },
          (error)=> {
            self.$message.error(error.data.meta.message)
          }
        );
       },
      /*
       * 获取团组织树 
       */
      getGrouptree() {
        let self = this
        this.$request.requestAxios("get", `${basePath}/group/grouptree`, null,
          (response) => {
            let data = JSON.parse(JSON.stringify(response.data.data))
            data.forEach((item, index) => {
              this.common.traverseTree(item)
            })
            this.groupTree = data
          },
          (error)=> {
            self.$message.error(error.data.meta.message)
          }
        );
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    max-height: 300px;
    max-width: 100%;
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
  .position-title {
    position: absolute;
    top: -25px;
    margin: 0 0 10px 50px;
    text-align: center;
    font-size: 14px;
  }
</style>

<!-- 强制样式 -->
<style> 
  #company-construction .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
  #company-construction .el-tree-node__expand-icon.el-icon-caret-right{
    font-size: 18px;
    color: #000;
  }
  #company-construction .el-tree-node__expand-icon.el-icon-caret-right.is-leaf{
    color: transparent;
  }
  #company-construction .el-upload.el-upload--text {
    width: 100%;
  }
</style>