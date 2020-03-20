/*************************************
*  create by mingzhang.zhao date 2018/05/23
*  领导班子( 已不使用 )
**************************************/ 
<template>
  <!-- <div> -->
    <!-- <menu-manage @orgChange="pageLocalRefresh" :subMenuIndex="2" pageTitle="领导班子"></menu-manage> -->
    <div class="content-manage">
      <el-container v-if="partyListData.length > 0">
        <el-aside width="200px" class="tree-list-wrap">
          <ul class="tree-list">
            <li :class="{ active: activeItem.id == item.id}" v-for="item in partyListData" :key="index + 'party'" @click="clickParty(item)">{{item.name}} <i class="el-icon-d-arrow-right"></i></li>
          </ul>
        </el-aside>
        <el-main v-loading="leaderLoading">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-card><el-button :disabled="resource.indexOf(16) == -1" type="primary" class="fill-width" @click="addLeaderClicked">添加 +</el-button></el-card>
            </el-col>
            <el-col :span="24" v-for="(item, index) in leaderListData" :key="index + 'leader'">
              <el-card>
                <el-button :disabled="resource.indexOf(18) == -1" class="leave-button" type="danger" size="mini" @click="deleteLeader(item)">调离</el-button>
                <p class="leader-title">
                  <img :src="item.picture" alt="头像" class="leader-picture">
                  <span class="leader-name">{{ item.name }}</span>
                  <span class="leader-position">{{ item.positionName }}</span>
                </p>
                <p class="leader-description">{{ item.description }}</p>
              </el-card>
            </el-col>
            
          </el-row>
        </el-main>
      </el-container>
      <div class="no-data-div" v-else><i class="el-icon-warning warning-icon"></i>该组织下没有子组织, 请先添加党组织后再添加领导角色</div>
      
      <!-- 添加领导dialog -->
      <el-dialog
        title="添加领导"
        :close-on-click-modal="false"
        :visible.sync="peopleDialogVisible"
        width="40vw">
        <el-form ref="leaderForm" label-width="80px">
          <el-form-item label="职位" required>
            <el-select type="text" v-model="position" value-key="id" class="fill-width" palceholder="请选择职位">
              <el-option v-for="option in positionsListData" :value="option" :label="option.name" :key="'position' + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <div class="search-name-wrap">
              <el-input type="text" v-model="peopleName" palceholder="请输入人员姓名" @keyup.enter.native="getPeopleTableListData"></el-input><el-button type="primary" size="small" @click="getPeopleTableListData">搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
        <span class="tip-text">搜索人员之后需要点击将其选中</span>
        <el-table
          ref="peopleTable"
          :data="peopleTableListData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="peopleLoading"
          @cell-click="clickSingle">
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="partyOrgName"
            label="支部"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            width="100">
            <template v-if="tablePeopleId == scope.row.infoId" slot-scope="scope">已选择<i class="el-icon-success"></i></template>
          </el-table-column>
        </el-table>
        <span slot="footer">
          <el-button @click="peopleDialogVisible = false">取 消</el-button>
          <el-button @click="submitPeople" type="primary" :disabled="!tablePeopleId || !position">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  <!-- </div> -->
</template>

<script>
  import axios from "axios"
  import qs from "qs"
  export default {
    components: {
      
    },
    data() {
      return {
        peopleLoading:  false,
        leaderLoading:  false,

        partyListData:  [],   //组织列表list
        leaderListData: [],   //领导列表list
        orgId:          null, //当前对应的组织代码
        partyId:        null, //党组织的id, 用于查询领导人

        activeItem:    {
          id: null,
          name: null
        },

        peopleDialogVisible: false, 
        positionsListData:   [],    //职位select的列表
        position:            null,  //表单中选中的职位信息
        tablePeopleId:       null,  //当前选中的人员id
        peopleName:          null,  //表单输入的人员名称
        peopleTableListData: [],    //人员表格数据

        resource: window.sessionStorage.getItem("resource")
      }
    },
    created () {
    },
    mounted () {
      this.orgId = window.sessionStorage.getItem("orgId")
      this.getPartyList().then((response) => {
        this.getLeaderListData()
        this.getPositionsListData()
      })
      
    },
    methods: {
      /*
      * 刷新页面
      */
      pageLocalRefresh(){
        this.orgId = window.sessionStorage.getItem("orgId")
        this.getPartyList().then((response) => {
          this.getLeaderListData()
          this.getPositionsListData()
        })
              
      },
      /**
       * 获取组织结构列表(list)
       * @return {[type]} [description]
       */
      getPartyList () {
        let self = this

        let config = {
          url:    `${basePath}/party_orgs/chlidrensimple`,
          method: "get",
          params: {
            id: self.orgId
          }
        }

        let p = new Promise(function(resolve, reject){
          axios(config).then((response) => {
            if(response.data.data && response.data.meta.code == 0) { //验证数据非空
              self.partyListData = response.data.data
              self.partyId       = response.data.data[0].id
              self.activeItem.id = response.data.data[0].id
              resolve('成功');
            } else {
              self.partyListData = []
              self.partyId       = null
            }
          }).catch((error) => {
            console.log('查询党组织失败')
          })
        })
        return p;

      },
      /**
       * 获取领导人列表
       * @return {[type]} [description]
       */
      getLeaderListData (id) {
        let self = this
        self.leaderLoading = true
        let config = {
          url:  `${basePath}/party_orgs/leader`,
          method: "get",
          params: {
            id: id || self.partyId,
            type: "partyorg"
          }
        }
        axios(config).then((response) => {
          if(response.data.meta.code == 0) {
            self.leaderListData = response.data.data
          } else {
            self.$message.error(response.data.meta.message)
          }
          self.leaderLoading = false
        }).catch((error) => {
          self.leaderLoading = false
          self.$message.error(error.data.meta.message)
        })
      },
      /**
       * 点击左侧组织, 查询职位和对应的人员
       * @return none
       */
      clickParty (item) {
        this.activeItem = item
        this.getPositionsListData(item.id)
        this.getLeaderListData(item.id)
      },
      /**
       * 点击添加领导, 清空数据
       */
      addLeaderClicked () {
        this.position            = null
        this.peopleName          = null
        this.peopleDialogVisible = true
        this.peopleTableListData = []
      },
      /**
       * 获取职位
       * @param  {number} id 需要查询的组织id
       * @return {[type]}    [description]
       */
      getPositionsListData (id) {
        let self = this

        let config = {
          url:    `${basePath}/party_mem_positions/forOrg/${id || self.partyId}`,
          method: "get",
        }
        axios(config).then((response) => {
          if(response.data.meta.code == 0) {
            self.positionsListData = response.data.data
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.data.meta.message)
        })

      },
      /**
       * 获取人员列表
       * @return {[type]} [description]
       */
      getPeopleTableListData () {
        let self = this

        let config = {
          url:    `${basePath}/hr_users/forName/like`,
          method: "get",
          params: {
            userName: self.peopleName
          }
        }
        self.peopleLoading = true
        axios(config).then((response) => {
          if(response.data.meta.code == 0) {
            self.peopleTableListData = response.data.data
            this.tablePeopleId       = null
            self.peopleLoading = false
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.response.data.meta.message)
          self.peopleLoading = false
        })
      },
      /**
       * 点击单个人员, 将其选中
       * @param  {object} item 点击的表格对象
       * @return {[type]}      [description]
       */
      clickSingle (item) {
        this.tablePeopleId = item.infoId
      },
      /**
       * 确认提交人员
       * @return {[type]} [description]
       */
      submitPeople () {
        let self = this

        let config = {
          url: `${basePath}/party_mem_positions/partymempos/info_id/add/${self.tablePeopleId}/from_org/${self.partyId}`,
          method: "post",
          data: qs.stringify({
            positionId: self.position.id
          })
        }

        self.peopleLoading = true
        axios(config).then((response) => {
          if(response.data.meta.code == 0) {
            self.$message.success("添加成功")
            self.peopleDialogVisible = false
            self.getLeaderListData()
          } else {
            self.$message.error(response.data.meta.message)
          }
          self.peopleLoading = false
        }).catch((error) => {
          self.$message.error(error.response.data.meta.message)
          self.peopleLoading = false
        })
      },
      /**
       * 调离人员
       * @param  {[type]} item [description]
       * @return {[type]}      [description]
       */
      deleteLeader (item) {
        
        let self = this

        let idList = []
        idList.push(item.mpId)
        let config = {
          url:    `${basePath}/party_mem_positions/batch/delete/from_org/${self.partyId}`,
          method: "delete",
          data: {
            list: idList
          }
        }
        self.peopleLoading = true

        self.$confirm("调离后需要重新添加", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'}
        ).then(() => {
          axios(config).then((response) => {
            if(response.data.meta.code == 0) {
              self.$message.success("调离成功")
              self.getLeaderListData()
            } else {
              self.$message.error(response.data.meta.message)
            }
            self.peopleLoading = false
          }).catch((error) => {
            self.$message.error(error.response.data.meta.message)
            self.peopleLoading = false
          })
        }).catch(() => {})
        
      }
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
  .tree-list li.active {
    color: #409EFF;
  }
  .tree-list li:hover {
    cursor: pointer;
    color: #409EFF;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .leader-picture {
    width: 100px;
    height: 100px;
  }
  .leader-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .leave-button {
    float: right;
  }
  .leader-name {
    font-size: 24px;
    margin: 0 10px;
  }
  .leader-position {
    font-size: 16px;
  }
  .leader-description {
    margin-top: 20px;
    max-height: 200px;
    overflow-y: auto;
  }
  .search-name-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .no-data-div {
    padding: 20px;
    margin-top: 20px;
    background: #fff;
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