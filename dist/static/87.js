webpackJsonplensyn_ui([87],{

/***/ 1192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDetail_vue__ = __webpack_require__(1532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_9ab7082c_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ArticleDetail_vue__ = __webpack_require__(1864);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1862)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9ab7082c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ArticleDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_9ab7082c_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ArticleDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/settings/ArticleDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ab7082c", Component.options)
  } else {
    hotAPI.reload("data-v-9ab7082c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1532:
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

exports.default = {
  data: function data() {
    return {
      detailData: {},
      orgCode: sessionStorage.getItem("orgCode")
    };
  },

  mounted: function mounted() {
    this.getDetailData();
  },
  methods: {
    /**
     * 获取表格数据
     * @param  {需要查询的页码} page 默认不需要传,查询特定页则传入对应的页数
     * @return {[type]}      [description]
     */
    getDetailData: function getDetailData() {
      var self = this;
      self.loading = true;
      var config = {
        method: "get",
        url: basePath + "/a_info/" + this.$route.params.id + "/detail/from_org/" + self.orgCode
      };
      self.$request.requestAxios(config.method, config.url, { params: config.params }, function (response) {
        self.loading = false;
        self.detailData = response.data.data;
        self.detailData.privateFiles = JSON.parse(response.data.data.privateFiles);
      }, function (error) {
        self.loading = false;
        self.$message.error(error);
      });
    },

    /**
     * 删除文章
     * @param  {object} item table Item(通过scope返回)
     * @return none       
     * */
    deleteArticle: function deleteArticle() {
      var self = this;
      var config = {
        method: "delete",
        url: basePath + "/a_info/delete/" + self.$route.params.id + "/from_org/" + self.orgCode
      };

      self.$confirm("确定要删除吗?", "删除", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // 点击确定
        self.$request.requestAxios(config.method, config.url, config.data, function (response) {
          self.$message.success("成功");
          self.$router.push({ name: 'Settings_Article_Delete' });
        }, function (error) {
          self.$message.error(error);
        });
      }).catch(function () {});
    },
    back: function back() {
      this.$router.push({ name: this.$route.params.routername });
    }
  }
};

/***/ }),

/***/ 1862:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1863);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("b13af0d6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ab7082c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ArticleDetail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ab7082c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./ArticleDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1863:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.detail-wrap[data-v-9ab7082c]{\n  margin: 15px;\n  padding: 15px;\n  background: #fff;\n}\n.detail-wrap h3[data-v-9ab7082c]{\n  font-size: 16px;\n  font-weight: bold;\n  margin-bottom: 15px;\n}\n.article-wrap[data-v-9ab7082c] {\n  overflow-y: auto;\n  max-height: calc(100vh - 200px);\n}\n", ""]);

// exports


/***/ }),

/***/ 1864:
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
        "div",
        { staticClass: "detail-wrap" },
        [
          _c(
            "el-button",
            {
              staticClass: "fr",
              attrs: { type: "primary", size: "small" },
              on: { click: _vm.back }
            },
            [_vm._v("返回")]
          ),
          _vm._v(" "),
          _c(
            "el-button",
            {
              staticClass: "fr",
              attrs: { type: "danger", size: "small" },
              on: { click: _vm.deleteArticle }
            },
            [_vm._v("删除")]
          ),
          _vm._v(" "),
          _c("h3", [_vm._v(_vm._s(_vm.detailData.articleName))]),
          _vm._v(" "),
          _c("div", { staticClass: "article-wrap" }, [
            _c("p", [_vm._v("字号: " + _vm._s(_vm.detailData.wordNum))]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("p", {
              staticStyle: {
                border: "1px solid #ececec",
                "min-height": "600px",
                padding: "15px"
              },
              domProps: { innerHTML: _vm._s(_vm.detailData.articleContent) }
            }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("p", [
              _vm._v("附件: \n      "),
              _vm.detailData.privateFiles
                ? _c(
                    "ul",
                    _vm._l(_vm.detailData.privateFiles, function(item, index) {
                      return _c(
                        "li",
                        { key: index + "附件" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "text" },
                              on: {
                                click: function($event) {
                                  return _vm.$util.downloadFile(item.id)
                                }
                              }
                            },
                            [_vm._v(_vm._s(item.name))]
                          )
                        ],
                        1
                      )
                    }),
                    0
                  )
                : _vm._e()
            ])
          ])
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-9ab7082c", esExports)
  }
}

/***/ })

});