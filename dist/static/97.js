webpackJsonplensyn_ui([97],{

/***/ 1118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Page_vue__ = __webpack_require__(1434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Page_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Page_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Page_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Page_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0101d6c0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Page_vue__ = __webpack_require__(1601);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Page_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0101d6c0_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Page_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/home/Page.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0101d6c0", Component.options)
  } else {
    hotAPI.reload("data-v-0101d6c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(439);

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__(188);

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__(1599);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      dataBlockJson: null, //框架的数据,
      userData: JSON.parse(sessionStorage.getItem('userData')), //框架的数据,
      loading: true //页面加载
    };
  },
  mounted: function mounted() {
    console.log(this.$store.state.orgCode);
    this.getQueryBlockData();
  },
  destoryed: function destoryed() {},

  methods: {
    /**
     * 点击 更多 记录分类信息
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    moreButtonClicked: function moreButtonClicked(item) {
      sessionStorage.setItem("typeName", item.atName);
      sessionStorage.setItem("typeName", item.atId);
      this.$router.push({ name: 'News_List', params: { object: (0, _stringify2.default)({ atType: item.atType, atId: item.atId, atName: item.atName }) } });
    },


    /*
    * 查询首页块块
    * @param {{ String }} typeId 查询ID
    */
    getQueryBlockData: function getQueryBlockData() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/home/data/from_org/' + this.$store.state.currentPartyOrg.code, { params: "" }, function (respose) {
        // 请求成功回调函数...
        var resposeData = respose.data;
        self.dataBlockJson = resposeData.data;
        self._covertNewsData();
        self.loading = false;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/home/data - 失败');
        self.loading = false;
      });
    },

    /*
    * 组装新闻数据-文章列表查询
    */
    _covertNewsData: function _covertNewsData() {
      var self = this;
      $.each(self.dataBlockJson, function (index, item) {
        if (item.type == 'news') {
          self.$request.requestAxios('get', basePath + '/a_info/article/list/from_org/' + self.$store.state.currentPartyOrg.code, self._newsParams(item.atId), function (respose) {
            // 请求成功回调函数...
            var resposeData = respose.data;
            item['newsData' + index] = resposeData.data;
            // -------------------------- 避免页面监听不到数据变化 -----------------------
            self.dataBlockJson = (0, _assign2.default)({}, self.dataBlockJson, self.dataBlockJson);
          }, function (error, status) {
            // 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/a_info/article/list - 失败');
          });
        }
      });
    },
    _newsParams: function _newsParams(atId) {
      return {
        params: {
          type: atId,
          pageSize: 7,
          pageNum: 1
        }
      };
    },

    /*
    * 时间转换
    * @param {string} timeStamp 时间戳
    * @return time 返回转换后的时间
    */
    _dataCovert: function _dataCovert(timeStamp) {
      return new Date(timeStamp).Format('yyyy-MM-dd');
    },

    /*
    * 单个类型数据转换为string类型
    * @param {object} itemData 类型数据
    * @return itemData 返回转换后的时间
    */
    _convertParams: function _convertParams(itemData) {
      return (0, _stringify2.default)(itemData);
    },

    /*
    * 根据类别判断布局格式
    */
    number: function number(type) {
      return type == 'news' ? 8 : 16;
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

/***/ }),

/***/ 1599:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1600);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(143)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!./home.less", function() {
			var newContent = require("!!../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!./home.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1600:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1601:
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
      staticClass: "row pad-l20 pad-r20 mr-t5",
      staticStyle: { "min-height": "100px", width: "100%" }
    },
    [
      _c(
        "el-row",
        _vm._l(_vm.dataBlockJson, function(item, index) {
          return _c(
            "el-col",
            { key: index, attrs: { span: _vm.number(item.type) } },
            [
              _c("div", { staticClass: "mar15 grid-content bg-purple-dark" }, [
                item.type == "swiper"
                  ? _c("div", [
                      _c(
                        "div",
                        { staticClass: "block cu-border" },
                        [
                          _c(
                            "el-carousel",
                            { staticClass: "banner-wrapper" },
                            _vm._l(item.swiperData, function(itemImg) {
                              return _c("el-carousel-item", { key: itemImg }, [
                                _c(
                                  "a",
                                  {
                                    staticClass: "banner-wrapper-innter",
                                    attrs: {
                                      href: itemImg.link,
                                      target: "_blank"
                                    }
                                  },
                                  [
                                    _c("img", {
                                      attrs: { src: itemImg.imgUrl }
                                    }),
                                    _vm._v(" "),
                                    _c("p", [_vm._v(_vm._s(itemImg.title))])
                                  ]
                                )
                              ])
                            }),
                            1
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                item.type == "news"
                  ? _c("div", [
                      _c("div", { staticClass: "cu-box-wrap" }, [
                        _c("h1", [
                          _c("span", { staticClass: "fl" }, [
                            _vm._v(_vm._s(item.atName))
                          ]),
                          _c(
                            "a",
                            {
                              staticClass: "fr more",
                              attrs: { href: "javascript:void(0)" },
                              on: {
                                click: function($event) {
                                  return _vm.moreButtonClicked(item)
                                }
                              }
                            },
                            [_vm._v("更多>")]
                          )
                        ]),
                        _vm._v(" "),
                        item.hasOwnProperty("newsData" + index)
                          ? _c(
                              "ul",
                              { staticClass: "cu-border " },
                              _vm._l(item["newsData" + index].rows, function(
                                newItem
                              ) {
                                return item["newsData" + index].hasOwnProperty(
                                  "rows"
                                )
                                  ? _c(
                                      "li",
                                      { key: newItem },
                                      [
                                        _c(
                                          "router-link",
                                          {
                                            attrs: {
                                              to: {
                                                name: "News_Detail",
                                                params: { id: newItem.id }
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "span",
                                              { staticClass: "fl text" },
                                              [
                                                _vm._v(
                                                  _vm._s(newItem.articleName)
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c("span", { staticClass: "fr" }, [
                                              _vm._v(
                                                _vm._s(
                                                  _vm._dataCovert(
                                                    newItem.createTime
                                                  )
                                                )
                                              )
                                            ])
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  : _vm._e()
                              }),
                              0
                            )
                          : _vm._e()
                      ])
                    ])
                  : _vm._e()
              ])
            ]
          )
        }),
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0101d6c0", esExports)
  }
}

/***/ })

});