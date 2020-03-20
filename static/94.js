webpackJsonplensyn_ui([94],{

/***/ 1236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_StartTesting_vue__ = __webpack_require__(1583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_StartTesting_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_StartTesting_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_StartTesting_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_StartTesting_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4c0ba77e_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_StartTesting_vue__ = __webpack_require__(1974);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1972)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4c0ba77e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_StartTesting_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4c0ba77e_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_StartTesting_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/my_testing/StartTesting.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c0ba77e", Component.options)
  } else {
    hotAPI.reload("data-v-4c0ba77e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1583:
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

exports.default = {
  data: function data() {
    return {
      orgId: JSON.parse(sessionStorage.getItem("userData")).orgId,
      orgCode: JSON.parse(sessionStorage.getItem("userData")).orgCode,
      timeClock: null,

      detailData: {
        "id": 15,
        "overplusTime": 60 * 60 * 1000, //默认剩余考试时间
        "questMapList": {
          "1": [],
          "2": [],
          "3": []
        },
        "eqList": []
      },
      currentIndex: 0, // 当前操作的题目index
      currentQuestion: {
        examinContent: ""
      }, // 当前操作的题目
      currentRadio: null,
      currentCheckBox: [],
      currentInput: null
    };
  },

  watch: {
    $route: function $route(to, from) {
      //debugger
      // if(from.name == "Start_Testing") {
      //   this.$message.info("nideianjile确认")
      //   // this.$confirm("确认离开?", "离开本页后计时不会停止!",{
      //   //   confirmButtonText: "确定",
      //   //   cancelButtonText: "留在本页",
      //   //   type: "warning"
      //   // }).then(() => {
      //   //   this.$message.info("nideianjile确认")
      //   // }).catch(() => {
      //   //   this.$message.info("nideianjile取消")
      //   // })
      // }
    },

    currentIndex: {
      handler: function handler(newV, oldV) {
        this.$set(this, "currentQuestion", this.detailData.eqList[newV]);
        if (this.currentQuestion.type == 3) {
          this.currentInput = this.currentQuestion.examinContent;
        }
      },

      deep: true
    }
  },
  computed: {
    // 显示当前已答题目对应的答案(已答过题目)
    /**
     * [currentAnswer description]
     * @return {string} 直接展示的字符串
     */
    currentAnswer: function currentAnswer() {
      var self = this;
      var result = null;
      switch (self.currentQuestion.type) {
        case 1:
          self.currentQuestion.answerList.forEach(function (item, index) {
            if (item.id == self.currentQuestion.examinContent) {
              result = self.returnLetter(index);
            }
          });
          break;
        case 2:
          var answerIdArray = this.currentQuestion.examinContent.split(","); // 答案Id数组
          var resultArray = [];
          if (answerIdArray) {
            self.currentQuestion.answerList.forEach(function (item, index) {
              //循环题目列表
              answerIdArray.forEach(function (itemInner, indexInner) {
                // 循环答案Id数组
                if (item.id == itemInner) {
                  resultArray.push(self.returnLetter(index));
                }
              });
            });
          }
          result = resultArray.join(",");
          break;
        // case 3:
        //   result = self.currentQuestion.examinContent
        //   break;
        default:
          break;
      }
      return result;
    }
  },
  mounted: function mounted() {
    window.st = this;
    this.$set(this, "currentQuestion", this.detailData.eqList[0]);
    //设置当前的剩余时间
    //this.timeClock = setInterval(this.time, 1000)
    this.getDetailData(0);
  },

  methods: {
    /**
     * 验证时间是否超时
     * @return {[type]} [description]
     */
    time: function time() {
      if (this.detailData.overplusTime > 0) {
        this.detailData.overplusTime -= 1000;
      } else {
        clearInterval(this.timeClock);
        alert("考试结束! 即将退出本页");
        this.$router.push({ name: "My_Testing_List" });
      }
    },

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
     * 获取详情数据
     * @param  {number} index 需要展示的题目index
     * @return {[type]}       [description]
     */
    getDetailData: function getDetailData(index) {
      var _this = this;

      var self = this;

      self.detailLoading = true;

      var config = {
        id: self.$route.params.id,
        formData: 1,
        taskId: 1,
        instanceId: 1
      };

      self.$request.requestAxios('patch', basePath + "/examinees/join/update/from_org/" + self.orgCode, config, function (response) {
        self.detailData = response.data.data;
        _this.$set(_this, "currentQuestion", _this.detailData.eqList[index]); // 将index对应的题目写入currentQuestion
        self.detailLoading = false;
      }, function (error) {
        self.$message.error(error.data.meta.message);
        self.detailLoading = false;
      });
    },
    finishTest: function finishTest() {
      var _this2 = this;

      this.$confirm("确认结束答题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "留在本页",
        type: "warning"
      }).then(function () {
        _this2.submitExam();
      }).catch(function () {
        _this2.$message.info("请继续答题");
      });
    },

    /**
     * 提交考试结束
     * @return {[type]} [description]
     */
    submitExam: function submitExam() {
      var _this3 = this;

      var self = this;

      var config = {
        id: self.detailData.id,
        formData: 1,
        taskId: 1,
        instanceId: 1
      };

      self.$request.requestAxios('patch', basePath + "/examinees/end/update/from_org/" + self.orgCode, config, function (response) {
        _this3.$router.push({ name: "My_Testing_List" });
      }, function (error) {
        self.$message.error(error.data.meta.message);
        self.detailLoading = false;
      });
    },
    changeQuestion: function changeQuestion(type) {
      if (type == "forward") {
        this.currentIndex--;
      } else {
        this.currentIndex++;
      }
      this.currentRadio = null;
      this.currentCheckBox = [];
    },

    /**
     * 点击提交本题
     * @return {[type]} [description]
     */
    submitAnswer: function submitAnswer() {
      var self = this;

      var config = {
        content: null,
        questionId: self.currentQuestion.id,
        examineeId: self.detailData.id
      };

      switch (self.currentQuestion.type) {
        case 1:
          config.content = self.currentRadio;
          break;
        case 2:
          config.content = self.currentCheckBox.join(",");
          break;
        case 3:
          config.content = self.currentInput;
          break;
      }

      self.$request.requestAxios('patch', basePath + "/examinee_answers/examinee_answers/update/" + self.currentQuestion.examinAnsId, config, function (response) {
        self.$message.success("已提交本题");
        self.getDetailData(self.currentIndex);
        // self.detailData      = response.data.data;
        //self.currentQuestion = self.detailData // 将第一题写入
        // self.detailLoading   = false
      }, function (error) {
        self.$message.error(error.data.meta.message);
        self.detailLoading = false;
      });

      // 
    }
  }
};

/***/ }),

/***/ 1972:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1973);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("778c12bc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c0ba77e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./StartTesting.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4c0ba77e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./StartTesting.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1973:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.content-area[data-v-4c0ba77e] {\n  background: #fff;\n}\n.text-blue[data-v-4c0ba77e] {\n  color: #409EFF;\n}\n.detail-wrap[data-v-4c0ba77e] {\n  padding: 10px;\n}\n.top-area[data-v-4c0ba77e] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-content: center;\n}\n.question-title[data-v-4c0ba77e] {\n  font-size: 16px;\n  margin: 10px 0;\n}\n.finish-test-button[data-v-4c0ba77e] {\n  margin-top: 15px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1974:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content-area" }, [
    _vm.detailData.eqList.length > 0
      ? _c(
          "div",
          [
            _c(
              "div",
              { staticClass: "top-area" },
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "default", disabled: _vm.currentIndex == 0 },
                    on: {
                      click: function($event) {
                        return _vm.changeQuestion("forward")
                      }
                    }
                  },
                  [_vm._v("上一题")]
                ),
                _vm._v(" "),
                _c(
                  "el-button",
                  {
                    attrs: {
                      type: "default",
                      disabled:
                        _vm.currentIndex + 1 == _vm.detailData.eqList.length
                    },
                    on: {
                      click: function($event) {
                        return _vm.changeQuestion("next")
                      }
                    }
                  },
                  [_vm._v("下一题")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "detail-wrap" },
              [
                _vm._v(
                  "\n      第" + _vm._s(_vm.currentIndex + 1) + "题\n      "
                ),
                _vm.currentQuestion
                  ? _c(
                      "el-row",
                      { attrs: { gutter: 10 } },
                      [
                        _c(
                          "el-col",
                          { attrs: { span: 18 } },
                          [
                            _c("h4", { staticClass: "question-title" }, [
                              _vm._v(_vm._s(_vm.currentQuestion.content))
                            ]),
                            _vm._v(" "),
                            _vm.currentQuestion.type != 3
                              ? _c(
                                  "ul",
                                  _vm._l(
                                    _vm.currentQuestion.answerList,
                                    function(item, index) {
                                      return _c("li", { key: item.id }, [
                                        _vm.currentQuestion.type == 1
                                          ? _c(
                                              "p",
                                              [
                                                _c(
                                                  "el-radio",
                                                  {
                                                    attrs: {
                                                      disabled:
                                                        _vm.currentQuestion
                                                          .examinContent,
                                                      label: item.id
                                                    },
                                                    model: {
                                                      value: _vm.currentRadio,
                                                      callback: function($$v) {
                                                        _vm.currentRadio = $$v
                                                      },
                                                      expression: "currentRadio"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.returnLetter(index)
                                                      ) +
                                                        "、" +
                                                        _vm._s(item.content)
                                                    )
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.currentQuestion.type == 2
                                          ? _c(
                                              "p",
                                              [
                                                _c(
                                                  "el-checkbox-group",
                                                  {
                                                    model: {
                                                      value:
                                                        _vm.currentCheckBox,
                                                      callback: function($$v) {
                                                        _vm.currentCheckBox = $$v
                                                      },
                                                      expression:
                                                        "currentCheckBox"
                                                    }
                                                  },
                                                  [
                                                    _c(
                                                      "el-checkbox",
                                                      {
                                                        attrs: {
                                                          disabled:
                                                            _vm.currentQuestion
                                                              .examinContent,
                                                          label: item.id
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.returnLetter(
                                                              index
                                                            )
                                                          ) +
                                                            "、" +
                                                            _vm._s(item.content)
                                                        )
                                                      ]
                                                    )
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          : _vm._e()
                                      ])
                                    }
                                  ),
                                  0
                                )
                              : _c("el-input", {
                                  attrs: {
                                    disabled:
                                      _vm.currentQuestion.examinContent &&
                                      _vm.currentQuestion.type == 3,
                                    type: "textarea"
                                  },
                                  model: {
                                    value: _vm.currentInput,
                                    callback: function($$v) {
                                      _vm.currentInput = $$v
                                    },
                                    expression: "currentInput"
                                  }
                                })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "el-col",
                          { staticClass: "img-wrap", attrs: { span: 6 } },
                          [
                            !_vm.detailData.picture
                              ? _c("div", { staticClass: "no-img-div" }, [
                                  _vm._v("暂无图片")
                                ])
                              : _c("img", {
                                  staticStyle: {
                                    height: "100px",
                                    width: "100px"
                                  },
                                  attrs: {
                                    src: _vm.currentQuestion.picture,
                                    alt: ""
                                  }
                                })
                          ]
                        ),
                        _vm._v(" "),
                        _vm.currentQuestion.type == 1
                          ? _c("el-col", { attrs: { span: 24 } }, [
                              _vm.currentQuestion.examinContent
                                ? _c("p", [
                                    _vm._v(
                                      "您的答案: " + _vm._s(_vm.currentAnswer)
                                    )
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.currentQuestion.type == 2
                          ? _c("el-col", { attrs: { span: 24 } }, [
                              _vm.currentQuestion.examinContent
                                ? _c("p", [
                                    _vm._v(
                                      "您的答案: " + _vm._s(_vm.currentAnswer)
                                    )
                                  ])
                                : _vm._e()
                            ])
                          : _vm._e()
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "el-button",
                  {
                    staticStyle: { margin: "10px 0" },
                    attrs: {
                      disabled:
                        _vm.currentQuestion.examinContent ||
                        (!_vm.currentInput && _vm.currentQuestion.type == 3),
                      type: "primary",
                      size: "small"
                    },
                    on: { click: _vm.submitAnswer }
                  },
                  [_vm._v("提交答题")]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "bottom-index" }, [
              _c("div", [
                _vm._v("\n        单选题:\n        "),
                _c(
                  "div",
                  _vm._l(_vm.detailData.questMapList[1], function(item, index) {
                    return _c(
                      "el-button",
                      {
                        key: index + " 单选目录",
                        attrs: {
                          size: "small",
                          type:
                            item.index == _vm.currentIndex
                              ? "primary"
                              : "default"
                        },
                        on: {
                          click: function($event) {
                            _vm.currentIndex = item.index
                          }
                        }
                      },
                      [_vm._v("第" + _vm._s(item.index + 1) + "题")]
                    )
                  }),
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", [
                _vm._v("\n        多选题:\n        "),
                _c(
                  "div",
                  _vm._l(_vm.detailData.questMapList[2], function(item, index) {
                    return _c(
                      "el-button",
                      {
                        key: index + " 多选目录",
                        attrs: {
                          size: "small",
                          type:
                            item.index == _vm.currentIndex
                              ? "primary"
                              : "default"
                        },
                        on: {
                          click: function($event) {
                            _vm.currentIndex = item.index
                          }
                        }
                      },
                      [_vm._v("第" + _vm._s(item.index + 1) + "题")]
                    )
                  }),
                  1
                )
              ]),
              _vm._v(" "),
              _c("div", [
                _vm._v("\n        简答题:\n        "),
                _c(
                  "div",
                  _vm._l(_vm.detailData.questMapList[3], function(item, index) {
                    return _c(
                      "el-button",
                      {
                        key: index + " 简答目录",
                        attrs: {
                          size: "small",
                          type:
                            item.index == _vm.currentIndex
                              ? "primary"
                              : "default"
                        },
                        on: {
                          click: function($event) {
                            _vm.currentIndex = item.index
                          }
                        }
                      },
                      [_vm._v("第" + _vm._s(item.index + 1) + "题")]
                    )
                  }),
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticClass: "finish-test-button",
                attrs: { type: "primary" },
                on: { click: _vm.finishTest }
              },
              [_vm._v("结束考试")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticClass: "finish-test-button",
                attrs: { type: "default" },
                on: {
                  click: function($event) {
                    return _vm.$router.push({ name: "My_Testing_List" })
                  }
                }
              },
              [_vm._v("返回")]
            )
          ],
          1
        )
      : _c(
          "div",
          [
            _c(
              "el-button",
              {
                attrs: { type: "primary" },
                on: {
                  click: function($event) {
                    return _vm.$router.push({ name: "My_Testing_List" })
                  }
                }
              },
              [_vm._v("回到考试列表")]
            )
          ],
          1
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-4c0ba77e", esExports)
  }
}

/***/ })

});