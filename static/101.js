webpackJsonplensyn_ui([101],{

/***/ 1126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__ = __webpack_require__(1444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5ef781bc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__ = __webpack_require__(1618);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5ef781bc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/home/Detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ef781bc", Component.options)
  } else {
    hotAPI.reload("data-v-5ef781bc", Component.options)
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

/***/ 1444:
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
      commentDialogVisible: false, //为true，显示评论弹框 ，false不显示
      errorDialogVisible: false, //为true，显示报错弹框 ，false不显示
      newsDetailData: null, //新闻详情数据
      commentList: [], //评论列表
      newsId: this.$route.params.id,
      linkChecked: true,
      form: { //需提交后台的表单数据
        commentContent: '',
        errorContent: ''
      }
    };
  },
  mounted: function mounted() {
    this.getNewDetail();
    this.getCommentList();
  },

  methods: {
    /*
    * 查询新闻详情
    */
    getNewDetail: function getNewDetail() {
      var self = this,
          data = null;
      self.$request.requestAxios('get', basePath + '/a_info/' + self.newsId + '/detail/from_org/' + this.$store.state.currentPartyOrg.code, "", function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.newsDetailData = resposeData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_info/' + self.newsId + '/detail - 失败');
      });
    },

    /*
    * 评论列表
    */
    getCommentList: function getCommentList() {
      var self = this,
          data = null;
      self.$request.requestAxios('get', basePath + '/a_reviewes/list', { params: { status: 2, fromId: self.newsId, fromType: '1' } }, function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.commentList = resposeData.data.rows;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_reviewes/list - 失败');
      });
    },

    /*
    * 新闻点赞
    * @return data
    */
    newsLike: function newsLike() {
      var self = this,
          data = null;
      self.$request.requestAxios('get', basePath + '/a_like/' + self.newsId + '/1/like', "", function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.getNewDetail();
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_like/' + self.newsId + '/1/like - 失败');
      });
    },

    /*
    * 评论新闻
    */
    commentNewsYes: function commentNewsYes() {
      var self = this,
          data = null;
      self.$request.requestAxios('post', basePath + '/a_reviewes/review', { fromId: self.newsId, fromType: '1', commentContent: self.form.commentContent }, function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.getCommentList();
        self.$message.success(resposeData.meta.message);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_reviewes/review');
      });

      // ------- 关闭弹框 ----------
      self.commentDialogVisible = false;
      // ---------- 清空数据 --------
      self.form.commentContent = null;
    },

    /*
    * 学习新闻
    * @return data
    */
    learnNews: function learnNews() {
      var self = this,
          data = null;
      self.$request.requestAxios('get', basePath + '/a_info/learn/' + this.newsId, '', function (respose) {
        // 请求成功回调函数...
        self.getNewDetail();
        self.$message.success(respose.data.meta.message);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_info/learn/ - 失败');
      });
    },

    /*
    * 新闻报错
    * @return data
    */
    errorCorrectionNews: function errorCorrectionNews() {
      var self = this,
          data = null;
      self.$request.requestAxios('post', basePath + '/a_errors/error', { fromId: self.newsId, fromType: '1', errorContent: self.form.errorContent }, function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.$message('报错成功！！！！');
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_errors/error - 失败');
      });

      // ------- 关闭弹框 ----------
      self.errorDialogVisible = false;
      // ---------- 清空数据 --------
      self.form.errorContent = null;
    },

    /*
    * 收藏新闻
    * @return data
    */
    collectionNews: function collectionNews() {
      var self = this,
          data = null;
      self.$request.requestAxios('patch', basePath + '/a_collection/' + self.newsId + '/1/collect/toggle', "", function (respose) {
        // 请求成功回调函数...
        self.getNewDetail();
        self.$message(respose.data.meta.message);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_collection/' + self.newsId + '/1/collect/toggle - 失败');
      });
      // ------- 关闭弹框 ----------
      self.errorDialogVisible = false;
    },

    /*
    * 时间转换
    */
    _convertDate: function _convertDate(date) {
      return new Date(date).getFullYear() + '年' + (new Date(date).getMonth() + 1) + '月' + new Date(date).getDate() + '日 ' + new Date(date).getHours() + ":" + new Date(date).getMinutes() + ":" + new Date(date).getSeconds();
    }
  }
};

/***/ }),

/***/ 1618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.newsDetailData
    ? _c(
        "div",
        [
          _c(
            "div",
            { staticClass: "detail-wrapper" },
            [
              _c(
                "el-breadcrumb",
                {
                  staticClass: "pad20 border-home-er",
                  attrs: { "separator-class": "el-icon-arrow-right" }
                },
                [
                  _c("el-breadcrumb-item", { attrs: { to: { path: "/" } } }, [
                    _vm._v("首页")
                  ]),
                  _vm._v(" "),
                  _c("el-breadcrumb-item", [
                    _vm._v(_vm._s(_vm.newsDetailData.articleName))
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("div", {
                staticClass: "detail-content pad20",
                domProps: {
                  innerHTML: _vm._s(_vm.newsDetailData.articleContent)
                }
              }),
              _vm._v(" "),
              _vm._l(JSON.parse(_vm.newsDetailData.privateFiles), function(
                itemFile,
                indexFile
              ) {
                return _vm.newsDetailData.privateFiles
                  ? _c(
                      "div",
                      { key: indexFile, staticClass: "padl20" },
                      [
                        _vm._v(
                          "\n      附件" + _vm._s(indexFile + 1) + "：\n      "
                        ),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text", title: "点击下载" },
                            on: {
                              click: function($event) {
                                return _vm.$util.downloadFile(itemFile.id)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n          " +
                                _vm._s(itemFile.name) +
                                "\n      "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _vm.$util._validateFileFormat(itemFile.name)
                          ? _c(
                              "el-button",
                              {
                                staticStyle: { display: "none" },
                                attrs: { type: "primary", size: "mini" },
                                on: {
                                  click: function($event) {
                                    return _vm.$util.fileEditOrPreview(
                                      itemFile.id,
                                      "onlyread"
                                    )
                                  }
                                }
                              },
                              [_vm._v("可在线预览")]
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  : _vm._e()
              }),
              _vm._v(" "),
              _c("div", { staticClass: "comment-wrapper pad20" }, [
                _c("hr", { staticClass: "hr-manage" }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "operation-block text-right" },
                  [
                    _c(
                      "el-checkbox",
                      {
                        attrs: { disabled: _vm.laudScore },
                        on: { change: _vm.newsLike },
                        model: {
                          value: _vm.newsDetailData.isLike,
                          callback: function($$v) {
                            _vm.$set(_vm.newsDetailData, "isLike", $$v)
                          },
                          expression: "newsDetailData.isLike"
                        }
                      },
                      [_vm._v("赞")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: {
                          size: "small",
                          type: "primary",
                          disabled: _vm.commentScore
                        },
                        on: {
                          click: function($event) {
                            _vm.commentDialogVisible = true
                          }
                        }
                      },
                      [_vm._v("评论")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: {
                          size: "small",
                          type: "primary",
                          disabled: !_vm.newsDetailData.allowLearn
                        },
                        on: { click: _vm.learnNews }
                      },
                      [_vm._v("学习")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: {
                          size: "small",
                          type: "primary",
                          disabled: _vm.errorScore
                        },
                        on: {
                          click: function($event) {
                            _vm.errorDialogVisible = true
                          }
                        }
                      },
                      [_vm._v("报错")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { size: "small", type: "primary" },
                        on: { click: _vm.collectionNews }
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.newsDetailData.isCollection
                              ? "取消收藏"
                              : "收藏"
                          )
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("hr", { staticClass: "hr-manage" }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "common-content" },
                  _vm._l(_vm.commentList, function(itemComment, index) {
                    return _c("div", [
                      _c("h4", [
                        _c("img", {
                          staticClass: "marr5",
                          attrs: {
                            src: __webpack_require__(1326)
                          }
                        }),
                        _c("span", { staticClass: "marr5" }, [
                          _vm._v(_vm._s(itemComment.creator))
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _vm._v(
                            _vm._s(_vm._convertDate(itemComment.createTime))
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "marl20 padl5" }, [
                        _vm._v(_vm._s(itemComment.commentContent))
                      ])
                    ])
                  }),
                  0
                )
              ]),
              _vm._v(" "),
              _c("hr", { staticClass: "hr-manage" })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              staticClass: "dialog",
              attrs: {
                title: "评论",
                visible: _vm.commentDialogVisible,
                width: "30%",
                "before-close": _vm.handleClose
              },
              on: {
                "update:visible": function($event) {
                  _vm.commentDialogVisible = $event
                }
              }
            },
            [
              _c(
                "div",
                [
                  _c("el-input", {
                    attrs: { type: "textarea" },
                    model: {
                      value: _vm.form.commentContent,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "commentContent", $$v)
                      },
                      expression: "form.commentContent"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "dialog-footer",
                  attrs: { slot: "footer" },
                  slot: "footer"
                },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { size: "small" },
                      on: {
                        click: function($event) {
                          _vm.commentDialogVisible = false
                        }
                      }
                    },
                    [_vm._v("取 消")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { size: "small", type: "primary" },
                      on: { click: _vm.commentNewsYes }
                    },
                    [_vm._v("确 定")]
                  )
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "el-dialog",
            {
              staticClass: "dialog",
              attrs: {
                title: "报错",
                visible: _vm.errorDialogVisible,
                width: "30%",
                "before-close": _vm.handleClose
              },
              on: {
                "update:visible": function($event) {
                  _vm.errorDialogVisible = $event
                }
              }
            },
            [
              _c(
                "div",
                [
                  _c("el-input", {
                    attrs: { type: "textarea" },
                    model: {
                      value: _vm.form.errorContent,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "errorContent", $$v)
                      },
                      expression: "form.errorContent"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "dialog-footer",
                  attrs: { slot: "footer" },
                  slot: "footer"
                },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { size: "small" },
                      on: {
                        click: function($event) {
                          _vm.errorDialogVisible = false
                        }
                      }
                    },
                    [_vm._v("取 消")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { size: "small", type: "primary" },
                      on: { click: _vm.errorCorrectionNews }
                    },
                    [_vm._v("确 定")]
                  )
                ],
                1
              )
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5ef781bc", esExports)
  }
}

/***/ })

});