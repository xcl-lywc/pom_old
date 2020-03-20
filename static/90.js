webpackJsonplensyn_ui([90],{

/***/ 1158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Notice_vue__ = __webpack_require__(1490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Notice_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Notice_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Notice_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Notice_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_64c5adfe_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_My_Notice_vue__ = __webpack_require__(1749);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1747)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-64c5adfe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Notice_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_64c5adfe_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_My_Notice_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/My_Notice.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64c5adfe", Component.options)
  } else {
    hotAPI.reload("data-v-64c5adfe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1490:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(188);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            noticeListData: [1, 23, 4]
        };
    },
    mounted: function mounted() {
        this.websocket();
    },

    methods: {
        websocket: function websocket() {
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
            stompClient.connect({}, function connectCallback(frame) {
                // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
                setMessageInnerHTML("连接成功");
                stompClient.subscribe('/app/subscribeTest', function (response) {
                    setMessageInnerHTML("已成功订阅/app/subscribeTest");
                    var returnData = JSON.parse(response.body);
                    setMessageInnerHTML("/app/subscribeTest 你接收到的消息为:" + returnData.responseMessage);
                });
            }, function errorCallBack(error) {
                // 连接失败时（服务器响应 ERROR 帧）的回调方法
                setMessageInnerHTML("连接失败");
            });

            //发送消息
            function send() {
                var message = document.getElementById('text').value;
                var messageJson = (0, _stringify2.default)({ "name": message });
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
                console.log(innerHTML);
            }
        }
    }
};

/***/ }),

/***/ 1747:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1748);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("45cab884", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-64c5adfe\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./My_Notice.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-64c5adfe\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./My_Notice.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1748:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 1749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    _vm._l(_vm.noticeListData, function(item, index) {
      return _c("el-card", { key: index + "提醒" })
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-64c5adfe", esExports)
  }
}

/***/ })

});