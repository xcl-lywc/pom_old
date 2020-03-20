"use strict";
/* ES6解析兼容 */
import 'babel-polyfill'
/* 引入页面样式文件 */
import './styles/main.less'
/* 加载vue核心组件 */
import Vue from 'vue'
/* 加载vue路由 */
import Router from 'vue-router'
/* 加载vue状态管理器 */
/* vue启用路由 */
Vue.use(Router);
/* 加载路由 */
import router from "./router";
Vue.prototype.$routeSelf = router

import store from './js/utils/store.js'
Vue.prototype.$store = store


/* 各个功能模块 --start-- */
import Index from './components/Index.vue'
/* 各个功能模块 --end-- */
  

/* Element-Ui 引用*/
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

// 全局引入axios 
import axios from 'axios'
Vue.prototype.axios = axios;


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import resource from 'vue-resource'  
Vue.use(resource);  

// 全局引用公共方法
import $util from './js/utils/util.js'
Vue.prototype.$util = $util
import $request from './js/utils/request.js'
Vue.prototype.$request = $request

import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

//引入Socket
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio('http://192.168.31.115:18080/notice-point'), store);


Vue.prototype.bubbleStatus = 'false'

/* vue实例化，加载路由、状态管理器、指向模板引擎 */
let $Vue = new Vue({
    el: "#mainContent",
    router,
    store,
    render: function(createElement) {
        let routeMeta = this.$route.meta,
            props = {};
        if (routeMeta && routeMeta.type) { 
            if(routeMeta.type == 'login' || routeMeta.type == 'register'){
                props.layout = 'blank-layout'
            }else if(routeMeta.type == 'orgManage'){
                props.layout = 'orgmanage-layout'
            }else if(routeMeta.type == 'personalManage'){
                props.layout = 'personal-layout'
            }else if(routeMeta.type == 'home'){
                props.layout = 'home-layout'
            } 
        }
        return createElement(Index, {props});
    }
});

/*
 * vue-resource
 */
Vue.http.interceptors.push((request,next)=>{
  // ---------------------------- 添加token请求头，提供给后台判断，避免重复登录 -----------------------------
  if(sessionStorage.getItem('userData')){
    request.headers.set('Authorization','Bearer ' + JSON.parse(sessionStorage.getItem('userData')).token) // 请求headers携带参数
  }
  next(function (response) {
    return response
  })
})