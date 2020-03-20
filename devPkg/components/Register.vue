<template>
  <div class="login-wrap register-wrap">
    <div class="login-form-wrap register-form-wrap">
      <h2>注册账号</h2>
      <el-form ref="formRef" :model="form" label-width="110px">
        <el-form-item 
          prop="name"
          label="姓名:"
          :rules="[
            { required: true, message: '请填写姓名', trigger: 'blur' },]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>  
        <el-form-item 
          prop="idNumber"
          label="身份证号:"
          :rules="[
            { required: true, message: '请填写身份证号', trigger: 'blur' },
            { validator: idNumberCodeValid, trigger: 'blur' }]">
          <el-input v-model="form.idNumber"></el-input>
        </el-form-item>
        <el-form-item 
          prop="password"
          label="密码"  
          :rules="[
            { required: true, message: '请填写密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }]">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item 
          prop="mobilNumber"
          label="手机号码:"
          :rules="[
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误' , trigger: blur }]">
          <el-input v-model="form.mobilNumber"></el-input>
        </el-form-item>
        <el-form-item 
          prop="orgId"
          label="所属工司组织:"
          :rules="[
            { required: true, message: '请选择所属公司组织', trigger: 'blur' },]">
           <tree-selected-last 
            :mathRandom="1"
            pageType="register"
            class="marb20" 
            :paramsData="paramsData"
            isEditPage="0"
            isCheckbox="1"
            @treeValData="treeValDataFun"> 
          </tree-selected-last>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button class="submit-btn" @click="submit('formRef')" type="primary">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
          <el-button class="fr" @click="$router.push({path: '/login'})" type="text">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script> 
  import '../styles/login.less'
  import Query_Tree_Selected from './task_manage/detail/Query_Tree_Selected.vue'
  export default {
    components: { 
      'tree-selected-last': Query_Tree_Selected,
    },
    data() {
      return{
        paramsData: {
          requestUrl: '/org_units/orgunitstree/register',
          value: null,
          checkboxType: true,
        },
        form:{
          name:         null, 
          password:     null,
          idNumber:     null,
          mobilNumber:  null,
          orgId:        null,
        }
      }
    },
    created(){ 
      // --------- 键盘时间的监听
      window.addEventListener('keypress', this.pressEnter);  
    },
    mounted(){ 

    },
    methods: {
      pressEnter(){
        
      },
      submit(formName){ 
        this.$refs[formName].validate((valid) => {
          if (valid) { 
            this.axios.post(basePath + '/hr_users/register', this.form).then((response) => {
              if(response.data.meta.code == 0){
                this._remind(response.data.data);
              }else{
                this.$message.error(response.data.meta.message);
              }
            }).catch( (error) => {
              this.$message.error('注册失败!!!');
            });
          } else { 
            return false;
          }
        });
        
      },
      _remind(asscount){
        this.$alert(`你的账号注册成功了，请用此 "${asscount}"，去登录吧！！！！！！！`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({path: '/login'});
          }
        });
      },
      treeValDataFun(val){
        this.form.orgId = val.id;
      },
      /*
       * 验证身份证号码是否正确
       */
      idNumberCodeValid(rule, value, callback){
        if (value) {
          if(!this.$util._identityCodeValid(value)){
            callback(new Error('请填写正确的身份证号码'));
          }else{
            callback();
          }
        } else {
          callback();
        }
      },
      validatePass(rule, value, callback) {
        if (value.length < 6) {
          callback(new Error('密码长度必须是6位以上!'));
        }else {
          callback();
        }
      }
    }
  }
</script>
<style lang="less">
  .register-wrap{
    padding-top: 20px!important;
    padding-bottom: 20px;
    overflow: auto;
    .register-form-wrap{
      width: 50vw!important;
    }
    .submit-btn{
      width: 100%;
      font-size: 18px;
      font-weight: 700;
    }
  }
</style>