/*********************添加分类***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-01
/************************************************/
<template>
  <div v-loading="loading">
    <div class="button-group">
      <el-button type="primary" class="button-new-top-type" size="mini" @click="showTypeDialog('top', 'new')">添加顶层分类</el-button>
    </div>
    <el-tree
      ref="typeTree"
      v-if="typeList && typeList.length > 0"
      :data="typeList"
      v-loading="loading"
      node-key="atId"
      :props="defaultProps"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="showContorl(data)" @mouseout="tempAtId = null">
        <span>{{ node.label }}</span>
        <span v-if="tempAtId == data.atId" class="tree-right-operate">
          <el-button
            type="text"
            size="mini"
            @click="showTypeDialog('child', 'new', data)">
            添加子分类
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="data.atypes && data.atypes.length <= 0"
            @click="() => deleteType(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog
      :title="tempOperateType == 'new' ? '新增' : '编辑'"
      :visible.sync="typeDialogVisible"
      width="30%"
    >
      <el-form label-width="100px">
        <el-form-item :label="'分类名：'" required>
          <el-input v-model="typeName" type="text"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="typeDialogVisible = false">取 消</el-button>
        <el-button :disabled="!typeName" type="primary" @click="addType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,

        typeList:    [],        //分类的树形结构
        defaultProps: {
          children: 'atypes',   //分类/专题树的配置
          label: 'atName'
        },

        typeName:          null,   //类型input名称
        tempLevel:         null,   //当前操作的层级 top顶层 child 子集
        tempAtId:          null,   //鼠标移动到对应的节点, 记录此节点atId, 显示对应的操作按钮
        tempOperateType:   null,   //当前操作模式 new新增 edit编辑
        tempOperateObj:    {},     //当前触发操作的data对象
        typeDialogVisible: false,

        orgCode: sessionStorage.getItem("orgCode"),
      }
    },
    mounted: function () {
      this.getTypeList(null, `/a_types/allarticletypes/from_org/${this.orgCode}`, "typeList")
    },
    methods: {
      /**
       * 获取分类(树)
       * @return none
       */
      getTypeList (atType, url, target) {
        var self = this
        self.loading = true
        self.typeDialogVisible = false;
        let config = {
          url: basePath + url,
          method: 'get',
          params: {
            type: atType
          }
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
          self[target] = response.data.data;
          self.loading = false
        },
        (error) => {
          self.$message.error(error)
          self.loading = false
        })
      },
      /**
       * 点击显示分类输入dialog
       * @param {string} typeStr  添加顶层top 或是 添加子集层 child
       * @param {string} operate  当前操作模式
       * @param {object} data     当前点击的对象data
       */
      showTypeDialog (typeStr, operate, data) {
        this.typeDialogVisible = true;
        this.typeName          = null;
        this.tempLevel         = typeStr;
        this.tempOperateObj    = data //保存当前操作的data
        this.tempOperateType   = operate
        if(operate == "edit") {
          this.typeName = data.atName
        }
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集)
       */
      addType() {
        let self = this
        let config = {}
        if (self.tempLevel == "top") {
          config.data = {
            atName: self.typeName,
            atType: "1"
          }
        } else {
          config.data = {
            atName: self.typeName,
            atType: "1",
            parentId: self.tempOperateObj.atId,
          }
        }

        if(self.tempOperateType == "new") {
          config.url    = `${basePath}/a_types/add/from_org/${self.orgCode}`,
          config.method = "post"
        } else {
          config.url    = `${basePath}/a_types/${self.tempOperateObj.atId}/from_org/${self.orgCode}`,
          config.method = "patch"
          config.data = {
            atName: self.typeName
          }
        }
        // config.data.partyOrgId = userOrgId
        self.$request.requestAxios(config.method, config.url, config.data,
        () => {
          self.$message({
            message: "成功",
            type: "success"
          })
          //重新查询
          this.getTypeList(null, `/a_types/allarticletypes/from_org/${self.orgCode}`, "typeList")
        },(error) =>{
          self.$message.error(error)
        });
      },

      deleteType(node, data) {
        let self = this;
        self.$confirm("确定删除吗?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let config = {
            url: `${basePath}/a_types/${data.atId}/from_org/${self.orgCode}`,
            method: "delete"
          }
          self.$request.requestAxios(config.method, config.url, null,
            () => {
              self.$message.success("删除成功")
              //重新查询
              self.getTypeList(null, `/a_types/allarticletypes/from_org/${self.orgCode}`, "typeList")
            },
            (error) =>{
              self.$message.error(error)
            }
          )
        }).catch((error) =>{
          //self.$message.error(error)
        })
      },
      /**
       * 鼠标浮动, 显示对应的编辑按钮
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      showContorl(data) {
        this.tempAtId = data.atId
      },
      editType () {

      }
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
</style>