/*************************************
*  create by xieyuanyuan date 2018/05/11
*  二维码组件
**************************************/
<template>
<div>
    <img style="max-width: 100%;" :src="codeUrl" />
</div>
</template>
<script>

  export default {
    props:{
      params: {  
          required: true,
      },
      taskId: {  
          required: true,
      },
      
    },
    data() {
        return {
          userData: JSON.parse(sessionStorage.getItem('userData')),
          orgId:  sessionStorage.getItem('orgId'),
          codeUrl: null,
        }
    },
    mounted() {
      this.getCodeUrl();
    },
    watch:{
    },
    destoryed() {

    },
    methods:{
      /*
       * 根据任务Id查询二维码
       */
      getCodeUrl(){
        this.$request.requestAxios('get', `${this.$util.basePath}/${this.params.requestUrl}`, 
            {params: {taskId: this.taskId}, responseType: "blob"},
            (response) => {
                this.codeUrl = window.URL.createObjectURL(new Blob([response.data]));
            },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) :
                             this.$message.error(`${this.$util.basePath}/${this.params.requestUrl}`);
         });
      }
    }
  }
</script>