/*********************图片考试 - 查看答卷***********************/
  Author: Mingzhang.Zhao
  Date:   2018-08-09
/************************************************/
<template>
  <div class="content-area">
    <!-- <div v-if="$router.path && $route.path.indexOf('my_test') != -1">
      <span>1</span>
      <a href="#" v-if="detailData && detailData.examId" class="back-button" @click="$router.push({name: 'My_Testing_Detail', params: {id: detailData.examId}})">返回考试详情</a>
      <a href="#" v-else class="back-button" @click="$router.push({name: 'My_Testing_List'})">返回考试列表</a>
    </div>

    <div v-else>
    <span>2</span>
      <a href="#" v-if="detailData && detailData.examId" class="back-button" @click="$router.push({name: 'Testing_Detail', params: {id: detailData.examId}})">返回考试详情</a> -->
      <a href="#" class="back-button" @click="back">返回</a>
    <!-- </div> -->
    <div v-if="detailData">
      <div class="top-area">
        <el-button type="default" :disabled="currentIndex == 0" @click="changeQuestion('forward')">上一题</el-button>
        <!-- <span> 剩余时间: {{ restTime > 0 ? $util._convertDate(restTime, 'mm分: ss秒') : '已结束' }} </span> -->
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
                {{ returnLetter(index) }}、{{ item.content }}
              </li>
            </ul>
            <p v-else v-model="currentInput"></p>
          </el-col>
          <el-col :span="6" class="img-wrap">
            <div v-if="!detailData.picture" class="no-img-div">暂无图片</div>
            <img v-else :src="currentQuestion.picture" alt="" style="height: 100px; width:100px;">
          </el-col>
          <el-col v-if="currentQuestion.type == 1" :span="24">
            <p v-if="currentQuestion.examinContent">答题结果: {{ currentRadio }} </p>
            <p v-else>尚未作答</p>
          </el-col>
          <el-col v-if="currentQuestion.type == 2" :span="24">
            <p v-if="currentQuestion.examinContent">答题结果: {{ currentCheckBox.join(", ") }} </p>
            <p v-else>尚未作答</p>
          </el-col>
          <el-col v-if="currentQuestion.type == 3" :span="24">
            <p v-if="currentQuestion.examinContent">答题结果: {{currentQuestion.examinContent}}</p>
            <p v-else>尚未作答</p>
          </el-col>
        </el-row>
        <!-- <el-button :disabled="currentQuestion.examinContent" type="primary" size="small" @click="submitAnswer" style="margin: 10px 0;">提交答题</el-button> -->
      </div>
      <!-- <el-button type="primary" @click="finishTest">结束考试</el-button> -->
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),
        restTime:  60*60*1000,  //默认剩余考试时间
        timeClock: null,

        detailData: null,
        paperData:       [1,2,3],
        currentIndex:    0,    // 当前操作的题目index
        currentQuestion: {
          examinContent: null
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
        },
        deep: true,
      }
    },
    mounted () {
      window.st = this
      
      //this.$set(this, "currentQuestion", this.detailData.eqList[0])
      //设置当前的剩余时间
      //this.restTime = this.detailData.overplusTime
      //this.timeClock = setInterval(this.time, 1000)
      this.getDetailData(0)
    },
    methods: {
      time () {
        
        if(this.restTime > 0) {
          this.restTime -= 1000
        } else {
          clearInterval(this.timeClock)
          alert("考试结束! 即将退出本页")
          
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
          id: self.$route.params.id
        }

        self.$request.requestAxios('get', `${basePath}/examinees/examinees/details`, {params: config}, 
          (response) => {
            self.detailData      = response.data.data;
            this.$set(this, "currentQuestion", this.detailData.eqList[index])// 将index对应的题目写入currentQuestion
            self.detailLoading   = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            //self.$router.push({name: "Testing_List"})
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
          id: self.detailData.id
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
          content: null,
          examineeId: self.currentQuestion.id,
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

        self.$request.requestAxios('patch', `${basePath}/examinee_answers/examinee_answers/update/${self.detailData.id}/from_org/${self.orgCode}`, config, 
          (response) => {
            self.getDetailData(currentIndex)
            // self.detailData      = response.data.data;
            // self.currentQuestion = self.detailData // 将第一题写入
            // self.detailLoading   = false
          },
          (error) => {
            self.$message.error(error.data.meta.message)
            self.detailLoading = false
          }
        )

        // 
      },
      //根据不同的情况返回到不同的页面
      back() {
        if(this.detailData.examId) {
          if(this.$route.path.indexOf('my_test') != -1) {
            this.$router.push({name: "My_Testing_Detail", params: {id: this.detailData.examId}})
          } else {
            this.$router.push({name: "Testing_Detail", params: {id: this.detailData.examId}})
          }
        } else {
          if(this.$route.path.indexOf('my_test') != -1) {
            this.$router.push({name: "My_Testing_List"})
          } else {
            this.$router.push({name: "Testing_List"})
          }
        }
      }
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
</style>