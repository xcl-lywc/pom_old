webpackJsonplensyn_ui([63],{

/***/ 1209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_KnowledgePoint_vue__ = __webpack_require__(1556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_KnowledgePoint_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_KnowledgePoint_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_KnowledgePoint_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_KnowledgePoint_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_cd3a8280_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_KnowledgePoint_vue__ = __webpack_require__(1919);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1915)
  __webpack_require__(1917)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cd3a8280"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_KnowledgePoint_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_cd3a8280_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_KnowledgePoint_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/KnowledgePoint.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cd3a8280", Component.options)
  } else {
    hotAPI.reload("data-v-cd3a8280", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1556:
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

exports.default = {
  data: function data() {
    var checkTime = function checkTime(rule, value, callback) {
      console.log(value);
      if (!value) {
        callback(new Error('请选择时间区间'));
      } else {
        if (value > new Date().getTime()) {
          callback(new Error('时间必须选当前时间之前'));
        } else {
          callback();
        }
      }
    };
    return {
      loading: false,
      resource: JSON.parse(sessionStorage.getItem("resource")),
      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),
      treeData: [], //党组织的树形结构
      defaultProps: {
        children: 'childrens', //树的配置
        label: 'name'
      },
      //表单
      partyForm: {
        name: null
      },
      //验证
      rules: {
        createrOrgTime: [{ validator: checkTime, trigger: 'blur' }, { validator: checkTime, trigger: 'change' }, { required: true, message: '请选择成立日期', trigger: 'blur' }]
      },
      typeName: null, //类型input名称
      tempLevel: null, //当前操作的层级 sameLevel本级 childLevel子级 topLevel 顶级
      tempId: null, //鼠标移动到对应的节点, 记录此节点id, 显示对应的操作按钮
      tempOperateType: null, //当前操作模式 new新增 edit编辑
      tempOperateObj: {}, //当前触发操作的data对象
      parentType: null, //父节点的类型, 用于判断 添加或编辑节点的类型
      partyDialogVisible: false,
      dictionaryPosition: [],

      canAdd: false,
      canUpdate: false,
      canDelete: false
    };
  },

  components: {},
  mounted: function mounted() {
    this.getTreeData('/knowledges/knowledges/all_tree', "treeData");
    this.canAdd = this.resource && this.resource.indexOf(410) == -1 ? false : true;
    this.canUpdate = this.resource && this.resource.indexOf(412) == -1 ? false : true;
    this.canDelete = this.resource && this.resource.indexOf(411) == -1 ? false : true;
  },

  watch: {},
  methods: {
    /**
     * 获取字典表数据
     * @return {[type]} [description]
     */
    getDictionaryData: function getDictionaryData() {
      var self = this;

      var config = {
        url: basePath + '/contrast/all_contrast_info',
        method: "get"
      };

      self.$request.requestAxios(config.method, config.url, null, function (response) {
        response.data.data.forEach(function (item) {
          switch (item.id) {
            case 8:
              //党组织职位
              self.dictionaryPosition = item.list;
              break;
            default:
              break;
          }
        });
      }, function (error) {
        self.$message.error("获取数据对照表失败, 部分功能无法使用");
      });
    },

    /**
     * 获取树形数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getTreeData: function getTreeData(url, target) {
      var self = this;
      self.loading = true;
      self.partyDialogVisible = false;

      self.$request.requestAxios('get', '' + basePath + url, null, function (response) {
        self[target] = response.data.data;
        self.loading = false;
      }, function (error) {
        self.$message.error(error);
        self.loading = false;
      });
    },

    /**
     * 点击显示党组织dialog
     * @param {string} typeStr  添加顶层top 或是 添加子集层 child
     * @param {string} operate  当前操作模式
     * @param {object} data     当前点击的对象data
     */
    showDialog: function showDialog(typeStr, operate, data) {
      var self = this;

      if (this.$refs.partyForm) {
        this.$refs.partyForm.resetFields();
      }

      self.tempLevel = typeStr;
      self.tempOperateObj = data; //保存当前操作的data
      self.tempOperateType = operate;

      if (data && data.parentId) {
        //判断父节点type, 没有父节点则为null
        if (self.$refs.partyTree.getNode(data.parentId)) {
          self.parentType = self.$refs.partyTree.getNode(data.parentId).data.type;
        } else {
          self.parentType = null;
        }
      } else {
        self.parentType = null;
      }

      self.loading = true;
      self.focusStatus = false;

      if (operate == "edit") {
        //点击编辑, 查询详情, 使用返回的数据
        self.getPartyDetail(data);
      } else {
        self.partyDialogVisible = true;
        self.$nextTick(function () {
          if (self.$refs.partyForm) {
            self.restPartyForm();
            self.$refs.partyForm.clearValidate();
          }
        });
      }

      self.loading = false;
    },
    restPartyForm: function restPartyForm() {
      this.partyForm = {
        name: null
      }, this.$refs.partyForm.resetFields();
    },

    /**
     * 获取党组织详情中的数据(使用promise时需要将promise放在函数中, 否则将会立刻执行)
     * @return {[type]} [description]
     */
    getPartyDetail: function getPartyDetail(item) {
      var self = this;
      //初始化promise对象, 完成异步操作后return此对象, 外部方法链式调用then进行下一步操作
      self.$request.requestAxios("get", basePath + '/knowledges/knowledges/details', { params: { id: item.id } }, function (response) {
        self.partyForm = response.data.data;

        self.loading = false;
        self.partyDialogVisible = true;
        self.$nextTick(function () {
          if (self.$refs.partyForm) {
            self.$refs.partyForm.clearValidate();
          }
        });
      }, function (error) {
        self.loading = false;
        self.$message.error(error);
      });
    },

    /**
     * 删除党组织
     * @param  {object} node 节点node
     * @param  {object} data 节点数据
     * @return {[type]}      [description]
     */
    deleteParty: function deleteParty(node, data) {
      var self = this;
      self.$confirm("确定删除吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        self.$request.requestAxios("delete", basePath + '/knowledges/knowledges/delete/' + data.id + '/from_org/' + self.orgCode, null, function (reponse) {
          self.$message.success("删除成功");
          //重新查询
          self.getTreeData('/knowledges/knowledges/all_tree', "treeData");
        }, function (error) {
          self.$message.error(error);
        });
      }).catch(function (error) {});
    },

    /**
     * 鼠标浮动, 显示对应的编辑按钮
     * @param  {object} data 当前树节点的数据
     * @return {[type]}      [description]
     */
    showControl: function showControl(data) {
      this.tempId = data.id;
    },

    /**
     * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
     * @param  {string} formName [description]
     * @return {[type]}          [description]
     */
    submitForm: function submitForm(formName) {
      var self = this;

      var config = {
        url: basePath + '/knowledges/knowledges/add/from_org/' + self.orgCode,
        method: "post",
        data: self.partyForm
      };

      if (self.tempOperateType == "edit") {
        config.url = basePath + '/knowledges/knowledges/update/' + self.tempOperateObj.id + '/from_org/' + self.orgCode;
        config.method = "patch";
      }

      if (self.tempLevel == "sameLevel") {
        //添加同级党组织
        self.partyForm.parentId = self.tempOperateObj.parentId;
      } else if (self.tempLevel == "childLevel") {
        // 添加本级公司的下级党组织
        self.partyForm.parentId = self.tempOperateObj.id;
      } else {
        //点击添加顶层组织
        self.partyForm.parentId = null;
      }
      //追加选中公司的id数组
      // self.partyForm.companyId = self.$refs.companyEdit.getArray("id")

      self.$refs[formName].validate(function (valid) {
        if (valid) {
          self.loading = true;

          self.$request.requestAxios(config.method, config.url, config.data, function (response) {
            self.$message.success(response.data.meta.message);
            //重新查询
            self.getTreeData('/knowledges/knowledges/all_tree', "treeData");
            self.loading = false;
            self.partyDialogVisible = false;
          }, function (error) {
            self.$message.error(error);
            self.loading = false;
          });
        } else {
          self.$message.error("请检查必填项");
          return false;
        }
      });
    }
  }
};

/***/ }),

/***/ 1915:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1916);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("082584ce", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cd3a8280\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./KnowledgePoint.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cd3a8280\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./KnowledgePoint.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1916:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.button-group[data-v-cd3a8280] {\n  padding: 10px;\n  background: #fff;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n.custom-tree-node[data-v-cd3a8280] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 14px;\n}\n.custom-tree-node .tree-right-operate[data-v-cd3a8280] {\n  margin-left: 15px;\n}\n.position-wrap[data-v-cd3a8280] {\n  position:  relative;\n  max-height: 400px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.position-title[data-v-cd3a8280] {\n  position: absolute;\n  top: -30px;\n  margin: 0 0 0 50px;\n  text-align: center;\n  font-size: 14px;\n}\n/*上传头像*/\n.avatar-wrap[data-v-cd3a8280] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  border: 1px dashed #ccc;\n  border-radius: 5px;\n}\n.avatar-wrap[data-v-cd3a8280]:hover {\n  border: 1px dashed #409EFF;\n  color: #409EFF;\n}\n.avatar-img[data-v-cd3a8280] {\n  max-width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 1917:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1918);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("009a14f2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cd3a8280\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./KnowledgePoint.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cd3a8280\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./KnowledgePoint.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1918:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.left-margin-50 .el-form-item__content {\n  margin-left: 50px!important;\n}\n", ""]);

// exports


/***/ }),

/***/ 1919:
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
        "el-button",
        {
          attrs: { disabled: !_vm.canAdd, type: "primary", size: "mini" },
          on: {
            click: function($event) {
              return _vm.showDialog("topLevel", "new", null)
            }
          }
        },
        [_vm._v("\n    添加顶层\n  ")]
      ),
      _vm._v(" "),
      _c("el-tree", {
        directives: [
          {
            name: "loading",
            rawName: "v-loading",
            value: _vm.loading,
            expression: "loading"
          }
        ],
        ref: "partyTree",
        attrs: {
          data: _vm.treeData,
          "node-key": "id",
          props: _vm.defaultProps,
          "expand-on-click-node": false
        },
        scopedSlots: _vm._u([
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
                      return _vm.showControl(data)
                    },
                    mouseout: function($event) {
                      _vm.tempId = null
                    }
                  }
                },
                [
                  _c("span", [
                    _vm._v(" " + _vm._s(node.label) + " "),
                    false
                      ? _c("i", {
                          staticClass: "fa fa-star text-yellow",
                          attrs: { "aria-hidden": "true" }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.tempId == data.id,
                          expression: "tempId == data.id"
                        }
                      ],
                      staticClass: "tree-right-operate"
                    },
                    [
                      _vm.canAdd
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "text", size: "mini" },
                              on: {
                                click: function($event) {
                                  return _vm.showDialog(
                                    "childLevel",
                                    "new",
                                    data
                                  )
                                }
                              }
                            },
                            [_vm._v("\n            添加下级\n          ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.canAdd
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "text", size: "mini" },
                              on: {
                                click: function($event) {
                                  return _vm.showDialog(
                                    "sameLevel",
                                    "new",
                                    data
                                  )
                                }
                              }
                            },
                            [_vm._v("\n            添加同级\n          ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.canUpdate
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "text", size: "mini" },
                              on: {
                                click: function($event) {
                                  return _vm.showDialog(
                                    "sameLevel",
                                    "edit",
                                    data
                                  )
                                }
                              }
                            },
                            [_vm._v("\n            编辑\n          ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      data.childrens &&
                      data.childrens.length <= 0 &&
                      _vm.canDelete
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "text", size: "mini" },
                              on: {
                                click: function() {
                                  return _vm.deleteParty(node, data)
                                }
                              }
                            },
                            [_vm._v("\n            删除\n          ")]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ]
              )
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: _vm.tempOperateType == "new" ? "新增" : "编辑",
            visible: _vm.partyDialogVisible,
            "close-on-click-modal": false,
            width: "40%"
          },
          on: {
            "update:visible": function($event) {
              _vm.partyDialogVisible = $event
            },
            "before-close": function($event) {
              _vm.focusStatus = false
            },
            close: _vm.restPartyForm
          }
        },
        [
          _c(
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
                "el-form",
                {
                  ref: "partyForm",
                  attrs: {
                    model: _vm.partyForm,
                    rules: _vm.rules,
                    "label-width": "120px",
                    size: "small"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        prop: "name",
                        label: "知识点名称",
                        rules: {
                          required: true,
                          message: "请输入知识点名称",
                          trigger: "blur"
                        }
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.partyForm.name,
                          callback: function($$v) {
                            _vm.$set(_vm.partyForm, "name", $$v)
                          },
                          expression: "partyForm.name"
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
                  attrs: { disabled: _vm.loading },
                  on: {
                    click: function($event) {
                      _vm.partyDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { disabled: _vm.loading, type: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.submitForm("partyForm")
                    }
                  }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-cd3a8280", esExports)
  }
}

/***/ })

});