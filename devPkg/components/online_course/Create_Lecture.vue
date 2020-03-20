/*************************************
*  create by xieyuanyuan date 2018/05/07
*  首页管理 - 创建党课
**************************************/
<template>
    <!-- <div> -->
        <!-- <menu-manage :subMenuIndex="0"></menu-manage> -->
        <div class="content-manage">
            <!-- <div class="lecture-type-box">
                
            </div> -->
            <div class="lecture-create-form" style="">
                <el-form  :model="lectureForm" :rules="rules" ref="lectureForm" label-width="80px" size="middle">
                <el-row>
                    <el-col :span = "12">
                    <el-form-item  label="党课标题" prop = "lectureTitle" >
                        <el-input clearable="true" v-model="lectureForm.lectureTitle" placeholder="请输入党课标题"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span = "12">
                    <el-form-item label="讲师" prop = "lectureDocent">
                        <el-input clearable="true" v-model="lectureForm.lectureDocent" placeholder="请输入讲师姓名"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                    <!-- <el-form-item label="党课分类" prop = "fkLectureTypeId" >
                        <el-select v-model="lectureForm.fkLectureTypeId" placeholder="请选择分类">
                            <el-option v-for="item in lectureTypes"
                                       :key="item.typeId"
                                       :label="item.typeName"
                                       :value="item.typeId"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="关键字"  prop = "lectureKeywords">
                        <el-input clearable="true" v-model="lectureForm.lectureKeywords" placeholder="请输入党课关键字"></el-input>
                    </el-form-item>
                    <el-form-item label="可点赞"  prop="lectureCanLike">
                        <el-switch v-model="lectureForm.lectureCanLike" active-value="0" inactive-value="1"></el-switch>
                    </el-form-item>
                    <el-form-item label="点赞积分" prop="likeIntegral" v-if="!likeDisbled">
                        <el-input-number :min="0" :controls="false" v-model="lectureForm.likeIntegral" placeholder="请输入点赞积分" :disabled = "likeDisbled"></el-input-number>
                    </el-form-item>
                    <el-form-item label="可评论" prop="lectureCanComment">
                        <el-switch v-model="lectureForm.lectureCanComment" active-value="0" inactive-value="1"></el-switch>
                    </el-form-item>
                    <el-form-item label="评论积分" prop = "commentIntegral" v-if="!commentDisabled">
                        <el-input-number :min="0" :controls="false" v-model="lectureForm.commentIntegral" placeholder="请输入评论积分" :disabled = "commentDisabled"></el-input-number>
                    </el-form-item>
                    <el-form-item label="报错积分" prop = "referenceErrorIntegral">
                        <el-input-number :min="0" :controls="false" v-model="lectureForm.referenceErrorIntegral" placeholder="请输入报错积分"></el-input-number>
                    </el-form-item>
                    <el-form-item label="党课简介" prop="lectureIntroduction">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入党课简介"
                                v-model="lectureForm.lectureIntroduction">
                        </el-input>
                    </el-form-item>
                    <el-upload
                            class=""
                            :action="coverUploadUrl"
                            :on-remove="handleLectureRemove"
                            :onError="uploadError"
                            :onSuccess="uploadSuccess"
                            :beforeUpload="beforeLectureCoverUpload"
                            :headers="{Authorization: 'Bearer ' + userData.token}"
                            :limit="1"
                            list-type="picture"
                            ref="lectureApix"
                            name="upfile">
                        <el-button size="small" type="primary" icon = "el-icon-upload">上传封面图片</el-button>
                        <p slot="tip" class="el-upload__tip">只能上传".png",".jpg",".jpeg",".gif"文件，且不超过2M</p>
                    </el-upload>
                </el-form>


                <div class="periodItems">
                    <el-tag size="medium"
                            closable
                            v-for="perItem in lectureForm.lPeriodVoList"
                            :key = perItem
                            :disable-transitions="false"
                            @close="handleClose(perItem)">
                        {{perItem.periodTitle}}&nbsp;&nbsp;&nbsp;&nbsp;{{perItem.periodHours}}课时
                    </el-tag>
                </div>
                <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="periodAddBoxVisible = true">添加课时</el-button>
                <!-- <el-button class="margin-top-20" type="primary" size="small" icon="el-icon-edit" @click = "showEditLectureTypeDialog">编辑党课类型</el-button> -->
                <div class="save-button-wrap">
                    <el-button type="primary" icon = "el-icon-success" @click = "comfirmSubmitLecture">提交党课</el-button>
                </div>
            </div>

            <!-- 添加党课课时弹窗 -->
            <el-dialog
                    title="添加党课课时"
                    :visible.sync="periodAddBoxVisible"
                    :close-on-click-modal="false"
                    width="50%"
                    height="1000px"
                    :before-close="periodDialogClose"
            >
                <div class="period-add-form">
                    <el-form :inline="true" :model="periodForm" :rules="periodRules" ref="periodForm" label-width="80px">
                        <el-form-item label="课时标题" prop = "periodTitle">
                            <el-input clearable="true" v-model="periodForm.periodTitle" placeholder="请输入课时标题"></el-input>
                        </el-form-item>
                        <el-form-item label="课时时长" prop = "periodHours">
                            <el-input-number :min="0" :controls="false" v-model="periodForm.periodHours"></el-input-number>
                        </el-form-item>
                        <el-form-item label="课时积分" prop = "periodIntegral">
                            <el-input-number :min="0" :controls="false" v-model="periodForm.periodIntegral"></el-input-number>
                        </el-form-item>
                        <el-form-item label = "课时简介" prop = "periodIntroduction">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入课时简介"
                                v-model="periodForm.periodIntroduction">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="知识点" prop = "knowledgeIds">
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
            <el-button @click="clearAddPeriod()">取 消</el-button>
            <el-button type="primary" @click="comfirmAddPeriod()">确 定</el-button>
          </span>
            </el-dialog>

            <el-dialog
                    title="添加党课类型"
                    :visible.sync="lectureTypeVisible"
                    :close-on-click-modal="false"
                    width="50%"
                    height="1000px"
                    :before-close="lectureTypeDialogClose">
                <el-tag
                        :key="type"
                        v-for="type in lectureTypes"
                        closable
                        :disable-transitions="false"
                        @close="deleteTypeById(type)">
                    {{type.typeName}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="addLectureTypeInputVisible"
                        v-model="typeValue.typeName"
                        ref="saveLectureTypeInput"
                        size="small"
                        @keyup.enter.native="addLectureTypeConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">新建课程</el-button>
            </el-dialog>
        </div>
    <!-- </div> -->



</template>

<style type="text/css">
    input[type=file]{
        display: none;
    }
</style>

<script>
    export default {
        data() {
            let self = this
            var checkLikeScore = (rule, value, callback) => {
                if(self.lectureForm.lectureCanLike != "0") {
                    if (value <= 0) {
                        callback(new Error('请输入大于0的数字'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            }
            var checkCommentScore = (rule, value, callback) => {
                if(self.lectureForm.lectureCanComment != "0") {
                    if (value <= 0) {
                        callback(new Error('请输入大于0的数字'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            }
            var checkScore = (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error('请输入大于0的数字'));
                } else {
                    callback();
                }
            }
            return {
                userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息

                dataBlockJson: null,    //框架的数据,
                lectureForm: {           //表单数据
                    lectureTitle: '',   //党课标题
                    lectureDocent: '',  //党课讲师
                    fkLectureTypeId: '',    //党课类型
                    likeIntegral: null,    //党课点赞积分
                    lectureCanLike: '0',      //党 课点赞
                    lectureCanComment: '0',    //党课可评论
                    commentIntegral: null, //党课评论积分
                    referenceErrorIntegral: null,   //党课报错积分
                    lectureIntroduction: '', //党课简介
                    lectureKeywords: '', //党课关键字
                    lPeriodVoList: [],        //党课包含的课时
                    lectureCovers: '',       //党课封面
                    lectureOrgCode: sessionStorage.getItem("orgCode"),
                },
                rules: {
                    lectureTitle: [
                        { required: true, message: '请输入党课标题', trigger: 'blur' },
                        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                    ],
                    lectureDocent: [
                        { required: true, message: '请输入讲师姓名', trigger: 'blur' },
                        { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                    ],
                    // fkLectureTypeId: [
                    //     { required: true, message: '请选择党课类型', trigger: 'change' }
                    // ],
                    lectureIntroduction: [
                        { required: true, message: '请填写党课简介', trigger: 'blur' },
                        { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
                    ],
                    // commentIntegral: [
                    //     { required: true, message: '请填写评论积分', trigger: 'blur' },
                    // ],
                    // likeIntegral: [
                    //     { required: true, message: '请填写评论积分', trigger: 'blur' },
                    // ],
                    likeIntegral: [
                        { validator: checkScore, trigger: 'change' },
                        { validator: checkScore, trigger: 'blur' }
                    ],
                    commentIntegral: [
                        { validator: checkScore, trigger: 'change' },
                        { validator: checkScore, trigger: 'blur' }
                    ],
                    referenceErrorIntegral: [
                        { required: true, message: '请填写评论积分', trigger: 'blur' },
                        { validator: checkScore, trigger: 'change' },
                        { validator: checkScore, trigger: 'blur' }
                    ]
                },
                periodForm: {           //课时表单
                    periodTitle: '',    //课时标题
                    periodHours: 0,     //课时时长
                    periodIntroduction: '', //课时简介
                    periodAppendix: "",     //课时附件
                    periodIntegral:0 ,       //课时积分
                    knowledgeIds: null,  //知识点
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
                periodAddBoxVisible: false,     //课时添加弹出层控制
                lectureTypeVisible: false,      //党课类型调整弹出层控制
                lectureTypes: '',               //党课类型
                addLectureTypeInputVisible: false,//添加党课类型的输入框控制
                typeValue: {                    //添加的党课类型数据
                    typeName: ''
                },
                coverUploadUrl: basePath + '/sys/ueditor/file?action=uploadimage', //封面上传链接
                appendixUrl: basePath + '/file/' +sessionStorage.getItem("orgId")+ '/uplode',//课时上传的附件
                knowledgesList: null,
                propTree:  {
                  label: 'name',
                  children: 'childrens',
                },
            }
        },
        computed: {//计算属性
            likeDisbled:function(){
                return 1 == this.lectureForm.lectureCanLike
            },
            commentDisabled:function(){
                return 1 == this.lectureForm.lectureCanComment
            }

        },
        watch: {
            "lectureForm.lectureCanLike": { //监听可点赞
                handler (newV) {
                    if(newV == 1) {
                        this.lectureForm.likeIntegral = null
                    }
                    
                }
            },
            "lectureForm.lectureCanComment": { //监听可评论
                handler (newV) {
                    if(newV == 1) {
                        this.lectureForm.commentIntegral = null
                    }
                }
            },
        },
        mounted() {
            //this.getLectureType(); //初始化党课类型
            this.getAllKnowledges();
        },
        destoryed() {

        },
        methods:{

            /**
             *  党课封面上传成功后的回调
             */
            uploadSuccess (response, file, fileList) {
                if(response.meta.code == 0) {
                    this.lectureForm.lectureCovers = response.data.path
                } else {
                    this.lectureForm.lectureCovers = ""
                }
            },
            /**
             *  党课封面上传错误的回调
             */
            uploadError (response, file, fileList) {
                this.$message.error("上传失败" , 20);
                this.lectureForm.lectureCovers = ""
            },
            /**
             *  党课封面上传前对文件的大小的判断
             */
            beforeLectureCoverUpload (file) {
                let types = ["png","jpg","jpeg","gif"]
                return this.uploadLimit(file,types,2)
            },
            /**
             *  移除上传后的文件
             */
            handleLectureRemove(file, fileList){
                this.lectureForm.lectureCovers = "";
            },
            /**
             *  党课课时附件上传成功回调
             */
            appendixSuccess (response, file, fileList) {
                if(response.meta.code!==0){
                    this.$refs.periodApix.uploadFiles.splice(this.$refs.periodApix.uploadFiles.indexOf(file), 1);
                    this.$message.error(file.name+"上传失败！")
                }
            },
            /**
             *  党课课时附件上传失败回调
             */
            appendixError(response, file, fileList){
                this.$message.error(file.name+"上传失败！")
            },
            /**
             *  党课课时附件上传前对文件的判断
             */
            beforeAppendixUpload(file){
                return this.uploadLimit(file,'',50)
            },
            /**
             * 党课课时附件移除
             */
            handlePeriodRemove(file, fileList){
                //  this.$message(file.name+"移除成功！")
            },
            /**
             * 获取党课类型
             */
            getLectureType(){
                let self = this;
                this.$request.requestAxios('get',basePath + '/l_type/list', '',
                    function(response) {// 请求成功回调函数...
                        self.lectureTypes = response.data.data;
                    },function(error, status) {// 请求失败回调函数...
                            status == 200 ? self.$message.error(error.data.meta.message) :
                                            self.$message.error('获取党课类型 - 失败')
                    }
                )
            },
            /**
             * 重载党课类型
             */
            reloadType(){
                //this.getLectureType()
            },
            /**
             * 弹出党课类型编辑对话框
             */
            showEditLectureTypeDialog(){
                this.lectureTypeVisible = true
                //this.reloadType()
            },
            handleClose(done) {
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => {});
                done();
            },
            lectureTypeDialogClose(done){
                done();
            },
            periodDialogClose(done){
                done();
                this.clearPeriodForm("periodForm");
            },
            /**
             * 确认添加课时
             */
            comfirmAddPeriod(){
                let self = this;
                self.periodForm.knowledgeIds = this.$refs.knowledgesRef.getCheckedKeys();
                if(self.submitForm("periodForm")){
                    self.periodForm.periodAppendix = ""
                    self.$refs.periodApix.uploadFiles.forEach(function(item){   //将附件值存储到课时附件列表
                        self.periodForm.periodAppendix += item.response.data + ","
                    })
                    self.lectureForm.lPeriodVoList.push(self.periodForm)        //将课时添加到党课下
                    self.periodAddBoxVisible = false                            //关闭弹窗
                    self.clearPeriodForm("periodForm")                          //清空表单
                }else{
                    self.$message.error("请检查必填项",20)
                }
            },
            /**
             * 清空课时添加表单
             */
            clearAddPeriod(){
                this.periodAddBoxVisible = false
                this.clearPeriodForm("periodForm")
            },
            /**
             * 删除课时
             * @param periodItem
             */
            handleClose(periodItem) {
                this.lectureForm.lPeriodVoList.splice(this.lectureForm.lPeriodVoList.indexOf(periodItem), 1);
            },
            /**
             * 确认添加党课
             */
            comfirmSubmitLecture(){
                let self = this;
                // console.log(JSON.stringify(self.lectureForm))
                if(!self.submitForm("lectureForm") ){
                    self.$message.error("请检查必填项",20)
                    return false
                }

                if(self.lectureForm.lectureCovers == '' || self.lectureForm.lectureCovers == null){
                    self.$message.error("请上传封面图片！",20)
                    return false
                }

                let lectureData = this.lectureForm;
                this.$request.requestAxios('post',basePath + "/l_lecture/add", lectureData,
                    function(response) {// 请求成功回调函数...
                        self.$message.success('添加党课 - 成功', 20)
                        Object.assign(self.$data, self.$options.data()) //清空表单数据
                        self.$refs.lectureApix.uploadFiles = []  //清空上传列表
                        self.$router.push({path: "/online_course_index"})
                    },
                    function(error, status) {// 请求失败回调函数...
                            status == 200 ? self.$message.error(error.data.meta.message) :
                                            self.$message.error('添加党课 - 失败');
                    },
                    'application/json',
                    'json'
                )
                    //this.reloadType()
            },
            /**
             * 删除党课类型
             * @param type
             */
            deleteTypeById(type){
                let self = this;
                this.$request.requestAxios('patch',basePath + "/l_type/delete/"+ type.typeId,'',
                    function(response) {// 请求成功回调函数...
                        self.$message.success('删除党课类型 - 成功', 20)
                    },
                    function(error) {// 请求失败回调函数...
                        self.$message.error('删除党课类型 - 失败', 20)
                    }
                )
                this.lectureTypes.splice(this.lectureTypes.indexOf(type), 1);
            },
            /**
             * 显示添加党课类型的输入框
             */
            showInput() {
                this.addLectureTypeInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveLectureTypeInput.$refs.input.focus();
                });
            },
            /**
             * 确认添加党课类型
             */
            addLectureTypeConfirm() {
                let inputValue = this.typeValue
                let self = this
                if (inputValue) {
                    this.$request.requestAxios("post", basePath + "/l_type/add", inputValue,
                        (response) => {// 请求成功回调函数...
                            self.$message.success('添加党课类型 - 成功', 20)
                            //self.getLectureType();
                            self.typeValue.typeName = '';
                            self.addLectureTypeInputVisible = false;
                        },
                        (error) => {// 请求失败回调函数...
                            self.$message.error('添加党课类型 - 失败', 20)
                        }
                    )
                }
                
            },
            /**
             * 上传文件的限制
             * @returns {boolean}
             */
            uploadLimit(file,allowTypes,limitSize){
                let typesLimit  = false;
                let sizeLimit = false;
                let self = this;
                if(null === allowTypes || '' === allowTypes || 0 === allowTypes.length){
                    typesLimit = true
                }else{
                    allowTypes.forEach(function(type){
                        file.name.split('.')[1] === type ? typesLimit = true : typesLimit = typesLimit;
                    })
                }
                file.size / 1024 / 1024 < limitSize ? sizeLimit = true : sizeLimit = false;
                if(!typesLimit) self.$message.error("文件格式有误！")
                if(!sizeLimit) self.$message.error("请保持文件在"+ limitSize +"M以内！")
                return typesLimit && sizeLimit
            },
            /**
             * 表单验证
             * @param formName
             */
            submitForm(formName) {
                let flag = false
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        flag = true
                    }
                });
                return flag
            },
            /**
             * 清除课时表单
             */
            clearPeriodForm(formName){
                this.$refs.periodApix.uploadFiles = []  //清空上传列表
                this.periodForm = {           //课时表单
                    periodTitle: '',    //课时标题
                    periodHours: 0,     //课时时长
                    periodIntroduction: '', //课时简介
                    periodAppendix: "",     //课时附件
                    periodIntegral:0        //课时积分
                }
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
        }
    }
</script>

<style scoped>
    .save-button-wrap {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .save-button-wrap button {
        background: #374d66;
        border-color: #374d66;
    }
    .margin-top-20 {
        margin-top: 20px; 
    }
</style>