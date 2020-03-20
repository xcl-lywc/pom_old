/*************************************
*  create by xieyuanyuan date 2018/09/06
*  查询树形下拉
**************************************/
<template>
  <div>
    <!-- 多选 -->
    <el-checkbox-group v-if=" selectionType == 'checked' " class="my-tree-bar" v-model="checkedValue" 
        @change="handleCheckedValueChange">
      <show-tree-selected-last :selectionType="selectionType" :isEditPage="isEditPage" :treeData="treeData" layer="1"></show-tree-selected-last>
    </el-checkbox-group>
    <!-- 单选 -->
    <el-radio-group v-if=" selectionType == 'radio' " class="my-tree-bar" v-model="checkedValue" 
        @change="handleCheckedValueChange">
      <show-tree-selected-last :selectionType="selectionType" :isEditPage="isEditPage" :treeData="treeData" layer="1"></show-tree-selected-last>
    </el-radio-group>
  </div>

</template>
<script>
  import Show_Tree_Selected_Last  from './Show_Tree_Selected_Last.vue'
  export default {
    props:{
      pageType:      'org',  // org为组织工作台，personal为个人工作台
      isEditPage:    0,        //0为编辑状态，1为只显示，
      selectionType: 'checked', //'checkd'为多选，radio为单选
    },
    name: 'items',
    components: {
      'show-tree-selected-last': Show_Tree_Selected_Last
    },
    watch:{
    },
    data() {
      return { 
        orgId:  this.pageType == 'org' ? sessionStorage.getItem('orgId') : JSON.parse(sessionStorage.getItem('userData')).partyOrgId,
        treeData:      null,
        countLayer:    0, //为第一层，默认显示， 
        checkedValue:  [],//被选中的数据
      }
    },
    created() {
      this.getQueryData();
    },
    watch:{
    },
    destoryed() {

    },
    methods:{
      /*
       * 查询数据
       */
      getQueryData() {
        // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this 105
        this.$request.requestAxios('get', `${basePath}/party_member_infos/partyorgtree`, {params: {orgId: this.orgId}},
          (response) => { 
           this.treeData = this._convertData(response.data.data ? response.data.data : []);
          },(error,status) => {
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(`${basePath}/party_member_infos/partyorgtree`);
          });
       },
      _convertData(data){
        this.countLayer++;
        data.forEach((item) => {
          this.countLayer == 1 ? item.isShow = true : item.isShow = true;
          if(item.childrens) this._convertData(item.childrens); 
          if(item.partyMem) {
            item.partyMem.forEach( (itemMem) => {
              // ---- 为0表示是需要操作多选框，否则禁用
            this.isEditPage == 0 ? itemMem.disabled = false : itemMem.disabled = true; 
            })
          }
        })
        return data;
      },
      handleCheckedValueChange(val){
        this.$emit('treeCheckedData', val);
      },
      /*
       * 获取被选中的人员数据(暂时不需要)
       * @params {object} 需要编辑的数据
       */
      _checkedsPerson(data){
        let checkedValue = this.checkedValue;
        data.forEach((item) => { 
          if(item.childrens) this._checkedsPerson(item.childrens); 
          if(item.partyMem) {
            item.partyMem.forEach( (itemMem) => {
              if(this.selectionType == 'checked'){ //多选
                checkedValue.forEach( (checkedItem) => {
                  if(itemMem.id == checkedItem){
                    this.checkedData.push(itemMem);
                  }
                  
                });
              }else{ //单选
                if(itemMem.id == checkedValue){
                  this.checkedData = itemMem;
                }
              }
              
            })
          }
        })
      },
    }
  }
</script>