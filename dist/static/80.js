webpackJsonplensyn_ui([80],{

/***/ 1214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_AutoPaperDetail_vue__ = __webpack_require__(1561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_AutoPaperDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_AutoPaperDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_AutoPaperDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_AutoPaperDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3d5624b0_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_AutoPaperDetail_vue__ = __webpack_require__(1936);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1934)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3d5624b0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_AutoPaperDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3d5624b0_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_AutoPaperDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/AutoPaperDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d5624b0", Component.options)
  } else {
    hotAPI.reload("data-v-3d5624b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1561:
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

exports.default = {
  data: function data() {
    return {
      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      detailLoading: false,
      detailData: {}

    };
  },

  watch: {},
  mounted: function mounted() {
    this.getDetailData();
  },

  methods: {
    /**
     * 获取树形数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getDetailData: function getDetailData() {
      var self = this;

      self.detailLoading = true;

      var config = {
        id: self.$route.params.id
      };

      self.$request.requestAxios('get', basePath + "/test_papers/test_papers/details", { params: config }, function (response) {
        self.detailData = response.data.data;
        self.detailLoading = false;
      }, function (error) {
        self.$message.error(error);
        self.detailLoading = false;
      });
    }
  }
};

/***/ }),

/***/ 1934:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1935);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("2facbe34", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d5624b0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./AutoPaperDetail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d5624b0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./AutoPaperDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1935:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.tag-wrap .el-tag[data-v-3d5624b0] {\n  margin: 0 10px 10px 0;\n}\n.tag-wrap .el-tag[data-v-3d5624b0]:last-child {\n  margin: 0 0 10px 0;\n}\n.question-number-item[data-v-3d5624b0] {\n  margin: 10px 0;\n}\n.form-wrap[data-v-3d5624b0] {\n  padding: 20px;\n  background: #fff;\n}\n.custom-tree-node[data-v-3d5624b0] {\n  display: inline-block;\n  width: 100%;\n}\n.text-blue[data-v-3d5624b0] {\n  color: #409EFF;\n}\n", ""]);

// exports


/***/ }),

/***/ 1936:
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
          attrs: {
            href: "#",
            onclick: "javascript: window.history.go(-1);return false;"
          }
        },
        [_vm._v("返回")]
      ),
      _vm._v(" "),
      _c(
        "el-form",
        { staticClass: "form-wrap" },
        [
          _c("el-form-item", { attrs: { label: "考试主题: " } }, [
            _vm._v("\n      " + _vm._s(_vm.detailData.theme) + "\n    ")
          ]),
          _vm._v(" "),
          _c("el-form-item", { attrs: { label: "考试要求: " } }, [
            _vm._v("\n      " + _vm._s(_vm.detailData.requirement) + "\n    ")
          ]),
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3d5624b0", esExports)
  }
}

/***/ })

});