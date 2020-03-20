/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 投票列表 - 投票
**************************************/ 
<template>
  <el-main v-if="detail" class="content-manage">
    <el-card class="box-card">
      <p class="mart5">投票题目：{{detail.ballotSpecial}}</p>
      <p class="mart5">投票要求：{{detail.ballotRequire}}</p>
      <p v-if="detail.privateFiles" >选票附件：
        <el-button 
          type="text" @click="$util.useFileUrldownload(itemFile.url)"
          v-for="(itemFile, indexFile) in JSON.parse(detail.privateFiles)" 
          :key="indexFile">
          {{itemFile.name}}，  
        </el-button>
      </p>
    </el-card>
    <el-card class="box-card mart10">
      <div slot="header" class="clearfix">
        <span>投票安排</span>
      </div>
      <p>投票时间：
        {{$util._convertDate(detail.beginTime, 'yyyy年MM月dd日 hh:mm:ss')}} ~
        {{$util._convertDate(detail.endTime, 'yyyy年MM月dd日 hh:mm:ss')}}
      </p>
    </el-card>
    <el-card class="box-card mart10">
      <div slot="header" class="clearfix">
        <span>问卷内容</span>
      </div>
      <div v-if="detail.hasOwnProperty('questions')">
        <ul v-for="(item, index) in detail.questions" :key="index" class="marb20">
          <li class="mart10">
            {{index+1}}. {{item.questionName}} 
            <!-- 只有多选需要这个条件 -->
            <span v-if="item.type == 1">
              {{item.minOption ? '(至少选择' + item.minOption + '项,' : '(至少选择1项'}} 
              {{item.maxOption ? '最多选择' + item.maxOption + '项)' : ')'}}
            </span>
            <span 
              v-if="item.hasOwnProperty('isAnswer') ? !item.isAnswer ? true : false : false " 
              class="color-red marr10">
              (请确认选项个数是否正确)
            </span>
          </li>
          <!-- 单选框 -->
          <el-radio-group 
              v-if=" item.type == 0 "
              v-model="item.value">
              <ul class="marl20" v-for="(itemBoxs, indexBoxs) in item.options" >
                <li class="mart10">
                  <el-radio :key="indexBoxs" :label="itemBoxs.id">{{itemBoxs.optionName}}</el-radio>
                </li>
              </ul>
          </el-radio-group>

          <!-- 复选框 -->
          <el-checkbox-group v-if=" item.type == 1 " v-model="item.value">
              <ul class="marl20" v-for="(itemBox, indexBox) in item.options" >
                <li class="mart10">
                  <el-checkbox :label="itemBox.id" :key="indexBox">{{itemBox.optionName}}</el-checkbox>
                </li>
              </ul>
          </el-checkbox-group>



          <!-- <ul v-for="(itemOpt, indexOpt) in item.options" class="marl20">
            <li class="mart10">
              <el-radio v-if=" item.type == 0 " v-model="item.value" :label="itemOpt.id">
                此代码只用来辅助赋值，不显示
                <span hidden>{{ item.value == itemOpt.id ? itemOpt.isAnswer = true : itemOpt.isAnswer = false }}</span>
                {{itemOpt.optionName}}
              </el-radio>
              <el-checkbox v-if=" item.type == 1 " v-model="itemOpt.isAnswer">{{itemOpt.optionName}}</el-checkbox>
              <span v-if="itemOpt.privateFiles" >
                附件：
                <el-button type="text" 
                  @click="$util.useFileUrldownload(JSON.parse(itemOpt.privateFiles).url)">
                  {{JSON.parse(itemOpt.privateFiles).name}} 
                </el-button>
              </span>
            </li>
          </ul> -->
        </ul>
      </div>
      <hr style="margin: 20px -20px;"/>
      <div class="mart20">
        <el-button @click="onSubmit" size="mini" type="primary" class="marr20">提交问卷</el-button>

        <router-link v-if="pageType == 'org'" :to="{path: '/poll_research/activity_list'}"><el-button size="mini">返回列表</el-button></router-link>
        <router-link v-if="pageType == 'personal'" :to="{path: '/my_vote_index'}"><el-button size="mini">返回列表</el-button></router-link>
      </div>
    </el-card>
  </el-main>
</template>

<script>
  export default {
    props:{
      pageType: null,
    },
    data() {
      return {
        orgCode:       this.pageType == 'org' ? sessionStorage.getItem('orgCode') : 
                          JSON.parse(sessionStorage.getItem('userData')).orgCode,

        paramsId:     this.$route.params.id,
        detail:       null,    //详情
        radio:        1,
        form: {
          "partyOrgCode": this.pageType == 'org' ? sessionStorage.getItem('orgCode') : 
                          JSON.parse(sessionStorage.getItem('userData')).orgCode,
          "questions":    [],
          "voteId":       null,
        },
      }
    },
    created(){
      this.getQueryDetail();
    },
    mounted() {
      
    },
    destoryed() {
       
    },
    methods:{
      /*
       * 查询题目详情
       */
      getQueryDetail(){
        let url = this.pageType == 'org' ? 
                    `${this.$util.basePath}/v_vote/question/from_org/${this.orgCode}` :
                    `${this.$util.basePath}/v_vote/question`;

        this.$request.requestAxios('get', url,
            {params: {id: this.paramsId }}, 
            (response) => {
              this._questionAssemble(response.data.data);
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${url} - 失败`);
            },
         );
       },
      /*
       * 给题目增加一个接收值得字段
       */
      _questionAssemble(data){
        if(data.questions){
          $.each(data.questions, (index, item) => {
            item.type == 0 ? item.value = null : item.value = [];
          });
          // --------------- 避免页面监听不到数据变化 -----------------
          this.detail = Object.assign({}, data, data);
        }
      },
      /*
       * 提交数据
       */
      onSubmit(){
        let url = this.pageType == 'org' ? 
                    `${this.$util.basePath}/v_vote/answer/from_org/${this.orgCode}` :
                    `${this.$util.basePath}/v_vote/answer`;

        if(this._validIsAnswer()){
          this.$request.requestAxios('post', url, 
            this._onSubmitParams(), 
            (response) => {
              this.$message.success({message: '投票成功，将跳转到详情页！', duration: 1200})
              setTimeout(() => {
                this.pageType == 'org' ? this.$router.push({name: 'Activity_Detail', params: {id: this.paramsId}}) : 
                      this.$router.push({name: 'Personal_Activity_Detail', params: {id: this.paramsId}});
              }, 1500);
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${url} - 失败`);
            },
           );
         }
       },
      _onSubmitParams() {
        return {
          questions:    this._convertIsAnswer(),
          partyOrgCode: sessionStorage.getItem('orgCode'),
          voteId:       this.paramsId,
         }
       },
      /*
       * 筛选被选中的答案,并验证每个题中是否都有答案
       */
      _convertIsAnswer() {
        let answers = [];
        $.each(this.detail.questions, (index, item) => {
          answers.push({ id: item.id, options: [] });

          if(item.type == 0){
            answers[index].options.push({ id: item.value });
          }else{
            $.each(item.value, (indexOpt, itemOpt) => {
              answers[index].options.push({ id: itemOpt });
            });
          }


        });
        // --------------- 避免页面监听不到数据变化 -----------------
        this.detail = Object.assign({}, this.detail, this.detail);
        return answers;
       },
      /*
       * 验证每个题中是否都有答案
       */
      _validIsAnswer() {
        let answers = [] , 
            isAllAnswer = true; //为false表示不能提交（没有将所有的题选中答案）
        $.each(this.detail.questions, (index, item) => {
            // --- 当有答案时，就不显示提醒
            item.isAnswer = true;
            if(item.type == 0){ //单选题
                if(!item.value){
                  isAllAnswer   = false;
                  item.isAnswer = false;
                }
            }else { //多选题
              // 多选的选项长度必须大于最小数，并且小于最大数
              if(!(item.value.length >= item.minOption && item.value.length <= item.maxOption)){
                isAllAnswer   = false;
                item.isAnswer = false;
              }
            }
        });
        
        // --------------- 避免页面监听不到数据变化 -----------------
        this.detail = Object.assign({}, this.detail, this.detail);

        return isAllAnswer;
       },
    }
  }
</script>