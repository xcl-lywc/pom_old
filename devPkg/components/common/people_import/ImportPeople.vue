/********************人员信息模板导入-组件************************/
  Author: Mingzhang.Zhao
  Date:   2018-10-12
/************************************************/
<template>
  <div class="import-wrap">
      <!-- <el-aside width="200px">
        <el-tree
          ref="typeTree"
          :data="partyListData"
          class="tree-list"
          node-key="id"
          :props="defaultProps"
          :expand-on-click-node="false"
          @node-click="clickPartyTree">
          <span class="custom-tree-node fill-width" slot-scope="{ node, data }">
            <el-tooltip :enterable="false" :content="node.label" placement="right-start">
              <div>
                <i v-if="data.id == companyId" class="el-icon-circle-check text-blue"></i>
                <span :class="{'text-blue' : data.id == companyId}">{{ node.label }}</span> 
                <i v-if="data.type == '4'" class="fa fa-star text-yellow" aria-hidden="true"></i>
              </div>
            </el-tooltip>
          </span>
        </el-tree>
      </el-aside> -->
    <el-main>
      <el-upload
        class="upload-demo"
        :action="fileServer"
        :headers="token"
        :on-success="handleSuccess"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :on-error="handleError"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :beforeUpload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">单次仅支持一次上传一个文件, 文件大小不可超过10M</div>
        <div slot="tip" class="el-upload__tip">需要修改时请删除当前文件后, 重新上传</div>
      </el-upload>
      
      <!-- 表头 -->
      <el-table
        :data="rowsDataDefault"
        stripe
        style="width: 100%">
        <el-table-column
          label="系统对应表头"
          width="120">
          <template slot-scope="scope">
            <span v-if="uploadSuccess">上传文件表头</span>
          </template>
        </el-table-column>
        
        <el-table-column
          v-if="importType == 'company'"
          v-for="(item, index) in companyHeader"
          :key="item"
          :label="item"
          align="center"
          width="130"
          :render-header="companyRenderHeader">
          <template slot-scope="scope">
            <el-select v-if="uploadSuccess" v-model="rowsData[index]" clearable value-key="col" @change="changeHeader">
              <el-option :value="option" :label="option.title" v-for="option in headerData" :disabled="option.isChoosed" :key="option.col"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          v-if="importType == 'party'"
          v-for="(item, index) in partyHeader"
          :key="item"
          :label="item"
          align="center"
          width="130"
          :render-header="partyRenderHeader">
          <template slot-scope="scope">
            <el-select v-if="uploadSuccess" v-model="rowsData[index]" clearable value-key="col" @change="changeHeader">
              <el-option :value="option" :label="option.title" v-for="option in headerData" :disabled="option.isChoosed" :key="option.col"></el-option>
            </el-select>
          </template>
        </el-table-column>

      </el-table>
      <el-button type="primary" class="submit-button" :disabled="!uploadSuccess" :loading="loading" @click="importExcel">确定导入</el-button>
    </el-main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading:         false,
        fileServer:      `${basePath}/userimport/import`,
        token:           { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("userData")).token}`},
        fileList:        [],   //文件上传列表
        uploadSuccess:   false,
        companyHeader:   ["姓名", "政治面貌", "手机号码", "邮箱", "技术职务", "性别", "民族", "籍贯", "文化程度", "身份证号", "婚姻状况", "外语水平", "入党时间", "申请入党时间", "转积极分子时间", "转预备党员时间", "详细住址", "出生年月", "入职时间","所在公司的名称","入党介绍人"],
        partyHeader:   ["姓名", "身份证号", "入党时间", "申请入党时间", "转积极分子时间", "转预备党员时间","入党介绍人","是否失联", "失联时间", "是否流动", "外出流向","党籍状态", "人员类别"],
        headerData:      [],   //上传完成后返回的表头option数组
        rowsData:        [],   //当前selec对应的数据(array)
        rowsColList:     [],   //当前select选中值的col值对应的数组, 用于检测是否重复
        rowsServiceData: {},   //需要提交后台的数据(object)
        rowsDataDefault: [{'1': 0}], //默认数据，
        submitDisabled:      true,  // 禁用提交按钮
        preventBeforeDelete: false, // 阻止文件提交的BeforeDelete事件
        // partyListData:   [], //组织树
        // defaultProps: {
        //   children: 'childrens',   //树的配置
        //   label: 'name'
        // },
        //companyId:   0, //当前对应的组织代码 默认为顶级 则Id == 0
      };
    },
    props: {
      importType: {
        required: true,
        type: String,
      },
      orgId: {
        type: Number,
        default: null
      },
      partyId: {
        type: Number,
        default: null
      },
    },
    created () {
      this.getPartyorgstree();
    },
    mounted () {
    },
    watch: {
      rowsData (newV, oldV) { //rowsData变化时, 根据点击不同的内容和类型(党组织/公司), 将index对应的表头对象字段写入
        let self = this
        self.submitDisabled = true
        self.rowsColList    = []
        if(self.importType == "company") {
          newV.forEach((item, index) => {
            self.rowsColList.push(item.col)
            switch (index) {
              case 0:
                self.rowsServiceData.userName = item;
                break;
              case 1:
                self.rowsServiceData.outLook = item;
                break;
              case 2:
                self.rowsServiceData.phoneNum = item;
                break;
              case 3:
                self.rowsServiceData.email = item;
                break;
              case 4:
                self.rowsServiceData.technicalPosition = item;
                break;
              case 5:
                self.rowsServiceData.gender = item;
                break;
              case 6:
                self.rowsServiceData.nation = item;
                break;
              case 7:
                self.rowsServiceData.nativePlace = item;
                break;
              case 8:
                self.rowsServiceData.educationDegree = item;
                break;
              case 9:
                self.rowsServiceData.idNumber = item;
                break;
              case 10:
                self.rowsServiceData.marital = item;
                break;
              case 11:
                self.rowsServiceData.languageLevel = item;
                break;
              case 12:
                self.rowsServiceData.joinPartyTime = item;
                break;
              case 13:
                self.rowsServiceData.applicationPartyTime = item;
                break;
              case 14:
                self.rowsServiceData.activistTime = item;
                break;
              case 15:
                self.rowsServiceData.reserveTime = item;
                break;
              case 16:
                self.rowsServiceData.address = item;
                break;
              case 17:
                self.rowsServiceData.birthday = item;
                break;
              case 18:
                self.rowsServiceData.hiredate = item;
                break;
              case 19:
                self.rowsServiceData.copanyName = item;
                break;
              case 20:
                self.rowsServiceData.introducer = item;
            }
          })
        } else {
          newV.forEach((item, index) => {
            self.rowsColList.push(item.col)
            switch (index) {
              case 0:
                self.rowsServiceData.userName = item;
                break;
              case 1:
                self.rowsServiceData.idNumber = item;
                break;
              case 2:
                self.rowsServiceData.joinPartyTime = item;
                break;
              case 3:
                self.rowsServiceData.applicationPartyTime = item;
                break;
              case 4:
                self.rowsServiceData.activistTime = item;
                break;
              case 5:
                self.rowsServiceData.reserveTime = item;
                break;
              case 6:
                self.rowsServiceData.introducer = item;
                break;
              case 7:
                self.rowsServiceData.lost = item;
                break;
              case 8:
                self.rowsServiceData.lostTime = item;
                break;
              case 9:
                self.rowsServiceData.mobile = item;
                break;
              case 10:
                self.rowsServiceData.mobilePlace = item;
                break;
              case 11:
                self.rowsServiceData.partyMemStatus = item;
                break;
              case 12:
                self.rowsServiceData.status = item;
                break;
            }
          })
        }
        
        
        if(self.rowsData[0]) {
          self.submitDisabled = false
        }
      }
    },
    methods: {
      beforeAvatarUpload(file) {                
          var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
          const extension = testmsg === 'xls'  
          const extension2 = testmsg === 'xlsx'  
          const isLt2M = file.size / 1024 / 1024 < 10  
          if(!extension && !extension2) {
              this.preventBeforeDelete = true
              this.$message({  
                  message: '上传文件只能是 xls、xlsx格式!',  
                  type: 'warning'  
              });  
          }  
          if(!isLt2M) {
              this.preventBeforeDelete = true
              this.$message({  
                  message: '上传文件大小不能超过 10MB!',  
                  type: 'warning'  
              });  
          }  
          return extension || extension2 && isLt2M
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      /**
       * 上传文件成功的回调
       * @param  {object} response 响应
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleSuccess(response, file, fileList) {
        if(response.meta && response.meta.code == 0) {
          this.uploadSuccess = true;
          this.rowsServiceData.filePathId = response.data.fileId;
          this.headerData = response.data.header;
        } else {
          this.$message.error("失败")
          this.fileList = []
        }
      },
      /**
       * 点击删除, 提示确认
       * @param  {object} file     当前文件的信息
       * @param  {array} fileList 文件列表
       * @return none
       */
      beforeRemove(file, fileList) {
        if(!this.preventBeforeDelete) {
          return this.$confirm(`移除 ${ file.name } 后, 表格将刷新`, "确认删除?")
        }
      },
      /**
       * 确认删除, 还原上传状态, 清空数据
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleRemove(file, fileList) {
        this.uploadSuccess   = false
        this.headerData      = []
        this.rowsData        = []
        this.rowsServiceData = {}
      },
      /**
       * 文件数量溢出的钩子
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /**
       * 上传出错的钩子
       * @param  {object} file     当前文件的信息
       * @param  {array}  fileList 文件列表
       * @return none
       */
      handleError (errorMsg, file, fileList) {
        this.$message.error("上传失败")
        this.fileList = []
      },
      changeHeader (item) {
        this.rowsServiceData
      },
      /**
       * 点击导入数据
       * @return none
       */
      importExcel () {
        let self = this
        self.loading = true
        
        //去除由select产生的""值的key, 用于后台保存
        for(let key in self.rowsServiceData) {
          if(!self.rowsServiceData[key]) {
            delete self.rowsServiceData[key]
          }
        }

        if(self.importType == 'company') {
          self.rowsServiceData.companyId = self.orgId ? self.orgId : JSON.parse(sessionStorage.getItem('userData')).orgId;
        } else {
          self.rowsServiceData.partyOrgId = self.partyId ? self.partyId : JSON.parse(sessionStorage.getItem('userData')).partyOrgId;
        }
        

        let config = {
          url: self.importType == 'company' ? `${basePath}/userimport/add` : `${basePath}/userimport/party/add`,
          method: 'post',
          data: self.rowsServiceData,
        }

        self.$request.requestAxios(config.method, config.url, config.data,
          (response) => {
            if(response.data.data) {
              self.$message.success("导入成功, 正在下载错误数据信息表...")
              self.$util.downloadFile(response.data.data)
            } else {
              self.$message.success("导入成功")
            }
            self.$emit("uploadSuccess")
            self.loading = false;
          },
          (error) => {
            self.loading = false;
            self.$message.error(error.data.meta.message)
          }
        )
      },
      /**
       * 数组去重
       * @param  {array} arr 需要去重的数组
       * @return {array}       去重后的数组(不影响原数组)
       */
      unique (arr) {
       var res = [];
       for(var i=0; i<arr.length; i++){
        if(res.indexOf(arr[i]) == -1){
         res.push(arr[i]);
        }
       }
       return res;
      },
      /**
       * 获取树形数据
       * @param  {string}  url    请求地址
       * @param  {string}  target 需要保存的数据目标名称
       * @param  {boolean} multi  查询树组还是单个树
       * @return none
       */
      getPartyorgstree () {
        let config = {
          url: `${basePath}/party_orgs/partyorgstree`,
          method: 'get',
        }
        this.$request.requestAxios(config.method, config.url, null,
          (response) => {
            this.companyId     = response.data.data[0].id
            this.partyListData = response.data.data;
          },
          (error) => {
            this.$message.error('查询组织失败！');
          }
        )
      },
      /**
       * 点击树节点, 查询组织下对应的数据
       * @param  {object} data 节点数据
       * @return none
       */
      clickPartyTree (data) {
        this.companyId = data.id
      },
      /*
       * 自定义公司表头
       */
      companyRenderHeader(h, {column, $index}) {
        let index = $index - 1;
        if(index == 0 || index == 1 || index == 2 || index == 5 || index == 6 || index == 7 || index == 8 || index == 9 || index == 17 || index == 18){
          // return(column.label)


          return h("span",[h("span",{"class": {"red-star": true}},"*"),h("span",column.label),])
        }else{
          return h("span",[h("span",column.label)])
        }

      },
      /*
       * 自定义党组织表头
       */
      partyRenderHeader(h, {column, $index}){
        let index = $index - 1;
        if(index == 0 || index == 1 || index == 2 || index == 6 || index == 7 || index == 8 || index == 9 || index == 10 || index == 11){
          // return(column.label)


          return h("span",[h("span",{"class": {"red-star": true}},"*"),h("span",column.label),])
        }else{
          return h("span",[h("span",column.label)])
        }

      }
    }
  }
</script>

<style>
  input[type=file]{
    display: none;
  }
  /* 后期新增的样式只能再style中添加，不能使用scoped */
  .red-star {
    color: red!important;
  }
</style>

<style scoped>

  .table-wrap {
    font-size: 14px;
    margin-top: 20px;
    background: #fff;
  }
  .table-wrap .el-col{
    border: 1px solid #ececec;
    height: 42px;
    line-height: 40px;
  }
  .table-right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .table-item {
    /*width: 100%;*/
    /*border-right: 1px solid #ccc;*/
  }
  .submit-button {
    float: right;
    margin-top: 20px;
  }
  .table-wrap td{
    border: 1px solid #dbdde0;
    text-align: center;
  }
  .table-wrap table{
    border-collapse:collapse;
    width: 100%;
  }
  .table-header{
    width: 100px;
  }
  .table-content{
    width: calc(100% - 100px)
  }
  
</style>
