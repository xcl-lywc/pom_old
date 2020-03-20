/**********************************
*  create by xieyuanyuan date 2018/05/04
*  首页 - 分类树
**********************************/   
<template>
  <div class="type-wrap">
    <!-- <ul class="child-ul"> -->
      <!-- <li v-for="item in typeList" :key="item.atId" class="child-text">{{item.atName}}</li> -->
    <!-- </ul> -->
    <el-tree
      ref="tree"
      :expand-on-click-node="false"
      :data="treeData"
      :props="treeProps"
      node-key="atId"
      @node-click="typeclicked">
      <span class="tree-node" slot-scope="{ node, data }" @mouseover="active = data.atId" @mouseout="setActive">
        <span :class="{'active-node': active == data.atId}">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    props: {
      listData: {
        required: true,
        type: Array,
      },
    },
    data () {
      return {
        status:   false,
        userData: JSON.parse(sessionStorage.getItem('userData')),
        typeList: [], //顶层分类的list
        active:   null, //当前的active的节点
        treeData: [], //组装过后的树型数据
        treeProps: {
          children: 'atypes',
          label: 'atName'
        }
      }
    },
    watch: {
      listData: {
        handler (newV, oldV) {
          let self = this
          if(newV) {
            self.typeList = newV
            self.treeData = []
            self.typeList.forEach((item, index) => {
              self.getTypeListData(item.atId).then( ( response ) => {
                self.treeData.push(response)
              })
            })
            self.setActive()
          }
        },
        deep: true
      },
      $route (to, from) {
        
        this.setActive()
      }
      // "$router": {
      //   handler (newV, oldV) {
      //     console.log(this.$router.params.id)
      //   },
      //   deep: true,
      // }
    },
    mounted () {
      window.ccc = this
      this.setActive()
    },
    methods: {
      /**
       * 根据atId获取子分类列表
       * @return {[type]} [description]
       */
      getTypeListData (atId) {

        let search = {
          id: atId
        } 
        let promise = new Promise ((resolve, reject) => {
          this.$request.requestAxios("get", `${basePath}/a_types/atypestree/from_org/${this.$store.state.currentPartyOrg.code}`, {params: search}, 
            (response) => {
              resolve( response.data.data )
            },
            (error) => {
              this.$message.error(error.data.meta.message)
              reject( false )
            }
          )
        })
        
        return promise
      },
      typeclicked (data) {
        this.active = data.atId
        sessionStorage.setItem("typeName", data.atName)
        sessionStorage.setItem("typeId", data.atId)
        this.$router.push({name: 'Policies_And_Regulations', params: {id: data.atId, name: data.atName}})
      },
      setActive () {
        let sessionId = JSON.parse(sessionStorage.getItem("typeId") || null)
        //初始化激活的Id 同时更新对应的名称typeName
        if(sessionId || this.$route.params.id) {
          this.active = sessionId || this.$route.params.id
        } else {
          this.active = null
        }

        if(this.$route.params.id) { //当返回到非主页并带有参数的页面时, 更新选中, 否则清空记住的类型信息
          sessionStorage.setItem("typeName", this.$route.params.name)
          sessionStorage.setItem("typeId", this.$route.params.id)
        } else {
          this.active = null
        }
      }
    }
  }
</script>

<style scoped>
  .active-node,
  .tree-node:hover {
    color: #dc3a3a;
  }
</style>

<style>
  .type-wrap .tree-node {
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: left;
  }    
  .type-wrap .el-tree-node__content {
    height: 40px;
  }
  .type-wrap .tree-node {
    font-size: 17px;
    color: #000;
  }
</style>