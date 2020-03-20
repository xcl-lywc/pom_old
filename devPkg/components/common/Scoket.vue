/*************************************
*  create by xieyuanyuan date 2018/07/03
*  可加入自定义参数的上传功能
**************************************/
<template>
  <div>
    发送者：<input id="fromUserId" value="627">
    接收者：<input id="toUserId" value="625">
    <button type="button" @click="openClick();">打开</button>
    <button type="button" @click="closeClick();">关闭</button><br/>
    <input id="message" value="---"/>
    <button type="button" @click="sendClick();">发送</button>
    <div id="content"></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
        userData: JSON.parse(sessionStorage.getItem('userData')),
        socket: null,
        t: null,
    }
  },
  mounted(){
  },
  methods:{
    openClick(){
        this.connection();
    },
     closeClick() {
        if (this.socket) {
            this.socket.close();
        }
    },
    sendClick() {
        var fromUserId = document.getElementById("fromUserId").value;
        var toUserId = document.getElementById("toUserId").value;
        var content = document.getElementById("message").value;
        var obj = {
                "fromUserId":fromUserId,
                "toUserId":toUserId,
                "content":content
        };
        document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + '<br/>' + fromUserId + "说：" + content;
        this.socket.send(JSON.stringify(obj));
        console.log(fromUserId + "发送者说：" + JSON.stringify(content));
    },
    connection() {
      console.log("connection()");
      var fromUserId = document.getElementById("fromUserId");
      var toUserId = document.getElementById("toUserId");
      var url = `ws://10.5.104.39:18080/websocket/commodity/${this.userData.token}/`;
      if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      }else{
        console.log("您的浏览器支持WebSocket");
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.onerror;
      }
    },
    //重连
    reconnection() {
        //与服务器已经建立连接
        if (this.socket && this.socket.readyState == 1) {
            clearTimeout(t);
        } else {
            //已经关闭了与服务器的连接
            if (this.socket.readyState == 3) {
                this.connection();
            }
            //0正尝试与服务器建立连接,2正在关闭与服务器的连接
            this.t = setTimeout(function() {
                this.reconnection();
            }, 1000);
        }
    },
    onopen() {
        console.log("onopen()");
    },
    onclose() {
        console.log("onclose()");
        this.reconnection();
    },
    onmessage(e) {
        console.log("onmessage()");
        if (e.data === "") return;
        var toUserId = document.getElementById("toUserId").value;
        document.getElementById("content").innerHTML = document.getElementById("content").innerHTML + '<br/>' + toUserId + "说：" + e.data;
        console.log(toUserId + "接受者说：" + e.data);
    },
    onerror() {
        console.log("error...");
        this.reconnection();
    },
  }
}
</script>