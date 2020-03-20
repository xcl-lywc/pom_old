/*************************************
*  create by xieyuanyuan date 2018/09/03
*  首页管理 - 班子管理
**************************************/ 
<template>
  <div id="leader">
    <div v-loading="leaderLoading" class="leader-wrap">   
      <el-card v-for="(item, index) in leaderListData" :key="index + 'leader'">
        <p class="leader-title">
          <img :src="item.picture" alt="头像" class="leader-picture">
          <span class="leader-name">{{ item.name }}</span>
          <span class="leader-position">{{ controlTable(item.positionName) }}</span>
        </p>
        <p class="leader-description">{{ item.description }}</p>
      </el-card>
      <el-card v-if="!leaderListData.length">暂无数据</el-card>
    </div>
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

        peopleDialogVisible: false, 
        positionsListData:   [],    //职位select的列表
        position:            null,  //表单中选中的职位信息
        tablePeopleId:       null,  //当前选中的人员id
        peopleName:          "",  //表单输入的人员名称
        peopleTableListData: [],    //人员表格数据

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
            self.$message.error(error)
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
       * 获取该组织下对应的职位
       * @return {[type]} [description]
       */
      getPositionsListData () {
        let self = this

        let config = {
          url:    `${basePath}/party_mem_positions/forOrg/${self.treeId}`,
          method: "get",
        }
        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            if(response.data.meta.code == 0) {
              self.positionsListData = response.data.data
            } else {
              throw "失败"
            }
          },
          (error) => {
            self.$message.error(error)
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
            self.peopleTableListData = response.data.data
            self.tablePeopleId       = null
            self.peopleLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.peopleLoading = false
          }
        )
      },
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
          url: `${basePath}/party_mem_positions/partymempos/info_id/add/${self.tablePeopleId}/from_org/${self.treeId}`,
          method: "post",
          data: qs.stringify({
            positionId: self.position.id
          })
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
            self.$message.error(error)
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

        let idList = []
        idList.push(item.mpId)
        let config = {
          url: `${basePath}/party_mem_positions/batch/delete/from_org/${self.treeId}`,
          method: "delete",
          data: {
            list: idList
          }
        }
        self.peopleLoading = true

        self.$confirm("调离后需要重新添加", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}
        ).then(() => {
          self.$request.requestAxios(config.method, config.url, config.data, 
            (response) => {
              self.getLeaderListData(self.treeId)
              self.peopleLoading = false
            }).catch((error) => {
              self.$message.error(error)
              self.peopleLoading = false
            })
          },
          (error) => {
            self.$message.error(error)
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