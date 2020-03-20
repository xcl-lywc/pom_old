webpackJsonplensyn_ui([82],{

/***/ 1189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewType_vue__ = __webpack_require__(1529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewType_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewType_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewType_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewType_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_54c33a86_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewType_vue__ = __webpack_require__(1851);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1849)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-54c33a86"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_NewType_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_54c33a86_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_NewType_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/settings/NewType.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54c33a86", Component.options)
  } else {
    hotAPI.reload("data-v-54c33a86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1529:
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

exports.default = {
  data: function data() {
    return {
      loading: false,

      typeList: [], //分类的树形结构
      defaultProps: {
        children: 'atypes', //分类/专题树的配置
        label: 'atName'
      },

      typeName: null, //类型input名称
      tempLevel: null, //当前操作的层级 top顶层 child 子集
      tempAtId: null, //鼠标移动到对应的节点, 记录此节点atId, 显示对应的操作按钮
      tempOperateType: null, //当前操作模式 new新增 edit编辑
      tempOperateObj: {}, //当前触发操作的data对象
      typeDialogVisible: false,

      orgCode: sessionStorage.getItem("orgCode")
    };
  },

  mounted: function mounted() {
    this.getTypeList(null, '/a_types/allarticletypes/from_org/' + this.orgCode, "typeList");
  },
  methods: {
    /**
     * 获取分类(树)
     * @return none
     */
    getTypeList: function getTypeList(atType, url, target) {
      var self = this;
      self.loading = true;
      self.typeDialogVisible = false;
      var config = {
        url: basePath + url,
        method: 'get',
        params: {
          type: atType
        }
      };
      self.$request.requestAxios(config.method, config.url, { params: config.params }, function (response) {
        self[target] = response.data.data;
        self.loading = false;
      }, function (error) {
        self.$message.error(error);
        self.loading = false;
      });
    },

    /**
     * 点击显示分类输入dialog
     * @param {string} typeStr  添加顶层top 或是 添加子集层 child
     * @param {string} operate  当前操作模式
     * @param {object} data     当前点击的对象data
     */
    showTypeDialog: function showTypeDialog(typeStr, operate, data) {
      this.typeDialogVisible = true;
      this.typeName = null;
      this.tempLevel = typeStr;
      this.tempOperateObj = data; //保存当前操作的data
      this.tempOperateType = operate;
      if (operate == "edit") {
        this.typeName = data.atName;
      }
    },

    /**
     * 点击确定, 添加/编辑 节点提交 (顶层/子集)
     */
    addType: function addType() {
      var _this = this;

      var self = this;
      var config = {};
      if (self.tempLevel == "top") {
        config.data = {
          atName: self.typeName,
          atType: "1"
        };
      } else {
        config.data = {
          atName: self.typeName,
          atType: "1",
          parentId: self.tempOperateObj.atId
        };
      }

      if (self.tempOperateType == "new") {
        config.url = basePath + '/a_types/add/from_org/' + self.orgCode, config.method = "post";
      } else {
        config.url = basePath + '/a_types/' + self.tempOperateObj.atId + '/from_org/' + self.orgCode, config.method = "patch";
        config.data = {
          atName: self.typeName
        };
      }
      // config.data.partyOrgId = userOrgId
      self.$request.requestAxios(config.method, config.url, config.data, function () {
        self.$message({
          message: "成功",
          type: "success"
        });
        //重新查询
        _this.getTypeList(null, '/a_types/allarticletypes/from_org/' + self.orgCode, "typeList");
      }, function (error) {
        self.$message.error(error);
      });
    },
    deleteType: function deleteType(node, data) {
      var self = this;
      self.$confirm("确定删除吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var config = {
          url: basePath + '/a_types/' + data.atId + '/from_org/' + self.orgCode,
          method: "delete"
        };
        self.$request.requestAxios(config.method, config.url, null, function () {
          self.$message.success("删除成功");
          //重新查询
          self.getTypeList(null, '/a_types/allarticletypes/from_org/' + self.orgCode, "typeList");
        }, function (error) {
          self.$message.error(error);
        });
      }).catch(function (error) {
        //self.$message.error(error)
      });
    },

    /**
     * 鼠标浮动, 显示对应的编辑按钮
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    showContorl: function showContorl(data) {
      this.tempAtId = data.atId;
    },
    editType: function editType() {}
  }
};

/***/ }),

/***/ 1849:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1850);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("d69f590c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54c33a86\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewType.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54c33a86\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./NewType.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1850:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.button-group[data-v-54c33a86] {\n  padding: 10px;\n  background: #fff;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n.custom-tree-node[data-v-54c33a86] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 14px;\n}\n.custom-tree-node .tree-right-operate[data-v-54c33a86] {\n  margin-left: 15px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1851:
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
        { staticClass: "button-group" },
        [
          _c(
            "el-button",
            {
              staticClass: "button-new-top-type",
              attrs: { type: "primary", size: "mini" },
              on: {
                click: function($event) {
                  return _vm.showTypeDialog("top", "new")
                }
              }
            },
            [_vm._v("添加顶层分类")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.typeList && _vm.typeList.length > 0
        ? _c("el-tree", {
            directives: [
              {
                name: "loading",
                rawName: "v-loading",
                value: _vm.loading,
                expression: "loading"
              }
            ],
            ref: "typeTree",
            attrs: {
              data: _vm.typeList,
              "node-key": "atId",
              props: _vm.defaultProps,
              "expand-on-click-node": false
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "default",
                  fn: function(ref) {
                    var node = ref.node
                    var data = ref.data
                    return _c(
                      "span",
                      {
                        staticClass: "custom-tree-node",
                        on: {
                          mouseover: function($event) {
                            return _vm.showContorl(data)
                          },
                          mouseout: function($event) {
                            _vm.tempAtId = null
                          }
                        }
                      },
                      [
                        _c("span", [_vm._v(_vm._s(node.label))]),
                        _vm._v(" "),
                        _vm.tempAtId == data.atId
                          ? _c(
                              "span",
                              { staticClass: "tree-right-operate" },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: { type: "text", size: "mini" },
                                    on: {
                                      click: function($event) {
                                        return _vm.showTypeDialog(
                                          "child",
                                          "new",
                                          data
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v("\n          添加子分类\n        ")]
                                ),
                                _vm._v(" "),
                                data.atypes && data.atypes.length <= 0
                                  ? _c(
                                      "el-button",
                                      {
                                        attrs: { type: "text", size: "mini" },
                                        on: {
                                          click: function() {
                                            return _vm.deleteType(node, data)
                                          }
                                        }
                                      },
                                      [_vm._v("\n          删除\n        ")]
                                    )
                                  : _vm._e()
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    )
                  }
                }
              ],
              null,
              false,
              3361139824
            )
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.tempOperateType == "new" ? "新增" : "编辑",
            visible: _vm.typeDialogVisible,
            width: "30%"
          },
          on: {
            "update:visible": function($event) {
              _vm.typeDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            { attrs: { "label-width": "100px" } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "分类名：", required: "" } },
                [
                  _c("el-input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.typeName,
                      callback: function($$v) {
                        _vm.typeName = $$v
                      },
                      expression: "typeName"
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
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.typeDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { disabled: !_vm.typeName, type: "primary" },
                  on: { click: _vm.addType }
                },
                [_vm._v("确 定")]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-54c33a86", esExports)
  }
}

/***/ })

});