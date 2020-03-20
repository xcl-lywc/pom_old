/**********************************
*  create by xieyuanyuan date 2018/05/04
*  首页-左侧导栏
**********************************/    
<template>    
  <div class="left-fixed-area fl">
    <div class="cu-border column-list">
      <ul>
        <child-type ref="childTree" :listData="columnList"></child-type>
        <li><router-link :to="{path: '/home/online_party_school'}">网上党校</router-link></li>
        <li><router-link :to="{path: '/home/map'}">党建地图</router-link></li>
        <li class="type-wrap">
          <el-tree :data="letterData" :props="letterProps" @node-click="handleNodeClick">
            <span class="tree-node" slot-scope="{ node, data }" @click=" activeLetter = data.id ">
              <span @click="jumpPage(data)" :class="{'active-node': activeLetter == data.id}">{{ node.label }}</span>
            </span>
          </el-tree>
        </li>
      </ul>
    </div>
    <div class="qr-code">
      <div class="cu-border">
        <img src="../../../images/erweima.png">
      </div>
      党建公众号二维码
    </div>
  </div>
</template>

<script>
  import '../../../styles/fixedBlock.less'
  import childType from './TypeList.vue'

  export default {
    components: {
      "child-type": childType
    },
    computed:{
      columnListComputed(){ //此数据是固定不变的，因此设置为计算属性，避免每个页面重复加载
        // return this.columnList;
      },
    },
    data() {
      return {
        columnList: [],
        userData: JSON.parse(sessionStorage.getItem('userData')),
        letterData: [
          {
            label: '领导信箱',
            id:1,
            children: [{
              label: '书记信箱',
              id:2,
              path: '/#/home/write_letters/15/书记信箱',
              children: []
            },
            {
              label: '总经理信箱',
              id:3,
              path: '/#/home/write_letters/15/总经理信箱',
              children: []
            },
            {
              label: '主席信箱',
              id:4,
              path: '/#/home/write_letters/15/主席信箱',
              children: []
            }]
          }
        ],
        letterProps: {
          children: 'children',
          label: 'label'
        },
        activeLetter:   null, //当前的active的节点
      }
    },
    mounted() {
      window.l = this
      this.getQueryColumnList();
    },
    destoryed() {
    },
    methods:{
      /*
      * 大栏目查询列表
      */
      getQueryColumnList() {
        this.$request.requestAxios('get', basePath + '/home/nav/from_org/' + this.$store.state.currentPartyOrg.code, "", 
          (respose) => {// 请求成功回调函数...
            let resposeData = respose.data;
            this.columnList = resposeData.data;
          },(respone,status) => {
            status == 200 ? this.$message.error(error.data.meta.message) :
                           this.$message.error('/home/nav/ - 失败!');
          }
        )
      },
      expandClicked (item) {
        // this.$refs[`childType${item.atId}`][0].status ? this.$refs[`childType${item.atId}`][0].status = false : this.$refs[`childType${item.atId}`][0].status = true
      },
      componentReady (atId) {
      },
      jumpPage(data){
        if(data.path){
          window.location.href = data.path;
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