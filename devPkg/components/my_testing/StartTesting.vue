/*********************图片考试 - 智能组题-详情***********************/
  Author: Mingzhang.Zhao
  Date:   2018-08-09
/************************************************/
<template>
  <div class="content-area">
  <div v-if="detailData.eqList.length > 0">
      <div class="top-area">
        <el-button type="default" :disabled="currentIndex == 0" @click="changeQuestion('forward')">上一题</el-button>
        <!-- <span> 剩余时间: {{ detailData.overplusTime > 0 ? $util._convertDate(detailData.overplusTime, 'mm分: ss秒') : '已结束' }} </span> -->
        <el-button type="default" :disabled="currentIndex+1 == detailData.eqList.length"@click="changeQuestion('next')">下一题</el-button>
      </div>
      <!-- 当前题目详情 -->
      <div class="detail-wrap">
        第{{ currentIndex + 1 }}题
        <el-row :gutter="10" v-if="currentQuestion">
          <el-col :span="18">
            <h4 class="question-title">{{ currentQuestion.content }}</h4>
            <ul v-if="currentQuestion.type != 3">
              <li v-for="(item, index) in currentQuestion.answerList" :key="item.id">
                
                <p v-if="currentQuestion.type == 1">
                  <el-radio :disabled="currentQuestion.examinContent" :label="item.id" v-model="currentRadio">{{ returnLetter(index) }}、{{ item.content }}</el-radio>
                </p>
                <p v-if="currentQuestion.type == 2">
                  <el-checkbox-group v-model="currentCheckBox">
                    <el-checkbox :disabled="currentQuestion.examinContent" :label="item.id">{{ returnLetter(index) }}、{{ item.content }}</el-checkbox>
                  </el-checkbox-group>
                </p>
              </li>
            </ul>
            <el-input v-else :disabled="currentQuestion.examinContent && currentQuestion.type == 3" v-model="currentInput" type="textarea"></el-input>
          </el-col>
          <el-col :span="6" class="img-wrap">
            <div v-if="!detailData.picture" class="no-img-div">暂无图片</div>
            <img v-else :src="currentQuestion.picture" alt="" style="height: 100px; width:100px;">
          </el-col>
          <el-col v-if="currentQuestion.type == 1" :span="24">
            <p v-if="currentQuestion.examinContent">您的答案: {{ currentAnswer }}</p>
            <!-- <p v-else> 你的选择: {{ currentRadio.indexOf(currentQuestion.answerList) }} </p> -->
          </el-col>
          <el-col v-if="currentQuestion.type == 2" :span="24">
            <p v-if="currentQuestion.examinContent">您的答案: {{ currentAnswer }}</p>
            <!-- <p v-else> 你的选择: {{ currentCheckBox.join(", ") }} </p> -->
          </el-col>
        </el-row>
        <!-- 查询获取当前是否答过本题, 每次提交答题都会重新请求, currentQuestion会被刷新, 若examinContent为空则禁用 并且在未输入的情况下也禁用 -->
        <el-button :disabled="currentQuestion.examinContent || (!currentInput && currentQuestion.type == 3)" type="primary" size="small" @click="submitAnswer" style="margin: 10px 0;">提交答题</el-button>
      </div>
      <div class="bottom-index">
        <div>
          单选题:
          <div>
            <el-button size="small" :type="item.index == currentIndex ? 'primary' : 'default'" v-for="(item, index) in detailData.questMapList[1]" :key="`${index} 单选目录`" @click="currentIndex = item.index">第{{ item.index + 1 }}题</el-button>
          </div>
        </div>
        <div>
          多选题:
          <div>
            <el-button size="small" :type="item.index == currentIndex ? 'primary' : 'default'" v-for="(item, index) in detailData.questMapList[2]" :key="`${index} 多选目录`" @click="currentIndex = item.index">第{{ item.index + 1 }}题</el-button>
          </div>
        </div>
        <div>
          简答题:
          <div>
            <el-button size="small" :type="item.index == currentIndex ? 'primary' : 'default'" v-for="(item, index) in detailData.questMapList[3]" :key="`${index} 简答目录`" @click="currentIndex = item.index">第{{ item.index + 1 }}题</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="qusetion-detail" v-if="detailData.testPaper.questionsList && detailData.testPaper.questionsList.length > 0">
        <div v-for="(item, index) in detailData.testPaper"></div>
         {{ detailData.testPaper.theme }}
      </div> -->

      <el-button type="primary" class="finish-test-button" @click="finishTest">结束考试</el-button>
      <el-button type="default" class="finish-test-button" @click="$router.push({name: 'My_Testing_List'})">返回</el-button>
    </div>
    <div v-else>
      <el-button type="primary" @click="$router.push({name: 'My_Testing_List'})">回到考试列表</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        orgId:     JSON.parse(sessionStorage.getItem("userData")).orgId,
        orgCode:   JSON.parse(sessionStorage.getItem("userData")).orgCode,
        timeClock: null,

        detailData: {
          "id": 15,
          "overplusTime": 60*60*1000, //默认剩余考试时间
          "questMapList": {
            "1": [],
            "2": [],
            "3": []
          },
          "eqList": []
        },
        currentIndex:    0,    // 当前操作的题目index
        currentQuestion: {
          examinContent: ""
        }, // 当前操作的题目
        currentRadio:    null,
        currentCheckBox: [],
        currentInput:    null,
      }
    },
    watch: {
      $route (to, from) {
        //debugger
        // if(from.name == "Start_Testing") {
        //   this.$message.info("nideianjile确认")
        //   // this.$confirm("确认离开?", "离开本页后计时不会停止!",{
        //   //   confirmButtonText: "确定",
        //   //   cancelButtonText: "留在本页",
        //   //   type: "warning"
        //   // }).then(() => {
        //   //   this.$message.info("nideianjile确认")
        //   // }).catch(() => {
        //   //   this.$message.info("nideianjile取消")
        //   // })
        // }
      },
      currentIndex: {
        handler (newV, oldV) {
          this.$set(this, "currentQuestion", this.detailData.eqList[newV])
          if(this.currentQuestion.type == 3) {
            this.currentInput = this.currentQuestion.examinContent
          }
        },
        deep: true,
      }
    },
    computed: {
      // 显示当前已答题目对应的答案(已答过题目)
      /**
       * [currentAnswer description]
       * @return {string} 直接展示的字符串
       */
      currentAnswer () {
        let self = this
        let result = null
        switch (self.currentQuestion.type) {
          case 1:
            self.currentQuestion.answerList.forEach((item, index) => {
              if(item.id == self.currentQuestion.examinContent) {
                result = self.returnLetter(index)
              }
            })
            break;
          case 2:
            let answerIdArray = this.currentQuestion.examinContent.split(",") // 答案Id数组
            let resultArray = []
            if(answerIdArray){
              self.currentQuestion.answerList.forEach((item, index) => { //循环题目列表
                answerIdArray.forEach((itemInner, indexInner) => { // 循环答案Id数组
                  if(item.id == itemInner) {
                    resultArray.push(self.returnLetter(index))
                  }
                })
              })
            }
            result = resultArray.join(",")
            break;
          // case 3:
          //   result = self.currentQuestion.examinContent
          //   break;
          default:
            break;
        }
        return result
      }
    },
    mounted () {
      window.st = this
      this.$set(this, "currentQuestion", this.detailData.eqList[0])
      //设置当前的剩余时间
      //this.timeClock = setInterval(this.time, 1000)
      this.getDetailData(0)
    },
    methods: {
      /**
       * 验证时间是否超时
       * @return {[type]} [description]
       */
      time () {
        if(this.detailData.overplusTime > 0) {
          this.detailData.overplusTime -= 1000
        } else {
          clearInterval(this.timeClock)
          alert("考试结束! 即将退出本页")
          this.$router.push({name: "My_Testing_List"})
        }
      },
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
       * 获取详情数据
       * @param  {number} index 需要展示的题目index
       * @return {[type]}       [description]
       */
      getDetailData (index) {
        var self = this

        self.detailLoading = true
 
        let config = {
          id:         self.$route.params.id,
          formData:   1,
          taskId:     1,
          instanceId: 1, 
        }

        self.$request.requestAxios('patch', `${basePath}/examinees/join/update/from_org/${self.orgCode}`, config, 
          (response) => {
            self.detailData      = response.data.data;
            this.$set(this, "currentQuestion", this.detailData.eqList[index])// 将index对应的题目写入currentQuestion
            self.detailLoading   = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.detailLoading = false
          }
        )
      },
      finishTest () {
        this.$confirm("确认结束答题吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "留在本页",
          type: "warning"
        }).then(() => {
          this.submitExam()          
        }).catch(() => {
          this.$message.info("请继续答题")
        })
      },
      /**
       * 提交考试结束
       * @return {[type]} [description]
       */
      submitExam() {
        let self = this
        
        let config = {
          id: self.detailData.id,
          formData:   1,
          taskId:     1,
          instanceId: 1,
        }
        
        self.$request.requestAxios('patch', `${basePath}/examinees/end/update/from_org/${self.orgCode}`, config, 
          (response) => {
            this.$router.push({name: "My_Testing_List"})
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.detailLoading = false
          }
        )

      },
      changeQuestion (type) {
        if(type == "forward") {
          this.currentIndex--
        } else {
          this.currentIndex++
        }
        this.currentRadio    = null
        this.currentCheckBox = []
      },
      /**
       * 点击提交本题
       * @return {[type]} [description]
       */
      submitAnswer () {
        let self = this

        let config = {
          content:    null,
          questionId: self.currentQuestion.id,
          examineeId: self.detailData.id,
        }

        switch(self.currentQuestion.type) {
          case 1:
            config.content = self.currentRadio
            break;
          case 2:
            config.content = self.currentCheckBox.join(",")
            break;
          case 3:
            config.content = self.currentInput
            break;
        }

        self.$request.requestAxios('patch', `${basePath}/examinee_answers/examinee_answers/update/${self.currentQuestion.examinAnsId}`, config, 
          (response) => {
            self.$message.success("已提交本题")
            self.getDetailData(self.currentIndex)
            // self.detailData      = response.data.data;
            //self.currentQuestion = self.detailData // 将第一题写入
            // self.detailLoading   = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.detailLoading = false
          }
        )

        // 
      },
    }
  }
</script>

<style scoped>
  .content-area {
    background: #fff;
  }
  .text-blue {
    color: #409EFF;
  }
  .detail-wrap {
    padding: 10px;
  }
  .top-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
  }
  .question-title {
    font-size: 16px;
    margin: 10px 0;
  }
  .finish-test-button {
    margin-top: 15px;
  }
</style>