/*********************图片考试 - 试题篮***********************/
  根据在题库中添加的sessionStorage数据 查询试题列表 查询后筛选显示并组装分页 需要记录选中
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div>
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
        prop="userIds"
        label="参考人员">
        <tree-selected 
          selectionType="checked"
          pageType="org"
          @treeCheckedData="peopleTreeChanged">
        </tree-selected>
      </el-form-item>
    </el-form>
    <div v-if="basketIds && basketIds.length > 0">
      <div class="question-type-item">
        <h4 class="question-type-title">单选题</h4>
        <div v-loading="cardsLoading" class="cards-wrap">
          <el-card v-for="(item, index) in singlePageData" :key="`${index}单选`" class="card-item">
            <el-row :gutter="10">
              <el-col :span="18">
                <el-checkbox v-model="item.choosed" label=" " @change="clickQuestion(item)"></el-checkbox>{{ item.content }}
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
                  <el-button type="danger" size="small" @click="removeQuestion(item)">移除本题</el-button>
                </span>
              </el-col>
            </el-row>
          </el-card>
          <p class="no-data-text" v-if="singlePageData && singlePageData.length <= 0"> 暂无数据 </p>
        </div>
        <el-pagination
          @size-change="handleSingleSizeChange"
          @current-change="handleSingleCurrentChange"
          :current-page="currentSinglePage"
          :page-sizes="[5, 10, 20]"
          :page-size="currentSinglePerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSingle">
        </el-pagination>
      </div>
      <div class="question-type-item">
        <h4 class="question-type-title">多选题</h4>
        <div v-loading="cardsLoading" class="cards-wrap">
          <el-card v-for="(item, index) in multiPageData" :key="`${index}单选`" class="card-item">
            <el-row :gutter="10">
              <el-col :span="18">
                <el-checkbox v-model="item.choosed" label=" " @change="clickQuestion(item)"></el-checkbox>{{ item.content }}
                <ul v-if="item.type != 3">
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
                  <el-button type="danger" size="small" @click="removeQuestion(item)">移除本题</el-button>
                </span>
              </el-col>
            </el-row>
          </el-card>
          <p class="no-data-text" v-if="multiPageData && multiPageData.length <= 0"> 暂无数据 </p>
        </div>
        <el-pagination
          @size-change="handleMultiSizeChange"
          @current-change="handleMultiCurrentChange"
          :current-page="currentMultiPage"
          :page-sizes="[5, 10, 20]"
          :page-size="currentMultiPerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalMulti">
        </el-pagination>
      </div>
      <div class="question-type-item">
        <h4 class="question-type-title">简答题</h4>
        <div v-loading="cardsLoading" class="cards-wrap">
          <el-card v-for="(item, index) in answerPageData" :key="`${index}单选`" class="card-item">
            <el-row :gutter="10">
              <el-col :span="18">
                <el-checkbox v-model="item.choosed" label=" " @change="clickQuestion(item)"></el-checkbox>{{ item.content }}
                <div> </div>
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
                  <el-button type="danger" size="small" @click="removeQuestion(item)">移除本题</el-button>
                </span>
              </el-col>
            </el-row>
          </el-card>
          <p class="no-data-text" v-if="answerPageData && answerPageData.length <= 0"> 暂无数据 </p>
        </div>
        <el-pagination
          @size-change="handleAnswerSizeChange"
          @current-change="handleAnswerCurrentChange"
          :current-page="currentAnswerPage"
          :page-sizes="[1, 2, 3]"
          :page-size="currentAnswerPerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalAnswer">
        </el-pagination>
      </div>
    </div>
    <div v-else class="no-data-text"> 试题篮中没有题目 </div>
     <div>
      合计:
      <p>单选题: {{ singleChoosedData.length }} 道</p>
      <p>多选题: {{ multiChoosedData.length }} 道</p>
      <p>简答题: {{ answerChoosedData.length }} 道</p>
    </div>
    <el-button class="fill-width" :disabled="loading" type="primary" @click="submitForm('examForm')">确 定</el-button>
  </div>
</template>

<script>
  import Query_Tree_Selected from '../common/tree_select/Query_Tree_Selected.vue'
  export default {
    data () {
      return {

        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),

        formLoading: false,

        cardsLoading: false,

        examForm: {
          theme:          null,
          requirement:    null,
          type:           2,
          testTime:       60,
          userIds:        [],
        },
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

        basketIds:       JSON.parse(sessionStorage.getItem("basket")),
        listData:        [],

        singlePageData: [], // 单选题分页后的数据
        multiPageData:  [], // 多选题分页后的数据
        answerPageData: [], // 简答题分页后的数据

        singleListData: [], // 单选题总体的数据
        multiListData:  [], // 多选题总体的数据
        answerListData: [], // 简答题总体的数据

        singleChoosedData: [], // 单选题当前已选中的数据
        multiChoosedData:  [], // 多选题当前已选中的数据
        answerChoosedData: [], // 简答题当前已选中的数据

        currentSinglePage:     1,
        currentSinglePerPage:  5,
        totalSingle:           0, // 单选题的分页

        currentMultiPage:      1,
        currentMultiPerPage:   5,
        totalMulti:            0, // 多选题的分页

        currentAnswerPage:     1,
        currentAnswerPerPage:  1,
        totalAnswer:           0, // 简答题的分页

      }
    },
    components:{
      "tree-selected": Query_Tree_Selected ,//人员下拉树
    },
    mounted () {
      if(this.basketIds && this.basketIds.length > 0) {
        this.getListData("listData")
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
          return String.fromCharCode(index + 65);
        } else {
          return index + 1
        }
      },
      /**
       * 获取列表数据, 根据type进行分组, 分页也不重复查询 在本地进行分页
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getListData (target) {
        var self = this

        self.cardsLoading = true

        let config = {
          ids: self.basketIds.toString()
        }

        self.$request.requestAxios('get', `${basePath}/questions/questions/map/list`, { params: config }, 
          (response) => {
            // 根据已有的数据加载
            if(response.data.data[1]) {
              self.singleListData =  response.data.data[1]
              self.addChoosedKey("singleListData")
              self.totalSingle = response.data.data[1].length
              self.getPageData("singlePageData", self.currentSinglePage, self.currentSinglePerPage, self.totalSingle, self.singleListData)
            }
            if(response.data.data[2]) {
              self.multiListData = response.data.data[2]
              self.addChoosedKey("multiListData")
              self.totalMulti = response.data.data[2].length
              self.getPageData("multiPageData", self.currentMultiPage, self.currentMultiPerPage, self.totalMulti, self.multiListData)
            }
            if(response.data.data[3]) {
              self.answerListData = response.data.data[3]
              self.addChoosedKey("answerListData")
              self.totalAnswer = response.data.data[3].length
              self.getPageData("answerPageData", self.currentAnswerPage, self.currentAnswerPerPage, self.totalAnswer, self.answerListData)
            }
            self.cardsLoading = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.cardsLoading = false
          }
        )

      },
      /** 
       *  给数据添加一个choosed 字段 用于标记是否选中
       */
      addChoosedKey (data) {
        let dataObj = this[data]

        if(dataObj && dataObj.length > 0) {
          dataObj.forEach((item, index) => {
            this.$set(item, "choosed", false)
          })
        }
      },
      /**
       * 将获取的数据分页查询, 模拟后台查询式分页
       * @param  {[type]} target      [description]
       * @param  {[type]} page        [description]
       * @param  {[type]} perPage     [description]
       * @param  {[type]} total       [description]
       * @param  {[type]} totalTarget [description]
       * @return {[type]}             [description]
       */
      getPageData (target, page, perPage, total, totalTarget) {
        let self = this;
        
        let startIndex = (page - 1) * perPage
        let endIndex   = page * perPage // 超过也只会取到最后一个

        self[target] = totalTarget.slice(startIndex, endIndex)
      },
      /**
       * 点击选中试题, 添加
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      clickQuestion (data) {
        switch(data.type) {
          case 1:
            this.addOrDelete("singleChoosedData", data)
            break;
          case 2:
            this.addOrDelete("multiChoosedData", data)
            break;
          case 3:
            this.addOrDelete("answerChoosedData", data)
            break;
        }
      },
      /**
       * 根据选中情况进行删除和添加 添加时需要验证重复
       */
      addOrDelete (targetName, data) {
        if (data.choosed) {
          let flag = this
          this[targetName].forEach((item, index) => {
            if(data.id == item) {
              flag = false
            }
          })
          if (flag) {
            this[targetName].push(data.id);
          }
        } else {
          let index = this[targetName].indexOf(data.id)
          this[targetName].splice(index, 1)
        }
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
                  sessionStorage.removeItem("basket") // 清空试题篮
                  self.$router.push({name: "Exam_Paper_List"})
                  self.formLoading = false
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
        //将已选中的题目进行保存
        form.questionIds = this.singleChoosedData.concat(this.multiChoosedData).concat(this.answerChoosedData)
        //form.questionIds = this.basketIds
        return form
      },
      /**
       * 移除本题, 并重新查询
       * @param  {[type]} BasketItem [description]
       * @return {[type]}      [description]
       */
      removeQuestion (basketItem) {

        this.$confirm("移除本题后列表会重新查询, 请勿在勾选添加试题时移除!", "确认移除?",{
          confirmButtonText: "确认移除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //先将三种对应的已选中数据进行移除
          switch (basketItem.type) {
            case 1:
              this.singleChoosedData.forEach((item, index) => {
                if(basketItem.id == item) {
                  this.singleChoosedData.splice(index, 1)
                }
              })
              break;
            case 2:
              this.multiChoosedData.forEach((item, index) => {
                if(basketItem.id == item) {
                  this.multiChoosedData.splice(index, 1)
                }
              })
              break;
            case 3:
              this.answerChoosedData.forEach((item, index) => {
                if(basketItem.id == item) {
                  this.answerChoosedData.splice(index, 1)
                }
              })
              break;
          }
          // 再移除session的id列表
          this.basketIds.forEach((item, index) => {
            if(basketItem.id == item) {
              this.basketIds.splice(index, 1)
            }
          })
          sessionStorage.setItem("basket", JSON.stringify(this.basketIds))
          this.getListData("listData")
        }).catch(() => {})
        
      },
      handleSingleSizeChange(val) {
        this.currentSinglePerPage = val
        this.getPageData("singlePageData", this.currentSinglePage, this.currentSinglePerPage, this.totalSingle, this.singleListData)
      },
      handleSingleCurrentChange(val) {
        this.currentSinglePage = val
        this.getPageData("singlePageData", this.currentSinglePage, this.currentSinglePerPage, this.totalSingle, this.singleListData)
      },
      handleMultiSizeChange(val) {
        this.currentMultiPerPage = val
        this.getPageData("multiPageData", this.currentMultiPage, this.currentMultiPerPage, this.totalMulti, this.multiListData)
      },
      handleMultiCurrentChange(val) {
        this.currentMultiPage = val
        this.getPageData("multiPageData", this.currentMultiPage, this.currentMultiPerPage, this.totalMulti, this.multiListData)
      },
      handleAnswerSizeChange(val) {
        this.currentAnswerPerPage = val
        this.getPageData("answerPageData", this.currentAnswerPage, this.currentAnswerPerPage, this.totalAnswer, this.answerListData)
      },
      handleAnswerCurrentChange(val) {
        this.currentAnswerPage = val
        this.getPageData("answerPageData", this.currentAnswerPage, this.currentAnswerPerPage, this.totalAnswer, this.answerListData)
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
  .question-type-item {
    margin: 10px 0;
  }
  .question-type-title {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    color: #333333;
  }
  .card-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .card-item:hover {
    box-shadow: 0 5px 15px #ccc;
    border: 1px solid #eee;
  }
  .title-wrap,
  .deadline,
  .bottom-wrap {
    margin: 8px 0;
  }
  .title-wrap,
  .bottom-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .no-data-text {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #bbb;
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
</style>