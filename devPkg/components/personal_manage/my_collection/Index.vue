<template>
	<div class="content-manage personal-top collection-page">
		<!-- <el-tabs v-model="activeName">
		    <el-tab-pane v-for="(item, index) in urls" :key="index" :label="item.meta.navName" :name="item.meta.navName">
		    </el-tab-pane>
	    </el-tabs> -->
	    <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		    <el-menu-item :index="index" v-for="(item, index) in urls" :key="index">
		    	<router-link :to="{path: '/personal_manage/collection/' + item.path}">{{item.meta.navName}}</router-link>
		    </el-menu-item>
		</el-menu>
	    <router-view></router-view>
	</div> 
</template>

<script>
    import { util } from '../../../js/utils/util.js'
    import { request } from '../../../js/utils/request.js'
    export default {
        data() {
            return {
                urls: this._buildNavUrls(),
                isShow: 0,
                activeIndex: 0, 
            }
        },
        mounted() {
           
        },
        methods: {
            /*
            * 栏目
            */ 
            _buildNavUrls () {
                let routes = this.$router.options.routes,
                    urls = [];
                routes.forEach((route) => {
                	let meta = route.meta;

                	if (meta && meta.type === 'personalManage') {

                		route.children.forEach((subRoute) => {
                			let subMeta = subRoute.meta;
                			// debugger
                			if (subMeta.hasOwnProperty('subType')) {
                				// debugger

		                    	if(subMeta.subType === 'collection'){
		                    		urls = subRoute.children;
		                    	}
		                    }
	                    });
                	}
                    
                    
                });
                console.log(urls)
                return urls;
            },
            /*
            * 获取到每次需要切换的大栏目下标
            */
            showToggle(_index){
                this.isShow = _index;
            },
        }
    }
</script>
