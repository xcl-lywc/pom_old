/**********************************
*  create by xieyuanyuan date 2018/05/04
*  更换背景组件
**********************************/    
<template>
  <div style="display: inline-block;"> 
    <el-dropdown v-if="userData" class="marl20 dropdown-home" @command="jumpPage">
      <span class="el-dropdown-link">
        <el-badge v-if="$store.state.homeBubbleStatus" is-dot class="item">
          <img src="static/images/user_icon.png">
        </el-badge>
        <img v-else src="static/images/user_icon.png">
      </span> 
      <el-dropdown-menu class="dropdown-menu-home" slot="dropdown">
        <el-dropdown-item v-if="userData" command="img" class="user-info">
          <img  :src="userData.picture" alt="" class="user-img">
          <span class="user-detail">
            <span class="user-name">姓名: {{ userData.name }}</span>
            <span class="user-org">公司: <span :title="userData.orgName">{{ userData.orgName }}</span></span>
          </span>
        </el-dropdown-item>

        <el-dropdown-item v-if=" pageType == 'home' || pageType == 'personal' " v-for="(item, index) in userData.positions" :command="item" :index="index" :key="index">
          <menu-assemble-bubble :requestUrl="`/t_tasks/home/${item.orgid}`" requestParams="" :showData="item.orgName"></menu-assemble-bubble>
        </el-dropdown-item>

        <el-dropdown-item  v-if=" pageType == 'home' || pageType == 'org' " command="personal" index="personal" key="personal">
          <menu-assemble-bubble requestUrl="/t_tasks/home" requestParams="" showData="个人中心"></menu-assemble-bubble>
        </el-dropdown-item>
        <el-dropdown-item command="btn">
          <el-row class="text-right">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-button size="mini" type="primary" @click="checkBtn">
                  签到<i v-if="checkStatus" class="el-icon-circle-check-outline"></i>
                </el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-button size="mini" type="primary" @click="unlogin">退出登录</el-button>
              </div>
            </el-col>
          </el-row>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <i  
      title="帮助" 
      v-if="pageType == 'personal' || pageType == 'org'" 
      class="el-icon-question"
      @click=" goToInstrutions "></i>
  </div>
</template>

<script>
  import ChidMenuAssembleBubble from '../common/ChidMenuAssembleBubble.vue'
  import '../../styles/fixedBlock.less'
  export default {
    props:{
      pageType: 'home', //home为首页，personal为个人中心，org为组织中心
    },
    components: {
      'menu-assemble-bubble': ChidMenuAssembleBubble, //冒泡组件
    },
    data() {
      return {
        date:        null,
        userData:    JSON.parse(sessionStorage.getItem('userData')),
        checkStatus: false,
      }
    },
    created () { 
    },
    mounted() {
      this.dateCovert();
      this.getCheckStatus();
    },
    watch: {
    },
    destoryed() {
    },
    methods:{
      /*
      * 时间拼接
      */
      dateCovert(){
        let myDate = new Date(),
            week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
        this.date = "阳历 " + myDate.getFullYear() + "年" + 
                  ( myDate.getMonth() + 1 ) + "月" + 
                  myDate.getDate() + "日&nbsp;&nbsp;&nbsp;&nbsp;" + 
                  week[myDate.getDay()];
      },
      /**
       * 获取签到状态
       * @return {[type]} [description]
       */
      getCheckStatus () {
        this.$request.requestAxios("get", `${basePath}/hr_user_sign/sign`, null, (response) => {
          if(!response.data.data) {
            this.checkStatus = false
          } else {
            this.checkStatus = response.data.data.sign;
          }
        }, (error, status) => {
          status == 200 ? this.$message.error(error.data.meta.message) :
                         this.$message.error("获取签到信息失败")
        })
      },
      /*
      * 页面跳转并用sessionStorage记录code
      * @param {string} data
      */
      jumpPage(data){
        switch(data){
          case 'personal':                  //个人工作平台
              // -----------页面跳转
              this.$router.push({path: '/mycalendar'});
            break;
          case 'img':
            break;
          case 'btn':
            break;
          default: 
              sessionStorage.setItem('orgId', data.orgid);   //组织Id
              // 将之前的党支部信息清空
              this.$util.org.orgChlidrensimple = null;
              this.$util.org.partyorg = null;
              // -----------页面跳转
              this.$router.push({path: '/organizational_building'});
            break;
        }
      },
      
       /*
        * 签到
        */
      checkBtn(){
        this.$request.requestAxios("post", `${basePath}/hr_user_sign/add`, null, (response) => {
          if(response.data.meta.code == 0){
            this.$message.success("签到成功")
            this.checkStatus = true
          } else {
            this.$message.error(response.data.meta.message)
          }
        }, 
        (error, status) => {
          status != 200 ? this.$message.error(error.data.meta.message) : this.$message.error(error.response.data.meta.message) 
        })
       },
       /*
        * 退出登录
        */
      unlogin(){ 
        this.$request.requestAxios("get", `${basePath}/login/out`, null, (response) => {
          // // -----------页面跳转
          // this.$router.push({path: '/login'});
          // sessionStorage.removeItem("typeName");
          // sessionStorage.removeItem("typeId");
          // sessionStorage.removeItem("userData");
          // this.$store.state.socket.close();
        }, (error, status) => {
          status == 200 ? this.$message.error(error.data.meta.message) :
                         this.$message.error("获取签到信息失败")
        })
       },
      /*
       * 跳转到产品说明页面
       */
      goToInstrutions(){ 
        sessionStorage.setItem("instructionsRebound" , this.$route.path);
        this.$router.push({name: 'InstructionsPage'});
      }
    }
  }
</script>

<style scoped>
  .search-group {
    margin: 0 15px;
    width: 25vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>