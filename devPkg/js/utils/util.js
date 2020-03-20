import vue from 'vue';
import Vuex from 'vuex'
/* 加载vue路由 */
import Router from 'vue-router'
vue.use(Vuex)
vue.use(Router)
const Vue = new vue();
export default {
  'timeT':          null, //用于清空时间
  'basePath':       location.origin + "/api",
  'fileBasePath':   location.origin + "/pics",
  'msBasePath':     location.origin + "/ms",
  'webScoketSever': location.host   + "/api", 
  'userData': sessionStorage.getItem('userData'), //用户信息
  // 'homeFromOrg': sessionStorage.getItem('partyOrgCode') ? //接入所有关于首页需要的orgCode权限
  //                 `from_org/${sessionStorage.getItem('partyOrgCode') ? sessionStorage.getItem('partyOrgCode') : ''}` : '',  
  'layPage': {        //分页
      layPageParam: { 
          totalSize: 180,     //总条数
          pageNum: 1,         //页码
          pageSize: 15,       //条数
          pageNumDefault: 1,  //初始页码
          pageSizeDefault: 15,//初始条数
      }
  },
  'elementPagination':{     //elementUi中的分页所需数据
      pageSizes: [10, 20, 30],
      pageSizeDefault: 10,   //初始条数
      pageNumDefault:1,      //初始页码
  },
  'org':{
      orgChlidrensimple: '',
      partyorg: '',
  },
  timeType: [ // 分页类型
    {
      label: "年份",
      value: 1
    },
    {
      label: "月份",
      value: 2
    },
    {
      label: "日期",
      value: 3
    },
    {
      label: "时刻",
      value: 4
    },
  ],
  /**
   * 根据规定好的时间格式显示时间
   * @return {[type]} [description]
   */
  showDate (date) {
    if(!date) {
      return "无"
    } else {
      let dateString = ""
      switch(date.type){
        case 1:
          dateString = this._convertDate(date.date_time, 'yyyy年');
          break;
        case 2:
          dateString = this._convertDate(date.date_time, 'yyyy年MM月');
          break;
        case 3:
          dateString = this._convertDate(date.date_time, 'yyyy年MM月dd日');
          break;
        case 4:
          dateString = this._convertDate(date.date_time, 'yyyy年MM月dd日 hh:mm:ss');
          break;
        default:
          dateString = "无";
          break;
      }
      return dateString
    }
  },
  /**
   * 根据时间类型type 返回对应的时间控件类型string
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  datePickerType (type) {
    let typeText
    switch (type) {
      case 1:
        typeText = "year";
        break;
      case 2:
        typeText = "month";
        break;
      case 3:
        typeText = "date";
        break;
      case 4:
        typeText = "datetime";
        break;
    }
    return typeText
  },
  /**
   * 操作分页函数
   * @param {string} elementId 元素ID名
   * @param {boolean} initPage 为true初始化分页，false则不初始化
   * @param {object} jumpfun 改变页码是处理数据（传入的是一个方法）
   */
  initialPage (elementName, initPage, jumpfun) {
      let self = this
      let paramPage = util.layPage.layPageParam;
      if(initPage) {
          let laypage ;
          layui.use('laypage', function(){
          let laypage = layui.laypage,
              layer = layui.layer;
              laypage.render({
                  elem:   elementName,
                  count:  paramPage.totalSize ,  //总条数
                  curr:   paramPage.pageNum || paramPage.pageNumDefault, //获取起始页        
                  theme:  '#427dd1',
                  limit:  paramPage.pageSize || paramPage.pageSizeDefault, 
                  limits: [paramPage.pageSizeDefault,paramPage.pageSizeDefault*2,paramPage.pageSizeDefault*3],
                  layout: ['limit', 'count', 'prev', 'page', 'next'],
                  jump: function (target, first) {
                      if(!first){ // 点击的回调 curr当前页  limit每页的条数
                          // self.$set(self.initPage,'bool',false);
                          // paramPage.pageNum = target.curr;
                          // paramPage.pageSize = target.limit;
                          jumpfun(target)
                      }
                  }
              })
          })
      }
  },
  /**
   * banner图片滚动效果
   * @param {string} bannerWrapper 滚动元素标识符
   * @param {string} imgWidth 图片宽度
   * @param {number} bannerLength 图片个数
   */
  bannerScorll(bannerWrapper, imgWidth, bannerLength){
      let initCount = 0;
      $(bannerWrapper + ' img').width(imgWidth);

      //------------------ 复制一组图片 -----------------
      $(bannerWrapper).children('div').eq(1).append($(bannerWrapper).children('div').eq(0).clone(true));

      let temp = function() {     
          initCount ++;
          if(initCount > bannerLength){
              //--------------- 替换两组图片的位置 -------------------
              $(bannerWrapper).append($(bannerWrapper).children('div').eq(0));
              initCount = 0;
              
              $(bannerWrapper).css('left',0);
          }else{
              //------------------------------------ 每次滚动一屏-----------------------------------
              $(bannerWrapper).stop().animate({'left':- (imgWidth * initCount) +'px'},500);
          }
      }
      setInterval(temp, 2000)
  },
  /*
   * 无缝滚动
   * @param {string} wrap 第一层元素ID
   * @param {string} con  第二层元素ID
   * @param {string} wrap1 第三层元素ID
   * @param {string} wrap2 第三层元素ID副本
   */
  seamlessRolling(warpId, conId, box1Id, box2Id) {
      let warp = document.getElementById(warpId);
      let con = document.getElementById(conId);
      let box1 = document.getElementById(box1Id);
      let box2 = document.getElementById(box2Id);
      let timer1 = null, x = 0;
      
      //-----------滚动函数
      warp.scroll = function(){
          box2.innerHTML=box1.innerHTML;
          timer1 = setInterval(function(){
              x++;
              if ( x>=box1.clientWidth ) {
              x = 0;
              warp.scrollLeft=x;
          }
          warp.scrollLeft = x;
          },10)
      }
      //---默认调用滚动函数
      warp.scroll();
      //----------- 浮动事件
      warp.onmouseenter = function(){
          clearInterval(timer1);
      }
      //----------- 离开事件
      warp.onmouseleave = function(){
          warp.scroll();
      }
  },
  /*
   * 将时间戳转换为某年某月某日 00：00：00
   * @params {string/number} timeSetback 时间戳
   * @params {string} format 时间格式
   */
  _convertDate(timeSetback, format){
      return timeSetback ? new Date(timeSetback).Format(format) : '无';
  },
  /*
   * 查询文件流并下载
   * @params {string/number} fileId 
   */
  downloadFile(fileId){
    let self = this; 
    // ------ 文件流下载必须要指定responseType的类型为blob才能正确显示
    Vue.$request.requestAxios('get', basePath + '/file/'+ fileId +'/download', {responseType: "blob"}, 
      function(respose) {// 请求成功回调函数...
        self._fileBold(respose)
      },function(error) {// 请求失败回调函数...
        Vue.$message('/file/'+fileId+'/download - 失败', 20)
      } 
    );
  },
  /*
   * blod 下载附件
   */
  _fileBold(respose) {
    let fileName = decodeURI(respose.headers['content-disposition'].substring(20, respose.headers['content-disposition'].length));
    let url = window.URL.createObjectURL(new Blob([respose.data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  },
  /*
   * 根据文件地址下载到本地
   * @params {string} fileUrl 
   */
  useFileUrldownload(fileUrl){
    let fileBasePath = sessionStorage.getItem('fileBasePath')
    window.open(fileBasePath + '/' + fileUrl);    
  },
  /*
   * 在线编辑或预览附件
   * @params {string/number} fileId 
   * @params {string} status read编辑，onlyread预览 
   */
  fileEditOrPreview(fileId, status){
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    if(status == 'read'){
      return POBrowser.openWindowModeless(`${Vue.$util.basePath}/pageoffice/word/read/${fileId}/${userData.token}`, 'width=900px;height=800px;');  
    }else{
      return POBrowser.openWindowModeless(`${Vue.$util.basePath}/pageoffice/word/onlyread/${fileId}/${userData.token}`, 'width=900px;height=800px;');
    }
   },
  /*
   * 验证附件格式是否符合编辑或者预览
   */
  _validateFileFormat(fileName){
    return /\.(xls|xlsx|doc|docx|ppt|pptx)$/.test(fileName)
   },
  /*
   * 附件上传之前后，验证的数据大小
   * @params {object} file 附件
   */
  verificationFileSize(file){
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      Vue.$message.error('附件大小不能超过 100MB!');
      
    }
    return isLt2M;
   }, 
  /*
   * 根据Id来显示对应的中文（对照表）
   */
  controlTable(id){
    let data = JSON.parse(sessionStorage.getItem('controlTable')), name ;
    $.each(data, (index, item) => {
      if(id == item.key){
        name = item.value
      } 
    });
    return name ? name : '无';
   },
  /*
   * 发送socket事件
   */ 
  sendClick() {
      let userData = JSON.parse(sessionStorage.getItem('userData'));
      let fromUserId = document.getElementById("fromUserId").value;
      let toUserId = document.getElementById("toUserId").value;
      let obj = {
              "fromUserId":userData.userId,
              "toUserId":toUserId,
              "content":content
      };
      document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + '<br/>' + fromUserId + "说：" + content;
      Vue.$store.state.socket.send(JSON.stringify(obj));
      console.log(fromUserId + "发送者说：" + JSON.stringify(content));
  },
  /*
   * 启动scoket 
   * @params {object} data send给后台的数据
   */
  connection(data) { 
    console.log("connection()");
    console.log(data);
    if (!sessionStorage.getItem('userData')) return false;
    var url = `ws://${Vue.$util.webScoketSever}/websocket/commodity/${JSON.parse(sessionStorage.getItem('userData')).token}/`;
    if(typeof(WebSocket) == "undefined") {
      console.log("您的浏览器不支持WebSocket");
    }else{ 
      // console.log("您的浏览器支持WebSocket");
      // ---------- 一开始进来就判断一下当前scoket是否打开 ------------ 
      if(Vue.$store.state.socket ? Vue.$store.state.socket.readyState === 1 : false){
        Vue.$store.state.socket.send(JSON.stringify(data));
        console.log("send.....")
        return false;
      }
      Vue.$store.state.socket = new WebSocket(url);
      Vue.$store.state.socket.onopen = Vue.$util.onopen(data);
      Vue.$store.state.socket.onclose = Vue.$util.onclose(data);
      Vue.$store.state.socket.onerror = Vue.$util.onerror;
      Vue.$store.state.socket.onmessage = Vue.$util.onmessage;
      
      // ------ 循环，直到获取到当前socket的状态为1，在关闭循环 ---------
      let set = setInterval( () => {
        if(Vue.$store.state.socket ? Vue.$store.state.socket.readyState === 1 : false){
          Vue.$store.state.socket.send(JSON.stringify(data));
          console.log("send.....")
          clearTimeout(set);
        }
      },1000) 
    }
  },
  sendMessage(data){

  },
  //重连
  reconnection(data) {
    // console.log('reconnection')
    //与服务器已经建立连接
    if (Vue.$store.state.socket && Vue.$store.state.socket.readyState == 1) {
        clearTimeout(Vue.$util.timeT);
    } else { 
      // console.log(Vue.$store.state.socket.readyState,Vue.$store.state.isLoginOut)
      //3与服务器关闭连接，并且当前并没有退出登录，将建立重连 
      if (Vue.$store.state.socket.readyState == 3 && !Vue.$store.state.isLoginOut) {
        Vue.$util.connection(data);
      }else if(Vue.$store.state.isLoginOut){ //当前是登录页面时，就不用重连
        clearTimeout(Vue.$util.timeT);
        return false;
      }
      //0正尝试与服务器建立连接,2正在关闭与服务器的连接
      Vue.$util.timeT = setTimeout(()=> {
          Vue.$util.reconnection(data);
      }, 10000); 
                          
    }
  },
  onopen(data) { 
    console.log('open')
  },
  onclose(data) {
    console.log("onclose()");
    Vue.$util.reconnection(data);
  },
  onmessage(e, data) { 
    let dataJson = JSON.parse(e.data), 
        routePath = `${Vue.$routeSelf.history.current.fullPath}`,
        sessionOrgId = sessionStorage.getItem('orgId'),
        sessionUserData = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : '',
        activeOrgList = [];
    console.log(dataJson)
    if (e.data === "") return;
    // ---- 需要改变的气泡
    if(dataJson.operateType == 'bubble'){
      // --------------------- 有orgId操作组织工作台 ----------------
      if( dataJson.fromType == 2 ){
        Vue.$util._orgBubble(e, data);
      }else{ // 无orgId操作个人工作台
        if(Vue.$store.state.bubbleCountList){
          Vue.$util._messageContrast(dataJson.bubbleCount)
        }else{
          Vue.$store.state.bubbleCountList = dataJson.bubbleCount;
        }
      } 
    }
  },
  _orgBubble(e, data){ 
    let dataJson = JSON.parse(e.data), 
        routePath = `${Vue.$routeSelf.history.current.fullPath}`,
        sessionOrgId = sessionStorage.getItem('orgId'),
        sessionUserData = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : '',
        activeOrgList = [];
    // --------- false表示是后台主动返回的数据 ----- 
    if(!dataJson.isSend){
      // ------- 组装用户信息查询出来的职位列表中的orgId与当前被选中的组织Id相匹配
      if(sessionUserData){
        sessionUserData.positions.forEach((item) => {
          if(item.orgid == sessionOrgId) 
            activeOrgList.push(item)
        })
      }
      // ------- 列表中的职位Id要跟返回回来的职位Id(fromId)相匹配,才能计算气泡 -----
      activeOrgList.forEach( (item) => {
        if(item.memPositionId == dataJson.fromId){
          if(Vue.$store.state.bubbleCountList){
            Vue.$store.state.bubbleCountList = Vue.$util._messageContrast(dataJson.bubbleCount)
          }else{
            Vue.$store.state.bubbleCountList = dataJson.bubbleCount;
          }
        }
      }) 
    }else{ //---- 前台发起的请求，并获取数据
      if(Vue.$store.state.bubbleCountList){
          Vue.$store.state.bubbleCountList = Vue.$util._messageContrast(dataJson.bubbleCount)
        }else{
          Vue.$store.state.bubbleCountList = dataJson.bubbleCount;
        }
    } 
  },
  /*
   * socket与之前state中存储的气泡数据作对比
   */
  _messageContrast(dataBubble){    
   Vue.$store.state.bubbleCountList.forEach((item) => {
      dataBubble.forEach((dataItem) => {
        if(item.id == dataItem.id){
          // 获取到第一层改变的气泡数量
          item.count = item.count + dataItem.count;

          item.childs.forEach( (subItem) => {
            dataItem.childs.forEach( (subDataItem) => {
              // ---- 获取到第二层改变的气泡数量 -------- 
              if(subItem.id == subDataItem.id) {
                subItem.count = subDataItem.count;
              }
            })
          })
        }
      })
    })  
   return Vue.$store.state.bubbleCountList;
  },
  onerror() {
    // console.log("error...");
    Vue.$util.reconnection();
  },
  
  /**
   * 遍历树(递归遍历), 删除空白的childrens
   * @param  {object}   node         根节点(单个对象, 多个树需要重复调用)
   * @param  {string}   childrenName 子节点的名称
   * @return none
   */
  traverseTree (node, childrenLabel) {
    let childrens = null

    if(childrenLabel) {
      childrens = childrenLabel
    } else {
      childrens = "childrens"
    }
    if (!node) {
      return;
    }

    if (node[childrens] && node[childrens].length > 0) {
      var i = 0;
      for (i = 0; i < node[childrens].length; i++) {
        if(childrenLabel) {
          this.traverseTree(node[childrens][i], childrenLabel);
        } else {
          this.traverseTree(node[childrens][i]);
        }
      }
    } else {
      delete node[childrens]
    }
  },
  /*
   * 获取对照表
   */
  getContrast () {
    Vue.$request.requestAxios('get',`${Vue.$util.basePath}/contrast/all_contrast_info`, '',
    (response) =>{
      sessionStorage.setItem('contrast', JSON.stringify(response.data.data));
    }, (error) => { 
      Vue.$message.error('失败');
    });
  },
  /**
   * 根据值返回对照表的数据
   * @param {number} itemId    分类的Id
   * @param {number} itemValue 对应的值
   */
  setTableColumn (itemId, itemValue) {
    let data = JSON.parse(sessionStorage.getItem('contrast')), name
    data.forEach((item, index) => {
      if(itemId == item.id) {
        item.list.forEach((itemInner, indexInner) => {
          if (itemValue == itemInner.key) {
            name = itemInner.value
          }
        })
      }
    })
    return name;
  },
  /*
   * 表格隔行换色
   */
  tableRowClassName({row, rowIndex}) {
    if (rowIndex%2 === 1) { //双行为指定颜色
      return 'wathet-row';
    } else if (!rowIndex%2) { //单行为默认颜色
      return 'white-row';
    }
    return '';
   },
  /*
   * 根据当前Id获取气泡数量
   * @params {string/ number} hierarchy 层级 
   * @params {string/ number} id  
   */
  menuBubbleNum(hierarchy, id){
    let bubbleS = Vue.$store.state.bubbleCountList, bubbleCount = 0;
    if(bubbleS){
      if(hierarchy == 1){ //第一层
        bubbleS.forEach((item) => {
          if(item.id == id){
            bubbleCount = item.count;
          } 
        });
      }else if(hierarchy == 2){ // 第二层
        bubbleS.forEach((item) => {
          item.childs.forEach((childItem) => {
            if(childItem.id == id){
              bubbleCount = childItem.count;
            } 
          }); 
        });
      }
    }
    return bubbleCount ? bubbleCount : '';
  },
  /**
   * 转换时间戳为格式化的时间字符串
   * @param  {number} timestamp 时间戳
   * @return {string}           格式化后的时间字符串
   */
  timestampToTime (timestamp, showTime) {
    if(timestamp) {
      let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' '
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      if(showTime) {
        return Y+M+D+h+m+s;
      } else {
        return Y+M+D;
      }
      
    } else {
      return ""
    }
  },
  /**
   * 当前时间的时间戳
   * @return {number} 当前时间的时间戳
   */
  nowDate () {
    let date = new Date().getTime()
    return date
  },
  /*
   * 验证身份证是否有效
   */
  _identityCodeValid(code) {
    var pass= true;
    let regexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!regexp.test(code)){
      pass = false;
    }
    return pass;
  },
}

/*
*   格式化日期格式
*/
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}