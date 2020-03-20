/****************************************
*  create by xieyuanyuan date 2018/05/21
*  首页管理-写信
****************************************/
<template>
  <div>
  <!-- 面包屑 -->
  <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{paramsName}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-main class="write_letters">
    <!-- 书记信箱表单 -->
    <task-form pageType="home" processTaskId="" :requestUrl="`${$util.basePath}/t_form_data/first/${paramsId}`" processName="新建投票" instanceId="" mathRandom="1" @formDataEmit="formDataEmitFun"></task-form>
  </el-main>
  </div>
</template>

<script>
  import Task_Form from '../task_manage/detail/Task_Form.vue'
  export default {
    components: {
      "task-form":  Task_Form, //任务表单  
    },
    data() {
      return {
        paramsId: this.$route.params.id,
        paramsName: this.$route.params.name,
        userData: JSON.parse(sessionStorage.getItem('userData')),
        orgCode:   sessionStorage.getItem('orgCode'), //党组织code
        orgId:     sessionStorage.getItem('orgId'),   //党组织code
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
        partyOrgData: [], //组织数据
        partyProps: {     //组织级联效果需要的数据
          value: 'id',
          children: 'persons'
        },
        form: {
          "addresseeId": null, //发件人Id
          "anonym":      false, //为true就是匿名
          "content":     null, //邮件内容
          "name":        null, //邮件标题
          "orgId":       parseInt(sessionStorage.getItem('orgId')),
        }
      }
    },
    created(){
    },
    mounted(){
    },
    methods: {
      formDataEmitFun(response){
        this.$message.success(response.data.meta.message + '，可在个人中心查看信箱！')
      },
    },  
  };
</script>
<style type="text/css">
  .write_letters .edui-default .edui-editor{
     z-index: 1!important;
  }
</style>
