/*************************************
*  create by xieyuanyuan date 2018/05/30
*  首页管理 - 组织工作台 - 基本信息
**************************************/ 
<template>
  <div class="personal-message content-manage personal-top">
    <!-- 个人基本信息 -->
    <div class="personal-wrapper">
      <h1 class="title marb20">|| 党组织基本信息</h1>
      <el-form v-loading="isLoad" ref="form" size="small" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark photo-message">
              <div class="photo">
                <el-upload
                  class="avatar-uploader"
                  :action="basePath + '/sys/ueditor/exec?action=uploadimage'"
                  :headers="{Authorization: 'Bearer ' + userData.token}"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  name="upfile"
                  :disabled="!resourceManage.isUpdateMessage"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.headImg" :src="form.headImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="other">
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <el-form-item label="名称:">
                      <el-input :disabled="!resourceManage.isUpdateMessage" style="width: 100%" v-model="form.name"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <el-form-item
                      prop="latitude"
                      label="所在地"
                      :rules="{ required: true, message: '地址解析失败', trigger: 'blur'}">
                      <el-input :disabled="!resourceManage.isUpdateMessage" v-model="form.address" type="text"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <el-form-item label="邮箱:">
                      <el-input :disabled="!resourceManage.isUpdateMessage" style="width: 100%" v-model="form.email"></el-input>
                    </el-form-item>
                  </div>           
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <el-form-item label="电话:">
                      <el-input :disabled="!resourceManage.isUpdateMessage" style="width: 100%" v-model="form.phoneNum"></el-input>
                    </el-form-item>
                  </div>
                </el-col>                
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="简介:">
                <el-input :disabled="!resourceManage.isUpdateMessage" type="textarea" v-model="form.description"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="resourceManage.isUpdateMessage">
           <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="updateMesg">基本信息提交</el-button>
            </el-form-item>
           </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 编辑器 -->
    <div class="personal-wrapper">
      <el-tabs v-model="activeName" type="card" editable @tab-click="richHandleClick"  @edit="handleTabsEdit">
        <el-tab-pane v-for="(item, index) in richTextList" :key="index" :label="item.name" :name="index"></el-tab-pane>
        <el-tab-pane :disabled="!resourceManage.isAddRichText" label="新增" name="add"></el-tab-pane>
      </el-tabs>
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item v-if="activeName == 'add'" label="文本标题：">
            <el-input v-model="richTextForm.name"></el-input>
          </el-form-item>
          <UEditor class="marb20" id="ueditor" :config="editorConfig" ref="ueditor"></UEditor>
          <el-form-item class="text-center padt20">

            <el-button 
              v-show="richTextBtn.isAddBtn"
              :disabled="!resourceManage.isAddRichText" 
              type="primary" 
              style="width: 400px;" 
              size="" @click="saveRichText">
              保存文本
            </el-button>

            <el-button 
              v-show="richTextBtn.isupdateBtn"
              :disabled="!resourceManage.isUpdateRichText" 
              type="primary" 
              style="width: 400px;" 
              size="" @click="saveRichText">
              保存文本
            </el-button>

          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Ueditor from '../common/Ueditor.vue'
  export default {
    components: {
        'UEditor': Ueditor,
    },
    data() {
      return {
        isLoad:         true,
        basePath:       basePath,
        resource:       JSON.parse(sessionStorage.getItem('resource')),
        resourceManage: {      //权限管理, 为false按钮不能操作
          isUpdateMessage: false,
          isAddRichText:   false,
          isUpdateRichText:false,
          isDelRichText:   false,
        }, 
        richTextBtn: {    //富文本按钮
          isAddBtn:  false,
          isupdateBtn : false, 
        },
        paramId:        this.$route.params.id,
        userData:       JSON.parse(sessionStorage.getItem('userData')),
        orgCode:        sessionStorage.getItem('orgCode'),
        orgId:          sessionStorage.getItem('orgId'),
        activeName:     'add', 
        richTextList:   [], //富文本列表信息
        form:{
          "address":        null,
          "description":    null,
          "latitude":       null,
          "longitude":      null,
          "name":           null,
          "headImg":        null,
          "phoneNum":       null,
          "email":          null,
        },
        richTextForm:{
          "content": null,
          "id": 0,
          "name": null,
          "partyOrgId": sessionStorage.getItem('orgId'),
        },
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
      }
    },
    watch: {
      "form.address": {
        handler (data) {
          if(data){ 
            // ----- 解析地址
            this.checkAddress()
          }
        },
        deep: true
      },
      /*
       *  当tab的状态值改变，富文本保存按钮切换
       */
      activeName(item){
        if( item == 'add' ){
          this.richTextBtn.isAddBtn = true;
          this.richTextBtn.isupdateBtn = false;
        }else{
          this.richTextBtn.isAddBtn = false;
          this.richTextBtn.isupdateBtn = true;
        }
       }
    },
    created(){
      // ------- 当参数是':id'时，直接使用存储好的orgId ------- 
      this.paramId == ':id' ? this.paramId = sessionStorage.getItem('orgId') : sessionStorage.setItem('orgId', this.paramId); 
    },
    mounted() {
      // ---- 获取权限 ----
      this.resourceFun();

      this.getQueryOrgDetail();

      this.getQueryRichTextListById();
    },
    methods:{
      /*
      * 获取权限
      */
      resourceFun(){
        let self = this;
        $.each(self.resource, function(index, item){
          switch(item){
            case 21:
              self.resourceManage.isUpdateMessage = true;
              break;
            case 29:
              self.resourceManage.isAddRichText = true;
              break;
            case 30:
              self.resourceManage.isUpdateRichText = true;
              break;
            case 31:
              self.resourceManage.isDelRichText = true;
              break;
          }
        });
      },
      /*
      * 查询组织基本信息
      */
      getQueryOrgDetail(){
        let self = this;
        
        this.$request.requestAxios('get', basePath + '/party_orgs/'+ self.paramId +'/partyorg', "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            if(responseData.data){
              self.form = responseData.data;
            }
            self.isLoad = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/'+ self.paramId +'/partyorg - 失败');
            self.isLoad = false;
          });
      },
      /*
      * 修改个人信息
      */
      updateMesg(){
        let self = this;
        this.$request.requestAxios('patch', basePath + '/party_orgs/partyorg/update/'+ self.paramId +'/from_org/'+self.orgCode, self._updateMesgParam(),
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.getQueryOrgDetail();
            self.$message('修改信息成功！', 20);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/'+ self.paramId +'/partyorg - 失败');
          });
      },
      _updateMesgParam(){
        return {
          "address":        this.form.address,
          "description":    this.form.description,
          "latitude":       this.form.latitude,
          "longitude":      this.form.longitude,
          "name":           this.form.name,
          "headImg":        this.form.headImg,
          "phoneNum":       this.form.phoneNum,
          "email":          this.form.email,
        }
      },
      /*
      * 图片上传成功后
      */
      handleAvatarSuccess(res, file) {
        this.form.headImg = res.path;
       },
      /**
       * 地址校验, 根据输入的内容校验经纬度字段
       * @return {[type]} [description]
       */
      checkAddress () {
        if(this.form.address) {
          this.mapLocation(this.form.address)
        } else {
          this.form.latitude  = null
          this.form.longitude = null
          this.$refs.form.validate();
        }
       },
      /**
       * 根据输入的地址返回经纬度
       * @return {object} 包含经纬度的对象
       */
      mapLocation (address) {
        let self = this
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 调用查询(异步)
        myGeo.getPoint(address, function(point){
          if (point) {
            self.form.latitude  = point.lat
            self.form.longitude = point.lng
            self.$refs.form.validate();
          }else{
            self.form.latitude  = null
            self.form.longitude = null
            self.$refs.form.validate();
          }
        }, "");
       },
      /*
      * 上传头像验证
      */
      beforeAvatarUpload(file) {
        const isJPG = file.type;
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (isJPG != "image/png" && isJPG != "image/jpeg" && isJPG != "image/bmp" && isJPG != "image/jpg") {
          this.$message.error('上传头像格式.png, .jpeg, .bmp, jpg!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /*
       * 根据组织ID获取所有的富文本信息
       */
      getQueryRichTextListById(){
        this.$request.requestAxios('get', basePath + '/party_orgs_rich_text/rich_text/idandname', 
            {params: {partyOrgId: this.orgId}},
          (response) => { //请求成功的回调...
            this.richTextList = response.data.data;
            this._richTextList(this.richTextList);
          }, (error,status) => { //请求失败的回调...
            status == 200 ? this.$message(error.data.meta.message) :
                            this.$message('/party_orgs_rich_text/rich_text/idandname - 失败');
        });
       },
       /*
        * 根据文本列表长度来判断，该显示新增，还是编辑
        */
      _richTextList(data){
        if(this.richTextList.length){ 
            this.activeName = '0';
            this._rictTextDetail();
            this.richTextBtn.isAddBtn = false;
            this.richTextBtn.isupdateBtn = true;
        }else{// ----------- 当列表没有数据，将activeName值，赋值为add ----------------
          this.activeName = 'add';
          this.richTextForm.name = null;
          this.richTextForm.content = null;
          this.$nextTick(() => {
            this.$refs.ueditor.setUEContent('请输入内容');
          });
          this.richTextBtn.isAddBtn = true;
          this.richTextBtn.isupdateBtn = false;
        }
      },
      /*
       * 根据富文本Id查询富文本信息
       */
      getRichTextDetailById(){
        this.$request.requestAxios('get', basePath + '/party_orgs_rich_text/rich_text/details/',
            {params: {id: this.richTextForm.id}},
          (response) => { //请求成功的回调...
            // ------------- 将数据绑定在编辑器中 -----------------
            this.$nextTick(() => {
              this.$refs.ueditor.setUEContent(response.data.data.content);
            });
          }, (error,status) => { //请求失败的回调...
            status == 200 ? this.$message(error.data.meta.message) :
                            this.$message('/party_orgs_rich_text/rich_text/details/ - 失败');
        });
      },
      /*
       * 切换文本标签，查询富文本数据
       */
      richHandleClick(){
        switch(this.activeName){
          case 'add':
            // ----- 重置表单数据 -------
            this.richTextForm.name = null;
            this.richTextForm.content = null;
            this.$refs.ueditor.setUEContent('请输入内容');
            break;
          default:
            this._rictTextDetail();
            break;
        }
      },
      /*
       * 编辑tab
       */
      handleTabsEdit(targetName, action){
        if (action == 'remove') {
           if(targetName != 'add' && this.resourceManage.isDelRichText){
              this._delRichtextById();
           }else if(!this.resourceManage.isDelRichText){
              this.$message.warning('不能删除，没有此权限！');
           }
        }
      },
      /*
       * 根据Id删除富文本
       */
      _delRichtextById(){
        this.$request.requestAxios('delete', 
              `${basePath}/party_orgs_rich_text/rich_text/delete/${this.richTextForm.id}/from_org/${this.orgCode}`, '',
            (response) => { //请求成功的回调...
              this.getQueryRichTextListById();
            }, (error,status) => { //请求失败的回调...
              status == 200 ? this.$message(error.data.meta.message) :
                              this.$message(`${basePath}/party_orgs_rich_text/rich_text/delete/${this.richTextForm.id}/from_org/${this.orgCode}- 失败`);
          });
      },
      _rictTextDetail(){
        // ------------- 富文本表单赋值 ---------------
        this.richTextForm.name = this.richTextList[this.activeName].name;
        this.richTextForm.id = this.richTextList[this.activeName].id;
        if(this.activeName != 'add')
          this.getRichTextDetailById();
      },
      /*
       * 保存富文本信息
       */
      saveRichText(){
        switch(this.activeName){
          case 'add':
            this.addRichText();
            break;
          default:
            this.updateRichText();
            break;
        }
      },
      /*
       * 新增富文本
       */
      addRichText(){
        this.$request.requestAxios('post', basePath + '/party_orgs_rich_text/rich_text/add/from_org/' + this.orgCode, this._richTextParams(),
          (response) => { //请求成功的回调...
            this.getQueryRichTextListById();
            this.$message.success(response.data.meta.message);
          }, (error,status) => { //请求失败的回调...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/party_orgs_rich_text/rich_text/add/from_org/ - 失败');
        });
       },
       /*
       * 修改富文本
       */
      updateRichText(){
        this.$request.requestAxios('patch', basePath + '/party_orgs_rich_text/rich_text/update/'+ this.richTextForm.id +'/from_org/' + this.orgCode, this._richTextParams(),
          (response) => { //请求成功的回调...
             this.getQueryRichTextListById();
             this.$message.success(response.data.meta.message);
          }, (error,status) => { //请求失败的回调...
            status == 200 ? this.$message.error(error.data.meta.message) :
                            this.$message.error('/party_orgs_rich_text/rich_text/update/1/from_org/ - 失败');
        });
       },
      _richTextParams(){
        return {
          "content": this.$refs.ueditor.getUEContent(),
          "name": this.richTextForm.name,
          "partyOrgId": sessionStorage.getItem('orgId'),
        }
      },
    }
  }
</script>