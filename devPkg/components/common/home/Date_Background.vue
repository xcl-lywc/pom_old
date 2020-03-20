/**********************************
*  create by xieyuanyuan date 2018/05/04
*  更换背景组件
**********************************/    
<template>
  <div class="date-background pad-l20 pad-r20">
    <div class="fl" v-html="date"></div>
    <div class="fl marl20" v-if="$store.state.currentPartyOrg">
      <el-dropdown class="marr10" split-button type="primary" @click="dropdownHandleClick"  @command="dropdownHandleCommand">
        {{$store.state.currentPartyOrg.name}}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  
            v-for="(item, index) in partyOrgsListData" :key="index"
            :command="item">
            {{item.name}}
          </el-dropdown-item> 
        </el-dropdown-menu>
      </el-dropdown>欢迎您！
      <!-- <el-button type="text" 
        style="font-size: 16px;" 
        @click=" $router.push({name:'Org_Message', params: {id: userData.committeeId} }) ">{{userData.committeeName}}
      </el-button> -->

    </div>

    <div class="fr">
      <el-button disabled class="line" type="primary" plain>更换背景</el-button>
      <el-dropdown class="marl20 dropdown-home">
        <span class="el-dropdown-link">
          <i class="fa fa-upload fa-lg"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <!-- 生成二维码的位置 -->
            <div id="qrcode"></div>
            <div class="text-center">{{qrCodeData ? 'App下载二维码' : '暂无版本'}}</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <header-dropdown-menu pageType="home"></header-dropdown-menu>
    </div>
    <!-- 搜索框 -->
    <div class="fr search-group">
      <el-input v-model="result" :placeholder="`在 ${typeName} 中搜索`" clearable></el-input>
      <el-button type="primary" size="small" @click="searchArticle(result)">搜索</el-button>
    </div>
  </div>
</template>

<script>
  import HeaderDropdownMenu from '../HeaderDropdownMenu.vue'
  import '../../../styles/fixedBlock.less'
  import QRCode from 'qrcodejs2'
  export default {
    components: {
      'header-dropdown-menu': HeaderDropdownMenu, //头部右侧下拉组件
    },
    data() {
      return {
        optionsBackground: [
            {
              value: '#76fffa',
              label: '#76fffa'
            },{
              value: '#fff',
              label: '#fff'
            },{
              value: '#6eddff',
              label: '#6eddff'
            },{
              value: '#4e74af',
              label: '#4e74af'
            },{
              value: '#f5f5f5',
              label: '#f5f5f5'
            }
        ],
        qrCodeData:        null, //二维码数据
        date:              null,
        userData:          JSON.parse(sessionStorage.getItem('userData')),
        checkStatus:       false,
        partyOrgsListData: JSON.parse(sessionStorage.getItem('partyOrgsListData')),   //职位列表
        resultList:        [],   //搜索文章的结果
        result:            null, //文章搜索的值
        searchLoading:     false,
        typeName:          sessionStorage.getItem("typeName") || "全部文章",
        activePartyOrg:    null, //被选中的职位
      }
    },
    created () { 
      // sessionStorage.setItem("typeName", "全部文章")
      // sessionStorage.setItem("typeId", "")
      // this.typeName = sessionStorage.getItem("typeName")
    },
    mounted() {
      this.dateCovert();
      this.getCheckStatus(); 
      this.$nextTick(() => {
        this.qrCode();
      });
    },
    watch: {
      '$route' (to, from) {
        if(to.name == "Policies_And_Regulations" || to.name == "News_Detail" || to.name == "Article_List") {
          this.typeName = sessionStorage.getItem("typeName")
        } else if(to.name == "News_List") {
          sessionStorage.setItem("typeName", JSON.parse(to.params.object).atName)
          sessionStorage.setItem("typeId", JSON.parse(to.params.object).atId)
          this.typeName = JSON.parse(to.params.object).atName
        } 
        else {
          sessionStorage.setItem("typeName", "全部文章")
          sessionStorage.setItem("typeId", "")
          this.typeName = "全部文章"
        }
      }
    },
    destoryed() {
    },
    methods:{
      /*
      * 改变颜色，修改背景色
      * @param {string} val 颜色值
      */
      changeBackground(val) {
        $('body').css('background',val)
      },
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
       * 查询二维码生成地址
       */
      qrCode(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/version/newest/version', "", 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.qrCodeData = resposeData.data;
            resposeData.data ? self._qrCode(resposeData.data) : '';
          },function(respone,status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(response.data.meta.message) : 
                            self.$message.error('/version/newest/version - 失败!');
          }
        )
      },
      /*
       * 使用地址生成二维码
       */
      _qrCode(data) {  
         let qrcode = new QRCode('qrcode', {  
         width: 157,  
         height: 160, // 高度  
         text: data.url, // 二维码内容
         image: '',
         // render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
         // background: '#cccccc',  
         // foreground: '#cccccc', 
         })
       },
      /**
       * 搜索文章
       * @return none
       */
      searchArticle (text) {
        this.$router.push({'name': "Article_List", 'params': {'keywords': text}})
      },
      /**
       * 点击选择任意option 跳转至详情页
       * @return {[type]} [description]
       */
      goToDetail () {
        this.$router.push({name: 'News_Detail', params: {id: this.result} })
      },
      
      /*
       * 下拉选中值并跳转到首页
       */
      dropdownHandleCommand(item){  
        // -------------- 存储一个在 session里，避免刷新页面是，$store里的值消失
        sessionStorage.setItem('currentPartyOrg', JSON.stringify(item));
        this.$store.state.currentPartyOrg = item;
        this.$router.push({path: '/home'});
      },
      /*
       * 跳转到职位详情页面
       */
      dropdownHandleClick(){ 
        this.$router.push({name:'Org_Message', params: {id: this.$store.state.currentPartyOrg.id} })
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