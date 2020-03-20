<template>
  <div class="my-el_style_manage">
    <a class="return-black" href="javascript:void(0)" @click="toHome" 
      style=""> <i class="fa fa-home"></i>返回首页</a>
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
              <span v-if="partyorg">{{partyorg.name}}工作台</span>
            </el-col>
            <el-col :span="2" class="text-right padr15"><span>党委动态</span></el-col>
            <el-col :span="10">
              <div id="warp" class="warp-manage">
                <div id="con" class="con-manage">
                  <ul id="box1" class="box1-manage">
                    <li v-for="(item,index) in dynamicsData" :key="index">{{item.operate_info}}</li>
                  </ul>
                  <ul id="box2" class="box2-manage"></ul>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="header-manage-right">
              <div>
                <span class="marr5">下属组织</span>
                <el-select @change="uploadorgId(orgName)" v-model="orgName" placeholder="请选择活动区域" class="header-manage-select marr5">
                  <el-option v-if="orgChlidrensimple" v-for="(item, index) in orgChlidrensimple" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <!-- <img src="../../images/user_manage.png"> -->
                <header-dropdown-menu pageType="org"></header-dropdown-menu>
              </div>
            </el-col>
          </el-row>
      </div>
      <div class="sub-main-container-manage">
        <!-- 二级栏目 -->
        <div class="sub-menu-manage" v-if="$route.name != 'Study'">
          <ul v-for="(item, index) in urls"  
              :key="index" 
              :index="index" 
              v-show="isShow == index" 
              class="">
            <!-- 有权限 -->
            <router-link 
              v-for="(subItem, subIndex) in item.children" 
              v-if="subItem.meta.showInNav && _basisAuthority(subItem.meta.id)" 
              :key="subIndex" 
              :to="{path: item.path + '/' + subItem.path}"
              exact="true"> 
              <li>
                <el-badge :value="$util.menuBubbleNum(2, subItem.meta.id)" class="item">
                  <span class="li-text">{{subItem.meta.navName}}</span>
                </el-badge>
              </li>
            </router-link>

            <!-- 去权限 -->
            <!--  <router-link 
              v-for="(subItem, subIndex) in item.children" 
              v-if="subItem.meta.showInNav" 
              :key="subIndex" 
              :to="{path: item.path + '/' + subItem.path}"
              exact="true"> 
              <li>
                <el-badge :value="$util.menuBubbleNum(2, subItem.meta.id)" class="item">
                  <span class="li-text">{{subItem.meta.navName}}</span>
                </el-badge>
              </li>
            </router-link> -->
          </ul>
        </div>
        <!-- 主要内容 -->
        <div class="sub-main-container-fex"> 
            <!-- 面包屑 -->
            <div v-if="partyorg" aria-label="Breadcrumb" role="navigation" class="el-breadcrumb breadcrumb-manage">
              <span class="el-breadcrumb__item breadcrumd-manage-link" 
                @click="uploadorgId(item.id)" 
                v-for="(item, index) in partyorg.idAndNames" :key="index" data-id="1">
                <span role="link" class="el-breadcrumb__inner">{{item.name}}</span>
                <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
              </span>
              <span class="el-breadcrumb__item" aria-current="page"><span role="link" class="el-breadcrumb__inner">{{ $store.state.subMenuTitle }}</span><i class="el-breadcrumb__separator el-icon-arrow-right"></i></span>
            </div>
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
  import UserService from "../../services/user"
  export default {
    components: {
      'header-dropdown-menu': HeaderDropdownMenu,     //头部右侧下拉组件
      'menu-assemble-bubble': ChidMenuAssembleBubble, //冒泡组件
    },
    data() {
        return {
          resource:          [], //权限
          urls:              [], //地址列表数据
          isShow:            0,
          orgId:             sessionStorage.getItem('orgId'),    //党组织Id
          orgCode:           sessionStorage.getItem('orgCode'),  //党组织code
          userData:          JSON.parse(sessionStorage.getItem('userData')),
          partyorg:          {},                              //组织信息
          orgName:           '',
          orgChlidrensimple: {}, 
          title:             "组织建设",       //当前页面的标题     
          isRouterAlive:     true,      //刷新当前页面
          dynamicsData:      [],        //党委动态
          authorityList:     [],        //权限数组
        }
    },
    computed:{
    },
    watch: {
      $route(to, from){
        // --- 获取标题
        this.obtainTitle();
        if(from.name == "Settings_Upload_Article") { //从上传文章页面跳转 清空暂存的分类/专题
          sessionStorage.removeItem("tempType")
        }
      },
      orgCode:{     //组织ID改变，页面刷新
          handler(){
            this.reload()
          },
          deep: true,
      },
      resource:{    //权限改变，页面刷新
          handler(){
            // this.reload();
          },
          deep: true,
      },
    },
    mounted() {
      // ---- 给scoket发送数据 ---
      // this.$util.connection(this.orgId);

      // ---- 获取资源权限 ----
      this.user_resource();
      
      // ---- 获取党组织信息
      this.getQueryOrg();
      // ---- 获取组织列表信息
      this.getQueryOrgList();
      // -------------- 无缝滚动
      this.$util.seamlessRolling('warp','con','box1','box2');

      // --- 党委动态 ---
      this.getQueryDynamics();
      // ----- 设置权限 -----
      this.getAuthority();
 
    },
    methods: {
      /*
       * 获取权限Id数组
       */
      getAuthority(){
        let self = this;
        self.$request.requestAxios('get', `${basePath}/home/party_org/module/${self.orgId}`, "",
          function(response) {   
            self.authorityList = response.data.data;
            self._buildNavUrls();
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(`/home/party_org/module/${self.orgId}`);
        });
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
      * 查询党委动态
      */
      getQueryDynamics(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/home/10/dynamics', "",
          function(response) {
            let responseData = response.data;
            self.dynamicsData = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/home/10/dynamics');
        });
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
            // ----------- 类型为orgManage类型，并且是显示状态和，有权限的情况 ------
            if (meta && meta.type === 'orgManage' && meta.showInNav) {
              // ---------- 根据后台存储的权限来设置 --------- 
              if(this._basisAuthority(route.meta.menuId)){ //先判断第一层是否有满足条件的，
                urls.push(route);
              }else if(meta.subMenu){ // 如果第一层没有满足条件的，再看第二层，是否有，只要第二层有一个满足条件，就显示第一层栏目
                let bool = false;
                meta.subMenu.forEach( (item) => { 
                  if(this._basisAuthority(item.id)){
                    bool = true;
                  } 
                });
                
                if(bool) urls.push(route);
              } 

              
            }
        });
        // ---- 组装到需要获取气泡的Id
        this._convertBubbleId(urls);
        
        // -------- 由于有权限问题，每次跳转组织就默认选中第一个栏目 
        // -------- 当有子节点时，就默认选中第一个子节点
        if(urls.length){
          if(urls[0].children.length){
            if(urls[0].children[0].meta.showInNav) 
              this.$router.push({ path: `${urls[0].path}/${urls[0].children[0].path}` });
          }else{
            this.$router.push({ path: urls[0].path });
          }
        }
        
        this.urls = urls; 
      },
      /*
       * 组装到需要获取气泡的Id
       */
      _convertBubbleId(urls){
        let ids = {
          fromId: this.orgId,
          fromType: 2, //1表示个人中心，2表示组织
          typeIds: [],
        };
        urls.forEach( (item) => {          
          if(item.meta.id){
            let idsItem = {id: null, childs: []};

            // ---- 遍历特殊的二级栏目
            if(item.meta.subMenu){
              item.meta.subMenu.forEach((subItem) => {
                if(this._basisAuthority(subItem.id)){
                  idsItem.childs.push(subItem.id)
                } 
              })
            }
            // ---- 遍历二级栏目
            item.children.forEach((subItem) =>{
              if(subItem.meta.id && subItem.meta.id.indexOf('_') == -1){
                if(this._basisAuthority(subItem.meta.id)){
                  idsItem.childs.push(subItem.meta.id)
                }
              }
            });
            // ------- 有二级id才添加一级Id ------- 
            if(idsItem.childs.length){
              idsItem.id = item.meta.id;
            } 

            ids.typeIds.push(idsItem);
          }
          
        }); 
        // ---- 先清空数据，给scoket发送数据 ---
        this.$store.state.bubbleCountList = null;
        this.$util.connection(ids);
      },
      /*
       * 获取标题
       */ 
      obtainTitle(){
        let urls = this.urls;
        urls.forEach((route, index) => {
          let meta = route.meta;
          if(route.children.length){ //多级栏目
            this._obtainTitle(route, index, 2);
          }else if(!route.children.length){ //只有一级栏目
            let currentPath = this.$route.path;
            if(currentPath.indexOf(route.path) !=-1){
              // ---- 获取当前页面被选中的二级目录
              this.isShow = index;
              this.title = meta.navName;
              this.$store.state.subMenuTitle = this.title;
            }
          }
        });
      },
      /*
       * 获取当前路由的标题递归
       * @params {object} 路由数据
       * @params {string/number} 路由下标
       * @params {string/number} 路由层数 为1表示第二层需要获取二级栏目被选中功能，其他就不用
       */
      _obtainTitle(route, index, layer){
        let currentPath = this.$route.path; 
        route.children.forEach((subRoute, subIndex) => {//第二层
            if(subRoute.meta.showInNav){
              // ---------- 有此键，就先跟aliasPath的值作比较

              if(subRoute.hasOwnProperty('aliasPath')){
                  if(currentPath.indexOf(subRoute.aliasPath) != -1){
                    
                    this.$store.state.subMenuTitle = this.title = subRoute.meta.navName;
                    // ---- 获取当前页面被选中的二级目录
                    if(layer == 2) this.isShow = index;
                    
                  }
              }else{
                // --------- 当前地址跟所有的子节点与父节点做对不 --------------
                if(currentPath.indexOf(subRoute.path) != -1){
                  this.$store.state.subMenuTitle = this.title = subRoute.meta.navName;
                }

                // ---- 获取当前页面被选中的二级目录 ---- 
                if(currentPath.indexOf(route.path) != -1){
                  if(layer == 2) this.isShow = index;
                }
              }
              if(subRoute.children) this._obtainTitle(subRoute, subIndex, 3);

            }
          })
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
      /*
      * 获取到每次需要切换的大栏目下标
      */
      showToggle(_index){ 
        this.isShow = _index;
      },
      /*
      * 获取单个党组织信息
      */
      getQueryOrg(){ 
        let self = this;
        // --------- 当单个组织有值，不查询  
        self.$request.requestAxios('get',basePath + '/party_orgs/'+ this.orgId +'/partyorg', "", 
          function(response) {
            let responseData = response.data;
            // -------- 给当前的单个组织赋值 -----------
            self.partyorg = responseData.data;
            // --------------- 存储组织Code ------------------
            sessionStorage.setItem('orgCode', responseData.data.code);
            // --------------- 存储组织Type ------------------
            sessionStorage.setItem('orgType', responseData.data.type);

            self.orgCode = responseData.data.code;

            // --------- 用全局边变量来保存组织树，避免没有改变code并
            // --------- 跳转页面的情况下，页面跳动
            self.$util.org.partyorg = responseData.data;
            
            // --- 由于要根据组织类型来判断页面该显示那些栏目，就只能，放在数据请求的这个位置 -----
            // self._buildNavUrls();

            // --- 获取标题
            self.obtainTitle();

          },function(error, status) {// 请求失败回调函数...
              status == 200 ? self.$message.error(error.data.meta.message) :
                              self.$message.error('/party_orgs/'+ self.orgId +'/partyorg - 失败');
        }); 
      },
      /*
      * 查询组织列表数据
      */
      getQueryOrgList(){
        let self = this;

        // --------- 当组织树有值，不查询 
        if(self.$util.org.orgChlidrensimple){

          self.orgChlidrensimple = self.$util.org.orgChlidrensimple;
        }else{

          self.$request.requestAxios('get',basePath + '/party_orgs/chlidrensimple', {params: {id: this.orgId}}, 
            function(response) {
              let responseData = response.data;
              // -------- 给当前的组织树赋值 -----------
              self.orgChlidrensimple = responseData.data;

              // ----- 清空下属支部数据
              self.orgName = '';
              
              // --------- 用全局边变量来保存组织树，避免没有改变code并
              // --------- 跳转页面的情况下，页面跳动
              self.$util.org.orgChlidrensimple = responseData.data

            },function(error, status) {// 请求失败回调函数...
                status == 200 ? self.$message.error(error.data.meta.message) :
                                self.$message.error('/party_orgs/'+ self.orgId +'/chlidrensimple - 失败');
          });
        }
      },
      /*
       * 点击下属支部获取组织ID页面重新加载, 并且广播orgChange事件
       * @param {string} code 
       */
      uploadorgId(id){
          // ---------- 存储组织ID ----------
          sessionStorage.setItem('orgId', id);

          this.orgId = id; 

          // ---- 获取资源权限 ----
          this.user_resource();

          this.$util.org.orgChlidrensimple = null;
          this.$util.org.partyorg = null;
          // ---- 获取党组织信息
          this.getQueryOrg();
          // ---- 获取组织列表信息
          this.getQueryOrgList();
          // ------ 获取权限 ----
          this.getAuthority();
      },
      /*
      * 获取成员所在党组织拥有的资源id
      */
      user_resource(){
        let self = this;
        // --------- 重置数据 -----------
        sessionStorage.setItem('resource', "[]");
        self.$request.requestAxios('get',basePath + '/user_resource/resource', {params: {orgId: self.orgId, infoId: self.userData.memInfoId}}, 
            function(response) {
              let responseData = response.data;
              sessionStorage.setItem('resource', JSON.stringify(responseData.data));
            },function(error, status) {
              status == 200 ? self.$message.error(error.data.meta.message, 20) : self.$message.error('/user_resource/resource - 失败', 20);
          });
      },
      /*
      * 页面跳转
      * @param {string} data
      */
      jumpPage(data){
        if(data === 'unlogin'){  //退出登录
          // -----------页面跳转
          this.$router.push({path: '/login'});
        }
      }, 
      /*
       * 显示一级栏目地址
       */
      _showMenuPath(itemData){
        let path = `${itemData.path}`;
        // ------------ 有子栏目，并且有权限 --------- 
        try{ // forEach不能终止循环，只能使用try catch 强制退出
          if(itemData.children.length && this.authorityList){
            itemData.children.forEach( (item) => {
              this.authorityList.modules.forEach( (itemAuth) => {
                if(item.meta.id == itemAuth){
                  // debugger
                  path = `${path}/${item.path}`; 
                  throw new Error('满足条件，跳出循环')
                }
              });
            });
          }
        }catch(e){
          this.$message.error(e)
        }
        
        return path;
      }
    }
  }
</script>