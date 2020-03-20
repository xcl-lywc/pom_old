
/*************************************
*  create by xieyuanyuan date 2018/07/03
*  下拉组件
**************************************/
<template>
    <el-select v-if="itemData" v-model="itemData.value" :multiple="itemData.isMultiSelection" >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
    </el-select>
</template>
<script>
export default {
    props:{
    	itemData: {
    		default: null,
    		required: true,
    	},
        pageType: 'org',//org为组织工作台，personal为个人工作台
    },
    watch: {
        'itemData.value'(data){
            console.log(data)
            this.$emit('selectData', data)
        }
    },
    data(){
    	return {
            orgId: this.pageType == 'org' ? sessionStorage.getItem('orgId') : JSON.parse(sessionStorage.getItem('userData')).partyOrgId,
    		options: [
                // {id: 1, name: '5'},
                // {id: 2, name: '2'}
            ],
    	}
    },
    mounted(){
    	this.getApttSelectData();
    },
    methods:{
        /*
         * 查询下拉数据
         * @params {object} data
         */
        getApttSelectData(){
            let urlData = this.itemData.buttonMess
            this.$request.requestAxios(urlData.requestMethod.toLowerCase(), `${basePath}/${urlData.requestUrl}`, this._getApttSelectDataParams(),
                (response) => {
                    let responseData = response.data;
                    this.options = responseData.data;
                },(error,status) => {
                	status == 200 ? 
                		this.$message.error(error.data.meta.message):
                		this.$message.error(`/${basePath}/${urlData.requestUrl}`);

                    
                }
            );
        },
        _getApttSelectDataParams(){
            let valueData = {orgId: this.orgId};
            // ----- 不同的请求方式，传参方式不同 
            switch(this.itemData.buttonMess.requestMethod) {
                case 'GET': 
                    valueData = {params: {orgId: this.orgId}}
                    break;
                default:

                    break;
            }
            return valueData;
        }
    }
}
</script>