<template>
  <div>
    <el-card
      v-for="(item, index) in noticeListData"
      :key="`${index}提醒`">

    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        noticeListData: [1,23,4]
      }
    },
    mounted () {
      this.websocket()
    },
    methods: {
      websocket () {
          // let ws = new WebSocket('ws://192.168.31.115:18080/notice-point');
          // ws.onopen = () => {
          //     // Web Socket 已连接上，使用 send() 方法发送数据
          //     console.log('数据发送中...')
          //     ws.send('Holle')
          //     console.log('数据发送完成')
          // }
          // ws.onmessage = evt => {
          //      console.log('数据已接收...')
          // }
          // ws.onclose = function () {
          //     // 关闭 websocket
          //     console.log('连接已关闭...')
          // }
          // // 路由跳转时结束websocket链接
          // // this.$router.afterEach(function () {
          // //     ws.close()
          // // })
          // 建立连接对象（还未发起连接）
    var socket = new SockJS("https://192.168.31.115:18080/notice-point");

    // 获取 STOMP 子协议的客户端对象
    var stompClient = Stomp.over(socket);

    // 向服务器发起websocket连接并发送CONNECT帧
    stompClient.connect(
        {},
        function connectCallback(frame) {
            // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
            setMessageInnerHTML("连接成功");
            stompClient.subscribe('/app/subscribeTest', function (response) {
                setMessageInnerHTML("已成功订阅/app/subscribeTest");
                var returnData = JSON.parse(response.body);
                setMessageInnerHTML("/app/subscribeTest 你接收到的消息为:" + returnData.responseMessage);
            });
        },
        function errorCallBack(error) {
            // 连接失败时（服务器响应 ERROR 帧）的回调方法
            setMessageInnerHTML("连接失败");
        }
    );

    //发送消息
    function send() {
        var message = document.getElementById('text').value;
        var messageJson = JSON.stringify({ "name": message });
        stompClient.send("/app/sendTest", {}, messageJson);
        setMessageInnerHTML("/app/sendTest 你发送的消息:" + message);
    }

    //订阅消息
    function subscribe1() {
        stompClient.subscribe('/topic/subscribeTest', function (response) {
            setMessageInnerHTML("已成功订阅/topic/subscribeTest");
            var returnData = JSON.parse(response.body);
            setMessageInnerHTML("/topic/subscribeTest 你接收到的消息为:" + returnData.responseMessage);
        });
    }

    //订阅消息
    function subscribe2() {
        stompClient.subscribe('/topic/sendTest', function (response) {
            setMessageInnerHTML("已成功订阅/topic/sendTest");
            var returnData = JSON.parse(response.body);
            setMessageInnerHTML("/topic/sendTest 你接收到的消息为:" + returnData.responseMessage);
        });
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        // document.getElementById('message').innerHTML += innerHTML + '<br/>';
        console.log(innerHTML)
    }

      }
    },
  } 
</script>

<style scoped>
  
</style>