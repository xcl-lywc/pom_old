/*************************************
*  create by xieyuanyuan date 2018/09/06
*  显示树形下拉
**************************************/
<template>
  <div class="my-tree"> 
      <ul>
        <!-- 当是最后一层，并且没有人员数据的情况下，就将箭头给去掉 -->
       <li :class="{'last-li' : !(item.childrens ? item.childrens.length : false) && !item.partyMem}" v-for="(item, index) in treeData" :key="index" >
        <p @click="showChildren(item)">
          <span class="arrow" :class="{'bottom-arrow': item.isShow}"></span>
          <span v-show="!paramsData.checkboxType">{{item.name}}</span>
        </p>
        <!-- paramsData.chekboxType 类型为true表示每层都需要显示 -->
        <el-checkbox 
          v-if="isCheckbox == 0"
          v-show="paramsData.checkboxType" 
          :disabled="item.disabled" 
          :label="item">{{item.name}}</el-checkbox>
         <el-radio 
          v-if="isCheckbox == 1" 
          v-show="paramsData.checkboxType" 
          :disabled="item.disabled" 
          :label="item">{{item.name}}</el-radio>

        <items v-show="item.childrens && item.isShow" 
            :isCheckbox="isCheckbox" 
            :isEditPage="isEditPage" 
            :treeData="item.childrens" 
            :paramsData="paramsData"></items>
         <!-- 显示人员选项 -->
         <ul class="my-tree" v-show="item.partyMem && item.isShow">
            <li class="last-li" v-for="(itempartyMem, indexpartyMem) in item.partyMem" :key="itempartyMem">
              <el-checkbox v-if="isCheckbox == 0" 
                :disabled="itempartyMem.disabled" 
                :label="itempartyMem">{{itempartyMem.name}}</el-checkbox>
              <el-radio v-if="isCheckbox == 1" 
                :disabled="itempartyMem.disabled" 
                :label="itempartyMem">{{itempartyMem.name}}</el-radio>
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
      paramsData: null, //需要参数
      isCheckbox: {     //0为多选，1为单选
        default: 0,
      }, 
      isEditPage: {     //0为编辑状态，1为只显示，
        default: 0,
      },
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