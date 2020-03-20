/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务表单
**************************************/
<template>
  <el-container v-loading="isLoad" class="padt20">
    <el-aside
      v-if="isShowTree"
      style="border-right: 1px solid #d3dce6"
      width="300px">
      <!-- <div v-for="(item, index) in formData">
        {{item.type}} , {{item.id}} , {{item.showTreeId}}
      </div> -->
      <tree-selected-last 
        :mathRandom="`${mathRandom}${index}`"
        :pageType="pageType"
        class="marb20" 
        v-for="(item, index) in formData" 
        :key="index"
        v-if="item.type == 'tree'"
        v-show="item.id == showTreeId"
        :paramsData="item"
        isEditPage="0"
        :isCheckbox="item.isCheckbox ? item.isCheckbox : 0"
        @treeValData="((val) => { treeValDataFun(val, item) })"> 
      </tree-selected-last>
      <div v-else></div>
    </el-aside>
    <el-main>
      <el-form v-if="formData" class="task-form" ref="formData" :model="formData" label-width="180px">
        <!-- 排除按钮 -->
        <el-form-item 
            v-for="(item, index) in formData" 
            :key="index"
            v-if=" item.type != 'inputButton' "
            :label="`${item.type != 'skipApproval' ? item.title + '：' : ''}`"
            :rules="[
                { required: item.isRequired, message: `${item.title}不能为空`, trigger: ['blur'] },
            ]">
            <!-- 树结构数据 -->
            <el-input :title="item.value" @click.native=" showTreeId = item.id " readOnly="readOnly" v-if="item.type == 'tree'" v-model="item.value"></el-input>
            <!-- 单行文本 -->
            <el-input v-if="item.type == 'inputText'" v-model="item.value"></el-input>
            <!-- 数字 -->
            <el-input v-if=" item.type == 'inputNumber' " type="number" v-model="item.value"></el-input>
            <!-- 多行文本 -->
            <el-input v-if="item.type == 'textarea'" type="textarea" v-model="item.value"></el-input>

            <!-- 单选框 -->
            <el-radio-group 
                v-if=" item.type == 'inputRadio' "
                v-model="item.value">
                <el-radio 
                    v-for="(itemBox, indexBox) in item.option" 
                    v-model="item.value" 
                    :key="indexBox"
                    :label="itemBox.value">{{itemBox.name}}</el-radio>
            </el-radio-group>

            <!-- 复选框 -->
            <el-checkbox-group v-if=" item.type == 'inputCheckBox' " v-model="item.value">
                <el-checkbox v-for="(itemBox, indexBox) in item.option" :label="itemBox.value" :key="indexBox">{{itemBox.name}}</el-checkbox>
            </el-checkbox-group>

            <!-- 下拉菜单 -->
            <el-select 
                v-if=" item.type == 'select' "
                v-model="item.value" 
                placeholder="请选择">
                <el-option
                    v-for="(itemBox, indexBox) in item.option"
                    :key="indexBox"
                    :label="itemBox.name"
                    :value="itemBox.value">
                </el-option>
            </el-select>
            <!-- 日期选择器 -->
            <el-date-picker
                v-if=" item.type == 'date' && item.dateCheckedFormat != 'yyyy-MM-dd hh:mm:ss'"
                v-model="item.value"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="item.selectionRange == 2 ? pickerOptions2 : item.selectionRange == 3 ? pickerOptions3 : ''" 
                >
            </el-date-picker>
            <!-- 日期时间选择器 -->
            <el-date-picker
                v-if=" item.type == 'date' && item.dateCheckedFormat == 'yyyy-MM-dd hh:mm:ss'"
                v-model="item.value"
                align="right"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                default-time="['09:00:00']"
                placeholder="选择日期"
                :picker-options="item.selectionRange == 2 ? pickerOptions2 : item.selectionRange == 3 ? pickerOptions3 : ''" 
                >
            </el-date-picker>

            <!-- 日期期间选择器 -->
            <el-date-picker
                v-if=" item.type == 'dateRange' && item.dateCheckedFormat != 'yyyy-MM-dd hh:mm:ss' "
                v-model="item.value"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="item.selectionRange == 2 ? pickerOptions2 : item.selectionRange == 3 ? pickerOptions3 : ''" 
                >
            </el-date-picker>

            <!-- 日期时间期间选择器 -->
            <el-date-picker
                v-if=" item.type == 'dateRange' && item.dateCheckedFormat == 'yyyy-MM-dd hh:mm:ss' "
                v-model="item.value"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm"
                :default-time="['09:00:00', '09:00:00']"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="item.selectionRange == 2 ? pickerOptions2 : item.selectionRange == 3 ? pickerOptions3 : ''" 
                >
            </el-date-picker>

            <!-- 固定数据下拉 -->
            <my-select 
                v-if="item.type == 'appointSelect'"
                :itemData="item"
                :pageType="pageType"
                @selectData="obtSelectData">
            </my-select>

            <!-- 附件 -->
            <my-upload
                v-if="item.type == 'inputFile'"
                :url="`${$util.basePath}/file/${orgId}/uplode`"
                :uploadItem="item" 
                :onSuccess="handleAvatarSuccess"
                :show-file-list="false"
                name="file"
                prompt=""
            ></my-upload>

            <!-- 查询附件，并编辑附件 -->
            <edit-file fileType="read" v-if=" item.type == 'editFile' " @dataList="getFileDataList($event, item)" :pageType="pageType" :params="item" :taskId="processTaskId"></edit-file>

            <!-- 缴费码 -->
            <qr-code v-if=" item.type == 'payCode' " :params="item" :taskId="processTaskId" ></qr-code>

            <!-- 表格 -->
            <my-table v-if=" item.type == 'table' " :tableParams="item" :taskId="processTaskId" :instanceId="instanceId" :pageType="pageType" isEditPage="true"></my-table>

            <!-- 选票 -->
            <el-button 
                v-if=" item.type == 'createVote' " 
                type="primary" size="mini" 
                @click=" showCreateBackDialog = true ">

                {{item.value ? '编辑选票' : '创建选票' }}
            </el-button>
            <el-dialog 
                v-if=" item.type == 'createVote' "
                class="task-detail-dialog dialog"
                :title=" item.value ? '编辑选票' : '创建选票' "
                :visible.sync="showCreateBackDialog"
                width="900px"
                append-to-body
                >
                <create-vote @createBack="createBackFun($event, item)" :paramsId=" item.value ? item.value : 'add' "></create-vote>
            </el-dialog>
            <!-- 编辑器 -->
            <UEditor v-if=" item.type == 'ueditor' " class="marb20" :config="editorConfig" :id="`ueditor${index}`" :ref="`ueditor${index}`"></UEditor>
            <!-- 导出结果 -->
            <export-result v-if=" item.type == 'exportResult' " :itemParams="item" :taskId="processTaskId" :instanceId="instanceId"></export-result>

            <!-- 数据不正确的提示信息 -->
            <div v-if="!(item.value ? item.value instanceof Array ? item.value.length : true : false) && item.isShowPrompt && item.isRequired" class="color-red" style="line-height: 20px;">
                {{item.title}}不能为空
            </div>
            <!-- 跳过审批 -->
            <el-checkbox v-if=" item.type == 'skipApproval' " v-model="item.value">跳过审批</el-checkbox>
        </el-form-item>
        <el-form-item  v-show="taskFirstId != 'other' && !isReject">
          <div style=" ">提示：<span style="color: #FF9800">下一步处理人</span>与<span style="color: #FF9800">下一步处理领导</span>，选择其中一个，另外一个程序将会自动去掉之前选中的人，因为只能选择一个人。</div>
        </el-form-item>
        <!-- 只显示按钮 -->
        <el-form-item>
          <el-button 
            v-for="(item, index) in formData" 
            :key="index"
            v-if=" item.type == 'inputButton' "
            :disabled="pageType == 'org' ? resourceFun(item.buttonMess) : false"
            type="primary"
            size="small"
            @click="submitForm(item.buttonMess, 'formData')">
                {{item.title}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import myUpload     from '../../common/Upload.vue'
  import mySelect     from './Select_Component.vue'
  import myTable      from './Table_Component.vue'
  import editFile     from './Edit_File.vue'
  import exportResult from './Export_Result.vue'
  import qrCode       from './qrCode.vue'
  import CreateVote   from '../../common/vote_activity_list/CreateVote.vue'
  import Ueditor      from '../../common/Ueditor.vue'
  import Query_Tree_Selected      from './Query_Tree_Selected.vue'
  export default {
      components: {
          'my-upload':     myUpload,
          'my-select':     mySelect,
          'my-table':      myTable,
          'create-vote':   CreateVote,
          'UEditor':       Ueditor,
          'edit-file':     editFile,
          'qr-code':       qrCode,
          'export-result': exportResult,
          'tree-selected-last': Query_Tree_Selected,
      },
      props:{
          pageType: 'org', //org为组织工作台，personal为个人工作台
          processName: {   //流程名字
              required: false,
          },
          processTaskId: {   //详情ID
              required: false,
          },
          instanceId: {      
            required: false,
          },
          meetingId: {
            required: false,
          },
          mathRandom: {
              type: Number, 
              required: true,
              default: 0,     //为0不显示弹框
          },
          formMoreDataList: { //传入自定义的表单列表
            type: Array,
            required: false,
            default: [],
          },
          formMoreDataListTypeIds: { //传入自定义Id数组
            required: false, 
          },
          taskFirstId: {  //用来识别是否是特殊的情况
            required: false,
            default:  null,
          },
          requestUrl: null,   //查询表单数据地址
          taskType:   null,   //任务类别
          parentTaskId: null, //父级任务Id
      },
      data() {
          return { 
              isReject:  false,
              isLoad: false,
              orgCode: sessionStorage.getItem('orgCode'),
              orgId: this.pageType == 'org' ? sessionStorage.getItem('orgId') : JSON.parse(sessionStorage.getItem('userData')).partyOrgId,
              resource: JSON.parse(sessionStorage.getItem('resource')),
              radio: "",
              showCreateBackDialog: false,
              editorConfig: {
                elementPathEnabled: false, //是否启用元素路径，默认是true显示
                autoHeightEnabled: false,
                autoFloatEnabled: true,　　//是否工具栏可浮动
                initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: null,
                initialFrameHeight: 450,
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/ueditor/'
              },
              formData: [],  
              fixedTreeMemberCompontentDataOne: { //固定的人员数，每次加载表单时，都固定的在表单中添加一个人员数
                "type": "tree",
                "value": [],
                "requestUrl": "/party_member_infos/partyorgtree",
                "title": "下一步处理人",
                "prompt": "",
                "isRequired": true,
                "isMultiSelection": false,
                "isProcess": false,
                "isKeyPrompt": "",
                "toolTipPortal": {
                  "isShow": false
                },
                "style": {
                  "isActive": false,
                  "iconFontClass": "icon-danxingwenben",
                  "hoverChoice": {
                    "width": 300
                  }
                },
                "backstageKey": [{
                  "keyName": "nextAssignee",
                  "prompt": ""
                }],
                "isCheckbox": 1, //0为多选，1为单选
                "id": 1
              }, 
              fixedTreeMemberCompontentDataTwo: { //固定的人员数，每次加载表单时，都固定的在表单中添加一个人员数
                "type": "tree",
                "value": [],
                "requestUrl": "/party_member_infos/partyorgtree/postion",
                "title": "下一步处理领导",
                "prompt": "",
                "isRequired": false,
                "isMultiSelection": false,
                "isProcess": false,
                "isKeyPrompt": "",
                "toolTipPortal": {
                  "isShow": false
                },
                "style": {
                  "isActive": false,
                  "iconFontClass": "icon-danxingwenben",
                  "hoverChoice": {
                    "width": 300
                  }
                },
                "backstageKey": [{
                  "keyName": "nextAssigneeOrg",
                  "prompt": ""
                }],
                "isCheckbox": 1, //0为多选，1为单选
                "id": 1
              },   
              fixedTreeMemberCompontentDataThree: { //固定的人员数，每次加载表单时，都固定的在表单中添加一个人员数
                "type": "tree",
                "value": [],
                "requestUrl": "/party_member_infos/partyorgtree/postion",
                "title": "下一步处理领导",
                "prompt": "",
                "isRequired": true,
                "isMultiSelection": false,
                "isProcess": false,
                "isKeyPrompt": "",
                "toolTipPortal": {
                  "isShow": false
                },
                "style": {
                  "isActive": false,
                  "iconFontClass": "icon-danxingwenben",
                  "hoverChoice": {
                    "width": 300
                  }
                },
                "backstageKey": [{
                  "keyName": "nextAssigneeOrg",
                  "prompt": ""
                }],
                "isCheckbox": 0, //0为多选，1为单选
                "id": 1
              },         
              showDialog: false,
              pickerOptions2: {    //大于等于 当前时间
                disabledDate(time) {
                  return time.getTime() < Date.now();
                },
              }, 
              pickerOptions3: {    //大于当前时间
                disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7;
                },
              }, 
              isShowTree:    false, // true为显示左侧树， false则为隐藏
              showTreeId: null, //被显示树的Id
          }
      },
      mounted() {
          
      },
      created(){
          this.getFormData(this.processTaskId);
      },
      watch:{
          mathRandom:{
              handler(data){ 
                  if(data != 0) { 
                      this.getFormData(this.processTaskId);
                  }
              },
              deep: true,
          },
      },
      destoryed() {

      },
      methods:{
          /*       
           * 根据ID获取权限, true为禁用，false不禁用
           */
          resourceFun(btnItem){
              if(btnItem){
                  //------------- 不包含resourceId时，不禁用------- 
                  if(!btnItem.hasOwnProperty('resourceId')) return false;
                  
                  //------------- 包含resourceId时，但值为null不禁用------- 
                  if(!btnItem.resourceId) return false;

                  let self = this, bool = true;
                  $.each(self.resource, function(index, item){
                    item == btnItem.resourceId ? bool = false : '';
                  });
                  return bool;
              }
              
           },
          /*
           * 查询表单数据
           */
          getFormData(processTaskId) { 
            if(this.taskFirstId == 'other'){
              this._addKeyName(this.formMoreDataList, 'other');
              this.isLoad = false;
            }else{
              // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this
              this.$request.requestAxios('get', this.requestUrl, '',
              (response) => { 
                  let responseData = response.data;
                  this.isReject = responseData.data.isReject;
                  this._addKeyName(responseData.data.formDataStr ? JSON.parse(responseData.data.formDataStr) : [], '', responseData.data.isReject);
                  this.isLoad = false;
              },(error,status) => {
                status == 200 ? this.$message.error(error.data.meta.message) :
                                this.$message.error(this.requestUrl + processTaskId);
                // --- 清空数据 ----
                this.formData = [];
                this.isLoad = false;
              });
            } 
           },
          /*
           * 在表单数据中添加一个键值，以便表单做非空验证
           * @params {object} data 表单数据
           */
          _addKeyName(data,type,isReject){ 
            let treeCount = 0;
            this.isShowTree = false; // 先设置为隐藏状态
            let isOperation = false; // true不给提示，false给出提示
            if(type == 'other'){ 
              this.fixedTreeMemberCompontentDataThree.id = data.length; 
              this.fixedTreeMemberCompontentDataThree.value = []; 
              data.push(this.fixedTreeMemberCompontentDataThree); 
            }else if(isReject){ //为true不额外添加下级处理人跟下级处理领导

            }else{
              this.fixedTreeMemberCompontentDataOne.id = data.length;
              this.fixedTreeMemberCompontentDataTwo.id = data.length + 1;
              this.fixedTreeMemberCompontentDataOne.value = [];
              this.fixedTreeMemberCompontentDataTwo.value = [];
              data.push(this.fixedTreeMemberCompontentDataOne);
              data.push(this.fixedTreeMemberCompontentDataTwo);
            }  
            if(data.length){ 
                $.each(data, (index, item) => {
                    item[item.backstageKey[0].keyName] = item.value;
                    // --- 显示数据错误的提示信息 ---
                    item.isShowPrompt = false;
                    if(item.type == 'tree'){ //处理人员数
                      treeCount++;
                      this.isShowTree = true;
                      if(treeCount == 1) this.showTreeId = item.id;
                    }else if(item.type == 'inputButton'){ //处理按钮  
                      if(!this.resourceFun(item.buttonMess)){
                        isOperation = true;
                      }
                    }else if(item.type == 'skipApproval'){ //给跳过审批重新赋值
                      item[item.backstageKey[0].keyName] = item.value = this.getSkipApproval(item.backstageKey[0].keyName) == 'true' ? true : false ;
                    }else if(item.type == 'table'){
                      // ---------- 改变单选多选的赋值方式
                      item.operationType == 'radio' ? item.value = "" : item.value = [];
                    }
                });
            }
            if(!isOperation && this.pageType == 'org') this.$message.warning('你没有权限保存数据哦，只可查看该页面!!!!!');
            this.formData = data; 
          },
          /*
           * 查询跳过审批的值,根据键名查询
           */
          getSkipApproval(keyName) {
            if(!this.processTaskId) return false;
            let skipApprovalVal ;
            // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this
            this.$request.requestAxios('get', `${this.$util.basePath}/t_tasks/variable/${this.processTaskId}`, {params: {variableName: keyName}},
              (response) => {
                skipApprovalVal = response.data.data;
              },(error,status) => {
                status == 200 ? this.$message.error(error.data.meta.message) :
                                this.$message.error(`${$util.basePath}/t_tasks/variable/${this.processTaskId}`);
              });
            return skipApprovalVal;
           },

          /*
           * 存储附件数据
           */
          handleAvatarSuccess(res,resFile,fileLists,itemData){
            itemData.value.push({fileId: res.data, fileName: resFile.name, name: resFile.name});
           },
          /*
           * 保存数据
           * @params {object} data 按钮数据
           * @params {string} formName 表单Name
           */
          submitForm(data, formName) {  
            let url = this.pageType == 'org' ? `${basePath}/${data.requestUrl}/from_org/${this.orgCode}` :
                                               `${basePath}/${data.requestUrl}`;
              if (this._fromValidate(this.formData)) {
                this.$request.requestAxios(data.requestMethod.toLowerCase(), url, 
                    this._submitFormParams(data),
                    (response) => {
                        let responseData = response.data;
                        // ----- vuex 的使用，监听气泡是否需要重新获取个数
                        this.$store.commit('watchBubble')
                        this.$message(responseData.meta.message);
                        this.$emit('formDataEmit',response)
                        this.showDialog = false;
                    },(error,status) => {
                        status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error(`/${data.requestUrl}`);
                        this.showDialog = false;
                        this.$emit('formDataEmit','失败')
                    }
                );
              }
           },
          _submitFormParams(data){
              let valueData = {};
              $.each(this.formData, (index, item) => {
                  switch(item.type){
                      case 'payCode':
                          valueData[item.backstageKey[0].keyName] = item.codeUrl;
                          break; 
                      case 'date':
                          valueData[item.backstageKey[0].keyName] = item.value ? new Date(item.value).getTime() : item.value;
                          break; 
                      case 'dateRange':
                          item.value ? item.value[0] = new Date(item.value[0]).getTime() : item.value;
                          item.value ? item.value[1] = new Date(item.value[1]).getTime() : item.value;
                          valueData[item.backstageKey[0].keyName] = item.value;
                          break; 
                      case 'inputButton':

                          break; 
                      case 'skipApproval':
                          valueData[item.backstageKey[0].keyName] = JSON.stringify(item.value);
                          break; 
                      case 'table':
                          if(item.isOperation) valueData[item.backstageKey[0].keyName] = item.value;
                          break; 
                      case 'ueditor':
                          item.value = this.$refs['ueditor'+index][0].getUEContent();                            
                          valueData[item.backstageKey[0].keyName] = item.value;
                          break;
                      case 'tree':
                          valueData[item.backstageKey[0].keyName] = item.valueIdList;
                          break; 
                      default: 
                          valueData[item.backstageKey[0].keyName] = item.value;
                          break;
                  }
              });
              valueData.taskId = this.processTaskId;
              valueData.instanceId = this.instanceId; 
              valueData.typeId = this.taskType;
              valueData.formData = JSON.stringify(this.formData);
              valueData.parentTaskId = this.parentTaskId;
              valueData.meetingId = this.meetingId;
              if(this.taskFirstId == 'other'){
                valueData.partyOrgWrecordTypeIds = this.formMoreDataListTypeIds;
              }

              // ----- 不同的请求方式，传参方式不同 
              switch(data.requestMethod) {
                  case 'GET': 
                      valueData = {params: valueData}
                      break;
                  case 'DELETE': 
                      valueData = {data: valueData}
                      break;
                  default:

                      break;
              }
              return valueData;
           },
          /*
           * 由于键名是动态的，固不能使用elementUI自身的验证，需要自己单独处理
           */
          _fromValidate(data){
            let bool = true;
            data.forEach((item, index) => {
              switch(item.type){
                  case 'ueditor':
                      item.value = this.$refs['ueditor'+index][0].getUEContent();
                      break; 
                  default: 
                      break;
              }
              // ------ 数据不能为null，数组的长度不能为0，必须是必填项
              if(!( item.value ? item.value instanceof Array ? item.value.length : true : false) && item.isRequired){
                  item.isShowPrompt = true;
                  bool = false
              }
            });
            return bool;
          },
          /*
           * 获取下拉组件中的最终选中的数据
           */
          obtSelectData(data){
              this.formData[data.id] = data;
           },
          /*
           * 选票回调
           * @params {string/number} 子组件返回的数据，
           * @params {object} item 父组件自身数据
           */
          createBackFun(data, item){
              item.value = data;
              this.showCreateBackDialog = false;
              
           },
          getFileDataList(data, item){
              item.value = data;
          },
          /*
           * 表格数据组装
           */
          tableItemConvert(item){
              item.operationType == 'radio' ? item.value = "" : item.value = [];
              return item;
          },
          /*
           * 获取树结构的值
           */
          treeValDataFun(val, itemData){ 
            val = Array.isArray(val) ? val : [val];
            // ---- 显示在页面上的用户名
            itemData.value = [];
            // ---- 存储在数据库中的数据Id
            itemData.valueIdList = []
            val.forEach( (item) => {
              itemData.value.push(item.name);
              itemData.valueIdList ? itemData.valueIdList.push(item.id) : '';
            });  

            if(itemData.backstageKey[0].keyName == "nextAssignee"){ //最后一个清空数据
              if(this.taskFirstId != 'other'){ //为这种类型的情况下，表示只会出现一个组织树
                this.formData[this.formData.length-1].value = [];
                this.formData[this.formData.length-1].valueIdList = null; 
                this.formData[this.formData.length-1].isRequired = false;
                this.formData[this.formData.length-2].isRequired = true;
              }

            }else if(itemData.backstageKey[0].keyName == "nextAssigneeOrg"){ //倒数第二个清空数据
              if(this.taskFirstId != 'other'){ //为这种类型的情况下，表示只会出现一个组织树
                this.formData[this.formData.length-2].value = [];
                this.formData[this.formData.length-2].valueIdList = null; 
                this.formData[this.formData.length-2].isRequired = false;
                this.formData[this.formData.length-1].isRequired = true;
              } 
            }

          }
      }
  }
</script>