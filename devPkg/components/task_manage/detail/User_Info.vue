
/*************************************
*  create by xieyuanyuan date 2018/07/03
*  下拉组件
**************************************/
<template>
    <span v-if="userInfo">{{userInfo.name}}</span>
</template>
<script>
export default {
    props:{
    	userId: {
    		default: null,
    		required: true,
    	},
    },
    data(){
    	return {
            userInfo: null,
    	}
    },
    mounted(){
    	this.getQueryUserInfo();
    },
    methods:{
        /*
         * 根据Id查询用户信息
         */
        getQueryUserInfo(){
            this.$request.requestAxios('get', `${basePath}/hr_users/info/${this.userId}`, '',
                (response) => {
                    this.userInfo = response.data.data;
                },(error,status) => {
                	status == 200 ? 
                		this.$message.error(error.data.meta.message):
                		this.$message.error(`${basePath}/hr_users/info/${this.userId}`);
                }
            );
        },
    }
}
</script>