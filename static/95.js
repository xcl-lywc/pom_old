webpackJsonplensyn_ui([95],{

/***/ 1242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Instructions_vue__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Instructions_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Instructions_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Instructions_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Instructions_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_614a8521_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Instructions_vue__ = __webpack_require__(1990);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1988)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Instructions_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_614a8521_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Instructions_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/maintenanceSystem/Instructions.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-614a8521", Component.options)
  } else {
    hotAPI.reload("data-v-614a8521", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1589:
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

exports.default = {
  data: function data() {
    return {
      value: "# 一级标题",
      loading: false
    };
  },

  methods: {
    /* 
      GET  查询--根据产品id查询产品说明书
    */
    getInstructions: function getInstructions() {
      var _this = this;

      this.loading = true;
      // this.axios.defaults.headers.common['Authorization'] = '';
      // this.axios.get(`${this.$util.msBasePath}/other/instructions`,{params:{project_id:22,}}).then( (response) => {
      //   if(response.data.meta.code === 0){
      //     this.value = response.data.data?response.data.data:'';//产品---说明书
      //   }else{
      //     this.$message.error(response.data.meta.message, 20);   
      //   }
      //   this.loading = false;
      // }).catch( (error) => {
      //   this.$message.error(error);
      //   this.loading = false;
      // }); 

      this.$request.requestAxios("get", this.$util.msBasePath + "/other/instructions", { params: { project_id: 22 } }, function (response) {
        if (response.data.meta.code === 0) {
          _this.value = response.data.data ? response.data.data : ''; //产品---说明书
        } else {
          _this.$message.error(response.data.meta.message, 20);
        }
        _this.loading = false;
      }, function (error, status) {
        _this.$message.error(error);
        _this.loading = false;
      });
    },

    /*
     * 跳转到指定的页面
     */
    rebound: function rebound() {
      this.$router.push({ path: sessionStorage.getItem("instructionsRebound") });
    }
  },
  mounted: function mounted() {
    this.getInstructions();
  }
};

/***/ }),

/***/ 1988:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1989);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("459c63ba", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-614a8521\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Instructions.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-614a8521\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Instructions.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1989:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.instructions {\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n}\n.instructions-top-box {\n  padding: 20px;\n  overflow: hidden;\n  line-height: 24px;\n}\n.instructions-top-box p {\n  margin: 0;\n}\n.instructions-top-box .instructions-title {\n  font-size: 18px;\n  font-weight: 600;\n}\n.instructions-top-box .instructions-back .el-button {\n  /*background:red;*/\n}\n/*\n  预览模式markdown样式修改\n */\n#editormd2 .v-note-show.single-show {\n  width: calc( 100vw - 270px );\n  position: absolute;\n  height: 100vh;\n  left: 270px;\n  padding-bottom: 70px;\n}\n#editormd2 .v-note-navigation-wrapper.shadow {\n  position: absolute;\n  left: 0;\n}\n#editormd2 .v-note-navigation-wrapper.shadow .v-note-navigation-close {\n  display: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 1990:
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
      ],
      staticClass: "instructions"
    },
    [
      _c("div", { staticClass: "instructions-top-box" }, [
        _c("p", { staticClass: "fl instructions-title" }, [
          _vm._v("产品说明书")
        ]),
        _vm._v(" "),
        _c(
          "p",
          { staticClass: "fr instructions-back", on: { click: _vm.rebound } },
          [
            _c(
              "el-button",
              {
                attrs: {
                  type: "info",
                  icon: "el-icon-back",
                  size: "mini",
                  round: ""
                }
              },
              [_vm._v("返回")]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "editormd2" } },
        [
          _c("mavon-editor", {
            ref: "md",
            staticStyle: { height: "100vh" },
            attrs: {
              toolbarsFlag: false,
              subfield: false,
              defaultOpen: "preview",
              navigation: true
            },
            model: {
              value: _vm.value,
              callback: function($$v) {
                _vm.value = $$v
              },
              expression: "value"
            }
          })
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-614a8521", esExports)
  }
}

/***/ })

});