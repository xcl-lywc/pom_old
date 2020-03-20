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

    <el-table :data="tablePayListData">
      <el-table-column label="序号" fixed="left">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" fixed="left"></el-table-column>
      <el-table-column prop="payNumber" label="核定缴纳基数"></el-table-column>
      <el-table-column prop="payRatio" label="缴纳比例"></el-table-column>
      <el-table-column prop="payMoney" label="缴纳金额"></el-table-column>
      <el-table-column prop="description" label="备注"></el-table-column>
      <!-- <el-table-column label="操作"></el-table-column> -->
    </el-table>

    <div class="bottom-table-wrap">
      <div class="bottom-table-item">
        <h4>补交</h4>
        <el-table :data="tableNoPayListData">
          <el-table-column label="序号" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="姓名" fixed="left"></el-table-column>
          <el-table-column prop="postWage" label="月份"></el-table-column>
          <el-table-column prop="postWage" label="金额"></el-table-column>
        </el-table>
      </div>
      <div class="bottom-table-item">
        <h4>欠交</h4>
        <el-table :data="tableData">
          <el-table-column label="序号" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="姓名" fixed="left"></el-table-column>
          <el-table-column prop="postWage" label="月份"></el-table-column>
          <el-table-column prop="postWage" label="金额"></el-table-column>
        </el-table>
      </div>
    </div>
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
        partyListData:      [],
        tableListData:      [],
        tablePayListData:   [],
        tableNoPayListData: [],

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
          this.getTableListData("top", "tableListData")
          this.getTableListData("pay", "tablePayListData")
          this.getTableListData("noPay", "tableNoPayListData")
        }
      },
      /**
       * 获取表格数据
       * @param  {string} type          查询的类型 "top" 顶部表格 "pay" 补交 "noPay" 欠交
       * @param  {string} tableDataName 需要保存的目标数据名称
       * @return {[type]}               [description]
       */
      getTableListData (type, tableDataName) {

        let searchForm = JSON.parse(JSON.stringify(this.searchForm))
        //根据不同type查询不同的数据表格
        switch(type) {
          case "top":
            break;
          case "pay":
            searchForm.status = 2;
            break;
          case "noPay":
            searchForm.status = 3;
            break;
          default:
            break;
        }
        this.$request.requestAxios("get", `${basePath}/dues_count/work/party_group`,
          {
            params : searchForm
          }, 
          (response) => {
            this[tableDataName] = response.data.data
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
  .bottom-table-wrap {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .bottom-table-item {
    border: 1px solid #ddd;
    background: #fff; 
    width: 49%;
  }
  .bottom-table-item h4 {
    padding: 15px 0;
    text-align: center;
    font-weight: bold;
  }
</style>