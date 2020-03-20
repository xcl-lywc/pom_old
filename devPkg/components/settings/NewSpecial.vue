/*********************添加专题***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-01
/****************************************************/
<template>
  <div v-loading="loading">
    <p class="tips-title">点击添加专题, 输入后按Enter保存</p>
    <el-tag
      :key="tag.atId"
      v-for="tag in specialTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{ tag.atName }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm">
    </el-input>
    <el-button v-else type="primary" class="button-new-tag" size="small" @click="showInput">添加专题</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        specialTags: [],
        inputVisible: false,
        inputValue: '',
        loading: false,

        orgCode: sessionStorage.getItem("orgCode"),
      }
    },
    mounted: function () {
      this.getSpecialList()
    },
    methods: {
      /**
       * 获取专题列表
       * @return {[type]} [description]
       */
      getSpecialList () {
        var self = this
        self.loading = true
        let config = {
          url: `${basePath}/a_types/articletypes/from_org/${self.orgCode}`,
          method: 'get',
          params: { type: "2" }
        }
        self.$request.requestAxios(config.method, config.url, {params: config.params},
          (response) => {
            self.specialTags = response.data.data;
            self.loading = false
          },
          (error) => {
            self.$message.error(error)
            self.loading = false
          }
        )
      },
      addNewSpecial () {

      },
      /**
       * 点击删除专题
       * @param  {[type]} tag [description]
       * @return {[type]}     [description]
       */
      handleClose(tag) {
        var self = this
        self.$confirm('确认删除该专题吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let config = {
            url: `${basePath}/a_types/${tag.atId}/from_org/${self.orgCode}`,
            method: 'delete',
          }
          self.$request.requestAxios(config.method, config.url, null,
            (response) => {
              self.$message({
                message: "删除专题成功!",
                type: 'success'
              });
              self.specialTags.splice(self.specialTags.indexOf(tag), 1);
            },
            (error) => {
              self.$message.error(error)
            }
          )
        })
      },
      /**
       * 点击添加专题, 显示输入框
       * @return {[type]} [description]
       */
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        var self = this
        if (inputValue) {

          let config = {
            url: `${basePath}/a_types/add/from_org/${self.orgCode}`,
            method: 'post',
            data: { 
              atName: self.inputValue,
              atType: "2",
              status: 1
            }
          }
          self.$request.requestAxios(config.method, config.url, config.data,
            (response) => {
              self.$message({
                message: "添加专题成功!",
                type: 'success'
              });
              self.getSpecialList() //重新查询
            },
            (error) => {
              self.$message.error(error)
            }
          )
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tips-title {
    margin-top: 0;
    color: #797979;
  }
  .special-tag {
    margin: 5px;
  }
  .new-special-btn:hover {
    cursor: pointer;
  }
  .el-tag {
    margin: 5px 10px 5px 0;
  }
  .button-new-tag {
    margin: 5px 10px 5px 0;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 150px;
    margin: 5px 10px 5px 0;
    vertical-align: bottom;
  }
</style>