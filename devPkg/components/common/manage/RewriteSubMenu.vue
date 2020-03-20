/*************************************
*  create by xieyuanyuan date 2018/08/13
*  二级栏目组件
**************************************/
<template>
  <div>
    <!-- 二级栏目 -->
    <div v-show="authorityList" class="sub-menu-manage other-sub-menu-manage">
      <ul>
        <!-- 发展党员栏目 -->
        <li v-if="typeId == 4" 
          v-show="_basisAuthority('1_15_1')"
          @click=" activeSubMenu = 'roster_of_development' "
          :class="{'active': (activeSubMenu == 'roster_of_development')  }">
          <span class="li-text">
            <router-link :to="{path: '/developing_party_members/roster_of_development'}">发展名册</router-link>
          </span>
        </li>

        <!-- 投票调研栏目 -->
        <li v-if="typeId == 7"
          v-show="_basisAuthority('1_10_1')"
          @click=" activeSubMenu = 'activityList' " 
          :class="{'active': activeSubMenu == 'activityList'}">
          <span class="li-text">
            <router-link :to="{path: '/poll_research/activity_list'}">投票活动列表</router-link>
          </span>
        </li>
        <li v-if="typeId == 7 && (orgType == 1 || orgType == 4)"  
          v-show="_basisAuthority('1_10_2')"
          @click=" activeSubMenu = 'voteList' "
          :class="{'active': activeSubMenu == 'voteList' }">
          <span class="li-text">
            <router-link :to="{path: '/poll_research/vote_list'}">选票列表</router-link>
          </span>
        </li>

        <!-- 党费缴纳 -->
        <li v-if="typeId == 10" 
          v-show="_basisAuthority('1_3_1')"
          @click=" activeSubMenu = 'details_of_party_payment' "
          :class="{'active': (activeSubMenu == 'details_of_party_payment')  }">
          <span class="li-text">
            <router-link :to="{path: '/party_fee_management/details_of_party_payment'}">党费缴纳详情</router-link>
          </span>
        </li>

        <!-- 组织建设 -->
        <li v-if="typeId == 14" 
          v-show="_basisAuthority('1_2_1')"
          @click=" activeSubMenu = 'list_of_party_representatives' "
          :class="{'active': (activeSubMenu == 'list_of_party_representatives')  }">
          <span class="li-text">
            <router-link :to="{path: '/organizational_building/list_of_party_representatives'}">党代表名单</router-link>
          </span>
        </li>

        <!-- 组织建设 -->
        <li v-if="typeId == 16" 
          v-show="_basisAuthority('1_6_1')"
          @click=" activeSubMenu = 'roster_of_cadras' "
          :class="{'active': (activeSubMenu == 'roster_of_cadras')  }">
          <span class="li-text">
            <router-link :to="{path: '/personnel_administration/roster_of_cadras'}">干部名册</router-link>
          </span>
        </li>

        <li v-if="subMenuData" v-for="(item, index) in subMenuData"  
          :key="index"
          :class="{'active': index == activeSubMenu }"
          :title="item.name" 
          @click="submenuClick(item, index)">
          <el-badge :value="$util.menuBubbleNum(2, item.id)" class="item">
            <span class="li-text">{{item.name}}</span>
          </el-badge>
        </li>
      </ul>
    </div>
    <!-- 满足条件链接地址自身的页面 -->
    <router-view
      v-if="activeSubMenu == 'activityList' 
         || activeSubMenu == 'voteList'
         || activeSubMenu == 'roster_of_development'
         || activeSubMenu == 'details_of_party_payment'
         || activeSubMenu == 'list_of_party_representatives'
         || activeSubMenu == 'roster_of_cadras'"></router-view>
    <!-- 满足条件显示任务列表组件 -->
    <task-list 
      v-if="taskId 
         && activeSubMenu != 'activityList' 
         && activeSubMenu != 'voteList'
         && activeSubMenu != 'roster_of_development'
         && activeSubMenu != 'details_of_party_payment'
         && activeSubMenu != 'list_of_party_representatives'
         && activeSubMenu != 'roster_of_cadras' " 
      :taskType="taskId"
      :taskTitle="taskTitle"></task-list>
  </div>
</template>

<script>
  import Task_List from '../../task_manage/Task_List.vue'
  export default {
    props:{
      typeId:        null,
      detailPageUrl: null, //任务列表页面地址
    },
    components:{
      'task-list':      Task_List,
    },
    computed:{
    }, 
    data() {
      return {
        orgType:       sessionStorage.getItem('orgType'),
        userData:      JSON.parse(sessionStorage.getItem('userData')),  //用户信息
        orgId:         sessionStorage.getItem('orgId'),     //党组织id
        isloading:     true,
        // ----- 改了此处的 “数字键” 还需修改一下，router.js里面相对应的id
        subMenuData:   null, //二级栏目数据
        activeSubMenu: null, //激活二级栏目中指定栏目
        taskId:        null, //任务Id(默认选中第一个)
        mathRandom:    1,    //随机数，用来查看详情使用,避免重复数据不能及时响应弹框显示
        authorityList: null,
      }
    }, 
    mounted() { 
        
      this.getAuthority();
    },
    watch:{

    },
    methods:{
      /*
       * 获取权限Id数组
       */
      getAuthority(){ 
        let self = this;
        self.$request.requestAxios('get', `${basePath}/home/party_org/module/${self.orgId}`, "",
          function(response) { 
            self.authorityList = response.data.data; 
            // ------ 默认选中第一个任务列表类型Id ---------
            self._buildNavUrls();
            // ------ 根据权限显示指定页面 ------ 
            self._showPage();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`/home/party_org/module/${self.orgId}`);
        });
      },
      /*
       * 根据typeId获取二级栏目
       */ 
      _buildNavUrls () {
        let routes = this.$router.options.routes;
        this.subMenuData = [];
        routes.forEach((route) => {
          let meta = route.meta;
          // ----------- 类型为orgManage类型，并且是显示状态和，有权限的情况 ------
          if (meta && meta.type === 'orgManage' && meta.showInNav) {
            if(meta.id == this.typeId){
              // -------- 根据权限显示栏目 ---------
              if(meta.subMenu && this.authorityList){
                meta.subMenu.forEach( (itemSub) => {
                  this.authorityList.modules.forEach( (itemAuth) => {
                    if(itemSub.id == itemAuth){
                      this.subMenuData.push(itemSub);
                    }
                  });
                });
              } 
              // -------- 默认选中第一个数据 ------------
              if(this.subMenuData.length){
                this.taskId = this.subMenuData[0].id;
                this.$store.state.subMenuTitle = this.subMenuData[0].name;
                this.taskTitle = this.subMenuData[0].name;
              } 
            } 
          }
       });
      },
      /*
       * 需要调用其他页面的地方将第一个页面设置为选中项，否则就选中第一项
       */
      _showPage(){
        switch(this.typeId){ 
          case "4": //发展党员
            // -------- 满足权限就显示该页面 ---------
            if(this._basisAuthority('1_15_1')) {
              this.$store.state.subMenuTitle = '发展党员';
              this.activeSubMenu = 'roster_of_development';
              this.$router.push({path: '/developing_party_members/roster_of_development'});
            }
            break;
          case "7": //投票活动列表 
            // -------- 满足权限就显示该页面 --------- 
            if(this._basisAuthority('1_10_1')) {
              this.$store.state.subMenuTitle = '投票活动列表';
              this.activeSubMenu = 'activityList';
              this.$router.push({path: '/poll_research/activity_list'})
            }else if(this._basisAuthority('1_10_2')){
              this.$store.state.subMenuTitle = '选票列表';
              this.activeSubMenu = 'voteList';
              this.$router.push({path: '/poll_research/vote_list'})
            }
            break;
          case "10": //党费缴纳详情
            // -------- 满足权限就显示该页面 ---------
            if(this._basisAuthority('1_3_1')) {
              this.$store.state.subMenuTitle = '党费缴纳详情';
              this.activeSubMenu = 'details_of_party_payment';
              this.$router.push({path: '/party_fee_management/details_of_party_payment'})
            };
            break;
          case "14": //组织建设 
            // -------- 满足权限就显示该页面 ---------
            if(this._basisAuthority('1_2_1')) {
              this.$store.state.subMenuTitle = '组织建设';
              this.activeSubMenu = 'list_of_party_representatives';
              this.$router.push({path: '/organizational_building/list_of_party_representatives'})
            };
            break;
          case "16": //干部名册 
            // -------- 满足权限就显示该页面 ---------
            if(this._basisAuthority('1_6_1')) {
              this.$store.state.subMenuTitle = '干部名册';
              this.activeSubMenu = 'roster_of_cadras';
              this.$router.push({path: '/personnel_administration/roster_of_cadras'})
            }
            break;
          default:
            this.activeSubMenu = 0;
            break;
        }
      }, 
      /*
       * 操作二级栏目
       * @params {object} item 被指定的二级栏目数据
       * @params {num} index 二级栏目下标
       */
      submenuClick(item, index){ 
        this.activeSubMenu = index;
        this.taskId = item.id;
        this.taskTitle = item.name;
        this.$store.state.subMenuTitle = item.name;
        this.$router.push({path: this.detailPageUrl});
        this.mathRandom++;
       }, 
      /*
       * 根据权限判断栏目是否该显示
       */
      _basisAuthority(id){  
        // ------------ 这三个栏目，每个组织都能显示 ------
        if(id == "1_1" || id == "1_1_1" || id == "1_1_2"){
          return true;
        }else{ 
          if(!this.authorityList) return false;
          let bool = false; 
          this.authorityList.modules.forEach( (item) => { 
            if(item == id){
              bool = true; 
            }
          })
          return bool;
        } 
      }, 
    }
  }
</script>