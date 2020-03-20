/********************公司组织架构调整************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-31
/************************************************/
<template>
  <div>
    <el-container>
      <el-aside v-show="isCollapse" v-loading="treeLoading" width="350px" class="tree-list-wrap">
        <!-- <div class="add-top-button-wrap">
          <el-button
            class="fill-width"
            type="primary"
            size="mini"
            @click="activeTab = 'construction';$refs.partyConstruction.showPartyDialog('topLevel', 'new', null)">
            添加顶级
          </el-button>
        </div> -->
        <el-tree
          ref="typeTree"
          :data="partyListData"
          class="tree-list"
          v-if="partyListData && partyListData.length > 0"
          node-key="id"
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="clickPartyTree">
          <span class="custom-tree-node fill-width" slot-scope="{ node, data }">
            <el-tooltip :enterable="false" :content="node.label" placement="right-start">
              <div>
                <i v-if="data.id == partyId" class="el-icon-circle-check text-blue"></i>
                <span :class="{'text-blue' : data.id == partyId}">{{ node.label }}</span> 
                <i v-if="data.type == '4'" class="fa fa-star text-yellow" aria-hidden="true"></i>
              </div>
            </el-tooltip>
          </span>
        </el-tree>
        <div v-else class="no-tree-data">
          <i class="el-icon-warning warning-icon"></i>当前没有任何组织结构
        </div>
      </el-aside>
      <!-- 右侧子页面 -->
      <el-container style="position: relative;">
        <div>
          <i v-if="isCollapse" class="el-icon-s-fold icon-fold" title="收起" 
            @click="isCollapse = false"></i>
          <i v-if="!isCollapse" class="el-icon-s-unfold icon-fold" title="展开" 
            @click="isCollapse = true"></i> 
        </div>
        <el-row class="right-content" :gutter="20">
          <el-col>
            <el-tabs type="card" v-model="activeTab">
              <el-tab-pane label="组织简介" name="intro" v-if="partyId">
                <intro v-if="activeTab == 'intro'" :treeId="partyId"></intro>
              </el-tab-pane>
              <!-- 需要跟随页面初始化, 因为需要调用其内部的方法 -->
              <!-- <el-tab-pane label="组织架构" name="construction">
                <construction 
                  v-if="activeTab == 'construction'"
                  ref="partyConstruction"
                  :treeId="partyId || 0" 
                  @treeChanged='getDataList("/org_units/tree/party_org_id", "partyListData", false, { partyOrgId: JSON.parse(sessionStorage.getItem("orgId")) })'
                  @treeDeleted="initTree">
                </construction>
              </el-tab-pane> -->
              <el-tab-pane label="职工花名册" name="roster" v-if="partyId">
                <roster v-if="activeTab == 'roster'" :treeId="partyId"></roster>
              </el-tab-pane>
              <!-- <el-tab-pane label="班子管理" name="leader" v-if="partyId">
                <leader v-if="activeTab == 'leader'" :treeId="partyId"></leader>
              </el-tab-pane> -->
              <el-tab-pane label="班子管理" name="leader" v-if="partyId">
                <leader v-if="activeTab == 'leader'" :treeId="partyId"></leader>
              </el-tab-pane>
              <el-tab-pane label="人员信息导入修改" name="information" v-if="partyId">
                <information v-if="activeTab == 'information'" :treeId="partyId"></information>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import qs           from "qs"
  import intro        from "./companyManageComponents/Intro.vue"
  // import construction from "./companyManageComponents/Construction.vue"
  import roster       from "./companyManageComponents/Roster.vue"
  import leader       from "./companyManageComponents/Leader.vue"
  import information  from "../common/people_import/Information.vue"

  export default {
    components: {
      "intro":        intro,
      // "construction": construction,
      "roster":       roster,
      "leader":       leader,
      "information":  information
    },
    data() {
      return {
        isCollapse:     false,
        activeTab:      "intro",
        treeLoading:    false,

        partyListData:  [],          //组织列表list
        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },

        partyId:   0, //当前对应的组织代码 默认为顶级 则Id == 0
      }
    },
    watch: {
      partyId: {
        handler (newV, oldV) {

        },
        deep: true
      },
      activeTab: {
        handler (newV, oldV) {
          sessionStorage.setItem("tempOrgTab", newV)
        },
        deep: true
      }
    },
    created () {

    },
    mounted () {
      this.initTree()
      if(sessionStorage.getItem("tempOrgTab")) {
        this.activeTab = sessionStorage.getItem("tempOrgTab")
      }
    },
    methods: {
      /**
       * 重新初始化查询左侧整个树, 并将第一个节点保存为treeId
       * @return {[type]} [description]
       */
      initTree () {
        let self = this
        self.getDataList("/org_units/tree/party_org_id", "partyListData", false, { partyOrgId: JSON.parse(sessionStorage.getItem("orgId")) }).then((response) => {
          if(response) {
            self.partyId   = response.data.data.id
          }
        }).catch((error) => {
          self.partyId = 0
        })
      },
      /**
       * 获取树形数据
       * @param  {string}  url    请求地址
       * @param  {string}  target 需要保存的数据目标名称
       * @param  {boolean} multi  查询树组还是单个树
       * @return none
       */
      getDataList (url, target, multi, data) {
        var self = this
        self.treeLoading = true

        let config = {
          url: `${basePath}${url}`,
          method: 'get',
          params: null
        }
        if(data) {
          config.params = data
        }

        let p = new Promise(function (resolve, reject) {
          self.$request.requestAxios(config.method, config.url, {params:config.params}, (response) => {
            if(!response.data.data) {
              reject("当前组织信息为空")
              self.treeLoading = false
              self[target]     = []
            } else {
              self[target] = [];
              multi ? self[target] = response.data.data : self[target].push(response.data.data)
              resolve(response); //传递参数response
              self.treeLoading = false
            }
          },
          (error) => {
            self.treeLoading = false
          }
          )
        })
        return p;
      },
      /**
       * 点击树节点, 查询组织下对应的数据
       * @param  {object} data 节点数据
       * @return none
       */
      clickPartyTree (data) {
        this.partyId = data.id
      },
    }
  }
</script>

<style scoped>
  .add-top-button-wrap {
    padding: 10px;
    background: #fff;
  }
  .tree-list-wrap {
    padding: 0;
  }
  .tree-list {
    max-height: calc(100vh - 220px);
    overflow: auto;
  }
  /*.tree-list {
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
  }*/
  .no-tree-data {
    background: #fff;
    padding: 20px;
  }
  .right-content {
    width: 100%;
    height: calc( 100vh - 152px);
    padding: 10px;
    margin-right: 0!important;
    background: #fff;
  }
  .el-tab-pane {
    overflow-y: auto;
    max-height: calc( 100vh - 235px);
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
    display: flex;
    flex-direction: row;
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
  .text-blue {
    color: #409EFF;
  }
</style>