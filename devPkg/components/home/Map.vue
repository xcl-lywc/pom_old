<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="pad20 border-home-er" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>党建地图</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="allmap" ref="allmap"></div>
  </div>
</template>
<style type="text/css">
  #allmap{
    width: 100%;
    height: calc(100vh);
  }
  .anchorBL{
    display: none;
  }
</style>
<script>
  import redFlag_50 from '../../images/redFlag_50.png'
  import no_picture from '../../images/no_picture.png'
  
  export default {
    data () {
      return {
        userData: JSON.parse(sessionStorage.getItem('userData')),
        pointData: null,
        mapData: [],
      }
    },
    mounted () {
      this.getQueryCommittee();
    },
    methods: {
      /*
      * 地图输入地址定位
      */
      mapLocation(){
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint("北京市海淀区上地10街", function(point){
          if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
          }else{
            alert("您选择地址没有解析到结果!");
          }
        }, "北京市");
      },
      /*
      * 百度地图初始化
      */
      initMap(){
        let self = this;
        // ----------- 百度地图API功能  
        let map = new BMap.Map("allmap");
        // ------------ 左上角，添加比例尺
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
        // --------------- 左上角，添加默认缩放平移控件
        var top_left_navigation = new BMap.NavigationControl();  

        map.addControl(top_left_control);        
        map.addControl(top_left_navigation);     

        let myIcon = new BMap.Icon(redFlag_50, new BMap.Size(50,120));

        let data_info = self.covertPointData();
        
        map.centerAndZoom(new BMap.Point(self.covertPointData()[0][0],self.covertPointData()[0][1]), 15);
        
        map.enableScrollWheelZoom(true);
        for(let i=0;i<data_info.length;i++){
          let marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon:myIcon});  // 创建标注
          let content = data_info[i][2];
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            map.addOverlay(marker);               // 将标注添加到地图中
            self.addClickHandler(content, marker, map);
        }
      },
      /*
      * 组装坐标数据并返回
      * @return data_info 
      */
      covertPointData(){
        let self = this, data_info = [];
        $.each(self.mapData, function(index, item) {
          data_info.push(
            [item.longitude,item.latitude, self._convertMessage(item)]
          );
        })
        return data_info;
      },
      /*
       * 组装信息
       */
      _convertMessage(item){
        let photo = item.headImg ? "<img alt='暂无头像' src='"+ item.headImg + "' style='width: 100px; float: left;'/>" :
                  "<img alt='暂无头像' src='./static/images/default-photo.jpg' style='width: 100px; float: left;'/>";
        return "<a style='padding-top: 10px;display: inline-block;' href='"+ location.origin +"/#/home/map/org_message/"+ item.id +"' to='/home'>"+ photo +"<div style='float: left;width: 240px;margin-left: 10px;'>名称："+ this._hasValue(item.name) + "<br/>邮箱："+ this._hasValue(item.email) + "<br/>联系电话："+ this._hasValue(item.phoneNum) + "<br/>地址："+ this._hasValue(item.address) + "</div></a>";
          
          
      },
      _hasValue(key){
        return key ? key : '无';
      },
      /*
       * 百度地图-调用弹框详情
       * @param {object} content 坐标点 
       * @param {object} marker 创建标注 
       * @param {object} map 地图实例对象 
       */
      addClickHandler(content, marker, map){
        let self = this;
        marker.addEventListener("click",function(e){
          self.openInfo(content, e, map)}
        );
      },
      /*
       * 百度地图-点击查看详情
       * @param {object} content 坐标点 
       * @param {object} e 指定要事件触发时执行的函数 
       * @param {object} map 地图实例对象 
       */
      openInfo(content, e, map){
        let opts = {
          width : 350,     // 信息窗口宽度
          height: 180,     // 信息窗口高度
          title : "信息窗口" , // 信息窗口标题
          enableMessage:true//设置允许信息窗发送短息
        };

        let p = e.target;
        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        let infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
        map.openInfoWindow(infoWindow,point); //开启信息窗口
      },  
      /*
       * 查询地图坐标信息
       * @return data
       */
      getQueryMapInfor(orgId) {
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_orgs/'+ orgId +'/partyorgtree', "", 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            // ----- 当有数据请求成功的情况下初始化地图 --------- 
            responseData.data ? self._recursionMapData(responseData.data) : self.$message('暂无地图坐标，请添加!') ;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/'+ orgId +'/partyorgtree - 失败')
        });
      },
      /*
       * 递归组织树数据 
       */
      _recursionMapData(data){
        // ------- 添加地图数据 
        this.mapData.push({
          'longitude': data.longitude,
          'latitude':  data.latitude,
          'address':   data.address,
          'headImg':   data.headImg,
          'phoneNum':  data.phoneNum,
          'email':     data.email,
          'name':      data.name,
          'id':        data.id,
        });

        if(data.childrens.length){ //当子节点的长度不为0的情况下
          $.each(data.childrens, (index, item) => {
            this._recursionMapData(item);
          });
        } else {  //当数据组装完成后调用地图
          this.initMap();
        }
       },
      /*
       *  根据党组织code获取组织集合 
       */
      getQueryCommittee() {
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_orgs/committee/ids', {params: {code: this.$store.state.currentPartyOrg.code}}, 
          function(response) {// 请求成功回调函数...
            let responseData = response.data;
            // --- 查询数据
            self.getQueryMapInfor(responseData.data[responseData.data.length-1].id);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/committee/ids - 失败Map')
        });
      },
    }
  }
</script>