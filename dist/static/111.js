webpackJsonplensyn_ui([111],{

/***/ 1162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_OrgnizationalLife_vue__ = __webpack_require__(1494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_OrgnizationalLife_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_OrgnizationalLife_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_OrgnizationalLife_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_OrgnizationalLife_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0ce5cf16_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_OrgnizationalLife_vue__ = __webpack_require__(1753);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_OrgnizationalLife_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0ce5cf16_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_OrgnizationalLife_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/my_organizational_life/OrgnizationalLife.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ce5cf16", Component.options)
  } else {
    hotAPI.reload("data-v-0ce5cf16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1494:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      userData: JSON.parse(sessionStorage.getItem('userData')), //用户信息
      joinPartyDialogVisible: false, //入党申请模态框显示属性
      formalApplyDialogVisible: false, //转正申请模态框显示属性
      applyForm: { //入党申请表单
        applicationFile: null,
        recommendFile: null //团内推优表
      },
      formalForm: { //转正申请表单
        applicationFile: null
      }
    };
  },
  created: function created() {},
  mounted: function mounted() {},

  watch: {},
  methods: {
    joinPartyDialogClose: function joinPartyDialogClose() {
      var _this = this;

      this.$nextTick(function () {
        _this.$refs.applicationJoinFile.clearFiles();
        _this.$refs.recommendFile.clearFiles();
      });
    },
    formalApplyDialogClose: function formalApplyDialogClose() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.applicationFile.clearFiles();
      });
    },

    /*
     * 提交入党申请
     */
    onSubmitApply: function onSubmitApply(formName) {
      var _this3 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this3.$request.requestAxios('post', _this3.$util.basePath + '/hr_join_party_application/add/from_org/' + _this3.userData.orgCode, _this3.applyForm, function (response) {
            _this3.$message.success(response.data.meta.message);
            _this3.joinPartyDialogVisible = false;
          }, function (error, status) {
            // 请求失败回调函数...
            status == 200 ? _this3.$message.error(error.data.meta.message) : _this3.$message.error(_this3.$util.basePath + '/hr_join_party_application/add/from_org/' + _this3.userData.orgCode + '-\u5931\u8D25');
            _this3.joinPartyDialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },

    /*
     * 提交转正申请
     */
    onSubmitFormal: function onSubmitFormal(formName) {
      var _this4 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this4.$request.requestAxios('post', _this4.$util.basePath + '/hr_join_party_application/join/from_org/' + _this4.userData.orgCode, _this4.formalForm, function (response) {
            _this4.$message.success(response.data.meta.message);
            _this4.joinPartyDialogVisible = false;
          }, function (error, status) {
            // 请求失败回调函数...
            status == 200 ? _this4.$message.error(error.data.meta.message) : _this4.$message.error(_this4.$util.basePath + '/hr_join_party_application/join/from_org/' + _this4.userData.orgCode + '-\u5931\u8D25');
            _this4.joinPartyDialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },

    /*
      * 附件上传成功后，获取成功后的申请附件数据
      */
    applicationFileSuccess: function applicationFileSuccess(res, file) {
      this.applyForm.applicationFile = res.data;
    },

    /*
      * 附件上传成功后，获取成功后的团内推优附件数据
      */
    recommendFileSuccess: function recommendFileSuccess(res, file) {
      this.applyForm.recommendFile = res.data;
    },

    /*
      * 附件上传成功后，获取成功后的团内推优附件数据
      */
    formalFileSuccess: function formalFileSuccess(res, file) {
      this.formalForm.applicationFile = res.data;
    },

    /*
      * 附件上传之前后，验证的数据大小
      */
    applicationFileBefore: function applicationFileBefore(file) {
      return this.$util.verificationFileSize(file);
    },

    /*
     * 附件上传之前后，验证的数据大小
     */
    recommendFileBefore: function recommendFileBefore(file) {
      return this.$util.verificationFileSize(file);
    },

    /*
     * 附件上传之前后，验证的数据大小
     */
    formalFileBefore: function formalFileBefore(file) {
      return this.$util.verificationFileSize(file);
    }
  }
};

/***/ }),

/***/ 1753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-main",
    [
      _c("el-card", { staticClass: "box-card" }, [
        _c(
          "div",
          {
            staticClass: "clearfix marl20",
            attrs: { slot: "header" },
            slot: "header"
          },
          [_c("span", [_vm._v("向党靠拢")])]
        ),
        _vm._v(" "),
        _c(
          "div",
          [
            _c(
              "el-button",
              {
                staticClass: "text-center marr20",
                attrs: { type: "text" },
                on: {
                  click: function($event) {
                    _vm.joinPartyDialogVisible = true
                  }
                }
              },
              [
                _c("i", {
                  staticClass: "fa fa-envelope marb10",
                  staticStyle: { "font-size": "50px", color: "rgba(0,0,0,.5)" }
                }),
                _vm._v(" "),
                _c("br"),
                _vm._v(" "),
                _c("span", [_vm._v("入党申请")])
              ]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticClass: "text-center ",
                attrs: { type: "text" },
                on: {
                  click: function($event) {
                    _vm.formalApplyDialogVisible = true
                  }
                }
              },
              [
                _c("i", {
                  staticClass: "fa fa-user-plus marb10",
                  staticStyle: { "font-size": "50px", color: "rgba(0,0,0,.5)" }
                }),
                _vm._v(" "),
                _c("br"),
                _vm._v(" "),
                _c("span", [_vm._v("转正申请")])
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          staticClass: "add-task-dialog dialog",
          attrs: {
            title: "入党申请",
            visible: _vm.joinPartyDialogVisible,
            "before-close": _vm.handleAddTaskDialogClose,
            width: "600px"
          },
          on: {
            "update:visible": function($event) {
              _vm.joinPartyDialogVisible = $event
            },
            close: _vm.joinPartyDialogClose
          }
        },
        [
          _c(
            "div",
            { staticStyle: { width: "100%" } },
            [
              _c(
                "el-form",
                {
                  ref: "applyForm",
                  staticClass: "demo-ruleForm mart20",
                  attrs: { model: _vm.applyForm, "label-width": "120px" }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "入党申请书：",
                        prop: "applicationFile",
                        rules: [{ required: true, message: "请上传入党申请书" }]
                      }
                    },
                    [
                      _c(
                        "el-upload",
                        {
                          ref: "applicationJoinFile",
                          staticClass: "upload-demo",
                          attrs: {
                            action:
                              _vm.$util.basePath +
                              "/file/" +
                              _vm.userData.orgId +
                              "/uplode",
                            headers: {
                              Authorization: "Bearer " + _vm.userData.token
                            },
                            "on-preview": _vm.handlePreview,
                            "on-remove": _vm.handleRemove,
                            "before-remove": _vm.beforeRemove,
                            "on-success": _vm.applicationFileSuccess,
                            "before-upload": _vm.applicationFileBefore,
                            limit: 1,
                            "on-exceed": _vm.handleExceed,
                            "file-list": _vm.fileList
                          }
                        },
                        [
                          _c(
                            "el-button",
                            { attrs: { size: "mini", type: "primary" } },
                            [_vm._v("点击上传")]
                          ),
                          _vm._v(" "),
                          _c("div", { attrs: { slot: "tip" }, slot: "tip" }, [
                            _vm._v("附件大小不能超过 100MB!")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "团内推优表：",
                        prop: "recommendFile",
                        rules: [{ required: true, message: "请上传团内推优表" }]
                      }
                    },
                    [
                      _c(
                        "el-upload",
                        {
                          ref: "recommendFile",
                          staticClass: "upload-demo",
                          attrs: {
                            action:
                              _vm.$util.basePath +
                              "/file/" +
                              _vm.userData.orgId +
                              "/uplode",
                            headers: {
                              Authorization: "Bearer " + _vm.userData.token
                            },
                            "on-preview": _vm.handlePreview,
                            "on-remove": _vm.handleRemove,
                            "before-remove": _vm.beforeRemove,
                            "on-success": _vm.recommendFileSuccess,
                            "before-upload": _vm.recommendFileBefore,
                            limit: 1,
                            "on-exceed": _vm.handleExceed,
                            "file-list": _vm.fileList
                          }
                        },
                        [
                          _c(
                            "el-button",
                            { attrs: { size: "mini", type: "primary" } },
                            [_vm._v("点击上传")]
                          ),
                          _vm._v(" "),
                          _c("div", { attrs: { slot: "tip" }, slot: "tip" }, [
                            _vm._v("附件大小不能超过 100MB!")
                          ])
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
                  attrs: { size: "mini" },
                  on: {
                    click: function($event) {
                      _vm.joinPartyDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: "mini" },
                  on: {
                    click: function($event) {
                      return _vm.onSubmitApply("applyForm")
                    }
                  }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          staticClass: "add-task-dialog dialog",
          attrs: {
            title: "转正申请",
            visible: _vm.formalApplyDialogVisible,
            "before-close": _vm.handleAddTaskDialogClose,
            width: "600px"
          },
          on: {
            "update:visible": function($event) {
              _vm.formalApplyDialogVisible = $event
            },
            close: _vm.formalApplyDialogClose
          }
        },
        [
          _c(
            "div",
            { staticStyle: { width: "100%" } },
            [
              _c(
                "el-form",
                {
                  ref: "formalForm",
                  staticClass: "demo-ruleForm mart20",
                  attrs: { model: _vm.formalForm, "label-width": "120px" }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "转正申请书：",
                        prop: "applicationFile",
                        rules: [{ required: true, message: "请上传转正申请书" }]
                      }
                    },
                    [
                      _c(
                        "el-upload",
                        {
                          ref: "applicationFile",
                          staticClass: "upload-demo",
                          attrs: {
                            action:
                              _vm.$util.basePath +
                              "/file/" +
                              _vm.userData.orgId +
                              "/uplode",
                            headers: {
                              Authorization: "Bearer " + _vm.userData.token
                            },
                            "on-preview": _vm.handlePreview,
                            "on-remove": _vm.handleRemove,
                            "before-remove": _vm.beforeRemove,
                            "on-success": _vm.formalFileSuccess,
                            "before-upload": _vm.formalFileBefore,
                            limit: 1,
                            "on-exceed": _vm.handleExceed,
                            "file-list": _vm.fileList
                          }
                        },
                        [
                          _c(
                            "el-button",
                            { attrs: { size: "mini", type: "primary" } },
                            [_vm._v("点击上传")]
                          ),
                          _vm._v(" "),
                          _c("div", { attrs: { slot: "tip" }, slot: "tip" }, [
                            _vm._v("附件大小不能超过 100MB!")
                          ])
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
                  attrs: { size: "mini" },
                  on: {
                    click: function($event) {
                      _vm.formalApplyDialogVisible = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: "mini" },
                  on: {
                    click: function($event) {
                      return _vm.onSubmitFormal("formalForm")
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0ce5cf16", esExports)
  }
}

/***/ })

});