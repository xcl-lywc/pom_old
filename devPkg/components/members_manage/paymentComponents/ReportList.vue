<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <!-- <el-form-item label="支部">
        <el-select v-model="searchForm.partyOrgId" placeholder="请选择支部" @change="searchTable">
          <el-option v-for="(item, index) in partyListData" :label="item.name" :value="item.id" :key="`${index}支部`"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="缴纳时间">
        <el-date-picker
          type="date"
          v-model="searchForm.date"
          value-format="timestamp"
          :editable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="searchTable">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <el-row :gutter="20" class="table-row">
      <el-col :span="4">党员总数</el-col>
      <el-col :span="4" class="data-text">{{ tableData.totalPeople || 0 }}</el-col>
      <el-col :span="4">已交人数</el-col>
      <el-col :span="4" class="data-text">{{ tableData.alreadyPayPeople || 0 }}</el-col>
      <el-col :span="4">欠交人数</el-col>
      <el-col :span="4" class="data-text">{{ tableData.notPayPeople || 0 }}</el-col>

      <el-col :span="4">应收党费(元)</el-col>
      <el-col :span="4" class="data-text">{{ tableData.planReceipts || 0 }}</el-col>
      <el-col :span="4">实收党费(元)</el-col>
      <el-col :span="4" class="data-text">{{ tableData.actualReceipts || 0 }}</el-col>
      <el-col :span="4">欠交党费(元)</el-col>
      <el-col :span="4" class="data-text">{{ tableData.notReceipts || 0 }}</el-col>

      <el-col :span="4">备注</el-col>
      <el-col :span="20" class="data-text">{{ tableData.description || 0 }}</el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //筛选表单
        searchForm: {
          partyOrgId: sessionStorage.getItem('orgId'),
          date:       new Date().getTime(),
        },
        partyListData:  [],
        tableData:      [],

        orgId:         sessionStorage.getItem('orgId'),     //党组织id
        orgCode:       sessionStorage.getItem("orgCode"), 
      }
    },
    mounted () {
      this.getPartyChildren().then((response) => {
        this.searchTable()
      }).catch((error) => {
        this.$message.error(error)
      })
      
    },
    methods: {
      /**
       * 获取当前组织的下级组织
       * @return {[type]} [description]
       */
      getPartyChildren () {
        let p = new Promise ((resolve, reject) => {
          this.$request.requestAxios("get", `${basePath}/party_orgs/chidrens`,
            {
              params : {
                id: parseInt(sessionStorage.getItem("orgId")),
                function: 0
              }
            }, 
            (response) => {
              this.partyListData = response.data.data
              resolve(response)
            },
            (error) => {
              reject("查询党支部失败")
            }
          )
        })
        return p
      },
      /**
       * 用户操作时, 实时根据内容进行查询
       * @return {[type]} [description]
       */
      searchTable () {
        if(this.searchForm.date) {
          this.getTableData()
        }
      },
      /**
       * 获取表格数据
       * @param  {string} type          查询的类型 "top" 顶部表格 "pay" 补交 "noPay" 欠交
       * @param  {string} tableDataName 需要保存的目标数据名称
       * @return {[type]}               [description]
       */
      getTableData () {

        this.$request.requestAxios("get", `${basePath}/dues_report/work/report`,
          {
            params : this.searchForm
          }, 
          (response) => {
            this.tableData = response.data.data
          },
          (error) => {
            this.$message.error(error.data.meta.message)
          }
        )
      }
    }
  };
</script>

<style scoped>
  .table-row {
    padding: 20px;
    background: #fff;
  }
  .table-row .el-col {
    padding: 15px;
    border: 1px solid #e4e7ed;
  }
  .data-text {

  }
</style>