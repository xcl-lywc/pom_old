/*********************图片考试 - 智能组题-详情***********************/
  Author: Mingzhang.Zhao
  Date:   2018-08-07
/************************************************/
<template>
  <div class="content-area">
    <a href="#" class="back-button" onclick="javascript: window.history.go(-1);return false;">返回</a>
    <el-form class="form-wrap">
      <el-form-item label="考试主题: ">
        {{ detailData.theme }}
      </el-form-item>
      <el-form-item label="考试要求: ">
        {{ detailData.requirement }}
      </el-form-item>
      <div v-if="detailData.tptList && detailData.tptList.length > 0">
        题型分布:
        <div v-for="item in detailData.tptList" :key="`${item.id}`">
          <p v-if="item.type == 1">{{ item.score }}分(单选题): {{ item.number }} 道</p>
          <p v-if="item.type == 2">{{ item.score }}分(多选题): {{ item.number }} 道</p>
          <!-- <p v-if="item.type == 3">{{ item.score }}分(简答题): {{ item.number }} 道</p> -->
        </div>
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
  .form-wrap {
    padding: 20px;
    background: #fff;
  }
  .custom-tree-node {
    display: inline-block;
    width: 100%;
  }
  .text-blue {
    color: #409EFF;
  }
</style>