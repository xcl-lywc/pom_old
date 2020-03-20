webpackJsonplensyn_ui([131],{

/***/ 1120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_News_List_vue__ = __webpack_require__(1438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_News_List_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_News_List_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_News_List_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_News_List_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_20c1fe2e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_News_List_vue__ = __webpack_require__(1609);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_News_List_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_20c1fe2e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_News_List_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/home/News_List.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20c1fe2e", Component.options)
  } else {
    hotAPI.reload("data-v-20c1fe2e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1438:
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

exports.default = {
  data: function data() {
    return {
      elementPageData: { //分页需要的数据
        defaultData: this.$util.elementPagination,
        pageNum: this.$util.elementPagination.pageNumDefault,
        pageSize: this.$util.elementPagination.pageSizeDefault
      },
      allarticletypes: { newsData: {}, types: {} }, //新闻，栏目数据
      paramObject: JSON.parse(this.$route.params.object),
      newsData: { rows: [], total: 0 }
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.getQueryNewsData();
  },

  methods: {
    /*
    * 查询新闻数据
    */
    getQueryNewsData: function getQueryNewsData() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/a_info/article/list/from_org/' + this.$store.state.currentPartyOrg.code, self._getQueryNewsParams(), function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.newsData.rows = resposeData.data.rows;
        self.newsData.total = resposeData.data.total;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_info/article/list - 失败');
      });
    },
    _getQueryNewsParams: function _getQueryNewsParams() {

      var self = this;
      var paramsData = {
        params: {
          pageSize: this.elementPageData.pageSize,
          pageNum: this.elementPageData.pageNum
        }
      };
      if (self.paramObject.atType == 2) {
        paramsData.params.special = self.paramObject.atId;
      } else {
        paramsData.params.type = self.paramObject.atId;
      }
      return paramsData;
    },

    /*
    * 时间转换
    * @param {string} timeStamp 时间戳
    * @return time 返回转换后的时间
    */
    _dataCovert: function _dataCovert(timeStamp) {
      return new Date(timeStamp).Format('yyyy-MM-dd');
    },

    /*
    * 改变当前页码触发此事件，并广播paginationChange事件
    * @param {number} val 当前页码
    */
    handleCurrentChange: function handleCurrentChange(val) {
      this.elementPageData.pageNum = val;
      this.getQueryNewsData();
    },

    /*
    * 改变每页条数触发此事件，并广播paginationChange事件
    * @param {number} val 每页条数
    */
    handleSizeChange: function handleSizeChange(val) {
      this.elementPageData.pageSize = val;
      this.getQueryNewsData();
    }
  }
};

/***/ }),

/***/ 1609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "row" },
    [
      _c(
        "el-breadcrumb",
        {
          staticClass: "pad20 border-home-er",
          attrs: { "separator-class": "el-icon-arrow-right" }
        },
        [
          _c("el-breadcrumb-item", { attrs: { to: { path: "/home" } } }, [
            _vm._v("首页")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v(_vm._s(_vm.paramObject.atName))])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col-xs-12 mr-bot20 news-types-model" }, [
        _c(
          "div",
          { staticClass: "pad20" },
          [
            _c(
              "ul",
              { staticClass: "padb20 mard20" },
              _vm._l(_vm.newsData.rows, function(newItem, indexNew) {
                return _c(
                  "li",
                  { key: indexNew },
                  [
                    _c(
                      "router-link",
                      {
                        key: newItem,
                        attrs: {
                          to: {
                            name: "News_Detail",
                            params: { id: newItem.id }
                          }
                        }
                      },
                      [
                        _c("span", { staticClass: "fl padr5" }, [
                          _vm._v(_vm._s(indexNew + 1) + ".")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "fl text" }, [
                          _vm._v(_vm._s(newItem.articleName))
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "fr" }, [
                          _vm._v(_vm._s(_vm._dataCovert(newItem.createTime)))
                        ])
                      ]
                    )
                  ],
                  1
                )
              }),
              0
            ),
            _vm._v(" "),
            _c("div", { staticClass: "clear" }),
            _vm._v(" "),
            _c("el-pagination", {
              staticClass: "ce-pagination",
              attrs: {
                "current-page": _vm.currentPage4,
                "page-sizes": _vm.elementPageData.defaultData.pageSizes,
                "page-size": _vm.elementPageData.defaultData.pageSizeDefault,
                layout: "total, sizes, prev, pager, next, jumper",
                total: _vm.newsData.total
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
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-20c1fe2e", esExports)
  }
}

/***/ })

});