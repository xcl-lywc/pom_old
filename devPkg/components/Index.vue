<template>
    <component :is="layout" name="layout"></component>
</template>

<script>
    import BlankLayout from "./layout/BlankLayout.vue";
    import OrgManageLayout from "./layout/OrgManageLayout.vue";
    import PersonalLayout from "./layout/PersonalLayout.vue";
    import HomeLayout from "./layout/HomeLayout.vue";
    
    export default {
        props: {
            layout: {
                type: String,
                default: "blank-layout"
            }
        },
        components: {
            "blank-layout": BlankLayout,
            "orgmanage-layout": OrgManageLayout,
            "personal-layout": PersonalLayout,
            "home-layout": HomeLayout
        },create(){
             //当在任一路由页面被刷新时,即是根组件app被重新创建,此时可以进行webSocket重连       //从localStorage中获取用户信息,是登录状态则可以进行webSocket重连       
            let userMessage = window.localStorage.getItem('userMessage');       
            if(userMessage){         
                userMessage = JSON.parse(userMessage);         
                this.$globalFunction.connectSocket('你的webSocket连接地址');       
            }    
        },
    }
</script>