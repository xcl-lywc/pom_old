/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 选票详情
**************************************/ 
<template>
  <el-main v-if="detail" class="content-manage">
    <el-card class="box-card">
      <p>选票题目：{{detail.ballotSpecial}}</p>
      <p>选票详情：{{detail.ballotRequire}}</p>
      <p v-if="detail.privateFiles" >选票附件：
        <el-button
          type="text" @click="$util.useFileUrldownload(itemFile.url)"
          v-for="(itemFile, indexFile) in JSON.parse(detail.privateFiles)" 
          :key="indexFile">
          {{itemFile.name}}，  
        </el-button>
      </p>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>问卷内容</span>
      </div>
      <div v-if="detail.hasOwnProperty('questions')">
        <ul v-for="(item, index) in detail.questions" :key="index">
          <li class="mart5">{{index+1}}. {{item.questionName}}</li>
          <ul v-for="(itemOpt, indexOpt) in item.options" class="marl20">
            <li class="mart5">
              <el-radio disabled v-if=" item.type == 0 " v-model="item.value" :label="itemOpt.id" class="marr20">
                <!-- 此代码只用来辅助赋值，不显示 -->
                <span hidden>{{ item.value == itemOpt.id ? itemOpt.isChecked = true : itemOpt.isChecked = false }}</span>
                {{itemOpt.optionName}}
              </el-radio>
              <el-checkbox disabled v-if=" item.type == 1 " v-model="itemOpt.isChecked" class="marr20">{{itemOpt.optionName}}</el-checkbox>
              <span v-if="itemOpt.privateFiles" >
                附件：
                <el-button 
                  type="text" 
                  @click="$util.useFileUrldownload(JSON.parse(itemOpt.privateFiles).url)">
                  {{JSON.parse(itemOpt.privateFiles).name}} 
                </el-button>
              </span>
            </li>
          </ul>
        </ul>
      </div>
    </el-card>
  </el-main>
</template>

<script>
  export default {
    props:{
      voteDetailId: null, //以组件的方式调用传过来的参数
    },
    data() {
      return {
        orgCode: sessionStorage.getItem('orgCode') ? sessionStorage.getItem('orgCode') : JSON.parse(sessionStorage.getItem('userData')).orgCode ,
        paramsId: this.$route.params.id,
        detail: null, //详情
        radio: 1,
      }
    },
    mounted() {   
      this.getQueryDetail();
    },
    destoryed() {
       
    },
    methods:{
      /*
       * 查询详情
       */
      getQueryDetail(){
        let detailId = this.paramsId ? this.paramsId : this.voteDetailId;
        this.$request.requestAxios('get', `${this.$util.basePath}/v_ballot/detail/${detailId}/from_org/${this.orgCode}`, '', 
            (response) => {
              this.detail = response.data.data;
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`v_ballot/detail - 失败`);
            },
         );
      },
    }
  }
</script>