<template>
  <div class="my-el_style_manage">
    <a class="return-black" href="javascript:void(0)" @click="toHome" > 
      <i class="fa fa-home"></i>
      返回首页</a>
    <!-- 一级栏目 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo el-menu-manage"
      background-color="#f9f9f9"
      text-color="#fff"
      active-text-color="#de1201"
      router="true">
      <el-menu-item style="padding-left: 0;" v-for="(item, index) in urls"  :key="index" :index="index"  >
        <router-link @click.native="showToggle(index)" :to="{path: item.path}">
          <i @click="showToggle(index)" class="" :class="item.iconFont"></i>
          <el-badge :value="$util.menuBubbleNum(1, item.meta.id)" class="item">
            <span @click="showToggle(index)">{{item.meta.navName}}</span>
          </el-badge>
        </router-link>
      </el-menu-item>
    </el-menu>
    <!-- 中间内容区，也是各个功能模块的加载区域 --start-- -->
    <div class="main-container manage-main-container">
      <!-- 内容头部 -->
      <div class="header-manage">
        <el-row>
          <el-col class="header-manage-left" :span="4">
            <span>个人中心</span>
          </el-col>
          <el-col :span="20" class="header-manage-right">
            <div>
              <header-dropdown-menu pageType="personal"></header-dropdown-menu>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="sub-main-container-manage">
        <!-- 二级栏目 -->
        <div class="sub-menu-manage">
          <ul v-for="(item, index) in urls"  :key="index" :index="index" v-show="isShow == index" class="">
            <router-link v-for="(subItem, subIndex) in item.children" v-if="subItem.meta.showInNav" :key="subIndex" :to="{path: item.path + '/' + subItem.path}"> 
              <li>
                <el-badge :value="$util.menuBubbleNum(2, subItem.meta.id)" class="item">
                  <span class="li-text">{{subItem.meta.navName}}</span>
                </el-badge>
              </li>
            </router-link>
          </ul>
        </div>
        <!-- 主要内容 -->
        <div class="sub-main-container-fex">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChidMenuAssembleBubble from '../common/ChidMenuAssembleBubble.vue'
  import HeaderDropdownMenu from '../common/HeaderDropdownMenu.vue'
  import '../../styles/manage.less'
  import UserService from "../../services/user";
  export default {
    components: {
      'header-dropdown-menu': HeaderDropdownMenu,     //头部右侧下拉组件
      'menu-assemble-bubble': ChidMenuAssembleBubble, //冒泡组件
    },
    data() {
      return {
        urls: this._buildNavUrls(),
        isShow: 0,
        orgId: sessionStorage.getItem('orgId'),    //党组织Id
        isRouterAlive: true,    //刷新当前页面
        // userData: UserService.getCurrentUser()

      }
    },
    watch: {
      orgId:{
        handler(){
            this.reload();
        },
        deep: true,
      }
    },
    mounted() {
      // ---- 将socket开启 ---
      // this.$util.connection();
      
      this.getsubMenu();
    },
    methods: {
      /*
       * 组装到需要获取气泡的Id
       */
      _convertBubbleId(urls){
        let ids = { 
          fromType: 1, //1表示个人中心，2表示组织
          typeIds: [],
        };
        urls.forEach( (item) => {          
          if(item.meta.id){
            let idsItem = {id: null, childs: []};
            idsItem.id = item.meta.id

            // ---- 遍历特殊的二级栏目
            if(item.meta.subMenu){
              item.meta.subMenu.forEach((subItem) => {
                idsItem.childs.push(subItem.id)
              })
            }
            // ---- 遍历二级栏目
            item.children.forEach((subItem) =>{
              if(subItem.meta.id){
                idsItem.childs.push(subItem.meta.id)
              }
            });
            ids.typeIds.push(idsItem);
          }
        });  
        // ---- 先清空数据，给scoket发送数据 ---
        this.$store.state.bubbleCountList = null;
        this.$util.connection(ids);
      },
      /**
       * 回首页 清空记住的类型数据
       * @return none
       */
      toHome () {
        sessionStorage.setItem("typeName", "全部文章")
        sessionStorage.setItem("typeId", "")
        this.$router.push({path: '/home'})
      },
      /*
      * 刷新页面
      */
      reload () {
          this.isRouterAlive = false
          this.$nextTick(() => (this.isRouterAlive = true))
      },  
      /*
      * 栏目
      */ 
      _buildNavUrls () {
          let routes = this.$router.options.routes,
              urls = [];
          routes.forEach((route) => {
              let meta = route.meta;
              if (meta && meta.type === 'personalManage' && meta.showInNav) {
                urls.push(route);
              }
          });
        this._convertBubbleId(urls)
        return urls;
      },
      /*
      * 获取当前页面的地址来确定那个二级目录显示
      */ 
      getsubMenu(){
        let self = this,
            urls = this.urls,
            currentPath = this.$route.path;
        urls.forEach((route, index) => {
          let meta = route.meta;
          route.children.forEach((subRoute, subIndex) => {
            // --------- 当前地址跟所有的子节点与父节点做对比 --------------
            if(currentPath.indexOf(subRoute.path) != -1 && currentPath.indexOf(route.path) != -1 ){
              // ---- 下标
              self.isShow = index;
            }
          })
        });
      },
      /*
      * 获取到每次需要切换的大栏目下标
      */
      showToggle(_index){
        this.isShow = _index;
      },
      /*
      * 页面跳转
      * @param {string} data
      */
      jumpPage(data){
        if(data === 'unlogin'){  //退出登录
          // -----------页面跳转
          this.$router.push({path: '/login'});
        } else if (data == 'notice'){
          this.$router.push({path: '/personal_manage/notice'});
        }
      }
    }
  }
</script>

<style scoped>
  .notice-icon {
    font-size: 20px;
    color: #fff;
    vertical-align: middle;
  }
      
</style>