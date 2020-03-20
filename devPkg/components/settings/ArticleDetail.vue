/*********************文章删除*************************/
  Author: Mingzhang.Zhao
  Date:   2018-05-09
/****************************************************/
<template>
  <div v-loading="loading">
    <div class="detail-wrap">
    <el-button type="primary" @click="back" size="small" class="fr">返回</el-button>
    <el-button type="danger" @click="deleteArticle" size="small" class="fr">删除</el-button>
    <h3>{{ detailData.articleName }}</h3>
    <div class="article-wrap">
      <p>字号: {{detailData.wordNum}}</p>
      <br>
      <p v-html="detailData.articleContent" style="border: 1px solid #ececec; min-height: 600px;padding: 15px;"></p>
      <br>
      <p>附件: 
        <ul v-if="detailData.privateFiles">
          <li v-for="(item,index) in detailData.privateFiles" :key="`${index}附件`"><el-button type="text" @click="$util.downloadFile(item.id)">{{item.name}}</el-button></li>
        </ul>
      </p>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailData: {},
        orgCode:  sessionStorage.getItem("orgCode"),
      }
    },
    mounted: function () {
      this.getDetailData()
    },
    methods: {
      /**
       * 获取表格数据
       * @param  {需要查询的页码} page 默认不需要传,查询特定页则传入对应的页数
       * @return {[type]}      [description]
       */
      getDetailData () {
        let self = this;
        self.loading = true
        let config = {
          method: "get",
          url: `${basePath}/a_info/${this.$route.params.id}/detail/from_org/${self.orgCode}`,
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            self.loading = false
            self.detailData = response.data.data
            self.detailData.privateFiles = JSON.parse(response.data.data.privateFiles)
          },
          (error) => {
            self.loading = false
            self.$message.error(error)
          }
        )
      },
      /**
       * 删除文章
       * @param  {object} item table Item(通过scope返回)
       * @return none       
       * */
      deleteArticle () {
        let self = this
        let config = {
          method: "delete",
          url: `${basePath}/a_info/delete/${self.$route.params.id}/from_org/${self.orgCode}`,
        }

        self.$confirm("确定要删除吗?", "删除", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // 点击确定
          self.$request.requestAxios(config.method, config.url, config.data,
            (response) => {
              self.$message.success("成功")
              self.$router.push({name: 'Settings_Article_Delete'})
            },
            (error) => {
              self.$message.error(error)
            }
          )
        }).catch(() => {})
      },
      back () {
        this.$router.push({name: this.$route.params.routername})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail-wrap{
    margin: 15px;
    padding: 15px;
    background: #fff;
  }
  .detail-wrap h3{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .article-wrap {
    overflow-y: auto;
    max-height: calc(100vh - 200px);
  }
</style>