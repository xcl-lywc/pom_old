webpackJsonplensyn_ui([99],{

/***/ 1160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Mailbox_Detail_vue__ = __webpack_require__(1492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Mailbox_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Mailbox_Detail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Mailbox_Detail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Mailbox_Detail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_71bc1bca_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_My_Mailbox_Detail_vue__ = __webpack_require__(1751);
var disposed = false
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_My_Mailbox_Detail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_71bc1bca_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_My_Mailbox_Detail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/my_mailbox/My_Mailbox_Detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71bc1bca", Component.options)
  } else {
    hotAPI.reload("data-v-71bc1bca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1326:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAA+UlEQVQ4y6XRMSuFYRjG8d95M5hkU8SkFB9B2ZR0PoHCeJ9FWQiL0WSw4PkCDBabSVGGszHJFzAwUJSBOlnOOentfY/X8R+v7uv/3HdPTQEppWU0MNOOmjiOiPP8bK2gvIctxaxHxEGpIKW0gAvltDAbEc1OkOUGVvQmw2o+6Lw+iEm/M14owCfeKgjeCwUR0cJNBcFl2QZwiLse5SuclAoi4hk77XPyvGIzIj5+ht1vTClNYBt1jBZs94VHnGE/Ip66gpTSHE7bxSo8YCkibmsppSlcY6RiucM95jNs9FGGaTQyLPZR7lDPMPwPwdgAdrGGoT+WX3D0DUyeOrX/WUbeAAAAAElFTkSuQmCC"

/***/ }),

/***/ 1492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
//
//

exports.default = {
  data: function data() {
    return {
      isLoad: true, //等待事件
      paramsId: this.$route.params.id,
      orgCode: sessionStorage.getItem('orgCode'), //党组织code
      orgId: sessionStorage.getItem('orgId'), //党组织code
      detail: null,
      comment: {
        commentContent: null,
        commentList: [] //评论列表 

      }
    };
  },
  mounted: function mounted() {
    this.getQueryList();
  },

  methods: {
    /*
     * 查询课程列表
     */
    getQueryList: function getQueryList() {
      var _this = this;

      this.$request.requestAxios('get', this.$util.basePath + '/email/' + this.paramsId + '/details', '', function (response) {
        //请求成功的回调...
        _this.detail = response.data.data;
        _this.getCommentList();
        _this.isLoad = false;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error(_this.$util.basePath + '/email/' + _this.paramsId + '/details - \u5931\u8D25');
        _this.isLoad = false;
      });
    },

    /*
     * 评论列表
     */
    getCommentList: function getCommentList() {
      var self = this,
          data = null;
      self.$request.requestAxios('get', basePath + '/t_tasks/review/list', { params: { fromId: self.detail.taskId, fromType: '2' } }, function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.comment.commentList = resposeData.data.rows;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_reviewes/list - 失败');
      });
    },

    /*
     * 回复
     */
    replyAdd: function replyAdd(id) {
      var self = this,
          data = null;
      self.$request.requestAxios('post', basePath + '/t_tasks/review', { fromId: self.detail.taskId, fromType: '2', commentContent: self.comment.commentContent }, function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.getCommentList();
        // ---------- 清空数据 --------
        self.comment.commentContent = null;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_reviewes/review - 失败');
      });
    }
  }
};

/***/ }),

/***/ 1751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.detail
    ? _c(
        "div",
        { staticClass: "content-manage personal-top collection-page" },
        [
          _c(
            "el-card",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isLoad,
                  expression: "isLoad"
                }
              ],
              staticClass: "box-card"
            },
            [
              _c("p", { staticClass: "marb5" }, [
                _vm._v("收件人：" + _vm._s(_vm.detail.addresseeName))
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "marb5" }, [
                _vm._v(
                  "发件人：" +
                    _vm._s(!_vm.detail.anonym ? _vm.detail.createrName : "匿名")
                )
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "marb5" }, [
                _vm._v(
                  "发送时间：" +
                    _vm._s(
                      _vm.$util._convertDate(
                        _vm.detail.sendTime,
                        "yyyy年MM月dd日 hh:mm:ss"
                      )
                    )
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isLoad,
                  expression: "isLoad"
                }
              ],
              staticClass: "box-card mart10"
            },
            [
              _c(
                "div",
                {
                  staticClass: "clearfix",
                  attrs: { slot: "header" },
                  slot: "header"
                },
                [_c("span", [_vm._v("正文")])]
              ),
              _vm._v(" "),
              _c("p", {
                staticClass: "marb5",
                domProps: { innerHTML: _vm._s(_vm.detail.content) }
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isLoad,
                  expression: "isLoad"
                }
              ],
              staticClass: "box-card mart10"
            },
            [
              _c(
                "div",
                {
                  staticClass: "clearfix",
                  attrs: { slot: "header" },
                  slot: "header"
                },
                [_c("span", [_vm._v("处理意见")])]
              ),
              _vm._v(" "),
              _c("p", { staticClass: "marb5" }, [
                _vm._v(_vm._s(_vm.detail.opinion))
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isLoad,
                  expression: "isLoad"
                }
              ],
              staticClass: "box-card mart10"
            },
            [
              _c(
                "div",
                {
                  staticClass: "clearfix",
                  attrs: { slot: "header" },
                  slot: "header"
                },
                [
                  _c("span", [_vm._v("处理反馈")]),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "fr" },
                    [
                      _c("span", { staticClass: "fl" }, [_vm._v("评分：")]),
                      _vm._v(" "),
                      _c("el-rate", {
                        staticClass: "fl",
                        attrs: {
                          disabled: "",
                          "show-score": "",
                          "text-color": "#ff9900"
                        },
                        model: {
                          value: _vm.detail.satisfaction,
                          callback: function($$v) {
                            _vm.$set(_vm.detail, "satisfaction", $$v)
                          },
                          expression: "detail.satisfaction"
                        }
                      })
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c("p", { staticClass: "marb5" }, [
                _vm._v(_vm._s(_vm.detail.assessment))
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "el-card",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.isLoad,
                  expression: "isLoad"
                }
              ],
              staticClass: "box-card mart10"
            },
            [
              _c(
                "div",
                {
                  staticClass: "clearfix",
                  attrs: { slot: "header" },
                  slot: "header"
                },
                [_c("span", [_vm._v("沟通记录")])]
              ),
              _vm._v(" "),
              _c("div", [
                _c(
                  "div",
                  { staticClass: "leave-message-detail" },
                  _vm._l(_vm.comment.commentList, function(itemComment, index) {
                    return _c("div", { staticClass: "padt15 padl20" }, [
                      _c("h5", [
                        _c("img", {
                          staticClass: "marr5",
                          attrs: {
                            src: __webpack_require__(1326)
                          }
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "marr5" }, [
                          _vm._v(_vm._s(itemComment.creator))
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm.$util._convertDate(
                                itemComment.createTime,
                                "yyyy年MM月dd日"
                              )
                            )
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "marl20 padl15 padt5" }, [
                        _vm._v(_vm._s(itemComment.commentContent))
                      ])
                    ])
                  }),
                  0
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "leave-message text-right mart20" },
                  [
                    _c("el-input", {
                      attrs: {
                        type: "textarea",
                        placeholder: "请回复点什么吧"
                      },
                      model: {
                        value: _vm.comment.commentContent,
                        callback: function($$v) {
                          _vm.$set(_vm.comment, "commentContent", $$v)
                        },
                        expression: "comment.commentContent"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticClass: "mart20 marr20",
                        attrs: { size: "small", type: "primary" },
                        on: { click: _vm.replyAdd }
                      },
                      [_vm._v("评论")]
                    )
                  ],
                  1
                )
              ])
            ]
          )
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-71bc1bca", esExports)
  }
}

/***/ })

});