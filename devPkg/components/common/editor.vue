/**************文本编辑器*************/
/* 需要根据不同的编辑状态初始化      */

<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object,
          default: "",
      },
      type: {
          type: String,
          default: "new",
      }
    },
    watch :{
      config: {
        handler (newV, oldV) {
          if(this.type == "edit") {
            UE.delEditor('editor');
            this.editor = UE.getEditor('editor', newV);
          }
        },
        deep: true
      }
    },
    data() {
      return {
        editor: null
      }
    },
    created () {
      
    },
    mounted() {
      let self = this
      if(this.type == "new") {
        UE.delEditor('editor');
        self.editor = UE.getEditor('editor', self.config);
      }
    },
    methods:{
      getUEContent: function(){
        return this.editor.getContent();
      }
    }
  }
</script>
<style>
  .edui-editor.edui-default {
    z-index: 99!important;
  }
</style>