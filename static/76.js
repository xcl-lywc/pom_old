webpackJsonplensyn_ui([76],{

/***/ 1211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionDetail_vue__ = __webpack_require__(1558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionDetail_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionDetail_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionDetail_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6590c465_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_QuestionDetail_vue__ = __webpack_require__(1927);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1925)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6590c465"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionDetail_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6590c465_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_QuestionDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/QuestionDetail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6590c465", Component.options)
  } else {
    hotAPI.reload("data-v-6590c465", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1558:
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

exports.default = {
  data: function data() {
    return {
      imgServer: basePath + "/sys/ueditor/file?action=uploadimage",
      token: { "Authorization": "Bearer " + JSON.parse(window.sessionStorage.getItem("userData")).token },

      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      formDialogVisible: false,
      formLoading: false,

      detailData: {},
      loadingSuccess: false,
      questionForm: {
        analysis: "",
        answerList: [//答案列表
        {
          content: "",
          exactness: false
        }],
        content: "", //题干
        picture: null,
        score: 0,
        type: 1,
        isCorrect: 0, //单选 正确答案 提交时遍历处理answerList每一项 并删除此key
        checkList: [] //多选 正确答案 处理方法同上
      },

      listData: [],
      currentPage: 1,
      currentPerPage: 5,
      total: null
    };
  },

  watch: {
    "questionForm.type": {
      handler: function handler(oldV, newV) {
        if (this.loadingSuccess) {
          this.questionForm.answerList = [//重置答案列表
          {
            content: "",
            exactness: false
          }];
        }
      },

      deep: true
    }
  },
  computed: {
    exactAnswer: function exactAnswer() {
      var _this = this;

      var exactSingle = null;
      var exactMulti = [];
      if (this.detailData.type == 1) {
        this.detailData.answerList.forEach(function (item, index) {
          console.log(item.exactness);
          if (item.exactness) {

            exactSingle = _this.returnLetter(index);
          }
        });
      }
      if (this.detailData.type == 2) {
        this.detailData.answerList.forEach(function (item, index) {
          console.log(item.exactness);
          if (item.exactness) {
            exactMulti.push(_this.returnLetter(index));
          }
        });
      }

      if (exactSingle) {
        return exactSingle;
      } else {
        return exactMulti.join(", ");
      }
    }
  },
  mounted: function mounted() {
    this.getDetail();
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
     * 获取题目详情
     * @return {[type]} [description]
     */
    getDetail: function getDetail() {
      var self = this;

      var config = {
        url: basePath + "/questions/questions/details",
        method: "get"
      };

      self.$request.requestAxios(config.method, config.url, { params: { id: self.$route.params.id } }, function (response) {
        self.detailData = response.data.data;
        self.handleFormAfterGeted(JSON.parse((0, _stringify2.default)(self.detailData)));
        self.getListData(response.data.data.knowledgeId, "/questions/questions/choice/list", "listData"); //查询相关题目
      }, function (error) {
        self.$message.error(response.data.meta.message || "失败");
      });
    },

    /**
     * 获取相关题型-列表数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getListData: function getListData(id, url, target) {
      var self = this;
      self.cardsLoading = true;
      self.formDialogVisible = false;

      var params = {
        knowledgeId: id,
        pageSize: self.currentPerPage,
        pageNum: self.currentPage
      };

      self.$request.requestAxios('post', "" + basePath + url, params, function (response) {
        self[target] = response.data.data.rows;
        self.total = response.data.data.total;
        self.cardsLoading = false;
      }, function (error) {
        self.$message.error(error);
        self.cardsLoading = false;
      });
    },

    /**
     * 重置表单
     * @return {[type]} [description]
     */
    restForm: function restForm() {
      this.$refs.questionForm.resetFields();
      this.questionForm = {
        analysis: "",
        answerList: [//答案列表
        {
          content: "",
          exactness: false
        }],
        content: "", //题干
        picture: null,
        score: 0,
        type: 1,
        isCorrect: 0, //单选 正确答案 提交时遍历处理answerList每一项 并删除此key
        checkList: [] //多选 正确答案 处理方法同上
      };
    },

    /**
     * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
     * @param  {string} formName [description]
     * @return {[type]}          [description]
     */
    submitForm: function submitForm(formName) {
      var self = this;

      self[formName].knowledgeId = self.detailData.knowledgeId;

      var result = self.handleForm(self[formName]);

      if (result) {

        var config = {
          url: basePath + "/questions/questions/update/" + self.$route.params.id + "/from_org/" + self.orgCode,
          method: "patch",
          data: result
        };
        self.$refs[formName].validate(function (valid) {
          if (valid) {
            self.formLoading = true;
            self.$request.requestAxios(config.method, config.url, config.data, function (response) {
              self.$message.success(response.data.meta.message);
              //重新查询
              self.getDetail();
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
      } else {
        self.$message.error("请至少选中一个将其设为正确答案");
      }
    },

    /**
     * 在获取数据后, 遍历answerList, 将对应的单选多选写入到isCorrect 和 checkList
     * @return {[type]} [description]
     */
    handleFormAfterGeted: function handleFormAfterGeted(data) {

      data.isCorrect = null;
      data.checkList = [];

      if (data.type == 1) {
        data.answerList.forEach(function (item, index) {
          if (item.exactness) {
            data.isCorrect = index;
          }
        });
      }
      if (data.type == 2) {
        data.answerList.forEach(function (item, index) {
          if (item.exactness) {
            data.checkList.push(index);
          }
        });
      }

      this.questionForm = data;
    },

    /**
     * 处理form 返回一个需要保存至后台的form对象
     * @return {[type]} [description]
     */
    handleForm: function handleForm(formData) {
      var form = JSON.parse((0, _stringify2.default)(formData));

      var flag = true;
      if (form.type == 1) {
        form.answerList.forEach(function (item, index) {
          form.isCorrect == index ? item.exactness = true : item.exactness = false;
        });
      }

      if (form.type == 2) {
        if (form.checkList.length <= 0) {
          flag = false;
        } else {
          form.answerList.forEach(function (item, index) {
            item.exactness = false;
          });
          console.log(form.checkList);
          form.checkList.forEach(function (item, index) {
            form.answerList[item].exactness = true;
          });
        }
      }

      delete form.isCorrect;
      delete form.checkList;

      if (flag) {
        return form;
      } else {
        return false;
      }
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isImage = file.type === 'image/jpeg' || file.type === 'image/png';
      var isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('请上传正确的图片格式文件!');
      }
      if (!isLt2M) {
        this.$message.error('文件大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },

    /**
     * 上传成功, 写入img对应的path
     * @param  {[type]} response [description]
     * @param  {[type]} file     [description]
     * @param  {[type]} fileList [description]
     * @return none
     */
    uploadSuccess: function uploadSuccess(response, file, fileList) {
      this.questionForm.picture = response.data.path;
    },
    uploadError: function uploadError(response, file, fileList) {
      this.$message.error(response);
    },
    clickOtherDetail: function clickOtherDetail(item) {
      this.$router.push({ name: this.$route.name, params: { id: item.id } });
      this.getDetail();
    },

    /**
     * 添加答案
     */
    addAnswer: function addAnswer() {
      this.questionForm.answerList.push({ content: "", exactness: false });
    },

    /**
     * 删除答案
     */
    deleteAnswer: function deleteAnswer(item) {
      var _this2 = this;

      var index = this.questionForm.answerList.indexOf(item);
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        if (index !== -1) {
          _this2.questionForm.answerList.splice(index, 1);
        }
        // TODO 优化当用户删除已有答案时, 当前选中的正确答案需要跟随变化
      }).catch(function () {});
    }
  }
};

/***/ }),

/***/ 1925:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1926);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("7fff3674", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6590c465\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./QuestionDetail.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6590c465\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./QuestionDetail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1926:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.answer-wrap[data-v-6590c465] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.answer-wrap .margin-radio[data-v-6590c465] {\n  margin: 0 10px;\n}\n.relative-question[data-v-6590c465] {\n  max-height: calc( 100vh - 205px);\n  overflow: auto;\n}\n.el-card[data-v-6590c465] {\n  margin: 10px 0;\n}\n.el-card .img-wrap[data-v-6590c465] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n}\n.el-card .img-wrap img[data-v-6590c465],\n.el-card .img-wrap .no-img-div[data-v-6590c465] {\n  line-height: 100px;\n  text-align: center;\n  height: 100px;\n  width: 100px;\n}\n.question-info[data-v-6590c465] {\n  margin-top: 15px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.relative-question[data-v-6590c465] {\n  max-height: clac( 100vh - 205px);\n}\n/*上传图片*/\n.avatar-wrap[data-v-6590c465] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  border: 1px dashed #ccc;\n  border-radius: 5px;\n}\n.avatar-wrap[data-v-6590c465]:hover {\n  border: 1px dashed #409EFF;\n  color: #409EFF;\n}\n.avatar-img[data-v-6590c465] {\n  max-width: 100%;\n  max-height: 300px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1927:
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
        "div",
        { staticClass: "detail" },
        [
          _c(
            "el-row",
            { attrs: { gutter: 10 } },
            [
              _c("el-col", { attrs: { span: 18 } }, [
                _vm._v(
                  "\n        " + _vm._s(_vm.detailData.content) + "\n        "
                ),
                _vm.detailData.type != 3
                  ? _c(
                      "ul",
                      _vm._l(_vm.detailData.answerList, function(item, index) {
                        return _c("li", { key: item.id }, [
                          _vm._v(
                            _vm._s(_vm.returnLetter(index)) +
                              "、" +
                              _vm._s(item.content)
                          )
                        ])
                      }),
                      0
                    )
                  : _c("div")
              ]),
              _vm._v(" "),
              _c("el-col", { staticClass: "img-wrap", attrs: { span: 6 } }, [
                !_vm.detailData.picture
                  ? _c("div", { staticClass: "no-img-div" }, [
                      _vm._v("暂无图片")
                    ])
                  : _c("img", {
                      staticStyle: { height: "100px", width: "100px" },
                      attrs: { src: _vm.detailData.picture, alt: "" }
                    })
              ]),
              _vm._v(" "),
              _c(
                "el-col",
                { staticClass: "question-info", attrs: { span: 24 } },
                [_c("p", [_vm._v(" " + _vm._s(_vm.detailData.analysis) + " ")])]
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { staticClass: "question-info", attrs: { span: 24 } },
                [
                  _c("p", [
                    _vm._v("题型:\n          "),
                    _vm.detailData.type == 1
                      ? _c("span", [_vm._v("单选题")])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.detailData.type == 2
                      ? _c("span", [_vm._v("多选题")])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.detailData.type == 3
                      ? _c("span", [_vm._v("简答题")])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _vm.detailData.type != 3
                    ? _c("p", [_vm._v("正确答案: " + _vm._s(_vm.exactAnswer))])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v("创建者: " + _vm._s(_vm.detailData.createName))
                  ]),
                  _vm._v(" "),
                  _c("p", [_vm._v("分值: " + _vm._s(_vm.detailData.score))]),
                  _vm._v(" "),
                  _c(
                    "span",
                    [
                      _vm.$route.name != "My_Question_Detail"
                        ? _c(
                            "el-button",
                            {
                              attrs: { type: "primary", size: "small" },
                              on: {
                                click: function($event) {
                                  _vm.formDialogVisible = true
                                }
                              }
                            },
                            [_vm._v("纠错")]
                          )
                        : _vm._e()
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
        "div",
        { staticClass: "relative-question" },
        [
          _c("h4", [_vm._v("相关题目")]),
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
            _vm._l(_vm.listData, function(item, index) {
              return _c(
                "el-card",
                { key: index + "列表" },
                [
                  _c(
                    "el-row",
                    { attrs: { gutter: 10 } },
                    [
                      _c("el-col", { attrs: { span: 18 } }, [
                        _vm._v(
                          "\n            " +
                            _vm._s(item.content) +
                            "\n            "
                        ),
                        item.type != 3
                          ? _c(
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
                          : _c("div")
                      ]),
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
                        { staticClass: "question-info", attrs: { span: 24 } },
                        [
                          _c("p", [
                            _vm._v("题型:\n              "),
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
                          _c("p", [_vm._v("分值: " + _vm._s(item.score))]),
                          _vm._v(" "),
                          _c(
                            "span",
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: { type: "primary", size: "small" },
                                  on: {
                                    click: function($event) {
                                      return _vm.clickOtherDetail(item)
                                    }
                                  }
                                },
                                [_vm._v("查看详情")]
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
            1
          ),
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
            title: "纠错",
            visible: _vm.formDialogVisible,
            "close-on-click-modal": false,
            top: "150px",
            width: "65%"
          },
          on: {
            "update:visible": function($event) {
              _vm.formDialogVisible = $event
            },
            "before-close": function($event) {
              _vm.focusStatus = false
            },
            close: _vm.restForm
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
                  value: _vm.formLoading,
                  expression: "formLoading"
                }
              ]
            },
            [
              _c(
                "el-form",
                {
                  ref: "questionForm",
                  attrs: {
                    model: _vm.questionForm,
                    rules: _vm.rules,
                    "label-width": "80px",
                    size: "small"
                  }
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { prop: "type", label: "题目类型" } },
                    [
                      _c(
                        "el-select",
                        {
                          staticClass: "fill-width",
                          attrs: { disabled: true },
                          model: {
                            value: _vm.questionForm.type,
                            callback: function($$v) {
                              _vm.$set(_vm.questionForm, "type", $$v)
                            },
                            expression: "questionForm.type"
                          }
                        },
                        [
                          _c("el-option", {
                            attrs: { value: 1, label: "单选题" }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { value: 2, label: "多选题" }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { value: 3, label: "简答题" }
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
                    { attrs: { prop: "content", label: "题干" } },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.questionForm.content,
                          callback: function($$v) {
                            _vm.$set(_vm.questionForm, "content", $$v)
                          },
                          expression: "questionForm.content"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.questionForm.type == 1
                    ? _c(
                        "div",
                        _vm._l(_vm.questionForm.answerList, function(
                          item,
                          index
                        ) {
                          return _c(
                            "el-form-item",
                            {
                              key: "" + item.key,
                              attrs: {
                                prop: "answerList." + index + ".content",
                                label: "单选项" + (index + 1),
                                rules: {
                                  required: true,
                                  message: "请输入选项描述",
                                  trigger: "blur"
                                }
                              }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "answer-wrap" },
                                [
                                  _c("el-input", {
                                    attrs: { placeholder: "请输入选项描述" },
                                    model: {
                                      value: item.content,
                                      callback: function($$v) {
                                        _vm.$set(item, "content", $$v)
                                      },
                                      expression: "item.content"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "el-radio",
                                    {
                                      staticClass: "margin-radio",
                                      attrs: { label: index },
                                      model: {
                                        value: _vm.questionForm.isCorrect,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.questionForm,
                                            "isCorrect",
                                            $$v
                                          )
                                        },
                                        expression: "questionForm.isCorrect"
                                      }
                                    },
                                    [_vm._v("设为正确答案")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "danger" },
                                      on: {
                                        click: function($event) {
                                          return _vm.deleteAnswer(item)
                                        }
                                      }
                                    },
                                    [_vm._v("删 除")]
                                  )
                                ],
                                1
                              )
                            ]
                          )
                        }),
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.questionForm.type == 2
                    ? _c(
                        "div",
                        _vm._l(_vm.questionForm.answerList, function(
                          item,
                          index
                        ) {
                          return _c(
                            "el-form-item",
                            {
                              key: "" + item.key,
                              attrs: {
                                prop: "answerList." + index + ".content",
                                label: "多选项" + (index + 1),
                                rules: {
                                  required: true,
                                  message: "请输入选项描述",
                                  trigger: "blur"
                                }
                              }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "answer-wrap" },
                                [
                                  _c("el-input", {
                                    attrs: { placeholder: "请输入选项描述" },
                                    model: {
                                      value: item.content,
                                      callback: function($$v) {
                                        _vm.$set(item, "content", $$v)
                                      },
                                      expression: "item.content"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "el-checkbox",
                                    {
                                      staticClass: "margin-radio",
                                      attrs: { label: index },
                                      model: {
                                        value: _vm.questionForm.checkList,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.questionForm,
                                            "checkList",
                                            $$v
                                          )
                                        },
                                        expression: "questionForm.checkList"
                                      }
                                    },
                                    [_vm._v("设为正确答案")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "danger" },
                                      on: {
                                        click: function($event) {
                                          return _vm.deleteAnswer(item)
                                        }
                                      }
                                    },
                                    [_vm._v("删 除")]
                                  )
                                ],
                                1
                              )
                            ]
                          )
                        }),
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.questionForm.type == 3
                    ? _c(
                        "div",
                        _vm._l(_vm.questionForm.answerList, function(
                          item,
                          index
                        ) {
                          return _c(
                            "el-form-item",
                            {
                              key: "" + item.key,
                              attrs: {
                                prop: "answerList." + index + ".content",
                                label: "答案",
                                rules: {
                                  required: true,
                                  message: "请输入简答题答案",
                                  trigger: "blur"
                                }
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: { type: "textarea" },
                                model: {
                                  value: item.content,
                                  callback: function($$v) {
                                    _vm.$set(item, "content", $$v)
                                  },
                                  expression: "item.content"
                                }
                              })
                            ],
                            1
                          )
                        }),
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "score", label: "分值" } },
                    [
                      _c("el-rate", {
                        staticClass: "flex-form-item",
                        attrs: { "show-score": "" },
                        model: {
                          value: _vm.questionForm.score,
                          callback: function($$v) {
                            _vm.$set(_vm.questionForm, "score", $$v)
                          },
                          expression: "questionForm.score"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "图片" } },
                    [
                      _c(
                        "el-upload",
                        {
                          staticClass: "avatar-wrap",
                          attrs: {
                            action: _vm.imgServer,
                            headers: _vm.token,
                            "show-file-list": false,
                            "on-success": _vm.uploadSuccess,
                            "before-upload": _vm.beforeAvatarUpload,
                            name: "upfile"
                          }
                        },
                        [
                          _vm.questionForm.picture
                            ? _c("img", {
                                staticClass: "avatar-img",
                                attrs: { src: _vm.questionForm.picture }
                              })
                            : _c("i", { staticClass: "el-icon-plus" }, [
                                _vm._v("上传图片")
                              ])
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { prop: "analysis", label: "解析" } },
                    [
                      _c("el-input", {
                        attrs: { type: "textarea" },
                        model: {
                          value: _vm.questionForm.analysis,
                          callback: function($$v) {
                            _vm.$set(_vm.questionForm, "analysis", $$v)
                          },
                          expression: "questionForm.analysis"
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
                  attrs: {
                    disabled: _vm.questionForm.type == 3 || _vm.loading,
                    type: "primary"
                  },
                  on: { click: _vm.addAnswer }
                },
                [_vm._v("添加答案")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { disabled: _vm.loading },
                  on: {
                    click: function($event) {
                      _vm.formDialogVisible = false
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
                      return _vm.submitForm("questionForm")
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6590c465", esExports)
  }
}

/***/ })

});