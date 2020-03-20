/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 网上党课 - 党课详情
**************************************/ 
<template>
  <div v-if="courseDetail" class="content-manage course-detail_manage">
    <!-- 简介 -->
    <el-card class="box-card">
      <div class="">
        <p class="fl">课程名称：{{courseDetail.lectureTitle}}</p>
        <p class="fr">时长：{{courseDetail.totalHours}}小时， 学习人数：{{courseDetail.totalPerson}} 人 ，
          评分：<el-rate 
                  class="fr"
                  v-model="courseDetail.avgScore"
                  disabled
                  show-score
                  text-color="#ff9900">
                </el-rate>
        </p>
        <p>
          <!-- 在组织中心，可编辑图片 -->
          <el-upload
            v-if="pageType == 'org'"
            class="avatar-uploader"
            name="upfile"
            :action="$util.basePath + '/sys/ueditor/exec?action=uploadimage'"
            :headers="{Authorization: 'Bearer ' + userData.token}"
            :show-file-list="false"
            :on-success="lectureCoversHandleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img  class="mart20" alt="暂无图片" :src="courseDetail.lectureCovers" style="width: calc(100vw - 414px);height: calc(75vh - 64px);" />
          </el-upload>
          <img v-else class="mart20" alt="暂无图片" :src="courseDetail.lectureCovers" style="width: 100%; height: calc(75vh - 30px);" />
        </p>
      </div>
    </el-card>
    <!-- 具体内容 -->
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="简介" name="first"></el-tab-pane>
        <el-tab-pane label="课时安排" name="two"></el-tab-pane>
        <el-tab-pane label="相关评论" name="three"></el-tab-pane>
        <el-tab-pane label="讲述知识点" name="four"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName == 'first'">
        <h5 class="marb5">课程名称：{{courseDetail.lectureTitle}}</h5>
        <p class="marb5">讲师：{{courseDetail.lectureDocent}}</p>
        <p class="marb5">创建时间：{{$util._convertDate(courseDetail.created, 'yyyy年MM月dd日 hh:mm:ss')}}</p>
        <p class="marb5">简介：{{courseDetail.lectureIntroduction}}</p>
        <el-button v-if="pageType == 'org'" type="primary" size="mini" @click="synopsisDialogVisible = true">修改简介</el-button>        
      </div>
      <div v-if="activeName == 'two'">
        <p class="text-right marb20">
          <el-button size="mini" type="primary" 
            v-if="pageType == 'org'" 
            @click="periodAddBoxVisible = true; perioadType='add' ">
              新增课时
            </el-button>
        </p>
        <el-card class="box-card" v-for="(item, index) in courseDetail.lPeriodVoList" :key="index">
          <p>第{{index+1}}节课：学习{{item.periodTitle}}基础&nbsp;&nbsp;&nbsp;&nbsp;
            时长：{{item.periodHours}} 小时&nbsp;&nbsp;&nbsp;
            <router-link v-if="pageType!='org'" :to="{name: routerName, params: { courseId: courseId, periodId: item.periodId}}">
              <el-button size="mini" type="primary">去学习</el-button>
            </router-link>
            <el-button v-if="pageType == 'org'" @click="showPeriodEditDialog(item)" size="mini" type="primary">编辑</el-button>
            <el-button v-if="pageType == 'org'" @click="delPeriod(item.periodId)" size="mini" type="danger">删除</el-button>
          </p>
        </el-card>
        <p class="pad20 text-center" v-if="!courseDetail.lPeriodVoList.length">暂无课时</p>
      </div>
      <div v-if="activeName == 'three'">
        <div class="small-wrapper">
          <div class="content-wrapper">
            <div class="mart5" v-for="(itemComment, index) in commentList">
              <h5>
                <img class="marr5" src="../../../images/urser_black_manage.png" />
                <span class="marr5">{{itemComment.creator}}</span> 
                <span>{{$util._convertDate(itemComment.createTime, 'yyyy年MM月dd日 hh:mm:ss')}}</span>
              </h5>
              <p class="marl20 padl20 mart5">{{itemComment.commentContent}}</p>
            </div>
          </div>
        </div>
        <div class="small-wrapper mart20">
          <div class="content-wrapper">
            <el-input placeholder="请评论点什么吧" type="textarea" v-model="form.commentContent"></el-input>
          </div>
          <p class="text-right mart10"><el-button @click="comment" type="primary" size="small">评论</el-button></p>
        </div>
      </div>
      <div v-if="activeName == 'four'">
        <div class="small-wrapper">
          <div class="content-wrapper">
              <el-tree
              :data="courseDetail.knowList"
              :props="treeProps">
            </el-tree>
          </div>
        </div> 
      </div>
      <hr/>
      <!-- 收藏，报错，点赞 -->
      <div class="content-manage-wrapper">
        <div class="small-wrapper">
          <p class="opear text-center">
            <span @click="collection" class="pointer">
              <img style="width: 17px;" v-if="courseDetail.isCollect" src="../../../images/link.png">
              <img style="width: 17px;" v-else src="../../../images/no_link.png">
              <i>收藏</i>
            </span>
            <span><img @click="like" src="../../../images/Fabulous_manage#000.png"><i>点赞数：{{courseDetail.lectureLike}}</i></span>
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
      width="30%">
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
    
    <!-- 添加党课课时弹窗 -->
    <el-dialog
      title="添加党课课时"
      :visible.sync="periodAddBoxVisible"
      :close-on-click-modal="false"
      width="50%"
      height="1000px"
      :before-close="periodDialogClose">
      <div class="period-add-form">
        <el-form :inline="true" :model="periodForm" :rules="periodRules" ref="periodForm" label-width="100px">
            <el-form-item label="课时标题：" prop = "periodTitle">
                <el-input clearable="true" v-model="periodForm.periodTitle" placeholder="请输入课时标题"></el-input>
            </el-form-item>
            <el-form-item label="课时时长：" prop = "periodHours">
                <el-input type="number" v-model="periodForm.periodHours" :step="5" :min="0"></el-input>
            </el-form-item>
            <el-form-item label="课时积分：" prop = "periodIntegral">
                <el-input type="number" v-model="periodForm.periodIntegral" :step="5" :min="0"></el-input>
            </el-form-item>
            <el-form-item label = "课时简介：" prop = "periodIntroduction">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入课时简介"
                    v-model="periodForm.periodIntroduction">
                </el-input>
            </el-form-item>
            <el-form-item label="知识点：" prop="knowledgeIds">
              <el-tree
                ref="knowledgesRef"
                :props="propTree"
                :data="knowledgesList"
                show-checkbox
                node-key="id">
              </el-tree>
            </el-form-item>
        </el-form>

        <el-upload
                name="file"
                :action="appendixUrl"
                :on-remove="handlePeriodRemove"
                :on-success = "appendixSuccess"
                :on-error = "appendixError"
                :beforeUpload="beforeAppendixUpload"
                :headers="{Authorization: 'Bearer ' + userData.token}"
                multiple
                :limit="10"
                :on-exceed="handleExceed"
                ref="periodApix">
            <el-button size="small" type="primary" icon = "el-icon-upload">上传附件</el-button>
            <div slot="tip" class="el-upload__tip">单个文件大小不超过50M，最多上传十个文件</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirmAddPeriod('periodForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改简介模态框 -->
    <el-dialog
      class="dialog"
      title="修改简介"
      :before-close="handleErrorDialogClose"
      :visible.sync="synopsisDialogVisible"
      width="30%">
      <div>
        <el-form :model="synopsisForm" ref="synopsisForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="课程名称："
            prop="lectureTitle">
            <el-input type="text" v-model="synopsisForm.lectureTitle" ></el-input>
          </el-form-item>
          <el-form-item
            label="讲师："
            prop="lectureDocent">
            <el-input type="text" v-model="synopsisForm.lectureDocent" ></el-input>
          </el-form-item>
          <el-form-item
            label="简介："
            prop="lectureIntroduction">
            <el-input type="text" v-model="synopsisForm.lectureIntroduction" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submtSynopsis('synopsisForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:{
      pageType: null, 
      courseId: {
        required: true,
      },
      routerName: {
        required: true,
        default: 'Learn_Course',
      },
    },
    data() {
      return {
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        activeName: 'first',
        value5: 3.5,
        errorDialogVisible: false,
        synopsisDialogVisible: false,
        courseDetail: null, //课程详情
        treeProps: {
          children: 'childrens',
          label: 'name'
        },
        commentList:  [],  //评论列表
        synopsisForm: {    //简介表单
          lectureId:          this.courseId, 
          lectureCovers:      null, //封面图 
          lectureTitle:       null, //名字 
          lectureIntroduction:null, //简介 
          lectureDocent:      null, //讲师
        },
        
        form: {            //表单数据
          commentContent: null,
          errorContent:   null,
        },
        periodForm: {           //课时表单
          periodTitle:        '',    //课时标题
          periodHours:        0,     //课时时长
          periodIntroduction: '',    //课时简介
          periodAppendix:     "",    //课时附件
          periodIntegral:     0,     //课时积分
          knowledgeIds:       null,  //知识点
        },
        periodRules: {
          periodTitle: [
              { required: true, message: '请填写课时标题', trigger: 'blur' },
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          periodIntroduction: [
              { required: true, message: '请填写课时简介', trigger: 'blur' },
              { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          periodIntegral: [
              { required: true, message: '请填写课时简介', trigger: 'blur' }
          ],
          knowledgeIds: [
              { required: true, message: '请选择知识点', trigger: 'blur' }
          ]
        },
        periodAddBoxVisible: false,
        knowledgesList:      null,
        propTree:  {
          label: 'name',
          children: 'childrens',
          isLeaf: 'leaf'
        },
        appendixUrl: basePath + '/file/' + sessionStorage.getItem("orgId")+ '/uplode', //课时上传的附件
        perioadType: 'add', //add为新增，edit为编辑
        editPeroadId: null, //当前被编辑的课时Id
      }
    },
    mounted() {
      this.getQueryCourseDetail();
      this.getCommentList();
      this.getAllKnowledges();
    },
    destoryed() {
       
    },
    methods:{
      /*
      * 查询课程列表
      */
      getQueryCourseDetail(){
        this.listData = { rows:[], total: 0};
        this.$request.requestAxios('patch', basePath + '/l_lecture/'+ this.courseId +'/item', "",
          (response) => { //请求成功的回调...
            var responseData = response.data;
            if(!responseData.data.avgScore) responseData.data.avgScore = 0; 
            this.courseDetail = responseData.data;

          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error('/l_lecture/'+ this.courseId +'/item - 失败');
          });
      },
      /*
      * 点赞
      * @return data
      */
      like() {
        let data = null;
        this.$request.requestAxios('patch', basePath + '/l_lecture/'+ this.courseId +'/toggle/like', "", 
          (response) => {// 请求成功回调函数...
            let responseData = response.data;
            this.getQueryCourseDetail();
          },(error ,status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                              this.$message.error('/l_lecture/'+ this.courseId +'/toggle/like - 失败', 20)
        });
      },
      /*
       * 显示报错弹框
       */
      showErrorDialogFun(){
        this.errorDialogVisible = true ; 
        if(this.$refs.errorFrom) this.$refs.errorFrom.resetFields();
        
      },
      error(formName){
        let data = null;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.requestAxios('post', basePath + '/a_errors/error', 
              {fromId: this.courseId, fromType: '3', errorContent: this.form.errorContent}, 
              (response) => {// 请求成功回调函数...
                let responseData = response.data;
                this.$message('报错成功！！！！');
              },(error ,status) => {// 请求失败回调函数...
                status == 200 ? this.$message.error(error.data.meta.message) :
                              this.$message.error('/a_errors/error - 失败')
            });
            // ------- 关闭弹框 ----------
            this.errorDialogVisible = false;
          } else {
            return false;
          }
        });
      },
      /*
       * 收藏
       * @return data
       */
      collection() {  
        let data = null;
        this.$request.requestAxios('patch', basePath + '/a_collection/'+ this.courseId +'/2/collect/toggle',"", 
          (response) => {// 请求成功回调函数...
            let responseData = response.data;
            // ----------- 当收藏成功过后，状态取反，避免再次查询详情好性能 ----------
            this.courseDetail.isCollect = !this.courseDetail.isCollect;
          },(error, status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                              this.$message.error('/a_collection/'+ this.newsId +'/2/collect/toggle - 失败')
        });
        // ------- 关闭弹框 ----------
        this.errorDialogVisible = false;
      },
      /*
       * 评论
       */
      comment() {
        let data = null;
        this.$request.requestAxios('post', basePath + '/a_reviewes/review', 
          {fromId: this.courseId, fromType: '3', commentContent: this.form.commentContent}, 
          (response) => {// 请求成功回调函数...
            let responseData = response.data;
            this.getCommentList();
            // ---------- 清空数据 --------
            this.form.commentContent = null; 
          },(error ,status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                              this.$message.error('/a_reviewes/review - 失败')
        });

        // ------- 关闭弹框 ----------
        this.commentDialogVisible = false;
      },
      /*
       * 评论列表
       */
      getCommentList() {
        let data = null;
        this.$set(this, 'commentList', [])
        this.$request.requestAxios('get', basePath + '/a_reviewes/list', {params: {status: 2, fromId: this.courseId, fromType: '3'}}, 
          (response) => {// 请求成功回调函数...
            let responseData = response.data;
            this.$set(this, 'commentList', responseData.data.rows);
          },(error ,status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                              this.$message.error('/a_reviewes/list - 失败')
        });
      },
      /**
       * 确认添加课时
       */
      comfirmAddPeriod(formName){
        this.periodForm.knowledgeIds = this.$refs.knowledgesRef.getCheckedKeys();

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.perioadType == 'add' ? this._addPeriod() : this._editPeroid();
          }else{
            return false
          }
        });
      },
      _addPeriod(){
        this.$request.requestAxios('post', `${basePath}/l_lecture/period/${this.courseId}`, this.periodForm, 
          (response) => {// 请求成功回调函数...
            this.$message.success(response.data.meta.message)
            this.getQueryCourseDetail();
            this._clearPeriodDialogData();
          },(error ,status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                                this.$message.error(`${basePath}/l_lecture/period/${this.courseId} - 失败`)
        });
      },
      _editPeroid(){
        this.$request.requestAxios('put', `${basePath}/l_lecture/period/${this.editPeroadId}`, this.periodForm, 
          (response) => {// 请求成功回调函数...
            this.$message.success(response.data.meta.message)
            this.getQueryCourseDetail();
            this._clearPeriodDialogData();
          },(error ,status) => {// 请求失败回调函数...
              status == 200 ? this.$message.error(error.data.meta.message) :
                                this.$message.error(`${basePath}/l_lecture/period/${this.editPeroadId} - 失败`)
        });
      },
      /*
       * 查询课程列表
       */
      getAllKnowledges(){
        this.$request.requestAxios('get', basePath + '/knowledges/knowledges/all', "",
          (response) => { //请求成功的回调...
            this.knowledgesList = response.data.data;
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error('/knowledges/knowledges/all - 失败');
          });
       },
      /*
       * 根据课时Id删除课时
       */
      delPeriod(id){
        this.$request.requestAxios('delete', basePath + '/l_lecture/period/' + id , "",
          (response) => { //请求成功的回调...
             this.$message.success(response.data.meta.message)
              this.getQueryCourseDetail();
          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error(basePath + '/l_lecture/period/' + id + ' - 失败');
          });
       },
       /*
        * 显示课时编辑框并查询当前列的数据
        */
       showPeriodEditDialog(item){
        this.perioadType = 'edit';
        this.periodAddBoxVisible = true;

        this.$request.requestAxios('get', basePath + '/l_lecture/period/' + item.periodId, "",
          (response) => { //请求成功的回调...
            this.periodForm = response.data.data;
            this.$refs.knowledgesRef.setCheckedKeys(this.periodForm.knowledgeIds);
            this.editPeroadId = item.periodId;

          },(error,status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                              this.$message.error('/l_lecture/period' + item.periodId + '- 失败');
          });
       },
      periodDialogClose(){
         this._clearPeriodDialogData();
       },
      /*
       * 清空课时表单数据
       */
      _clearPeriodDialogData(){
        this.periodAddBoxVisible = false;
        this.$refs.periodForm.resetFields();
        this.$refs.knowledgesRef.setCheckedKeys([]);
      },
      lectureCoversHandleAvatarSuccess(res){
        this.synopsisForm.lectureCovers = res.path;
        this._updateLectureCovers();
      },
      submtSynopsis(){
        this._updateLectureCovers();
      },
      /*
       * 编辑课程信息
       */
      _updateLectureCovers(){
        this.$request.requestAxios('post',basePath + "/l_lecture/update", this.synopsisForm, (response) => {
          this.getQueryCourseDetail();
          this.synopsisDialogVisible = false;
        }, (error, status) => {// 请求失败回调函数...
          this.synopsisDialogVisible = false;
          status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(url + ' - 失败');

        });
      }
    }
  }
</script>