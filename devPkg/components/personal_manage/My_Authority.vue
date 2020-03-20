/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 我的权限
**************************************/ 
<template>
  <div class="personal-message content-manage personal-top">
    <!-- 我的权限 -->
    <div  class="personal-wrapper">
      <div class="authority">
        <!-- 表头 -->
        <div class="horizontal_row">
          <div class="bor-bot padb5"><el-button size="mini" type="primary" @click="save"> 保存</el-button></div>
          <div class="bor-bot" v-for="(item, key) in authorityData" :key="key">{{JSON.parse(key).name }}</div>
        </div>
        <div class="authorty_content">
          <div class="vertical_row">
            <p class="bor-bot" v-for="(itemVer,keyVer) in verticalRow" :key="keyVer">
              {{itemVer.name}}
            </p>
          </div>
          <div class="checkebox" v-for="(itemCheck, keyCheck) in authorityData" :key="keyCheck">
            <p class="bor-bot" v-for="(itemCheckF, keyCheckF) in itemCheck" :key="keyCheckF">
              <el-checkbox v-model="itemCheckF.select" ></el-checkbox>
            </p>
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
        userData: JSON.parse(sessionStorage.getItem('userData')),
        verticalRow: null,    //获取矩阵竖排数据
        authorityData: "",  //矩阵数据
      }
    },
    watch: {
      authorityData: {
        handler(data){
        },
        deep: true,
      }
    },
    mounted() {
      this.getQueryAuthorityList();
      
    },
    methods:{
      /*
      * 查询权限列表
      */
      getQueryAuthorityList(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/user_resource/matrix/partymem', {params: {id: self.userData.memInfoId}},
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.authorityData = responseData.data;
            self._storingData(self.authorityData);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/user_resource/matrix/partymem - 失败');
          });
      },
      /*
      * 存储数据，用来读取数列名字
      * @params {object} dataItem 
      */
      _storingData(dataItem){
        let self = this, count = 0;
        // -------------- 只需要赋值一次就行 ---------- 
        $.each(dataItem, function(key,item) {
          if(count==0){
            self.verticalRow = item;
          }
        });
      },
      /*
      * 保存矩阵数据
      */
      save(){
        let self = this;
        self.$request.requestAxios('post', basePath + '/authorization/'+ self.userData.userId +'/add/partymem', self.authorityData,
          function(response) { //请求成功的回调...
            self.getQueryAuthorityList();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/authorization/'+ self.userData.userId +'/add/partymem - 失败');
          });
      },
    }
  }
</script>