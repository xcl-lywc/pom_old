webpackJsonplensyn_ui([78],{

/***/ 1213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ExamPaperList_vue__ = __webpack_require__(1560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ExamPaperList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ExamPaperList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ExamPaperList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ExamPaperList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_87476066_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ExamPaperList_vue__ = __webpack_require__(1933);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1931)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-87476066"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ExamPaperList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_87476066_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ExamPaperList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/ExamPaperList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87476066", Component.options)
  } else {
    hotAPI.reload("data-v-87476066", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1560:
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
//

exports.default = {
  data: function data() {
    return {

      searchForm: {
        theme: null,
        date: [0, new Date().getTime()]
      },
      cardsLoading: false,

      listData: [],
      currentPage: 1,
      currentPerPage: 5,
      total: 0

    };
  },
  mounted: function mounted() {
    this.getListData("listData");
  },

  methods: {
    /**
     * 获取列表数据
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getListData: function getListData(target) {
      var self = this;

      this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          self.cardsLoading = true;

          var params = {
            beginTime: self.searchForm.date[0],
            endTime: self.searchForm.date[1],
            theme: self.searchForm.theme,
            pageSize: self.currentPerPage,
            pageNum: self.currentPage
          };

          self.$request.requestAxios('post', basePath + "/test_papers/test_papers/choice/list", params, function (response) {
            self[target] = response.data.data.rows;
            self.total = response.data.data.total || 0;
            self.cardsLoading = false;
          }, function (error) {
            self.$message.error(error.data.meta.message);
            self.cardsLoading = false;
          });
        }
      });
    },
    handleSizeChange: function handleSizeChange(val) {
      this.currentPerPage = val;
      this.getListData("listData");
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData("listData");
    }
  }
};

/***/ }),

/***/ 1931:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1932);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("ee40f634", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-87476066\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ExamPaperList.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-87476066\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ExamPaperList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1932:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.fill-width[data-v-87476066] {\n  width: 100%;\n}\n.card-item[data-v-87476066] {\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n}\n.card-item[data-v-87476066]:hover {\n  box-shadow: 0 5px 15px #ccc;\n  border: 1px solid #eee;\n}\n.title-wrap[data-v-87476066],\n.deadline[data-v-87476066],\n.bottom-wrap[data-v-87476066] {\n  margin: 8px 0;\n}\n.title-wrap[data-v-87476066],\n.bottom-wrap[data-v-87476066] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-item .type-icon[data-v-87476066] {\n  padding: 6.5px 15px;\n  margin-right: 10px;\n  color: #fff;\n  background: #345173;\n  border-radius: 5px;\n}\n.no-data-text[data-v-87476066] {\n  height: 60px;\n  line-height: 60px;\n  text-align: center;\n  color: #bbb;\n}\n", ""]);

// exports


/***/ }),

/***/ 1933:
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
        "el-form",
        {
          ref: "searchForm",
          attrs: { model: _vm.searchForm, "label-width": "80px" }
        },
        [
          _c(
            "el-form-item",
            {
              attrs: {
                label: "创建时间",
                prop: "date",
                rules: {
                  required: true,
                  message: "请选择日期",
                  trigger: "blur"
                }
              }
            },
            [
              _c("el-date-picker", {
                staticClass: "fill-width",
                attrs: {
                  type: "daterange",
                  "value-format": "timestamp",
                  editable: false,
                  "range-separator": "至",
                  "start-placeholder": "开始日期",
                  "end-placeholder": "结束日期"
                },
                model: {
                  value: _vm.searchForm.date,
                  callback: function($$v) {
                    _vm.$set(_vm.searchForm, "date", $$v)
                  },
                  expression: "searchForm.date"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "关键字" } },
            [
              _c("el-input", {
                staticClass: "fill-width",
                attrs: { clearable: "" },
                model: {
                  value: _vm.searchForm.theme,
                  callback: function($$v) {
                    _vm.$set(_vm.searchForm, "theme", $$v)
                  },
                  expression: "searchForm.theme"
                }
              }),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: "small" },
                  on: {
                    click: function($event) {
                      return _vm.getListData("listData")
                    }
                  }
                },
                [_vm._v("搜索")]
              )
            ],
            1
          )
        ],
        1
      ),
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
        [
          _vm._l(_vm.listData, function(item, index) {
            return _c(
              "el-card",
              { key: index + "列表", staticClass: "card-item" },
              [
                _c("p", { staticClass: "title-wrap" }, [
                  _c("span", { staticClass: "text-bold" }, [
                    _vm._v(_vm._s(item.theme))
                  ]),
                  _vm._v(" "),
                  _c("span", [_vm._v("创建者: " + _vm._s(item.creatorName))]),
                  _vm._v(" "),
                  _c("span", { staticClass: "right-date-time" }, [
                    _vm._v(
                      "创建时间: " +
                        _vm._s(
                          _vm.$util._convertDate(
                            item.createTime,
                            "yyyy年MM月dd日 hh时：mm分"
                          )
                        )
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "bottom-wrap" }, [
                  _c("span", [
                    _c("i", { staticClass: "fa fa-users" }),
                    _vm._v(" " + _vm._s(item.participantsNum))
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "right-date-time" }, [
                    _vm._v(
                      "修改时间: " +
                        _vm._s(
                          _vm.$util._convertDate(
                            item.updateTime,
                            "yyyy年MM月dd日 hh时：mm分"
                          )
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("span", [
                    _c("i", { staticClass: "fa fa-comments" }),
                    _vm._v(" " + _vm._s(item.commentNum))
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      item.type == 1
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "small" },
                              on: {
                                click: function($event) {
                                  return _vm.$router.push({
                                    name: "Auto_Paper_Detail",
                                    params: { id: item.id }
                                  })
                                }
                              }
                            },
                            [_vm._v("查看详情")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      item.type == 2
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "small" },
                              on: {
                                click: function($event) {
                                  return _vm.$router.push({
                                    name: "Manual_Paper_Detail",
                                    params: { id: item.id }
                                  })
                                }
                              }
                            },
                            [_vm._v("查看详情")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", { staticClass: "type-icon" }, [
                        _vm._v(_vm._s(item.type == 1 ? "智能组题" : "手动添加"))
                      ])
                    ],
                    1
                  )
                ])
              ]
            )
          }),
          _vm._v(" "),
          _vm.listData && _vm.listData.length <= 0
            ? _c("p", { staticClass: "no-data-text" }, [_vm._v(" 暂无数据 ")])
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c("el-pagination", {
        attrs: {
          "current-page": _vm.currentPage,
          "page-sizes": [5, 10, 20],
          "page-size": _vm.currentPerPage,
          layout: "total, sizes, prev, pager, next, jumper",
          total: _vm.total
        },
        on: {
          "size-change": _vm.handleSizeChange,
          "current-change": _vm.handleCurrentChange
        }
      })
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-87476066", esExports)
  }
}

/***/ })

});