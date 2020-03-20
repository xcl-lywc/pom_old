/********************领导班子************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-31
/************************************************/
<template>
  <div id="leader">
    <div>
      <el-button :disabled="addResource" type="primary" class="fill-width add-button" @click="addLeaderClicked">添加 +</el-button>
    </div>
    <div v-loading="leaderLoading" class="leader-wrap">   
      <el-card v-for="(item, index) in leaderListData" :key="index + 'leader'">
        <el-button :disabled="deleteResource" class="leave-button" type="danger" size="mini" @click="deleteLeader(item)">调离</el-button>
        <p class="leader-title">
          <img v-if="item.picture" :src="item.picture" alt="头像" class="leader-picture">
          <span v-else class="leader-picture no-img">暂无头像</span>
          <span class="leader-name">{{ item.name }}</span>
          <span class="leader-position">{{ controlTable(item.positionName) }}</span>
        </p>
        <p class="leader-description">{{ item.description }}</p>
      </el-card>
    </div>

    <!-- 添加领导dialog -->
    <el-dialog
      title="添加领导"
      :close-on-click-modal="false"
      :visible.sync="peopleDialogVisible"
      width="40vw">
      <div v-loading="peopleLoading"> 
        <el-form ref="leaderForm" label-width="80px" size="small">
          <el-form-item label="职位" required>
            <el-select type="text" v-model="position" value-key="id" class="fill-width" palceholder="请选择职位">
              <el-option 
                v-for="(option, index) in positionsListData" 
                :value="option" 
                :label="controlTable(option.name)" 
                :key="'position' + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <div class="search-name-wrap">
              <el-input type="text" v-model="peopleName" palceholder="请输入人员姓名" @keyup.enter.native="getPeopleTableListData"></el-input>
              <el-button type="primary" @click="getPeopleTableListData">搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
        <span class="tip-text">搜索人员之后需要点击将其选中</span>
        <el-table
          ref="peopleTable"
          stripe
          :data="peopleTableListData"
          tooltip-effect="dark"
          style="width: 100%; max-height: 386px; overflow-y: auto;"
          @cell-click="clickSingle">
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="complayOrg"
            label="支部"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            width="100">
            <template v-if="tablePeopleId == scope.row.userId" slot-scope="scope"><span class="text-blue">已选择 <i class="el-icon-success"></i></span></template>
          </el-table-column>
        </el-table>
        <span slot="footer">
          <el-button @click="peopleDialogVisible = false">取 消</el-button>
          <el-button @click="submitPeople" type="primary" :disabled="!tablePeopleId || !position">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from "qs"
  export default {
    components: {
    },
    data() {
      return {
        peopleLoading:  false,
        leaderLoading:  false,

        leaderListData: [],   //领导列表list

        orgCode:   sessionStorage.getItem('orgCode'),
        peopleDialogVisible: false, 
        positionsListData:   [],    //职位select的列表
        position:            null,  //表单中选中的职位信息
        tablePeopleId:       null,  //当前选中的人员id
        peopleName:          "",  //表单输入的人员名称
        peopleTableListData: [],    //人员表格数据

      }
    },
    //计算权限
    computed: {
      addResource () {
        if(this.resource && this.resource.indexOf(4) == -1) {
          return true
        } else {
          return false
        }
      },
      deleteResource () {
        if(this.resource && this.resource.indexOf(5) == -1) {
          return true
        } else {
          return false
        }
      }
    },
    props: {
      treeId: {
        type: Number,
        required: true,
      }
    },
    created () {

    },
    mounted () {
      this.getLeaderListData()
      this.getPositionsListData()
    },
    watch : {
      treeId: { //监听treeId变化, 重复查询
        handler (newV, oldV) {
          if(newV){
            this.getLeaderListData()
            this.getPositionsListData()
          }
        },
        deep: true
      }
    },
    methods: {
      /**
       * 获取领导人列表
       * @return {[type]} [description]
       */
      getLeaderListData (id) {
        let self = this
        self.leaderLoading = true
        let config = {
          url:    `${basePath}/party_orgs/leader`,
          method: "get",
          params: {
            id:   id || self.treeId,
            type: "orgunit"
          }
        }

        self.$request.requestAxios(config.method, config.url, {params: config.params} ,
          (response) => {
            self.leaderListData = response.data.data
            self.leaderLoading = false
          },
          (error) => {
            self.leaderLoading = false
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 点击添加领导, 清空数据
       */
      addLeaderClicked () {
        this.position            = null
        this.peopleName          = ""
        this.peopleDialogVisible = true
        this.peopleTableListData = []
      },
      /**
       * 获取公司组织下对应的职位
       * @return {[type]} [description]
       */
      getPositionsListData () {
        let self = this

        let config = {
          url:    `${basePath}/company_positions/org`,
          method: "get",
          params: {
            id: self.treeId
          }
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            if(response.data.meta.code == 0) {
              self.positionsListData = response.data.data
            } else {
              throw "失败"
            }
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )

      },
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
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            self.peopleTableListData = response.data.data.rows
            self.tablePeopleId       = null
            self.peopleLoading       = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.peopleLoading = false
          }
        )
      },
      clickSingle (item) {
        this.tablePeopleId = item.userId
      },
      /**
       * 确认提交人员
       * @return {[type]} [description]
       */
      submitPeople () {
        let self = this

        let config = {
          url: `${basePath}/com_user_positions/add/from_org/${self.orgCode}`,
          method: "post",
          data: {
            comPosId: self.position.id,
            userId: self.tablePeopleId
          }
        }
        self.peopleLoading = true
        self.$request.requestAxios(config.method, config.url, config.data, 
          (response) => {
            self.peopleDialogVisible = false
            self.getLeaderListData(self.treeId)
            self.peopleLoading = false
            self.$message.success("成功")
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.peopleLoading = false
          }
        )
      },
      /**
       * 调离人员
       * @param  {[type]} item [description]
       * @return {[type]}      [description]
       */
      deleteLeader (item) {
        
        let self = this

        // let idList = []
        // idList.push(item.mpId)

        let config = {
          url: `${basePath}/com_user_positions/delete/${item.mpId}/from_org/${self.orgCode}`,
          method: "delete",
        }
        self.peopleLoading = true
        self.$confirm("调离后需要重新添加", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}
        ).then(() => {
          self.$request.requestAxios(config.method, config.url, null, 
            (response) => {
              self.$message.success("成功")
              self.getLeaderListData(self.treeId)
              self.peopleLoading = false
            },
            (error) => {
              self.$message.error(error.data.meta.message)
              self.peopleLoading = false
            }
            )
          },
          (error) => {
            self.$message.error(error.data.meta.message)
          }
        )
        
      },
      /*
       * 根据Id来显示对应的中文（对照表）
       */
      controlTable(id){
        // debugger
        let data = JSON.parse(sessionStorage.getItem('controlTable')), name ;
        $.each(data, (index, item) => {
          if(id == item.key){
            name = item.value
          } 
        });
        return name;
      }
    }
  }
</script>

<style scoped>
  .add-button {
    margin-bottom: 15px;
  }
  .warning-icon {
    margin-right: 10px;
    color: #E6A23C;
  }
  .leader-wrap {
    height: calc( 100vh - 290px);
    overflow-y: auto;
  }
  .party-name {
    position: absolute;
    top: -45px;
    left: 10px;
    font-size: 16px;
  }
  .leader-list-row {
    width: 100%;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .leader-picture {
    width: 100px;
    height: 100px;
  }
  .leader-picture.no-img{
    float: left;
    line-height: 100px;
    text-align: center;
    color: #bbb;
    border: 1px solid #eee;
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
  #leader .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
  #leader .el-tree-node__expand-icon.el-icon-caret-right{
    font-size: 18px;
    color: #000;
  }
  #leader .el-tree-node__expand-icon.el-icon-caret-right.is-leaf{
    color: transparent;
  }
</style>