/********************权限管理************************/
  Author: Mingzhang.Zhao
  Date:   2018-06-01
/************************************************/
<template>
  <div v-loading="authorityLoading" id="authority">
    <div>
      <el-button :disabled="authorityLoading || notResource" type="primary" class="save-button fill-width" :loading="authorityLoading" @click="save">保存</el-button>
    </div>
    <div v-if="authorityData && authorityData.length > 0" class="top-people-list">
        <span v-for="(people, childIndex) in authorityData[0].info[0].list" :key="'人员'+ people.userId" class="text-center">
          <el-tooltip placement="top">
            <span slot="content" v-if="people.positionList && people.positionList.length > 0">
              <span v-for="(item, index) in people.positionList" :key="`${index}${item.id}`">{{item.name}}&nbsp;</span>
            </span>
            <span v-else>暂无职位信息</span>
            <span>{{ people.name}} </span>
          </el-tooltip>
          <div class="top-btn-group">
            <el-button size="small" v-if="!index" :indeterminate="isIndeterminate" v-model="people.checkAll" @click="handleCheckAllChange(true, people)">全选</el-button>
            <el-button size="small" v-if="!index" type="default" class="warning-text" :indeterminate="isIndeterminate" v-model="people.checkAll" @click="handleCheckAllChange(false, people)">清空</el-button>
          </div>
        </span>
      </div>
    <div class="authority-wrap">
      
      <div v-for="(item, index) in authorityData"  :key="'资源大类'+ index">
        <div class="authority-title">{{ item.typeName }}</div>
        <div class="authority-content">
          <!-- 头部名称仅用于显示, 需要单独遍历一次 -->
          <!-- <div class="people-list">
            <div class="list-item" v-for="(people, childIndex) in item.info[0].list" :key="'人员'+ people.userId"> 
              <el-tooltip placement="top">
                <span slot="content" v-if="people.positionList && people.positionList.length > 0">
                  <span v-for="(item, index) in people.positionList" :key="`${index}${item.id}`">{{item.name}}&nbsp;</span>
                </span>
                <span v-else>暂无职位信息</span>
                <span>{{ people.name}} </span>
              </el-tooltip> 
            </div>
          </div> -->
          <div class="people-list" v-if="item.info">
            <div class="btn-group" v-for="(itemInner, index) in item.info[0].list" :key="'按钮组'+ item.userId">
              <el-button size="mini" :indeterminate="isIndeterminate" @click="choosePart(true, itemInner, item)">全选</el-button>
              <el-button size="mini" type="default" class="warning-text" :indeterminate="isIndeterminate" @click="choosePart(false, itemInner, item)"  >清空</el-button>
            </div>
          </div>
          <div class="authority-list" v-for="(infoItem, index) in item.info" :key="'资源小类'+ index">
            <el-tooltip effect="light" :content="infoItem.resourceName" placement="left-start">
              <span class="resource-name">
                {{ infoItem.resourceName }}
              </span>
            </el-tooltip>

            <span class="checkbox-list">
              <div class="checkbox-wrap">
                <el-checkbox class="list-item" v-for="(peopleItem, index) in infoItem.list" :key="'选择框'+ index" v-model="peopleItem.choice"></el-checkbox>
                <!-- {{ infoItem.resourceId }} -->
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
        authorityLoading: false,
        authorityData: [],
        checkAll: false,
        isIndeterminate: true,
        resource: JSON.parse(sessionStorage.getItem("resource")),
        notResource: false, //是否有操作权限398
        orgCode: sessionStorage.getItem("orgCode")
      }
    },
    props: {
      treeId: {
        type: Number,
        required: true
      }
    },
    watch: {
      authorityData: {
        handler(data){
        },
        deep: true,
      },
      treeId: {
        handler(newV, oldV){
          this.getQueryAuthorityList();
        },
        deep: true,
      }
    },
    mounted() {
      if(this.resource && this.resource.indexOf(398) == -1) {
        this.notResource = true
      } else {
        this.notResource = false
      }
      this.getQueryAuthorityList();
    },
    methods:{
      /*
      * 查询权限列表
      */
      getQueryAuthorityList(){
        let self = this;
        let config = {
          url:    `${basePath}/user_resource/matrix_list/partyorg`,
          method: "get",
          params: {
            id: self.treeId
          }
        }
        self.showData         = false
        self.authorityLoading = true
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            self._convertAuthorityList(response.data.data)
            self.authorityLoading = false
          },
          (error) => {
            self.authorityLoading = false
            self.$message.error(error.data.meta.message)
          }
        )
      },
      _convertAuthorityList(data){
        $.each(data, (index, item) => {
          $.each(item.info, (indexInfo, itemInfo) => {
            itemInfo.checkAll = false;
          });
        });
        this.authorityData = data;
      },

      /*
      * 保存矩阵数据
      */
      save () {
        let self = this;
        let config = {
          url:    `${basePath}/user_resource/matrix_list/add/${self.treeId}/from_org/${self.orgCode}`,
          method: "post",
          data: self.authorityData
        }
        self.authorityLoading = true
        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            self.$message.success("修改成功")
            self.getQueryAuthorityList();
            self.authorityLoading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message);
            self.authorityLoading = false
          }
        )
      },
      handleCheckAllChange(val, people){
        this.isIndeterminate = false;
        $.each(this.authorityData, (index, item) => {
          $.each(item.info, (indexInfo, itemInfo) => {
            $.each(itemInfo.list, (indexCheck, itemCheck) => {
              if(people.userId == itemCheck.userId) itemCheck.choice = val;
            });
          });
        });
      },
      /**
       * 将此人的一个资源大类的权限全部设置为选中
       * @param  {booleam} val      checkbox是否勾选
       * @param  {object}  people   人员对应的对象
       * @param  {object}  itemObj  当前资源大类对应的对象
       */
      choosePart (val, people, itemObj) {
        console.log(val, people, itemObj)
        itemObj.info.forEach((item, index) => {
          item.list.forEach((itemInner, indexInner) => {
            if(itemInner.userId == people.userId) {
              itemInner.choice = val
            }
          })
        })
      },
    }
  }
</script>

<style scoped>
  .top-btn-group {
    min-width: 125px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .btn-group {
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .authority-wrap {
    height: calc( 100vh - 290px);
    overflow-y: auto;
  }
  .save-button {
    margin-bottom: 15px;
  }

  .authority-title {
    height: 50px;
    background: #eee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .top-people-list {
    display: flex;
    padding-left: 200px;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: 1px solid #eee;
  }
  .top-people-list .el-button {
    margin-left: 0;
  }
  .list-item {
    height: 40px;
    min-width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .authority-content .people-list {
    display: flex;
    padding-left: 200px;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: 1px solid #eee;
  }
  .authority-content .authority-list {
    display: flex;
    border-bottom: 1px solid #eee;
  }
  .authority-content .authority-list .authority-list-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .authority-content .authority-list .resource-name {
    margin: 0;
    width: 200px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .authority-content .authority-list .checkbox-list {
    display: inline-block;
    width: calc( 100% - 200px );
  }
  .authority-content .authority-list .checkbox-list .checkbox-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .authority-list:nth-child(odd) .checkbox-wrap,
  .authority-list:nth-child(odd) .resource-name {
    background: #f7f7f7!important;
  }
  .el-checkbox {
    margin: 0;
  }
</style>
<style lang="less">
  .authority-content .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #fff;
    border-color: #dcdfe6;
  }
  #authority {
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar
    {
        width: 10px!important;
        height: 8px;
        background-color: rgba(255,255,255,0.1);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(128,128,128,0.8);
        border-radius: 10px;
        background-color: rgba(255,255,255,0.1);
    } 
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(128,128,128,0.8);
        background-color: #808080;
    }
  }
  
</style>