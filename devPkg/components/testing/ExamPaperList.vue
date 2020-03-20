/*********************图片考试 - 试题列表***********************/
  Author: Mingzhang.Zhao
  Date:   2018-07-31
/************************************************/
<template>
  <div>
    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-form-item label="创建时间" prop="date" :rules="{required: true, message: '请选择日期', trigger: 'blur'}">
        <el-date-picker
          class="fill-width"
          type="daterange"
          v-model="searchForm.date"
          value-format="timestamp"
          :editable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input class="fill-width" v-model="searchForm.theme" clearable></el-input>
        <el-button type="primary" size="small" @click="getListData('listData')">搜索</el-button>
      </el-form-item>
    </el-form>

    <div v-loading="cardsLoading" class="cards-wrap">
      <el-card v-for="(item, index) in listData" :key="`${index}列表`" class="card-item">
        <p class="title-wrap">
          <span class="text-bold">{{ item.theme }}</span> <span>创建者: {{ item.creatorName }}</span>
          <span class="right-date-time">创建时间: {{$util._convertDate(item.createTime, 'yyyy年MM月dd日 hh时：mm分')}}</span>
        </p>
        <p class="bottom-wrap">
          <span><i class="fa fa-users"></i>&nbsp;{{ item.participantsNum }}</span>
          <span class="right-date-time">修改时间: {{$util._convertDate(item.updateTime, 'yyyy年MM月dd日 hh时：mm分')}}</span>
          <span><i class="fa fa-comments"></i>&nbsp;{{ item.commentNum }}</span>
          <span>
            <el-button v-if="item.type == 1" @click="$router.push({name: 'Auto_Paper_Detail', params: {id: item.id}})" type="primary" size="small">查看详情</el-button>
            <el-button v-if="item.type == 2" @click="$router.push({name: 'Manual_Paper_Detail', params: {id: item.id}})" type="primary" size="small">查看详情</el-button>
            <span class="type-icon">{{ item.type == 1 ? "智能组题" : "手动添加"}}</span>
          </span>
          
        </p>
        <!-- <el-row :gutter="10">
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
            <p>创建者: {{ item.creator }}</p>
            <p>分值: {{ item.score }}</p>
            <span>
              <el-button type="primary" size="small" @click="$router.push({name: 'Question_Detail', params: {id: item.id}})">查看解析</el-button>
              <el-button type="primary" size="small">试题蓝</el-button>
            </span>
          </el-col>
        </el-row> -->
      </el-card>
      <p class="no-data-text" v-if="listData && listData.length <= 0"> 暂无数据 </p>
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
</template>

<script>
  export default {
    data () {
      return {

        searchForm: {
          theme: null,
          date: [0, new Date().getTime()]
        },
        cardsLoading: false,

        listData: [],
        currentPage:     1,
        currentPerPage:  5,
        total:           0,

      }
    },
    mounted () {
      this.getListData("listData")
    },
    methods: {
      /**
       * 获取列表数据
       * @param  {string} target 需要保存的数据目标名称
       * @return none
       */
      getListData (target) {
        var self = this

        this.$refs.searchForm.validate((valid) => {
          if(valid) {
            self.cardsLoading = true

            let params = {
              beginTime: self.searchForm.date[0],
              endTime:   self.searchForm.date[1],
              theme:     self.searchForm.theme,
              pageSize:  self.currentPerPage,
              pageNum:   self.currentPage
            }

            self.$request.requestAxios('post', `${basePath}/test_papers/test_papers/choice/list`, params, 
              (response) => {
                self[target] = response.data.data.rows;
                self.total   = response.data.data.total || 0;
                self.cardsLoading = false
              },
              (error) => {
                self.$message.error(error.data.meta.message)
                self.cardsLoading = false
              }
            )
          }
            
        })
        
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getListData("listData")
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getListData("listData")
      },
    }
  }
</script>

<style scoped>
  .fill-width {
    width: 100%;
  }
  .card-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
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
  .card-item .type-icon {
    padding: 6.5px 15px;
    margin-right: 10px;
    color: #fff;
    background: #345173;
    border-radius: 5px;
  }
  .no-data-text {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #bbb;
  }
</style>