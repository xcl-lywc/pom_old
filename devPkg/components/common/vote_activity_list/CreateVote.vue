/*************************************
*  create by xieyuanyuan date 2018/07/06
*  首页管理 - 创建选票问卷
**************************************/ 
<template>
  <el-main class="content-manage">
    <!-- 表单数据 -->
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item 
          label="投票主题: " 
          prop="ballotSpecial"
          :rules="[
            { required: true, message: '请填写投票主题', trigger: 'blur' },
          ]">
          <el-input v-model="form.ballotSpecial"></el-input>
        </el-form-item>
        <el-form-item 
          label="投票要求: "
          prop="ballotRequire"
          :rules="[
            { required: true, message: '请填写投票要求', trigger: 'blur' },
          ]">
          <el-input type="textarea" v-model="form.ballotRequire"></el-input>
        </el-form-item>
        <el-form-item 
          label="投票附件: ">
          <el-upload
            class="upload-demo"
            :action="`${$util.basePath}/sys/ueditor/exec?action=uploadfile`"
            :headers="{Authorization: 'Bearer ' + userData.token}"
            :on-preview="handlePreview"
            :on-remove="((res,fileList)=>{handleRemove(res, fileList, 'privateFiles')})"
            :before-remove="beforeRemove"
            name="upfile"
            multiple
            :limit="100"
            :on-exceed="handleExceed"
            :on-success="((res,file)=>{handleAvatarSuccess(res, file, 'privateFiles')})"
            :file-list="privateFilesList.length ? privateFilesList : fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!（可上传多个附件）</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加选项 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix questions-header">
        <span>问卷内容</span>
        <span v-if="isQuestionsPrompt" class="color-red">(请添题)</span>
          <el-button @click="addQuestion('checkBoxTem')" type="text" class="fr "><i class="el-icon-circle-plus font16"></i>多选题</el-button>
          <el-button @click="addQuestion('radioTem')" type="text" class="fr"><i class="el-icon-circle-plus font16"></i>单选题</el-button>
      </div>
      <div class="questions-box">
        <el-form label-width="50px" class="padr20">
          <el-form-item 
            v-for="(item, index) in form.questions" 
            v-if="item.hasOwnProperty('isDelete') ? !item.isDelete : true"
            :key="index" 
            class="questions-box-fix" 
            :label="`${index + 1}:`" >
            <!-- 题目 -->
            <el-input type="text" v-model="item.questionName"></el-input>
            <span v-if="item.hasOwnProperty('isPrompt') ? item.isPrompt : false" class="color-red">请填写题目</span>
            <i @click="delQuesOrOpt(item, index, 'ques')" class="btn-del el-icon-error"></i>
            <!-- 选项 -->
            <el-form label-width="80px" class="mart10">
                <el-form-item 
                  v-for="(itemOpt, indexOpt) in item.options" 
                  v-if="itemOpt.hasOwnProperty('isDelete') ? !itemOpt.isDelete : true"
                  :key="indexOpt" 
                  class="options-box" 
                  :label="`选项${indexOpt + 1}:`" >
                    <el-input type="text" v-model="itemOpt.optionName" style="width: 350px; float: left;"></el-input>

                    <!-- 附件 -->
                    <el-upload
                      style="float: left;"
                      class="upload-demo marb20 marl20"
                      :action="`${$util.basePath}/sys/ueditor/exec?action=uploadfile`"
                      :headers="{Authorization: 'Bearer ' + userData.token}"
                      :on-preview="handlePreview"
                      :on-remove="((res,fileList)=>{handleRemove(res, fileList, itemOpt)})"
                      :before-remove="beforeRemove"
                      name="upfile"
                      multiple
                      :limit="1"
                      :on-exceed="handleExceed"
                      :on-success="((res,file)=>{handleAvatarSuccess(res, file, itemOpt)})"
                      :file-list="itemOpt.privateFiles ? [JSON.parse(itemOpt.privateFiles)] : fileList">
                      <!-- {{itemOpt.privateFiles}} -->
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">附件大小不能超过 100MB!（只可上传一个附件）</div>
                    </el-upload>
                  <span v-if="itemOpt.hasOwnProperty('isPrompt') ? itemOpt.isPrompt : false" class="color-red">请填写选项</span>
                  <i @click="delQuesOrOpt(itemOpt, index, 'opt', indexOpt)" class="btn-del el-icon-error"></i>
                </el-form-item>
                <el-form-item>
                  <el-button @click="addOption(item)" type="primary" size="mini">添加选项</el-button>
                </el-form-item>
            </el-form>
            <div v-if="item.type == 1" class="marl20 padl20">
              最少选择 <el-input v-model="item.minOption" 
                          @change="minOptionChange($event, item)" 
                          @keyup.native="validateNumber($event)" 
                          type="number" class="line" 
                          style="width: 100px;" min="1"></el-input> 个,

              最多选择 <el-input v-model="item.maxOption" 
                        @change="maxOptionChange($event, item)" 
                        @keyup.native="validateNumber($event)" 
                        type="number" class="line" 
                        style="width: 100px;" 
                        :min="item.minOption"></el-input> 个
            </div>

          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('form')" class="marr20" type="primary" size="mini">提交</el-button>
            <router-link :to="{path: '/vote_index/vote_list'}"><el-button type="primary" size="mini">返回</el-button></router-link>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </el-main>
</template>

<script>
  export default {
    props: {
      paramsId: 'add', //为add表示新建，其他的则为编辑
    },
    data() {
      return {
        orgCode: sessionStorage.getItem('orgCode'),
        orgId:   sessionStorage.getItem('orgId'),
        userData: JSON.parse(sessionStorage.getItem('userData')),
        isQuestionsPrompt: false, //为true显示题型提示消息
        privateFilesList:  [],
        form: {   
          "ballotRequire": null,
          "ballotSpecial": null,
          "createOrgCode": sessionStorage.getItem('orgCode'),
          "questions":     [],
          "privateFiles":  null,
        },
        topicTem: {
          radioTem: { //单选
            value: '',
            type:         0, //0为单选，1为多选
            questionName: '单选题？',
            options: [
              { value: null, isChecked: false, privateFiles: null,}
            ],
          },
          checkBoxTem: { //多选
            value:        '',
            type:         1, //0为单选，1为多选
            questionName: '多选题？',
            maxOption:    null, //最多选择个数
            minOption:    null, //最少选择个数
            options: [
              { optionName: null, isChecked: false, privateFiles: null,}
            ],
          }
        },
      }
    },
    mounted() {
      this.init();
    },
    destoryed() {
       
    },
    methods:{
      init(){
        this.paramsId != 'add' ? this.getQueryDetailById() : '';
      },
      /*
       * 根据投票Id查询详情
       */
      getQueryDetailById(){
        this.$request.requestAxios('get', 
              `${this.$util.basePath}/v_ballot/detail/${this.paramsId}/from_org/${this.orgCode}`, '', 
            (response) => {
              this.form = response.data.data;
              if(this.form){
                this.privateFilesList = this.form.privateFiles ? JSON.parse(this.form.privateFiles) : [];
              }
              
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`v_ballot/detail - 失败`);
            },
         );
      },
      /*
       * 添题 
       * @params {number} type 题类型 //0为单选，1为多选
       */
      addQuestion(type){
        this.form.questions.push(JSON.parse(JSON.stringify(this.topicTem[type])))
      },
      /*
       * 添加选项
       */
      addOption(data){
        data.options.push({ value: null, });
      },
      /*
       * 删题,在被删除的数据中找到isDelete字段，那么数据就做成物理删除。
       * @params {number} itemData 当前被删除的数据
       * @params {number} quesIndex 需要删除的题型下标
       * @params {string} type 数据类型 为ques删除整个题，为opt只删除指定提中的某个选项
       * @params {string} optIndex 需要删除的选项下标
       */
      delQuesOrOpt(itemData, quesIndex, type, optIndex){
        if(itemData.hasOwnProperty('isDelete')){
          // --------------- 满足条件时，将删除状态设置为true --------------
          itemData.isDelete = true 
        }else{
          if(type == 'ques'){
            this.form.questions.splice(quesIndex,1);
          }else{
            if(this.form.questions[quesIndex].type == "radioTem"){
              this.form.questions[quesIndex].options.length <=2 ? 
              this.$message.warning('单选题，必须大于等于2个选项！') : 
              this.form.questions[quesIndex].options.splice(optIndex,1);
            }else{
              this.form.questions[quesIndex].options.length <= this.form.questions[quesIndex].maxOption ? 
              this.$message.warning('该题必须大于等于' + this.form.questions[quesIndex].maxOption + '个选项！') : 
              this.form.questions[quesIndex].options.splice(optIndex,1);
            }

            
          }
            
        }
      },
      /*
       * 提交表单
       */
      submitForm(formName){
        // debugger
        // this.form
        // return false
        this.$refs[formName].validate((valid) => {
          if (valid && this._validQuestions()) {
            this.paramsId == 'add' ? this._addForm() : this._editForm();
          }else{
             return false;
          }
        })
      },
      /*
       * 新增
       */
      _addForm(){
        this.$request.requestAxios('post', `${this.$util.basePath}/v_ballot/add/from_org/${this.orgCode}`, this.form, 
            (response) => {
              this.$emit('createBack', response.data.data);
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${this.$util.basePath}/v_ballot/add/from_org/${this.orgCode} - 失败`);
            },
         );
      },
      /*
       * 编辑
       */
      _editForm(){
        this.$request.requestAxios('put', `${this.$util.basePath}/v_ballot/update/from_org/${this.orgCode}`, this.form, 
            (response) => {
              this.$emit('createBack', this.paramsId);
            }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`${this.$util.basePath}/v_ballot/add/from_org/${this.orgCode} - 失败`);
            },
         );
      },
      /*
       * 验证题库 ，
       */
      _validQuestions(){
        let bool = true; //为true，则信息都先写完毕
        // ---------- 问卷的题必须有一个,否者显示提示信息 -------------
        !this.form.questions.length ? this.isQuestionsPrompt = true : this.isQuestionsPrompt = false;

        // ---------- 选项跟题目都不能为null --------
        $.each(this.form.questions, (index, item) => {
          // -------------------------- 将字符串转换为中文 --------------------------
          item.minOption = item.minOption ? parseInt(item.minOption) : item.minOption;
          item.maxOption = item.maxOption ? parseInt(item.maxOption) : item.maxOption;


          item.questionName    ? item.isPrompt = false : item.isPrompt = true;
          !item.questionName   ? bool = false : '';
          $.each(item.options, (indexOpt, itemOpt) => {
            itemOpt.optionName  ? itemOpt.isPrompt = false : itemOpt.isPrompt = true;
            !itemOpt.optionName ? bool = false : '';
          });
        });
        // ----------------- 将附件转为字符串 ---------------
        this.form.privateFiles = JSON.stringify(this.privateFilesList);
        // --------------- 避免页面监听不到数据变化 -----------------
        this.form = Object.assign({}, this.form, this.form);
        return this.form.questions.length ? bool : false;
      },
      /*
       * 附件上传成功后获取后台返回过来的数据
       * 采用了闭包的方式，将自己的参数传入在elementUI的方法中
       * @params {object} res  附件上传成功返回的的信息
       * @params {object} fileList 附件相关的信息
       * @params {string} fileKeyName 附件键名
       */
      handleAvatarSuccess(res,file,item){
        if(item == 'privateFiles'){ 
          this.privateFilesList.push({name: res.original, url: res.url});
        }else{
          item.privateFiles = JSON.stringify({name: res.original, url: res.url});
        }
      },
      /* 删除附件
       * 采用了闭包的方式，将自己的参数传入在elementUI的方法中
       * @params {object} res  附件上传成功返回的的信息
       * @params {object} fileList 附件相关的信息
       * @params {string} fileKeyName 附件键名
       */
      handleRemove(res, fileList, item){
        if(item == 'privateFiles'){ 
          this.privateFilesList = fileList;
        }else{
          item.privateFiles = '';
        }
      },
      /*
      * 禁止输入负数
      */
      validateNumber(evt){
        console.log(evt.keyCode)
        if(evt.keyCode == 189 || evt.keyCode == 169 || evt.keyCode == 190 || evt.keyCode == 110 || evt.keyCode == 69 || evt.keyCode == 109 || evt.keyCode == 13){
          // ---- 禁止输入
          evt.preventDefault();  
          $(evt.target).val('');
        }
      },
      /*
       * 多选题，中最小数字的变化
       */
      minOptionChange(val,item){
        if(item.minOption > item.maxOption){
          item.maxOption = item.minOption;
          this._addOptions(item);
        }
      },
      /*
       * 多选题中，最大数字的变化
       */
      maxOptionChange(val,item){
        this._addOptions(item);
      },
      /*
       * 如果选项的个数，小于最大选择个数，那么就将选项自动添加为最大的选择个数
       */
      _addOptions(item){
        // ------------------ 让改数据的this指向变为固定的 ---------------
        let optionsLength = parseInt(JSON.stringify(item.options.length));

        if(item.options.length < item.maxOption) {

          for(let i = 0; i < (parseInt(item.maxOption) - optionsLength); i++){
            item.options.push({
              optionName: null, isChecked: false, privateFiles: null,
            });
          }
        }
      }
    }
  }
</script>