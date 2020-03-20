/*************************************
*  create by xieyuanyuan date 2018/09/06
*  查询树形下拉
**************************************/
<template>
  <div style="width: 100%;">    
    <!-- 多选组合框 -->
    <el-checkbox-group style="width: 100%;" v-if="isCheckbox == 0" 
      class="my-tree-bar" 
      v-model="checkedValue" 
      @change="handleCheckedValueChange">
        <h3 class="title">{{paramsData.title}}</h3>
        <show-tree-selected-last 
          :isCheckbox="isCheckbox" 
          :isEditPage="isEditPage" 
          :treeData="treeData" 
          layer="1" 
          :paramsData="paramsData"></show-tree-selected-last>
    </el-checkbox-group>
    <!-- 单选组合框 -->
    <el-radio-group 
      style="width: 100%;" 
      v-if="isCheckbox == 1" 
      class="my-tree-bar" 
      v-model="checkedValue" 
      @change="handleCheckedValueChange">
        <h3 class="title">{{paramsData.title}}</h3>
        <show-tree-selected-last 
          :isCheckbox="isCheckbox" 
          :isEditPage="isEditPage" 
          :treeData="treeData" 
          layer="1" 
          :paramsData="paramsData"></show-tree-selected-last>
    </el-radio-group>
  </div>
</template>
<script>
  import Show_Tree_Selected_Last  from './Show_Tree_Selected_Last.vue'
  export default {
    props:{
      pageType: {// org为组织工作台，personal为个人工作台
        default: 'org'
      },
      paramsData: null, // 参数
      isEditPage: {     //0为编辑状态，1为只显示，
        default: 0,
      },
      mathRandom: {  //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
        default: 18,
      },   
      isCheckbox: {     //0为多选，1为单选
        default: 0,
      },    
    },
    name: 'items',
    components: {
      'show-tree-selected-last': Show_Tree_Selected_Last
    },
    computed:{
      
    },
    watch:{
      mathRandom:{
        handler(data){   
          if(data != 0) {  
            this.isEditPage == '0' ? this.checkedValue = this.isCheckbox == 0 ? [] : '' : this.checkedValue = this.paramsData.value;
          }
        },
        deep: true,
      },
      'paramsData.requestUrl':{
        handler(data){     
          this.getQueryData(this.paramsData);
          this.isEditPage == '0' ? this.checkedValue = this.isCheckbox == 0 ? [] : '' : this.checkedValue = this.paramsData.value; 
        },
        deep: true,
      }
    },
    data() {
      return { 
        orgId:  this.pageType == 'org' ? sessionStorage.getItem('orgId') : '',
        treeData:      null, 
        countLayer:    0, //为第一层，默认显示， 
        checkedValue: [], //被选中人员数组
      }
    },
    created() {
      this.getQueryData(this.paramsData);
      this.isEditPage == '0' ? this.checkedValue = [] : this.checkedValue = this.paramsData.value;
    }, 
    methods:{
      /*
       * 查询数据
       */
      getQueryData(paramsData) { 
        // ----------- 在注册页面时，请求头没有token，需要清空 -----------
        if(this.pageType == 'register') this.axios.defaults.headers.common['Authorization'] = '';
        // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this 105
        this.$request.requestAxios('get', `${basePath}/${paramsData.requestUrl}`, {params: {orgId: this.orgId}},
          (response) => {
           this.treeData = this._convertData(response.data.data ? response.data.data : []);
           console.log(this.treeData);
          },(error,status) => {
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(`${basePath}/party_member_infos/partyorgtree`);
          });
       },
      _convertData(data){
        this.countLayer++;
        data.forEach((item) => {
          item.isShow = false;
          // this.countLayer == 1 ? item.isShow = false : item.isShow = false;
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
        // debugger
        this.$emit('treeValData',val)
        // if(this.isCheckbox == 0){  //多选
        //   // ---- 显示在页面上的用户名
        //   this.paramsData.value = [];
        //   // ---- 存储在数据库中的数据Id
        //   this.paramsData.valueIdList = []
        //   val.forEach( (item) => {
        //     this.paramsData.value.push(item.name);
        //     this.paramsData.valueIdList ? this.paramsData.valueIdList.push(item.id) : '';
        //   });
        // }else{
        //   // ---- 显示在页面上的用户名
        //   this.paramsData.value = val.name;
        //   // ---- 存储在数据库中的数据Id
        //   this.paramsData.valueId = val.id;
        // }
        
      }
    }
  }
</script>