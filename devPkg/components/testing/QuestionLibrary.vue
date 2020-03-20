/*********************图片考试 - 题库***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div class="content-area">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-tree
          ref="partyTree"
          :data="treeData"
          v-loading="loading"
          node-key="id"
          :props="defaultProps"
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }" @click="clickNode(data)">
            <span :class="{'text-blue': tempId == data.id}">
            <i v-if="tempId == data.id" class="el-icon-circle-check" aria-hidden="true"></i>
            {{ node.label }}
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-button type="primary" @click="formDialogVisible = true" icon="el-icon-plus">添加题目</el-button>
        <el-button type="primary" @click="importButtonClicked" icon="el-icon-document">导入题目</el-button>
        <div v-loading="cardsLoading" class="cards-wrap">
          <el-card v-for="(item, index) in listData" :key="`${index}列表`" class="card-item">
            <el-row :gutter="10">
              <el-col :span="18">
                {{ item.content }}
                <ul>
                  <li v-for="(itemInner, indexInner) in item.answerList" :key="itemInner.id">{{ returnLetter(indexInner) }}、{{ itemInner.content }}</li>
                </ul>
              </el-col>
              <el-col :span="6" class="img-wrap">
                <div v-if="!item.picture" class="no-img-div">暂无图片</div>
                <img v-else :src="item.picture" alt="" style="height: 100px; width:100px;">
              </el-col>
              <el-col :span="24" class="question-info">
                <p>题型:
                  <span v-if="item.type == 1">单选题</span>
                  <span v-if="item.type == 2">多选题</span>
                  <span v-if="item.type == 3">简答题</span>
                </p>
                <p>创建者: {{ item.createName }}</p>
                <p>分值: {{ item.score }}</p>
                <span>
                  <el-button type="primary" size="small" @click="$router.push({name: 'Question_Detail', params: {id: item.id}})">查看解析</el-button>
                  <el-button type="primary" size="small" @click="addToBasket(item)">试题篮</el-button>
                </span>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="currentPerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    
    <!-- 添加试题 -->
    <el-dialog
      title="添加"
      :visible.sync="formDialogVisible"
      :close-on-click-modal="false"
      top="150px"
      width="65%"
      @before-close="focusStatus = false"
      @close="restForm"
      >
      <div v-loading="loading">
        <el-form :model="questionForm" ref="questionForm" :rules="rules" label-width="80px" size="small">
          <el-form-item
            prop="type"
            label="题目类型">
            <el-select v-model="questionForm.type" class="fill-width">
              <el-option :value="1" label="单选题"></el-option>
              <el-option :value="2" label="多选题"></el-option>
              <!-- <el-option :value="3" label="简答题"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item
            prop="content"
            label="题干">
            <el-input v-model="questionForm.content"></el-input>
          </el-form-item>
          <div v-if="questionForm.type == 1">
            <el-form-item
              v-for="(item, index) in questionForm.answerList"
              :key="`${item.key}`"
              :prop="`answerList.${index}.content`"
              :label="`单选项${index+1}`"
              :rules="{ required: true, message: '请输入选项描述', trigger: 'blur' }">
              <div class="answer-wrap">
                <el-input v-model="item.content" placeholder="请输入选项描述"></el-input>
                <el-radio class="margin-radio" v-model="questionForm.isCorrect" :label="index">设为正确答案</el-radio>
                <el-button type="danger" @click="deleteAnswer(item)">删 除</el-button>
              </div>
            </el-form-item>
          </div>
          <div v-if="questionForm.type == 2">
            <el-form-item
              v-for="(item, index) in questionForm.answerList"
              :key="`${item.key}`"
              :prop="`answerList.${index}.content`"
              :label="`多选项${index+1}`"
              :rules="{ required: true, message: '请输入选项描述', trigger: 'blur' }">
              <div class="answer-wrap">
                <el-input v-model="item.content" placeholder="请输入选项描述"></el-input>
                <el-checkbox class="margin-radio" v-model="questionForm.checkList" :label="index">设为正确答案</el-checkbox>
                <el-button type="danger" @click="deleteAnswer(item)">删 除</el-button>
              </div>
            </el-form-item>
          </div>
          <div v-if="questionForm.type == 3">
            <el-form-item
              v-for="(item, index) in questionForm.answerList"
              :key="`${item.key}`"
              :prop="`answerList.${index}.content`"
              label="答案"
              :rules="{ required: true, message: '请输入简答题答案', trigger: 'blur' }">
              <el-input type="textarea" v-model="item.content"></el-input>
            </el-form-item>
          </div>
          <el-form-item
            prop="score"
            label="分值">
            <el-rate class="flex-form-item" v-model="questionForm.score" show-score></el-rate>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-wrap"
              :action="imgServer"
              :headers="token"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
              name="upfile">
              <img v-if="questionForm.picture" :src="questionForm.picture" class="avatar-img">
              <i v-else class="el-icon-plus">上传图片</i>
            </el-upload>
          </el-form-item>
          <el-form-item
            prop="analysis"
            label="解析">
            <el-input type="textarea" v-model="questionForm.analysis"></el-input>
          </el-form-item>
        </el-form>  
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="questionForm.type == 3 || loading" type="primary"  @click="addAnswer">添加答案</el-button>
        <el-button :disabled="loading" @click="formDialogVisible = false">取 消</el-button>
        <el-button :disabled="loading" type="primary" @click="submitForm('questionForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 批量导入试题 -->
    <el-dialog
      title="导入"
      :visible.sync="importDialogVisible"
      :close-on-click-modal="false"
      top="150px"
      width="65%"
      >
      <el-upload
        :action="fileServer"
        :headers="token"
        :on-success="handleImportSuccess"
        :on-remove="handleImportRemove"
        :on-error="handleImportError"
        :limit="1"
        :http-request="userUpload"
        :on-exceed="handleImportExceed"
        :file-list="fileList"
        :beforeUpload="beforeImportUpload">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">单次仅支持一次上传一个文件, 文件大小不可超过10M</div>
        <div slot="tip" class="el-upload__tip">重复上传时请删除当前文件后, 重新上传</div>
      </el-upload>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button :disabled="loading" @click="importDialogVisible = false">取 消</el-button>
        <el-button :disabled="loading" type="primary" @click="importQuestions">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      var checkTime = (rule, value, callback) => {

        if(!value) {
          callback(new Error('请选择时间区间'));
        } else {
          if(value > new Date().getTime()) {
            callback(new Error('时间必须选当前时间之前'));
          } else {
            callback()
          }
        } 
      }
      return {
        loading:      false,
        cardsLoading: false,

        imgServer:  `${basePath}/sys/ueditor/file?action=uploadimage`,
        fileServer: null,
        token:      { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userData")).token}`},
        
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),

        treeData: [],   //党组织的树形结构
        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },
        //表单
        questionForm: {
          analysis: "",
          answerList: [ //答案列表
            {
              content: "",
              exactness: false,
            },
          ],
          content: "", //题干
          picture: null,
          score: 0,
          type: 1,
          isCorrect: 0, //单选 正确答案 提交时遍历处理answerList每一项 并删除此key
          checkList: [] //多选 正确答案 处理方法同上
        },

        //验证
        rules: {
          type: [
            { required: true, message: '请选择题目类型', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入题干信息', trigger: 'blur' }
          ],
          score: [
            { required: true, message: '请选择分值', trigger: 'blur' }
          ],
          // createrOrgTime: [
          //   { validator: checkTime, trigger: 'blur' },
          //   { validator: checkTime, trigger: 'change' },
          //   { required: true, message: '请选择成立日期', trigger: 'blur' }
          // ]
        },
        //分页
        listData:  [],
        currentPage:     1,
        currentPerPage:  5,
        total:           null,

        typeName:          null,   //类型input名称
        tempLevel:         null,   //当前操作的层级 sameLevel本级 childLevel子级 topLevel 顶级
        tempId:            null,   //鼠标移动到对应的节点, 记录此节点id, 显示对应的操作按钮
        tempOperateType:   null,   //当前操作模式 new新增 edit编辑
        tempOperateObj:    {},     //当前触发操作的data对象
        parentType:        null,   //父节点的类型, 用于判断 添加或编辑节点的类型
        formDialogVisible: false,

        importDialogVisible: false,
        fileList:            [],
      }
    },

    components: {
    },
    mounted () {
      this.getTreeData(`/knowledges/knowledges/all_tree`, "treeData")
    },
    watch: {
      "questionForm.type" : {
        handler (oldV, newV) {
          console.log(newV)
          this.questionForm.answerList = [ //重置答案列表
            {
              content: "",
              exactness: false,
            },
          ]
        },
        deep: true
      }
    },
    methods: {
      /**
       * 根据序号返回对应的字母 超过26则返回对应(index+1)
       * @param  {number} index 序号下标值 从0开始
       * @return {[type]}       [description]
       */
      returnLetter (index) {
        if(index >= 0 || index <= 25) {
          return  String.fromCharCode(index + 65);
        } else {
          return index + 1
        }
      },
      /**
       * 获取字典表数据
       * @return {[type]} [description]
       */
      getDictionaryData () {
        let self = this;

        let config = {
          url: `${basePath}/contrast/all_contrast_info`,
          method: "get"
        }

        self.$request.requestAxios(config.method, config.url, null, 
          (response) => {
            response.data.data.forEach((item) => {
              switch (item.id) {
                case 8: //党组织职位
                  self.dictionaryPosition = item.list;
                  break;
                default:
                  break;
              }
            })
          },
          (error) => {
            self.$message.error("获取数据对照表失败, 部分功能无法使用")
          }
        )
      },
      /**
       * 获取树形数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getTreeData (url, target, method) {
        var self = this
        self.loading = true
        self.formDialogVisible = false;

        self.$request.requestAxios(method || 'get', `${basePath}${url}`, null, 
          (response) => {
            self[target] = response.data.data;
            self.tempId = response.data.data[0].id
            this.getListData(`/questions/questions/choice/list`, "listData")
            self.loading = false
          },
          (error) => {
            self.$message.error(error)
            self.loading = false
          }
        )
      },
      /**
       * 获取列表数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getListData (url, target, method) {
        var self = this
        self.cardsLoading = true
        self.formDialogVisible = false;

        let params = {
          knowledgeId: self.tempId,
          pageSize: self.currentPerPage,
          pageNum:  self.currentPage
        }

        self.$request.requestAxios('post', `${basePath}${url}`, params, 
          (response) => {
            self[target] = response.data.data.rows;
            self.total   = response.data.data.total;
            self.cardsLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.cardsLoading = false
          }
        )
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getListData(`/questions/questions/choice/list`, "listData")
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getListData(`/questions/questions/choice/list`, "listData")
      },
      /**
       * 点击添加至试题篮 取出session中的数据 进行对比添加 不可重复添加
       * @param {[type]} data [description]
       */
      addToBasket (data) {

        if(!sessionStorage.getItem("basket")) { // 不存在试题篮数据
          let array = []
          array.push(data.id)
          sessionStorage.setItem("basket", JSON.stringify(array))
        } else { //已经生成过试题篮
          let array = JSON.parse(sessionStorage.getItem("basket"))
          
          if(array.length > 0) {
            let flag = true

            array.forEach((item, index) => {
              if(item == data.id) {
                flag = false
                this.$message.warning("试题篮中已存在本题")
              }
            })

            if(flag) {
              array.push(data.id)
              this.$message.success("成功添加到试题篮")
            }
          } else {
            array.push(data.id)
            this.$message.success("成功添加到试题篮")
          }
          sessionStorage.setItem("basket", JSON.stringify(array))
        }
      },
      /**
       * 重置表单
       * @return {[type]} [description]
       */
      restForm () {
        this.$refs.questionForm.resetFields();
        this.questionForm = {
          analysis: "",
          answerList: [ //答案列表
            {
              content: "",
              exactness: false,
            },
          ],
          content: "", //题干
          picture: null,
          score: 0,
          type: 1,
          isCorrect: 0, //单选 正确答案 提交时遍历处理answerList每一项 并删除此key
          checkList: [] //多选 正确答案 处理方法同上
        }
      },
      /**
       * 获取党组织详情中的数据(使用promise时需要将promise放在函数中, 否则将会立刻执行)
       * @return {[type]} [description]
       */
      getPartyDetail (item) {
        let self = this;
        //初始化promise对象, 完成异步操作后return此对象, 外部方法链式调用then进行下一步操作
        self.$request.requestAxios("get", `${basePath}/knowledges/knowledges/details`, {params: {id: item.id}}, 
          (response) => {
            self.questionForm   = response.data.data

            self.loading = false
            self.formDialogVisible = true
            self.$nextTick(() => {
              if(self.$refs.questionForm) {
                self.$refs.questionForm.clearValidate();
              }
            })
          },
          (error) => {
            self.loading = false
            self.$message.error(error.data.meta.message || "失败")
          }
        )
      },
      /**
       * 点击节点, 保存当前的Id, 并查询列表
       * @param  {object} data 当前树节点的数据
       * @return {[type]}      [description]
       */
      clickNode(data) {
        this.tempId         = data.id
        this.currentPage    = 1
        this.currentPerPage = 5
        this.getListData(`/questions/questions/choice/list`, "listData")
      },
      /**
       * 添加答案
       */
      addAnswer () {
        this.questionForm.answerList.push({content: "", exactness: false,})
      },
      /**
       * 删除答案
       */
      deleteAnswer (item) {
        let index = this.questionForm.answerList.indexOf(item)
        this.$confirm("确认删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (index !== -1) {
            this.questionForm.answerList.splice(index, 1)
          }
          // TODO 优化当用户删除已有答案时, 当前选中的正确答案需要跟随变化
        }).catch(() => {})
        
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this

        
        self[formName].knowledgeId = self.tempId
        
        let result = self.handleForm(self[formName])

        if(result) {
          
          let config = {
            url:    `${basePath}/questions/questions/add/from_org/${self.orgCode}`,
            method: "post",
            data:   result
          }
          self.$refs[formName].validate((valid) => {
            if (valid) {
                self.loading = true
                self.$request.requestAxios(config.method, config.url, config.data, 
                  (response) => {
                    self.$message.success(response.data.meta.message)
                    //重新查询
                    self.getListData(`/questions/questions/choice/list`, "listData")
                    self.loading = false
                    self.formDialogVisible = false
                  },
                  (error) => {
                    self.$message.error(error.data.meta.message || "失败")
                    self.loading = false
                  }
                )         
            } else {
              self.$message.error("请检查必填项")
              return false;
            }
          })
        } else {
          self.$message.error("请至少选中一个将其设为正确答案")
        }

        

        // if(self.tempOperateType == "edit") {
        //   config.url    = `${basePath}/knowledges/knowledges/update/${self.tempOperateObj.id}/from_org/${self.orgCode}`
        //   config.method = "patch"
        // }

        // if (self.tempLevel == "sameLevel") { //添加同级党组织
        //   self.questionForm.parentId   = self.tempOperateObj.parentId
        // } else if (self.tempLevel == "childLevel") { // 添加本级公司的下级党组织
        //   self.questionForm.parentId = self.tempOperateObj.id
        // } else { //点击添加顶层组织
        //   self.questionForm.parentId = null
        // }
        // //追加选中公司的id数组
        // // self.questionForm.companyId = self.$refs.companyEdit.getArray("id")

        
      },
      /**
       * 处理form 返回一个需要保存至后台的form对象
       * @return {[type]} [description]
       */
      handleForm (formData) {
        let form = JSON.parse(JSON.stringify(formData))

        let flag = true
        if(form.type == 1) {
          form.answerList.forEach((item, index) => {
            form.isCorrect == index ? item.exactness = true : item.exactness = false
          })
        }
        
        if(form.type == 2) {
          if(form.checkList.length <= 0) {
            flag = false
          } else {
            form.answerList.forEach((item, index) => {
              item.exactness = false
            })
            console.log(form.checkList)
            form.checkList.forEach((item, index) => {
              form.answerList[item].exactness = true
            })
          }
        }

        delete form.isCorrect
        delete form.checkList

        if(flag) {
          return form
        } else {
          return false
        }
      },
      importButtonClicked () {
        this.fileList = []
        this.fileServer = `${basePath}/questions/import/${this.tempId}/from_org/${sessionStorage.getItem("orgCode")}`
        this.importDialogVisible = true
      },
      beforeAvatarUpload(file) {
        const isImage = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error('请上传正确的图片格式文件!');
        }
        if (!isLt2M) {
          this.$message.error('文件大小不能超过 2MB!');
        }
        return isImage && isLt2M;
      },
      /**
       * 上传成功, 写入img对应的path
       * @param  {[type]} response [description]
       * @param  {[type]} file     [description]
       * @param  {[type]} fileList [description]
       * @return none
       */
      uploadSuccess (response, file, fileList) {
        this.questionForm.picture = response.data.path
      },
      importQuestions () {
        let self = this

      },
      beforeImportUpload(file) {          
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
          const extension = testmsg === 'xls'  
          const extension2 = testmsg === 'xlsx'  
          const isLt2M = file.size / 1024 / 1024 < 10  
          if(!extension && !extension2) {
              this.preventBeforeDelete = true
              this.$message({  
                  message: '上传文件只能是 xls、xlsx格式!',  
                  type: 'warning'  
              });  
          }  
          if(!isLt2M) {
              this.preventBeforeDelete = true
              this.$message({  
                  message: '上传文件大小不能超过 10MB!',  
                  type: 'warning'  
              });  
          }  
          return extension || extension2 && isLt2M
      },
      /**
       * 自定义上传
       * @param  {[type]} params [description]
       * @return {[type]}        [description]
       */
      userUpload (fileParams) {

        let self = this

        let param = new FormData(); //创建form对象
        param.append('file',fileParams.file); //通过append向form对象添加数据

        let config = {
          url:    `${basePath}/questions/import/${this.tempId}/from_org/${sessionStorage.getItem("orgCode")}`,
          method: "post",
          data:   param
        }
        
        self.$request.requestAxios(config.method, config.url, config.data, 
          (response) => {
            self.$util._fileBold(response)
          },
          (error) => {
          },
          {responseType: "blob"},
          {headers: {'Content-Type': 'application/'}}
        )
      },
      /**
       * 上传文件成功的回调
       * @param  {object} response 响应
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleImportSuccess(response, file, fileList,sad) {
        // let fileName = decodeURI(respose.headers['content-disposition'].substring(20, respose.headers['content-disposition'].length));
        let url = window.URL.createObjectURL(new Blob([response.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '010.xlsx')
        document.body.appendChild(link)
        link.click()
      },
      /**
       * 确认删除, 还原上传状态, 清空数据
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleImportRemove(file, fileList) {
        
      },
      /**
       * 文件数量溢出的钩子
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleImportExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /**
       * 上传出错的钩子
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleImportError (errorMsg, file, fileList) {
        this.$message.error(errorMsg)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .card-item:hover {
    box-shadow: 0 5px 15px #ccc;
    border: 1px solid #eee;
  }
  .button-group {
    padding: 10px;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
  }
  .custom-tree-node .tree-right-operate {
    margin-left: 15px;
  }
  .answer-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .answer-wrap .margin-radio {
    margin: 0 10px;
  }
  .flex-form-item {
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .cards-wrap {
    max-height: calc( 100vh - 205px);
    overflow: auto;
  }
  .el-card {
    margin: 10px 0;
  }
  .el-card .img-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .el-card .img-wrap img,
  .el-card .img-wrap .no-img-div {
    line-height: 100px;
    text-align: center;
    height: 100px;
    width: 100px;
  }
  .question-info {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  /*上传图片*/
  .avatar-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
  }
  .avatar-wrap:hover {
    border: 1px dashed #409EFF;
    color: #409EFF;
  }
  .avatar-img {
    max-width: 100%;
  }
</style>

<!-- 强制样式 -->
<style> 
  .left-margin-50 .el-form-item__content {
    margin-left: 50px!important;
  }
  .text-blue {
    color: #409EFF;
  }
</style>