webpackJsonplensyn_ui([91],{

/***/ 1155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Integral_vue__ = __webpack_require__(1487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Integral_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Integral_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Integral_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Integral_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_54ece0f4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Integral_vue__ = __webpack_require__(1742);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1740)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Integral_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_54ece0f4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Integral_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/Integral.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54ece0f4", Component.options)
  } else {
    hotAPI.reload("data-v-54ece0f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1487:
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

exports.default = {
  computed: {
    /*
    * 总积分
    */
    scoreTotal: function scoreTotal() {
      // debugger
      var num = 0;
      $.each(this.scoreData, function (index, item) {
        num += parseInt(item.score);
      });
      return num;
    }
  },
  components: {},
  data: function data() {
    return {
      userData: JSON.parse(sessionStorage.getItem('userData')),
      orgId: 1, //暂定为1，后期可能会取消
      scoreData: [],
      elementPageData: { //分页需要的数据
        defaultData: this.$util.elementPagination,
        pageNum: this.$util.elementPagination.pageNumDefault,
        pageSize: this.$util.elementPagination.pageSizeDefault
      },
      historyData: { rows: [], total: 0 }
    };
  },
  mounted: function mounted() {
    this.getQueryScoreData();
    this.getQueryScoreHistoryData();
  },

  methods: {
    /*
    * 查询积分数据
    */
    getQueryScoreData: function getQueryScoreData() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/hr_user_score_count/score/count', "", function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.scoreData = responseData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/hr_user_score_count/score/count - 失败');
      });
    },

    /*
    * 查询积分历史记录
    */
    getQueryScoreHistoryData: function getQueryScoreHistoryData() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/hr_user_score/score/history', self._historyParams(), function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.historyData = responseData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/hr_user_score/score/history - 失败');
      });
    },

    /*
    * 历史记录参数
    */
    _historyParams: function _historyParams() {
      return {
        params: {
          pageNum: this.elementPageData.pageNum,
          pageSize: this.elementPageData.pageSize
        }
      };
    },

    /*
    * 改变当前页码触发此事件
    * @param {number} val 当前页码
    */
    handleCurrentChange: function handleCurrentChange(val) {
      this.elementPageData.pageNum = val;
      this.getQueryScoreHistoryData();
    },

    /*
    * 改变每页条数触发此事件
    * @param {number} val 当前数据
    */
    handleSizeChange: function handleSizeChange(val) {
      this.elementPageData.pageSize = val;
      this.getQueryScoreHistoryData();
    }
  }
};

/***/ }),

/***/ 1740:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1741);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("ccffdcb2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54ece0f4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Integral.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54ece0f4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Integral.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1741:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\ntr:nth-child(2n){ background: #FAFAFA;\n}\n.integral-table td{\n  padding: 14px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "personal-message content-manage personal-top" },
    [
      _c("div", { staticClass: "personal-wrapper" }, [
        _c("h1", { staticClass: "title marb20" }, [_vm._v("|| 积分列表")]),
        _vm._v(" "),
        _c(
          "table",
          {
            staticClass: "el-table thead integral-table",
            staticStyle: { width: "100%" }
          },
          [
            _c("thead", [
              _c(
                "tr",
                [
                  _vm._l(_vm.scoreData, function(itemKey, index) {
                    return _c("th", { staticClass: "is-leaf" }, [
                      _vm._v(_vm._s(itemKey.name))
                    ])
                  }),
                  _vm._v(" "),
                  _c("th", { staticClass: "is-leaf" }, [_vm._v("总计")])
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("tbody", [
              _c(
                "tr",
                [
                  _vm._l(_vm.scoreData, function(itemValue, index) {
                    return _c("td", { staticClass: "marl20" }, [
                      _vm._v(_vm._s(itemValue.score))
                    ])
                  }),
                  _vm._v(" "),
                  _c("td", { staticClass: "marl20" }, [
                    _vm._v(_vm._s(_vm.scoreTotal))
                  ])
                ],
                2
              )
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "personal-wrapper" },
        [
          _c("h1", { staticClass: "title" }, [_vm._v("|| 积分历史")]),
          _vm._v(" "),
          _c(
            "el-card",
            { staticClass: "box-card" },
            [
              _vm._l(_vm.historyData.rows, function(item, index) {
                return _c(
                  "div",
                  { key: index, staticClass: "text item padb20" },
                  [
                    _vm._v(
                      "\n           " + _vm._s(item.date) + "：\n           "
                    ),
                    item.fromType == 18
                      ? _c("span", [
                          _vm._v(
                            "“" +
                              _vm._s(item.typeName) +
                              "”，获得积分“" +
                              _vm._s(item.score) +
                              "”分。"
                          )
                        ])
                      : _c("span", [
                          _vm._v(
                            "\n            你对" +
                              _vm._s(item.typeName) +
                              " 《" +
                              _vm._s(item.name) +
                              "》进行了“" +
                              _vm._s(item.operation) +
                              "”的操作，并获得积分“" +
                              _vm._s(item.score) +
                              "”分。\n           "
                          )
                        ])
                  ]
                )
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "element-pagination-manage marb20" },
                [
                  _c("el-pagination", {
                    staticClass: "ce-pagination",
                    attrs: {
                      span: 24,
                      "current-page": _vm.currentPage4,
                      "page-sizes": _vm.elementPageData.defaultData.pageSizes,
                      "page-size":
                        _vm.elementPageData.defaultData.pageSizeDefault,
                      layout: "total, sizes, prev, pager, next, jumper",
                      total: _vm.historyData.total
                    },
                    on: {
                      "size-change": function($event) {
                        return _vm.handleSizeChange($event)
                      },
                      "current-change": function($event) {
                        return _vm.handleCurrentChange($event)
                      }
                    }
                  })
                ],
                1
              )
            ],
            2
          )
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-54ece0f4", esExports)
  }
}

/***/ })

});