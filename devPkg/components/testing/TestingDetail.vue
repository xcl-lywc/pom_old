/*********************图片考试 - 考试详情详情***********************/
  Author: Mingzhang.Zhao
  Date:   2018-08-09
/************************************************/
<template>
  <div class="content-area">
    <a href="#" class="back-button" @click="$router.push({name: 'Testing_List'})">返回</a>
    <el-form style="background: #fff" label-width="80px">
      <el-form-item label="考试主题: ">
        {{ detailData.theme }}
      </el-form-item>
      <el-form-item label="考试要求: ">
        {{ detailData.requirement }}
      </el-form-item>
      <el-form-item label="时间: ">
        {{$util._convertDate(detailData.beginTime, 'yyyy年MM月dd日 hh时：mm分')}} ~ {{$util._convertDate(detailData.endTime, 'yyyy年MM月dd日 hh时：mm分')}}
      </el-form-item>
      <el-form-item label="试卷名称: ">
        <el-button v-if="detailData.testPaper.type == 1" type="text" @click="$router.push({name: 'Auto_Paper_Detail', params: {id: detailData.testPaper.id }})">{{ detailData.testPaper.theme }}</el-button>
        <el-button v-if="detailData.testPaper.type == 2" type="text" @click="$router.push({name: 'Manual_Paper_Detail', params: {id: detailData.testPaper.id }})">{{ detailData.testPaper.theme }}</el-button>
      </el-form-item>
      <el-form-item label="参与情况: ">
        <el-button size="small" :type="activeType == 3 ? 'primary' : 'default'" @click="activeType = 3">已考</el-button>
        <el-button size="small" :type="activeType == 1 ? 'primary' : 'default'" @click="activeType = 1">未考</el-button>
        <el-table
          stripe
          :data="personData"
          style="width: 100%">
          <el-table-column
            prop="userName"
            label="姓名"
            width="120px">
          </el-table-column>
          <el-table-column
            prop="score"
            label="得分">
          </el-table-column>
          <el-table-column
            v-if="activeType == 3"
            label="操作"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="$router.push({name: 'Check_Answer', params: {id: scope.row.id}})">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="currentPerPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-form-item>

      <!-- <el-form-item
        label="知识点">
        <div class="tag-wrap" v-if="examForm.knowledgeArray.length > 0">
          <el-tag closable @close="handleClose(item)" v-for="(item, index) in examForm.knowledgeArray" :key="`${index}知识点`">{{ item.name }}</el-tag>
        </div>
        <div class="tag-wrap" v-else>点击左侧添加知识点</div>
      </el-form-item> -->
      <div v-if="detailData.tptList && detailData.tptList.length > 0">
        题型分布:
        <div v-for="item in detailData.tptList" :key="`${item.id}`">
          <p v-if="item.type == 1">{{ item.score }}分(单选题): {{ item.number }} 道</p>
          <p v-if="item.type == 2">{{ item.score }}分(多选题): {{ item.number }} 道</p>
          <p v-if="item.type == 3">{{ item.score }}分(简答题): {{ item.number }} 道</p>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        treeLoading: false,
        
        orgId:     JSON.parse(sessionStorage.getItem("orgId")),
        orgCode:   sessionStorage.getItem("orgCode"),

        defaultProps: {
          children: 'childrens',   //树的配置
          label: 'name'
        },

        detailLoading:  false,
        detailData: {
          testPaper: {}
        },

        activeType:      3,
        personData:      [],
        currentPage:     1,
        currentPerPage:  5,
        total:           0,
      }
    },
    watch: {
      activeType: {
        handler (newV, oldV) {
          this.getPeopleListData(newV, this.$route.params.id)
        },
        deep: true,
      }
    },
    mounted () {
      this.getDetailData()
    },
    methods: {
      /**
       * 获取列表数据
       * @return none
       */
      getDetailData () {
        var self = this

        self.detailLoading = true
 
        let config = {
          id: self.$route.params.id
        }

        self.$request.requestAxios('get', `${basePath}/exames/exames/details`, {params: config}, 
          (response) => {
            self.detailData = response.data.data;

            self.getPeopleListData(this.activeType, self.$route.params.id)
            self.detailLoading = false
          },
          (error) => {
            self.$message.error(error)
            self.detailLoading = false
          }
        )
      },
      /**
       * 获取答题人员信息
       * @param  {number} type 1未答题 2已答题
       * @return {[type]}      [description]
       */
      getPeopleListData (type, id) {
        var self = this

        let search = {
          examId:   id,
          pageSize: self.currentPerPage,
          pageNum:  self.currentPage,
          status:   type
        }

        self.$request.requestAxios('get', `${basePath}/examinees/examinees/list`, {params: search}, 
          (response) => {
            self.personData = response.data.data.rows;
            self.total      = response.data.data.total || 0;
          },
          (error) => {
            self.$message.error(error)
          }
        )
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getPeopleListData(this.activeType, this.$route.params.id)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getPeopleListData(this.activeType, this.$route.params.id)
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
</style>