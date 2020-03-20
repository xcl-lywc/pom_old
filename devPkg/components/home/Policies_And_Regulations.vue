<template>
  <div class="row">
    <!-- 面包屑 -->
    <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/' }">政策法规</el-breadcrumb-item> -->
      <el-breadcrumb-item v-if="allarticletypes[0]">{{allarticletypes[0].atName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="allarticletypes" class="col-xs-12 mr-bot20 news-recursion-box">
      <news-recursion v-for="(item, index) in allarticletypes"  hierarchy="1" :typesModel="item"  v-if="item.atypes" :key="index"></news-recursion>
    </div>
  </div>
</template>

<script>
  import News_Recursion from '../common/home/News_Recursion.vue'

  export default {
    components:{
      "news-recursion": News_Recursion, // 新闻递归
    },
    watch:{
      /*
      * 监听路由发生改变
      */
      $route(){
        this.paramId = this.$route.params.id
        this.getQueryAllarticletypesData();
      }

    },
    data() {
      return {
        allarticletypes:{}, //栏目数据
        paramId: this.$route.params.id,
    	}
    },
    created(){
      
    },
    mounted(){
      this.getQueryAllarticletypesData();
    },
    methods: {
      /*
      * 根据一级栏目查询子栏目信息
      */
      getQueryAllarticletypesData(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/a_types/atypestreelist/from_org/' + this.$store.state.currentPartyOrg.code, {params:{ id: self.paramId}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.allarticletypes = resposeData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_types/atypestreelist - 失败')
          }
        )
      },
    }
  };
</script>
