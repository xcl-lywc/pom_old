/*********************图片考试 - 智能组题***********************/
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
          v-loading="treeLoading"
          node-key="id"
          :props="defaultProps"
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }" @click="clickNode(data)">
            <i v-if="tempId == data.id" class="el-icon-circle-check" aria-hidden="true"></i>
            {{ node.label }}
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-form :model="examForm" ref="examForm" :rules="rules" label-width="80px" size="small" v-loading="formLoading">
          <el-form-item
            prop="theme"
            label="考试主题">
            <el-input type="text" v-model="examForm.theme"></el-input>
          </el-form-item>
          <el-form-item
            prop="requirement"
            label="考试要求">
            <el-input type="textarea" v-model="examForm.requirement"></el-input>
          </el-form-item>
          <el-form-item
            prop="type"
            label="知识点">
            <div class="tag-wrap" v-if="examForm.knowledgeArray.length > 0">
              <el-tag closable @close="handleClose(item)" v-for="(item, index) in examForm.knowledgeArray" :key="`${index}知识点`">{{ item.name }}</el-tag>
            </div>
            <div class="tag-wrap" v-else>点击左侧添加知识点</div>
          </el-form-item>
          <el-form-item
            prop="userIds"
            label="参考人员">
            <tree-selected 
              selectionType="checked"
              pageType="org"
              @treeCheckedData="peopleTreeChanged">
            </tree-selected>
          </el-form-item>
          <div v-loading="questionLoading" v-if="examForm.knowledgeArray.length > 0">
            <el-form-item v-if="item.type == 1 || item.type == 2" :label="item.type == 1 ? '单选题' : (item.type == 2 ? '多选题' : '简答题')" v-for="(item, index) in examForm.relativeQuestionData" :key="`${index}题目`">
              <!-- 此处是读取relativeQuestionData以外的数据, 数据是由watch计算得出 -->
              <p>共计 {{ examForm.total[index] || 0 }} 道题目</p>
              <div class="question-number-item" v-for="(itemInner, indexInner) in item.list" :key="`${index}题目数`">
                <span>{{ itemInner.score }}分</span>
                <el-input-number v-model="itemInner.currentNum" :min="0" :max="itemInner.number" @keydown.native="afterInput">
                </el-input-number>
                <span>{{ itemInner.number }}道可用</span>
              </div>
            </el-form-item>
          </div>
          <div>
            
          </div>
          <el-button class="fill-width" :disabled="loading || examForm.knowledgeArray.length <= 0" type="primary" @click="submitForm('examForm')">确 定</el-button>
        </el-form>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
  import Query_Tree_Selected from '../common/tree_select/Query_Tree_Selected.vue'
  export default {
    data () {
      return {
        treeLoading: false,
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),

        treeData: [],   //党组织的树形结构
        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },

        questionLoading:  false,
        formLoading: false,
        examForm: {
          theme:          null,
          requirement:    null,
          knowledgeArray: [],
          relativeQuestionData: [],
          userIds:        [],
        },
        idsArray: [], //单独存放ids的数组, 用于查询提醒分布的数据
        //验证
        rules: {
          theme: [
            { required: true, message: '请输入考试主题', trigger: 'blur' }
          ],
          requirement: [
            { required: true, message: '请输入考试要求', trigger: 'blur' }
          ],
          userIds: [
            { required: true, message: '请选择考试人员', trigger: 'change' }
          ],
        },
        disabled: false
      }
    },
    components:{
      "tree-selected": Query_Tree_Selected ,//人员下拉树
    },
    watch: {
      "examForm.relativeQuestionData": { // 每次查询提醒分布 或 修改题型数量 动态计算总数total
        handler (newV, odlV) {
          let count = {}
          newV.forEach((item, index) => {
            count[`${index}`] = null
            item.list.forEach((itemInner, indexInner) => {
              
              if(itemInner.currentNum) {
                count[`${index}`] += parseInt(itemInner.currentNum)
              }
              
            })
          })
          this.examForm.total = count
        },
        deep: true,
      }
    },
    mounted () {
      window.ce = this
      this.getTreeData(`/knowledges/knowledges/all_tree`, "treeData")
    },
    methods: {
      afterInput (event) {
        if(event.key == "+" || event.key == "-" || event.key == "Shift" || event.key == ".") {
          this.$message.warning("请输入大于1的正整数")
          this.disabled = true;
        }
      },
      /**
       * 获取树形数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getTreeData (url, target) {
        var self = this
        self.treeLoading = true
        self.formDialogVisible = false;

        self.$request.requestAxios('get', `${basePath}${url}`, null, 
          (response) => {
            self[target] = response.data.data;
            this.getListData(`/questions/questions/choice/list`, "listData")
            self.treeLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.treeLoading = false
          }
        )
      },
      /**
       * 点击节点, 添加至右侧知识点列表, 并重新查询体型分布
       * @param  {object} data 当前树节点的数据
       * @return {[type]}      [description]
       */
      clickNode(data) {
        let id = data.id

        let flag = true

        this.idsArray.forEach((item, index) => {
          if(data.id == item) {
            flag = false
          }
        })

        if(flag) {
          this.examForm.knowledgeArray.push(data)
          this.idsArray.push(data.id)
          this.getRelativeQuestion(this.idsArray)
        } else {
          this.$message.error("已添加该知识点")
        }
      },
      /**
       * 删除知识点
       * @param  {[type]} tag [description]
       * @return {[type]}     [description]
       */
      handleClose (tag) {
        this.examForm.knowledgeArray.splice(this.examForm.knowledgeArray.indexOf(tag), 1);
        this.idsArray.splice(this.idsArray.indexOf(tag.id), 1);
        if(this.idsArray.length > 0) {
          this.getRelativeQuestion(this.idsArray)
        }
       
      },
      /**
       * 根据知识点数组查询相关题型分布
       * @param  {Array} array   知识点数组(仅包含id)
       * @return {[type]}       [description]
       */
      getRelativeQuestion (array) {
        var self = this

        self.questionLoading = true
        let arrayHandled = []

        self.$request.requestAxios('get', `${basePath}/questions/questions/type/list`, {params: {ids: array.join(",")}}, 
          (response) => {
            self.examForm.relativeQuestionData = response.data.data;
            //self.examForm.tptList = JSON.parse(JSON.stringify(response.data.data))
            self.questionLoading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.questionLoading = false
          }
        )
      },
      /**
       * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
       * @param  {string} formName [description]
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        let self = this
        
        let result = self.handleForm(self[formName])

        let config = {
          url:    `${basePath}/test_papers/test_papers/add/from_org/${self.orgCode}`,
          method: "post",
          data:   result
        }

        self.$refs[formName].validate((valid) => {
          if (valid) {
              self.formLoading = true
              self.$request.requestAxios(config.method, config.url, config.data, 
                (response) => {
                  self.$message.success(response.data.meta.message)
                  self.$router.push({name: "Exam_Paper_List"})
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
      },
      /**
       * 处理form 返回一个需要保存至后台的form对象
       * @return {[type]} [description]
       */
      handleForm (formData) {
        let form = JSON.parse(JSON.stringify(formData))

        let list = []

        form.relativeQuestionData.forEach((item, index) => {
          item.list.forEach((itemInner, indexInner) => {
            console.log(itemInner)
            if(itemInner.currentNum && parseInt(itemInner.currentNum) != NaN) {
              list.push({
                number: parseInt(itemInner.currentNum),
                score: itemInner.score,
                type: item.type
              })
            }
          })
        })
        form.tptList = list

        form.knowledges = this.idsArray.join(",")
        form.type = 1
        form.testTime = 60

        delete form.relativeQuestionData
        delete form.knowledgeArray
        delete form.total

        return form
      },
      peopleTreeChanged (data) {
        let self = this
        self.examForm.userIds = data.map((item) => { return item.id })
        self.$refs.examForm.validateField("userIds")
      }
    }
  }
</script>

<style scoped>
  .tag-wrap .el-tag {
    margin: 0 10px 10px 0;
  }
  .tag-wrap .el-tag:last-child {
    margin: 0 0 10px 0;
  }
  .question-number-item {
    margin: 10px 0;
  }
  .custom-tree-node {
    display: inline-block;
    width: 100%;
  }
  .text-blue {
    color: #409EFF;
  }
</style>