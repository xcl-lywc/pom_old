<template>
  <div class="instructions" v-loading="loading">
    <div class="instructions-top-box">
      <p class="fl instructions-title">产品说明书</p>
      <p class="fr instructions-back" @click=" rebound ">
        <el-button type="info" icon="el-icon-back" size="mini" round>返回</el-button>
      </p>
    </div>
    <!-- 预览状态下的markdown -->
    <div id="editormd2">
      <mavon-editor ref="md" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" v-model="value" :navigation="true" style="height:100vh;"/>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value:"# 一级标题",
        loading:false,
      }
    },
    methods: {
      /* 
        GET  查询--根据产品id查询产品说明书
      */
      getInstructions(){
        this.loading = true;
        // this.axios.defaults.headers.common['Authorization'] = '';
        // this.axios.get(`${this.$util.msBasePath}/other/instructions`,{params:{project_id:22,}}).then( (response) => {
        //   if(response.data.meta.code === 0){
        //     this.value = response.data.data?response.data.data:'';//产品---说明书
        //   }else{
        //     this.$message.error(response.data.meta.message, 20);   
        //   }
        //   this.loading = false;
        // }).catch( (error) => {
        //   this.$message.error(error);
        //   this.loading = false;
        // }); 

        this.$request.requestAxios("get", `${this.$util.msBasePath}/other/instructions`, {params:{project_id:22,}}, (response) => {
          if(response.data.meta.code === 0){
            this.value = response.data.data?response.data.data:'';//产品---说明书
          }else{
            this.$message.error(response.data.meta.message, 20);   
          }
          this.loading = false;
        }, 
        (error, status) => {
          this.$message.error(error);
          this.loading = false;
        })
      },
      /*
       * 跳转到指定的页面
       */
      rebound(){
        this.$router.push({path: sessionStorage.getItem("instructionsRebound")});
      }
    },
    mounted(){
      this.getInstructions();
    },
  }
</script>

<style lang="less">
  .instructions{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .instructions-top-box{
    padding: 20px;
    overflow:hidden;
    line-height:24px;
    p{
      margin:0;
    }
    .instructions-title{
      font-size: 18px;
      font-weight: 600;
    }
    .instructions-back{
      .el-button{
        /*background:red;*/
      }
    }
  }
  /*
    预览模式markdown样式修改
   */
  #editormd2 .v-note-show.single-show{
    width: calc(~ " 100vw - 270px ");
    position: absolute;
    height: 100vh;  
    left: 270px;
    padding-bottom: 70px;
  } 
  #editormd2 .v-note-navigation-wrapper.shadow{
    position: absolute;
    left: 0;
  }
  #editormd2 .v-note-navigation-wrapper.shadow .v-note-navigation-close{
    display: none;
  }
</style>