/*********************学习专题管理***********************/
  Author: Mingzhang.Zhao
  Date:   2018-06-14
/************************************************/
<template>
  <div>
    <el-container>
      <el-aside width="340px">
        <div class="add-special-button-wrap">
          <el-button :disabled="orgType != 1 || resource.indexOf(24) == -1" @click="clickAddButton" type="primary" size="mini" class="add-button fill-width">添加</el-button>
        </div>
        <ul class="special-wrap">
          <el-tooltip :enterable="false" :content="item.name" placement="right-start" v-for="(item, index) in specialListData" :key="`专题${index}`">
            <li :class="{active: item.id == tempSpecialId}"@click="getSpecialDetail(item.id)">{{ item.name }}</li>
          </el-tooltip>
        </ul>
      </el-aside>
      <!-- 右侧子页面 -->
      <div class="right-content fill-width" :gutter="20" v-loading="detailLoading">
        <div class="right-button-group">
          <el-button :disabled="orgType != 1 || resource.indexOf(25) == -1" type="default" size="small" @click="clickEditButton(tempSpecialId)">编辑</el-button>
          <el-button :disabled="orgType != 1 || resource.indexOf(26) == -1" type="danger" size="small" @click="deleteSpecial">删除</el-button>
        </div>
        <h3 class="specialTitle">{{ specialDetail.lTypeName }}</h3>
        <p class="description">{{ specialDetail.lTypeContent }}</p>
        <p><span class="label">创建日期</span>{{ creatTime }}</p>
        <p><span class="label">固定周期任务:</span>{{ specialDetail.remindValue }}<span>{{ remindType }}</span></p>
        <p><span class="label">首次提醒:</span>{{ firstRemindTime }}</p>
        <p><span class="label">提醒:</span> {{ remindObject }}</p>
      </div>
    </el-container>
    <!-- 新增/编辑 学习专题 -->
    <el-dialog
      :title="operateType == 'new' ? '新增' : '编辑'"
      :close-on-click-modal="false"
      :visible.sync="specialVisible"
      @close="specialDialogClosed"
      width="50vw">
      <el-form ref="specialForm" :model="specialForm" label-width="80px" :rules="rules" size="small">
        <el-form-item 
          prop="lTypeName"
          label="专题名称" 
          :rules="[
            { required: true, message: '请输入专题名称', trigger: 'blur' }
          ]">
          <el-input type="text" v-model="specialForm.lTypeName" palceholder="请输入专题名称"></el-input>
        </el-form-item>
        <el-form-item
          prop="lTypeContent"
          label="专题描述"
          :rules="[
            { required: true, message: '请输入专题描述', trigger: 'blur' }
          ]">
          <el-input type="textarea" v-model="specialForm.lTypeContent" palceholder="请输入专题描述"></el-input>
        </el-form-item>
        <el-form-item label="周期任务" >
          <el-switch v-model="isCircle"></el-switch>
        </el-form-item>
        <el-form-item
          v-if="isCircle"
          label="提醒周期"
          >
          <el-select v-model="specialForm.remindType" class="fill-width">
            <el-option label="按年" :value="1"></el-option>
            <el-option label="按月" :value="2"></el-option>
            <el-option label="按天" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="isCircle"
          prop="remindValue"
          label="周期长度">
          <el-input type="number" v-model.number="specialForm.remindValue" palceholder="请输入提醒周期长度"></el-input>
        </el-form-item>
        <el-form-item
          prop="firstRemindTime"
          label="首次提醒"
          :rules="[
            { required: true, message: '请选择首次提醒时间', trigger: 'blur' }
          ]">
          <el-date-picker v-model="specialForm.firstRemindTime" type="date" value-format="timestamp" :editable="false" class="fill-width"></el-date-picker>
        </el-form-item>
        <el-form-item
          label="提醒类型"
          >
          <el-select v-model="specialForm.remindObject" class="fill-width">
            <el-option label="党委" :value="1"></el-option>
            <el-option label="党支部" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="specialVisible = false">取 消</el-button>
        <el-button @click="submitForm('specialForm')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入提醒周期长度'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 0) {
            callback(new Error('周期长度必须大于0'));
          } else {
            callback();
          }
        }
      };
      return {
        specialListData: [], //左侧专题列表

        operateType: "new",  //当前的操作模式
        specialVisible: false,
        isCircle:          true,

        specialForm: {
          lTypeName:       null,
          lTypeContent:    null,
          specialType:     2,     //1为周期 2不为周期 
          remindType:      1,
          remindValue:     null,
          firstRemindTime: null,
          remindObject:    2,
        },
        rules: {
          remindValue: [
            { validator: checkAge, trigger: 'change' }
          ]
        },

        detailLoading: false,
        tempSpecialId: null, // 学习专题当前Id
        specialDetail: {},   // 学习专题详情

        resource: JSON.parse(sessionStorage.getItem('resource')),
        orgCode:  sessionStorage.getItem("orgCode"),
        orgType:  sessionStorage.getItem("orgType"),
      }
    },
    mounted () {
      this.getSpecialList().then((response) => {
        this.getSpecialDetail(response.data.data[0].id)
      }).catch((error) => {
        this.$message.error("获取学习专题列表失败")
      })
    },
    watch: {
      "specialForm.specialType": {
        handler (newV) {
          newV == 1 ? this.isCircle = true: this.isCircle = false
        },
        deep: true
      },
    },
    computed: {
      creatTime () {
        return this.timestampToTime(this.specialDetail.createTime)
      },
      firstRemindTime () {
        return this.timestampToTime(this.specialDetail.firstRemindTime)
      },
      remindType () {
        switch (this.specialDetail.remindType) {
          case 1:
            return "年";
            break;
          case 2:
            return "月";
            break;
          case 3:
            return "天";
            break;
        }
      },
      remindObject () {
        switch (this.specialDetail.remindObject) {
          case 1:
            return "党委";
            break;
          case 2:
            return "党支部";
            break;
          case 3:
            return "党小组";
            break;
        }
      }
    },
    methods: {
      /**
       * 获取专题列表数据
       * @return {object} 查询完成的promise
       */
      getSpecialList () {
        let self = this;

        let p = new Promise ((resolve, reject) => {
          self.$request.requestAxios('get', `${basePath}/t_task_special/learn_special/id_name/from_org/${self.orgCode}`, null, 
            (response) => {
              self.specialListData = response.data.data
              resolve(response)
            },
            (error, status) => {
              status != 200 ? self.$message.error(error.response.data.meta.message) : self.$message.error(error.data.meta.message)
              reject(error)
            }
          )
        })
        
        return p
      },
      /**
       * 获取学习专题详情
       * @param  {number} itemId  专题Id
       * @return {object} 查询完成的promise
       */
      getSpecialDetail (itemId) {
        let self = this

        this.tempSpecialId = itemId //查询详情时记录当前的Id

        // let config = {
        //   method: "get",
        //   url:    `${basePath}/t_task_special/learn_special/details`,
        //   params:   {id: itemId}
        // }
        self.detailLoading = true

        
        let p = new Promise ((resolve, reject) => {        
          self.$request.requestAxios('get', `${basePath}/t_task_special/learn_special/details/from_org/${self.orgCode}`, {params:   {id: itemId}}, 
            (response) => {
              self.specialDetail = JSON.parse(JSON.stringify(response.data.data))
              self.specialForm   = response.data.data
              self.detailLoading = false
              resolve(response)
            },
            (error, status) => {
              status != 200 ? self.$message.error(error.response.data.meta.message) : self.$message.error(error.data.meta.message)
              self.detailLoading = false
              reject(error)
            }
          )
        })
        return p
      },
      /**
       * 点击编辑按钮
       * @return {[type]} [description]
       */
      clickEditButton (itemId) {
        this.operateType = "edit"

        this.getSpecialDetail(itemId).then((response) => {
          this.specialVisible = true
        }).catch((error) => {
          this.$message.error(error.data.meta.message)
        })
      },
      clickAddButton () {
        this.specialForm = {
          lTypeName:       null,
          lTypeContent:    null,
          specialType:     2,     //1为周期 2不为周期 
          remindType:      1,
          remindValue:     null,
          firstRemindTime: null,
          remindObject:    2,
        }
        this.specialVisible = true;
        this.operateType    = 'new'
      },
      /**
       * 提交表单
       * @param  {string} formName 表单名称
       * @return none
       */
      submitForm (formName) {
        let self = this;
        
        let config = {
          method: "post",
          url:    `${basePath}/t_task_special/learn_special/add/from_org/${self.orgCode}`,
          data:   self[formName]
        }

        if(self.operateType == "edit") {
          config.method = "patch",
          config.url    = `${basePath}/t_task_special/learn_special/update/${self.tempSpecialId}/from_org/${self.orgCode}`
        }
        
        self.$refs[formName].validate((valid) => {
          if (valid) {

            if(self.isCircle) {
              self.specialForm.specialType = 1
            } else {
              self.specialForm.specialType = 2
            }
            
            self.$request.requestAxios(config.method, config.url, self[formName], 
              (response) => {
                self.$message.success("成功")
                self.getSpecialList()
                if(self.operateType == "edit") {
                  self.getSpecialDetail(self.tempSpecialId) // 编辑完成后重新查询当前的详情
                }
                self.specialVisible = false
              },
              (error, status) => {
                status != 200 ? self.$message.error(error.response.data.meta.message) : self.$message.error(error.data.meta.message) 
              }
            )

          } else {
            self.$message.error("请检查必填项")
          }
        })
      },
      /**
       * 删除专题
       * @return {[type]} [description]
       */
      deleteSpecial () {
        let self = this;

        let config = {
          method: "delete",
          url:    `${basePath}/t_task_special/learn_special/delete/${self.tempSpecialId}/from_org/${self.orgCode}`,
        }
        self.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((response) => {
          self.$request.requestAxios(config.method, config.url, null, 
            (response) => {
              self.$message.success("成功")
              this.getSpecialList().then((response) => {
                this.getSpecialDetail(response.data.data[0].id)
              }).catch((error) => {
                this.$message.error("获取学习专题列表失败")
              })
            },
            (error, status) => {
              status != 200 ? self.$message.error(error.response.data.meta.message) : self.$message.error(error.data.meta.message)
              self.loading = false
            }
          )

          // self.axios(config).then((response) => {
          //   self.$message.success("删除成功")
          // }).catch((error) => {
          //   self.$message.error(error)
          // })

        }).catch((error) => {

        })
      },
      /**
       * 专题dialog关闭, 重置表单和验证状态
       * @return none
       */
      specialDialogClosed () {
        this.$refs["specialForm"].resetFields()
        this.specialForm = {
          lTypeName:       null,
          lTypeContent:    null,
          specialType:     2, 
          remindType:      1,
          remindValue:     null,
          firstRemindTime: null,
          remindObject:    2,
        }
      },
      /**
       * 转换时间
       * @param  {[type]} timestamp [description]
       * @param  {[type]} showTime  [description]
       * @return {[type]}           [description]
       */
      timestampToTime (timestamp, showTime) {
        if(timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' '
          let h = date.getHours() + ':';
          let m = date.getMinutes() + ':';
          let s = date.getSeconds();
          if(showTime) {
            return Y+M+D+h+m+s;
          } else {
            return Y+M+D;
          }
          
        } else {
          return ""
        }
      },
    }
  };
</script>

<style scoped>
  .fill-width {
    width: 100%;
  }
  .special-wrap {
    margin: 0 10px 0 0;
    padding: 10px;
    list-style: none;
    background: #fff;
  }
  .add-special-button-wrap {
    padding: 10px;
    margin-right: 10px;
    background: #fff;
  }
  .special-wrap {
    max-height: calc(100vh - 220px);
    overflow-y: auto;
  }
  .special-wrap li {
    padding: 7px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
  .special-wrap li.active {
    color: #409EFF;
  }
  .special-wrap li:hover {
    cursor: pointer;
    background: #eee;
  }
  .right-content {
    padding: 20px;
    background: #fff;
    font-size: 14px;
  }
  .right-content .specialTitle {
    margin-top: 0;
  }
  .right-content .right-button-group {
    float: right;
  }
  .right-content .description {
    text-indent: 35px;
  }
  .right-content .label {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
  }
  .el-form .el-form-item-group {
    display: flex;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>