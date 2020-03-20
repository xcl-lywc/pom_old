webpackJsonplensyn_ui([36],{

/***/ 1216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionBasket_vue__ = __webpack_require__(1563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionBasket_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionBasket_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionBasket_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionBasket_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_62b2b94c_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_QuestionBasket_vue__ = __webpack_require__(1942);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1940)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-62b2b94c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionBasket_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_62b2b94c_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_QuestionBasket_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/QuestionBasket.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62b2b94c", Component.options)
  } else {
    hotAPI.reload("data-v-62b2b94c", Component.options)
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

/***/ 1563:
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

      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      formLoading: false,

      cardsLoading: false,

      examForm: {
        theme: null,
        requirement: null,
        type: 2,
        testTime: 60,
        userIds: []
      },
      rules: {
        theme: [{ required: true, message: '请输入考试主题', trigger: 'blur' }],
        requirement: [{ required: true, message: '请输入考试要求', trigger: 'blur' }],
        userIds: [{ required: true, message: '请选择考试人员', trigger: 'change' }]
      },

      basketIds: JSON.parse(sessionStorage.getItem("basket")),
      listData: [],

      singlePageData: [], // 单选题分页后的数据
      multiPageData: [], // 多选题分页后的数据
      answerPageData: [], // 简答题分页后的数据

      singleListData: [], // 单选题总体的数据
      multiListData: [], // 多选题总体的数据
      answerListData: [], // 简答题总体的数据

      singleChoosedData: [], // 单选题当前已选中的数据
      multiChoosedData: [], // 多选题当前已选中的数据
      answerChoosedData: [], // 简答题当前已选中的数据

      currentSinglePage: 1,
      currentSinglePerPage: 5,
      totalSingle: 0, // 单选题的分页

      currentMultiPage: 1,
      currentMultiPerPage: 5,
      totalMulti: 0, // 多选题的分页

      currentAnswerPage: 1,
      currentAnswerPerPage: 1,
      totalAnswer: 0 // 简答题的分页

    };
  },

  components: {
    "tree-selected": _Query_Tree_Selected2.default //人员下拉树
  },
  mounted: function mounted() {
    if (this.basketIds && this.basketIds.length > 0) {
      this.getListData("listData");
    }
  },

  methods: {
    /**
     * 根据序号返回对应的字母 超过26则返回对应(index+1)
     * @param  {number} index 序号下标值 从0开始
     * @return {[type]}       [description]
     */
    returnLetter: function returnLetter(index) {
      if (index >= 0 || index <= 25) {
        return String.fromCharCode(index + 65);
      } else {
        return index + 1;
      }
    },

    /**
     * 获取列表数据, 根据type进行分组, 分页也不重复查询 在本地进行分页
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getListData: function getListData(target) {
      var self = this;

      self.cardsLoading = true;

      var config = {
        ids: self.basketIds.toString()
      };

      self.$request.requestAxios('get', basePath + "/questions/questions/map/list", { params: config }, function (response) {
        // 根据已有的数据加载
        if (response.data.data[1]) {
          self.singleListData = response.data.data[1];
          self.addChoosedKey("singleListData");
          self.totalSingle = response.data.data[1].length;
          self.getPageData("singlePageData", self.currentSinglePage, self.currentSinglePerPage, self.totalSingle, self.singleListData);
        }
        if (response.data.data[2]) {
          self.multiListData = response.data.data[2];
          self.addChoosedKey("multiListData");
          self.totalMulti = response.data.data[2].length;
          self.getPageData("multiPageData", self.currentMultiPage, self.currentMultiPerPage, self.totalMulti, self.multiListData);
        }
        if (response.data.data[3]) {
          self.answerListData = response.data.data[3];
          self.addChoosedKey("answerListData");
          self.totalAnswer = response.data.data[3].length;
          self.getPageData("answerPageData", self.currentAnswerPage, self.currentAnswerPerPage, self.totalAnswer, self.answerListData);
        }
        self.cardsLoading = false;
      }, function (error) {
        self.$message.error(error.data.meta.message);
        self.cardsLoading = false;
      });
    },

    /** 
     *  给数据添加一个choosed 字段 用于标记是否选中
     */
    addChoosedKey: function addChoosedKey(data) {
      var _this = this;

      var dataObj = this[data];

      if (dataObj && dataObj.length > 0) {
        dataObj.forEach(function (item, index) {
          _this.$set(item, "choosed", false);
        });
      }
    },

    /**
     * 将获取的数据分页查询, 模拟后台查询式分页
     * @param  {[type]} target      [description]
     * @param  {[type]} page        [description]
     * @param  {[type]} perPage     [description]
     * @param  {[type]} total       [description]
     * @param  {[type]} totalTarget [description]
     * @return {[type]}             [description]
     */
    getPageData: function getPageData(target, page, perPage, total, totalTarget) {
      var self = this;

      var startIndex = (page - 1) * perPage;
      var endIndex = page * perPage; // 超过也只会取到最后一个

      self[target] = totalTarget.slice(startIndex, endIndex);
    },

    /**
     * 点击选中试题, 添加
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    clickQuestion: function clickQuestion(data) {
      switch (data.type) {
        case 1:
          this.addOrDelete("singleChoosedData", data);
          break;
        case 2:
          this.addOrDelete("multiChoosedData", data);
          break;
        case 3:
          this.addOrDelete("answerChoosedData", data);
          break;
      }
    },

    /**
     * 根据选中情况进行删除和添加 添加时需要验证重复
     */
    addOrDelete: function addOrDelete(targetName, data) {
      if (data.choosed) {
        var flag = this;
        this[targetName].forEach(function (item, index) {
          if (data.id == item) {
            flag = false;
          }
        });
        if (flag) {
          this[targetName].push(data.id);
        }
      } else {
        var index = this[targetName].indexOf(data.id);
        this[targetName].splice(index, 1);
      }
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
            sessionStorage.removeItem("basket"); // 清空试题篮
            self.$router.push({ name: "Exam_Paper_List" });
            self.formLoading = false;
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
      //将已选中的题目进行保存
      form.questionIds = this.singleChoosedData.concat(this.multiChoosedData).concat(this.answerChoosedData);
      //form.questionIds = this.basketIds
      return form;
    },

    /**
     * 移除本题, 并重新查询
     * @param  {[type]} BasketItem [description]
     * @return {[type]}      [description]
     */
    removeQuestion: function removeQuestion(basketItem) {
      var _this2 = this;

      this.$confirm("移除本题后列表会重新查询, 请勿在勾选添加试题时移除!", "确认移除?", {
        confirmButtonText: "确认移除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        //先将三种对应的已选中数据进行移除
        switch (basketItem.type) {
          case 1:
            _this2.singleChoosedData.forEach(function (item, index) {
              if (basketItem.id == item) {
                _this2.singleChoosedData.splice(index, 1);
              }
            });
            break;
          case 2:
            _this2.multiChoosedData.forEach(function (item, index) {
              if (basketItem.id == item) {
                _this2.multiChoosedData.splice(index, 1);
              }
            });
            break;
          case 3:
            _this2.answerChoosedData.forEach(function (item, index) {
              if (basketItem.id == item) {
                _this2.answerChoosedData.splice(index, 1);
              }
            });
            break;
        }
        // 再移除session的id列表
        _this2.basketIds.forEach(function (item, index) {
          if (basketItem.id == item) {
            _this2.basketIds.splice(index, 1);
          }
        });
        sessionStorage.setItem("basket", (0, _stringify2.default)(_this2.basketIds));
        _this2.getListData("listData");
      }).catch(function () {});
    },
    handleSingleSizeChange: function handleSingleSizeChange(val) {
      this.currentSinglePerPage = val;
      this.getPageData("singlePageData", this.currentSinglePage, this.currentSinglePerPage, this.totalSingle, this.singleListData);
    },
    handleSingleCurrentChange: function handleSingleCurrentChange(val) {
      this.currentSinglePage = val;
      this.getPageData("singlePageData", this.currentSinglePage, this.currentSinglePerPage, this.totalSingle, this.singleListData);
    },
    handleMultiSizeChange: function handleMultiSizeChange(val) {
      this.currentMultiPerPage = val;
      this.getPageData("multiPageData", this.currentMultiPage, this.currentMultiPerPage, this.totalMulti, this.multiListData);
    },
    handleMultiCurrentChange: function handleMultiCurrentChange(val) {
      this.currentMultiPage = val;
      this.getPageData("multiPageData", this.currentMultiPage, this.currentMultiPerPage, this.totalMulti, this.multiListData);
    },
    handleAnswerSizeChange: function handleAnswerSizeChange(val) {
      this.currentAnswerPerPage = val;
      this.getPageData("answerPageData", this.currentAnswerPage, this.currentAnswerPerPage, this.totalAnswer, this.answerListData);
    },
    handleAnswerCurrentChange: function handleAnswerCurrentChange(val) {
      this.currentAnswerPage = val;
      this.getPageData("answerPageData", this.currentAnswerPage, this.currentAnswerPerPage, this.totalAnswer, this.answerListData);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 1940:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1941);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("379c1ac8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62b2b94c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./QuestionBasket.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62b2b94c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./QuestionBasket.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1941:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.question-type-item[data-v-62b2b94c] {\n  margin: 10px 0;\n}\n.question-type-title[data-v-62b2b94c] {\n  height: 40px;\n  font-size: 16px;\n  line-height: 40px;\n  color: #333333;\n}\n.card-item[data-v-62b2b94c] {\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n.card-item[data-v-62b2b94c]:hover {\n  box-shadow: 0 5px 15px #ccc;\n  border: 1px solid #eee;\n}\n.title-wrap[data-v-62b2b94c],\n.deadline[data-v-62b2b94c],\n.bottom-wrap[data-v-62b2b94c] {\n  margin: 8px 0;\n}\n.title-wrap[data-v-62b2b94c],\n.bottom-wrap[data-v-62b2b94c] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.no-data-text[data-v-62b2b94c] {\n  height: 60px;\n  line-height: 60px;\n  text-align: center;\n  color: #bbb;\n}\n.cards-wrap[data-v-62b2b94c] {\n  max-height: calc( 100vh - 205px);\n  overflow: auto;\n}\n.el-card[data-v-62b2b94c] {\n  margin: 10px 0;\n}\n.el-card .img-wrap[data-v-62b2b94c] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n}\n.el-card .img-wrap img[data-v-62b2b94c],\n.el-card .img-wrap .no-img-div[data-v-62b2b94c] {\n  line-height: 100px;\n  text-align: center;\n  height: 100px;\n  width: 100px;\n}\n.question-info[data-v-62b2b94c] {\n  margin-top: 15px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 1942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
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
            { attrs: { prop: "userIds", label: "参考人员" } },
            [
              _c("tree-selected", {
                attrs: { selectionType: "checked", pageType: "org" },
                on: { treeCheckedData: _vm.peopleTreeChanged }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.basketIds && _vm.basketIds.length > 0
        ? _c("div", [
            _c(
              "div",
              { staticClass: "question-type-item" },
              [
                _c("h4", { staticClass: "question-type-title" }, [
                  _vm._v("单选题")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "loading",
                        rawName: "v-loading",
                        value: _vm.cardsLoading,
                        expression: "cardsLoading"
                      }
                    ],
                    staticClass: "cards-wrap"
                  },
                  [
                    _vm._l(_vm.singlePageData, function(item, index) {
                      return _c(
                        "el-card",
                        { key: index + "单选", staticClass: "card-item" },
                        [
                          _c(
                            "el-row",
                            { attrs: { gutter: 10 } },
                            [
                              _c(
                                "el-col",
                                { attrs: { span: 18 } },
                                [
                                  _c("el-checkbox", {
                                    attrs: { label: " " },
                                    on: {
                                      change: function($event) {
                                        return _vm.clickQuestion(item)
                                      }
                                    },
                                    model: {
                                      value: item.choosed,
                                      callback: function($$v) {
                                        _vm.$set(item, "choosed", $$v)
                                      },
                                      expression: "item.choosed"
                                    }
                                  }),
                                  _vm._v(
                                    _vm._s(item.content) + "\n              "
                                  ),
                                  _c(
                                    "ul",
                                    _vm._l(item.answerList, function(
                                      itemInner,
                                      indexInner
                                    ) {
                                      return _c("li", { key: itemInner.id }, [
                                        _vm._v(
                                          _vm._s(_vm.returnLetter(indexInner)) +
                                            "、" +
                                            _vm._s(itemInner.content)
                                        )
                                      ])
                                    }),
                                    0
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                { staticClass: "img-wrap", attrs: { span: 6 } },
                                [
                                  !item.picture
                                    ? _c("div", { staticClass: "no-img-div" }, [
                                        _vm._v("暂无图片")
                                      ])
                                    : _c("img", {
                                        staticStyle: {
                                          height: "100px",
                                          width: "100px"
                                        },
                                        attrs: { src: item.picture, alt: "" }
                                      })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                {
                                  staticClass: "question-info",
                                  attrs: { span: 24 }
                                },
                                [
                                  _c("p", [
                                    _vm._v("题型:\n                "),
                                    item.type == 1
                                      ? _c("span", [_vm._v("单选题")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    item.type == 2
                                      ? _c("span", [_vm._v("多选题")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    item.type == 3
                                      ? _c("span", [_vm._v("简答题")])
                                      : _vm._e()
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("创建者: " + _vm._s(item.createName))
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("分值: " + _vm._s(item.score))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    [
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            type: "primary",
                                            size: "small"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.$router.push({
                                                name: "Question_Detail",
                                                params: { id: item.id }
                                              })
                                            }
                                          }
                                        },
                                        [_vm._v("查看解析")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            type: "danger",
                                            size: "small"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.removeQuestion(item)
                                            }
                                          }
                                        },
                                        [_vm._v("移除本题")]
                                      )
                                    ],
                                    1
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    _vm._v(" "),
                    _vm.singlePageData && _vm.singlePageData.length <= 0
                      ? _c("p", { staticClass: "no-data-text" }, [
                          _vm._v(" 暂无数据 ")
                        ])
                      : _vm._e()
                  ],
                  2
                ),
                _vm._v(" "),
                _c("el-pagination", {
                  attrs: {
                    "current-page": _vm.currentSinglePage,
                    "page-sizes": [5, 10, 20],
                    "page-size": _vm.currentSinglePerPage,
                    layout: "total, sizes, prev, pager, next, jumper",
                    total: _vm.totalSingle
                  },
                  on: {
                    "size-change": _vm.handleSingleSizeChange,
                    "current-change": _vm.handleSingleCurrentChange
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "question-type-item" },
              [
                _c("h4", { staticClass: "question-type-title" }, [
                  _vm._v("多选题")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "loading",
                        rawName: "v-loading",
                        value: _vm.cardsLoading,
                        expression: "cardsLoading"
                      }
                    ],
                    staticClass: "cards-wrap"
                  },
                  [
                    _vm._l(_vm.multiPageData, function(item, index) {
                      return _c(
                        "el-card",
                        { key: index + "单选", staticClass: "card-item" },
                        [
                          _c(
                            "el-row",
                            { attrs: { gutter: 10 } },
                            [
                              _c(
                                "el-col",
                                { attrs: { span: 18 } },
                                [
                                  _c("el-checkbox", {
                                    attrs: { label: " " },
                                    on: {
                                      change: function($event) {
                                        return _vm.clickQuestion(item)
                                      }
                                    },
                                    model: {
                                      value: item.choosed,
                                      callback: function($$v) {
                                        _vm.$set(item, "choosed", $$v)
                                      },
                                      expression: "item.choosed"
                                    }
                                  }),
                                  _vm._v(
                                    _vm._s(item.content) + "\n              "
                                  ),
                                  item.type != 3
                                    ? _c(
                                        "ul",
                                        _vm._l(item.answerList, function(
                                          itemInner,
                                          indexInner
                                        ) {
                                          return _c(
                                            "li",
                                            { key: itemInner.id },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.returnLetter(indexInner)
                                                ) +
                                                  "、" +
                                                  _vm._s(itemInner.content)
                                              )
                                            ]
                                          )
                                        }),
                                        0
                                      )
                                    : _vm._e()
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                { staticClass: "img-wrap", attrs: { span: 6 } },
                                [
                                  !item.picture
                                    ? _c("div", { staticClass: "no-img-div" }, [
                                        _vm._v("暂无图片")
                                      ])
                                    : _c("img", {
                                        staticStyle: {
                                          height: "100px",
                                          width: "100px"
                                        },
                                        attrs: { src: item.picture, alt: "" }
                                      })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                {
                                  staticClass: "question-info",
                                  attrs: { span: 24 }
                                },
                                [
                                  _c("p", [
                                    _vm._v("题型:\n                "),
                                    item.type == 1
                                      ? _c("span", [_vm._v("单选题")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    item.type == 2
                                      ? _c("span", [_vm._v("多选题")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    item.type == 3
                                      ? _c("span", [_vm._v("简答题")])
                                      : _vm._e()
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("创建者: " + _vm._s(item.createName))
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("分值: " + _vm._s(item.score))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    [
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            type: "primary",
                                            size: "small"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.$router.push({
                                                name: "Question_Detail",
                                                params: { id: item.id }
                                              })
                                            }
                                          }
                                        },
                                        [_vm._v("查看解析")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            type: "danger",
                                            size: "small"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.removeQuestion(item)
                                            }
                                          }
                                        },
                                        [_vm._v("移除本题")]
                                      )
                                    ],
                                    1
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    _vm._v(" "),
                    _vm.multiPageData && _vm.multiPageData.length <= 0
                      ? _c("p", { staticClass: "no-data-text" }, [
                          _vm._v(" 暂无数据 ")
                        ])
                      : _vm._e()
                  ],
                  2
                ),
                _vm._v(" "),
                _c("el-pagination", {
                  attrs: {
                    "current-page": _vm.currentMultiPage,
                    "page-sizes": [5, 10, 20],
                    "page-size": _vm.currentMultiPerPage,
                    layout: "total, sizes, prev, pager, next, jumper",
                    total: _vm.totalMulti
                  },
                  on: {
                    "size-change": _vm.handleMultiSizeChange,
                    "current-change": _vm.handleMultiCurrentChange
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "question-type-item" },
              [
                _c("h4", { staticClass: "question-type-title" }, [
                  _vm._v("简答题")
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "loading",
                        rawName: "v-loading",
                        value: _vm.cardsLoading,
                        expression: "cardsLoading"
                      }
                    ],
                    staticClass: "cards-wrap"
                  },
                  [
                    _vm._l(_vm.answerPageData, function(item, index) {
                      return _c(
                        "el-card",
                        { key: index + "单选", staticClass: "card-item" },
                        [
                          _c(
                            "el-row",
                            { attrs: { gutter: 10 } },
                            [
                              _c(
                                "el-col",
                                { attrs: { span: 18 } },
                                [
                                  _c("el-checkbox", {
                                    attrs: { label: " " },
                                    on: {
                                      change: function($event) {
                                        return _vm.clickQuestion(item)
                                      }
                                    },
                                    model: {
                                      value: item.choosed,
                                      callback: function($$v) {
                                        _vm.$set(item, "choosed", $$v)
                                      },
                                      expression: "item.choosed"
                                    }
                                  }),
                                  _vm._v(
                                    _vm._s(item.content) + "\n              "
                                  ),
                                  _c("div")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                { staticClass: "img-wrap", attrs: { span: 6 } },
                                [
                                  !item.picture
                                    ? _c("div", { staticClass: "no-img-div" }, [
                                        _vm._v("暂无图片")
                                      ])
                                    : _c("img", {
                                        staticStyle: {
                                          height: "100px",
                                          width: "100px"
                                        },
                                        attrs: { src: item.picture, alt: "" }
                                      })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "el-col",
                                {
                                  staticClass: "question-info",
                                  attrs: { span: 24 }
                                },
                                [
                                  _c("p", [
                                    _vm._v("题型:\n                "),
                                    item.type == 1
                                      ? _c("span", [_vm._v("单选题")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    item.type == 2
                                      ? _c("span", [_vm._v("多选题")])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    item.type == 3
                                      ? _c("span", [_vm._v("简答题")])
                                      : _vm._e()
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("创建者: " + _vm._s(item.createName))
                                  ]),
                                  _vm._v(" "),
                                  _c("p", [
                                    _vm._v("分值: " + _vm._s(item.score))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    [
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            type: "primary",
                                            size: "small"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.$router.push({
                                                name: "Question_Detail",
                                                params: { id: item.id }
                                              })
                                            }
                                          }
                                        },
                                        [_vm._v("查看解析")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            type: "danger",
                                            size: "small"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.removeQuestion(item)
                                            }
                                          }
                                        },
                                        [_vm._v("移除本题")]
                                      )
                                    ],
                                    1
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    _vm._v(" "),
                    _vm.answerPageData && _vm.answerPageData.length <= 0
                      ? _c("p", { staticClass: "no-data-text" }, [
                          _vm._v(" 暂无数据 ")
                        ])
                      : _vm._e()
                  ],
                  2
                ),
                _vm._v(" "),
                _c("el-pagination", {
                  attrs: {
                    "current-page": _vm.currentAnswerPage,
                    "page-sizes": [1, 2, 3],
                    "page-size": _vm.currentAnswerPerPage,
                    layout: "total, sizes, prev, pager, next, jumper",
                    total: _vm.totalAnswer
                  },
                  on: {
                    "size-change": _vm.handleAnswerSizeChange,
                    "current-change": _vm.handleAnswerCurrentChange
                  }
                })
              ],
              1
            )
          ])
        : _c("div", { staticClass: "no-data-text" }, [
            _vm._v(" 试题篮中没有题目 ")
          ]),
      _vm._v(" "),
      _c("div", [
        _vm._v("\n    合计:\n    "),
        _c("p", [
          _vm._v("单选题: " + _vm._s(_vm.singleChoosedData.length) + " 道")
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v("多选题: " + _vm._s(_vm.multiChoosedData.length) + " 道")
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v("简答题: " + _vm._s(_vm.answerChoosedData.length) + " 道")
        ])
      ]),
      _vm._v(" "),
      _c(
        "el-button",
        {
          staticClass: "fill-width",
          attrs: { disabled: _vm.loading, type: "primary" },
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
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-62b2b94c", esExports)
  }
}

/***/ })

});