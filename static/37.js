webpackJsonplensyn_ui([37],{

/***/ 1212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateExamPaper_vue__ = __webpack_require__(1559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateExamPaper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateExamPaper_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateExamPaper_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateExamPaper_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_d076531a_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_CreateExamPaper_vue__ = __webpack_require__(1930);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1928)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d076531a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateExamPaper_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_d076531a_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_CreateExamPaper_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/CreateExamPaper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d076531a", Component.options)
  } else {
    hotAPI.reload("data-v-d076531a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(1277);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 1270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(1248);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _props$name$component; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _Show_Tree_Selected_Last = __webpack_require__(1271);

var _Show_Tree_Selected_Last2 = _interopRequireDefault(_Show_Tree_Selected_Last);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_props$name$component = {
  props: {
    pageType: 'org', // org为组织工作台，personal为个人工作台
    isEditPage: 0, //0为编辑状态，1为只显示，
    selectionType: 'checked' //'checkd'为多选，radio为单选
  },
  name: 'items',
  components: {
    'show-tree-selected-last': _Show_Tree_Selected_Last2.default
  },
  watch: {},
  data: function data() {
    return {
      orgId: this.pageType == 'org' ? sessionStorage.getItem('orgId') : JSON.parse(sessionStorage.getItem('userData')).partyOrgId,
      treeData: null,
      countLayer: 0, //为第一层，默认显示， 
      checkedValue: [] //被选中的数据
    };
  },
  created: function created() {
    this.getQueryData();
  }
}, (0, _defineProperty3.default)(_props$name$component, 'watch', {}), (0, _defineProperty3.default)(_props$name$component, 'destoryed', function destoryed() {}), (0, _defineProperty3.default)(_props$name$component, 'methods', {
  /*
   * 查询数据
   */
  getQueryData: function getQueryData() {
    var _this = this;

    // -------------- 箭头函数没有自己的this，它继承的是父执行上下文里面的this 105
    this.$request.requestAxios('get', basePath + '/party_member_infos/partyorgtree', { params: { orgId: this.orgId } }, function (response) {
      _this.treeData = _this._convertData(response.data.data ? response.data.data : []);
    }, function (error, status) {
      status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error(basePath + '/party_member_infos/partyorgtree');
    });
  },
  _convertData: function _convertData(data) {
    var _this2 = this;

    this.countLayer++;
    data.forEach(function (item) {
      _this2.countLayer == 1 ? item.isShow = true : item.isShow = true;
      if (item.childrens) _this2._convertData(item.childrens);
      if (item.partyMem) {
        item.partyMem.forEach(function (itemMem) {
          // ---- 为0表示是需要操作多选框，否则禁用
          _this2.isEditPage == 0 ? itemMem.disabled = false : itemMem.disabled = true;
        });
      }
    });
    return data;
  },
  handleCheckedValueChange: function handleCheckedValueChange(val) {
    this.$emit('treeCheckedData', val);
  },

  /*
   * 获取被选中的人员数据(暂时不需要)
   * @params {object} 需要编辑的数据
   */
  _checkedsPerson: function _checkedsPerson(data) {
    var _this3 = this;

    var checkedValue = this.checkedValue;
    data.forEach(function (item) {
      if (item.childrens) _this3._checkedsPerson(item.childrens);
      if (item.partyMem) {
        item.partyMem.forEach(function (itemMem) {
          if (_this3.selectionType == 'checked') {
            //多选
            checkedValue.forEach(function (checkedItem) {
              if (itemMem.id == checkedItem) {
                _this3.checkedData.push(itemMem);
              }
            });
          } else {
            //单选
            if (itemMem.id == checkedValue) {
              _this3.checkedData = itemMem;
            }
          }
        });
      }
    });
  }
}), _props$name$component);

/***/ }),

/***/ 1271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Show_Tree_Selected_Last_vue__ = __webpack_require__(1272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Show_Tree_Selected_Last_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Show_Tree_Selected_Last_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Show_Tree_Selected_Last_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Show_Tree_Selected_Last_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_8fa61118_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Show_Tree_Selected_Last_vue__ = __webpack_require__(1324);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Show_Tree_Selected_Last_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_8fa61118_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Show_Tree_Selected_Last_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/common/tree_select/Show_Tree_Selected_Last.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8fa61118", Component.options)
  } else {
    hotAPI.reload("data-v-8fa61118", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Show_Tree_Selected_Last = __webpack_require__(1271);

var _Show_Tree_Selected_Last2 = _interopRequireDefault(_Show_Tree_Selected_Last);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'items',
  props: {
    treeData: null, //树结构数据
    layer: null, //第几层
    selectionType: 'checked' //'checkd'为多选，radio为单选
  },
  data: function data() {
    return {
      checkedCities: null
    };
  },
  mounted: function mounted() {},

  watch: {},
  destoryed: function destoryed() {},

  methods: {
    showChildren: function showChildren(item) {
      item.isShow = !item.isShow;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 1277:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(1278), __esModule: true };

/***/ }),

/***/ 1278:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1279);
var $Object = __webpack_require__(44).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 1279:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(104);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(66), 'Object', { defineProperty: __webpack_require__(77).f });


/***/ }),

/***/ 1323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Query_Tree_Selected_vue__ = __webpack_require__(1270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Query_Tree_Selected_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Query_Tree_Selected_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Query_Tree_Selected_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Query_Tree_Selected_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4ac56a5e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Query_Tree_Selected_vue__ = __webpack_require__(1325);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Query_Tree_Selected_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4ac56a5e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Query_Tree_Selected_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/common/tree_select/Query_Tree_Selected.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ac56a5e", Component.options)
  } else {
    hotAPI.reload("data-v-4ac56a5e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "my-tree" }, [
    _c(
      "ul",
      _vm._l(_vm.treeData, function(item, index) {
        return _c(
          "li",
          {
            key: index,
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.showChildren(item)
              }
            }
          },
          [
            _vm._v("\n    " + _vm._s(item.name) + "\n     "),
            _c("items", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: item.childrens && item.isShow,
                  expression: "item.childrens && item.isShow"
                }
              ],
              attrs: {
                selectionType: _vm.selectionType,
                layer: _vm.layer,
                treeData: item.childrens
              }
            }),
            _vm._v(" "),
            _c(
              "ul",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: item.partyMem && item.isShow,
                    expression: "item.partyMem && item.isShow"
                  }
                ],
                staticClass: "my-tree"
              },
              _vm._l(item.partyMem, function(itempartyMem, indexpartyMem) {
                return _c(
                  "li",
                  { key: itempartyMem, staticClass: "last-li" },
                  [
                    _vm.selectionType == "checked"
                      ? _c("el-checkbox", { attrs: { label: itempartyMem } }, [
                          _vm._v(_vm._s(itempartyMem.name))
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.selectionType == "radio"
                      ? _c("el-radio", { attrs: { label: itempartyMem } }, [
                          _vm._v(_vm._s(itempartyMem.name))
                        ])
                      : _vm._e()
                  ],
                  1
                )
              }),
              0
            )
          ],
          1
        )
      }),
      0
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-8fa61118", esExports)
  }
}

/***/ }),

/***/ 1325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.selectionType == "checked"
        ? _c(
            "el-checkbox-group",
            {
              staticClass: "my-tree-bar",
              on: { change: _vm.handleCheckedValueChange },
              model: {
                value: _vm.checkedValue,
                callback: function($$v) {
                  _vm.checkedValue = $$v
                },
                expression: "checkedValue"
              }
            },
            [
              _c("show-tree-selected-last", {
                attrs: {
                  selectionType: _vm.selectionType,
                  isEditPage: _vm.isEditPage,
                  treeData: _vm.treeData,
                  layer: "1"
                }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.selectionType == "radio"
        ? _c(
            "el-radio-group",
            {
              staticClass: "my-tree-bar",
              on: { change: _vm.handleCheckedValueChange },
              model: {
                value: _vm.checkedValue,
                callback: function($$v) {
                  _vm.checkedValue = $$v
                },
                expression: "checkedValue"
              }
            },
            [
              _c("show-tree-selected-last", {
                attrs: {
                  selectionType: _vm.selectionType,
                  isEditPage: _vm.isEditPage,
                  treeData: _vm.treeData,
                  layer: "1"
                }
              })
            ],
            1
          )
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4ac56a5e", esExports)
  }
}

/***/ }),

/***/ 1559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(188);

var _stringify2 = _interopRequireDefault(_stringify);

var _Query_Tree_Selected = __webpack_require__(1323);

var _Query_Tree_Selected2 = _interopRequireDefault(_Query_Tree_Selected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      treeLoading: false,
      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      treeData: [], //党组织的树形结构
      defaultProps: {
        children: 'childrens', //树的配置
        label: 'name'
      },

      questionLoading: false,
      formLoading: false,
      examForm: {
        theme: null,
        requirement: null,
        knowledgeArray: [],
        relativeQuestionData: [],
        userIds: []
      },
      idsArray: [], //单独存放ids的数组, 用于查询提醒分布的数据
      //验证
      rules: {
        theme: [{ required: true, message: '请输入考试主题', trigger: 'blur' }],
        requirement: [{ required: true, message: '请输入考试要求', trigger: 'blur' }],
        userIds: [{ required: true, message: '请选择考试人员', trigger: 'change' }]
      },
      disabled: false
    };
  },

  components: {
    "tree-selected": _Query_Tree_Selected2.default //人员下拉树
  },
  watch: {
    "examForm.relativeQuestionData": {
      // 每次查询提醒分布 或 修改题型数量 动态计算总数total
      handler: function handler(newV, odlV) {
        var count = {};
        newV.forEach(function (item, index) {
          count["" + index] = null;
          item.list.forEach(function (itemInner, indexInner) {

            if (itemInner.currentNum) {
              count["" + index] += parseInt(itemInner.currentNum);
            }
          });
        });
        this.examForm.total = count;
      },

      deep: true
    }
  },
  mounted: function mounted() {
    window.ce = this;
    this.getTreeData("/knowledges/knowledges/all_tree", "treeData");
  },

  methods: {
    afterInput: function afterInput(event) {
      if (event.key == "+" || event.key == "-" || event.key == "Shift" || event.key == ".") {
        this.$message.warning("请输入大于1的正整数");
        this.disabled = true;
      }
    },

    /**
     * 获取树形数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getTreeData: function getTreeData(url, target) {
      var _this = this;

      var self = this;
      self.treeLoading = true;
      self.formDialogVisible = false;

      self.$request.requestAxios('get', "" + basePath + url, null, function (response) {
        self[target] = response.data.data;
        _this.getListData("/questions/questions/choice/list", "listData");
        self.treeLoading = false;
      }, function (error) {
        self.$message.error(error);
        self.treeLoading = false;
      });
    },

    /**
     * 点击节点, 添加至右侧知识点列表, 并重新查询体型分布
     * @param  {object} data 当前树节点的数据
     * @return {[type]}      [description]
     */
    clickNode: function clickNode(data) {
      var id = data.id;

      var flag = true;

      this.idsArray.forEach(function (item, index) {
        if (data.id == item) {
          flag = false;
        }
      });

      if (flag) {
        this.examForm.knowledgeArray.push(data);
        this.idsArray.push(data.id);
        this.getRelativeQuestion(this.idsArray);
      } else {
        this.$message.error("已添加该知识点");
      }
    },

    /**
     * 删除知识点
     * @param  {[type]} tag [description]
     * @return {[type]}     [description]
     */
    handleClose: function handleClose(tag) {
      this.examForm.knowledgeArray.splice(this.examForm.knowledgeArray.indexOf(tag), 1);
      this.idsArray.splice(this.idsArray.indexOf(tag.id), 1);
      if (this.idsArray.length > 0) {
        this.getRelativeQuestion(this.idsArray);
      }
    },

    /**
     * 根据知识点数组查询相关题型分布
     * @param  {Array} array   知识点数组(仅包含id)
     * @return {[type]}       [description]
     */
    getRelativeQuestion: function getRelativeQuestion(array) {
      var self = this;

      self.questionLoading = true;
      var arrayHandled = [];

      self.$request.requestAxios('get', basePath + "/questions/questions/type/list", { params: { ids: array.join(",") } }, function (response) {
        self.examForm.relativeQuestionData = response.data.data;
        //self.examForm.tptList = JSON.parse(JSON.stringify(response.data.data))
        self.questionLoading = false;
      }, function (error) {
        self.$message.error(error.data.meta.message);
        self.questionLoading = false;
      });
    },

    /**
     * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
     * @param  {string} formName [description]
     * @return {[type]}          [description]
     */
    submitForm: function submitForm(formName) {
      var self = this;

      var result = self.handleForm(self[formName]);

      var config = {
        url: basePath + "/test_papers/test_papers/add/from_org/" + self.orgCode,
        method: "post",
        data: result
      };

      self.$refs[formName].validate(function (valid) {
        if (valid) {
          self.formLoading = true;
          self.$request.requestAxios(config.method, config.url, config.data, function (response) {
            self.$message.success(response.data.meta.message);
            self.$router.push({ name: "Exam_Paper_List" });
            self.formLoading = false;
            self.formDialogVisible = false;
          }, function (error) {
            self.$message.error(error.data.meta.message || "失败");
            self.formLoading = false;
          });
        } else {
          self.$message.error("请检查必填项");
          return false;
        }
      });
    },

    /**
     * 处理form 返回一个需要保存至后台的form对象
     * @return {[type]} [description]
     */
    handleForm: function handleForm(formData) {
      var form = JSON.parse((0, _stringify2.default)(formData));

      var list = [];

      form.relativeQuestionData.forEach(function (item, index) {
        item.list.forEach(function (itemInner, indexInner) {
          console.log(itemInner);
          if (itemInner.currentNum && parseInt(itemInner.currentNum) != NaN) {
            list.push({
              number: parseInt(itemInner.currentNum),
              score: itemInner.score,
              type: item.type
            });
          }
        });
      });
      form.tptList = list;

      form.knowledges = this.idsArray.join(",");
      form.type = 1;
      form.testTime = 60;

      delete form.relativeQuestionData;
      delete form.knowledgeArray;
      delete form.total;

      return form;
    },
    peopleTreeChanged: function peopleTreeChanged(data) {
      var self = this;
      self.examForm.userIds = data.map(function (item) {
        return item.id;
      });
      self.$refs.examForm.validateField("userIds");
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 1928:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1929);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("7c9e1496", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d076531a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./CreateExamPaper.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d076531a\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./CreateExamPaper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1929:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.tag-wrap .el-tag[data-v-d076531a] {\n  margin: 0 10px 10px 0;\n}\n.tag-wrap .el-tag[data-v-d076531a]:last-child {\n  margin: 0 0 10px 0;\n}\n.question-number-item[data-v-d076531a] {\n  margin: 10px 0;\n}\n.custom-tree-node[data-v-d076531a] {\n  display: inline-block;\n  width: 100%;\n}\n.text-blue[data-v-d076531a] {\n  color: #409EFF;\n}\n", ""]);

// exports


/***/ }),

/***/ 1930:
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
        "el-row",
        { attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { span: 6 } },
            [
              _c("el-tree", {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.treeLoading,
                    expression: "treeLoading"
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
                            click: function($event) {
                              return _vm.clickNode(data)
                            }
                          }
                        },
                        [
                          _vm.tempId == data.id
                            ? _c("i", {
                                staticClass: "el-icon-circle-check",
                                attrs: { "aria-hidden": "true" }
                              })
                            : _vm._e(),
                          _vm._v(
                            "\n          " + _vm._s(node.label) + "\n          "
                          )
                        ]
                      )
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { span: 18 } },
            [
              _c(
                "el-form",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: _vm.formLoading,
                      expression: "formLoading"
                    }
                  ],
                  ref: "examForm",
                  attrs: {
                    model: _vm.examForm,
                    rules: _vm.rules,
                    "label-width": "80px",
                    size: "small"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { prop: "theme", label: "考试主题" } },
                    [
                      _c("el-input", {
                        attrs: { type: "text" },
                        model: {
                          value: _vm.examForm.theme,
                          callback: function($$v) {
                            _vm.$set(_vm.examForm, "theme", $$v)
                          },
                          expression: "examForm.theme"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "requirement", label: "考试要求" } },
                    [
                      _c("el-input", {
                        attrs: { type: "textarea" },
                        model: {
                          value: _vm.examForm.requirement,
                          callback: function($$v) {
                            _vm.$set(_vm.examForm, "requirement", $$v)
                          },
                          expression: "examForm.requirement"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "type", label: "知识点" } },
                    [
                      _vm.examForm.knowledgeArray.length > 0
                        ? _c(
                            "div",
                            { staticClass: "tag-wrap" },
                            _vm._l(_vm.examForm.knowledgeArray, function(
                              item,
                              index
                            ) {
                              return _c(
                                "el-tag",
                                {
                                  key: index + "知识点",
                                  attrs: { closable: "" },
                                  on: {
                                    close: function($event) {
                                      return _vm.handleClose(item)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(item.name))]
                              )
                            }),
                            1
                          )
                        : _c("div", { staticClass: "tag-wrap" }, [
                            _vm._v("点击左侧添加知识点")
                          ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "userIds", label: "参考人员" } },
                    [
                      _c("tree-selected", {
                        attrs: { selectionType: "checked", pageType: "org" },
                        on: { treeCheckedData: _vm.peopleTreeChanged }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.examForm.knowledgeArray.length > 0
                    ? _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "loading",
                              rawName: "v-loading",
                              value: _vm.questionLoading,
                              expression: "questionLoading"
                            }
                          ]
                        },
                        _vm._l(_vm.examForm.relativeQuestionData, function(
                          item,
                          index
                        ) {
                          return item.type == 1 || item.type == 2
                            ? _c(
                                "el-form-item",
                                {
                                  key: index + "题目",
                                  attrs: {
                                    label:
                                      item.type == 1
                                        ? "单选题"
                                        : item.type == 2
                                        ? "多选题"
                                        : "简答题"
                                  }
                                },
                                [
                                  _c("p", [
                                    _vm._v(
                                      "共计 " +
                                        _vm._s(_vm.examForm.total[index] || 0) +
                                        " 道题目"
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm._l(item.list, function(
                                    itemInner,
                                    indexInner
                                  ) {
                                    return _c(
                                      "div",
                                      {
                                        key: index + "题目数",
                                        staticClass: "question-number-item"
                                      },
                                      [
                                        _c("span", [
                                          _vm._v(_vm._s(itemInner.score) + "分")
                                        ]),
                                        _vm._v(" "),
                                        _c("el-input-number", {
                                          attrs: {
                                            min: 0,
                                            max: itemInner.number
                                          },
                                          nativeOn: {
                                            keydown: function($event) {
                                              return _vm.afterInput($event)
                                            }
                                          },
                                          model: {
                                            value: itemInner.currentNum,
                                            callback: function($$v) {
                                              _vm.$set(
                                                itemInner,
                                                "currentNum",
                                                $$v
                                              )
                                            },
                                            expression: "itemInner.currentNum"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(itemInner.number) + "道可用"
                                          )
                                        ])
                                      ],
                                      1
                                    )
                                  })
                                ],
                                2
                              )
                            : _vm._e()
                        }),
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div"),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      staticClass: "fill-width",
                      attrs: {
                        disabled:
                          _vm.loading ||
                          _vm.examForm.knowledgeArray.length <= 0,
                        type: "primary"
                      },
                      on: {
                        click: function($event) {
                          return _vm.submitForm("examForm")
                        }
                      }
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-d076531a", esExports)
  }
}

/***/ })

});