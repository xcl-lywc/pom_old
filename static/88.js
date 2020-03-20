webpackJsonplensyn_ui([88],{

/***/ 1191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDelete_vue__ = __webpack_require__(1531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDelete_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDelete_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDelete_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDelete_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5996ac44_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ArticleDelete_vue__ = __webpack_require__(1861);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1859)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5996ac44"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDelete_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_5996ac44_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ArticleDelete_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/settings/ArticleDelete.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5996ac44", Component.options)
  } else {
    hotAPI.reload("data-v-5996ac44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1531:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      searchForm: { //搜索表单
        type: null,
        special: null,
        keyWords: null
      },
      articleTableData: { //文章表格数据
        rows: [],
        total: null
      },
      rejectDialogVisible: false,
      rejectForm: {
        rejectReason: null
      },
      tempChoosedItem: [], //当前选中

      multipleSelection: [],

      currentPage: 1, //当前页
      perPage: 5,
      loading: false,

      orgCode: sessionStorage.getItem("orgCode"),

      typeList: [],
      specialList: []
    };
  },

  mounted: function mounted() {
    this.getTypeSpecialList(1, "typeList");
    this.getTypeSpecialList(2, "specialList");
    this.getTableData();
  },
  methods: {
    /**
     * 根据类型获取分类/专题list数据
     * @param  {number} type 分类1 专题2
     * @param  {[type]} target 保存数据的名称
     * @return {[type]}      [description]
     */
    getTypeSpecialList: function getTypeSpecialList(typeNum, target) {
      var self = this;
      var config = {
        method: "get",
        url: basePath + "/a_types/articletypes/from_org/" + self.orgCode,
        params: {
          type: typeNum
        }
      };
      self.$request.requestAxios(config.method, config.url, { params: config.params }, function (response) {
        self[target] = response.data.data;
      }, function (error) {
        self.$message.error(error);
      });
    },

    /**
     * 删除文章
     * @param  {object} item table Item(通过scope返回)
     * @return none       
     * */
    deleteArticle: function deleteArticle(id) {
      var self = this;

      var config = {
        method: "delete",
        url: basePath + "/a_info/delete/" + id + "/from_org/" + self.orgCode
      };

      self.$confirm("确定要删除吗?", "删除", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // 点击确定
        self.$request.requestAxios(config.method, config.url, config.data, function (response) {
          self.$message.success("成功");
          self.getTableData();
        }, function (error) {
          self.$message.error(error);
        });
      }).catch(function () {});
    },

    /**
     * 获取表格数据
     * @param  {需要查询的页码} page 默认不需要传,查询特定页则传入对应的页数
     * @return {[type]}      [description]
     */
    getTableData: function getTableData() {
      var self = this;
      self.loading = true;
      var form = JSON.parse((0, _stringify2.default)(this.searchForm));

      form.pageNum = self.currentPage;
      form.pageSize = self.perPage;

      var config = {
        method: "get",
        url: basePath + "/a_info/article/list/from_org/" + self.orgCode,
        params: form
      };

      self.$request.requestAxios(config.method, config.url, { params: config.params }, function (response) {
        self.loading = false;
        self.articleTableData = response.data.data;
        // if(response.data.data.rows <= 0 && self.currentPage > 0 ) {
        //   //当前页没有数据, 则查询前一页
        //   self.getTableData(self.currentPage -= 1)
        // }
      }, function (error) {
        self.loading = false;
        self.$message.error(error);
      });
    },
    resetForm: function resetForm() {
      this.$refs.searchForm.resetFields();
    },

    /**
     * 点击分页 > 每页条数的回调
     * @param  {number} val 每页的显示条数
     * @return none
     */
    handleSizeChange: function handleSizeChange(val) {
      this.perPage = val;
      this.getTableData();
    },

    /**
     * 点击分页 > 每页条数的回调
     * @param  {number} val 当前点击的页数
     * @return none
     */
    handleCurrentChange: function handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },

    /**
     * 点击编辑按钮, 跳转
     * @param  {object} data 表格的scope对象
     * @return none
     */
    clickEdit: function clickEdit(data) {
      this.$router.push({
        name: "Settings_Edit_Article",
        params: { id: data.row.id }
      });
    }
  }
};

/***/ }),

/***/ 1859:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1860);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("df2fda3c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5996ac44\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ArticleDelete.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5996ac44\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ArticleDelete.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1860:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.type-text-in-table[data-v-5996ac44] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.under-table[data-v-5996ac44] {\n  height: 60px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background: #fff;\n}\n.page-wrap[data-v-5996ac44] {\n  background: #fff;\n  padding: 20px 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 1861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ]
    },
    [
      _c(
        "el-form",
        {
          ref: "searchForm",
          attrs: { model: _vm.searchForm, "label-width": "100px", inline: true }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "分类", prop: "type" } },
            [
              _c(
                "el-select",
                {
                  model: {
                    value: _vm.searchForm.type,
                    callback: function($$v) {
                      _vm.$set(_vm.searchForm, "type", $$v)
                    },
                    expression: "searchForm.type"
                  }
                },
                _vm._l(_vm.typeList, function(item, index) {
                  return _c("el-option", {
                    key: item.atId,
                    attrs: { label: item.atName, value: item.atId }
                  })
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "专题", prop: "special" } },
            [
              _c(
                "el-select",
                {
                  model: {
                    value: _vm.searchForm.special,
                    callback: function($$v) {
                      _vm.$set(_vm.searchForm, "special", $$v)
                    },
                    expression: "searchForm.special"
                  }
                },
                _vm._l(_vm.specialList, function(item, index) {
                  return _c("el-option", {
                    key: item.atId,
                    attrs: { label: item.atName, value: item.atId }
                  })
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "关键字", prop: "keyWords" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.searchForm.keyWords,
                  callback: function($$v) {
                    _vm.$set(_vm.searchForm, "keyWords", $$v)
                  },
                  expression: "searchForm.keyWords"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-button",
            {
              attrs: { type: "primary", size: "small" },
              on: { click: _vm.getTableData }
            },
            [_vm._v("查询")]
          ),
          _vm._v(" "),
          _c(
            "el-button",
            {
              attrs: { type: "default", size: "small" },
              on: { click: _vm.resetForm }
            },
            [_vm._v("重置")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        {
          ref: "multipleTable",
          staticStyle: { width: "100%" },
          attrs: {
            stripe: "",
            data: _vm.articleTableData.rows,
            "tooltip-effect": "dark"
          }
        },
        [
          _c("el-table-column", {
            attrs: { prop: "id", label: "序号", width: "55" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "articleName", label: "文章题目" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "type", label: "分类", width: "160" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return _vm._l(scope.row.type, function(item) {
                    return _c(
                      "el-tooltip",
                      {
                        key: item.atName + item.atId,
                        attrs: {
                          effect: "dark",
                          content: item.atName,
                          placement: "left-start"
                        }
                      },
                      [
                        _c("div", { staticClass: "type-text-in-table" }, [
                          _vm._v(_vm._s(item.atName))
                        ])
                      ]
                    )
                  })
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "author", label: "作者", width: "80" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作", width: "240" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "default", size: "small" },
                        on: {
                          click: function($event) {
                            return _vm.$router.push({
                              name: "Settings_Article_Detail",
                              params: {
                                id: scope.row.id,
                                routername: "Settings_Article_Delete"
                              }
                            })
                          }
                        }
                      },
                      [_vm._v("查看")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "default", size: "small" },
                        on: {
                          click: function($event) {
                            return _vm.clickEdit(scope)
                          }
                        }
                      },
                      [_vm._v("修改")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "danger", size: "small" },
                        on: {
                          click: function($event) {
                            return _vm.deleteArticle(scope.row.id)
                          }
                        }
                      },
                      [_vm._v("删除")]
                    )
                  ]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "page-wrap" },
        [
          _c("el-pagination", {
            attrs: {
              background: "",
              "current-page": _vm.currentPage,
              "page-sizes": [5, 10, 15],
              "page-size": _vm.perPage,
              layout: "total, sizes, prev, pager, next, jumper",
              total: _vm.articleTableData.total
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
      _c(
        "el-dialog",
        {
          attrs: {
            title: "驳回",
            width: "35%",
            visible: _vm.rejectDialogVisible
          },
          on: {
            "update:visible": function($event) {
              _vm.rejectDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            { ref: "form", attrs: { model: _vm.rejectForm, size: "small" } },
            [
              _c(
                "el-form-item",
                [
                  _c("el-input", {
                    attrs: { type: "textarea", rows: "5" },
                    model: {
                      value: _vm.rejectForm.rejectReason,
                      callback: function($$v) {
                        _vm.$set(_vm.rejectForm, "rejectReason", $$v)
                      },
                      expression: "rejectForm.rejectReason"
                    }
                  })
                ],
                1
              )
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
                  on: {
                    click: function($event) {
                      _vm.rejectDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: { click: _vm.rejectArticle }
                },
                [_vm._v("确 定")]
              )
            ],
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5996ac44", esExports)
  }
}

/***/ })

});