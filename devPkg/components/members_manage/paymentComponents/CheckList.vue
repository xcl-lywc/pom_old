<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <!-- <el-form-item label="支部">
        <el-select v-model="searchForm.partyOrgId" placeholder="请选择支部" @change="searchTable">
          <el-option v-for="(item, index) in partyListData" :label="item.name" :value="item.id" :key="`${index}支部`"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="核定年度">
        <el-date-picker
          type="year"
          v-model="searchForm.year"
          value-format="timestamp"
          :editable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="searchTable">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column label="序号" fixed="left">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" fixed="left"></el-table-column>
      <el-table-column prop="postWage" label="岗位(等级)工资"></el-table-column>
      <el-table-column prop="guaranteeWage" label="保障工资"></el-table-column>
      <el-table-column prop="endowmentInsurance" label="养老保险"></el-table-column>
      <el-table-column prop="medicalInsurance" label="医疗保险"></el-table-column>
      <el-table-column prop="unemploymentInsurance" label="失业保险"></el-table-column>
      <el-table-column prop="housingProvidentFund" label="住房公积"></el-table-column>
      <el-table-column prop="annualBonus" label="企业年金"></el-table-column>
      <el-table-column prop="taxation" label="个人所得税"></el-table-column>
      <el-table-column prop="subsidies" label="其他津补贴"></el-table-column>
      <el-table-column prop="payNumber" label="交纳基数"></el-table-column>
      <el-table-column prop="payRatio" label="交纳比例"></el-table-column>
      <el-table-column prop="payMoney" label="交纳金额"></el-table-column>
      <el-table-column prop="description" label="备注"></el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showEditDialog(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="编辑"
        :visible.sync="editDialogVisible"
        :close-on-click-modal="false"
        @close="editDialogClosed"
        width="50vw">
        <el-form v-loading="editDialogLoading" ref="editForm" :model="editForm" :rules="rules" label-width="120px" size="small">
            <!-- <el-form-item label="活动名称" prop="name">
              <el-input type="number" v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="谈话地点" prop="address">
              <el-input type="text" v-model="editForm.address"></el-input>
            </el-form-item> -->
            <el-form-item prop="postWage" label="岗位(等级)工资"><el-input type="number" v-model="editForm.postWage"></el-input></el-form-item>
            <el-form-item prop="guaranteeWage" label="保障工资"><el-input type="number" v-model="editForm.guaranteeWage"></el-input></el-form-item>
            <el-form-item prop="endowmentInsurance" label="养老保险"><el-input type="number" v-model="editForm.endowmentInsurance"></el-input></el-form-item>
            <el-form-item prop="medicalInsurance" label="医疗保险"><el-input type="number" v-model="editForm.medicalInsurance"></el-input></el-form-item>
            <el-form-item prop="unemploymentInsurance" label="失业保险"><el-input type="number" v-model="editForm.unemploymentInsurance"></el-input></el-form-item>
            <el-form-item prop="housingProvidentFund" label="住房公积"><el-input type="number" v-model="editForm.housingProvidentFund"></el-input></el-form-item>
            <el-form-item prop="annualBonus" label="企业年金"><el-input type="number" v-model="editForm.annualBonus"></el-input></el-form-item>
            <el-form-item prop="taxation" label="个人所得税"><el-input type="number" v-model="editForm.taxation"></el-input></el-form-item>
            <el-form-item prop="subsidies" label="其他津补贴"><el-input type="number" v-model="editForm.subsidies"></el-input></el-form-item>
            <el-form-item prop="payNumber" label="交纳基数"><el-input type="number" v-model="editForm.payNumber"></el-input></el-form-item>
            <el-form-item prop="payRatio" label="交纳比例"><el-input type="number" v-model="editForm.payRatio"></el-input></el-form-item>
            <el-form-item prop="payMoney" label="交纳金额"><el-input type="number" v-model="editForm.payMoney"></el-input></el-form-item>
            <el-form-item prop="description" label="备注"><el-input type="textarea" v-model="editForm.description"></el-input></el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="addStatus || themeDialogLoading" @click="submitForm('editForm')">确认</el-button>
          <el-button type="default" @click="editDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
  export default {

    data () {
      var checkNum = (rule, value, callback) => {
        if(!value) {
          callback()
        } else {
          if(value < 0) {
            callback(new Error("请输入大于0的数字"))
          } else {
            callback()
          }
        }
      }
      return {
        //筛选表单
        searchForm: {
          partyOrgId: sessionStorage.getItem('orgId'),
          year:       new Date().getTime(),
        },
        partyListData: [],
        tableData:     [],
        orgId:         sessionStorage.getItem('orgId'),     //党组织id
        orgCode:       sessionStorage.getItem("orgCode"), 

        tempEditId:        null,
        editDialogVisible: false,
        editDialogLoading: false,
        editForm: {},
        rules: {
          postWage: [
            { validator: checkNum, trigger: "blur"}
          ],
          guaranteeWage: [
            { validator: checkNum, trigger: "blur"}
          ],
          endowmentInsurance: [
            { validator: checkNum, trigger: "blur"}
          ],
          medicalInsurance: [
            { validator: checkNum, trigger: "blur"}
          ],
          unemploymentInsurance: [
            { validator: checkNum, trigger: "blur"}
          ],
          housingProvidentFund: [
            { validator: checkNum, trigger: "blur"}
          ],
          annualBonus: [
            { validator: checkNum, trigger: "blur"}
          ],
          taxation: [
            { validator: checkNum, trigger: "blur"}
          ],
          subsidies: [
            { validator: checkNum, trigger: "blur"}
          ],
          payNumber: [
            { validator: checkNum, trigger: "blur"}
          ],
          payRatio: [
            { validator: checkNum, trigger: "blur"}
          ],
          payMoney: [
            { validator: checkNum, trigger: "blur"}
          ],
        }
      }
    },
    mounted () {
      this.getPartyChildren().then((response) => {
        this.getTableListData()
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
        if(this.searchForm.year) {
          this.getTableListData()
        }
      },
      /**
       * 获取核定表格数据
       * @return {[type]} [description]
       */
      getTableListData () {
        this.$request.requestAxios("get", `${basePath}/party_membership_dues/party_mem_dues/party_org_id/year/all/from_org/${this.orgCode}`,
          {
            params: this.searchForm
          }, 
          (response) => {
            this.tableData = response.data.data
          },
          (error) => {
            this.$message.error(error.data.meta.message)
          }
        )
      },
      showEditDialog (item) {
        let self = this
        self.tempEditId = item.id

        // self.getDetail(itemId).then((resposne) => {
          self.editForm = item
          self.editDialogVisible = true
        // }).catch((error) => {
        //   self.editDialogLoading = false
        //   self.$message.error(error.data.meta.message)
        // })
      },
      /**
       * 根据Id获取本条的详情
       * @param  {[type]} itemId [description]
       * @return {[type]}        [description]
       */
      getDetail (itemId) {
        let self = this;
        self.editDialogLoading = true
        let p = new Promise ((reslove, reject) => {

          self.$request.requestAxios("get", `${basePath}/party_membership_dues/party_mem_dues/details`, {params: {id: itemId}},
            (response) => {
              reslove(response)
            },
            (error) => {
              reject(error)
            }
          )
        })
        return p
      },
      /**
       * 提交表单 根据不同的表单进行不同的逻辑处理
       * @param  {string} formName 表单的ref
       * @return none
       */
      submitForm(formName) {
        let self = this

        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.editDialogLoading = true
            self.$request.requestAxios("patch", `${basePath}/party_membership_dues/party_mem_dues/update/from_org/${self.orgCode}`, self.editForm, 
              (response) => {
                self.editDialogVisible = false
                self.editDialogLoading = false
                self.$message.success("成功")
                self.getTableListData()
              },
              (error) => {
                self.editDialogLoading = false
                self.$message.error(error.data.meta.message)
              }
            )
          } else {
            self.$message.error("请检查必填项")
            return false;
          }
        });
      },
      /**
       * 表单dialog关闭 ,还原验证
       * @return {[type]} [description]
       */
      editDialogClosed () {
        this.$refs.editForm.resetFields()
      },
    }
  };
</script>

<style scoped>

</style>