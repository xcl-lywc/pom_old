/*************************************
*  create by xieyuanyuan date 2018/07/09
*  首页管理 - 投票列表 - 投票详情
**************************************/ 
<template>
  <el-main v-loading="isLoad" v-if="detail" class="content-manage">
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
      <div class="questions-bar-box">
        <!-- 当有题并且已经投票的情况下，显示柱状图 -->
        <div v-if="detail.hasOwnProperty('questions') && (detail.isAnswer || pageType == 'org')">
          <ul v-for="(item, index) in detail.questions" :key="index" class="marb20">
            <li class="mart5">{{index+1}}. {{item.questionName}}</li>
            <div class="question-box">
              <ul v-for="(itemOpt, indexOpt) in item.options" class="marl20">
                <li class="mart10">
                  <el-radio v-if=" item.type == 0 " disabled="disabled" :label="itemOpt.optionName"></el-radio>
                  <el-checkbox v-if=" item.type == 1 " disabled="disabled" :label="itemOpt.optionName"></el-checkbox>
                  <span v-if="itemOpt.privateFiles" >
                    附件：
                    <el-button type="text" 
                      @click="$util.useFileUrldownload(JSON.parse(itemOpt.privateFiles).url)">
                      {{JSON.parse(itemOpt.privateFiles).name}} 
                    </el-button>
                  </span>
                </li>
              </ul>
            </div>
            <!-- <div class="bar-graph-box">
              <ul v-for="(itemOpt, indexOpt) in item.options" class="">
                <li class="mart10">
                  <el-tooltip :content="`${itemOpt.answerCount}票`" placement="top">   
                    最大数的宽就直接写100%，避免数字除不尽的问题，导致最大数不能填充完
                    <p v-if="itemOpt.answerCount == item.maxAnswerCount" 
                      :style="`width:100%;background: ${itemOpt.background};`"></p>

                    <p v-if="itemOpt.answerCount != item.maxAnswerCount" 
                      :style="`width:${parseInt(itemOpt.answerCount)*parseInt(item.proportionUnit)}%;
                    background: ${itemOpt.background};`"></p>
                    
                  </el-tooltip>
                </li>
              </ul>
            </div> -->
          </ul>
        </div>
        <!-- 没有投票，去投票-->
        <div v-if=" !detail.isAnswer && pageType != 'org' ">
          <router-link  v-if="pageType == 'org'" :to="{name: 'Vote', params: {id: detail.id}}">
            <el-button size="mini" type="primary" class="marr20">去投票</el-button>
          </router-link>
          <router-link v-if="pageType == 'personal'" :to="{name: 'Personal_Vote', params: {id: detail.id}}">
            <el-button size="mini" type="primary" class="marr20">去投票</el-button>
          </router-link>
          
          
          <router-link v-if="pageType == 'org'" :to="{path: '/poll_research/activity_list'}"><el-button size="mini">返回列表</el-button></router-link>
          <router-link v-if="pageType == 'personal'" :to="{path: '/my_vote_index'}"><el-button size="mini">返回列表</el-button></router-link>
        </div>
      </div>
    </el-card>
    <el-card class="box-card mart10">
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <div>
        <div class="leave-message-detail">
          <div v-for="(itemComment, index) in comment.commentList" class="padt15 padl20">
            <h5>
              <img class="marr5" src="../../../images/urser_black_manage.png" />
              <span class="marr5">{{itemComment.creator}}</span> 
              <span>{{$util._convertDate(itemComment.createTime,'yyyy年MM月dd日')}}</span>
            </h5>
            <p class="marl20 padl15 padt5">{{itemComment.commentContent}}</p>
          </div>
        </div>
        <div class="leave-message text-right mart20">
           <el-input type="textarea" placeholder="请回复点什么吧" v-model="comment.commentContent"></el-input>
           <el-button size="small" type="primary" class="mart20 marr20" @click="replyAdd">评论</el-button>
        </div>
      </div>
    </el-card>
  </el-main>
</template>

<script>
  export default {
    props: {
      pageType: null,
    },
    data() {
      return {
        isLoad:        true,
        orgCode:       this.pageType == 'org' ? sessionStorage.getItem('orgCode') : 
                          JSON.parse(sessionStorage.getItem('userData')).orgCode,
        paramsId:      this.$route.params.id,
        detail:        null, //详情
        radio:         1,
        comment: {
          commentContent: null,
          commentList:   [], //评论列表 
        },
        colourSystem: [     //颜色表
          '#A1A1A1', '#A0522D', '#A020F0', '#9FB6CD',
          '#9F79EE', '#9E9E9E', '#9C9C9C', '#9BCD9B',
          '#9B30FF', '#9AFF9A', '#9ACD32', '#9AC0CD',
          '#9A32CD', '#999999', '#9932CC', '#98FB98',
          '#98F5FF', '#97FFFF', '#96CDCD', '#969696',
          '#949494', '#9400D3', '#9370DB', '#919191',
          '#912CEE', '#90EE90', '#8FBC8F', '#8F8F8F',
          '#8EE5EE', '#8E8E8E', '#8E8E38', '#8E388E',
          '#8DEEEE', '#8DB6CD', '#8C8C8C', '#8B8B83',
          '#8B8B7A', '#8B8B00', '#8B8989', '#8B8970',
          '#8B8878', '#8B8682', '#8B864E', '#8B8386',
          '#8B8378', '#8B814C', '#8B7E66', '#8B7D7B',
          '#8B7D6B', '#8B7B8B', '#8B795E', '#8B7765',
          '#8B7500', '#8B7355', '#8B6969', '#8B6914',
          '#8B668B', '#8B6508', '#8B636C', '#8B5F65',
          '#8B5A2B', '#8B5A00', '#8B5742', '#8B4C39',
          '#8B4789', '#8B475D', '#8B4726', '#8B4513',
          '#8B4500', '#8B3E2F', '#8B3A62', '#8B3A3A',
          '#8B3626', '#8B2500', '#8B2323', '#8B2252',
          '#8B1C62', '#8B1A1A', '#8B0A50', '#8B008B',
          '#8B0000', '#8A8A8A', '#8A2BE2', '#8968CD',
          '#87CEFF', '#87CEFA', '#87CEEB', '#878787',
          '#858585', '#848484', '#8470FF', '#838B8B',
          '#838B83', '#836FFF', '#828282', '#7FFFD4',
          '#7FFF00', '#7F7F7F', '#7EC0EE', '#7D9EC0',
          '#7D7D7D', '#7D26CD', '#7CFC00', '#7CCD7C',
          '#7B68EE', '#7AC5CD', '#7A8B8B', '#7A7A7A',
          '#7A67EE', '#7A378B', '#79CDCD', '#787878',
          '#778899', '#76EEC6', '#76EE00', '#757575',
          '#737373', '#71C671', '#7171C6', '#708090',
          '#707070', '#6E8B3D', '#6E7B8B', '#6E6E6E',
        ],
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
        let url = this.pageType == 'org' ? `${this.$util.basePath}/v_vote/detail/from_org/${this.orgCode}` :
                  `${this.$util.basePath}/v_vote/detail`;
                  
        this.$request.requestAxios('get', url,
            {params: {id: this.paramsId }}, 
            (response) => {
              this.detail = response.data.data;
              this._calculationUnit(this.detail.questions);
              this.getCommentList();
              this.isLoad = false;
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`v_ballot/detail - 失败`);
              this.isLoad = false;
            },
         );
       },
      /*
       * 计算答案的单个占比是多少 
       */
      _calculationUnit(data){
        $.each(data, (index, item) => {
          item.maxAnswerCount = this._bubbleSort(item.options);
          // -------------- 占比单位 -------------
          item.proportionUnit = 100 / parseInt(item.maxAnswerCount);

          $.each(item.options, (indexOpt, itemOpt) => {
            itemOpt.background = this.colourSystem[indexOpt];
          })
        });
       },
      /*
       * 冒泡排序 - 倒序
       * @param {object} arr 选项
       * @return 返回最大数字
       */ 
      _bubbleSort(arr){
        for(let i = 0;i < arr.length - 1; i++){
          for(let j = 0;j < arr.length-i-1; j++){
            if(arr[j].answerCount < arr[j+1].answerCount){
                let temp = arr[j];
                arr[j]   = arr[j+1];
                arr[j+1] = temp;
              }
          }
        }
        return arr[0].answerCount;
       },
      /*
       * 评论列表
       */
      getCommentList() {
        let self = this, data = null;
        self.$request.requestAxios('get', basePath + '/t_tasks/review/list', {params: {fromId: self.detail.taskId, fromType: '2'}}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.comment.commentList = resposeData.data.rows;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败')
        });
       },
      /*
       * 回复
       */
      replyAdd(id) {
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/t_tasks/review', 
          {fromId: self.detail.taskId, fromType: '2', commentContent: self.comment.commentContent}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.getCommentList();
            // ---------- 清空数据 --------
            self.comment.commentContent = null; 
           
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review - 失败')
        });
       },
       
    }
  }
</script>