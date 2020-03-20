webpackJsonplensyn_ui([119],{

/***/ 1153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Article_vue__ = __webpack_require__(1485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Article_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Article_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Article_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Article_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0a4ef88e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Article_vue__ = __webpack_require__(1738);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Article_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0a4ef88e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Article_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/my_collection/Article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a4ef88e", Component.options)
  } else {
    hotAPI.reload("data-v-0a4ef88e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1485:
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

exports.default = {
  data: function data() {
    return {
      isLoad: true, //等待事件
      elementPageData: { //分页参数
        defaultData: this.$util.elementPagination, //分页需要的数据
        pageNum: this.$util.elementPagination.pageNumDefault, //查询课程需要的数据
        pageSize: this.$util.elementPagination.pageSizeDefault //查询课程需要的数据
      },
      articletypes: [], //分类列表
      form: {
        classification: '1',
        typeOrSpecial: '', //分类或者专题
        keyWords: null //关键字
      },
      listData: { rows: [], total: 0 } //课程数据
    };
  },
  mounted: function mounted() {
    this.getArticletypes();
  },
  destoryed: function destoryed() {},

  methods: {
    /*
    * 大类别改变查询一次分类列表
    */
    classificationChange: function classificationChange() {
      this.getArticletypes();
    },

    /*
    *  子分类改变查询文章列表数据
    */
    typeOrSpecialChange: function typeOrSpecialChange() {
      this.getQueryList();
    },

    /*
    * 查询分类列表
    */
    getArticletypes: function getArticletypes() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/a_types/articletypes/' + this.$util.homeFromOrg, { params: { type: self.form.classification } }, function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.articletypes = responseData.data;
        self.form.typeOrSpecial = '';
        // ------------- 默认选中第一个 -------------
        // self.form.typeOrSpecial = responseData.data[0].atId;

        // ---- 同步查询 
        self.getQueryList();
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_types/articletypes - 失败');
      });
    },

    /*
    * 提交查询课程列表数据
    */
    onSubmit: function onSubmit() {
      this.getQueryList();
    },

    /*
    * 查询课程列表
    */
    getQueryList: function getQueryList() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/a_info/collect/list/' + this.$util.homeFromOrg, this._getQueryListParams(), function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.listData = responseData.data;
        self.isLoad = false;
      }, function (error, status) {
        // 请求失败回调函数...
        self.isLoad = false;
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_info/collect/list - 失败');
      });
    },

    /*
    * 查询课程列表-查询条件
    */
    _getQueryListParams: function _getQueryListParams() {
      var paramsData = {
        keyWords: this.form.keyWords,
        pageSize: this.elementPageData.pageSize,
        pageNum: this.elementPageData.pageNum
      };
      if (this.form.classification == '1') {
        //分类
        paramsData.type = this.form.typeOrSpecial;
      } else {
        paramsData.special = this.form.typeOrSpecial;
      }

      return { params: paramsData };
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
    * 收藏/取消党课
    * @param { object } itemData 单个课程数据
    */
    collecOrNoClick: function collecOrNoClick(itemData) {
      var self = this;
      self.$request.requestAxios('patch', basePath + '/a_collection/' + itemData.lectureId + '/2/collect/toggle', "", function (response) {
        //请求成功的回调...
        var responseData = response.data;
        // -------- 刷新列表页
        self.getQueryList();
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_collection/' + itemData.lectureId + '/2/collect/toggle - 失败');
      });
    },

    /*
    * 点击跳转详情页
    * @param { object } dataItem 课程
    */
    jumpDetailPage: function jumpDetailPage(dataItem) {
      console.log(dataItem);
      this.$router.push({ name: 'Course_Detail', params: { id: dataItem.lectureId } });
    },

    /*
    * 时间转换
    */
    _convertDate: function _convertDate(date) {
      return new Date(date).getFullYear() + '年' + (new Date(date).getMonth() + 1) + '月' + new Date(date).getDate() + '日';
    },

    /*
    * 取消收藏
    * @return data
    */
    isCollectionNews: function isCollectionNews(rowData) {
      var self = this,
          data = null;
      self.$request.requestAxios('patch', basePath + '/a_collection/' + rowData.id + '/1/collect/toggle', "", function (respose) {
        // 请求成功回调函数... 
        self.$message('取消成功');
        self.getQueryList();
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_collection/' + self.newsId + '/1/collect/toggle - 失败');
      });
      // ------- 关闭弹框 ----------
      self.errorDialogVisible = false;
    }
  }
};

/***/ }),

/***/ 1738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "course-list-manage" },
      [
        _c(
          "div",
          { staticClass: "content-wrapper-innter" },
          [
            _c(
              "el-form",
              {
                ref: "form",
                staticClass: "sub-query-manage",
                attrs: { model: _vm.form, gutter: 20 }
              },
              [
                _c(
                  "el-row",
                  [
                    _c(
                      "el-form-item",
                      { staticClass: "course-form-item-manage" },
                      [
                        _c(
                          "el-col",
                          { staticClass: "pad-r20", attrs: { span: 4 } },
                          [
                            _c(
                              "el-form-item",
                              [
                                _c(
                                  "el-select",
                                  {
                                    staticStyle: { width: "100%" },
                                    on: { change: _vm.classificationChange },
                                    model: {
                                      value: _vm.form.classification,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.form,
                                          "classification",
                                          $$v
                                        )
                                      },
                                      expression: "form.classification"
                                    }
                                  },
                                  [
                                    _c("el-option", {
                                      attrs: { label: "分类", value: "1" }
                                    }),
                                    _vm._v(" "),
                                    _c("el-option", {
                                      attrs: { label: "专题", value: "2" }
                                    })
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
                        _c(
                          "el-col",
                          { staticClass: "pad-r20", attrs: { span: 4 } },
                          [
                            _c(
                              "el-form-item",
                              [
                                _c(
                                  "el-select",
                                  {
                                    staticStyle: { width: "100%" },
                                    on: { change: _vm.typeOrSpecialChange },
                                    model: {
                                      value: _vm.form.typeOrSpecial,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "typeOrSpecial", $$v)
                                      },
                                      expression: "form.typeOrSpecial"
                                    }
                                  },
                                  [
                                    _vm.form.classification == 1
                                      ? _c("el-option", {
                                          attrs: {
                                            label: "全部分类",
                                            value: ""
                                          }
                                        })
                                      : _c("el-option", {
                                          attrs: {
                                            label: "全部专题",
                                            value: ""
                                          }
                                        }),
                                    _vm._v(" "),
                                    _vm._l(_vm.articletypes, function(
                                      item,
                                      index
                                    ) {
                                      return _c("el-option", {
                                        key: index,
                                        attrs: {
                                          label: item.atName,
                                          value: item.atId
                                        }
                                      })
                                    })
                                  ],
                                  2
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "el-col",
                          {
                            staticClass: "pad-r20 search-input-icon",
                            attrs: { span: 16 }
                          },
                          [
                            _c(
                              "el-form-item",
                              [
                                _c("i", {
                                  staticClass: "el-icon-search",
                                  on: { click: _vm.onSubmit }
                                }),
                                _vm._v(" "),
                                _c("el-input", {
                                  attrs: { placeholder: "请输入内容" },
                                  model: {
                                    value: _vm.form.keyWords,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "keyWords", $$v)
                                    },
                                    expression: "form.keyWords"
                                  }
                                })
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
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-table",
              {
                staticClass: "mart20 marb20",
                attrs: { stripe: true, data: _vm.listData.rows }
              },
              [
                _c("el-table-column", {
                  attrs: { label: "题目" },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(scope) {
                        return [
                          _c(
                            "router-link",
                            {
                              attrs: {
                                to: {
                                  name: "News_Detail",
                                  params: { id: scope.row.id }
                                }
                              }
                            },
                            [_vm._v(_vm._s(scope.row.articleName))]
                          )
                        ]
                      }
                    }
                  ])
                }),
                _vm._v(" "),
                _c("el-table-column", {
                  attrs: { label: "收藏时间" },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(scope) {
                        return [
                          _vm._v(
                            "\n            " +
                              _vm._s(_vm._convertDate(scope.row.collectTime)) +
                              "\n          "
                          )
                        ]
                      }
                    }
                  ])
                }),
                _vm._v(" "),
                _c("el-table-column", {
                  attrs: { width: "100", label: "操作" },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(scope) {
                        return [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "mini" },
                              on: {
                                click: function($event) {
                                  return _vm.isCollectionNews(scope.row)
                                }
                              }
                            },
                            [_vm._v("取消收藏")]
                          )
                        ]
                      }
                    }
                  ])
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "el-row",
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
            ])
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0a4ef88e", esExports)
  }
}

/***/ })

});