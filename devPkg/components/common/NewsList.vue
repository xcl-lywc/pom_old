/*********************新闻列表组件***********************/
  Author: Mingzhang.Zhao
  Date:   2018-04-22
/************************************************/
<template>
  <ul class="main-block-list">
    <li class="list-item" v-for="newsItem in dataList">{{ newsItem.articleName }}</li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      dataList: [],
      orgCode: sessionStorage.getItem("orgCode"),
    }
  }, 
  props: {
    atId: {
      type: Number,
      required: true,
      default () {
        return null
      }
    }
  },
  watch: {
    atId () {
      this.getNewsData()
    }
  },
  mounted () {
    this.getNewsData()
  },
  methods: {
    getNewsData () {
      var self = this
      this.axios({
        url: `${basePath}/a_info/article/list/from_org/${self.orgCode}`,
        method: 'get',
        params: {
          type: this.atId,
          pageSize: 7,
          pageNum: 1
        }
      }).then(function (response){
        self.dataList = response.data.data.rows
      }).catch(function (error) {
        self.$message({
          message: "请求失败!",
          type: 'warning'
        });
      })
    }
  }
}
</script>

<style scoped>
  .main-block-list{
    margin: 0;
    padding: 10px;
    list-style: none;
    max-height: 272px;
    overflow: auto;
  }
  .main-block-list .list-item {
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;   
  }
  .main-block-list .list-item:before {
    content: ' ';
    vertical-align: middle;
    display: inline-block;
    border-left: 8px solid #555555;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
    