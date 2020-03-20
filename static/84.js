webpackJsonplensyn_ui([84],{

/***/ 1187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewError_vue__ = __webpack_require__(1527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewError_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewError_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewError_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewError_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_55049fd6_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewError_vue__ = __webpack_require__(1845);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1843)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-55049fd6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewError_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_55049fd6_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewError_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/settings/NewError.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55049fd6", Component.options)
  } else {
    hotAPI.reload("data-v-55049fd6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1527:
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

exports.default = {
  data: function data() {
    return {
      orgCode: sessionStorage.getItem("orgCode"),
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
      loading: false
    };
  },

  mounted: function mounted() {
    this.getTableData();
  },
  methods: {
    /**
     * 多选操作
     * @param  {array} array  当前选中的元素数组
     * @return none
     */
    multiSelectionChange: function multiSelectionChange(array) {
      var self = this;
      self.multipleSelection = [];
      array.forEach(function (item, index) {
        self.multipleSelection.push(item.id);
      });
    },

    /**
     * 发布文章
     * @param  {object} item table Item(通过scope返回)
     * @return none
     */
    submitArticle: function submitArticle(item, typeStr) {
      var self = this;

      var config = {
        method: "post",
        url: basePath + "/a_errors/examine",
        data: {
          fromId: null,
          status: 2
        }
      };
      if (typeStr == "multi") {
        config.data.fromId = self.multipleSelection;
      } else {
        config.data.fromId = [item.row.id];
      }
      self.$confirm("确定要发布吗?", "发布", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // 点击确定
        self.$request.requestAxios(config.method, config.url, config.data, function (response) {
          self.$message({
            message: "发布成功!",
            type: "success"
          });
          self.getTableData();
        }, function (error) {
          self.$message.error(error);
        });
      }).catch(function () {});
    },

    /**
     * 显示驳回dialog
     * @param  {object} item 当前操作的表格元素
     * @return none
     */
    showRejectDialog: function showRejectDialog(item) {
      this.rejectForm.rejectReason = null;
      this.rejectDialogVisible = true;
      this.tempChoosedItem = item;
    },

    /**
     * 批量驳回
     * @return {[type]} [description]
     */
    rejectMulti: function rejectMulti() {
      var _this = this;

      this.$confirm("确定要驳回吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        _this.rejectArticle(_this.multipleSelection);
      }).catch(function () {});
    },

    /**
     * 驳回文章
     * @param  {object} item table Item(通过scope返回)
     * @return none       
     * */
    rejectArticle: function rejectArticle(idArray) {
      var self = this;
      var config = {
        method: "post",
        url: basePath + "/a_errors/examine",
        data: {
          fromId: idArray || [self.tempChoosedItem.row.id],
          status: 3
        }
      };
      self.$request.requestAxios(config.method, config.url, config.data, function (response) {
        self.$message({
          message: "驳回成功!",
          type: "success"
        });
        self.getTableData();
        self.rejectDialogVisible = false;
      }, function (error) {
        self.$message.error(error);
      });
    },

    /**
     * 获取表格数据
     * @param  {需要查询的页码} page 默认不需要传,查询特定页则传入对应的页数
     * @return {[type]}      [description]
     */
    getTableData: function getTableData(page) {
      var self = this;
      self.loading = true;
      var config = {
        method: "get",
        url: basePath + "/a_errors/list/from_org/" + self.orgCode,
        params: {
          pageNum: page || this.currentPage,
          pageSize: this.perPage,
          status: 1,
          fromType: 1
        }
      };
      self.$request.requestAxios(config.method, config.url, { params: config.params }, function (response) {
        self.loading = false;
        self.articleTableData = response.data.data;
        if (response.data.data.rows <= 0 && self.currentPage > 0) {
          //当前页没有数据, 则查询前一页
          self.getTableData(self.currentPage -= 1);
        }
      }, function (error) {
        self.loading = false;
        self.$message.error(error);
      });
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
      if (data.row.fromType == "1") {
        this.$router.push({
          name: "Settings_Edit_Article",
          params: { id: data.row.fromId }
        });
      }
    }
  }
};

/***/ }),

/***/ 1843:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1844);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("f4f52e64", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-55049fd6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewError.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-55049fd6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewError.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1844:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.type-text-in-table[data-v-55049fd6] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.under-table[data-v-55049fd6] {\n  height: 60px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background: #fff;\n}\n.page-wrap[data-v-55049fd6] {\n  background: #fff;\n  padding: 20px 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 1845:
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
        "el-table",
        {
          ref: "multipleTable",
          staticStyle: { width: "100%" },
          attrs: {
            stripe: "",
            data: _vm.articleTableData.rows,
            "tooltip-effect": "dark"
          },
          on: { "selection-change": _vm.multiSelectionChange }
        },
        [
          _c("el-table-column", { attrs: { type: "selection" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "id", label: "序号", width: "55" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "errorContent", label: "报错内容" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "creator", label: "提错人", width: "80" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作", width: "220", fixed: "right" },
            scopedSlots: _vm._u([
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
                            return _vm.submitArticle(scope, "single")
                          }
                        }
                      },
                      [_vm._v("发布")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: {
                          disabled: scope.row.fromType != "1",
                          type: "default",
                          size: "small"
                        },
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
                            return _vm.showRejectDialog(scope)
                          }
                        }
                      },
                      [_vm._v("驳回")]
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
        { staticClass: "under-table" },
        [
          _c(
            "el-button",
            {
              attrs: {
                disabled: _vm.multipleSelection.length <= 0,
                type: "primary"
              },
              on: {
                click: function($event) {
                  return _vm.submitArticle(null, "multi")
                }
              }
            },
            [_vm._v("批量发布")]
          ),
          _vm._v(" "),
          _c(
            "el-button",
            {
              attrs: {
                disabled: _vm.multipleSelection.length <= 0,
                type: "danger"
              },
              on: { click: _vm.rejectMulti }
            },
            [_vm._v("批量驳回")]
          )
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-55049fd6", esExports)
  }
}

/***/ })

});