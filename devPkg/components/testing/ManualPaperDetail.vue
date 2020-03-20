/*********************图片考试 - 手动组题-详情***********************/
  Author: Mingzhang.Zhao
  Date:   2018-08-07
/************************************************/
<template>
  <div>
    <a href="#" class="back-button" onclick="javascript: window.history.go(-1);return false;">返回</a>
    <el-form style="background: #fff;padding: 10px;">
      <el-form-item label="考试主题: ">
        {{ detailData.theme }}
      </el-form-item>
      <el-form-item label="考试要求: ">
        {{ detailData.requirement }}
      </el-form-item>
      <p>试题列表: </p>
      <div v-loading="cardsLoading" class="cards-wrap">
        <el-card v-for="(item, index) in detailData.questionsList" :key="`${index}题目列表`" class="card-item">
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
              <p>创建者: {{ item.creator }}</p>
              <p>分值: {{ item.score }}</p>
              <span>
                <el-button v-if="$route.name == 'My_Manual_Paper_Detail'" type="primary" size="small" @click="$router.push({name: 'My_Question_Detail', params: {id: item.id}})">查看解析</el-button>
                <el-button v-if="$route.name == 'Manual_Paper_Detail'" type="primary" size="small" @click="$router.push({name: 'Question_Detail', params: {id: item.id}})">查看解析</el-button>
              </span>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),


        detailLoading:  false,
        detailData: {},

      }
    },
    watch: {
    },
    mounted () {
      this.getDetailData()
    },
    methods: {
      /**
       * 获取树形数据
       * @param  {string} url    请求地址
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getDetailData () {
        var self = this

        self.detailLoading = true
 
        let config = {
          id: self.$route.params.id
        }

        self.$request.requestAxios('get', `${basePath}/test_papers/test_papers/details`, {params: config}, 
          (response) => {
            self.detailData = response.data.data;
            self.detailLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.detailLoading = false
          }
        )
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

  .cards-wrap {
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