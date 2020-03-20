webpackJsonplensyn_ui([102],{

/***/ 1199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteList_vue__ = __webpack_require__(1539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_750b4e68_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_VoteList_vue__ = __webpack_require__(1883);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_VoteList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_750b4e68_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_VoteList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/vote_manage/vote_list/VoteList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-750b4e68", Component.options)
  } else {
    hotAPI.reload("data-v-750b4e68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1539:
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

exports.default = {
  prop: {
    pageType: 'org'
  },
  data: function data() {
    return {
      isLoad: true, //等待事件
      orgCode: sessionStorage.getItem('orgCode'), //党组织code
      elementPageData: { //分页需要的数据
        defaultData: this.$util.elementPagination,
        pageNum: this.$util.elementPagination.pageNumDefault,
        pageSize: this.$util.elementPagination.pageSizeDefault
      },
      form: {
        dateRange: null, //时间段
        ballotSpecial: null //主题
      },
      listData: { rows: [], total: 0 } //课程数据
    };
  },
  mounted: function mounted() {
    this.getQueryList();
  },
  destoryed: function destoryed() {},

  methods: {
    /*
    * 提交查询课程列表数据
    */
    onSubmit: function onSubmit() {
      this.getQueryList();
    },

    /*
    * 查询选票列表
    */
    getQueryList: function getQueryList() {
      var _this = this;

      this.$request.requestAxios('post', this.$util.basePath + '/v_ballot/list/from_org/' + this.orgCode, this._getQueryListParams(), function (response) {
        //请求成功的回调...
        var responseData = response.data;
        _this.listData = responseData.data;
        _this.isLoad = false;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error('/v_ballot/list/from_org - 失败');
        _this.isLoad = false;
      });
    },

    /*
    * 查询列表-查询条件
    */
    _getQueryListParams: function _getQueryListParams() {
      return {
        beginTime: this.form.dateRange ? new Date(this.form.dateRange[0]).getTime() : null,
        endTime: this.form.dateRange ? new Date(this.form.dateRange[1]).getTime() : null,
        ballotSpecial: this.form.ballotSpecial,
        pageSize: this.elementPageData.pageSize,
        pageNum: this.elementPageData.pageNum
      };
    },

    /*
    * 改变当前页码触发此事件，并广播paginationChange事件
    * @param {number} val 当前页码
    */
    handleCurrentChange: function handleCurrentChange(val) {
      this.elementPageData.pageNum = val;
      this.getQueryList();
    },

    /*
    * 改变每页条数触发此事件，并广播paginationChange事件
    * @param {number} val 当前数据
    */
    handleSizeChange: function handleSizeChange(val) {
      this.elementPageData.pageSize = val;
      this.getQueryList();
    },

    /*
     * 删除制定一条的选票数据
     */
    delVoteData: function delVoteData(item) {
      var _this2 = this;

      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        _this2._delVoteData(item);
      }).catch(function () {});
    },
    _delVoteData: function _delVoteData(item) {
      var _this3 = this;

      this.$request.requestAxios('delete', this.$util.basePath + '/v_ballot/delete/' + item.id + '/from_org/' + this.orgCode, '', function (response) {
        //请求成功的回调...
        _this3.$message.success(response.data.meta.message);
        _this3.getQueryList();
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? _this3.$message.error(error.data.meta.message) : _this3.$message.error(_this3.$util.basePath + '/v_ballot/delete/' + item.id + '/from_org/' + _this3.orgCode + ' - \u5931\u8D25');
      });
    }
  }
};

/***/ }),

/***/ 1883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-main",
    { staticClass: "content-manage" },
    [
      _c(
        "el-form",
        {
          ref: "form",
          attrs: { model: _vm.form, gutter: 20, "label-width": "100px" }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "主题名称：" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.form.ballotSpecial,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "ballotSpecial", $$v)
                  },
                  expression: "form.ballotSpecial"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "创建时间：" } },
            [
              _c("el-date-picker", {
                staticClass: "line marr20",
                attrs: { type: "daterange", placeholder: "选择日期" },
                model: {
                  value: _vm.form.dateRange,
                  callback: function($$v) {
                    _vm.$set(_vm.form, "dateRange", $$v)
                  },
                  expression: "form.dateRange"
                }
              }),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: "mini" },
                  on: { click: _vm.onSubmit }
                },
                [_vm._v("搜索")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "fr add-btn-manage" },
                [
                  _c(
                    "router-link",
                    {
                      attrs: {
                        to: { name: "Create_Vote", params: { id: "add" } }
                      }
                    },
                    [
                      _c("div", { staticClass: "fr add-btn-manage" }, [
                        _c("i", {
                          staticClass: "el-icon-circle-plus-outline",
                          staticStyle: { "font-size": "20px" }
                        })
                      ])
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.listData
        ? _c("div", { staticClass: "course-list-manage" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.isLoad,
                    expression: "isLoad"
                  }
                ],
                staticClass:
                  "content-wrapper-manage content-wrapper-manage_task"
              },
              [
                _c(
                  "div",
                  { staticClass: "content-wrapper-innter" },
                  _vm._l(_vm.listData.rows, function(item, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "task-list metting-box-list" },
                      [
                        _c(
                          "el-row",
                          { staticClass: "title-message" },
                          [
                            _c(
                              "el-col",
                              { staticClass: "title", attrs: { span: 12 } },
                              [
                                _c("i", {
                                  staticClass:
                                    "btn-del_font_red el-icon-error padr15",
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.delVoteData(item)
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticStyle: { cursor: "initial" } },
                                  [
                                    _vm._v(
                                      "关于《" +
                                        _vm._s(item.ballotSpecial) +
                                        "》投票"
                                    )
                                  ]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("el-col", { attrs: { span: 4 } }, [
                              _c(
                                "span",
                                {
                                  attrs: { title: item.content },
                                  on: { click: function($event) {} }
                                },
                                [_vm._v("创建者：" + _vm._s(item.creator))]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "el-col",
                              { staticClass: "text-right", attrs: { span: 8 } },
                              [
                                _c(
                                  "span",
                                  { on: { click: function($event) {} } },
                                  [
                                    _vm._v(
                                      "\n                      创建时间： " +
                                        _vm._s(
                                          _vm.$util._convertDate(
                                            item.createTime,
                                            "yyyy年MM月dd日 hh:mm:ss"
                                          )
                                        ) +
                                        "\n                    "
                                    )
                                  ]
                                )
                              ]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "p",
                          { staticClass: "message-num metting-box" },
                          [
                            _c(
                              "el-button",
                              {
                                attrs: { type: "text" },
                                on: {
                                  click: function($event) {
                                    return _vm.$router.push({
                                      name: "Create_Vote",
                                      params: { id: item.id }
                                    })
                                  }
                                }
                              },
                              [_vm._v("编辑选票")]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                attrs: { type: "text" },
                                on: {
                                  click: function($event) {
                                    return _vm.$router.push({
                                      name: "Vote_Detail",
                                      params: { id: item.id }
                                    })
                                  }
                                }
                              },
                              [_vm._v("查看详情")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "element-pagination-manage" },
                  [
                    _c("el-pagination", {
                      staticClass: "ce-pagination",
                      attrs: {
                        span: 24,
                        "current-page": _vm.currentPage4,
                        "page-sizes": _vm.elementPageData.defaultData.pageSizes,
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
              ]
            )
          ])
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-750b4e68", esExports)
  }
}

/***/ })

});