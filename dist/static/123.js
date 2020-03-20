webpackJsonplensyn_ui([123],{

/***/ 1224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListOfPartyRepresentatives_vue__ = __webpack_require__(1571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListOfPartyRepresentatives_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListOfPartyRepresentatives_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListOfPartyRepresentatives_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListOfPartyRepresentatives_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6c083cee_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ListOfPartyRepresentatives_vue__ = __webpack_require__(1954);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ListOfPartyRepresentatives_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6c083cee_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ListOfPartyRepresentatives_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/otherTask/ListOfPartyRepresentatives.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c083cee", Component.options)
  } else {
    hotAPI.reload("data-v-6c083cee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1571:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  computed: {},
  data: function data() {
    return {
      orgCode: sessionStorage.getItem('orgCode'),
      orgId: sessionStorage.getItem('orgId'),
      userData: JSON.parse(sessionStorage.getItem('userData')), //用户信息
      activeName: '1',
      showDialogVisible: false,
      listData: { total: 0, rows: [] },
      elementPageData: { //分页需要的数据
        defaultData: this.$util.elementPagination,
        pageNum: this.$util.elementPagination.pageNumDefault,
        pageSize: this.$util.elementPagination.pageSizeDefault
      },
      membersList: [],
      form: {
        userId: null
      }
    };
  },
  mounted: function mounted() {
    this.getQueryList();
    this.getQueryMembersList();
  },

  watch: {},
  methods: {
    /*
     * 查询党员名册列表
     */
    getQueryList: function getQueryList() {
      var _this = this;

      if (!this.orgCode) return false;

      this.$request.requestAxios('get', basePath + '/org_building/representative/from_org/' + this.orgCode, this._queryListParams(), function (response) {
        //请求成功的回调...
        _this.listData = response.data.data;
      }, function (error, status) {
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error(basePath + '/org_building/representative/from_org/' + _this.orgCode + ' - \u5931\u8D25');
      });
    },
    _queryListParams: function _queryListParams() {
      return { params: {
          status: this.activeName,
          pageSize: this.elementPageData.pageSize,
          pageNum: this.elementPageData.pageNum
        } };
    },

    /*
     * 查询党员信息
     */
    getQueryMembersList: function getQueryMembersList() {
      var _this2 = this;

      this.$request.requestAxios('get', basePath + '/party_orgs/members', { params: { id: this.orgId } }, function (response) {
        //请求成功的回调...
        _this2.membersList = response.data.data;
      }, function (error, status) {
        status == 200 ? _this2.$message.error(error.data.meta.message) : _this2.$message.error(basePath + '/party_orgs/members - \u5931\u8D25');
      });
    },
    addParty: function addParty() {},

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
     * 提交党员数据
     */
    submitForm: function submitForm(formName) {
      var _this3 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this3.$request.requestAxios('post', basePath + '/org_building/representative/from_org/' + _this3.orgCode, { userId: _this3.form.userId }, function (response) {
            //请求成功的回调...
            _this3.$message.success(response.data.meta.message);
            _this3.showDialogVisible = false;
            _this3.getQueryList();
          }, function (error, status) {
            status == 200 ? _this3.$message.error(error.data.meta.message) : _this3.$message.error(basePath + '/party_orgs/members - \u5931\u8D25');
          });
        } else {
          return false;
        }
      });
    },

    /*
     * 根据党员Id删除党员名册
     */
    delClick: function delClick(data) {
      var _this4 = this;

      this.$request.requestAxios('delete', basePath + '/org_building/representative/' + data.id + '/from_org/' + this.orgCode, "", function (response) {
        //请求成功的回调...
        _this4.$message.success(response.data.meta.message);
        _this4.getQueryList();
      }, function (error, status) {
        status == 200 ? _this4.$message.error(error.data.meta.message) : _this4.$message.error(basePath + '/org_building/representative/' + data.id + '/from_org/' + _this4.orgCode + ' - \u5931\u8D25');
      });
    },
    handleClick: function handleClick() {
      this.getQueryList();
    }
  }
};

/***/ }),

/***/ 1954:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-manage" },
    [
      _c(
        "div",
        { staticClass: "sub-query-manage tabs-manage" },
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
                { attrs: { label: "未审核", name: "1", status: "1" } },
                [_c("div")]
              ),
              _vm._v(" "),
              _c(
                "el-tab-pane",
                { attrs: { label: "审核中", name: "2", status: "2" } },
                [_c("div")]
              ),
              _vm._v(" "),
              _c(
                "el-tab-pane",
                { attrs: { label: "已审核", name: "3", status: "3" } },
                [_c("div")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "fr add-btn-manage" },
            [
              _c("el-button", {
                staticClass: "icon-plus_fx",
                attrs: { icon: "el-icon-plus", size: "mini", circle: "" },
                on: {
                  click: function($event) {
                    _vm.showDialogVisible = true
                    _vm.form.userId = null
                  }
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
          staticClass: "mart20",
          staticStyle: { width: "100%" },
          attrs: { data: _vm.listData.rows }
        },
        [
          _c("el-table-column", {
            attrs: { prop: "account", label: "账号", width: "" }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "name", label: "名字" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "出生年月" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(
                          _vm.$util._convertDate(
                            scope.row.borthday,
                            "yyyy年MM月dd日"
                          )
                        ) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "introducer", label: "性别" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm.$util.controlTable(scope.row.sex)) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "joinPartyTime", label: "入党时间" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(
                          _vm.$util._convertDate(
                            scope.row.joinPartyTime,
                            "yyyy年MM月dd日"
                          )
                        ) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { align: "center", label: "是否失联" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(scope.row.lost ? "是" : "否") +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { align: "center", label: "是否是流动党员" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(scope.row.mobile ? "是" : "否") +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "orgName", label: "组织名称" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "qualification_time", label: "转正时间" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(
                          _vm.$util._convertDate(
                            scope.row.qualification_time,
                            "yyyy年MM月dd日"
                          )
                        ) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作", width: "180px" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "danger", size: "mini" },
                        on: {
                          click: function($event) {
                            return _vm.delClick(scope.row)
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
        { staticClass: "element-pagination-manage mart20" },
        [
          _c("el-pagination", {
            staticClass: "ce-pagination",
            attrs: {
              span: 24,
              "current-page": _vm.currentPage4,
              "page-sizes": _vm.elementPageData.defaultData.pageSizes,
              "page-size": _vm.elementPageData.defaultData.pageSizeDefault,
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          staticClass: "add-task-dialog dialog",
          attrs: {
            title: "列为预备党员代表",
            visible: _vm.showDialogVisible,
            "before-close": _vm.handleAddTaskDialogClose,
            width: "500px"
          },
          on: {
            "update:visible": function($event) {
              _vm.showDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              ref: "form",
              staticClass: "demo-ruleForm mar20",
              attrs: { model: _vm.form, "label-width": "80px" }
            },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: "成员：",
                    prop: "userId",
                    rules: [{ required: true, message: "请选择成员" }]
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "请选择" },
                      model: {
                        value: _vm.form.userId,
                        callback: function($$v) {
                          _vm.$set(_vm.form, "userId", $$v)
                        },
                        expression: "form.userId"
                      }
                    },
                    _vm._l(_vm.membersList, function(item) {
                      return _c("el-option", {
                        key: item.id,
                        attrs: { label: item.name, value: item.id }
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
                [
                  _c(
                    "el-button",
                    {
                      attrs: { size: "mini", type: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.submitForm("form")
                        }
                      }
                    },
                    [_vm._v("提交")]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6c083cee", esExports)
  }
}

/***/ })

});