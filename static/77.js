webpackJsonplensyn_ui([77],{

/***/ 1215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ManualPaperDetail_vue__ = __webpack_require__(1562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ManualPaperDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ManualPaperDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ManualPaperDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ManualPaperDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_cae2c18e_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ManualPaperDetail_vue__ = __webpack_require__(1939);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1937)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cae2c18e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ManualPaperDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_cae2c18e_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ManualPaperDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/ManualPaperDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cae2c18e", Component.options)
  } else {
    hotAPI.reload("data-v-cae2c18e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1562:
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
  data: function data() {
    return {
      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      detailLoading: false,
      detailData: {}

    };
  },

  watch: {},
  mounted: function mounted() {
    this.getDetailData();
  },

  methods: {
    /**
     * 获取树形数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getDetailData: function getDetailData() {
      var self = this;

      self.detailLoading = true;

      var config = {
        id: self.$route.params.id
      };

      self.$request.requestAxios('get', basePath + "/test_papers/test_papers/details", { params: config }, function (response) {
        self.detailData = response.data.data;
        self.detailLoading = false;
      }, function (error) {
        self.$message.error(error);
        self.detailLoading = false;
      });
    },

    /**
     * 根据序号返回对应的字母 超过26则返回对应(index+1)
     * @param  {number} index 序号下标值 从0开始
     * @return {[type]}       [description]
     */
    returnLetter: function returnLetter(index) {
      if (index >= 0 || index <= 25) {
        return String.fromCharCode(index + 65);
      } else {
        return index + 1;
      }
    }
  }
};

/***/ }),

/***/ 1937:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1938);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("5203d394", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cae2c18e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ManualPaperDetail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cae2c18e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ManualPaperDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1938:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.tag-wrap .el-tag[data-v-cae2c18e] {\n  margin: 0 10px 10px 0;\n}\n.tag-wrap .el-tag[data-v-cae2c18e]:last-child {\n  margin: 0 0 10px 0;\n}\n.question-number-item[data-v-cae2c18e] {\n  margin: 10px 0;\n}\n.custom-tree-node[data-v-cae2c18e] {\n  display: inline-block;\n  width: 100%;\n}\n.text-blue[data-v-cae2c18e] {\n  color: #409EFF;\n}\n.cards-wrap[data-v-cae2c18e] {\n}\n.el-card[data-v-cae2c18e] {\n  margin: 10px 0;\n}\n.el-card .img-wrap[data-v-cae2c18e] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n}\n.el-card .img-wrap img[data-v-cae2c18e],\n.el-card .img-wrap .no-img-div[data-v-cae2c18e] {\n  line-height: 100px;\n  text-align: center;\n  height: 100px;\n  width: 100px;\n}\n.question-info[data-v-cae2c18e] {\n  margin-top: 15px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 1939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "a",
        {
          staticClass: "back-button",
          attrs: {
            href: "#",
            onclick: "javascript: window.history.go(-1);return false;"
          }
        },
        [_vm._v("返回")]
      ),
      _vm._v(" "),
      _c(
        "el-form",
        { staticStyle: { background: "#fff", padding: "10px" } },
        [
          _c("el-form-item", { attrs: { label: "考试主题: " } }, [
            _vm._v("\n      " + _vm._s(_vm.detailData.theme) + "\n    ")
          ]),
          _vm._v(" "),
          _c("el-form-item", { attrs: { label: "考试要求: " } }, [
            _vm._v("\n      " + _vm._s(_vm.detailData.requirement) + "\n    ")
          ]),
          _vm._v(" "),
          _c("p", [_vm._v("试题列表: ")]),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.cardsLoading,
                  expression: "cardsLoading"
                }
              ],
              staticClass: "cards-wrap"
            },
            _vm._l(_vm.detailData.questionsList, function(item, index) {
              return _c(
                "el-card",
                { key: index + "题目列表", staticClass: "card-item" },
                [
                  _c(
                    "el-row",
                    { attrs: { gutter: 10 } },
                    [
                      _c("el-col", { attrs: { span: 18 } }, [
                        _vm._v(
                          "\n            " +
                            _vm._s(item.content) +
                            "\n            "
                        ),
                        item.type != 3
                          ? _c(
                              "ul",
                              _vm._l(item.answerList, function(
                                itemInner,
                                indexInner
                              ) {
                                return _c("li", { key: itemInner.id }, [
                                  _vm._v(
                                    _vm._s(_vm.returnLetter(indexInner)) +
                                      "、" +
                                      _vm._s(itemInner.content)
                                  )
                                ])
                              }),
                              0
                            )
                          : _c("div")
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { staticClass: "img-wrap", attrs: { span: 6 } },
                        [
                          !item.picture
                            ? _c("div", { staticClass: "no-img-div" }, [
                                _vm._v("暂无图片")
                              ])
                            : _c("img", {
                                staticStyle: {
                                  height: "100px",
                                  width: "100px"
                                },
                                attrs: { src: item.picture, alt: "" }
                              })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { staticClass: "question-info", attrs: { span: 24 } },
                        [
                          _c("p", [
                            _vm._v("题型:\n              "),
                            item.type == 1
                              ? _c("span", [_vm._v("单选题")])
                              : _vm._e(),
                            _vm._v(" "),
                            item.type == 2
                              ? _c("span", [_vm._v("多选题")])
                              : _vm._e(),
                            _vm._v(" "),
                            item.type == 3
                              ? _c("span", [_vm._v("简答题")])
                              : _vm._e()
                          ]),
                          _vm._v(" "),
                          _c("p", [_vm._v("创建者: " + _vm._s(item.creator))]),
                          _vm._v(" "),
                          _c("p", [_vm._v("分值: " + _vm._s(item.score))]),
                          _vm._v(" "),
                          _c(
                            "span",
                            [
                              _vm.$route.name == "My_Manual_Paper_Detail"
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", size: "small" },
                                      on: {
                                        click: function($event) {
                                          return _vm.$router.push({
                                            name: "My_Question_Detail",
                                            params: { id: item.id }
                                          })
                                        }
                                      }
                                    },
                                    [_vm._v("查看解析")]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.$route.name == "Manual_Paper_Detail"
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", size: "small" },
                                      on: {
                                        click: function($event) {
                                          return _vm.$router.push({
                                            name: "Question_Detail",
                                            params: { id: item.id }
                                          })
                                        }
                                      }
                                    },
                                    [_vm._v("查看解析")]
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            }),
            1
          )
        ],
        1
      )
    ],
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-cae2c18e", esExports)
  }
}

/***/ })

});