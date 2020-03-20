webpackJsonplensyn_ui([103],{

/***/ 1113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteDetail_vue__ = __webpack_require__(1286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4adfe01b_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_VoteDetail_vue__ = __webpack_require__(1337);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4adfe01b_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_VoteDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/vote_manage/vote_list/VoteDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4adfe01b", Component.options)
  } else {
    hotAPI.reload("data-v-4adfe01b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1286:
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

exports.default = {
  props: {
    voteDetailId: null //以组件的方式调用传过来的参数
  },
  data: function data() {
    return {
      orgCode: sessionStorage.getItem('orgCode') ? sessionStorage.getItem('orgCode') : JSON.parse(sessionStorage.getItem('userData')).orgCode,
      paramsId: this.$route.params.id,
      detail: null, //详情
      radio: 1
    };
  },
  mounted: function mounted() {
    this.getQueryDetail();
  },
  destoryed: function destoryed() {},

  methods: {
    /*
     * 查询详情
     */
    getQueryDetail: function getQueryDetail() {
      var _this = this;

      var detailId = this.paramsId ? this.paramsId : this.voteDetailId;
      this.$request.requestAxios('get', this.$util.basePath + '/v_ballot/detail/' + detailId + '/from_org/' + this.orgCode, '', function (response) {
        _this.detail = response.data.data;
      }, function (error, status) {
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error('v_ballot/detail - \u5931\u8D25');
      });
    }
  }
};

/***/ }),

/***/ 1337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.detail
    ? _c(
        "el-main",
        { staticClass: "content-manage" },
        [
          _c("el-card", { staticClass: "box-card" }, [
            _c("p", [_vm._v("选票题目：" + _vm._s(_vm.detail.ballotSpecial))]),
            _vm._v(" "),
            _c("p", [_vm._v("选票详情：" + _vm._s(_vm.detail.ballotRequire))]),
            _vm._v(" "),
            _vm.detail.privateFiles
              ? _c(
                  "p",
                  [
                    _vm._v("选票附件：\n      "),
                    _vm._l(JSON.parse(_vm.detail.privateFiles), function(
                      itemFile,
                      indexFile
                    ) {
                      return _c(
                        "el-button",
                        {
                          key: indexFile,
                          attrs: { type: "text" },
                          on: {
                            click: function($event) {
                              return _vm.$util.useFileUrldownload(itemFile.url)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n        " +
                              _vm._s(itemFile.name) +
                              "，  \n      "
                          )
                        ]
                      )
                    })
                  ],
                  2
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("el-card", { staticClass: "box-card" }, [
            _c(
              "div",
              {
                staticClass: "clearfix",
                attrs: { slot: "header" },
                slot: "header"
              },
              [_c("span", [_vm._v("问卷内容")])]
            ),
            _vm._v(" "),
            _vm.detail.hasOwnProperty("questions")
              ? _c(
                  "div",
                  _vm._l(_vm.detail.questions, function(item, index) {
                    return _c(
                      "ul",
                      { key: index },
                      [
                        _c("li", { staticClass: "mart5" }, [
                          _vm._v(
                            _vm._s(index + 1) + ". " + _vm._s(item.questionName)
                          )
                        ]),
                        _vm._v(" "),
                        _vm._l(item.options, function(itemOpt, indexOpt) {
                          return _c("ul", { staticClass: "marl20" }, [
                            _c(
                              "li",
                              { staticClass: "mart5" },
                              [
                                item.type == 0
                                  ? _c(
                                      "el-radio",
                                      {
                                        staticClass: "marr20",
                                        attrs: {
                                          disabled: "",
                                          label: itemOpt.id
                                        },
                                        model: {
                                          value: item.value,
                                          callback: function($$v) {
                                            _vm.$set(item, "value", $$v)
                                          },
                                          expression: "item.value"
                                        }
                                      },
                                      [
                                        _c("span", { attrs: { hidden: "" } }, [
                                          _vm._v(
                                            _vm._s(
                                              item.value == itemOpt.id
                                                ? (itemOpt.isChecked = true)
                                                : (itemOpt.isChecked = false)
                                            )
                                          )
                                        ]),
                                        _vm._v(
                                          "\n              " +
                                            _vm._s(itemOpt.optionName) +
                                            "\n            "
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                item.type == 1
                                  ? _c(
                                      "el-checkbox",
                                      {
                                        staticClass: "marr20",
                                        attrs: { disabled: "" },
                                        model: {
                                          value: itemOpt.isChecked,
                                          callback: function($$v) {
                                            _vm.$set(itemOpt, "isChecked", $$v)
                                          },
                                          expression: "itemOpt.isChecked"
                                        }
                                      },
                                      [_vm._v(_vm._s(itemOpt.optionName))]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                itemOpt.privateFiles
                                  ? _c(
                                      "span",
                                      [
                                        _vm._v(
                                          "\n              附件：\n              "
                                        ),
                                        _c(
                                          "el-button",
                                          {
                                            attrs: { type: "text" },
                                            on: {
                                              click: function($event) {
                                                _vm.$util.useFileUrldownload(
                                                  JSON.parse(
                                                    itemOpt.privateFiles
                                                  ).url
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                " +
                                                _vm._s(
                                                  JSON.parse(
                                                    itemOpt.privateFiles
                                                  ).name
                                                ) +
                                                " \n              "
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e()
                              ],
                              1
                            )
                          ])
                        })
                      ],
                      2
                    )
                  }),
                  0
                )
              : _vm._e()
          ])
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4adfe01b", esExports)
  }
}

/***/ })

});