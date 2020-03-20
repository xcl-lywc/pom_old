<template>
  <div>
    <div class="content-manage">
      <el-tabs v-model="activeTab" @tab-click="clickTab">
        <el-tab-pane label="党费缴纳核定表" :name="'checkList'"><check-list></check-list></el-tab-pane>
        <el-tab-pane label="党费缴纳名单" :name="'peopleList'"><people-list v-if="activeTab == 'peopleList'"></people-list></el-tab-pane>
        <el-tab-pane label="党费收缴报告单" :name="'reportList'"><report-list v-if="activeTab == 'reportList'"></report-list></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import checkList from "./paymentComponents/CheckList.vue"
  import peopleList from "./paymentComponents/PeopleList.vue"
  import reportList from "./paymentComponents/ReportList.vue"
  export default {
    data () {
      return {
        activeTab: "checkList"
      }
    },
    components: {
      "check-list": checkList,
      "people-list": peopleList,
      "report-list": reportList
    },
    mounted () {

    },
    methods: {

    }
  };
</script>

<style scoped>

</style>