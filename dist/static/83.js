webpackJsonplensyn_ui([83],{

/***/ 1188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewSpecial_vue__ = __webpack_require__(1528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewSpecial_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewSpecial_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewSpecial_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewSpecial_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_860955f4_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewSpecial_vue__ = __webpack_require__(1848);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1846)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-860955f4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewSpecial_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_860955f4_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewSpecial_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/settings/NewSpecial.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-860955f4", Component.options)
  } else {
    hotAPI.reload("data-v-860955f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1528:
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

exports.default = {
  data: function data() {
    return {
      specialTags: [],
      inputVisible: false,
      inputValue: '',
      loading: false,

      orgCode: sessionStorage.getItem("orgCode")
    };
  },

  mounted: function mounted() {
    this.getSpecialList();
  },
  methods: {
    /**
     * 获取专题列表
     * @return {[type]} [description]
     */
    getSpecialList: function getSpecialList() {
      var self = this;
      self.loading = true;
      var config = {
        url: basePath + '/a_types/articletypes/from_org/' + self.orgCode,
        method: 'get',
        params: { type: "2" }
      };
      self.$request.requestAxios(config.method, config.url, { params: config.params }, function (response) {
        self.specialTags = response.data.data;
        self.loading = false;
      }, function (error) {
        self.$message.error(error);
        self.loading = false;
      });
    },
    addNewSpecial: function addNewSpecial() {},

    /**
     * 点击删除专题
     * @param  {[type]} tag [description]
     * @return {[type]}     [description]
     */
    handleClose: function handleClose(tag) {
      var self = this;
      self.$confirm('确认删除该专题吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var config = {
          url: basePath + '/a_types/' + tag.atId + '/from_org/' + self.orgCode,
          method: 'delete'
        };
        self.$request.requestAxios(config.method, config.url, null, function (response) {
          self.$message({
            message: "删除专题成功!",
            type: 'success'
          });
          self.specialTags.splice(self.specialTags.indexOf(tag), 1);
        }, function (error) {
          self.$message.error(error);
        });
      });
    },

    /**
     * 点击添加专题, 显示输入框
     * @return {[type]} [description]
     */
    showInput: function showInput() {
      var _this = this;

      this.inputVisible = true;
      this.$nextTick(function () {
        _this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm: function handleInputConfirm() {
      var inputValue = this.inputValue;
      var self = this;
      if (inputValue) {

        var config = {
          url: basePath + '/a_types/add/from_org/' + self.orgCode,
          method: 'post',
          data: {
            atName: self.inputValue,
            atType: "2",
            status: 1
          }
        };
        self.$request.requestAxios(config.method, config.url, config.data, function (response) {
          self.$message({
            message: "添加专题成功!",
            type: 'success'
          });
          self.getSpecialList(); //重新查询
        }, function (error) {
          self.$message.error(error);
        });
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};

/***/ }),

/***/ 1846:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1847);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("08025e62", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-860955f4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewSpecial.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-860955f4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewSpecial.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1847:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.tips-title[data-v-860955f4] {\n  margin-top: 0;\n  color: #797979;\n}\n.special-tag[data-v-860955f4] {\n  margin: 5px;\n}\n.new-special-btn[data-v-860955f4]:hover {\n  cursor: pointer;\n}\n.el-tag[data-v-860955f4] {\n  margin: 5px 10px 5px 0;\n}\n.button-new-tag[data-v-860955f4] {\n  margin: 5px 10px 5px 0;\n  height: 32px;\n  line-height: 30px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.input-new-tag[data-v-860955f4] {\n  width: 150px;\n  margin: 5px 10px 5px 0;\n  vertical-align: bottom;\n}\n", ""]);

// exports


/***/ }),

/***/ 1848:
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
      _c("p", { staticClass: "tips-title" }, [
        _vm._v("点击添加专题, 输入后按Enter保存")
      ]),
      _vm._v(" "),
      _vm._l(_vm.specialTags, function(tag) {
        return _c(
          "el-tag",
          {
            key: tag.atId,
            attrs: { closable: "", "disable-transitions": false },
            on: {
              close: function($event) {
                return _vm.handleClose(tag)
              }
            }
          },
          [_vm._v("\n    " + _vm._s(tag.atName) + "\n  ")]
        )
      }),
      _vm._v(" "),
      _vm.inputVisible
        ? _c("el-input", {
            ref: "saveTagInput",
            staticClass: "input-new-tag",
            attrs: { size: "small" },
            on: { blur: _vm.handleInputConfirm },
            nativeOn: {
              keyup: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.handleInputConfirm($event)
              }
            },
            model: {
              value: _vm.inputValue,
              callback: function($$v) {
                _vm.inputValue = $$v
              },
              expression: "inputValue"
            }
          })
        : _c(
            "el-button",
            {
              staticClass: "button-new-tag",
              attrs: { type: "primary", size: "small" },
              on: { click: _vm.showInput }
            },
            [_vm._v("添加专题")]
          )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-860955f4", esExports)
  }
}

/***/ })

});