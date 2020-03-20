webpackJsonplensyn_ui([72],{

/***/ 1173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__ = __webpack_require__(1506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_665bcd96_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Vote_vue__ = __webpack_require__(1765);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_665bcd96_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Vote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/vote/vote_activity_list/Vote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-665bcd96", Component.options)
  } else {
    hotAPI.reload("data-v-665bcd96", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(439);

var _assign2 = _interopRequireDefault(_assign);

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
//
//
//
//
//
//
//

exports.default = {
  props: {
    pageType: null
  },
  data: function data() {
    return {
      orgCode: this.pageType == 'org' ? sessionStorage.getItem('orgCode') : JSON.parse(sessionStorage.getItem('userData')).orgCode,

      paramsId: this.$route.params.id,
      detail: null, //详情
      radio: 1,
      form: {
        "partyOrgCode": this.pageType == 'org' ? sessionStorage.getItem('orgCode') : JSON.parse(sessionStorage.getItem('userData')).orgCode,
        "questions": [],
        "voteId": null
      }
    };
  },
  created: function created() {
    this.getQueryDetail();
  },
  mounted: function mounted() {},
  destoryed: function destoryed() {},

  methods: {
    /*
     * 查询题目详情
     */
    getQueryDetail: function getQueryDetail() {
      var _this = this;

      var url = this.pageType == 'org' ? this.$util.basePath + '/v_vote/question/from_org/' + this.orgCode : this.$util.basePath + '/v_vote/question';

      this.$request.requestAxios('get', url, { params: { id: this.paramsId } }, function (response) {
        _this._questionAssemble(response.data.data);
      }, function (error, status) {
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error(url + ' - \u5931\u8D25');
      });
    },

    /*
     * 给题目增加一个接收值得字段
     */
    _questionAssemble: function _questionAssemble(data) {
      if (data.questions) {
        $.each(data.questions, function (index, item) {
          item.type == 0 ? item.value = null : item.value = [];
        });
        // --------------- 避免页面监听不到数据变化 -----------------
        this.detail = (0, _assign2.default)({}, data, data);
      }
    },

    /*
     * 提交数据
     */
    onSubmit: function onSubmit() {
      var _this2 = this;

      var url = this.pageType == 'org' ? this.$util.basePath + '/v_vote/answer/from_org/' + this.orgCode : this.$util.basePath + '/v_vote/answer';

      if (this._validIsAnswer()) {
        this.$request.requestAxios('post', url, this._onSubmitParams(), function (response) {
          _this2.$message.success({ message: '投票成功，将跳转到详情页！', duration: 1200 });
          setTimeout(function () {
            _this2.pageType == 'org' ? _this2.$router.push({ name: 'Activity_Detail', params: { id: _this2.paramsId } }) : _this2.$router.push({ name: 'Personal_Activity_Detail', params: { id: _this2.paramsId } });
          }, 1500);
        }, function (error, status) {
          status == 200 ? _this2.$message.error(error.data.meta.message) : _this2.$message.error(url + ' - \u5931\u8D25');
        });
      }
    },
    _onSubmitParams: function _onSubmitParams() {
      return {
        questions: this._convertIsAnswer(),
        partyOrgCode: sessionStorage.getItem('orgCode'),
        voteId: this.paramsId
      };
    },

    /*
     * 筛选被选中的答案,并验证每个题中是否都有答案
     */
    _convertIsAnswer: function _convertIsAnswer() {
      var answers = [];
      $.each(this.detail.questions, function (index, item) {
        answers.push({ id: item.id, options: [] });

        if (item.type == 0) {
          answers[index].options.push({ id: item.value });
        } else {
          $.each(item.value, function (indexOpt, itemOpt) {
            answers[index].options.push({ id: itemOpt });
          });
        }
      });
      // --------------- 避免页面监听不到数据变化 -----------------
      this.detail = (0, _assign2.default)({}, this.detail, this.detail);
      return answers;
    },

    /*
     * 验证每个题中是否都有答案
     */
    _validIsAnswer: function _validIsAnswer() {
      var answers = [],
          isAllAnswer = true; //为false表示不能提交（没有将所有的题选中答案）
      $.each(this.detail.questions, function (index, item) {
        // --- 当有答案时，就不显示提醒
        item.isAnswer = true;
        if (item.type == 0) {
          //单选题
          if (!item.value) {
            isAllAnswer = false;
            item.isAnswer = false;
          }
        } else {
          //多选题
          // 多选的选项长度必须大于最小数，并且小于最大数
          if (!(item.value.length >= item.minOption && item.value.length <= item.maxOption)) {
            isAllAnswer = false;
            item.isAnswer = false;
          }
        }
      });

      // --------------- 避免页面监听不到数据变化 -----------------
      this.detail = (0, _assign2.default)({}, this.detail, this.detail);

      return isAllAnswer;
    }
  }
};

/***/ }),

/***/ 1425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__ = __webpack_require__(1394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_44e03eea_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Vote_vue__ = __webpack_require__(1426);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Vote_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_44e03eea_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Vote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/common/vote_activity_list/Vote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44e03eea", Component.options)
  } else {
    hotAPI.reload("data-v-44e03eea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1426:
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
            _c("p", { staticClass: "mart5" }, [
              _vm._v("投票题目：" + _vm._s(_vm.detail.ballotSpecial))
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "mart5" }, [
              _vm._v("投票要求：" + _vm._s(_vm.detail.ballotRequire))
            ]),
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
          _c("el-card", { staticClass: "box-card mart10" }, [
            _c(
              "div",
              {
                staticClass: "clearfix",
                attrs: { slot: "header" },
                slot: "header"
              },
              [_c("span", [_vm._v("投票安排")])]
            ),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "投票时间：\n      " +
                  _vm._s(
                    _vm.$util._convertDate(
                      _vm.detail.beginTime,
                      "yyyy年MM月dd日 hh:mm:ss"
                    )
                  ) +
                  " ~\n      " +
                  _vm._s(
                    _vm.$util._convertDate(
                      _vm.detail.endTime,
                      "yyyy年MM月dd日 hh:mm:ss"
                    )
                  ) +
                  "\n    "
              )
            ])
          ]),
          _vm._v(" "),
          _c("el-card", { staticClass: "box-card mart10" }, [
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
                      { key: index, staticClass: "marb20" },
                      [
                        _c("li", { staticClass: "mart10" }, [
                          _vm._v(
                            "\n          " +
                              _vm._s(index + 1) +
                              ". " +
                              _vm._s(item.questionName) +
                              " \n          "
                          ),
                          _vm._v(" "),
                          item.type == 1
                            ? _c("span", [
                                _vm._v(
                                  "\n            " +
                                    _vm._s(
                                      item.minOption
                                        ? "(至少选择" + item.minOption + "项,"
                                        : "(至少选择1项"
                                    ) +
                                    " \n            " +
                                    _vm._s(
                                      item.maxOption
                                        ? "最多选择" + item.maxOption + "项)"
                                        : ")"
                                    ) +
                                    "\n          "
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          (item.hasOwnProperty("isAnswer")
                          ? !item.isAnswer
                            ? true
                            : false
                          : false)
                            ? _c("span", { staticClass: "color-red marr10" }, [
                                _vm._v(
                                  "\n            (请确认选项个数是否正确)\n          "
                                )
                              ])
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        item.type == 0
                          ? _c(
                              "el-radio-group",
                              {
                                model: {
                                  value: item.value,
                                  callback: function($$v) {
                                    _vm.$set(item, "value", $$v)
                                  },
                                  expression: "item.value"
                                }
                              },
                              _vm._l(item.options, function(
                                itemBoxs,
                                indexBoxs
                              ) {
                                return _c("ul", { staticClass: "marl20" }, [
                                  _c(
                                    "li",
                                    { staticClass: "mart10" },
                                    [
                                      _c(
                                        "el-radio",
                                        {
                                          key: indexBoxs,
                                          attrs: { label: itemBoxs.id }
                                        },
                                        [_vm._v(_vm._s(itemBoxs.optionName))]
                                      )
                                    ],
                                    1
                                  )
                                ])
                              }),
                              0
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        item.type == 1
                          ? _c(
                              "el-checkbox-group",
                              {
                                model: {
                                  value: item.value,
                                  callback: function($$v) {
                                    _vm.$set(item, "value", $$v)
                                  },
                                  expression: "item.value"
                                }
                              },
                              _vm._l(item.options, function(itemBox, indexBox) {
                                return _c("ul", { staticClass: "marl20" }, [
                                  _c(
                                    "li",
                                    { staticClass: "mart10" },
                                    [
                                      _c(
                                        "el-checkbox",
                                        {
                                          key: indexBox,
                                          attrs: { label: itemBox.id }
                                        },
                                        [_vm._v(_vm._s(itemBox.optionName))]
                                      )
                                    ],
                                    1
                                  )
                                ])
                              }),
                              0
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  }),
                  0
                )
              : _vm._e(),
            _vm._v(" "),
            _c("hr", { staticStyle: { margin: "20px -20px" } }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "mart20" },
              [
                _c(
                  "el-button",
                  {
                    staticClass: "marr20",
                    attrs: { size: "mini", type: "primary" },
                    on: { click: _vm.onSubmit }
                  },
                  [_vm._v("提交问卷")]
                ),
                _vm._v(" "),
                _vm.pageType == "org"
                  ? _c(
                      "router-link",
                      {
                        attrs: { to: { path: "/poll_research/activity_list" } }
                      },
                      [
                        _c("el-button", { attrs: { size: "mini" } }, [
                          _vm._v("返回列表")
                        ])
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.pageType == "personal"
                  ? _c(
                      "router-link",
                      { attrs: { to: { path: "/my_vote_index" } } },
                      [
                        _c("el-button", { attrs: { size: "mini" } }, [
                          _vm._v("返回列表")
                        ])
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            )
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-44e03eea", esExports)
  }
}

/***/ }),

/***/ 1506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vote = __webpack_require__(1425);

var _Vote2 = _interopRequireDefault(_Vote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    'vote': _Vote2.default
  }
}; //
//
//
//
//
//
//
//

/***/ }),

/***/ 1765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("vote", { attrs: { pageType: "personal" } })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-665bcd96", esExports)
  }
}

/***/ })

});