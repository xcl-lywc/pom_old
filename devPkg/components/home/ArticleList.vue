<template>
  <div class="el-main">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" style="font-weight: bold;">首页</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-button type="primary" size="small" @click="$router.push({path: '/home'})">回到首页</el-button>
    <div>
      <ul v-if="resultList && resultList.length > 0" class="article-list">
        <li v-for="item in resultList" :key="item.id" class="article-item">

        <router-link :to="{name: 'News_Detail', params: {id: item.id}}"><i class="el-icon-caret-right"></i>{{ item.articleName }}</router-link>
        <span>{{ $util._convertDate(item.createTime, "yyyy年MM月dd日") }}</span>
        </li>
      </ul>
      <div v-else class="no-data-text"> 暂无数据 </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50]"
        :page-size="perPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchLoading: false,

        userData: JSON.parse(sessionStorage.getItem('userData')),

        resultList:    [],
        // 分页
        page:          1,
        perPage:       10,
        total:         0,
      }
    },
    mounted () {
      this.searchArticle()
    },
    methods: {
      handleSizeChange(val) {
        this.perPage = val;
        this.searchArticle()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.searchArticle()
      },
      searchArticle () {
        if(this.$route.params.keywords) {
          this.searchLoading = true
          let search = {
            type:       sessionStorage.getItem("typeId") ? JSON.parse(sessionStorage.getItem("typeId")) : null,
            keyWords:   this.$route.params.keywords,
            partyOrgId: this.userData.partyOrgId,
            pageNum:    this.page || 1,
            pageSize:   this.perPage || 10,
          }
          this.$request.requestAxios("get", `${basePath}/a_info/article/list/from_org/${this.userData.partyOrgCode}`, {params: search}, (response) => {
            this.resultList = response.data.data.rows
            this.total      = response.data.data.total
            this.searchLoading = false
          },
          (error) => {
            this.searchLoading = false
            this.$message.error(error.data.meta.message)
          })
        }
      }
    }
  }
</script>
<style scoped>
  .no-data-text {
    height: 32px;
    text-align: center;
    color: #ccc;
  }
  .article-list {
    margin: 15px 0;
  }
  .article-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
</style>