webpackJsonplensyn_ui([75],{

/***/ 1218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_TestingDetail_vue__ = __webpack_require__(1565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_TestingDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_TestingDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_TestingDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_TestingDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_274c5463_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_TestingDetail_vue__ = __webpack_require__(1948);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1946)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-274c5463"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_TestingDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_274c5463_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_TestingDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/TestingDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-274c5463", Component.options)
  } else {
    hotAPI.reload("data-v-274c5463", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1565:
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

exports.default = {
  data: function data() {
    return {
      treeLoading: false,

      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      defaultProps: {
        children: 'childrens', //树的配置
        label: 'name'
      },

      detailLoading: false,
      detailData: {
        testPaper: {}
      },

      activeType: 3,
      personData: [],
      currentPage: 1,
      currentPerPage: 5,
      total: 0
    };
  },

  watch: {
    activeType: {
      handler: function handler(newV, oldV) {
        this.getPeopleListData(newV, this.$route.params.id);
      },

      deep: true
    }
  },
  mounted: function mounted() {
    this.getDetailData();
  },

  methods: {
    /**
     * 获取列表数据
     * @return none
     */
    getDetailData: function getDetailData() {
      var _this = this;

      var self = this;

      self.detailLoading = true;

      var config = {
        id: self.$route.params.id
      };

      self.$request.requestAxios('get', basePath + "/exames/exames/details", { params: config }, function (response) {
        self.detailData = response.data.data;

        self.getPeopleListData(_this.activeType, self.$route.params.id);
        self.detailLoading = false;
      }, function (error) {
        self.$message.error(error);
        self.detailLoading = false;
      });
    },

    /**
     * 获取答题人员信息
     * @param  {number} type 1未答题 2已答题
     * @return {[type]}      [description]
     */
    getPeopleListData: function getPeopleListData(type, id) {
      var self = this;

      var search = {
        examId: id,
        pageSize: self.currentPerPage,
        pageNum: self.currentPage,
        status: type
      };

      self.$request.requestAxios('get', basePath + "/examinees/examinees/list", { params: search }, function (response) {
        self.personData = response.data.data.rows;
        self.total = response.data.data.total || 0;
      }, function (error) {
        self.$message.error(error);
      });
    },
    handleSizeChange: function handleSizeChange(val) {
      this.currentPerPage = val;
      this.getPeopleListData(this.activeType, this.$route.params.id);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.currentPage = val;
      this.getPeopleListData(this.activeType, this.$route.params.id);
    }
  }
};

/***/ }),

/***/ 1946:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1947);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("21d6ff04", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-274c5463\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./TestingDetail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-274c5463\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./TestingDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1947:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.tag-wrap .el-tag[data-v-274c5463] {\n  margin: 0 10px 10px 0;\n}\n.tag-wrap .el-tag[data-v-274c5463]:last-child {\n  margin: 0 0 10px 0;\n}\n.question-number-item[data-v-274c5463] {\n  margin: 10px 0;\n}\n.custom-tree-node[data-v-274c5463] {\n  display: inline-block;\n  width: 100%;\n}\n.text-blue[data-v-274c5463] {\n  color: #409EFF;\n}\n", ""]);

// exports


/***/ }),

/***/ 1948:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-area" },
    [
      _c(
        "a",
        {
          staticClass: "back-button",
          attrs: { href: "#" },
          on: {
            click: function($event) {
              return _vm.$router.push({ name: "Testing_List" })
            }
          }
        },
        [_vm._v("返回")]
      ),
      _vm._v(" "),
      _c(
        "el-form",
        {
          staticStyle: { background: "#fff" },
          attrs: { "label-width": "80px" }
        },
        [
          _c("el-form-item", { attrs: { label: "考试主题: " } }, [
            _vm._v("\n      " + _vm._s(_vm.detailData.theme) + "\n    ")
          ]),
          _vm._v(" "),
          _c("el-form-item", { attrs: { label: "考试要求: " } }, [
            _vm._v("\n      " + _vm._s(_vm.detailData.requirement) + "\n    ")
          ]),
          _vm._v(" "),
          _c("el-form-item", { attrs: { label: "时间: " } }, [
            _vm._v(
              "\n      " +
                _vm._s(
                  _vm.$util._convertDate(
                    _vm.detailData.beginTime,
                    "yyyy年MM月dd日 hh时：mm分"
                  )
                ) +
                " ~ " +
                _vm._s(
                  _vm.$util._convertDate(
                    _vm.detailData.endTime,
                    "yyyy年MM月dd日 hh时：mm分"
                  )
                ) +
                "\n    "
            )
          ]),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "试卷名称: " } },
            [
              _vm.detailData.testPaper.type == 1
                ? _c(
                    "el-button",
                    {
                      attrs: { type: "text" },
                      on: {
                        click: function($event) {
                          return _vm.$router.push({
                            name: "Auto_Paper_Detail",
                            params: { id: _vm.detailData.testPaper.id }
                          })
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.detailData.testPaper.theme))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.detailData.testPaper.type == 2
                ? _c(
                    "el-button",
                    {
                      attrs: { type: "text" },
                      on: {
                        click: function($event) {
                          return _vm.$router.push({
                            name: "Manual_Paper_Detail",
                            params: { id: _vm.detailData.testPaper.id }
                          })
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.detailData.testPaper.theme))]
                  )
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "参与情况: " } },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    size: "small",
                    type: _vm.activeType == 3 ? "primary" : "default"
                  },
                  on: {
                    click: function($event) {
                      _vm.activeType = 3
                    }
                  }
                },
                [_vm._v("已考")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: {
                    size: "small",
                    type: _vm.activeType == 1 ? "primary" : "default"
                  },
                  on: {
                    click: function($event) {
                      _vm.activeType = 1
                    }
                  }
                },
                [_vm._v("未考")]
              ),
              _vm._v(" "),
              _c(
                "el-table",
                {
                  staticStyle: { width: "100%" },
                  attrs: { stripe: "", data: _vm.personData }
                },
                [
                  _c("el-table-column", {
                    attrs: { prop: "userName", label: "姓名", width: "120px" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { prop: "score", label: "得分" }
                  }),
                  _vm._v(" "),
                  _vm.activeType == 3
                    ? _c("el-table-column", {
                        attrs: { label: "操作", fixed: "right" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", size: "small" },
                                      on: {
                                        click: function($event) {
                                          return _vm.$router.push({
                                            name: "Check_Answer",
                                            params: { id: scope.row.id }
                                          })
                                        }
                                      }
                                    },
                                    [_vm._v("查看")]
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          1564494555
                        )
                      })
                    : _vm._e()
                ],
                1
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
          ),
          _vm._v(" "),
          _vm.detailData.tptList && _vm.detailData.tptList.length > 0
            ? _c(
                "div",
                [
                  _vm._v("\n      题型分布:\n      "),
                  _vm._l(_vm.detailData.tptList, function(item) {
                    return _c("div", { key: "" + item.id }, [
                      item.type == 1
                        ? _c("p", [
                            _vm._v(
                              _vm._s(item.score) +
                                "分(单选题): " +
                                _vm._s(item.number) +
                                " 道"
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      item.type == 2
                        ? _c("p", [
                            _vm._v(
                              _vm._s(item.score) +
                                "分(多选题): " +
                                _vm._s(item.number) +
                                " 道"
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      item.type == 3
                        ? _c("p", [
                            _vm._v(
                              _vm._s(item.score) +
                                "分(简答题): " +
                                _vm._s(item.number) +
                                " 道"
                            )
                          ])
                        : _vm._e()
                    ])
                  })
                ],
                2
              )
            : _vm._e()
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-274c5463", esExports)
  }
}

/***/ })

});