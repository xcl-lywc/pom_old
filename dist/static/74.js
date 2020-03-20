webpackJsonplensyn_ui([74],{

/***/ 1198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__ = __webpack_require__(1538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0aef1a46_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__ = __webpack_require__(1882);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1880)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0aef1a46"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Detail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0aef1a46_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Detail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/theme/Detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0aef1a46", Component.options)
  } else {
    hotAPI.reload("data-v-0aef1a46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1538:
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
      activeStagesDialogVisible: false, //活动安排弹框
      detailData: {},
      reviewData: {},
      reviewForm: { //评论表单
        commentContent: null,
        fromType: 6,
        fromId: null
      },
      opearRowItem: null, //被操作行的数据
      activeStagesTimeRange: null,
      activeStagesForm: {
        "beginTime": null,
        "description": null,
        "endTime": null,
        "id": null,
        "stageName": null
      },
      activeStagesStatus: 0 // 0新增，1编辑，2插入
    };
  },
  mounted: function mounted() {
    this.getDetail();
  },

  computed: {
    fileName: function fileName() {
      if (this.detailData.plan) {
        return JSON.parse(this.detailData.plan)[0].fileName;
      } else {
        return null;
      }
    },
    activeStagesTitle: function activeStagesTitle() {
      switch (this.activeStagesStatus) {
        case 0:
          return '新增';
          break;
        case 1:
          return '编辑';
          break;
        case 2:
          return '插入';
          break;
      }
    }
  },
  methods: {
    /**
     * [getDetail description]
     * @return {[type]} [description]
     */
    getDetail: function getDetail() {
      var self = this;
      self.detailLoading = true;
      self.$request.requestAxios("get", basePath + '/activity/' + self.$route.params.id + '/details', null, function (response) {
        response.data.data.recordInfo = [];
        self.detailData = response.data.data;
        self.getReviewData(self.detailData.taskId);
        self.$nextTick(function () {
          self.detailLoading = false;
        });
      }, function (error) {
        self.$message.error("获取详情失败");
        self.detailLoading = false;
      });
    },
    getReviewData: function getReviewData(taskId) {
      var self = this;
      self.$request.requestAxios("get", basePath + '/t_tasks/review/list?fromId=' + taskId + '&fromType=6', null, function (response) {
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
          self[formName].fromId = self.detailData.taskId;
          self.$request.requestAxios("post", basePath + '/t_tasks/review', self[formName], function (response) {
            if (response.data.meta.code === 0) {
              self.resetDetailForm();
              self.getDetail();
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

    /*
     * 拼接上传附件的URL地址
     */
    _convertFilesUrl: function _convertFilesUrl() {
      return basePath + '/file/' + this.orgId + '/uplode';
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
      this.detailData.privateFile = filesList;
    },
    handleRemove: function handleRemove(file, filesList) {
      this.detailData.privateFile = filesList;
    },
    handleTalkingSuccess: function handleTalkingSuccess(response, file, filesList) {
      var self = this;
      self.detailData.recordInfo = filesList;
      //上传记录表之后立刻保存至后台
      self.$request.requestAxios("patch", basePath + '/conversation/record/update/' + self.$route.params.id + '/from_org/' + self.orgCode, {
        record: file.response.data
      }, function (response) {
        self.getDetail();
      }, function (error) {
        self.$message.error("修改谈话记录失败");
      });
    },
    handleTalkingRemove: function handleTalkingRemove(file, filesList) {
      this.detailData.recordInfo = filesList;
    },

    /**
     * 下载文件
     * @param  {[type]} fileId [description]
     * @return {[type]}        [description]
     */
    downloadFile: function downloadFile(fileId) {
      this.$util.downloadFile(fileId);
    },

    /*
     * 删除指定一条活动安排
     */
    delActiveStages: function delActiveStages(item) {
      var _this = this;

      this.$request.requestAxios("delete", basePath + '/activity/stage/' + item.id, '', function (response) {
        _this.getDetail();
        _this.$message.success('删除成功！');
      }, function (error, status) {
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error(basePath + '/activity/stage' + item.id + ' - \u5931\u8D25');
      });
    },

    /*
     * 保存活动安排
     */
    submitActiveStage: function submitActiveStage() {
      if (this.activeStagesStatus == 1) {
        this._editActiveState();
      } else {
        this._addActiveState();
      }
    },
    _addActiveState: function _addActiveState() {
      var _this2 = this;

      this.$request.requestAxios("post", basePath + '/activity/stage/' + this.$route.params.id, this._activeStagesParams(), function (response) {
        _this2.getDetail();
        _this2.activeStagesDialogVisible = false;
        _this2.$message.success('成功！');
      }, function (error, status) {
        _this2.activeStagesDialogVisible = false;
        status == 200 ? _this2.$message.error(error.data.meta.message) : _this2.$message.error(basePath + '/activity/stage' + item.id + ' - \u5931\u8D25');
      });
    },
    _editActiveState: function _editActiveState() {
      var _this3 = this;

      this.$request.requestAxios("put", basePath + '/activity/stage', this._activeStagesParams(), function (response) {
        _this3.activeStagesDialogVisible = false;
        _this3.getDetail();
        _this3.$message.success('成功！');
      }, function (error, status) {
        _this3.activeStagesDialogVisible = false;
        status == 200 ? _this3.$message.error(error.data.meta.message) : _this3.$message.error(basePath + '/activity/stage' + item.id + ' - \u5931\u8D25');
      });
    },
    _activeStagesParams: function _activeStagesParams() {
      this.activeStagesForm.beginTime = new Date(this.activeStagesTimeRange[0]).getTime();
      this.activeStagesForm.endTime = new Date(this.activeStagesTimeRange[1]).getTime();
      if (this.activeStagesStatus != 1) {
        // ---- 当没有上一列数据，就不用传lastState给后台 -------
        if (this.opearRowItem) {
          this.activeStagesForm.lastStage = this.opearRowItem.id;
        }
      }
      return this.activeStagesForm;
    },
    showEdit: function showEdit(item) {
      this.activeStagesStatus = 1;
      this.activeStagesDialogVisible = true;
      this.opearRowItem = item;
      this.activeStagesForm = item;
      this.activeStagesTimeRange = [new Date(item.beginTime), new Date(item.endTime)];
    },
    showInsert: function showInsert(item) {
      this.activeStagesStatus = 2;
      this.activeStagesDialogVisible = true;
      this.opearRowItem = item;
      this.activeStagesTimeRange = null;
      this.activeStagesForm.stageName = null;
      // this.$refs.activeStagesForm.resetFields();
    },
    showAdd: function showAdd() {
      this.activeStagesStatus = 0;
      this.activeStagesDialogVisible = true;
      // --------------- 要有一个活动安排才能赋值 -------------
      if (this.detailData.activeStages.length) {
        this.opearRowItem = this.detailData.activeStages[this.detailData.activeStages.length - 1];
      } else {
        this.opearRowItem = null;
      }
      this.activeStagesTimeRange = null;
      this.activeStagesForm.stageName = null;
      // this.$refs.activeStagesForm.resetFields();
    }
  }
};

/***/ }),

/***/ 1880:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1881);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("5282a73d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0aef1a46\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0aef1a46\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1881:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.detail-wrap[data-v-0aef1a46] {\n  background: #fff;\n}\n.detail-wrap .detail-item[data-v-0aef1a46] {\n  padding: 10px 5px;\n  line-height: 32px;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n.detail-wrap .detail-item .detail-label[data-v-0aef1a46] {\n  display: inline-block;\n  height: 32px;\n  line-height: 32px;\n  width: 80px;\n  margin-right: 10px;\n  text-align: right;\n}\n.detail-wrap .detail-right-div[data-v-0aef1a46] {\n  width: calc( 100% - 90px)\n}\n.review-list-wrap[data-v-0aef1a46] {\n  max-height: 283px;\n  overflow-y: auto;\n}\n.review-item-wrap[data-v-0aef1a46] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  padding: 10px;\n  border-bottom: 1px solid #ccc;\n  border-left: 15px solid transparent;\n  border-right: 15px solid transparent;\n}\n.review-item-wrap[data-v-0aef1a46]:last-child {\n  border-bottom: none;\n}\n.review-item-wrap div[data-v-0aef1a46] {\n  width: calc(100% - 60px);\n}\n.input-button-group[data-v-0aef1a46] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n", ""]);

// exports


/***/ }),

/***/ 1882:
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
              return _vm.$router.push({ name: "Theme_Theme" })
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
          _c("p", { staticClass: "detail-item" }, [
            _c("span", { staticClass: "detail-label" }, [_vm._v("活动名称:")]),
            _vm._v(_vm._s(_vm.detailData.name))
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "detail-item" }, [
            _c("span", { staticClass: "detail-label" }, [_vm._v("活动地点:")]),
            _vm._v(_vm._s(_vm.detailData.address))
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "detail-item" }, [
            _c("span", { staticClass: "detail-label" }, [_vm._v("活动时间:")]),
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
          _c(
            "p",
            { staticClass: "detail-item" },
            [
              _c("span", { staticClass: "detail-label" }, [
                _vm._v("活动方案:")
              ]),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "text", size: "small", title: "点击下载" },
                  on: {
                    click: function($event) {
                      _vm.downloadFile(
                        JSON.parse(_vm.detailData.plan)[0].fileId
                      )
                    }
                  }
                },
                [_vm._v("\n        " + _vm._s(_vm.fileName) + "\n      ")]
              ),
              _vm._v(" "),
              _vm.$util._validateFileFormat(_vm.fileName)
                ? _c(
                    "el-button",
                    {
                      attrs: { type: "primary", size: "mini" },
                      on: {
                        click: function($event) {
                          _vm.$util.fileEditOrPreview(
                            JSON.parse(_vm.detailData.plan)[0].fileId,
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
          ),
          _vm._v(" "),
          _c(
            "el-card",
            { staticClass: "box-card mart20 marb20" },
            [
              _c(
                "div",
                {
                  staticClass: "clearfix",
                  attrs: { slot: "header" },
                  slot: "header"
                },
                [
                  _c("span", [_vm._v("活动安排")]),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      staticClass: "fr",
                      attrs: { type: "primary", size: "mini" },
                      on: { click: _vm.showAdd }
                    },
                    [_vm._v("新增")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-table",
                {
                  staticStyle: { width: "100%" },
                  attrs: { data: _vm.detailData.activeStages, stripe: "" }
                },
                [
                  _c("el-table-column", {
                    attrs: { prop: "stageName", label: "阶段名称" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { prop: "beginTime", label: "开始时间" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _vm._v(
                              "\n            " +
                                _vm._s(
                                  _vm.$util._convertDate(
                                    scope.row.beginTime,
                                    "yyyy年MM月dd日 hh时：mm分"
                                  )
                                ) +
                                "\n          "
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { prop: "endTime", label: "结束时间" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _vm._v(
                              "\n            " +
                                _vm._s(
                                  _vm.$util._convertDate(
                                    scope.row.endTime,
                                    "yyyy年MM月dd日 hh时：mm分"
                                  )
                                ) +
                                "\n          "
                            )
                          ]
                        }
                      }
                    ])
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "操作", width: "250px" },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(scope) {
                          return [
                            _c(
                              "el-button",
                              {
                                attrs: {
                                  type: "primary",
                                  size: "mini",
                                  disabled: scope.row.status == 2
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.showEdit(scope.row)
                                  }
                                }
                              },
                              [_vm._v("编辑")]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                attrs: {
                                  type: "primary",
                                  size: "mini",
                                  disabled: scope.row.status == 2
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.showInsert(scope.row)
                                  }
                                }
                              },
                              [_vm._v("插入")]
                            ),
                            _vm._v(" "),
                            _c(
                              "el-button",
                              {
                                attrs: {
                                  type: "danger",
                                  size: "mini",
                                  disabled: scope.row.status == 2
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.delActiveStages(scope.row)
                                  }
                                }
                              },
                              [_vm._v("删除")]
                            )
                          ]
                        }
                      }
                    ])
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("div")
            ],
            1
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
                                "yyyy年MM月dd日 hh时：mm分"
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
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          staticClass: "add-task-dialog dialog",
          attrs: {
            title: _vm.activeStagesTitle,
            visible: _vm.activeStagesDialogVisible,
            "before-close": _vm.handleAddTaskDialogClose,
            width: "800px"
          },
          on: {
            "update:visible": function($event) {
              _vm.activeStagesDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              ref: "activeStagesForm",
              staticClass: "mart20",
              staticStyle: { width: "100%" },
              attrs: { "label-width": "120px", model: _vm.activeStagesForm }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "阶段名称：" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.activeStagesForm.stageName,
                      callback: function($$v) {
                        _vm.$set(_vm.activeStagesForm, "stageName", $$v)
                      },
                      expression: "activeStagesForm.stageName"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "阶段时间：" } },
                [
                  _c("el-date-picker", {
                    attrs: {
                      type: "datetimerange",
                      "range-separator": "至",
                      "start-placeholder": "开始日期",
                      "end-placeholder": "结束日期"
                    },
                    model: {
                      value: _vm.activeStagesTimeRange,
                      callback: function($$v) {
                        _vm.activeStagesTimeRange = $$v
                      },
                      expression: "activeStagesTimeRange"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    {
                      attrs: { size: "mini", type: "primary" },
                      on: { click: _vm.submitActiveStage }
                    },
                    [_vm._v("保存")]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0aef1a46", esExports)
  }
}

/***/ })

});