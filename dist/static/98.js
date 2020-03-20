webpackJsonplensyn_ui([98],{

/***/ 1128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleList_vue__ = __webpack_require__(1446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3b86c633_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ArticleList_vue__ = __webpack_require__(1624);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1622)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3b86c633"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3b86c633_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ArticleList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/home/ArticleList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b86c633", Component.options)
  } else {
    hotAPI.reload("data-v-3b86c633", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1446:
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

exports.default = {
  data: function data() {
    return {
      searchLoading: false,

      userData: JSON.parse(sessionStorage.getItem('userData')),

      resultList: [],
      // 分页
      page: 1,
      perPage: 10,
      total: 0
    };
  },
  mounted: function mounted() {
    this.searchArticle();
  },

  methods: {
    handleSizeChange: function handleSizeChange(val) {
      this.perPage = val;
      this.searchArticle();
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.page = val;
      this.searchArticle();
    },
    searchArticle: function searchArticle() {
      var _this = this;

      if (this.$route.params.keywords) {
        this.searchLoading = true;
        var search = {
          type: sessionStorage.getItem("typeId") ? JSON.parse(sessionStorage.getItem("typeId")) : null,
          keyWords: this.$route.params.keywords,
          partyOrgId: this.userData.partyOrgId,
          pageNum: this.page || 1,
          pageSize: this.perPage || 10
        };
        this.$request.requestAxios("get", basePath + "/a_info/article/list/from_org/" + this.userData.partyOrgCode, { params: search }, function (response) {
          _this.resultList = response.data.data.rows;
          _this.total = response.data.data.total;
          _this.searchLoading = false;
        }, function (error) {
          _this.searchLoading = false;
          _this.$message.error(error.data.meta.message);
        });
      }
    }
  }
};

/***/ }),

/***/ 1622:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1623);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("7e2d780a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b86c633\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ArticleList.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b86c633\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ArticleList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1623:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.no-data-text[data-v-3b86c633] {\n  height: 32px;\n  text-align: center;\n  color: #ccc;\n}\n.article-list[data-v-3b86c633] {\n  margin: 15px 0;\n}\n.article-item[data-v-3b86c633] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin: 10px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "el-main" },
    [
      _c(
        "el-button",
        {
          attrs: { type: "primary", size: "small" },
          on: {
            click: function($event) {
              return _vm.$router.push({ path: "/home" })
            }
          }
        },
        [_vm._v("回到首页")]
      ),
      _vm._v(" "),
      _c(
        "div",
        [
          _vm.resultList && _vm.resultList.length > 0
            ? _c(
                "ul",
                { staticClass: "article-list" },
                _vm._l(_vm.resultList, function(item) {
                  return _c(
                    "li",
                    { key: item.id, staticClass: "article-item" },
                    [
                      _c(
                        "router-link",
                        {
                          attrs: {
                            to: { name: "News_Detail", params: { id: item.id } }
                          }
                        },
                        [
                          _c("i", { staticClass: "el-icon-caret-right" }),
                          _vm._v(_vm._s(item.articleName))
                        ]
                      ),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          _vm._s(
                            _vm.$util._convertDate(
                              item.createTime,
                              "yyyy年MM月dd日"
                            )
                          )
                        )
                      ])
                    ],
                    1
                  )
                }),
                0
              )
            : _c("div", { staticClass: "no-data-text" }, [
                _vm._v(" 暂无数据 ")
              ]),
          _vm._v(" "),
          _c("el-pagination", {
            attrs: {
              "current-page": _vm.page,
              "page-sizes": [10, 20, 50],
              "page-size": _vm.perPage,
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3b86c633", esExports)
  }
}

/***/ })

});