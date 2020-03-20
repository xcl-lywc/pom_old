<template>
  <div>
    <!-- 头部banner图 -->
    <header-banner></header-banner>
    <date-background></date-background>
    <!-- 内容快 -->
    <div class="content">
      <!-- 左边内容 -->
      <left-content v-if="isRouterAlive"></left-content>
      <!-- 右边内容 -->
      <div class="content-warpper content-warpper-right fl">
        <el-card class="box-card content-box-card">
          <router-view v-if="isRouterAlive"></router-view>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../common/home/Header.vue'
  import Date_Background from '../common/home/Date_Background.vue'
  import Left_Content from '../common/home/Left_Content.vue'
  export default {
    components:{
      "header-banner": Header, // 头部固定内容
      "date-background": Date_Background, // 时间/替换背景色固定内容
      "left-content": Left_Content, // 左侧固定内容
    },
    data () {
      return {
        isRouterAlive: true, //刷新网页需要的属性
      }
    },
    computed: {
      currentPartyOrg(){
        return this.$store.state.currentPartyOrg;
      }
    },
    watch:{
      /*
       * 监听路由发生改变
       */
      $route(){
        this.reload();
      },
      /*
       * 监听当前职位是否有变化
       */
      currentPartyOrg(){
        this.reload();
      }
    },
    created(){
      // -------------- 当页面刷新，或者首次加载时，出现$store为空，那么就重新赋值一次 ------------
      if(!this.$store.state.currentPartyOrg) 
        this.$store.state.currentPartyOrg = JSON.parse(sessionStorage.getItem('currentPartyOrg'));
    },
    mounted () {
      // ---- 将socket开启 ---
      this.$util.connection();
    },
    methods: {
      /*
       * 刷新页面
       */
      reload () { 
          this.isRouterAlive = false
          this.$nextTick(() => (this.isRouterAlive = true))
       }, 
    }
  }
</script>