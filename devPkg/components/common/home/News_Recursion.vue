/*************************************************************
 * author yuanyuan.xie  递归栏目类别，并在最后一层栏目读取新闻 
 * date 2018/05/03 
 ************************************************************/
<template>
    <div 
      :number="hierarchy == 1 ? '第一层' : '第二层'"
      class="news-types-model" 
      :class="{'news-types-model-border': hierarchy != 1,
               'news-types-model-one': hierarchy == 1}" 
      v-if="typesModel" >
      <!-- {{hierarchy+ 'sb'}} -->
        <!-- 标题 -->
        <h4 v-if="hierarchy != 1">{{typesModel.atName}}</h4>

        <new-list :aTypeData="typesModel" v-if="typesModel.atypes.length == 0"></new-list>
        
        <!-- 递归 -->
        <items hierarchy="2" v-if="typesModel.atypes.length != 0" v-for="(itemB, indexModel) in typesModel.atypes" :key="indexModel" :typesModel="itemB"></items>
    </div>
</template>

<script type="text/javascript">
    import New_List from './New_List.vue'
    export default {
        name: 'items',
        props: {
            typesModel: {
                required: true,
                type: Object,
                default:"",
            },
            hierarchy:{     //层级
                type: Number ,
            }
        },
        components: {
            'new-list': New_List,
        },
        watch:{
          /*
          * 监听路由发生改变
          */
          $route(){
            this.paramId = this.$route.params.id
            // this.reload();
          }

        },
        data() {
            return {
                open: false,
                isFolder: true,
                isRouterAlive: true,
            }
        },
        mounted(){
        },
        methods: {
            /*
             * 刷新页面
             */
            reload () {
                // debugger
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
             }, 
        }
    }
</script>
<style type="text/css">
    .news-types-model-border{
        padding-left: 20px;
        margin-top: 20px
    }
    .news-types-model-one>div{
        border-bottom: 1px solid #dadada;
        margin-bottom: 40px;
        padding-bottom: 20px;
    }
    .news-types-model-one>div>h4{
        border-bottom: 2px solid #dc3a3a;
        padding-bottom: 20px;
        color: #dc3a3a;
        margin-right: 20px;
        font-size: 18px;
    }
    h4{
        font-size: 16px;
    }
</style>