webpackJsonplensyn_ui([89],{

/***/ 1239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__ = __webpack_require__(1586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_71b60e24_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__ = __webpack_require__(1983);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1981)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-71b60e24"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_71b60e24_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/talking/Detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71b60e24", Component.options)
  } else {
    hotAPI.reload("data-v-71b60e24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1586:
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

exports.default = {
  data: function data() {
    return {

      userData: JSON.parse(sessionStorage.getItem('userData')), //用户信息
      orgId: sessionStorage.getItem('orgId'), //党组织id
      orgCode: sessionStorage.getItem("orgCode"),

      detailLoading: false,
      detailData: {
        recordInfo: {
          name: "暂无文件",
          id: 0
        },
        privateFile: []
      },
      reviewData: {},
      reviewForm: { //评论表单
        commentContent: null,
        fromType: 6,
        fromId: this.$route.params.id
      }
    };
  },
  mounted: function mounted() {
    this.getDetail();
  },

  methods: {
    /**
     * [getDetail description]
     * @return {[type]} [description]
     */
    getDetail: function getDetail() {
      var self = this;
      // self.detailLoading = true
      self.$request.requestAxios("get", basePath + '/conversation/conversation/details/', {
        params: {
          id: self.$route.params.id
        }
      }, function (response) {
        self.detailData = response.data.data;
        self.getReviewData(self.detailData.taskId);
        self.reviewForm.fromId = self.$route.params.id; //任务Id赋值
        self.detailLoading = false;
        if (!response.data.data.taskId) {
          self.$message.error("taskId为空 无法使用评论功能!");
        }
      }, function (error) {
        self.$message.error("获取详情失败");
        self.detailLoading = false;
      });
    },
    getReviewData: function getReviewData(taskId) {
      var self = this;
      self.$request.requestAxios("get", basePath + '/t_tasks/review/list?fromId=' + self.$route.params.id + '&fromType=6', null, function (response) {
        self.reviewData = response.data.data.rows;
      }, function (error) {
        self.$message.error("获取评论失败");
      });
    },

    /**
     * 提交表单 根据不同的表单进行不同的逻辑处理
     * @param  {string} formName 表单的ref
     * @return none
     */
    submitForm: function submitForm(formName) {
      var self = this;
      //提交评论的表单
      self.$refs[formName].validate(function (valid) {
        if (valid) {
          // self[formName].fromId = self.tempDetailId
          self.$request.requestAxios("post", basePath + '/t_tasks/review', self[formName], function (response) {
            if (response.data.meta.code === 0) {
              self.$message.success("成功");
              self.getReviewData();
              self[formName].commentContent = null;
              self.$refs[formName].resetFields();
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
    },

    /*
     * 拼接上传附件的URL地址
     */
    _convertFilesUrl: function _convertFilesUrl() {
      return basePath + '/file/' + this.userData.partyOrgId + '/uplode';
    },

    /*
     * 附件上传之前，验证的数据大小
     */
    beforeFileUpload: function beforeFileUpload(file) {
      var isLt2M = file.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        this.$message.error('附件大小不能超过 100MB!');
      }
      return isLt2M;
    },
    handleSuccess: function handleSuccess(response, file, filesList) {
      var self = this;
      this.detailData.privateFile.push({
        id: response.data,
        name: file.name
      });
      self.$request.requestAxios("post", basePath + '/conversation/private_file/update/' + self.$route.params.id + '/from_org/' + self.userData.orgCode, {
        fileIds: this.detailData.privateFile.map(function (item) {
          return item.id;
        }).join(",")
      }, function (response) {
        self.getDetail();
      }, function (error) {
        self.$message.error(error.data.meta.message);
      });
    },
    removeFile: function removeFile(id) {
      var self = this;
      $.each(self.detailData.privateFile, function (index, item) {
        if (item.id == id) {
          self.detailData.privateFile.splice(index, 1);
        }
      });
      self.$request.requestAxios("post", basePath + '/conversation/private_file/update/' + self.$route.params.id + '/from_org/' + self.orgCode, {
        fileIds: this.detailData.privateFile.map(function (item) {
          return item.id;
        }).join(",")
      }, function (response) {
        self.getDetail();
      }, function (error) {
        self.$message.error(error.data.meta.message);
      });
    },
    handleTalkingSuccess: function handleTalkingSuccess(response, file, filesList) {
      var self = this;
      self.detailData.recordInfo = filesList;
      //上传记录表之后立刻保存至后台
      self.$request.requestAxios("post", basePath + '/conversation/record/upload/' + self.$route.params.id + '/', {
        record: file.response.data
      }, function (response) {
        self.getDetail();
      }, function (error) {
        self.$message.error("修改谈话记录失败");
      });
    },
    handleTalkingRemove: function handleTalkingRemove(file, filesList) {
      this.detailData.recordInfo = filesList;
    }
  }
};

/***/ }),

/***/ 1981:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1982);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("5baacd14", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71b60e24\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-71b60e24\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1982:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.detail-wrap[data-v-71b60e24] {\n  background: #fff;\n}\n.detail-wrap p[data-v-71b60e24] {\n  padding: 15px 10px;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: top;\n}\n.detail-wrap p .detail-label[data-v-71b60e24] {\n  display: inline-block;\n  width: 80px;\n  margin-right: 10px;\n  text-align: right;\n}\n.detail-wrap .detail-right-div[data-v-71b60e24] {\n  width: calc( 100% - 90px)\n}\n.review-list-wrap[data-v-71b60e24] {\n  max-height: 283px;\n  overflow-y: auto;\n}\n.review-item-wrap[data-v-71b60e24] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  padding: 10px;\n  border-bottom: 1px solid #ccc;\n  border-left: 15px solid transparent;\n  border-right: 15px solid transparent;\n}\n.review-item-wrap[data-v-71b60e24]:last-child {\n  border-bottom: none;\n}\n.review-item-wrap div[data-v-71b60e24] {\n  width: calc(100% - 60px);\n}\n.input-button-group[data-v-71b60e24] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n.download-button[data-v-71b60e24] {\n  padding: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1983:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-manage" },
    [
      _c(
        "el-button",
        {
          attrs: { type: "primary" },
          on: {
            click: function($event) {
              return _vm.$router.push({ name: "My_Talking_Talking" })
            }
          }
        },
        [_vm._v("返回")]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.detailLoading,
              expression: "detailLoading"
            }
          ],
          staticClass: "detail-wrap"
        },
        [
          _c("p", [
            _c("span", { staticClass: "detail-label" }, [_vm._v("谈话主题:")]),
            _vm._v(_vm._s(_vm.detailData.theme))
          ]),
          _vm._v(" "),
          _c("p", [
            _c("span", { staticClass: "detail-label" }, [_vm._v("谈话内容:")]),
            _vm._v(_vm._s(_vm.detailData.content))
          ]),
          _vm._v(" "),
          _c("p", [
            _c("span", { staticClass: "detail-label" }, [_vm._v("谈话时间:")]),
            _vm._v(
              _vm._s(
                _vm.$util._convertDate(
                  _vm.detailData.beginTime,
                  "yyyy年MM月dd日 hh时：mm分"
                )
              ) +
                " ~ " +
                _vm._s(
                  _vm.$util._convertDate(
                    _vm.detailData.endTime,
                    "yyyy年MM月dd日 hh时：mm分"
                  )
                )
            )
          ]),
          _vm._v(" "),
          _c("p", [
            _c("span", { staticClass: "detail-label" }, [_vm._v("谈话地点:")]),
            _vm._v(_vm._s(_vm.detailData.address))
          ]),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("span", { staticClass: "detail-label" }, [
                _vm._v("谈话记录表:")
              ]),
              _vm._v(" "),
              _vm.detailData.recordInfo
                ? _c(
                    "el-button",
                    {
                      staticClass: "download-button",
                      attrs: { type: "text", size: "small" },
                      on: {
                        click: function($event) {
                          return _vm.$util.downloadFile(
                            _vm.detailData.recordInfo.id
                          )
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.detailData.recordInfo.name))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("span", [_vm._v(" 未上传谈话记录表 ")])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("span", { staticClass: "detail-label" }, [
                _vm._v("附件列表:")
              ]),
              _vm._v(" "),
              _c(
                "el-upload",
                {
                  staticClass: "detail-right-div",
                  attrs: {
                    headers: { Authorization: "Bearer " + _vm.userData.token },
                    action: _vm._convertFilesUrl(),
                    "on-remove": _vm.handleRemove,
                    "on-success": _vm.handleSuccess,
                    "before-upload": _vm.beforeFileUpload,
                    "show-file-list": false,
                    "file-list": _vm.detailData.privateFile,
                    multiple: "",
                    limit: 100
                  }
                },
                [
                  _c(
                    "el-button",
                    { attrs: { size: "small", type: "primary" } },
                    [_vm._v("上传附件")]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "el-upload__tip",
                      attrs: { slot: "tip" },
                      slot: "tip"
                    },
                    [_vm._v("附件大小不能超过 100MB!")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.detailData.privateFile, function(itemFile, indexFile) {
            return _vm.detailData.privateFile
              ? _c(
                  "div",
                  { key: indexFile, staticStyle: { "padding-left": "100px" } },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "text", title: "点击下载" },
                        on: {
                          click: function($event) {
                            return _vm.$util.downloadFile(itemFile.id)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          " + _vm._s(itemFile.name) + "\n      "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm.$util._validateFileFormat(itemFile.name)
                      ? _c(
                          "el-button",
                          {
                            attrs: { type: "primary", size: "mini" },
                            on: {
                              click: function($event) {
                                return _vm.$util.fileEditOrPreview(
                                  itemFile.id,
                                  "onlyread"
                                )
                              }
                            }
                          },
                          [_vm._v("可在线预览")]
                        )
                      : _vm._e()
                  ],
                  1
                )
              : _vm._e()
          }),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("span", { staticClass: "detail-label" }, [_vm._v("谈话人:")]),
              _vm._v(" "),
              _vm._l(_vm.detailData.initiatorList, function(item) {
                return _c("span", { key: item.id }, [
                  _vm._v(_vm._s(item.name) + "， ")
                ])
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("span", { staticClass: "detail-label" }, [
                _vm._v("约谈对象:")
              ]),
              _vm._l(_vm.detailData.talkerList, function(item) {
                return _c("span", { key: item.id }, [
                  _vm._v(_vm._s(item.name) + "， ")
                ])
              })
            ],
            2
          ),
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
                      { required: true, message: "请输入评论内容", trigger: "" }
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
        2
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-71b60e24", esExports)
  }
}

/***/ })

});