<template>
  <div id="task-flowchart" style="height: 100%;padding: 10px;"> 
    <el-container>
      <!-- 左侧导栏 -start -->
      <el-aside width="300px" style="background-color: rgb(238, 241, 246);margin-top: 20px;"> 
        <el-button
          type="text"
          size="small"
          @click="() => appendType('add')">
          新增分类
        </el-button>
        <el-tree 
          :expand-on-click-node="false"
          node-key="id"
          :data="wrecordTypeData" 
          :props="defaultProps" 
          @node-click="handleNodeClick">
          <span  class="fill-width" slot-scope="{ node, data }" @mouseover=" tempAtId = data.id" @mouseout="tempAtId = null">
            <span :class="{'text-blue' : data.id == (activeTypeItem ? activeTypeItem.id : '')}">{{ node.label }}</span> 
            <span v-show="tempAtId == data.id && !data.parentId" class="tree-right-operate">
              <el-button
                type="text"
                size="mini"
                @click="appendType('edit', data)">
                编辑
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => deleteType(data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <!-- 左侧导栏 - end -->
      <el-container class="mar20" v-if="activeTypeItem ? activeTypeItem.parentId : ''"> 
        <el-main>
          <!-- 没key组件库 -->
          <org-no-key-form-component ref="formComponent"  :objProps="hasKeyComponentList" :countNum="countNum"  @storageData="storageDataFun" :backStorageKeyArray="comBackStorageKeyArray" ></org-no-key-form-component>
          <div class="marb20">
            <el-upload
              ref="uplode"
              class="upload-demo mart20"
              :headers="{Authorization: 'Bearer ' + userData.token}"
              :action="`${$util.basePath}/file/${orgId}/uplode`"
              :on-preview="handlePreview"
              :on-remove="handleRemove" 
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">添加模板</el-button>  
            </el-upload>
            <div v-if="template"> 
              <el-button 
                  class="el-button-ma" 
                  type="text"
                  style="padding:0;">
                      <span @click="$util.downloadFile(template.id)">{{template.name}}</span>
              </el-button> 
            </div>
          </div>
          <div class="">
            <el-row>
              <el-button size="small" type="primary" @click="saveCom">保存组件</el-button> 
            </el-row>
          </div>
        </el-main>
      </el-container> 
    </el-container>
    <el-dialog
      class="add-task-dialog dialog"
      :title="opearType == 'add' ? '新增类型' : '编辑类型'"
      :visible.sync="checkFromTypeDialog" 
      width="50%">
      <div class="mart20">
        <el-form :model="orgForm" ref="orgForm" label-width="120px" size="small">
          <el-form-item
            prop="name"
            label="一级名称"
            :rules="{ required: true, message: '请输入组织名称', trigger: 'blur' }">
            <el-input v-model="orgForm.name"></el-input>
          </el-form-item>  
          <el-form-item
            prop="childIds"
            label="二级类型"
            :rules="{ required: true, message: '请添加二级', trigger: 'blur' }"> 
            <el-tree 
              ref="childTree"
              show-checkbox
              :expand-on-click-node="false"
              node-key="id"
              :data="childrenWrecordTypeData" 
              :default-checked-keys="childrenShowIds"
              :props="defaultProps"  > 
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkFromTypeDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('orgForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script> 
  import orgNoKeyFormComponent from './NoKey_Compontent.vue'  
  export default {
    components: {
      'org-no-key-form-component': orgNoKeyFormComponent,  
    },
    data(){
      return { 
        checkFromTypeDialog:   false, 
        orgId:    this.type == 'org' ? 
                            sessionStorage.getItem('orgId') : 
                            JSON.parse(sessionStorage.getItem('userData')).orgId,     //党组织id
        userData: JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        wrecordTypeData:        [], 
        activeTypeItem:         null, //被选中类型
        hoverTypeItem:          null, //浮动被选中的数据
        opearType:             'add', //add添加，edit编辑
        tempAtId:              null,
        orgCode:  sessionStorage.getItem('orgCode'),   //党组织code
        hasKeyComponentList:    [], //有key组件库
        comBackStorageKeyArray: [], //组件包含的键数组 
        countNum:               0,  //计数器  
        template:               null,//添加模板
        fileList:               [],
        childrenWrecordTypeData:[],
        childrenShowIds:        [], //子节点类型回显数据
        defaultProps: {
          children: 'childrens',
          label: 'name'
        },
        orgForm: {
          name:     null,
          childIds: null,
        },
      }
    },
    props: {
      treeId: {
        type: Number,
        required: true
      }
    },
    watch: { 
      treeId: {
        handler(newV, oldV){ 
          this.getWrecordType();
        },
        deep: true,
      }
    },
    mounted(){ 
      this.getWrecordType();  
      this.getChildrenWrecordType();
    },
    methods: { 
      /*
       * 工作记录类型
       */
      getWrecordType(){  
        this.$request.requestAxios('get', `${this.$util.basePath}/wrecord/type/from_org/${this.orgCode}`, null, (response) => {
          this.wrecordTypeData = response.data.data;
          if(!this.wrecordTypeData) return false;
          this.activeTypeItem = this.wrecordTypeData[0];  
        }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
              this.$message.error(`wrecord/type - get失败`);
            },
        ); 
      },
      /*
       * 查询所有二级工作记录类型
       */
      getChildrenWrecordType(){  
        this.$request.requestAxios('get', `${this.$util.basePath}/wrecord/type/list`, null, (response) => {
          this.childrenWrecordTypeData = response.data.data; 
        }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
              this.$message.error(`wrecord/type - get失败`);
            },
        ); 
      },
      /*
       * 获取数据库已经被保存的组件list
       * key 查询的是第一级类型下面的组件，form查询的是第二类型下面的表单
       */
      getComponent(typeId){     
        this.$request.requestAxios('get', `${this.$util.basePath}/wrecord/form/from_org/${this.orgCode}`, {params:  {"ids": typeId }}, (response) => { 
          this.template = response.data.data ? response.data.data[0].template : null;
          this.hasKeyComponentList = response.data.data ? response.data.data.length ? response.data.data[0].inputs : []: []; 
          this.hasKeyComponentList ? this._comBackStorageKeyArray(this.hasKeyComponentList) : ''; 
          this.countNum++;
        }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
              this.$message.error(`wrecord/form/from_org - get失败`);
            },
        );
      },
      /*
       * 将有key组件库的键名组装在一个数组中
       */
      _comBackStorageKeyArray(data){   
        this.comBackStorageKeyArray = []; 
        data.forEach((item, index) => {
          this.comBackStorageKeyArray.push({
            'keyName': item.backstageKey[0].keyName,
            'transStorIndex': index,
            'id':      0,
          });
        })
      }, 
      /*
       * 左边树点击单个类型，获取类型详情
       */
      handleNodeClick(ev){
        this.activeTypeItem = ev; 
        if(ev.typeId)
          this.getComponent(ev.typeId); 
      },
      /*
       * 保存有key的组件库
       */
      storageDataFun(data){
        this.hasKeyComponentList = data;
       },   
      saveCom(){
        if(this._validateForm()){
          this.$request.requestAxios('post', `${this.$util.basePath}/wrecord/form/from_org/${this.orgCode}`, 
            {id:this.activeTypeItem.typeId, form: this.hasKeyComponentList ? this.hasKeyComponentList : [], template: this.template}, (response) => { 
            this.$message.success(response.data.meta.message);
          }, (error, status) => {
                status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`wrecord/form/from_org - post失败`);
              },
          );
        }else{
          this.$message.error('请将组件里面的信息填写完整！')
        }
      },
      /*
       * 有一个组件的键名为null的情况下，都不能保存数据
       */
      _validateForm(){ 
        if(!this.hasKeyComponentList) return true;
        let bool = true;
        this.hasKeyComponentList.forEach( (item) => {
          if(!item.backstageKey[0].keyName && item.type != 'inputButton'){
            bool = false;
          }
        })
        return bool;
      },
      handleAvatarSuccess(response, file){
        this.template = {id: response.data, name: file.name};
        this.$refs.uplode.clearFiles();
      },
      /*
       * 添加类型
       */
      appendType(type,data){ 
        this.childrenShowIds = [];
        if(type == 'edit'){ 
          this.orgForm.name = data.name; 
          data.childrens.forEach( (item) => {
            this.childrenShowIds.push(item.typeId);
          }) 
          this.$refs.childTree ? this.$refs.childTree.setCheckedKeys(this.childrenShowIds) : '';
        }else{
          this.orgForm.name = null;
        }
        this.hoverTypeItem = data;
        this.opearType = type;
        this.checkFromTypeDialog = true;  
      },
      submitForm(formName){
        if(this.opearType == 'edit'){
          this.orgForm.id = this.hoverTypeItem.id;
        }else{
          this.orgForm.id = null;
        }
        this.orgForm.childIds = this.$refs.childTree.getCheckedKeys();
        this.$refs[formName].validate((valid) => {
          if (valid) {   
            this.$request.requestAxios('post', `${this.$util.basePath}/wrecord/type/from_org/${this.orgCode}`, this.orgForm, (response) => { 
              this.$message.success(response.data.meta.message);
              this.getWrecordType();
              this.checkFromTypeDialog = false;
              this.getChildrenWrecordType();
             }, (error, status) => {
              this.checkFromTypeDialog = false;
                status == 200 ? this.$message.error(error.data.meta.message) : 
                this.$message.error(`wrecord/form/from_org - post失败`);
              });
          } else { 
            return false;
          }
        });
      },
      /*
       * 删除类型
       */
      deleteType(data){
        this.$request.requestAxios('delete', `${this.$util.basePath}/wrecord/type/from_org/${this.orgCode}`, {data: {id: data.id}}, (response) => { 
          this.$message.success(response.data.meta.message);
          this.getWrecordType(); 
          this.getChildrenWrecordType();
         }, (error, status) => { 
            status == 200 ? this.$message.error(error.data.meta.message) : 
            this.$message.error(`wrecord/form/from_org - post失败`);
          });
      }
    }
  };
</script>

<style scoped>
   
</style>