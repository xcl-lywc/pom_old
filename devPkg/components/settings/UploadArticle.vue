/*********************上传文章***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-03
/************************************************/
<template>
  <div>
    <!-- <h2 v-if="articleOperateType == 'new'">上传文章</h2>
    <h2 v-else>编辑文章</h2> -->
    <el-container>
      <el-aside width="250px" id="special-aside" v-loading="treeLoading">
        <h5 class="left-title">分类列表</h5>
        <el-tree
          :data="typeList"
          class="left-tree"
          node-key="atId"  
          :props="defaultProps"
          check-strictly
          ref="typeTree"
          @node-click="clickTypeTree"
          accordion
          style="padding: 5px">           
        </el-tree>
        <h5 class="left-title">专题列表</h5>
        <el-tree
          :data="specialList"
          class="left-tree"
          node-key="atId"
          :props="defaultProps"
          check-strictly
          ref="specialTree"
          @node-click="clickSpecialTree"
          style="padding: 5px">
        </el-tree>
      </el-aside>
      <el-main v-loading="detailLoading" class="main-content">
        <el-form label-width="90px" :rules="rules" ref="article" :model="articleForm" id="article-form" size="small">
          <el-form-item label="文章标题:" prop="articleName">
            <el-input type="input" required v-model="articleForm.articleName"></el-input>
          </el-form-item>
          <el-form-item label="字号" props="wordNum">
            <el-input-number v-model="articleForm.wordNum" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="文章内容:">
            <u-editor :config="editorConfig" :type="'new'" ref="ueditor"></u-editor>
          </el-form-item>
          <el-form-item label="" class="tags-item">
            <h5 class="form-item-tags-title">关键词
              <i class="el-icon-circle-plus add-tag-icon" @click="showAddTagDialog('keyWords')"></i>
            </h5>
            <el-tag
              v-for="(tag, index) in articleForm.keyWords"
              :key="index"
              type="danger"
              closable
              @close="deleteTag(tag, 'keyWords')">
              {{tag}}
            </el-tag>
            <span class="no-tags-text" v-if="articleForm.keyWords && articleForm.keyWords.length == 0"> 点击右侧添加</span>
          </el-form-item>
          <el-form-item label="" class="tags-item" >
            <h5 class="form-item-tags-title">
              分类<span class="tips-text">分类/专题 至少添加一项</span>
              <!-- <i class="el-icon-circle-plus add-tag-icon" @click="showAddTagDialog('type')"></i> -->
            </h5>
            <el-tag
              v-for="(tag, index) in articleForm.type"
              :key="tag.atName + index"
              type="danger"
              closable
              @close="deleteTag(tag, 'type')">
              {{tag.atName}}
            </el-tag>
            <span class="no-tags-text" v-if="articleForm.type && articleForm.type.length == 0"> 点击左侧添加</span>
          </el-form-item>
          <el-form-item label="" class="tags-item" >
            <h5 class="form-item-tags-title">
              专题<span class="tips-text">分类/专题 至少添加一项</span>
              <!-- <i class="el-icon-circle-plus add-tag-icon" @click="showAddTagDialog('special')"></i> -->
            </h5>
            <el-tag
              v-for="(tag, index) in articleForm.special"
              :key="tag.atName + index"
              type="danger"
              closable
              @close="deleteTag(tag, 'special')">
              {{tag.atName}}
            </el-tag>
            <span class="no-tags-text" v-if="articleForm.special && articleForm.special.length == 0"> 点击左侧添加</span>
          </el-form-item>
          <el-form-item >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-checkbox v-model="laudScoreChecked">
                  点赞
                  <el-input v-model="articleForm.laudScore" class="score-input" type="number"></el-input>
                </el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox v-model="commentScoreChecked">
                  评论
                  <el-input v-model="articleForm.commentScore" class="score-input" type="number" ></el-input>
                </el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox v-model="learnScoreChecked">
                  学习
                  <el-input  v-model="articleForm.learnScore" class="score-input" type="number"></el-input>
                </el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox v-model="errorScoreChecked">
                  报错
                  <el-input 
                    v-model="articleForm.errorScore" class="score-input" type="number">
                  </el-input>
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          
          <el-form-item label="附件上传">
            <el-upload
              :headers="{Authorization: 'Bearer ' + userData.token}"
              :action="_convertFilesUrl()"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeFileUpload"
              :limit="99"
              :file-list="articleForm.recordInfo">
                <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
          </el-form-item>
          <div class="form-footer">
            <el-button type="primary" @click="submitArticle" :disabled="articleForm.type.length <= 0 && articleForm.special.length <= 0">提交</el-button>
          </div>
        </el-form>
      </el-main>

      <!-- 添加 关键字 分类 专题 dialog -->
      <el-dialog
        title="添加"
        :visible.sync="addTagDialogVisible"
        width="30%"
        :close-on-click-modal="false">
        <el-form label-width="80px" size="small">
          <el-form-item v-if="operateType == 'keyWords'" label="关键字">
            <el-input type="text" v-model="keyWordsValue" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item v-if="operateType == 'type'" label="选择分类">
            <!-- <el-select v-model="typeSelectValue" class="fill-width" @change="changeSelect($event, typeSelectList)">
              <el-option
                v-for="item in typeSelectList"
                :key="item.atId"
                :label="item.atName"
                :value="item.atId">
              </el-option>
            </el-select> -->
            <el-cascader
              :options="typeList"
              :props="{
                value: 'atId',
                label: 'atName',
                children: 'atypes'
              }"
              v-model="typeSelectValue"
              @change="handleCascaderChanged">
            </el-cascader>
          </el-form-item>
          <el-form-item v-if="operateType == 'special'" label="选择专题">
            <el-select v-model="specialSelectValue" class="fill-width" @change="changeSelect($event, specialSelectList)">
            <el-option
              v-for="item in specialSelectList"
              :key="item.atId"
              :label="item.atName"
              :value="item.atId">
            </el-option>
          </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addTagDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTag">确 定</el-button>
        </span>    
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
  import jquery from "jquery"
  import Ueditor from '../common/editor.vue'

  export default {
    data() {
      return {
        userData:           JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        orgId:              sessionStorage.getItem('orgId'),     //党组织id

        treeLoading:   false,
        detailLoading: false,
        orgCode:  sessionStorage.getItem("orgCode"),

        typeList:     [],        //分类的树形结构
        specialList:  [],        //专题的树
        defaultProps: {
          children: 'atypes',   //分类/专题树的配置
          label: 'atName'
        },

        typeSelectList:     [],    //添加dialog > 分类的select List
        typeSelectValue:    [],    //添加dialog > 分类的select Value
        specialSelectList:  [],    //添加dialog > 专题的select List
        specialSelectValue: null,  //添加dialog > 专题的select Value
        tempSelectChoosed:  null,  //当前点击的select item
        keyWordsValue:      null,  //添加dialog > 关键词input值

        articleId:         null,  //文章id
        articleForm: {           //文章表单
          articleName:     null,  //文章标题
          articleContent:  null,  //文章主体
          keyWords:        [],    //关键字数组
          type:            [],    //类型数组
          special:         [],    //专题数组
          laudScore:       null,  //点赞积分
          commentScore:    null,  //评论积分
          learnScore:      null,  //学习积分
          errorScore:      null,  //报错积分
          status:          1,     //文章状态, 由后台发出状态为4
        },

        //四种积分的check情况
        laudScoreChecked:    false, 
        commentScoreChecked: false,
        learnScoreChecked:   false,
        errorScoreChecked:   false,

        operateType:      null,  //点击添加的操作模式, 显示不同的内容
        addTagDialogVisible: false,

        rules: {
          articleName: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            // { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
        },

        fileList: [], //附件列表

        editorConfig: {
          /*可以在此处定义工具栏的内容*/
          elementPathEnabled: false,
          autoHeightEnabled: false,
          autoFloatEnabled: false,　　//是否工具栏可浮动
          initialContent: ' ',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent: false, 
          //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
      };
    },
    created () {
      // 全局挂载jquery, ueditor依赖
      window.$ = jquery
      // if (this.$route.params.id == ':id') { //无参数时
      //   this.articleOperateType = 'new'
      // } else {
      //   this.articleOperateType = 'edit'
      // }
      this.articleId = this.$route.params.id
    },
    components: {
      "u-editor": Ueditor,
    },
    watch: { // 监听选中, 取消选中清空对应输入框 
      laudScoreChecked (newV, oldV) {
        if(!newV) {
          this.articleForm.laudScore = null
        }
      },
      commentScoreChecked (newV, oldV) {
        if(!newV) {
          this.articleForm.commentScore = null
        }
      },
      learnScoreChecked (newV, oldV) {
        if(!newV) {
          this.articleForm.learnScore = null
        }
      },
      errorScoreChecked (newV, oldV) {
        if(!newV) {
          this.articleForm.errorScore = null
        }
      },
    },
    mounted () {
      this.getTypeList(null, `/a_types/allarticletypes/from_org/${this.orgCode}`, "typeList")
      this.getTypeList("2", `/a_types/articletypes/from_org/${this.orgCode}`, "specialList")

      this.getTypeArray("1", "typeSelectList")
      this.getTypeArray("2", "specialSelectList")

      let tempType = JSON.parse(sessionStorage.getItem("tempType"))
      if(tempType && tempType.atType == "1") { //分类时 在分类列表添加
        this.articleForm.type.push({
          atId: tempType.atId,
          atName: tempType.atName
        })
      } else if (tempType && tempType.atType == "2") { // 专题时, 在专题列表添加
        this.articleForm.special.push({
          atId: tempType.atId,
          atName: tempType.atName
        })
      }
    },
    methods: {
      /**
       * 获取分类(树)
       * @return {[type]} [description]
       */
      getTypeList (atType, url, target) {
        let self = this
        self.treeLoading = true;

        self.$request.requestAxios('get', basePath + url, {params: {
            type: atType
          }}, 
          (response) => {
            self[target] = response.data.data;
            if(target == 'typeList') { //删除空的childrens字段
              self[target].forEach((item, index) => {
                self.$util.traverseTree(item, 'atypes')
              })
            }
            self.treeLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.treeLoading = false
          }
        )
      },
      /**
       * 获取文章详情
       * @param  {number} id 文章Id
       * @return {[type]}    [description]
       */
      getArticleDetail (id) {
        let self = this

        let config = {
          url:    `${basePath}/a_info/${id}/detail`,
          method: "get",
        }

        self.detailLoading = true
        self.$request.requestAxios(config.method, config.url, null,
          (response) => {
            self.editorConfig.initialContent = response.data.data.articleContent
            self.articleForm                 = response.data.data
            if(self.articleForm.laudScore){
              self.laudScoreChecked = true
            }
            if(self.articleForm.commentScore){
              self.commentScoreChecked = true
            }
            if(self.articleForm.learnScore){
              self.learnScoreChecked = true
            }
            if(self.articleForm.errorScore){
              self.errorScoreChecked = true
            }
            self.detailLoading = false
          },
          (error) => {
            self.detailLoading = false
            self.$message.error(error)
          }
        )
      },
      /**
       * 获取分类/专题(非树形结构)
       * @param  {String} typeValue  分类的type 1分类 2专题 默认分类
       * @param  {String} targetName 数据保存的目标
       * @return none
       */
      getTypeArray (typeValue, targetName) {
        let self = this
        // 还原选中
        self.filterValue = null;
        self.$request.requestAxios('get', `${basePath}/a_types/articletypes/from_org/${self.orgCode}`, {params: {
            type: typeValue || '1'
          }}, 
          (response) => {
            // if(response.data.meta.code == 0) {
            //   self.$message.success("成功")
            // } else {
            //   self.$message.error(response.data.meta.message)
            // }
            self[targetName] = response.data.data;
          },
          (error) => {
            self.loading = false
            self.$message.error("失败")
          }
        )
      },
      /**
       * 点击 关键词/分类/专题 添加按钮 ,根据种类显示内容dialog 
       * @param  {[type]} typeName [description]
       * @return {[type]}          [description]
       */
      showAddTagDialog (typeName) {
        this.operateType         = typeName
        this.tempSelectChoosed   = null //清空选中的item
        this.typeSelectValue     = [];
        this.specialSelectValue  = null;
        this.addTagDialogVisible = true;
        this.keyWordsValue       = null;
      },
      /**
       * 点击确定, 将内容push进对应的数组
       */
      addTag () {
        switch (this.operateType) {
          case "keyWords":
            if(this.keyWordsValue){
              this.articleForm.keyWords.push(this.keyWordsValue)
              this.addTagDialogVisible = false
            } else {
              this.$message.error("请输入关键字")
            }
            break;
          case "type":
            if(this.tempSelectChoosed) {
              this.articleForm.type.push({
                atId:   this.tempSelectChoosed.atId[0],
                atName: this.tempSelectChoosed.atName
              })
              this.addTagDialogVisible = false
            } else {
              this.$message.error("未选择任何内容")
            }
            break;
          case "special":
            if(this.tempSelectChoosed){
              this.articleForm.special.push({
                atId:   this.tempSelectChoosed.atId,
                atName: this.tempSelectChoosed.atName
              })
              this.addTagDialogVisible = false
            } else {
              this.$message.error("未选择任何内容")
            }
            break;
          default:
            break;
        }
      },
      /**
       * 删除对应的tag
       * @param  {object} tag        tag对象
       * @param  {string} targetName 对应的数组名
       * @return none
       */
      deleteTag (tag, targetName) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.articleForm[targetName].splice(this.articleForm[targetName].indexOf(tag), 1);
        })
      },
      /**
       * 点击下拉选择框, 记录当前点击item的完整对象
       * @param  {Number}  value      当前选中的值atId
       * @param  {object}  target     当前操作的分类or专题 list
       * @return none
       */
      changeSelect (value, target) {
        let obj = {};
        obj = target.find((item)=> {
          return item.atId === value;
        });
        this.tempSelectChoosed = obj
      },
      handleCascaderChanged (value) {
        console.log(value)
        let label = this.$refs.typeTree.getNode(value.reverse()[0]).data.atName
        //this.tempSelectChoosed = this.getCascaderObj(value);
        this.tempSelectChoosed = {
          atName: label,
          atId:   value
        }
      },
      /**
       * 点击保存, 提交文章
       * @return {[type]} [description]
       */
      submitArticle () {
        let self =  this

        self.articleForm.articleContent = this.$refs.ueditor.getUEContent();

        self.$refs.article.validate((valid) => {
          if (valid) { //验证通过
            self.checkScore();
            // 追加附件
            let fileArray = this.fileList.map((item, index) => {
              let result = {
                id:   item.response.data,
                name: item.name
              }
              if(item.response) {
                return result
              } else {
                return item
              }
            })
            self.articleForm.privateFiles = JSON.stringify(fileArray)
            self.$request.requestAxios("post", `${basePath}/a_info/article/from_org/${self.orgCode}`, self.articleForm, 
              (response) => {
                self.$router.push({path:"/settings/new_article"})
                self.$message.success("成功")
              },
              (error) => {
                self.loading = false
                self.$message.error("失败")
              }
            )
          } else {
            self.$message.error("请检查必填字段")
          }
        });
      },
      /**
       * 检查四个积分是否勾选, 未勾选将清空对应的数值
       * @return {[type]} [description]
       */
      checkScore () {
        if(!this.laudScoreChecked) {
          this.articleForm.laudScore = null
        }
        if(!this.commentScoreChecked) {
          this.articleForm.commentScore = null
        }
        if(!this.learnScoreChecked) {
          this.articleForm.learnScore = null
        }
        if(!this.errorScoreChecked) {
          this.articleForm.errorScore = null
        }
      },
      /*
       * 拼接上传附件的URL地址
       */
      _convertFilesUrl() {
        return basePath + '/file/'+ this.orgId +'/uplode';
      },
      /*
       * 附件上传之前，验证的数据大小
       */
      beforeFileUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
          this.$message.error('附件大小不能超过 100MB!');
        }
        return isLt2M;
      },
      handleSuccess (response, file, filesList) {
        this.fileList = filesList
        console.log(this.fileList)
      },
      handleRemove (file, filesList) {
        this.fileList = filesList
        console.log(this.fileList)
      },
      clickTypeTree (data, node) {
        let flag = true
        this.articleForm.type.forEach((item, index) => {
          if(data.atId == item.atId) {
            flag = false
          }
        })
        if(flag){
          this.articleForm.type.push({
          atId:   data.atId,
          atName: data.atName
        })
        } else {
          this.$message.error("已有重复的分类")
        }
      },
      clickSpecialTree (data, node) {
        let flag = true
        this.articleForm.special.forEach((item, index) => {
          if(data.atId == item.atId) {
            flag = false
          }
        })
        if(flag){
          this.articleForm.special.push({
          atId:   data.atId,
          atName: data.atName
        })
        } else {
          this.$message.error("已有重复的专题")
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-aside {
    padding: 0;
  }
  .el-main {
    margin:  0 0 0 10px; 
    background: #fff;
    max-height: calc( 100vh - 115px );
    overflow-y: auto; 
  }
  .left-title {
    margin: 0;
    padding: 20px 0;
    background: #e8e9eb;
    font-size: 18px;
    font-weight: normal;
    color: #999999;
    text-align: center;
  }
  .left-tree {
    max-height: 37.5vh;
    overflow-y: auto;
  }
  .form-item-tags-title {
    margin: 0;
    padding: 20px;
    font-size: 18px;
    font-weight: normal;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    background: #f2f3f5;
  }
  .el-form .el-form-item {
    margin: 0;
    padding: 10px 0;
  }
  .el-form .el-form-item.tags-item {
    padding-bottom: 0;
  }
  .el-form .el-tag {
    margin: 10px 10px 0 10px;
  }
  .el-form .el-form-item .tips-text {
    color: #797979;
    margin-left: 15px;
    font-size: 14px;
  }
  .el-form .no-tags-text {
    display: block;
    text-align: center;
    height: 42px;
    line-height: 42px;
    color: #797979;
  }
  .el-form .add-tag-icon {
    float: right;
    font-size: 22px;
    color: #1f345d;
  }
  .el-form .add-tag-icon:hover {
    cursor: pointer;
  }
  .el-form .score-input {
    width: 60%;
    margin-left: 15px;
  }
  .el-form .form-footer {
    text-align: center;
    padding: 30px;
  }
</style>

<!-- 强制样式 -->
<style>
  #special-aside .el-submenu__icon-arrow.el-icon-arrow-down {
    color: #999999;
  }
  #article-form .el-form-item__content {
    line-height: inherit!important;
  }
</style>
