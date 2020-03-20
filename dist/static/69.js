webpackJsonplensyn_ui([69],{

/***/ 1167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_MyReport_vue__ = __webpack_require__(1499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_MyReport_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_MyReport_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_MyReport_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_MyReport_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6643374a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_MyReport_vue__ = __webpack_require__(1758);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_MyReport_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6643374a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_MyReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/my_organizational_life/MyReport.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6643374a", Component.options)
  } else {
    hotAPI.reload("data-v-6643374a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1360:
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
  props: {
    pageType: 'org', //org为组织平台， personal为个人中心
    typeId: null //类型Id
  },
  components: {},
  data: function data() {
    return {
      isLoad: true,
      listData: { rows: [], total: 0 },
      activeName: '1',
      elementPageData: { //分页需要的数据
        defaultData: this.$util.elementPagination,
        pageNum: this.$util.elementPagination.pageNumDefault,
        pageSize: this.$util.elementPagination.pageSizeDefault
      },
      detailDialogVisible: false,
      currentActiveItem: null //当前被选中的数据
    };
  },
  mounted: function mounted() {
    this.getQueryList();
  },
  destoryed: function destoryed() {},

  methods: {
    /*
    * 查询列表
    */
    getQueryList: function getQueryList() {
      var _this = this;

      this.$request.requestAxios('get', basePath + '/party_member_infos/orglift', this._getListParam(), function (response) {
        _this.listData = response.data.data;
        _this.isLoad = false;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error(basePath + '/party_member_infos/orglift');
        _this.isLoad = false;
      });
    },

    /*
    * 查询参数组装
    */
    _getListParam: function _getListParam() {
      return {
        params: {
          type: this.typeId,
          status: this.activeName,
          pageSize: this.elementPageData.pageSize,
          pageNum: this.elementPageData.pageNum
        }
      };
    },

    /*
    * 切换状态查询列表
    */
    handleClick: function handleClick(tab, event) {
      // ---------------------- 设置为初始状态-----------------------
      this.elementPageData.pageNum = this.$util.elementPagination.pageNumDefault;
      this.elementPageData.pageSize = this.$util.elementPagination.pageSizeDefault;

      this.getQueryList();
    },

    /*
    * 改变当前页码触发此事件
    * @param {number} val 当前页码
    */
    handleCurrentChange: function handleCurrentChange(val) {
      this.elementPageData.pageNum = val;
      this.getQueryList();
    },

    /*
    * 改变每页条数触发此事件
    * @param {number} val 当前数据
    */
    handleSizeChange: function handleSizeChange(val) {
      this.elementPageData.pageSize = val;
      this.getQueryList();
    },

    /*
     * 根据Id查询当前被选中的通知详情
     */
    getInformDetail: function getInformDetail(id) {
      var _this2 = this;

      this.detailDialogVisible = true;
      this.$request.requestAxios('get', basePath + '/n_notice/' + id + '/detail', '', function (response) {
        _this2.currentActiveDetail = response.data.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? _this2.$message.error(error.data.meta.message) : _this2.$message.error('/n_notice/detail');
      });
    },

    /*
     * 查询可创建任务的类型列表
     */
    getQueryTaskTypeList: function getQueryTaskTypeList() {
      var _this3 = this;

      this.$request.requestAxios('get', basePath + '/t_form_data/type/21', "", function (response) {
        //请求成功的回调...
        _this3.taskTypeList = response.data.data;
      }, function (error, status) {
        status == 200 ? _this3.$message.error(error.data.meta.message) : _this3.$message.error(basePath + '/t_form_data/type/21 - \u5931\u8D25');
      });
    },

    /*
     * 显示任务表单弹框
     */
    showTaskDialog: function showTaskDialog(item) {
      this.taskDialogVisible = true;
      this.currentActiveType = item;
      this.mathRandom++;
    },
    formDataEmitFun: function formDataEmitFun() {
      this.taskDialogVisible = false;
      this.getQueryTaskTypeList();
    },

    /*
     * 关闭详情弹框重查一遍列表数据
     */
    detailHandleClose: function detailHandleClose() {
      this.getQueryList();
    },

    /*
     * 点击某一行显示改行详情
     */
    rowClick: function rowClick(rowData) {
      var _this4 = this;

      this.detailDialogVisible = true;
      this.$request.requestAxios('get', basePath + '/party_member_infos/orglift/' + rowData.id, "", function (response) {
        //请求成功的回调...
        _this4.currentActiveItem = response.data.data;
      }, function (error, status) {
        status == 200 ? _this4.$message.error(error.data.meta.message) : _this4.$message.error(basePath + '/party_member_infos/orglift/' + rowData.id + ' - \u5931\u8D25');
      });
    }
  }
};

/***/ }),

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListComponent_vue__ = __webpack_require__(1360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListComponent_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListComponent_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListComponent_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_8728f198_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ListComponent_vue__ = __webpack_require__(1382);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListComponent_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_8728f198_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ListComponent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/my_organizational_life/ListComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8728f198", Component.options)
  } else {
    hotAPI.reload("data-v-8728f198", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-manage personal-top" },
    [
      _c(
        "el-tabs",
        {
          on: { "tab-click": _vm.handleClick },
          model: {
            value: _vm.activeName,
            callback: function($$v) {
              _vm.activeName = $$v
            },
            expression: "activeName"
          }
        },
        [
          _c(
            "el-tab-pane",
            { attrs: { label: "未审批", name: "1", status: "1" } },
            [_c("div")]
          ),
          _vm._v(" "),
          _c(
            "el-tab-pane",
            { attrs: { label: "已审批", name: "2", status: "2" } },
            [_c("div")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.listData
        ? _c(
            "div",
            { staticClass: "course-list-manage mart20" },
            [
              _c(
                "el-table",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: _vm.isLoad,
                      expression: "isLoad"
                    }
                  ],
                  staticClass: "table-cursor",
                  staticStyle: { width: "100%" },
                  attrs: { stripe: true, data: _vm.listData.rows },
                  on: { "row-click": _vm.rowClick }
                },
                [
                  _c("el-table-column", {
                    attrs: { prop: "lifeName", label: "名称" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { prop: "creator", label: "创建者" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "创建时间" },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _vm._v(
                                "\n        " +
                                  _vm._s(
                                    _vm.$util._convertDate(
                                      scope.row.createTime,
                                      "yyyy年MM月dd日"
                                    )
                                  ) +
                                  "\n      "
                              )
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      3970632650
                    )
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-row",
                { staticClass: "mart20" },
                [
                  _c("el-col", { attrs: { span: 24 } }, [
                    _c(
                      "div",
                      { staticClass: "grid-content bg-purple-dark" },
                      [
                        _c("el-pagination", {
                          staticClass: "ce-pagination",
                          attrs: {
                            span: 24,
                            "current-page": _vm.currentPage4,
                            "page-sizes":
                              _vm.elementPageData.defaultData.pageSizes,
                            "page-size":
                              _vm.elementPageData.defaultData.pageSizeDefault,
                            layout: "total, sizes, prev, pager, next, jumper",
                            total: _vm.listData.total
                          },
                          on: {
                            "size-change": function($event) {
                              return _vm.handleSizeChange($event)
                            },
                            "current-change": function($event) {
                              return _vm.handleCurrentChange($event)
                            }
                          }
                        })
                      ],
                      1
                    )
                  ])
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.currentActiveItem
        ? _c(
            "el-dialog",
            {
              staticClass: "task-detail-dialog dialog",
              attrs: {
                title: _vm.currentActiveItem.lifeName + "详情",
                visible: _vm.detailDialogVisible,
                width: "800px"
              },
              on: {
                "update:visible": function($event) {
                  _vm.detailDialogVisible = $event
                }
              }
            },
            [
              _c("div", [
                _c("p", { staticClass: "mart10" }, [
                  _vm._v("名称: " + _vm._s(_vm.currentActiveItem.lifeName))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mart10" }, [
                  _vm._v("创建人: " + _vm._s(_vm.currentActiveItem.creator))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mart10" }, [
                  _vm._v(
                    "创建时间: " +
                      _vm._s(
                        _vm.$util._convertDate(
                          _vm.currentActiveItem.createTime,
                          "yyyy年MM月dd日"
                        )
                      )
                  )
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mart10" }, [
                  _vm._v("内容: \n        "),
                  _c("span", {
                    domProps: {
                      innerHTML: _vm._s(_vm.currentActiveItem.lifeContent)
                    }
                  })
                ])
              ])
            ]
          )
        : _vm._e()
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-8728f198", esExports)
  }
}

/***/ }),

/***/ 1499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ListComponent = __webpack_require__(1381);

var _ListComponent2 = _interopRequireDefault(_ListComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	components: {
		'list-component': _ListComponent2.default
	}
}; //
//
//
//
//
//
//
//
//

/***/ }),

/***/ 1758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("list-component", { attrs: { typeId: "85" } })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6643374a", esExports)
  }
}

/***/ })

});