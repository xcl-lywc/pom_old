webpackJsonplensyn_ui([96],{

/***/ 1241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Feedback_vue__ = __webpack_require__(1588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Feedback_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Feedback_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Feedback_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Feedback_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_34f92d01_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Feedback_vue__ = __webpack_require__(1987);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1985)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Feedback_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_34f92d01_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Feedback_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/maintenanceSystem/Feedback.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-34f92d01", Component.options)
  } else {
    hotAPI.reload("data-v-34f92d01", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1588:
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

exports.default = {
  data: function data() {
    return {
      loading: false,
      buildForm: { //新建表单
        enclosure: null,
        desc: null,
        tel: null,
        name: null
      },
      projectFunctionList: null, //产品功能列表
      defaultFunctionProps: {
        children: 'childrens',
        label: 'name'
      },
      addList: null, //增加的子功能列表（子节点）
      expandedKeysArr: [] //展开节点的数组
    };
  },

  methods: {
    //-------------------------------------------------------------------------------------上传文件
    /* 
      上传文件前，限制用户上传的文件格式
     */
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type === 'image/jpeg';
      var isPNG = file.type === 'image/png';

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      return isJPG || isPNG;
    },

    /* 
      自定义文件上传
    */
    uploadFile: function uploadFile(param) {
      var _this = this;

      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("multipartFile", fileObj);
      this.axios.post(this.common.msBasePath + '/other/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(function (response) {
        _this.$message.success("文件上传成功！！", 20);
        _this.buildForm.enclosure = response.data.data;
      }).catch(function (error) {
        _this.$message.error(error);
      });
    },


    //-------------------------------------------------------------------------------------新建反馈信息
    //获取发生位置的id数组
    getCheckedKeys: function getCheckedKeys() {
      this.function = this.$refs.tree.getCheckedKeys();
    },

    //清空发生位置的选择项
    resetChecked: function resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    /*
      提交
    */
    submitForm: function submitForm(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this2.getCheckedKeys(); //获取发生位置的id数组
          if (_this2.function.length != 0) {
            var form = {
              title: _this2.buildForm.name,
              enclosure: _this2.buildForm.enclosure,
              detailed: _this2.buildForm.desc,
              phone: _this2.buildForm.tel,
              function: _this2.function.join(","),
              project_id: _this2.activeIndex ? _this2.activeIndex : null,
              deploy_id: 1
              /*"backcontent": "string",
              "checktime": "2019-01-10T09:18:15.648Z",
              "content": "string",*/
            };
            _this2.axios.post(_this2.common.msBasePath + '/other/insert', form).then(function (response) {
              if (response.data.meta.code === 0) {
                _this2.$message.success('新建反馈信息成功！！！', 20);
              } else {
                _this2.$message.error(response.data.meta.message, 20);
              }
            }).catch(function (error) {
              _this2.$message.error(error);
            });
          } else {
            _this2.$message.error("新建反馈信息的发生位置未选择！！！");
          }
        } else {
          return false;
        }
      });
    },

    /*
      重置
    */

    resetForm: function resetForm(formName) {
      this.getFunctionList(); //查询功能列表(一级)
      this.resetChecked(); //清空发生位置的选择项
      this.$refs[formName].resetFields(); //清空表单信息
    },


    //-------------------------------------------------------------------------------------功能列表
    /* 
      GET  查询一级功能列表
    */
    getFunctionList: function getFunctionList() {
      var _this3 = this;

      this.loading = true;
      this.axios.get(this.common.msBasePath + '/other/show', { params: { id: null } }).then(function (response) {
        if (response.data.meta.code === 0) {
          _this3.projectFunctionList = response.data.data ? response.data.data : null; //一级产品功能列表
        } else {
          _this3.$message.error(response.data.meta.message, 20);
        }
        _this3.loading = false;
      }).catch(function (error) {
        _this3.$message.error(error);
        _this3.loading = false;
      });
    },
    handleNodeClick: function handleNodeClick(data, node, VueComponent) {
      var _this4 = this;

      if (data.childrens.length === 0) {
        this.loading = true;
        this.axios.get(this.common.msBasePath + '/other/show', { params: { id: data.id } }).then(function (response) {
          //GET  根据id查询功能列表（一级功能列表除外）
          if (response.data.meta.code === 0) {
            var addList = response.data.data ? response.data.data : null; //增加的子功能列表（子节点）
            if (addList.length === 0) {
              _this4.$message.info('该发生位置没有下一级列表...', 20);
            } else {

              _this4.expandedKeysArr.push(data.id);
              if (_this4.expandedKeysArr.length > 1) {
                _this4.expandedKeysArr = _this4.expandedKeysArr.slice(_this4.expandedKeysArr.length - 1);
              }

              if (!data.childrens) {
                _this4.$set(data, 'childrens', []);
              }
              for (var i = 0; i < addList.length; i++) {
                data.childrens.push(addList[i]);
              }
            }
          } else {
            _this4.$message.error(response.data.meta.message, 20);
          }
          setTimeout(function () {
            _this4.loading = false;
          }, 500);
        }).catch(function (error) {
          _this4.$message.error(error);
          _this4.loading = false;
        });
      }
    },
    handleNodeCheckedClick: function handleNodeCheckedClick(data, val) {
      var _this5 = this;

      console.log(data);
      console.log(val);
      console.log(data.childrens.length);
      if (val.checkedKeys.indexOf(data.id) > -1) {
        if (data.childrens.length === 0) {
          this.loading = true;
          this.axios.get(this.common.msBasePath + '/other/show', { params: { id: data.id } }).then(function (response) {
            //GET  根据id查询功能列表（一级功能列表除外）
            if (response.data.meta.code === 0) {
              var addList = response.data.data ? response.data.data : null; //增加的子功能列表（子节点）
              if (addList.length === 0) {
                _this5.$message.info('该发生位置没有下一级列表...', 20);
              } else {

                _this5.expandedKeysArr.push(data.id);
                if (_this5.expandedKeysArr.length > 1) {
                  _this5.expandedKeysArr = _this5.expandedKeysArr.slice(_this5.expandedKeysArr.length - 1);
                }

                if (!data.childrens) {
                  _this5.$set(data, 'childrens', []);
                }
                for (var i = 0; i < addList.length; i++) {
                  data.childrens.push(addList[i]);
                }
              }
            } else {
              _this5.$message.error(response.data.meta.message, 20);
            }
            setTimeout(function () {
              _this5.loading = false;
            }, 500);
          }).catch(function (error) {
            _this5.$message.error(error);
            _this5.loading = false;
          });
        }
      }
    }
  },
  mounted: function mounted() {
    //清空信息
    if (this.$refs['buildForm']) {
      this.$refs['buildForm'].resetFields();
    }
    //查询功能列表(一级)
    this.getFunctionList();
  }
};

/***/ }),

/***/ 1985:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1986);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("d95cde00", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-34f92d01\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Feedback.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-34f92d01\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Feedback.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1986:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "/* 新建反馈信息 */\n.build-form {\n  padding: 20px;\n  box-sizing: border-box;\n}\n.build-form .form-box {\n  border-right: 1px solid #ddd;\n  padding-right: 20px;\n}\n.build-form .form-box .avatar-uploader .el-upload {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.build-form .form-box .avatar-uploader .el-upload:hover {\n  border-color: #409EFF;\n}\n.build-form .form-box .avatar-uploader-icon {\n  font-size: 28px;\n  color: #8c939d;\n  width: 150px;\n  height: 150px;\n  line-height: 150px;\n  text-align: center;\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  background: white;\n}\n.build-form .form-box .avatar-uploader-icon:hover {\n  border-color: #409EFF;\n}\n.build-form .form-box .avatar {\n  width: 150px;\n  height: 150px;\n  display: block;\n}\n.build-form .function-box {\n  box-sizing: border-box;\n}\n.build-form .function-box .function-box-title .el-form-item {\n  margin-bottom: 0;\n}\n.build-form .build-btns {\n  margin: 10px auto 0;\n  text-align: right;\n  border-top: 1px solid #ddd;\n  padding-top: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 1987:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "feedback" }, [
    _c(
      "div",
      { staticClass: "build-form" },
      [
        _c(
          "el-row",
          { attrs: { gutter: 20 } },
          [
            _c("el-col", { attrs: { span: 14 } }, [
              _c(
                "div",
                { staticClass: "form-box" },
                [
                  _c(
                    "el-form",
                    {
                      ref: "buildForm",
                      staticClass: "demo-dynamic",
                      attrs: {
                        model: _vm.buildForm,
                        "label-width": "100px",
                        size: "middle"
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "name",
                            label: "标题：",
                            rules: [
                              {
                                required: true,
                                message: "请输入标题",
                                trigger: "blur"
                              }
                            ]
                          }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.buildForm.name,
                              callback: function($$v) {
                                _vm.$set(_vm.buildForm, "name", $$v)
                              },
                              expression: "buildForm.name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "enclosure",
                            label: "图片：",
                            rules: [
                              {
                                required: true,
                                message: "请上传图片",
                                trigger: "blur"
                              }
                            ]
                          }
                        },
                        [
                          _c(
                            "el-upload",
                            {
                              staticClass: "avatar-uploader",
                              attrs: {
                                action: _vm.common.basePath + "/file/uplode",
                                "show-file-list": false,
                                "auto-upload": true,
                                multiple: "",
                                limit: 9999,
                                "before-upload": _vm.beforeAvatarUpload,
                                "http-request": _vm.uploadFile
                              }
                            },
                            [
                              _vm.buildForm.enclosure
                                ? _c("img", {
                                    staticClass: "avatar",
                                    attrs: {
                                      src:
                                        "http://192.168.31.9:10004" +
                                        _vm.buildForm.enclosure
                                    }
                                  })
                                : _c("i", {
                                    staticClass:
                                      "el-icon-plus avatar-uploader-icon"
                                  })
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "desc",
                            label: "问题描述：",
                            rules: [
                              {
                                required: true,
                                message: "请输入问题描述的内容",
                                trigger: "blur"
                              },
                              {
                                min: 1,
                                max: 255,
                                message: "长度在 1 到 255 个字符",
                                trigger: "blur"
                              }
                            ]
                          }
                        },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea", rows: "6" },
                            model: {
                              value: _vm.buildForm.desc,
                              callback: function($$v) {
                                _vm.$set(_vm.buildForm, "desc", $$v)
                              },
                              expression: "buildForm.desc"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "tel",
                            label: "你的手机：",
                            rules: [
                              {
                                required: true,
                                message: "请输入你的手机号",
                                trigger: "blur"
                              },
                              {
                                pattern: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/,
                                message: "手机号不符合规范"
                              }
                            ]
                          }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.buildForm.tel,
                              callback: function($$v) {
                                _vm.$set(_vm.buildForm, "tel", $$v)
                              },
                              expression: "buildForm.tel"
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
              )
            ]),
            _vm._v(" "),
            _c("el-col", { attrs: { span: 10 } }, [
              _c(
                "div",
                { staticClass: "function-box" },
                [
                  _c(
                    "el-form",
                    { staticClass: "function-box-title" },
                    [
                      _c("el-form-item", {
                        staticClass: "is-required",
                        attrs: { label: "发生位置：" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("el-tree", {
                    directives: [
                      {
                        name: "loading",
                        rawName: "v-loading",
                        value: _vm.loading,
                        expression: "loading"
                      }
                    ],
                    ref: "tree",
                    staticStyle: { "max-height": "400px", padding: "10px 5px" },
                    attrs: {
                      data: _vm.projectFunctionList,
                      "show-checkbox": "",
                      "node-key": "id",
                      "default-expanded-keys": _vm.expandedKeysArr,
                      "highlight-current": "",
                      props: _vm.defaultFunctionProps
                    },
                    on: {
                      "node-click": _vm.handleNodeClick,
                      check: _vm.handleNodeCheckedClick
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var node = ref.node
                          var data = ref.data
                          return _c(
                            "span",
                            { staticClass: "custom-tree-node" },
                            [
                              _c(
                                "span",
                                { on: { click: function($event) {} } },
                                [_vm._v(_vm._s(node.label))]
                              )
                            ]
                          )
                        }
                      }
                    ])
                  })
                ],
                1
              )
            ])
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "build-btns" },
          [
            _c(
              "el-button",
              {
                attrs: { size: "small" },
                on: {
                  click: function($event) {
                    return _vm.resetForm("buildForm")
                  }
                }
              },
              [_vm._v("重 置")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                attrs: { type: "primary", size: "small" },
                on: {
                  click: function($event) {
                    return _vm.submitForm("buildForm")
                  }
                }
              },
              [_vm._v("提 交")]
            )
          ],
          1
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-34f92d01", esExports)
  }
}

/***/ })

});