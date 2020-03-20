/*************************************
*  create by xieyuanyuan date 2018/07/03
*  可加入自定义参数的上传功能
**************************************/
<template>
    <el-upload
        class="upload-demo static-component-con"
        :action="url"
        :multiple="true"
        :headers="{Authorization: 'Bearer ' + userData.token}"
        :on-success="imgSuccess"
        :on-remove="imgRemove"
        :auto-upload="true"
        :file-list="uploadItem.value"
        :name="name">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> 
</template>
<script>
export default {
    name: 'myupload',
    data(){
        return {
            userData: JSON.parse(sessionStorage.getItem('userData')),
        }
    },
    props:{
        url:null,
        uploadItem:null, //接收到的自定义的参数
        onSuccess:Function,
        onRemove:Function,
        fileList:null,
        name: null,
        prompt: null,
    },
    mounted(){
    },
    methods:{
        imgRemove(file){
            // debugger
            $.each(this.uploadItem.value, (index, item) => {
                if(file.fileId == item.fileId) 
                    this.uploadItem.value.splice(index, 1);
            });
            console.log(this.uploadItem.value)
            // this.onRemove(...arguments,this.uploadItem);

        },
        imgSuccess(){
            // ...arguments 包含三个参数，第四个参数才是自定义参数
            this.onSuccess(...arguments,this.uploadItem);
        },
    }
}
</script>