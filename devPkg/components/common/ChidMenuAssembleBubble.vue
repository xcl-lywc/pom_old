/*************************************
*  create by xieyuanyuan date 2018/06/20
*  badge标记
**************************************/ 
<template>
  <el-badge :value="count ? count : ''" class="item"> 
    <el-button size="small">{{showData}}</el-button>
  </el-badge>
</template>
 
<script>
  export default {
    props:{
      requestUrl:{     //请求的链接地址
        required: true,
      },
      requestParams: { //请求参数
        default: '',
      },
      showData: {     //显示数据
        required: true, 
      },
      bubbleStatus: { //气泡数改变状态
          default: '',
      },
    },
    watch:{
      requestUrl(){
        this.boundCount();
      },
      bubbleStatus(){
        this.boundCount();
      },
    },
    data() {
      return {
        count: null, //气泡个数
      }
    },
    created(){
      this.boundCount();
    },
    mounted() {
    },
    methods: {
      /*
       * 气泡数 
       */
      boundCount(){
        let self = this;        
        self.$request.requestAxios('get', `${basePath}/${self.requestUrl}`, self.requestParams,
          function(response){
            let responseData = response.data;
            if(responseData.meta.code == 0){
              self.count = responseData.data;
              if(self.count ? self.count > 0 : false){
                self.$store.state.homeBubbleStatus = true;
              }
            }
          },function(error,status){
            status == 200 ? self.$message.error(error.data.meta.message):
                            self.$message.error(`${basePath}/${self.requestUrl} - 失败`)
        });
      },
    }
  }
</script>