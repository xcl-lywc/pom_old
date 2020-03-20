/*********************公司组织简介***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-31
/************************************************/
<template>
  <div style="padding: 5px;" id="company-intro">
    <!-- 类型对应的按钮组 -->
    <el-button-group style="margin-bottom: 10px;">
      <el-button :type="activeButton == 'intro' ? 'primary' : 'default'" @click="activeButton = 'intro'">简介</el-button>
      <el-button v-for="item in typesList" :key="item.id" :type="activeButton == item.id ? 'primary' : 'default'" @click="typeButtonClicked(item)">{{ item.title }}</el-button>
      <el-button type="default" @click="addButtonCLicked">添加+</el-button>
    </el-button-group>
    <!-- 简介对应的内容 -->
    <div v-show="activeButton == 'intro'" label="简介" name="intro" :closable="false">
      <div v-if="orgForm">
        <div v-loading="loading" class="form-wrap">
          <el-form :model="orgForm" ref="orgForm" :rules="rules" label-width="130px" size="small">
              <el-form-item
                prop="name"
                label="公司/部门名称："
                :rules="{ required: true, message: '请输入公司/部门名称', trigger: 'blur' }">
                <el-input v-model="orgForm.name"></el-input>
              </el-form-item>
              <el-form-item label="公司头像：">
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
                v-show="partyTree && partyTree.length > 0"
                label="预设党组织">
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
                v-show="guildTree && guildTree.length > 0"
                label="预设工会组织">
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
                v-show="groupTree && groupTree.length > 0"
                label="预设团组织">
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
                label="任期结束时间">
                <!-- prop="officeStop.date_time" -->
                <el-date-picker class="fill-width" :type="$util.datePickerType(orgForm.officeStop.type)" v-model="orgForm.officeStop.date_time" value-format="timestamp" placeholder="请选择任期结束时间"></el-date-picker>
                <el-select class="date-picker-after" v-model="orgForm.officeStop.type" >
                  <el-option :label="item.label" v-for="(item, index) in $util.timeType" :value="item.value" :key="`任期结束时间${index}`"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="type"
                label="组织类型">
                <el-radio-group v-model="orgForm.type" @change="orgForm.orgLevel = null">
                  <el-radio :label="10231">单位</el-radio>
                  <el-radio :label="10232">部门</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                v-if="orgForm.type == 10231"
                prop="orgLevel"
                label="单位级别">
                <el-select v-model="orgForm.orgLevel" class="fill-width">
                  <el-option v-for="(item, index) in dictionaryUnitLevel" :label="item.value" :value="item.key" :key="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="orgForm.type == 10232"
                prop="orgLevel"
                label="部门级别">
                <el-select v-model="orgForm.orgLevel" class="fill-width">
                  <el-option v-for="(item, index) in dictionaryDepartLevel" :label="item.value" :value="item.key" :key="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="description"
                label="公司/部门描述："
                :rules="{ required: true, message: '请输入公司/部门描述', trigger: 'blur' }">
                <el-input v-model="orgForm.description" type="textarea" :rows="10"></el-input>
              </el-form-item>
              <el-form-item
                prop="latitude"
                label="地址："
                :rules="{ required: true, message: '请输入正确的地址', trigger: 'blur'}">
                <el-input v-model="orgForm.address" type="text" @blur="checkAddress" @focus="focusStatus = true"></el-input>
              </el-form-item>
              <el-form-item
                label="邮箱：">
                <el-input v-model="orgForm.mailbox" type="text"></el-input>
              </el-form-item>
              <el-form-item
                label="电话：">
                <el-input v-model="orgForm.phone" type="number"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="loading" type="primary" @click="submitForm('orgForm')">确 定</el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 后续添加的内容 -->
    <div v-show="activeButton == null">
      <el-form  ref="typeForm" :model="typeForm" label-width="80px" @submit.native.prevent>
        <el-form-item label="类型名称">
          <el-input type="text" v-model="typeForm.typeName" size="small"></el-input>
        </el-form-item>
      </el-form>
      
    </div>
    <!-- 编辑器(只需要一个, 后续重复操作此编辑器) -->
    <UEditor v-show="activeButton != 'intro'" :config="editorConfig" ref="ueditor"></UEditor>
    <div style="margin: 12px 0">
      <el-button :disabled="activeButton == null && !typeForm.typeName" v-show="activeButton != 'intro'" class="fill-width" type="primary" @click="saveType">保存</el-button>
    </div>
    <div>
      <el-button v-show="activeButton != 'intro' && activeButton != null" class="fill-width" type="danger" @click="deleteType">删除</el-button>
    </div>
  </div>
</template>

<script>
  import Ueditor from '../../common/Ueditor.vue'

  export default {
    data () {
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
        loading:   false,
        imgServer: `${basePath}/sys/ueditor/file?action=uploadimage`,
        token:     { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("userData")).token}`},
        orgCode:   sessionStorage.getItem('orgCode'),
        orgForm:     {
          buildTime:    {
            date_time:   null,
            type:        1, //1:年月日 2:年月
          },
          officeStart:  {
            date_time:   null,
            type:        1,
          },
          officeStop:  {
            date_time:   null,
            type:        1,
          },
        },
        focusStatus: false,  //打开对话框后, 开始输入地址的状态,在此状态下动态根据address更新latitude

        
        typesList:     [],
        operateType:   "new",
        activeButton:  "intro",

        typeForm: {
          typeName:  null,
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

        initFlag: false,
        editorConfig: {
          /*可以在此处定义工具栏的内容*/
          elementPathEnabled: false,
          autoHeightEnabled: false,
          autoFloatEnabled: false,　　//是否工具栏可浮动
          initialContent: ' ',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent: false,
          //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
        partyTree:          [],  //党组织的树形结构
        groupTree:          [],  //团组织树
        guildTree:          [],  //工会组织树
        defaultProps: {
          children: 'childrens',   //分类/专题树的配置
          label: 'name'
        },

        dictionaryUnitLevel:    [], //字典表 - 单位层级
        dictionaryDepartLevel:  [], //字典表 - 部门层级
      }
    },
    props: {
      treeId: {
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
      "treeId": { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          this.getTypeList()
          this.getDetail()
        },
        deep: true
      },
      'typeValue': { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          
        },
        deep: true
      },
    },
    created () {
      
    },
    mounted () {
      this.getDictionaryData()
      this.getTypeList()
      this.getDetail()
      this.getGuildTree()
      this.getGroupTree()
      this.getPartyList()
    },
    components: {
      UEditor: Ueditor,
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

        self.$request.requestAxios(config.method, config.url, {params: config.data},
          (response) => {
          response.data.data.forEach((item) => {
            switch (item.id) {
              case 19: //单位层级
                self.dictionaryUnitLevel = item.list;
                break;
              case 20: //部门层级
                self.dictionaryDepartLevel = item.list;
                break;
              default:
                break;
              }
            })
          },
          (error) => {
            self.$message.error("获取数据对照表失败, 部分功能无法使用")
          }
        )
      },
      /*
       * 获取工会组织树 
       */
      getGuildTree() {
        let self = this
        let config = {
          url:    `${basePath}/guild/guildtree`,
          method: "get",
        }
        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            let data = JSON.parse(JSON.stringify(response.data.data))
            data.forEach((item, index) => {
              self.$util.traverseTree(item)
            })
            self.guildTree = data
          },
          (error)=> {
            self.$message.error(error.data.meta.message);
          }
        );
      },
      /*
       * 获取团组织树 
       */
      getGroupTree() {
        let self = this
        let config = {
          url:    `${basePath}/group/grouptree`,
          method: "get",
        }
         self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            let data = JSON.parse(JSON.stringify(response.data.data))
            data.forEach((item, index) => {
              this.$util.traverseTree(item)
            })
            this.groupTree = data
          },
          (error)=> {
            this.$message.error(error.data.meta.message);
          }
        );
      },
      /**
       * 查询type列表
       * @return {[type]} [description]
       */
      getTypeList () {
        let self = this

        let config = {
          url:    `${basePath}/org_units_info/findby/${self.treeId}/list`,
          method: "get",
        }
        let p = new Promise ((resolve, reject) => {
          self.$request.requestAxios(config.method, config.url, null, 
            (response) => {
              self.typesList = response.data.data
              resolve(response)
            },
            (error) => {
              reject(error)
              self.$message.error(error.data.meta.message)
            }
          )
        })
        
        return p
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

        self.axios(config).then((response) => {
          let data = JSON.parse(JSON.stringify(response.data.data))
          data.forEach((item, index) => {
            this.$util.traverseTree(item)
          })
          this.partyTree = data
        })
      },
      /**
       * 已有的按钮点击事件
       * @return {[type]} [description]
       */
      typeButtonClicked (item) {
        this.activeButton                = item.id
        this.typeForm.typeName           = item.title
        this.getTypeDetail(item.id)
      },
      /**
       * 点击新增按钮, 清空当前选中activeButton, 变为新增状态
       */
      addButtonCLicked () {
        this.activeButton      = null
        this.typeForm.typeName = null
        this.$nextTick( () => {
          this.$refs.ueditor.setContent(" ")
        })
      },
      /**
       * 获取 某一个分类的详情
       * @return {[type]} [description]
       */
      getTypeDetail (itemId) {
        let self = this

        let config = {
          url:    `${basePath}/org_units_info/${itemId}/details`,
          method: "get",
        }

        self.$request.requestAxios(config.method, config.url, null, 
          (response) => {
            self.$nextTick( () => {
              self.$refs.ueditor.setContent(response.data.data.info)
            }) 
            self.initFlag = true
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 新增或者删除时, 重新查询typeList并设置最后一个为选中状态
       * @return {[type]} [description]
       */
      afterUpdate (typeText, itemId) {
        let self = this
        // 在重新查询新的typesList之前 先获取当前删除的位置index
        let deleteIndex = 0

        self.typesList.forEach((item, index) => {
          if(itemId == item.id) {
            deleteIndex = index
          }
        })

        self.getTypeList().then((response) => {
          self.$message.success("成功")
          switch (typeText) {
            case "add": // 新增完成时将最后一位选中
              let typesLength = self.typesList.length
              self.activeButton = self.typesList[typesLength - 1].id
              break;
            case "edit":

              break;
            case "delete": // 删除完成时将当前位的前一位设置为选中, 若删除首位则选中新list的首位, 若list为空则intro为选中
              if(deleteIndex != 0) {
                self.activeButton = self.typesList[ deleteIndex - 1].id
              } else {
                self.activeButton = "intro"
              }
              
              break;
          }
        })
        
        
      },
      /**
       * 删除type
       * @return {[type]} [description]
       */
      deleteType () {
        let self = this

        let config = {
          url:    `${basePath}/org_units_info/delete/${self.activeButton}/from_org/${self.orgCode}`,
          method: "delete",
        }
        self.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$request.requestAxios(config.method, config.url, null,
            (response) => {
              self.afterUpdate("delete", self.activeButton)
            },
            (error) => {
              self.$message.error(error.data.meta.message)
            }
          )
        })
        
      },
      /**
       * 保存当前的type信息, 连同types和详情一起提交
       * @return {[type]} [description]
       */
      saveType (item) {
        let self = this
        let richTextContent = self.$refs.ueditor.getUEContent()

        let operateText = "add"
        let config = { //默认是新增的状态
          url:    `${basePath}/org_units_info/add/from_org/${self.orgCode}`,
          method: "post",
          data:   {
            name:  self.typeForm.typeName,
            info:  richTextContent,
            orgId: self.treeId
          }
        }

        if(self.activeButton != null) { //编辑的状态
          config.url     = `${basePath}/org_units_info/update/${self.activeButton}/from_org/${self.orgCode}`
          config.data.id = self.activeButton
          operateText    = "edit"
        }

        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            self.afterUpdate(operateText, self.activeButton) //根据不同的类型决定刷新的方式
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 根据treeId 查询基本信息的详情
       * @return {[type]} [description]
       */
      getDetail () {
        let self = this

        self.loading     = true
        self.focusStatus = false
        let config = {
          url:    `${basePath}/org_units/${self.treeId}/orgunit`,
          method: "get"
        }
        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            self.orgForm = response.data.data;
            // 时间为空时初始化时间对象
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
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集)
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this
        let config = {
          url:    `${basePath}/org_units/orgunit/update/${self.orgForm.id}/from_org/${self.orgCode}`,
          method: "patch",
          data:   self.orgForm
        }

        self.$refs[formName].validate((valid) => {
          if (valid) {
            //写入选中的组织Id 9v-model对应的字段仅用于展示)
            if(self.orgForm.partyCode && self.orgForm.partyCode.length > 0) {
              self.orgForm.partyOrgId = self.orgForm.partyCode[self.orgForm.partyCode.length - 1]
            }
            if(self.orgForm.guildIds && self.orgForm.guildIds.length > 0) {
              self.orgForm.guildId = self.orgForm.guildIds[self.orgForm.guildIds.length - 1]
            }
            if(self.orgForm.groupIds && self.orgForm.groupIds.length > 0) {
              self.orgForm.groupId = self.orgForm.groupIds[self.orgForm.groupIds.length - 1]
            }
            self.loading = true
            self.$request.requestAxios(config.method, config.url, config.data,
              (response) => {
                self.$message({
                  message: "成功",
                  type: "success"
                })
                //重新查询
                self.loading = false
                self.focusStatus = false
                //重新查询
                self.getDetail()
                self.$emit("treeChanged")
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
          this.$refs.orgForm.validateField("latitude")
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
            self.$refs.orgForm.validateField("latitude")
          }else{
            self.orgForm.latitude  = null
            self.orgForm.longitude = null
            self.$refs.orgForm.validateField("latitude")
          }
        }, "");
      },
      /*
       * 获取工会组织树 
       */
      //getGuildtree() {
      //   let config = {
      //     method: "get",
      //     url:    `${basePath}/guild/guildtree`
      //   }
      //   this.$request.requestAxios(config.method, config.url, null,
      //     (response) => {
      //       this.guildtree = response.data.data;
      //     },
      //     (error)=> {
      //       this.$message.error(error.data.meta.message);
      //     }
      //   );
      // },
      /*
       * 获取团组织树 
       */
      // getGrouptree() {
      //   this.axios.get(`${basePath}/group/grouptree`,'').then((response) => {
      //       this.grouptree = response.data.data;
      //     }).catch((error)=> {
      //       this.$message.error(error.data.meta.message);
      //   });
      // },
      /**
       * 点击团组织树节点, 查询组织下对应的数据
       * @param  {object} data 节点数据
       * @return none
       */
      clickGroupTree (data) {
        this.orgForm.orgForm.groupId = data.id
      },
      /**
       * 点击工会组织树节点, 查询组织下对应的数据
       * @param  {object} data 节点数据
       * @return none
       */
      clickGuildTree (data) {
        this.orgForm.guildId = data.id
      },
    }
  }
</script>
<style scoped>
  .form-wrap {
    padding: 12px;
  }
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
    max-height: 300px;
  }
</style>

<!-- 强制样式 -->
<style> 
  #company-intro .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
  #company-intro .el-tree-node__expand-icon.el-icon-caret-right{
    font-size: 18px;
    color: #000;
  }
  #company-intro .el-tree-node__expand-icon.el-icon-caret-right.is-leaf{
    color: transparent;
  }
  #company-intro .el-upload.el-upload--text {
    width: 100%;
  }
</style>