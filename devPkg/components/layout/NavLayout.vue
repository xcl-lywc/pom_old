<template>
    <div>
        <!-- 头部的导航 --start--  注意此项目不需要导航-->
        <!-- <div class="main-navigator">
            <navbar :urls="urls" :userData="userData"></navbar>
        </div> -->
        <!-- 头部的导航 --end-- -->

        <!-- 中间内容区，也是各个功能模块的加载区域 --start-- -->
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Navbar from "../common/Navbar.vue";
    import UserService from "../../services/user";

    export default {
        components: {
            Navbar
        },

        data() {
            return {
                urls: this._buildNavUrls(),
                userData: UserService.getCurrentUser()
            }
        },

        methods: {
            _buildNavUrls: function () {
                let routes = this.$router.options.routes,
                    urls = [];

                routes.forEach((route) => {
                    let meta = route.meta;
                    
                    if (meta && meta.showInNav) {
                        urls.push({
                            path: route.path,
                            name: meta.navName
                        });
                    }
                });

                return urls;
            }
        }
    }
</script>