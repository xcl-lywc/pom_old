/**************************************
*---------------------首页-----------*
***************************************/
<template>
  <div v-loading="loading"
    class="row pad-l20 pad-r20 mr-t5" 
    style="min-height: 100px; width: 100%">
    <el-row>
      <el-col v-for="(item, index) in dataBlockJson" :key="index" 
           :span="number(item.type)">
          <div class="mar15 grid-content bg-purple-dark">
            <div v-if=" item.type == 'swiper' ">
              <div class="block cu-border">
                <el-carousel class="banner-wrapper">
                  <el-carousel-item v-for="itemImg in item.swiperData" :key="itemImg">
                    <a class="banner-wrapper-innter" :href="itemImg.link" target="_blank">
                      <img :src="itemImg.imgUrl"/>
                      <p>{{itemImg.title}}</p>
                    </a>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div v-if=" item.type == 'news'">
              <div class="cu-box-wrap">
                <h1><span class="fl">{{item.atName}}</span><a class="fr more"  href="javascript:void(0)" @click="moreButtonClicked(item)">更多&gt;</a></h1>
                <ul 
                  v-if="item.hasOwnProperty('newsData' + index)" class="cu-border ">
                  <li 
                    v-if="item['newsData' + index].hasOwnProperty('rows')"  
                    v-for="newItem in item['newsData' + index].rows" :key="newItem">
                    <router-link :to="{name: 'News_Detail', params: {id: newItem.id} }">
                      <span class="fl text">{{newItem.articleName}}</span>  
                      <span class="fr">{{_dataCovert(newItem.createTime)}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import '../../styles/home.less'
  export default {
    data() {
      return {
          dataBlockJson: null,       //框架的数据,
          userData: JSON.parse(sessionStorage.getItem('userData')),       //框架的数据,
          loading: true,             //页面加载
      }
    },
    mounted() {
      console.log(this.$store.state.orgCode)
      this.getQueryBlockData(); 
    },
    destoryed() {
       
    },
    methods: {
      /**
       * 点击 更多 记录分类信息
       * @param  {[type]} item [description]
       * @return {[type]}      [description]
       */
      moreButtonClicked (item) {
        sessionStorage.setItem("typeName", item.atName)
        sessionStorage.setItem("typeName", item.atId)
        this.$router.push({name: 'News_List', params: {object: JSON.stringify({atType: item.atType, atId: item.atId, atName: item.atName})}})
      },
      
      /*
      * 查询首页块块
      * @param {{ String }} typeId 查询ID
      */
      getQueryBlockData(){
        let self = this; 
        self.$request.requestAxios('get', basePath + '/home/data/from_org/' + this.$store.state.currentPartyOrg.code, {params: ""}, 
          function(respose) {// 请求成功回调函数...
            let resposeData = respose.data;
            self.dataBlockJson = resposeData.data;
            self._covertNewsData();
            self.loading = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/home/data - 失败');
            self.loading = false;                
          }
        )
      },
      /*
      * 组装新闻数据-文章列表查询
      */
      _covertNewsData () { 
        let self = this;
        $.each(self.dataBlockJson, function(index, item) {
          if(item.type == 'news'){
            self.$request.requestAxios('get', basePath + '/a_info/article/list/from_org/' + self.$store.state.currentPartyOrg.code, self._newsParams(item.atId), 
              function(respose) {// 请求成功回调函数...
                let resposeData = respose.data;
                item['newsData' + index] = resposeData.data;
                // -------------------------- 避免页面监听不到数据变化 -----------------------
                self.dataBlockJson = Object.assign({}, self.dataBlockJson, self.dataBlockJson);
              },function(error, status) {// 请求失败回调函数...
                status == 200 ? self.$message.error(error.data.meta.message) :
                                self.$message.error('/a_info/article/list - 失败')
            });
          }
        });
      },
      _newsParams(atId){
        return {
          params:  {
            type: atId,
            pageSize: 7,
            pageNum: 1,
          } 
        }
      },
      /*
      * 时间转换
      * @param {string} timeStamp 时间戳
      * @return time 返回转换后的时间
      */
      _dataCovert(timeStamp){
        return new Date(timeStamp).Format('yyyy-MM-dd');
      },
      /*
      * 单个类型数据转换为string类型
      * @param {object} itemData 类型数据
      * @return itemData 返回转换后的时间
      */
      _convertParams(itemData){
        return JSON.stringify(itemData);
      },
      /*
      * 根据类别判断布局格式
      */
      number(type){
        return type == 'news' ? 8 : 16;
      },
      
    }
  }
</script>