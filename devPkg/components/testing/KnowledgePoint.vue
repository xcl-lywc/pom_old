/*********************图片考试 - 知识点管理***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div class="content-area">
    <el-button
      :disabled="!canAdd"
      type="primary"
      size="mini"
      @click="showDialog('topLevel', 'new', null)">
      添加顶层
    </el-button>
    <el-tree
        ref="partyTree"
        :data="treeData"
        v-loading="loading"
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="showControl(data)" @mouseout="tempId = null">
          <span> {{ node.label }} <i v-if="false" class="fa fa-star text-yellow" aria-hidden="true"></i></span>
          <span v-show="tempId == data.id" class="tree-right-operate">
            <el-button
              v-if="canAdd"
              type="text"
              size="mini"
              @click="showDialog('childLevel', 'new', data)">
              添加下级
            </el-button>
            <el-button
              v-if="canAdd"
              type="text"
              size="mini"
              @click="showDialog('sameLevel', 'new', data)">
              添加同级
            </el-button>
            <el-button
              v-if="canUpdate"
              type="text"
              size="mini"
              @click="showDialog('sameLevel', 'edit', data)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="(data.childrens && data.childrens.length <= 0) && canDelete"
              @click="() => deleteParty(node, data)">
              删除
            </el-button>
          </span>
        </span>
    </el-tree>
    

    <el-dialog
      :title="tempOperateType == 'new' ? '新增' : '编辑'"
      :visible.sync="partyDialogVisible"
      :close-on-click-modal="false"
      width="40%"
      @before-close="focusStatus = false"
      @close="restPartyForm"
      >
      <div v-loading="loading">
        <el-form :model="partyForm" ref="partyForm" :rules="rules" label-width="120px" size="small">
          <el-form-item
            prop="name"
            label="知识点名称"
            :rules="{ required: true, message: '请输入知识点名称', trigger: 'blur' }">
            <el-input v-model="partyForm.name"></el-input>
          </el-form-item>
        </el-form>        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="partyDialogVisible = false">取 消</el-button>
        <el-button :disabled="loading" type="primary" @click="submitForm('partyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      var checkTime = (rule, value, callback) => {
        console.log(value)
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
        loading:   false,
        resource:  JSON.parse(sessionStorage.getItem("resource")),
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),
        treeData: [],   //党组织的树形结构
        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },
        //表单
        partyForm: {
          name:         null,
        },
        //验证
        rules: {
          createrOrgTime: [
            { validator: checkTime, trigger: 'blur' },
            { validator: checkTime, trigger: 'change' },
            { required: true, message: '请选择成立日期', trigger: 'blur' }
          ]
        },
        typeName:         null,   //类型input名称
        tempLevel:        null,   //当前操作的层级 sameLevel本级 childLevel子级 topLevel 顶级
        tempId:           null,   //鼠标移动到对应的节点, 记录此节点id, 显示对应的操作按钮
        tempOperateType:  null,   //当前操作模式 new新增 edit编辑
        tempOperateObj:   {},     //当前触发操作的data对象
        parentType:       null,   //父节点的类型, 用于判断 添加或编辑节点的类型
        partyDialogVisible: false,
        dictionaryPosition: [],

        canAdd: false,
        canUpdate: false,
        canDelete: false,
      }
    },
    components: {

    },
    mounted () {
      this.getTreeData(`/knowledges/knowledges/all_tree`, "treeData")
      this.canAdd    = this.resource && this.resource.indexOf(410) == -1 ? false : true
      this.canUpdate = this.resource && this.resource.indexOf(412) == -1 ? false : true
      this.canDelete = this.resource && this.resource.indexOf(411) == -1 ? false : true
    },
    watch : {
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
            self.$message.error("获取数据对照表失败, 部分功能无法使用")
          }
        )
      },
      /**
       * 获取树形数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getTreeData (url, target) {
        var self = this
        self.loading = true
        self.partyDialogVisible = false;

        self.$request.requestAxios('get', `${basePath}${url}`, null, 
          (response) => {
            self[target] = response.data.data;
            self.loading = false
          },
          (error) => {
            self.$message.error(error)
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
      showDialog (typeStr, operate, data) {
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
              self.restPartyForm()
              self.$refs.partyForm.clearValidate();
            }
          })
        }

        
        self.loading = false
      },
      restPartyForm () {
        this.partyForm = {
          name:         null
        },
        this.$refs.partyForm.resetFields();
      },
      /**
       * 获取党组织详情中的数据(使用promise时需要将promise放在函数中, 否则将会立刻执行)
       * @return {[type]} [description]
       */
      getPartyDetail (item) {
        let self = this;
        //初始化promise对象, 完成异步操作后return此对象, 外部方法链式调用then进行下一步操作
        self.$request.requestAxios("get", `${basePath}/knowledges/knowledges/details`, {params: {id: item.id}}, 
          (response) => {
            self.partyForm   = response.data.data

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
            self.$message.error(error)
          }
        )
      },
      /**
       * 删除党组织
       * @param  {object} node 节点node
       * @param  {object} data 节点数据
       * @return {[type]}      [description]
       */
      deleteParty(node, data) {
        let self = this;
        self.$confirm("确定删除吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$request.requestAxios("delete", `${basePath}/knowledges/knowledges/delete/${data.id}/from_org/${self.orgCode}`, null,
            (reponse) => {
              self.$message.success("删除成功")
              //重新查询
              self.getTreeData(`/knowledges/knowledges/all_tree`, "treeData")
            },
            (error) => {
              self.$message.error(error)
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
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this

        let config = {
          url:    `${basePath}/knowledges/knowledges/add/from_org/${self.orgCode}`,
          method: "post",
          data:   self.partyForm
        }

        if(self.tempOperateType == "edit") {
          config.url    = `${basePath}/knowledges/knowledges/update/${self.tempOperateObj.id}/from_org/${self.orgCode}`
          config.method = "patch"
        }

        if (self.tempLevel == "sameLevel") { //添加同级党组织
          self.partyForm.parentId   = self.tempOperateObj.parentId
        } else if (self.tempLevel == "childLevel") { // 添加本级公司的下级党组织
          self.partyForm.parentId = self.tempOperateObj.id
        } else { //点击添加顶层组织
          self.partyForm.parentId = null
        }
        //追加选中公司的id数组
        // self.partyForm.companyId = self.$refs.companyEdit.getArray("id")

        self.$refs[formName].validate((valid) => {
          if (valid) {
              self.loading = true

              self.$request.requestAxios(config.method, config.url, config.data, 
                (response) => {
                  self.$message.success(response.data.meta.message)
                  //重新查询
                    self.getTreeData(`/knowledges/knowledges/all_tree`, "treeData")
                  self.loading = false
                  self.partyDialogVisible = false
                },
                (error) => {
                  self.$message.error(error)
                  self.loading = false
                }
              )         
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
</style>