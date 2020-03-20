/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 学习党课
**************************************/ 
<template>
  <div v-if="periodDetail" class="content-manage course-detail_manage">
    <!-- 简介 -->
    <el-card class="box-card">
      <div class="">
        <p class="fl">学习{{periodDetail.lPeriodVoList[0].periodTitle}}基础</p>
        <p class="fr">时长：{{periodDetail.lPeriodVoList[0].periodHours ? periodDetail.lPeriodVoList[0].periodHours : 0}} 小时
        <p>
          视频
          <video></video>
        </p>
      </div>
    </el-card>
    <!-- 具体内容 -->
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="相关习题" name="first"></el-tab-pane>
        <el-tab-pane label="问答" name="two"></el-tab-pane>
        <el-tab-pane label="评论" name="three"></el-tab-pane>
        <el-tab-pane label="笔记" name="four"></el-tab-pane>
      </el-tabs>
      <!-- 相关习题 -->
      <div v-if=" activeName == 'first' ">
        <el-card v-for="(itemQus, indexQus) in question.rows" :key="indexQus" class="box-card mart5">
          <el-row>
            <el-col :span="20">
              <h4 class="marb10">{{parseInt(indexQus) + 1}}. {{itemQus.content}}</h4>
              <ul class="marl20 marb5">
                <li v-for="(itemOpt, indexOpt) in itemQus.answerList">
                  {{englishList[indexOpt]}}. {{itemOpt.content}}
                </li>
              </ul>
            </el-col>
            <el-col :span="4">
              <img width="100%" :src="itemQus.picture"/>
            </el-col>
          </el-row>
          <hr/>
          <el-row>
            <el-col :span="6">题型：{{ _questionType(itemQus.type)}}</el-col>
            <el-col :span="6">来自：{{itemQus.createName}}</el-col>
            <el-col :span="6">分值：{{itemQus.score}}</el-col>
            <el-col :span="6"><el-button type="primary" size="mini" @click="showAnalysis(itemQus)">解析</el-button></el-col>
          </el-row>
          <el-card v-if="itemQus.isShowAnalysis" class="mart20">
            <p class="marb10">答案解析：{{itemQus.analysis}}</p>
            <p class="marb10" v-if=" itemQus.type == 1 || itemQus.type == 2 " >
              正确答案：
              <span v-for="(correctItem, correctIndex) in itemQus.answerList">
                {{correctItem. exactness ? englishList[correctIndex] + ', ' : ''}}
              </span>
            </p>
          </el-card>
        </el-card>
        <div class="grid-content bg-purple-dark mart20">
          <el-pagination :span="24" class="ce-pagination"
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="currentPage4"
            :page-sizes="elementPageData.defaultData.pageSizes"
            :page-size="elementPageData.defaultData.pageSizeDefault"
            layout="total, sizes, prev, pager, next, jumper"
            :total="question.total">
          </el-pagination>
        </div>
      </div>
      <!-- 问答 -->
      <div v-if="activeName == 'two'">
        <div class="small-wrapper">
          <div class="content-wrapper">
            <el-card class="box-card mart5" v-for="(itemComment, index) in courseQuestion" :key="index">
              <h5>
                <img class="marr5" src="../../../images/urser_black_manage.png" />
                <span class="marr5">{{itemComment.content}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建人：{{itemComment.creatorName}}</span> 
                <!-- 编辑问题 -->
                <el-button 
                  v-if="itemComment.creator == userData.userId" type="text" icon="el-icon-edit" 
                    @click=" questionOrNodeDialogVisible = true; 
                            questionOrNodeForm.questionId = itemComment.id; 
                            form.content = itemComment.content;
                            opearType = 2; 
                            $refs.form ? $refs.form.clearValidate() : ''; ">
                </el-button>
              </h5>
              <div class="marl20 padl20">
                <p v-for="(itemLa, indexLa) in itemComment.laList" :key="indexLa" class="mart10">
                  {{ !indexLa ? '最新问答/创建人：' + itemLa.creatorName : '创建人：' + itemLa.creatorName }}
                  <!-- 编辑答案 -->
                  <el-button 
                    v-if="itemComment.creator == userData.userId" 
                    type="text" icon="el-icon-edit" 
                    @click=" questionOrNodeDialogVisible = true; 
                             questionOrNodeForm.questionId = itemComment.id; 
                             questionOrNodeForm.answerId = itemLa.id; 
                             form.content = itemLa.content; 
                             opearType = 4; 
                             $refs.form ? $refs.form.clearValidate() : ''; ">
                  </el-button>
                  <br/>
                  {{itemLa.content}}
                </p>

              </div>
              <p class="mart20 color-darkGrey">
                <span class="marl20">{{itemComment.answerNum}}回答/
                  <el-button type="text" @click="checkMoreClick(index,itemComment)">查看更多</el-button>/
                  <!-- 新建答案 -->
                  <el-button class="mar0" type="text" 
                    @click=" questionOrNodeDialogVisible = true; 
                             questionOrNodeForm.questionId = itemComment.id;
                             form.content = null;
                             opearType = 3; 
                             $refs.form ? $refs.form.clearValidate() : ''; ">
                    解答
                  </el-button>
                </span>
                <span class="marl20">{{itemComment.browseNum}}浏览</span>
                <span class="marl20 fr">{{itemComment.dayNum == 0 ? '今天' : itemComment.dayNum + '天前'}}</span>
              </p>
            </el-card>
            <div class="small-wrapper mart20">
                <div class="content-wrapper">
                  <el-input placeholder="提问" type="textarea" v-model="questionOrNodeForm.content"></el-input>
                </div>
                <p class="text-right mart10"><el-button @click="submitComment(0)" type="primary" size="small">提交</el-button></p>
              </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div v-if="activeName == 'three'">
        <div class="small-wrapper">
          <div class="content-wrapper">
            <el-card class="box-card mart5" v-for="(itemComment, index) in commentList" :key="index">
              <h5>
                <img class="marr5" src="../../../images/urser_black_manage.png" />
                <span class="marr5">{{itemComment.creator}}</span> 
                <span>{{$util._convertDate(itemComment.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}</span>
              </h5>
              <p class="marl20 padl20 mart5">{{itemComment.commentContent}}</p>
            </el-card>
          </div>
        </div>
        <div class="small-wrapper mart20">
          <div class="content-wrapper">
            <el-input placeholder="评论" type="textarea" v-model="form.commentContent"></el-input>
          </div>
          <p class="text-right mart10"><el-button @click="comment" type="primary" size="small">保存</el-button></p>
        </div>
      </div>
      <!-- 笔记 -->
      <div v-if="activeName == 'four'">
        <div class="small-wrapper">
          <div class="content-wrapper">
            <div class="text-right">
              <el-switch
                class="marb20"
                @change="switchPostionChange"
                v-model="switchPostion"
                active-text="只看我的">
              </el-switch>
            </div>
            <el-card class="box-card mart5" v-for="(itemComment, index) in courseNode" :key="index">
              <h5>
                <img class="marr5" src="../../../images/urser_black_manage.png" />
                <span class="marr5">{{itemComment.createName}}</span> 
                <span>{{$util._convertDate(itemComment.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}</span>
                <!-- 编辑笔记 -->
                <el-button 
                  v-if="itemComment.creator == userData.userId" type="text" icon="el-icon-edit" 
                    @click="showEditNode(itemComment)">
                </el-button>
              </h5>
              <p class="marl20 padl20 mart5">{{itemComment.content}}</p>
              <p class="mart20 color-darkGrey">
               <!--  <span class="marl20">点赞{}</span>
                <span class="marl20">采集{}</span> -->
                <el-button class="marl20" size="mini" type="text" @click="checkNodeDetail(index, itemComment)">查看全文</el-button>
                <span class="marl20 fr">{{itemComment.dayNum == 0 ? '今天' : itemComment.dayNum + '天前'}}</span>
              </p>
            </el-card>
          </div>
        </div>
        <div class="small-wrapper mart20">
          <div class="content-wrapper">
            <el-input placeholder="笔记" type="textarea" v-model="questionOrNodeForm.content"></el-input>
          </div>
          <p class="text-right mart10"><el-button @click="submitComment(1)" type="primary" size="small">提交</el-button></p>
        </div>
      </div>
      <hr/>
      <!-- 收藏，报错，点赞 -->
      <div class="content-manage-wrapper">
        <div class="small-wrapper">
          <p class="opear text-center">
            <span @click="collection" class="pointer">
              <img style="width: 17px;" v-if="periodDetail.isCollect" src="../../../images/link.png">
              <img style="width: 17px;" v-else src="../../../images/no_link.png">
              <i>收藏</i>
            </span>
            <span><img @click="like" src="../../../images/Fabulous_manage#000.png"><i>点赞数：{{periodDetail.lectureLike}}</i></span>
            <span @click="showErrorDialogFun" class="pointer"><img  src="../../../images/sigh_red.png"><i>报错</i></span>
          </p>
        </div>
      </div>
    </el-card>
    <!-- 报错模态框 -->
    <el-dialog
      class="dialog"
      title="报错"
      :before-close="handleErrorDialogClose"
      :visible.sync="errorDialogVisible"
      width="60%">
      <div>
        <el-form :model="form" ref="errorFrom" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="报错内容："
            prop="errorContent"
            :rules="[
              { required: true, message: '报错内容不能为空'},
            ]"
          >
            <el-input type="textarea" v-model="form.errorContent" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="error('errorFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 回答/笔记-弹框 -->
    <el-dialog
      class="dialog"
      title="答案"
      :visible.sync="questionOrNodeDialogVisible"
      width="60%">
      <div>
        <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="内容："
            prop="content"
            :rules="[
              { required: true, message: '内容不能为空'},
            ]"
          >
            <el-input type="textarea" v-model="form.content" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConent('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:{
      courseId: { //课程ID
        required: true,
      },
      periodId: { //课时ID
        required: true,
      }
    },
    data() {
      return {
        orgCode: sessionStorage.getItem('orgCode'),
        userData: JSON.parse(sessionStorage.getItem('userData')),
        tabPosition: '1', //1查看最新，2查看点赞
        switchPostion: false, //true只看我的，false查看所有
        activeName: 'first',
        errorDialogVisible: false,
        elementPageData: {  //分页参数
          defaultData: this.$util.elementPagination,  //分页需要的数据
          pageNum: this.$util.elementPagination.pageNumDefault,  //查询课程需要的数据
          pageSize: this.$util.elementPagination.pageSizeDefault, //查询课程需要的数据
        }, 
        periodDetail: null, //课时详情
        courseDetail: null, //党课详情
        question: {total: 0, rows: []}, //题库
        commentList:  [],  //评论列表
        form: {            //表单数据
          content:        null,
          errorContent:   null,
          commentContent: null,
        },
        englishList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        courseNode:     null,//课时笔记
        courseQuestion: null,//课时问答
        questionOrNodeForm: {
          content: null,
          questionId:     null, //题目Id
          answerId:       null, //答案Id
          nodeId:         null, //笔记Id 
        },
        questionOrNodeDialogVisible: false,
        opearType: 1, //1为新建问题，2为编辑问题，3为新建答案，4为编辑答案，5为编辑笔记
      }
    },
    mounted() {
      this.checked();
      this.getCommentList();
      this.getQuestionList();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 点赞
      * @return data
      */
      like() {
        let self = this, data = null;
        self.$request.requestAxios('patch', basePath + '/l_lecture/'+ self.courseId +'/toggle/like', "", 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            self.checked();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/l_lecture/'+ self.courseId +'/toggle/like - 失败')
        });
      },
      error(){
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/a_errors/error', 
          {fromId: self.courseId, fromType: '3', content: self.form.errorContent}, 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            self.$message('报错成功！！！！')
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_errors/error - 失败')
        });
        // ------- 关闭弹框 ----------
        self.errorDialogVisible = false;
      },
      /*
      * 收藏
      * @return data
      */
      collection() {  
        let self = this, data = null;
        self.$request.requestAxios('patch', basePath + '/a_collection/'+ self.courseId +'/2/collect/toggle',"", 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            // ----------- 当收藏成功过后，状态取反，避免再次查询详情好性能 ----------
            self.periodDetail.isCollect = !self.periodDetail.isCollect;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_collection/'+ self.newsId +'/1/collect/toggle - 失败', 20)
        });
        // ------- 关闭弹框 ----------
        self.errorDialogVisible = false;
      },
      /*
      * 根据党课ID，课时ID查询课时信息，并且添加首次浏览记录
      */
      checked() {
        let self = this, data = null;
        self.$request.requestAxios('patch', basePath + '/l_lecture/'+ self.courseId +'/item/'+ self.periodId +'/periodItem', "", 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            self.periodDetail = responseData.data;
            self.periodDetail.lPeriodVoList[0].periodAppendix = JSON.parse(self.periodDetail.lPeriodVoList[0].periodAppendix);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/l_lecture/'+ self.courseId +'/item/'+ self.periodId +'/periodItem')
        });
      },
      
      /*
      * 评论
      */
      comment() {
        let self = this, data = null;
        self.$request.requestAxios('post', basePath + '/a_reviewes/review', 
          {fromId: self.courseId, fromType: '3', commentContent: self.form.commentContent}, 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            self.getCommentList();
            // ---------- 清空数据 --------
            self.form.content = null; 
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/review - 失败')
        });

        // ------- 关闭弹框 ----------
        self.commentDialogVisible = false;
      },
      /*
      * 评论列表
      */
      getCommentList() {
        let self = this, data = null;
        self.$set(self, 'commentList', [])
        self.$request.requestAxios('get', basePath + '/a_reviewes/list', {params: {fromId: self.courseId, fromType: '3'}}, 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            self.$set(self, 'commentList', responseData.data.rows);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/a_reviewes/list - 失败')
        });
      },
      /*
       * 显示报错弹框
       */
      showErrorDialogFun(){
        this.errorDialogVisible = true ; 
        if(this.$refs.errorFrom) this.$refs.errorFrom.resetFields();
      },
      /*
       * 查询相关习题
       */
      getQuestionList() {
        this.$request.requestAxios('get', basePath + '/l_lecture/question/list', this._questionListParams(), 
          (response) => {// 请求成功回调函数...
            this.question = response.data.data;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error( basePath + '/l_lecture/question/list - 失败')
        });
      },
      _questionListParams(){
        return {
          params: 
            {
              id:        this.periodId,
              pageSize:  this.elementPageData.pageSize,
              pageNum:   this.elementPageData.pageNum,
            }
          }
      },
      /*
      * 改变当前页码触发此事件，并广播paginationChange事件
      * @param {number} val 当前页码
      */
      handleCurrentChange(val){
        this.elementPageData.pageNum = val;
        this.getQuestionList();
      },
      /*
      * 改变每页条数触发此事件，并广播paginationChange事件
      * @param {number} val 当前数据
      */
      handleSizeChange(val){
        this.elementPageData.pageSize = val;
        this.getQuestionList();
      },
      /* 
       * 显示/隐藏答案解析
       */
      showAnalysis(itemQus){
        itemQus.isShowAnalysis = itemQus.isShowAnalysis ? !itemQus.isShowAnalysis : true;
        this.question.rows = Object.assign({}, this.question.rows, this.question.rows)
      },
      /*
       * 为1选择题，2多选题，3简单题
       */
      _questionType(type){
        switch(type){
          case 1:
            return '单选题'
            break;
          case 2:
            return '多选题'
            break;
          case 3:
            return '简答题'
            break;
        }
      },
      /*
       * 切换tab
       */
      tabHandleClick(){
        switch(this.activeName){
          case 'first':
            this.getQuestionList();
            break
          case 'two':
            this.getCourseQuestion();
            break
          case 'three':
            this.getCommentList();
            break
          case 'four':
            this.getCourseNode(false); //默认查询所有
            break
        }
      },
      /*
       * 课时笔记
       * @params {Boolean} bool 为true(0)只查询自己的，为false(1)查询所有
       */
      getCourseNode(bool) {
        let type ;
        bool ? type = 0 : type = 1;

        this.$request.requestAxios('get', `${basePath}/l_note/choice/list`, {params: {periodId: this.periodId, type: type}}, 
          (response) => {// 请求成功回调函数...
            this.courseNode = response.data.data;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_note/choice/list - 失败')
        });
      },
      /*
       * 课时问答
       */
      getCourseQuestion() {
        this.$request.requestAxios('get', `${basePath}/l_questions/l_questions/list`, {params: {periodId: this.periodId}}, 
          (response) => {// 请求成功回调函数...
            this.courseQuestion = response.data.data;
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_questions/l_questions/list - 失败')
        });
      },
      /*
       * 点击查看更多问答
       */
      checkMoreClick(index, itemData){
        this.$request.requestAxios('get', `${basePath}/l_questions/l_questions/details`, {params: {id: itemData.id}}, 
          (response) => {// 请求成功回调函数...
            this.courseQuestion[index] = response.data.data;
            this.courseQuestion = Object.assign({}, this.courseQuestion, this.courseQuestion);
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_questions/l_questions/details - 失败')
        });
      },
      /*
       * 添加课时问答
       * @params {number/string} type 0为新增问题，1为新增笔记
       */
      submitComment(type){
        let requestUrl ;
        type == 0 ? requestUrl = `${basePath}/l_questions/l_questions/add` :
                    requestUrl = `${basePath}/l_note/l_note/add`
        this.$request.requestAxios('post', requestUrl, {periodId: this.periodId, content: this.questionOrNodeForm.content}, 
          (response) => {// 请求成功回调函数...
            type == 0 ? this.getCourseQuestion() : this.getCourseNode(this.switchPostion);
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(requestUrl + ' - 失败')
        });
        this.questionOrNodeForm.content = null;
      },

      submitConent(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            switch(this.opearType){
              case 1:
                break
              case 2:
                this.editQuestion();
                break
              case 3:
                this.addAnswer();
                break
              case 4:
                this.editAnswer();
                break
              case 5:
                this.editNode();
                break
            }
            this.questionOrNodeDialogVisible = false;
          } else {
            return false;
          }
        });
      },
      /*
       * 新建答案
       */
      addAnswer(){
        this.$request.requestAxios('post', `${basePath}/l_answers/l_answers/add`, 
            {lQuestionId: this.questionOrNodeForm.questionId, content: this.form.content}, 
          (response) => {// 请求成功回调函数...
            this.getCourseQuestion();
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_answers/l_answers/add/from_org - 失败')
        });
      },
      /*
       * 编辑答案
       */
      editAnswer(){
        this.$request.requestAxios('patch', `${basePath}/l_answers/l_answers/update/${this.questionOrNodeForm.answerId}`, 
            {lQuestionId: this.questionOrNodeForm.questionId, content: this.form.content}, 
          (response) => {// 请求成功回调函数...
            this.getCourseQuestion();
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_answers/l_answers/update/ - 失败')
        });
      },
      /*
       * 编辑问题
       */
      editQuestion(){
        this.$request.requestAxios('patch', `${basePath}/l_questions/l_questions/update/${this.questionOrNodeForm.questionId}`, 
            {lQuestionId: this.questionOrNodeForm.questionId, content: this.form.content}, 
          (response) => { // 请求成功回调函数...
            this.getCourseQuestion();
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_questions/l_questions/update - 失败')
        });
      },
      /*
       * 切换状态
       * @params {Boolean} bool 为true只查询自己的，为false查询所有
       */
      switchPostionChange(bool){
        this.getCourseNode(bool)
       },
      /*
       * 根据笔记Id查询笔记详情 
       * @params {object} itemData 单个笔记对象
       */
      checkNodeDetail(index, itemData){
        this.$request.requestAxios('get', `${basePath}/l_note/l_note/details`, {params: {id: itemData.id}}, 
          (response) => {// 请求成功回调函数...
            this.courseNode[index] = response.data.data;
            this.courseNode = Object.assign({}, this.courseNode, this.courseNode);
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_note/l_note/details - 失败')
        });
      },
      /*
       * 编辑笔记
       */
      editNode(){
        this.$request.requestAxios('patch', `${basePath}/l_note/l_note/update/${this.questionOrNodeForm.nodeId}`, 
            {periodId: this.periodId, content: this.form.content}, 
          (response) => {// 请求成功回调函数...
            this.getCourseNode(this.switchPostion);
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_note/l_note/update/ - 失败')
        });
      },
      /*
       * 显示编辑笔记弹框
       */
      showEditNode(itemData){
        this.$request.requestAxios('get', `${basePath}/l_note/l_note/details`, {params: {id: itemData.id}}, 
          (response) => {// 请求成功回调函数...
            this.questionOrNodeDialogVisible = true; 
            this.questionOrNodeForm.nodeId = itemData.id; 
            this.form.content = response.data.data.content;
            this.opearType = 5; 
            this.$refs.form ? this.$refs.form.clearValidate() : '';
          },(error, status) => {// 请求失败回调函数...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/l_note/l_note/details - 失败')
        });
      },
    }
  }
</script>