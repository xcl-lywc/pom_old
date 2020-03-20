import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        socket:             null,  //scoket
        bubbleStatus: 		false, //气泡状态
        socketData:         null,  //socket传过来的数据
        isTaskDetailShow:   false, //为true我的详情页面已被打开
        subMenuTitle:       '',    //二级栏目名称
        homeBubbleStatus:   false, //首页气泡状态
        bubbleCountList:    null,  //获取气泡数组
        isLoginOut:         false, // true为退出到登录页面
        // orgCode:            null,  //
        // orgName:            null,  //
        currentPartyOrg:    null,     //当前职位
    },
    mutations: {
        watchBubble(state) {    //改变气泡状态
            state.bubbleStatus = !state.bubbleStatus;
        }
    }
})