webpackJsonplensyn_ui([58],{

/***/ 1144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__ = __webpack_require__(1475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0aed2fc5_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__ = __webpack_require__(1725);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1719)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0aed2fc5"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0aed2fc5_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/organization/companyManageComponents/Detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0aed2fc5", Component.options)
  } else {
    hotAPI.reload("data-v-0aed2fc5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PeopleDetail = __webpack_require__(1721);

var _PeopleDetail2 = _interopRequireDefault(_PeopleDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {};
  },

  components: {
    "people-detail": _PeopleDetail2.default
  },
  mounted: function mounted() {},

  methods: {
    goBack: function goBack() {
      window.history.back();
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

/***/ }),

/***/ 1476:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(188);

var _stringify2 = _interopRequireDefault(_stringify);

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
//
//
//
//
//
//
//
//
//
//
//
//
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
      userData: JSON.parse(sessionStorage.getItem('userData')),
      orgId: 1, //暂定为1，后期可能会取消
      infoDialogVisible: false,
      peopleForm: {},
      detailForm: {},

      // 字典对照表数据, 从后台获取
      dictionaryGender: {},
      dictionaryNation: {},
      dictionaryEducation: {},
      dictionaryOutlook: {},

      relationsData: { //用户的社会关系列表
        relationsData1: []
      },
      experienceData: { //用户的个人学历详情列表
        experienceData1: [],
        experienceData2: [],
        experienceData3: [],
        experienceData4: [],
        experienceData5: [],
        experienceData6: [],
        experienceData7: []
      },
      archivesesData: { //用户的个人荣誉列表
        archivesesData1: [],
        archivesesData2: [],
        archivesesData3: [],
        archivesesData4: [],
        archivesesData5: []
      },
      // typeData:{
      //   relations:  [1], //人际关系
      //   experience: [1,2,3,4,5,6,7], //工作经历，学习经历，培训经历，团组织职务经历，党政职务经历，工会组织职务经历，党组织内职务经历
      //   archiveses: [1,2,3,4,5], //个人荣誉，技术职务，学历，学位，职业资格证书
      // },
      typeTextData: {
        relations: ["人际关系"],
        experience: ["工作经历", "学习经历", "培训经历", "团组织职务经历", "党政职务经历", "工会组织职务经历", "党组织内职务经历"],
        archiveses: ["个人荣誉", "技术职务", "学历", "学位", "职业资格证书"]
      }
    };
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },
  mounted: function mounted() {
    this.getDictionaryData();
    this.getQueryUserDetail();

    this.getQueryRelationship();
    this.getQueryExperience();
    this.getQueryArchiveses();
  },

  methods: {
    /*
     * 查询用户信息
     */
    getQueryUserDetail: function getQueryUserDetail() {
      var self = this;

      self.$request.requestAxios('get', basePath + '/hr_users/info/' + self.id + '/forUser/1_1', "", function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.detailForm = responseData.data;
        self.detailForm.messageId = "personalMessage";
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/hr_users/info/' + self.id + '/forUser/1_1 - 失败');
      });
    },

    /**
     * 点击编辑, 写入当前的人员数据
     * @param  {object} tableItem 当前点击表格对应的对象
     * @return none
     */
    editPeople: function editPeople() {
      this.infoDialogVisible = true;
      var editForm = JSON.parse((0, _stringify2.default)(this.detailForm));
    },

    /**
     * 获取字典表数据
     * @return {[type]} [description]
     */
    getDictionaryData: function getDictionaryData() {
      var self = this;

      var config = {
        url: basePath + "/contrast/all_contrast_info",
        method: "get"
      };

      self.$request.requestAxios(config.method, config.url, null, function (response) {
        response.data.data.forEach(function (item) {
          switch (item.id) {
            case 1:
              self.dictionaryGender = item.list;
              break;
            case 2:
              self.dictionaryNation = item.list;
              break;
            case 3:
              self.dictionaryEducation = item.list;
              break;
            case 6:
              self.dictionaryOutlook = item.list;
              break;
            case 17:
              self.techPositionList = item.list;
          }
        });
      }, function (error) {
        self.$message.error("获取数据对照表失败, 部分功能无法使用");
      });
    },

    /**
     * 转化对应字典表的数据, 数字 > 文字
     * @param  {string} type  所需要转化的字典表名
     * @param  {number} value 所需要转化的数据
     * @return {string}       值对应的字典表名称
     */
    dictionaryTransfer: function dictionaryTransfer(type, value) {
      var self = this;
      var target = {};
      switch (type) {
        case "gender":
          target = self.dictionaryGender;
          break;
        case "nation":
          target = self.dictionaryNation;
          break;
        case "education":
          target = self.dictionaryEducation;
          break;
        case "outlook":
          target = self.dictionaryOutlook;
          break;
      }

      for (var item in target) {
        if (target[item].key == value) {
          return target[item].value;
        }
      }
    },

    /*
    * 查询用户人际关系
    */
    getQueryRelationship: function getQueryRelationship() {
      var _this = this;

      this.typeTextData.relations.forEach(function (typeId, index) {
        _this._getQueryUserManage('/relations/forType/forUser/' + _this.orgId + '_' + _this.userData.userId, 'relationsData', index + 1);
      });
    },

    /*
    * 查询用户相关经历
    */
    getQueryExperience: function getQueryExperience() {
      var _this2 = this;

      this.typeTextData.experience.forEach(function (typeId, index) {
        _this2._getQueryUserManage('/experience/forType/forUser/' + _this2.orgId + '_' + _this2.userData.userId, 'experienceData', index + 1);
      });
    },

    /*
    * 查询用户获得相关荣誉
    */
    getQueryArchiveses: function getQueryArchiveses() {
      var _this3 = this;

      this.typeTextData.archiveses.forEach(function (typeId, index) {
        _this3._getQueryUserManage('/archiveses/forType/forUser/' + _this3.orgId + '_' + _this3.userData.userId, 'archivesesData', index + 1);
      });
    },

    /*
    * 合并查询列表数据函数
    * @params { string } url 请求地址 
    * @params { string } receiveDataName 接收数据的变量
    * @params { string/number } typeId 类型Id
    */
    _getQueryUserManage: function _getQueryUserManage(url, receiveDataName, typeId) {
      var self = this;
      self.$request.requestAxios('get', basePath + url, { params: { typeId: typeId } }, function (response) {
        //请求成功的回调...
        var responseData = response.data;
        console.log(responseData);
        self[receiveDataName][receiveDataName + typeId] = responseData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error(url + ' - 失败');
      });
    }
  }
};

/***/ }),

/***/ 1719:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1720);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("58bef936", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0aed2fc5\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0aed2fc5\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1720:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.back-button[data-v-0aed2fc5] {\n  margin: 15px 0 15px 15px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_PeopleDetail_vue__ = __webpack_require__(1476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_PeopleDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_PeopleDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_PeopleDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_PeopleDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6fbf12f6_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_PeopleDetail_vue__ = __webpack_require__(1724);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1722)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6fbf12f6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_PeopleDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6fbf12f6_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_PeopleDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/common/PeopleDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6fbf12f6", Component.options)
  } else {
    hotAPI.reload("data-v-6fbf12f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1722:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1723);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("75020850", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6fbf12f6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./PeopleDetail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6fbf12f6\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./PeopleDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1723:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.content-wrap[data-v-6fbf12f6] {\n  max-height: calc(100vh - 172px);\n  overflow-y: auto;\n}\n.detail-wrap[data-v-6fbf12f6] {\n  margin: 15px;\n  padding: 15px;\n  background: #fff;\n  box-shadow: 0 0 5px #ccc;\n}\n.wrap-title[data-v-6fbf12f6] {\n  height: 40px;\n  font-size: 18px;\n  font-weight: bold;\n  line-height: 30px;\n}\n.detail-title[data-v-6fbf12f6] {\n  height: 30px;\n  line-height: 30px;\n  margin-bottom: 15px;\n  padding-left: 15px;\n  background: #409EFF;\n  color: #fff;\n}\n.head-img[data-v-6fbf12f6] {\n  max-height: 160px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-wrap" },
    [
      _c(
        "div",
        { staticClass: "detail-wrap" },
        [
          _c("div", { staticClass: "wrap-title" }, [_vm._v("基本信息")]),
          _vm._v(" "),
          _c("div", { staticClass: "detail-title" }, [_vm._v("个人信息")]),
          _vm._v(" "),
          _c(
            "el-form",
            { ref: "detailForm", attrs: { "label-width": "100px" } },
            [
              _c(
                "el-row",
                [
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "用户头像:" } }, [
                        _c("img", {
                          staticClass: "head-img",
                          attrs: {
                            src: _vm.detailForm.picture,
                            alt: "用户头像"
                          }
                        })
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 16 } },
                    [
                      _c("el-form-item", { attrs: { label: "姓名:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.detailForm.name) +
                            "\n        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("el-form-item", { attrs: { label: "公司:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.detailForm.orgName) +
                            "\n        "
                        )
                      ]),
                      _vm._v(" "),
                      _c("el-form-item", { attrs: { label: "工号:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.detailForm.account) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "性别:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.$util.controlTable(_vm.detailForm.sex)) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "生日:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              _vm.$util._convertDate(
                                _vm.detailForm.borthday,
                                "yyyy年MM月dd日"
                              )
                            ) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "手机:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.detailForm.phoneNumber) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "电话:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.detailForm.mobilNumber) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "固定电话:" } }, [
                        _vm._v(
                          "\n        " +
                            _vm._s(_vm.detailForm.mobilNumber) +
                            "\n      "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "职务:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              _vm.$util.controlTable(_vm.detailForm.position)
                            ) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "籍贯:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              _vm.$util.controlTable(_vm.detailForm.nativePlace)
                            ) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "文化程度:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              _vm.$util.controlTable(_vm.detailForm.education)
                            ) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "政治面貌:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              _vm.$util.controlTable(_vm.detailForm.outLook)
                            ) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { span: 8 } },
                    [
                      _c("el-form-item", { attrs: { label: "婚姻状况:" } }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              _vm.$util.controlTable(
                                _vm.detailForm.maritalStatus
                              )
                            ) +
                            "\n        "
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("el-col", { attrs: { span: 8 } }),
                  _vm._v(" "),
                  _c("el-col", { attrs: { span: 8 } }),
                  _vm._v(" "),
                  _c("el-col", { attrs: { span: 8 } })
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
        { staticClass: "detail-wrap" },
        [
          _c("div", { staticClass: "wrap-title" }, [_vm._v("关系")]),
          _vm._v(" "),
          _vm._l(_vm.relationsData, function(item, key, index) {
            return _c(
              "div",
              { key: "`${index}relationsData`" },
              [
                _c("div", { staticClass: "detail-title" }, [
                  _vm._v(_vm._s(_vm.typeTextData.relations[index]) + " ")
                ]),
                _vm._v(" "),
                _c(
                  "el-table",
                  { staticStyle: { width: "100%" }, attrs: { data: item } },
                  [
                    _c("el-table-column", {
                      attrs: { align: "left", label: "姓名" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [
                                  _vm._v(_vm._s(scope.row.otherName))
                                ])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: { align: "left", label: "职业" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [
                                  _vm._v(_vm._s(scope.row.otherPosition))
                                ])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: { align: "left", label: "关系" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [
                                  _vm._v(_vm._s(scope.row.relationName))
                                ])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    })
                  ],
                  1
                )
              ],
              1
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "detail-wrap" },
        [
          _c("div", { staticClass: "wrap-title" }, [_vm._v("经历")]),
          _vm._v(" "),
          _vm._l(_vm.experienceData, function(item, key, index) {
            return _c(
              "div",
              { key: "`${index}experienceData`" },
              [
                _c("div", { staticClass: "detail-title" }, [
                  _vm._v(_vm._s(_vm.typeTextData.experience[index]) + " ")
                ]),
                _vm._v(" "),
                _c(
                  "el-table",
                  { staticStyle: { width: "100%" }, attrs: { data: item } },
                  [
                    _c("el-table-column", {
                      attrs: {
                        align: "left",
                        width: "400px",
                        label: "开始结束时间"
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(
                                        scope.row.beginTime != 1
                                          ? _vm._convertDate(
                                              scope.row.beginTime
                                            )
                                          : ""
                                      ) +
                                      " - " +
                                      _vm._s(
                                        scope.row.beginTime != 1
                                          ? _vm._convertDate(scope.row.endTime)
                                          : ""
                                      ) +
                                      "\n            "
                                  )
                                ])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: { align: "left", label: "名称" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [_vm._v(_vm._s(scope.row.address))])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: { align: "left", label: "简述" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [_vm._v(_vm._s(scope.row.position))])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    })
                  ],
                  1
                )
              ],
              1
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "detail-wrap" },
        [
          _c("div", { staticClass: "wrap-title" }, [_vm._v("获得性")]),
          _vm._v(" "),
          _vm._l(_vm.archivesesData, function(item, key, index) {
            return _c(
              "div",
              { key: "`${index}archivesesData`" },
              [
                _c("div", { staticClass: "detail-title" }, [
                  _vm._v(_vm._s(_vm.typeTextData.archiveses[index]) + " ")
                ]),
                _vm._v(" "),
                _c(
                  "el-table",
                  { staticStyle: { width: "100%" }, attrs: { data: item } },
                  [
                    _c("el-table-column", {
                      attrs: {
                        align: "left",
                        width: "250px",
                        label: "得奖日期"
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [
                                  _vm._v(
                                    _vm._s(
                                      scope.row.time != 1
                                        ? _vm._convertDate(scope.row.time)
                                        : ""
                                    )
                                  )
                                ])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: { align: "left", label: "获奖地址" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [_vm._v(_vm._s(scope.row.address))])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    }),
                    _vm._v(" "),
                    _c("el-table-column", {
                      attrs: { align: "left", label: "奖项名字" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c("span", [_vm._v(_vm._s(scope.row.name))])
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    })
                  ],
                  1
                )
              ],
              1
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            "close-on-click-modal": false,
            title: _vm.编辑人员,
            visible: _vm.infoDialogVisible,
            width: "40vw"
          },
          on: {
            "update:visible": function($event) {
              _vm.infoDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              ref: "people",
              attrs: {
                model: _vm.peopleForm,
                "label-width": "100px",
                size: "small"
              }
            },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: "姓名",
                    prop: "name",
                    rules: [
                      { required: true, message: "请输入姓名", trigger: "blur" }
                    ]
                  }
                },
                [
                  _c("el-input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.peopleForm.name,
                      callback: function($$v) {
                        _vm.$set(_vm.peopleForm, "name", $$v)
                      },
                      expression: "peopleForm.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "技术职务" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      model: {
                        value: _vm.peopleForm.position,
                        callback: function($$v) {
                          _vm.$set(_vm.peopleForm, "position", $$v)
                        },
                        expression: "peopleForm.position"
                      }
                    },
                    _vm._l(_vm.techPositionList, function(item, index) {
                      return _c(
                        "el-option",
                        {
                          key: index + "技术职务",
                          attrs: { value: item.key, label: item.value }
                        },
                        [_vm._v(_vm._s(item.value))]
                      )
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "性别" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      attrs: { placeholder: "请选择性别" },
                      model: {
                        value: _vm.peopleForm.sex,
                        callback: function($$v) {
                          _vm.$set(_vm.peopleForm, "sex", $$v)
                        },
                        expression: "peopleForm.sex"
                      }
                    },
                    _vm._l(_vm.dictionaryGender, function(item, index) {
                      return _c("el-option", {
                        key: "编辑-性别" + index,
                        attrs: { value: item.key, label: item.value }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "民族" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      attrs: { placeholder: "请选择民族" },
                      model: {
                        value: _vm.peopleForm.nation,
                        callback: function($$v) {
                          _vm.$set(_vm.peopleForm, "nation", $$v)
                        },
                        expression: "peopleForm.nation"
                      }
                    },
                    _vm._l(_vm.dictionaryNation, function(item, index) {
                      return _c("el-option", {
                        key: "编辑-民族" + index,
                        attrs: { value: item.key, label: item.value }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "籍贯" } },
                [
                  _c("el-input", {
                    attrs: { type: "text" },
                    model: {
                      value: _vm.peopleForm.nationPlace,
                      callback: function($$v) {
                        _vm.$set(_vm.peopleForm, "nationPlace", $$v)
                      },
                      expression: "peopleForm.nationPlace"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "文化程度" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      attrs: { placeholder: "请选择学历" },
                      model: {
                        value: _vm.peopleForm.educationLevel,
                        callback: function($$v) {
                          _vm.$set(_vm.peopleForm, "educationLevel", $$v)
                        },
                        expression: "peopleForm.educationLevel"
                      }
                    },
                    _vm._l(_vm.dictionaryEducation, function(item, index) {
                      return _c("el-option", {
                        key: "编辑-学历" + index,
                        attrs: { value: item.key, label: item.value }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "出生年月" } },
                [
                  _c("el-date-picker", {
                    staticClass: "fill-width",
                    attrs: {
                      type: "date",
                      placeholder: "选择日期",
                      format: "yyyy 年 MM 月 dd 日",
                      "value-format": "timestamp",
                      editable: false
                    },
                    model: {
                      value: _vm.peopleForm.borthday,
                      callback: function($$v) {
                        _vm.$set(_vm.peopleForm, "borthday", $$v)
                      },
                      expression: "peopleForm.borthday"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "参加工作时间" } },
                [
                  _c("el-date-picker", {
                    staticClass: "fill-width",
                    attrs: {
                      type: "date",
                      placeholder: "选择日期",
                      format: "yyyy 年 MM 月 dd 日",
                      "value-format": "timestamp",
                      editable: false
                    },
                    model: {
                      value: _vm.peopleForm.workBorth,
                      callback: function($$v) {
                        _vm.$set(_vm.peopleForm, "workBorth", $$v)
                      },
                      expression: "peopleForm.workBorth"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "政治面貌" } },
                [
                  _c(
                    "el-select",
                    {
                      staticClass: "fill-width",
                      attrs: { placeholder: "请选择政治面貌" },
                      model: {
                        value: _vm.peopleForm.outLook,
                        callback: function($$v) {
                          _vm.$set(_vm.peopleForm, "outLook", $$v)
                        },
                        expression: "peopleForm.outLook"
                      }
                    },
                    _vm._l(_vm.dictionaryOutlook, function(item, index) {
                      return _c("el-option", {
                        key: "编辑-政治面貌" + index,
                        attrs: { value: item.key, label: item.value }
                      })
                    }),
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
            { attrs: { slot: "footer" }, slot: "footer" },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.infoDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: { click: _vm.submitPeopleForm }
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6fbf12f6", esExports)
  }
}

/***/ }),

/***/ 1725:
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
        "el-button",
        {
          staticClass: "back-button",
          attrs: { type: "primary" },
          on: { click: _vm.goBack }
        },
        [_vm._v("返回")]
      ),
      _vm._v(" "),
      _c("people-detail", { attrs: { id: _vm.$route.params.id } })
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0aed2fc5", esExports)
  }
}

/***/ })

});