/*************************************
*  create by xieyuanyuan date 2018/09/06
*  显示树形下拉
**************************************/
<template>
  <div class="my-tree"> 
    <ul>
     <li v-for="(item, index) in treeData" :key="index" @click.stop="showChildren(item)">
      {{item.name}}
       <items :selectionType="selectionType" :layer="layer" v-show="item.childrens && item.isShow" :treeData="item.childrens"></items>
       <ul class="my-tree" v-show="item.partyMem && item.isShow">
          <li class="last-li" v-for="(itempartyMem, indexpartyMem) in item.partyMem" :key="itempartyMem">
            <el-checkbox v-if=" selectionType == 'checked' " :label="itempartyMem">{{itempartyMem.name}}</el-checkbox>
            <el-radio v-if=" selectionType == 'radio' " :label="itempartyMem">{{itempartyMem.name}}</el-radio>
          </li>
       </ul>
     </li>
   </ul>
  </div>
</template>
<script>
  import items  from './Show_Tree_Selected_Last.vue'
  export default {
    name: 'items',
    props:{
      treeData:   null, //树结构数据
      layer:      null, //第几层
      selectionType: 'checked', //'checkd'为多选，radio为单选
    },
    data() {
      return {  
        checkedCities: null,
      }
    },
    mounted() {
       
    },
    watch:{
    },
    destoryed() {

    },
    methods:{
      showChildren(item){
        item.isShow = !item.isShow;
      },
    }
  }
</script>