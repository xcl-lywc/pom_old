/********************职工详情************************/
  Author: Mingzhang.Zhao
  Date:   2018-09-04
/************************************************/
<template>
  <div>
    <el-button class="back-button" type="primary" @click="goBack">返回</el-button>
    <people-detail :id="$route.params.id"></people-detail>
  </div>
</template>

<script>
  import peopleDetail from "../../common/PeopleDetail.vue"
  export default {
    data () {
      return {
      }
    },
    components: {
      "people-detail": peopleDetail
    },
    mounted () {
    },
    methods: {
      goBack () {
        window.history.back()
      }
    }
  }
</script>

<style scoped>
  .back-button {
    margin: 15px 0 15px 15px;
  }
</style>