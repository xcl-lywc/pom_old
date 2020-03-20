/*************************************
*  create by xieyuanyuan date 2018/08/03
*  导出结果组件
**************************************/
<template>
  <el-button type="primary" size="mini" @click="resultDownload">导出结果</el-button>
</template>
<script>
  export default {
    props:{
      itemParams: {  
          required: true,
      },
      taskId: {        
          required: true,
      },
      instanceId: {   
          required: true,
      },
      
    },
    data() {
        return {
          jsonData: null,
        }
    },
    mounted() {
    },
    watch:{
    },
    destoryed() {

    },
    methods:{
      /*
       * 导出投票结果
       */
      resultDownload() {
        // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this
        this.$request.requestAxios('get', `${this.$util.basePath}/${this.itemParams.requestUrl}`, this._resultDownloadParams(),
            (response) => {
              this.$util._fileBold(response);
            },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) :
                             this.$message.error(`${this.$util.basePath}/${this.itemParams.requestUrl}`);
         });
       },
      _resultDownloadParams(){
        return {
          responseType: 'blob',
          params: {
            taskId:     this.taskId,
            instanceId: this.instanceId,
           }
         }
       },
    }
  }
</script>