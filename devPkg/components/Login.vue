<template>
    <div class="login-wrap">
        <div class="browser-warning" style="display: none">为保证最佳使用效果，建议您使用Chrome或者FireFox浏览器</div>
        <div class="login-form-wrap">
            <h2>“先锋党建”管理系统</h2>
            <form class="form login-form">
                <div class="form-group login-from-group-print">
                    <label><img src="../../static/images/user_icon.png"/></label>
                    <input v-model="form.username" placeholder="请输入用户名" class="form-control js-username" type="text">
                </div>
                <div class="form-group login-from-group-print">
                    <label><img src="../../static/images/password_icon.png"/></label>
                    <input :type="isPassword ? 'text' : 'password' " 
                            v-model="form.password" 
                            placeholder="请输入密码" 
                            class="form-control js-password" >

                    <i @click="viewClick" class="el-icon-view_login el-icon-view"></i>
                </div>
                <div class="form-group login-form-group-remember">
                    <label class="remember-login" @click="rememberClick">
                        <img v-if="!isRemember" src="../../static/images/remark_de.png" />
                        <img v-if="isRemember" src="../../static/images/remark_ac.png" />
                        记住密码
                    </label>
                    <label class="forget-password">忘记密码</label>
                </div>
                <button class="btn-block js-login" @click="loginClick" type="button">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
                <el-button class="fr" @click="$router.push({path: '/register'})" type="text">注册</el-button>
            </form>
        </div>
    </div>
</template>
<script> 
    import '../styles/login.less'
    import qs from 'qs'
    export default {
        data() {
            return{
                isRemember: false,
                isPassword: false, 
                form: {
                    password: null,
                    username: null,
                },
            }
        },
        created(){ 
            // --------- 键盘时间的监听
            window.addEventListener('keypress', this.pressEnter); 
        },
        mounted(){
            this._remember();

        },
        methods: {
            viewClick(){
                this.isPassword = !this.isPassword;
            },
            /*
            * 点击登录按钮进行登录
            */
            loginClick: function(argument) {
                this.login();
            },
            /*
            * 登录
            */
            login: function() {
                var self = this;
                $(".js-login").attr("disabled", false)

                this.axios.post(basePath + '/login/in', qs.stringify(self.form)).then(function (response){
                    let responseData = response.data;
                    self.$message.close();
                    if(responseData.meta.code === 0){
                        self._session(responseData.data);
                        self.$message.success({message: '登录成功...正在跳转!!!',duration: 1000});
                        // ------------- 清空键盘事件，避免多次绑定造成多次请求 -------------
                        window.removeEventListener('keypress', self.pressEnter);
                        setTimeout(function(){
                            self.$router.push({path: '/'}); 
                        },1010);
                    }else{
                      
                      // ---------- 先禁用按钮，然后提示消息取消后才开启 -----------
                      $(".js-login").attr("disabled", true) 
                      self.$message.error({message: responseData.meta.message, duration: 800});
                      setTimeout(function(){
                        $(".js-login").attr("disabled", false) 
                      },810);
                      
                    }
                }).catch(function (error) {
                    self.$message.error('登录失败!!!', 20);
                });
            },
            /*
             * 绑定数据
             */
            _session(data){
                // ----------- 登录成功存储用户数据
                sessionStorage.setItem('userData',JSON.stringify(this._screenData(data)));
                sessionStorage.setItem("typeName", "全部文章")
                sessionStorage.removeItem("typeId")
                // --------- 开启socket ----
                this.$util.connection();
                
                // ------- 给公共参数赋值 
                // ---- 用户信息
                this.$util.userData    = sessionStorage.getItem('userData'); 
                // --- 接入所有关于首页需要的orgCode权限
                this.$util.homeFromOrg = sessionStorage.getItem('userData') ? 
                                        `from_org/${JSON.parse(sessionStorage.getItem('userData')).partyOrgCode}` : '';

                // -------- 将密码设置为最终登录成功的账号密码 -----
                if(this.isRemember){
                    localStorage.setItem("username", this.form.username);
                    localStorage.setItem("password", this.form.password);
                }
                this.getFileBasePath();

                this.getQueryContrast(data);

                this.partyOrgsList(data);
            },
            /**
             * 全局绑定的键盘事件
             * @return {[type]} [description]
             */
            pressEnter (event) {
                if(this.$route.path && this.$route.path == "/login") { //仅在登录页调用此事件
                  if(event.key == "Enter") {
                    this.login()
                  }
                }
            },
            /*
            * 排除相同组织ID的数据
            */
            _screenData(data){
                let arry = [], isRepeated = true;
                $.each(data.positions, function(index, item){
                    $.each(arry, function(indexRe, itemRe){
                        if(item.orgid == itemRe.orgid){
                            isRepeated = false;
                        }   
                    });
                    if(isRepeated){
                        arry.push(item);
                    }
                });
                data.positions = arry;
                return data;
            },
            /*
            * 点击按钮记住账号密码
            */
            rememberClick: function() {
                this.isRemember = !this.isRemember;
                this.isRemember? localStorage.setItem("always",'true') : localStorage.setItem("always",'false')

                localStorage.setItem("username", this.form.username);
                localStorage.setItem("password", this.form.password);
            },
            /*
            * 记住账号密码
            */
            _remember: function() {
                let self = this;
                if(localStorage.getItem("always") === "true") { //是否已经记忆了密码
                    if(localStorage.getItem("username") && localStorage.getItem("password")) {
                        self.form.username = localStorage.getItem("username");
                        self.form.password = localStorage.getItem("password");
                        self.isRemember = true;
                    }
                }
             },
            /*
             * 获取所有对照表分类及对照键值对
             */
            getQueryContrast(){
                this.$request.requestAxios('get',`${this.$util.basePath}/contrast/all_contrast_info`, '',
                 (response) =>{
                  var responseData = response.data;
                  this._getQueryContrast(responseData.data);

                }, (error) => { 
                  this.$message('/contrast/all_contrast_info - 失败');
                });
              },
            _getQueryContrast(data){
                let dataJson = [];
                $.each(data, (index, item) => {
                  $.each(item.list, (subIndex, subItem) => {
                    dataJson.push(subItem)
                  });
                });
                // --------- 存储对照表数据 ----------------
                sessionStorage.setItem('controlTable', JSON.stringify(dataJson));
            },
            /*
             * 查询附件的前半截路径
             */
            getFileBasePath(){
                this.$request.requestAxios('get',basePath + '/file/basepath', '',
                 (response) =>{
                  sessionStorage.setItem('fileBasePath', response.data.data);

                }, (error) => { 
                  this.$message(basePath + '/file/basepath - 失败');
                });
            },
            /*
             * 查询职位列表
             */
            partyOrgsList(data){
              this.$request.requestAxios('get', basePath + '/party_orgs/top/list', {params: {id: data.committeeId}}, 
                (respose) => {// 请求成功回调函数...
                  sessionStorage.setItem('partyOrgsListData', JSON.stringify(respose.data.data)); 
                  
                  let activePartyOrg = respose.data.data ? respose.data.data.length ? respose.data.data[0] : null : null;
                  
                  // let partyOrgCode = activePartyOrg ? activePartyOrg.id : null ;
                  // -------------- 存储一个在 session里，避免刷新页面是，$store里的值消失
                  sessionStorage.setItem('currentPartyOrg', JSON.stringify(activePartyOrg));
                  this.$store.state.currentPartyOrg = activePartyOrg; 

                }, (error, status) => {// 请求失败回调函数...
                  status == 200 ? this.$message.error(error.data.meta.message) :
                                  this.$message.error('/party_orgs/top/list - 失败')
              });
            },
        }
    }
</script>