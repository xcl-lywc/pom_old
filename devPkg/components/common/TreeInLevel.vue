/*********************分层式树形展开图*************************/
  Author: Mingzhang.Zhao
  Description: 用于分层展示树形图, 点击上层会在后方额外显示
  Params: treeData {Object} 树形结构数据
  Usage:  getArray (param) 获取所有被选中的项 param 为需要显示对应的参数的数组
  Date:   2018-05-15
/****************************************************/
<template>
  <div class="tree-container">
    <div class="tree-level-wrap">
      <div v-if="treePropData && treePropData.length > 0" v-for="(item, index) in treeList" :key="index" class="tree-item-wrap">
        <ul>
          <li v-for="(itemInner, indexInner) in item" :key="itemInner.id">
            <el-checkbox v-model="itemInner.select"  @click="getArray()"></el-checkbox>
            <span :class="{'has-child-span': itemInner.childrens && itemInner.childrens.length > 0}" @click="clickItem(itemInner, index)">{{ itemInner.name }}</span>
            <i v-if="itemInner.childrens && itemInner.childrens.length > 0" class="el-icon-caret-right"></i>
          </li>
        </ul>
      </div>
      <span v-else> 当前没有公司组织 </span>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      treeData: { //树结构的全部数据
        required: true,
        default: []
      }
    },
    components: {},
    data() {
      return {
        treePropData: [], //父组件传递过来的数据
        treeList:     [], //层级树的数组
        treeLevel:    0,  //树的层级深度

        checkedArray: [], //当前已选中的数据,[----外部调用时直接使用此数据---]
      }
    },
    created () {
      window.tree = this
      this.treePropData = JSON.parse(JSON.stringify(this.treeData))
      this.treeList = []
      this.treeList[0] = this.treePropData
    },
    computed: {
      
    },
    mounted () {
      
    },
    watch :{
      treeData: { //深度监听由父组件传递的数据
        handler: function (val, oldVal) {
          this.treePropData = val
          this.treeList     = []
          this.treeList[0]  = this.treePropData
        },
        deep: false //深度监听会造成更改select的值也会导致重新触发watch
      },
    },
    methods: {
      /**
       * 点击某一项公司<span>, 将其下一层的数据拼接到后方,跨越层级点击时, 删除当前点击index后的数据
       * @param  {object} item  当前点击的对象
       * @param  {number} index 当前点击的index, 用以确定当前点击的层级
       * @return {[type]}       [description]
       */
      clickItem (item, index) {
        if(item.childrens.length > 0) {
          this.treeList.splice(index + 1, this.treeList.length - (index+1))
          this.treeList.push(item.childrens)
        }
      },
      /**
       * 遍历当前树, 将选中的内容保存至checkedArray
       * @param  {string} param 对应的参数key
       * @return {array}        选中的数组
       */
      getArray (param) {
        let self = this
        //置空,确保每次获取的数组不会重复
        self.checkedArray = []

        if(self.treePropData) {
          self.traverseTree(self.treePropData, param)
        }
        return self.checkedArray
      },
      /**
       * 遍历树,根据参数获取对应的数据数组, 并保存至checkedArray
       * @param  {object} node  节点数据
       * @param  {string} param 对应的参数key
       * @return none0
       */
      traverseTree (node, param) {
        let self = this

        node.forEach((item, index) => {
          if (!item.childrens) {
            return false;
          } else {
            //此节点含有子节点, 递归查询
            self.traverseTree(item.childrens, param);
            item.childrens.forEach((itemInner, indexInner) => {
              console.log(itemInner.select)
            })
            
          }

          if(item.select && item[param]){
            self.checkedArray.push(item[param])
          }
        })
        
      },
      /**
       * 去重
       * @param  {[type]} array [description]
       * @return {[type]}       [description]
       */
      duplicateRemove (array) {
        var r = []; 
        for(var i = 0, l = array.length; i < l; i++) { 
         for(var j = i + 1; j < l; j++) 
          if (array[i] === array[j]) j = ++i; 
         r.push(array[i]); 
         } 
         return r
      }
    }
  }
</script>

<style scoped>
  .tree-container {

  }
  .tree-level-wrap {
    display: -webkit-box;
    overflow-x: auto;
    -webkit-overflow-scrolling:touch;
  }
  .tree-item-wrap {
    width: 200px;
    height: 200px;
    overflow-y: auto;
    border:1px solid #dcdfe6;
    border-radius: 5px;
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .tree-item-wrap ul {
    list-style: none;
    padding-left: 15px;
  }
  .tree-item-wrap ul li{
    height: 30px;
  }
  .tree-item-wrap span {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;   
  }
  .tree-item-wrap span:hover {
    cursor: default;
  }
  .tree-item-wrap span.has-child-span:hover{
    cursor: pointer;
  }
</style>