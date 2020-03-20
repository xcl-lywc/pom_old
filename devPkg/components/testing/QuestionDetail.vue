/*********************图片考试 - 题目详情***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div>
    <div class="detail">
      <el-row :gutter="10">
        <el-col :span="18">
          {{ detailData.content }}
          <ul v-if="detailData.type != 3">
            <li v-for="(item, index) in detailData.answerList" :key="item.id">{{ returnLetter(index) }}、{{ item.content }}</li>
          </ul>
          <div v-else></div>
        </el-col>
        <el-col :span="6" class="img-wrap">
          <div v-if="!detailData.picture" class="no-img-div">暂无图片</div>
          <img v-else :src="detailData.picture" alt="" style="height: 100px; width:100px;">
        </el-col>
        <el-col :span="24" class="question-info">
          <p> {{ detailData.analysis }} </p>
        </el-col>
        <el-col :span="24" class="question-info">
          <p>题型:
            <span v-if="detailData.type == 1">单选题</span>
            <span v-if="detailData.type == 2">多选题</span>
            <span v-if="detailData.type == 3">简答题</span>
          </p>
          <p v-if="detailData.type != 3">正确答案: {{ exactAnswer }}</p>
          <p>创建者: {{ detailData.createName }}</p>
          <p>分值: {{ detailData.score }}</p>
          <span>
            <el-button type="primary" size="small" v-if="$route.name != 'My_Question_Detail'" @click="formDialogVisible = true">纠错</el-button>
          </span>
        </el-col>
      </el-row>
    </div>

    <div class="relative-question">
      <h4>相关题目</h4>
      <div v-loading="cardsLoading" class="cards-wrap">
        <el-card v-for="(item, index) in listData" :key="`${index}列表`">
          <el-row :gutter="10">
            <el-col :span="18">
              {{ item.content }}
              <ul v-if="item.type != 3">
                <li v-for="(itemInner, indexInner) in item.answerList" :key="itemInner.id">{{ returnLetter(indexInner) }}、{{ itemInner.content }}</li>
              </ul>
              <div v-else></div>
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
                <el-button type="primary" size="small" @click="clickOtherDetail(item)">查看详情</el-button>
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
    </div>

    <el-dialog
      title="纠错"
      :visible.sync="formDialogVisible"
      :close-on-click-modal="false"
      top="150px"
      width="65%"
      @before-close="focusStatus = false"
      @close="restForm"
      >
      <div v-loading="formLoading">
        <el-form :model="questionForm" ref="questionForm" :rules="rules" label-width="80px" size="small">
          <el-form-item
            prop="type"
            label="题目类型">
            <el-select v-model="questionForm.type" class="fill-width" :disabled="true">
              <el-option :value="1" label="单选题"></el-option>
              <el-option :value="2" label="多选题"></el-option>
              <el-option :value="3" label="简答题"></el-option>
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

  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgServer: `${basePath}/sys/ueditor/file?action=uploadimage`,
        token:     { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("userData")).token}`},

        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),
        
        formDialogVisible: false,
        formLoading: false,

        detailData: {},
        loadingSuccess: false,
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

        listData:        [],
        currentPage:     1,
        currentPerPage:  5,
        total:           null,
      }
    },
    watch: {
      "questionForm.type" : {
        handler (oldV, newV) {
          if (this.loadingSuccess) {
            this.questionForm.answerList = [ //重置答案列表
              {
                content: "",
                exactness: false,
              },
            ]
          }
        },
        deep: true
      }
    },
    computed: {
      exactAnswer () {
        let exactSingle = null
        let exactMulti  = []
        if (this.detailData.type == 1) {
          this.detailData.answerList.forEach((item, index) => {
            console.log(item.exactness)
            if (item.exactness) {

              exactSingle = this.returnLetter(index)
            }
          })
        }
        if(this.detailData.type == 2) {
          this.detailData.answerList.forEach((item, index) => {
            console.log(item.exactness)
            if (item.exactness) {
              exactMulti.push(this.returnLetter(index))
            }
          })
        }
        
        if (exactSingle) {
          return exactSingle
        } else {
          return exactMulti.join(", ");
        } 
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      /**
       * 根据序号返回对应的字母 超过26则返回对应(index+1)
       * @param  {number} index 序号下标值 从0开始
       * @return {[type]}       [description]
       */
      returnLetter (index) {
        if(index >= 0 || index <= 25) {
          return String.fromCharCode(index + 65);
        } else {
          return index + 1
        }
      },
      /**
       * 获取题目详情
       * @return {[type]} [description]
       */
      getDetail () {
        let self = this;

        let config = {
          url: `${basePath}/questions/questions/details`,
          method: "get"
        }

        self.$request.requestAxios(config.method, config.url, {params: {id: self.$route.params.id}}, 
          (response) => {
            self.detailData = response.data.data
            self.handleFormAfterGeted(JSON.parse(JSON.stringify(self.detailData)))
            self.getListData(response.data.data.knowledgeId, `/questions/questions/choice/list`, "listData") //查询相关题目
          },
          (error) => {
            self.$message.error(response.data.meta.message || "失败")
          }
        )
      },
      /**
       * 获取相关题型-列表数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getListData (id, url, target) {
        var self = this
        self.cardsLoading = true
        self.formDialogVisible = false;

        let params = {
          knowledgeId: id,
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
          content:   "", //题干
          picture:   null,
          score:     0,
          type:      1,
          isCorrect: 0, //单选 正确答案 提交时遍历处理answerList每一项 并删除此key
          checkList: [] //多选 正确答案 处理方法同上
        }
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this

        self[formName].knowledgeId = self.detailData.knowledgeId
        
        let result = self.handleForm(self[formName])

        if(result) {
          
          let config = {
            url:    `${basePath}/questions/questions/update/${self.$route.params.id}/from_org/${self.orgCode}`,
            method: "patch",
            data:   result
          }
          self.$refs[formName].validate((valid) => {
            if (valid) {
              self.formLoading = true
              self.$request.requestAxios(config.method, config.url, config.data, 
                (response) => {
                  self.$message.success(response.data.meta.message)
                  //重新查询
                  self.getDetail()
                  self.formLoading = false
                  self.formDialogVisible = false
                },
                (error) => {
                  self.$message.error(error.data.meta.message || "失败")
                  self.formLoading = false
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
      },
      /**
       * 在获取数据后, 遍历answerList, 将对应的单选多选写入到isCorrect 和 checkList
       * @return {[type]} [description]
       */
      handleFormAfterGeted (data) {

        data.isCorrect = null
        data.checkList = []

        if(data.type == 1) {
          data.answerList.forEach((item, index) => {
            if(item.exactness) {
              data.isCorrect = index
            }
          })
        }
        if(data.type == 2) {
          data.answerList.forEach((item, index) => {
            if(item.exactness) {
              data.checkList.push(index)
            }
          })
        }

        this.questionForm = data
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
      uploadError  (response, file, fileList) {
        this.$message.error(response)
      },
      clickOtherDetail (item) {
        this.$router.push({name: this.$route.name, params: {id: item.id}})
        this.getDetail()
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
    },
  };
</script>

<style scoped>
  .answer-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .answer-wrap .margin-radio {
    margin: 0 10px;
  }
  .relative-question {
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
  .relative-question {
    max-height: clac( 100vh - 205px);
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
    max-height: 300px;
  }
</style>