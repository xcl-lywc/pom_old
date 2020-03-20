webpackJsonplensyn_ui([31],{

/***/ 1180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Study_vue__ = __webpack_require__(1519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Study_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Study_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Study_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Study_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_301e7c64_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Study_vue__ = __webpack_require__(1816);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1814)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-301e7c64"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Study_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_301e7c64_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Study_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/study/Study.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-301e7c64", Component.options)
  } else {
    hotAPI.reload("data-v-301e7c64", Component.options)
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

/***/ 1322:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyElEQVQ4jdXSMU4CQRjF8d8us5oYT8ARuIOhpzMklhZ4E49AaNZSGypPQbjAxoaY2EACFRWFRrIULMk6isa18nXz5vv+8/IySZ7nQ1xrpvuAG5w1BAxSvDdchm1AGZkbvB1ZyHBeO5chGnhFF09IorsSHUxxejBjQIZbLNGK46KNk7oZA1L0jsT/UjGA33XwCfAPO0irV5sqS1H8AVAE9HGBS1xFAzM84MXHH5vYdzIJWGBcGQfAHCPcYf1dhHqJKzzjEcMK/KN27Rkr6KTdqnIAAAAASUVORK5CYII="

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

/***/ 1338:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfklEQVQ4jXXTPUiWURgG4Ot7+wwkShoKKloaxBysoVwiqHBsaagIdTDQIWiKipZqbBAamr4oiMjBQakhys2hOcuGMPxEiiRqif7Iop/hPC+8nt5uOMO5n9/z3OdptFotNWhiD7ajA1/RxmKdY45hjEaCTRX+DZ5gHE9Lsqg4dOEe7uJgBK9gDqvYiVOYxZk8QYGbGKwkfIAjcY5hOfiNuIGhaoJRnKgEf8dlLOAjHuFOxV7gGroLbMbpbA6/8DPjVrP7Dpws0IO9mXEDzmNr3PeXLWc42sQWrK8xjmAA79GLzhqfXUUNWeIllqQZzEmK/IMmPuBHpYsZXMdzvAuugW5JkUuSpNBuRqVn6Mc8juNzVuiPpMgCXuN+FH9YRIu3w3Gb9In+hwYOYx3eYrKcwS1MSgOdxhXsjgCSKgcwhXPBXcSrchd+Y0zSfghXcRYv8E2Sc1/4fsEFTLB2mT5Ji/Q4kvXjUMW+Iu3BuKSKPEGJiXhOn/TbOqJqO84a/AXIZFAM73ZqkwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 1339:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ 1340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ 1347:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(1353);
var parse = __webpack_require__(1354);
var formats = __webpack_require__(1340);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1339);
var formats = __webpack_require__(1340);
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ 1354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1339);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 1519:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(188);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(440);

var _promise2 = _interopRequireDefault(_promise);

var _qs = __webpack_require__(1347);

var _qs2 = _interopRequireDefault(_qs);

var _Query_Tree_Selected = __webpack_require__(1323);

var _Query_Tree_Selected2 = _interopRequireDefault(_Query_Tree_Selected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      orgCode: sessionStorage.getItem("orgCode"),
      cardsLoading: false,
      detailLoading: false,
      studyDialogLoading: false,

      activeTab: 1, //tab对应的数据
      activeSpecial: null,
      specialListData: [], //左侧专题列表

      listData: [], //页面主体list
      currentPage: 1,
      currentPerPage: 5,
      total: null,

      studyDialogVisible: false,
      orgType: null, //当前组织的类型, 判定显示职能部门&支部 / 党员的checkbox-group的显示
      needValidate: true, //是否需要触发表单验证的标识, 在特殊情况下需要不触发验证, 使用此属性
      /* ----- 表单需要使用的数据 ---- */
      studyDateRange: null, //日期选择的数据
      funcListData: [], //职能部门
      funcData: [], //职能部门 选中的对象
      partListData: [], //支部
      partData: [], //支部 选中的对象
      memberData: [], //支部 选中的对象
      participantNull: false, //参与 是否全部为空
      needApprove: false, //书记审批 1需要 2不需要
      needSubReport: false, //思想汇报 1需要 2不需要
      addStatus: false, //当前处于添加专题的状态, 显示slecet, 隐藏添加按钮
      choosedSpecial: null, //学习教育中添加专题的数据
      specialsNull: false, //控制是否显示 提示为空字段
      studyForm: {
        beginTime: null,
        endTime: null,
        learnInfo: null,
        learnName: null,
        learnRequire: null,
        learnSpecials: [],
        learnType: 1, // 学习形式
        needApprove: 2, //书记审批 1需要 2不需要
        needSubReport: 2 //思想汇报 1需要 2不需要
      },
      rules: {
        learnName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        learnType: [{ required: true, message: '请输入描述', trigger: 'change' }],
        beginTime: [//开始和结束时间只需验证一个
        { required: true, message: '请选择时间', trigger: 'blur' }],
        learnSpecials: [{ required: true, message: '请添加至少一个专题', trigger: 'blur' }]
      },
      /* ----- 表单需要使用的数据 ---- */
      detailDialogVisible: false,
      detailData: {},
      tempDetailId: null,
      reviewData: {},
      reviewForm: { //评论表单
        commentContent: null,
        fromType: 6,
        fromId: null
      },

      resource: JSON.parse(sessionStorage.getItem('resource'))
    };
  },

  components: {
    "tree-selected": _Query_Tree_Selected2.default //人员下拉树
  },
  mounted: function mounted() {
    var _this = this;

    this.getSpecialList().then(function () {
      _this.getStudyListData(1, 5);
    });
    // 根据当前的组织类型type 查询不同的参与类型
    this.$request.requestAxios("get", basePath + "/party_orgs/" + sessionStorage.getItem("orgId") + "/partyorg", null, function (response) {
      _this.orgType = parseInt(response.data.data.type);
      if (_this.orgType == 1) {
        _this.getParticipantListData(parseInt(response.data.data.type), 1);
        _this.getParticipantListData(parseInt(response.data.data.type), 2);
      } else {
        _this.getParticipantListData(parseInt(response.data.data.type));
      }
    }, function (error) {
      _this.orgType = null;
    });
  },

  computed: {},
  watch: {
    // 监听form外部的属性, 根据获得的值写入form中, 并触发表单验证
    "studyDateRange": {
      handler: function handler(newV, oldV) {
        if (!newV) {
          this.studyForm.beginTime = null;
          this.studyForm.endTime = null;
        } else {
          this.studyForm.beginTime = newV[0];
          this.studyForm.endTime = newV[1];
        }
        if (this.needValidate) {
          this.$refs.studyForm.validateField("beginTime", function (errorMessage) {
            //验证未通过
            console.log(newV);
          });
        }
      },

      deep: false
    },
    "needApprove": {
      handler: function handler(newV) {
        newV ? this.studyForm.needApprove = 1 : this.studyForm.needApprove = 2;
      },

      deep: false
    },
    "needSubReport": {
      handler: function handler(newV) {
        newV ? this.studyForm.needSubReport = 1 : this.studyForm.needSubReport = 2;
      },

      deep: false
    }
  },
  methods: {
    /**
     * 获取左侧学习专题列表
     * @return {[type]} [description]
     */
    getSpecialList: function getSpecialList() {
      var _this2 = this;

      var self = this;

      var p = new _promise2.default(function (resolve, reject) {
        self.$request.requestAxios("get", basePath + "/t_task_special/learn_special/id_name/from_org/" + _this2.orgCode, null, function (response) {
          self.specialListData = response.data.data;
          if (response.data.data.length > 0) {
            self.activeSpecial = response.data.data[0].id;
          }

          resolve(self.activeSpecial);
        }, function (error) {
          reject("获取学习专题列表失败");
        });
      });

      return p;
    },

    /**
     * 点击顶部tabs 切换状态
     * @param  {[type]} tab   [description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    clickTab: function clickTab(tab, event) {
      this.activeTab = tab.name;
      this.getStudyListData();
    },

    /**
     * 点击左侧学习专题
     * @param  {[type]} specialId [description]
     * @return {[type]}           [description]
     */
    changeSpecial: function changeSpecial(specialId) {
      this.activeSpecial = specialId;
      this.getStudyListData(1, 5);
    },

    /**
     * 获取右侧 参与 列表
     * @param  {number} type 当前组织的类型
     * @param  {number} func 当前组织是否是职能部门
     * @return {[type]}      [description]
     */
    getParticipantListData: function getParticipantListData(type, func) {
      var self = this;
      var url = void 0;
      var data = {
        params: {
          id: parseInt(sessionStorage.getItem("orgId"))
        }
      };
      if (type == 1) {
        url = basePath + "/party_orgs/chidrens";
        data.params.function = func;
      } else {
        url = basePath + "/party_orgs/members";
      }

      self.$request.requestAxios("get", url, data, function (response) {
        if (func) {
          func == 1 ? self.funcListData = response.data.data : self.partListData = response.data.data;
        } else {
          self.memberListData = response.data.data;
        }
      }, function (error) {});
    },

    /**
     * 获取主体的学习教育列表
     * @return {[type]} [description]
     */
    getStudyListData: function getStudyListData(page, perPage) {
      var self = this;

      var search = _qs2.default.stringify({
        special: self.activeSpecial, //学习专题Id
        type: 2, // 固定为2
        orgId: parseInt(sessionStorage.getItem("orgId")),
        status: self.activeTab,
        pageSize: perPage || self.currentPerPage,
        pageNum: page || self.currentPage
      });

      self.$request.requestAxios("get", basePath + "/t_tasks/list/org?" + search, null, function (response) {
        self.listData = response.data.data.rows;
        self.total = response.data.data.total;
      }, function (error) {});
    },
    handleSizeChange: function handleSizeChange(val) {
      this.currentPerPage = val;
      this.getStudyListData();
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.currentPage = val;
      this.getStudyListData();
    },

    /**
     * 获取学习教育详情以及评论列表
     * @return {[type]} [description]
     */
    getStudyDetail: function getStudyDetail(studyId) {
      var _this3 = this;

      var self = this;
      // 查询基本信息
      self.tempDetailId = studyId;

      self.$request.requestAxios("get", basePath + "/t_task/learn/details/from_org/" + self.orgCode, { params: {
          id: studyId
        } }, function (response) {
        if (response.data.meta.code == 0) {
          self.detailData = response.data.data;
        } else {
          self.$message.error("获取详情失败");
        }
        _this3.detailDialogVisible = true;
      }, function (error) {
        self.$message.error("失败");
      });
      // 查询评论列表
      self.$request.requestAxios("get", basePath + "/t_tasks/review/list?fromId=" + studyId + "&fromType=6", null, function (response) {
        if (response.data.meta.code == 0) {
          self.reviewData = response.data.data.rows;
        } else {
          self.$message.error("获取评论失败");
        }
      }, function (error) {
        self.$message.error("失败");
      });
    },

    /**
     * 点击添加学习
     */
    addStudy: function addStudy() {
      this.studyDialogVisible = true;
      this.needValidate = true; //恢复需要验证的状态
    },

    /**
     * 模态框中点击确认添加, 添加一个学习专题, 添加成功时重置learnSpecials表单验证状态
     */
    addSpecial: function addSpecial() {
      var _this4 = this;

      var multiFlag = false; // 判断是否重复

      if (this.choosedSpecial) {
        this.studyForm.learnSpecials.forEach(function (item, index) {
          item.id == _this4.choosedSpecial.id ? multiFlag = true : "";
        });

        if (multiFlag) {
          this.$message.error("已有重复的专题");
        } else {
          this.studyForm.learnSpecials.push(this.choosedSpecial);
          this.addStatus = false;
          this.choosedSpecial = null;
          this.specialsNull = false;
        }
      } else {
        this.$message.error("请在下拉框中选择一个学习专题");
      }
    },

    /**
     * 删除学习专题
     * @param  {[type]} tag [description]
     * @return none
     */
    deleteSpecial: function deleteSpecial(tag) {
      this.studyForm.learnSpecials.splice(this.studyForm.learnSpecials.indexOf(tag), 1);
    },

    /**
     * 提交表单 根据不同的表单进行不同的逻辑处理
     * @param  {string} formName 表单的ref
     * @return none
     */
    submitForm: function submitForm(formName) {
      var _this5 = this;

      var self = this;

      if (formName == "studyForm") {
        // 提交学习教育的表单
        if (this.funcData.length == 0 && this.partData.length == 0 && this.memberData.length == 0) {
          self.participantNull = true;
        } else {
          self.participantNull = false;
        }

        if (self.studyForm.learnSpecials.length == 0) {
          self.specialsNull = true;
        } else {
          self.specialsNull = false;
        }

        self.$refs[formName].validate(function (valid) {
          if (valid) {
            if (_this5.funcData.length > 0 && _this5.partData.length > 0) {
              self.$message.error("职能部门和支部只能选择一种");
              return false;
            } else {
              if (!self.participantNull && !self.specialsNull) {
                self.studyDialogLoading = true;
                self.$request.requestAxios("post", basePath + "/t_task/learn/add/from_org/" + self.orgCode, self.handleFormData(), function (response) {
                  self.studyDialogVisible = false;
                  self.studyDialogLoading = false;
                  self.$message.success("成功");
                  self.getStudyListData(1, 5);
                }, function (error) {
                  self.studyDialogLoading = false;
                  self.$message.error(error.data.meta.message);
                });
              } else {
                self.$message.error("请检查必填项");
              }
            }
          } else {
            self.$message.error("请检查必填项");
            return false;
          }
        });
      } else {
        //提交评论的表单
        self.$refs[formName].validate(function (valid) {
          if (valid) {
            self[formName].fromId = self.tempDetailId;
            self.$request.requestAxios("post", basePath + "/t_tasks/review", self[formName], function (response) {
              if (response.data.meta.code === 0) {
                self.resetDetailForm();
                self.getStudyDetail(self.tempDetailId);
                self.$message.success("成功");
              } else {
                self.$message.error(response.data.meta.message);
              }
            }, function (error) {
              self.$message.error("失败");
            });
          } else {
            self.$message.error("请检查必填项");
            return false;
          }
        });
      }
    },

    /**
     * 处理表单数据, 并返回一个新的表单, 用于保存至后台
     * @return {[type]} [description]
     */
    handleFormData: function handleFormData() {
      var deepClone = JSON.parse((0, _stringify2.default)(this.studyForm));
      deepClone.learnSpecials = [];

      this.studyForm.learnSpecials.forEach(function (item, index) {
        deepClone.learnSpecials.push(item.id);
      });
      deepClone.createOrg = parseInt(sessionStorage.getItem("orgId"));

      if (this.orgType != 1) {
        deepClone.accounts = this.memberData;
      } else {
        this.funcData.length > 0 ? deepClone.orgIds = this.funcData : deepClone.orgIds = this.partData;
      }

      return deepClone;
    },

    /**
     * 添加学习教育关闭的回调, 还原表单和验证
     * @return {[type]} [description]
     */
    specialDialogClosed: function specialDialogClosed() {
      this.$refs["studyForm"].resetFields();
      this.needValidate = false; //关闭对话框,禁用验证,在清空数据时确保不触发多余的表单验证
      this.participantNull = false;
      this.specialsNull = false;
      this.studyDateRange = null;
      this.funcData = [];
      this.partData = [];
      this.memberData = [];
      this.needApprove = false;
      this.needSubReport = false;
      this.addStatus = false;
      this.choosedSpecial = null;
      this.studyForm = {
        beginTime: null,
        endTime: null,
        learnInfo: null,
        learnName: null,
        learnRequire: null,
        learnSpecials: [],
        learnType: 1,
        needApprove: 2,
        needSubReport: 2
      };
    },
    resetDetailForm: function resetDetailForm() {
      this.$refs["commentInput"].blur();
      this.$refs["reviewForm"].resetFields();
      this.reviewForm = { //评论表单
        commentContent: null,
        fromType: 6,
        fromId: null
      };
    },
    peopleTreeChanged: function peopleTreeChanged(data) {
      var self = this;
      console.log(data);
      self.memberData = data.map(function (item) {
        return item.id;
      });
      // switch (self.activeType) {
      //   case "talking":
      //     self.talkingForm.talkingList = data
      //     self.talkingListName = data.map((item) => {
      //       return item.name
      //     })
      //     break;
      //   case "beTalking":
      //     self.talkingForm.beTalkingList = data
      //     self.beTalkingListName = data.map((item) => {
      //       return item.name
      //     })
      //     break;
      //   case "talkingRecord":
      //     self.talkingForm.talkingRecord = data
      //     self.talkingRecordName = data.name
      //     break;
      //   default:
      //     break;
    }
  }
};

/***/ }),

/***/ 1814:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1815);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("01b4adbc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-301e7c64\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Study.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-301e7c64\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Study.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1815:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.container[data-v-301e7c64] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n.left-manage[data-v-301e7c64] {\n  padding: 10px 20px;\n  text-align: center;\n  color: #222222;\n  border-right: 1px solid #e6e6e6;\n  height: calc(100vh - 60px);\n  width: 186px;\n  background: #fff;\n}\n.left-manage ul[data-v-301e7c64]{\n  height: 90%;\n  overflow-y: auto;\n}\n.left-manage li.active[data-v-301e7c64] {\n  background: #ecedf1;\n}\n.left-manage li[data-v-301e7c64]{\n  line-height: 40px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 0 10px;\n  margin: 0;\n  text-align: left;\n}\n.right-manage[data-v-301e7c64]{\n  position: relative;\n  padding: 0 10px;\n  width: calc(100vw - 275px);\n  height: calc(100vh - 116px);\n  overflow-y: auto;\n  overflow-x: hidden;\n  background: #f5f6f8;\n}\n.add-study-button[data-v-301e7c64] {\n  position: absolute;\n  z-index: 999;\n  right: 60px;\n  top: 5px;\n  font-size: 22px;\n  color: #808080;\n  cursor: pointer;\n}\n.add-study-button .el-button[data-v-301e7c64] {\n  font-size: 20px;\n  border: none;\n  padding: 0;\n  color: #808080;\n}\n/*列表*/\n.card-item[data-v-301e7c64] {\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n.card-item[data-v-301e7c64]:hover {\n  box-shadow: 0 5px 15px #ccc;\n  border: 1px solid #eee;\n}\n.title-wrap[data-v-301e7c64],\n.deadline[data-v-301e7c64],\n.bottom-wrap[data-v-301e7c64] {\n  margin: 8px 0;\n}\n.title-wrap[data-v-301e7c64],\n.bottom-wrap[data-v-301e7c64] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.no-data-text[data-v-301e7c64] {\n  height: 60px;\n  line-height: 60px;\n  text-align: center;\n  color: #bbb;\n}\n.el-tag[data-v-301e7c64] {\n  margin-right: 10px;\n}\n.right-participant-list[data-v-301e7c64] {\n  padding: 0 20px;\n}\n.right-participant-list .participant-item-wrap[data-v-301e7c64] {\n  margin-bottom: 20px;\n}\n.validate-text[data-v-301e7c64] {\n  position: absolute;\n  margin-top: -18px;\n  font-size: 12px;\n  color: #f56c6c;\n}\n.right-participant-list .participant-label[data-v-301e7c64] {\n  font-size: 14px;\n  height: 32px;\n  line-height: 32px;\n  margin-bottom: 18px;\n}\n.right-participant-list .participant-item-wrap .participant-item-inner[data-v-301e7c64] {\n  padding: 1px;\n  min-height: 22px;\n  max-height: 110px;\n  overflow-y: auto;\n}\n.right-participant-list .participant-item-wrap .participant-item-inner .el-checkbox[data-v-301e7c64] {\n  width: 100%;\n  margin-left: 0;\n}\n.right-participant-list .participant-title[data-v-301e7c64] {\n  font-size: 14px;\n  font-weight: bold;\n}\n.no-checkbox-data[data-v-301e7c64] {\n  position: absolute;\n  margin-top: -20px;\n}\n.learn-special-tags[data-v-301e7c64] {\n  margin-bottom: 10px;\n}\n.add-special-button[data-v-301e7c64], .add-special-content[data-v-301e7c64] {\n}\n.detail-item-wrap[data-v-301e7c64] {\n  display: flex;\n  min-height: 32px;\n  margin-bottom: 10px;\n  flex-direction: row;\n  align-items: flex-start;\n}\n.detail-item-wrap .detail-item-label[data-v-301e7c64] {\n  display: inline-block;\n  width: 70px;\n  line-height: 32px;\n}\n.detail-item-wrap .detail-item-content[data-v-301e7c64] {\n  display: inline-block;\n  width: calc( 100% - 75px);\n  line-height: 32px;\n}\n.review-list-wrap[data-v-301e7c64] {\n  max-height: 283px;\n  overflow-y: auto;\n}\n.child-misson-wrap[data-v-301e7c64] {\n  text-align: center;\n  border: 1px solid #ccc;\n}\n.review-item-wrap[data-v-301e7c64] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  padding: 10px;\n  border-bottom: 1px solid #ccc;\n  border-left: 15px solid transparent;\n  border-right: 15px solid transparent;\n}\n.review-item-wrap[data-v-301e7c64]:last-child {\n  border-bottom: none;\n}\n.review-item-wrap div[data-v-301e7c64] {\n  width: calc(100% - 60px);\n}\n.input-button-group[data-v-301e7c64] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n", ""]);

// exports


/***/ }),

/***/ 1816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container", staticStyle: { width: "100vw" } },
    [
      _c("div", { staticClass: "left-manage" }, [
        _c(
          "ul",
          _vm._l(_vm.specialListData, function(item, index) {
            return _c(
              "a",
              {
                attrs: { href: "javascript:void(0);" },
                on: {
                  click: function($event) {
                    return _vm.changeSpecial(item.id)
                  }
                }
              },
              [
                _c(
                  "li",
                  {
                    staticClass: "special-item",
                    class: { active: _vm.activeSpecial == item.id },
                    attrs: { title: item.name }
                  },
                  [_vm._v(" " + _vm._s(item.name))]
                )
              ]
            )
          }),
          0
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "right-manage" },
        [
          _c(
            "div",
            { staticClass: "add-study-button" },
            [
              _c("el-button", {
                attrs: {
                  disabled: _vm.resource.indexOf(28) == -1,
                  icon: "el-icon-circle-plus-outline",
                  circle: ""
                },
                on: { click: _vm.addStudy }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-tabs",
            {
              on: { "tab-click": _vm.clickTab },
              model: {
                value: _vm.activeTab,
                callback: function($$v) {
                  _vm.activeTab = $$v
                },
                expression: "activeTab"
              }
            },
            [
              _c("el-tab-pane", { attrs: { label: "未完成的", name: 1 } }),
              _vm._v(" "),
              _c("el-tab-pane", { attrs: { label: "已完成的", name: 2 } }),
              _vm._v(" "),
              _c("el-tab-pane", { attrs: { label: "我执行的", name: 3 } }),
              _vm._v(" "),
              _c("el-tab-pane", { attrs: { label: "我发出的", name: 4 } }),
              _vm._v(" "),
              _c("el-tab-pane", { attrs: { label: "抄送我的", name: 5 } })
            ],
            1
          ),
          _vm._v(" "),
          _vm.listData && _vm.listData.length > 0
            ? _c(
                "div",
                {
                  directives: [
                    {
                      name: "loading",
                      rawName: "v-loading",
                      value: _vm.cardsLoading,
                      expression: "cardsLoading"
                    }
                  ]
                },
                _vm._l(_vm.listData, function(item, index) {
                  return _c(
                    "el-card",
                    {
                      key: "item" + index,
                      staticClass: "card-item",
                      nativeOn: {
                        click: function($event) {
                          return _vm.getStudyDetail(item.id)
                        }
                      }
                    },
                    [
                      _c("p", { staticClass: "title-wrap" }, [
                        _c("span", [_vm._v(_vm._s(item.taskName))]),
                        _c("span", { staticClass: "right-date-time" }, [
                          _vm._v(
                            "创建时间: " +
                              _vm._s(
                                _vm.$util._convertDate(
                                  item.createTime,
                                  "yyyy-MM-dd"
                                )
                              )
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "deadline" }, [
                        _vm._v(
                          "截止时间: " +
                            _vm._s(
                              _vm.$util._convertDate(item.endTime, "yyyy-MM-dd")
                            )
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "bottom-wrap" }, [
                        _c("div", { staticClass: "complete-people" }, [
                          _c("img", {
                            staticClass: "marr5",
                            attrs: {
                              src: __webpack_require__(1338)
                            }
                          }),
                          _vm._v(" "),
                          item.allTask == 0 || item.finishs == item.allTask
                            ? _c("span", [_vm._v("全部已完成")])
                            : _c("span", [
                                _vm._v(
                                  _vm._s(item.finishs) +
                                    "/" +
                                    _vm._s(item.allTask) +
                                    "已完成"
                                )
                              ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "comment-count" }, [
                          _c("img", {
                            staticClass: "marr5",
                            attrs: {
                              src: __webpack_require__(1322)
                            }
                          }),
                          _vm._v(_vm._s(item.reviewVo.total))
                        ])
                      ])
                    ]
                  )
                }),
                1
              )
            : _c("p", { staticClass: "no-data-text" }, [_vm._v("暂无数据")]),
          _vm._v(" "),
          _c("el-pagination", {
            attrs: {
              "current-page": _vm.currentPage,
              "page-sizes": [5, 10, 20],
              "page-size": _vm.currentPerPage,
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "添加",
            visible: _vm.studyDialogVisible,
            "close-on-click-modal": false,
            width: "60vw"
          },
          on: {
            "update:visible": function($event) {
              _vm.studyDialogVisible = $event
            },
            close: _vm.specialDialogClosed
          }
        },
        [
          _c(
            "el-row",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.studyDialogLoading,
                  expression: "studyDialogLoading"
                }
              ]
            },
            [
              _c(
                "el-form",
                {
                  ref: "studyForm",
                  attrs: {
                    model: _vm.studyForm,
                    rules: _vm.rules,
                    "label-width": "80px",
                    size: "small"
                  }
                },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 14 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "标题", prop: "learnName" } },
                        [
                          _c("el-input", {
                            attrs: { type: "text" },
                            model: {
                              value: _vm.studyForm.learnName,
                              callback: function($$v) {
                                _vm.$set(_vm.studyForm, "learnName", $$v)
                              },
                              expression: "studyForm.learnName"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "形式", prop: "learnType" } },
                        [
                          _c(
                            "el-select",
                            {
                              staticClass: "fill-width",
                              attrs: { type: "text" },
                              model: {
                                value: _vm.studyForm.learnType,
                                callback: function($$v) {
                                  _vm.$set(_vm.studyForm, "learnType", $$v)
                                },
                                expression: "studyForm.learnType"
                              }
                            },
                            [
                              _c("el-option", {
                                attrs: { value: 1, label: "集中学习" }
                              }),
                              _vm._v(" "),
                              _c("el-option", {
                                attrs: { value: 2, label: "自主学习" }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "时间", prop: "beginTime" } },
                        [
                          _c("el-date-picker", {
                            staticStyle: { width: "100%" },
                            attrs: {
                              type: "daterange",
                              "value-format": "timestamp",
                              editable: false,
                              "range-separator": "至",
                              "start-placeholder": "开始日期",
                              "end-placeholder": "结束日期"
                            },
                            model: {
                              value: _vm.studyDateRange,
                              callback: function($$v) {
                                _vm.studyDateRange = $$v
                              },
                              expression: "studyDateRange"
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
                    "el-col",
                    {
                      staticClass: "right-participant-list",
                      attrs: { span: 10 }
                    },
                    [
                      _c("p", { staticClass: "participant-label" }, [
                        _vm._v("参与: ")
                      ]),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.participantNull,
                              expression: "participantNull"
                            }
                          ],
                          staticClass: "validate-text"
                        },
                        [_vm._v("请选择参与的 组织/角色 ")]
                      ),
                      _vm._v(" "),
                      _vm.orgType == 1
                        ? _c(
                            "div",
                            { staticClass: "participant-item-wrap" },
                            [
                              _c("p", { staticClass: "participant-title" }, [
                                _vm._v("职能部门")
                              ]),
                              _vm._v(" "),
                              _c(
                                "el-checkbox-group",
                                {
                                  staticClass: "participant-item-inner",
                                  attrs: { size: "small" },
                                  model: {
                                    value: _vm.funcData,
                                    callback: function($$v) {
                                      _vm.funcData = $$v
                                    },
                                    expression: "funcData"
                                  }
                                },
                                _vm._l(_vm.funcListData, function(item) {
                                  return _c(
                                    "el-checkbox",
                                    { key: item.id, attrs: { label: item.id } },
                                    [_vm._v(_vm._s(item.name))]
                                  )
                                }),
                                1
                              ),
                              _vm._v(" "),
                              _vm.funcListData && _vm.funcListData.length == 0
                                ? _c(
                                    "div",
                                    { staticClass: "no-checkbox-data" },
                                    [_vm._v("暂无数据")]
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.orgType == 1
                        ? _c(
                            "div",
                            { staticClass: "participant-item-wrap" },
                            [
                              _c("p", { staticClass: "participant-title" }, [
                                _vm._v("支部")
                              ]),
                              _vm._v(" "),
                              _vm.partListData && _vm.partListData.length != 0
                                ? _c(
                                    "el-checkbox-group",
                                    {
                                      staticClass: "participant-item-inner",
                                      attrs: { size: "small" },
                                      model: {
                                        value: _vm.partData,
                                        callback: function($$v) {
                                          _vm.partData = $$v
                                        },
                                        expression: "partData"
                                      }
                                    },
                                    [
                                      _vm._l(_vm.partListData, function(item) {
                                        return _c(
                                          "el-checkbox",
                                          {
                                            key: item.id,
                                            attrs: { label: item.id }
                                          },
                                          [_vm._v(_vm._s(item.name))]
                                        )
                                      }),
                                      _vm._v(" "),
                                      _vm.partListData &&
                                      _vm.partListData.length == 0
                                        ? _c(
                                            "div",
                                            { staticClass: "no-checkbox-data" },
                                            [_vm._v("暂无数据")]
                                          )
                                        : _vm._e()
                                    ],
                                    2
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.orgType != 1
                        ? _c(
                            "div",
                            { staticClass: "participant-item-wrap" },
                            [
                              _c("p", { staticClass: "participant-title" }, [
                                _vm._v("党员")
                              ]),
                              _vm._v(" "),
                              _c("tree-selected", {
                                attrs: {
                                  selectionType: "checked",
                                  pageType: "org"
                                },
                                on: { treeCheckedData: _vm.peopleTreeChanged }
                              })
                            ],
                            1
                          )
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 24 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "介绍" } },
                        [
                          _c("el-input", {
                            attrs: {
                              type: "textarea",
                              placeholder: "请输入介绍内容"
                            },
                            model: {
                              value: _vm.studyForm.learnInfo,
                              callback: function($$v) {
                                _vm.$set(_vm.studyForm, "learnInfo", $$v)
                              },
                              expression: "studyForm.learnInfo"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "学习要求" } },
                        [
                          _c("el-input", {
                            attrs: {
                              type: "textarea",
                              placeholder: "请输入学习要求"
                            },
                            model: {
                              value: _vm.studyForm.learnRequire,
                              callback: function($$v) {
                                _vm.$set(_vm.studyForm, "learnRequire", $$v)
                              },
                              expression: "studyForm.learnRequire"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c("el-checkbox", {
                            attrs: { label: "书记审批", border: "" },
                            model: {
                              value: _vm.needApprove,
                              callback: function($$v) {
                                _vm.needApprove = $$v
                              },
                              expression: "needApprove"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-checkbox", {
                            attrs: { label: "思想汇报", border: "" },
                            model: {
                              value: _vm.needSubReport,
                              callback: function($$v) {
                                _vm.needSubReport = $$v
                              },
                              expression: "needSubReport"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "学习专题", required: "" } },
                        [
                          _vm.studyForm.learnSpecials &&
                          _vm.studyForm.learnSpecials.length > 0
                            ? _c(
                                "div",
                                _vm._l(_vm.studyForm.learnSpecials, function(
                                  tag
                                ) {
                                  return _c(
                                    "el-tag",
                                    {
                                      key: tag.name,
                                      staticClass: "learn-special-tags",
                                      attrs: { closable: "" },
                                      on: {
                                        close: function($event) {
                                          return _vm.deleteSpecial(tag)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(tag.name) +
                                          "\n              "
                                      )
                                    ]
                                  )
                                }),
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.addStatus
                            ? _c(
                                "div",
                                [
                                  _c(
                                    "el-button",
                                    {
                                      staticClass: "add-special-button",
                                      attrs: { type: "primary", size: "small" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.addStatus = true),
                                            (_vm.choosedSpecial = null)
                                        }
                                      }
                                    },
                                    [_vm._v("添加专题 + ")]
                                  )
                                ],
                                1
                              )
                            : _c(
                                "div",
                                { staticClass: "add-special-content" },
                                [
                                  _c(
                                    "el-select",
                                    {
                                      ref: "learnSpecialSelect",
                                      attrs: { "value-key": "id" },
                                      model: {
                                        value: _vm.choosedSpecial,
                                        callback: function($$v) {
                                          _vm.choosedSpecial = $$v
                                        },
                                        expression: "choosedSpecial"
                                      }
                                    },
                                    _vm._l(_vm.specialListData, function(
                                      item,
                                      index
                                    ) {
                                      return _c("el-option", {
                                        key: "select列表的" + index,
                                        attrs: { label: item.name, value: item }
                                      })
                                    }),
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", size: "small" },
                                      on: { click: _vm.addSpecial }
                                    },
                                    [_vm._v("确认添加")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "default", size: "small" },
                                      on: {
                                        click: function($event) {
                                          ;(_vm.addStatus = false),
                                            (_vm.choosedSpecial = null)
                                        }
                                      }
                                    },
                                    [_vm._v("取消")]
                                  )
                                ],
                                1
                              ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.specialsNull,
                                  expression: "specialsNull"
                                }
                              ],
                              staticClass: "validate-text",
                              staticStyle: { "margin-top": "0" }
                            },
                            [_vm._v("请至少添加一个专题")]
                          )
                        ]
                      )
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
            "div",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    type: "primary",
                    disabled: _vm.addStatus || _vm.studyDialogLoading
                  },
                  on: {
                    click: function($event) {
                      return _vm.submitForm("studyForm")
                    }
                  }
                },
                [_vm._v("确认")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "default" },
                  on: {
                    click: function($event) {
                      _vm.studyDialogVisible = false
                    }
                  }
                },
                [_vm._v("取消")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.detailLoading,
              expression: "detailLoading"
            }
          ],
          attrs: {
            title: "学习教育",
            visible: _vm.detailDialogVisible,
            "close-on-click-modal": false,
            width: "60vw"
          },
          on: {
            "update:visible": function($event) {
              _vm.detailDialogVisible = $event
            },
            close: _vm.resetDetailForm
          }
        },
        [
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("标题: ")
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "detail-item-content" }, [
              _vm._v(_vm._s(_vm.detailData.learnName))
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("形式: ")
            ]),
            _vm._v(" "),
            _vm.detailData.learnType == 0
              ? _c("span", { staticClass: "detail-item-content" }, [
                  _vm._v("自主选择")
                ])
              : _vm.detailData.learnType == 1
              ? _c("span", { staticClass: "detail-item-content" }, [
                  _vm._v("集中学习")
                ])
              : _c("span", { staticClass: "detail-item-content" }, [
                  _vm._v("自主学习")
                ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("描述: ")
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "detail-item-content" }, [
              _vm._v(_vm._s(_vm.detailData.learnInfo))
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("要求: ")
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "detail-item-content" }, [
              _vm._v(_vm._s(_vm.detailData.learnRequire))
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("时间: ")
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "detail-item-content" }, [
              _vm._v(
                _vm._s(
                  _vm.$util._convertDate(_vm.detailData.beginTime, "yyyy-MM-dd")
                ) +
                  " 至 " +
                  _vm._s(
                    _vm.$util._convertDate(_vm.detailData.endTime, "yyyy-MM-dd")
                  )
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("专题: ")
            ]),
            _vm._v(" "),
            _c(
              "span",
              { staticClass: "detail-item-content" },
              _vm._l(_vm.detailData.learnSpecials, function(tag) {
                return _c("el-tag", { key: tag.name }, [
                  _vm._v("\n          " + _vm._s(tag.name) + "\n        ")
                ])
              }),
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-item-wrap" }, [
            _c("span", { staticClass: "detail-item-label" }, [
              _vm._v("子任务: ")
            ]),
            _vm._v(" "),
            _vm.detailData.tasks && _vm.detailData.tasks.length > 0
              ? _c(
                  "span",
                  { staticClass: "detail-item-content" },
                  _vm._l(_vm.detailData.tasks, function(item) {
                    return _c(
                      "div",
                      {
                        key: "子任务" + item.id,
                        staticClass: "child-misson-wrap"
                      },
                      [
                        _c("span", [
                          _vm._v(
                            _vm._s(item.name) +
                              " -- " +
                              _vm._s(item.state) +
                              " : " +
                              _vm._s(item.processName)
                          )
                        ])
                      ]
                    )
                  }),
                  0
                )
              : _c(
                  "span",
                  { staticClass: "detail-item-content child-misson-wrap" },
                  [_vm._v("暂无子任务")]
                )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "review-list-wrap" },
            [
              _vm._l(_vm.reviewData, function(item, index) {
                return _c(
                  "div",
                  { key: "评论" + index, staticClass: "review-item-wrap" },
                  [
                    _c("img", {
                      staticStyle: { width: "50px", height: "50px" },
                      attrs: { src: item.picture }
                    }),
                    _vm._v(" "),
                    _c("div", [
                      _c("p", [
                        _vm._v(
                          _vm._s(item.creator) +
                            " " +
                            _vm._s(
                              _vm.$util._convertDate(
                                item.createTime,
                                "yyyy-MM-dd"
                              )
                            )
                        )
                      ]),
                      _vm._v(" "),
                      _c("p", [_vm._v(_vm._s(item.commentContent))])
                    ])
                  ]
                )
              }),
              _vm._v(" "),
              _vm.reviewData && _vm.reviewData.length == 0
                ? _c("div", { staticClass: "no-data-text" }, [
                    _vm._v("暂无评论")
                  ])
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-form",
                {
                  ref: "reviewForm",
                  attrs: { model: _vm.reviewForm, size: "small" },
                  nativeOn: {
                    submit: function($event) {
                      $event.preventDefault()
                    }
                  }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        prop: "commentContent",
                        rules: [
                          {
                            required: true,
                            message: "请输入评论内容",
                            trigger: ""
                          }
                        ]
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "input-button-group" },
                        [
                          _c("el-input", {
                            ref: "commentInput",
                            attrs: { type: "text" },
                            nativeOn: {
                              keyup: function($event) {
                                if (
                                  !$event.type.indexOf("key") &&
                                  _vm._k(
                                    $event.keyCode,
                                    "enter",
                                    13,
                                    $event.key,
                                    "Enter"
                                  )
                                ) {
                                  return null
                                }
                                return _vm.submitForm("reviewForm")
                              }
                            },
                            model: {
                              value: _vm.reviewForm.commentContent,
                              callback: function($$v) {
                                _vm.$set(_vm.reviewForm, "commentContent", $$v)
                              },
                              expression: "reviewForm.commentContent"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary" },
                              on: {
                                click: function($event) {
                                  return _vm.submitForm("reviewForm")
                                }
                              }
                            },
                            [_vm._v("发送")]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-301e7c64", esExports)
  }
}

/***/ })

});