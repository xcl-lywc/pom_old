webpackJsonplensyn_ui([73],{

/***/ 1200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__ = __webpack_require__(1540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_24535cc6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_CreateVote_vue__ = __webpack_require__(1884);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_24535cc6_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_CreateVote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/vote_manage/vote_list/CreateVote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24535cc6", Component.options)
  } else {
    hotAPI.reload("data-v-24535cc6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(439);

var _assign2 = _interopRequireDefault(_assign);

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

exports.default = {
  props: {
    paramsId: 'add' //为add表示新建，其他的则为编辑
  },
  data: function data() {
    return {
      orgCode: sessionStorage.getItem('orgCode'),
      orgId: sessionStorage.getItem('orgId'),
      userData: JSON.parse(sessionStorage.getItem('userData')),
      isQuestionsPrompt: false, //为true显示题型提示消息
      privateFilesList: [],
      form: {
        "ballotRequire": null,
        "ballotSpecial": null,
        "createOrgCode": sessionStorage.getItem('orgCode'),
        "questions": [],
        "privateFiles": null
      },
      topicTem: {
        radioTem: { //单选
          value: '',
          type: 0, //0为单选，1为多选
          questionName: '单选题？',
          options: [{ value: null, isChecked: false, privateFiles: null }]
        },
        checkBoxTem: { //多选
          value: '',
          type: 1, //0为单选，1为多选
          questionName: '多选题？',
          maxOption: null, //最多选择个数
          minOption: null, //最少选择个数
          options: [{ optionName: null, isChecked: false, privateFiles: null }]
        }
      }
    };
  },
  mounted: function mounted() {
    this.init();
  },
  destoryed: function destoryed() {},

  methods: {
    init: function init() {
      this.paramsId != 'add' ? this.getQueryDetailById() : '';
    },

    /*
     * 根据投票Id查询详情
     */
    getQueryDetailById: function getQueryDetailById() {
      var _this = this;

      this.$request.requestAxios('get', this.$util.basePath + '/v_ballot/detail/' + this.paramsId + '/from_org/' + this.orgCode, '', function (response) {
        _this.form = response.data.data;
        if (_this.form) {
          _this.privateFilesList = _this.form.privateFiles ? JSON.parse(_this.form.privateFiles) : [];
        }
      }, function (error, status) {
        status == 200 ? _this.$message.error(error.data.meta.message) : _this.$message.error('v_ballot/detail - \u5931\u8D25');
      });
    },

    /*
     * 添题 
     * @params {number} type 题类型 //0为单选，1为多选
     */
    addQuestion: function addQuestion(type) {
      this.form.questions.push(JSON.parse((0, _stringify2.default)(this.topicTem[type])));
    },

    /*
     * 添加选项
     */
    addOption: function addOption(data) {
      data.options.push({ value: null });
    },

    /*
     * 删题,在被删除的数据中找到isDelete字段，那么数据就做成物理删除。
     * @params {number} itemData 当前被删除的数据
     * @params {number} quesIndex 需要删除的题型下标
     * @params {string} type 数据类型 为ques删除整个题，为opt只删除指定提中的某个选项
     * @params {string} optIndex 需要删除的选项下标
     */
    delQuesOrOpt: function delQuesOrOpt(itemData, quesIndex, type, optIndex) {
      if (itemData.hasOwnProperty('isDelete')) {
        // --------------- 满足条件时，将删除状态设置为true --------------
        itemData.isDelete = true;
      } else {
        if (type == 'ques') {
          this.form.questions.splice(quesIndex, 1);
        } else {
          if (this.form.questions[quesIndex].type == "radioTem") {
            this.form.questions[quesIndex].options.length <= 2 ? this.$message.warning('单选题，必须大于等于2个选项！') : this.form.questions[quesIndex].options.splice(optIndex, 1);
          } else {
            this.form.questions[quesIndex].options.length <= this.form.questions[quesIndex].maxOption ? this.$message.warning('该题必须大于等于' + this.form.questions[quesIndex].maxOption + '个选项！') : this.form.questions[quesIndex].options.splice(optIndex, 1);
          }
        }
      }
    },

    /*
     * 提交表单
     */
    submitForm: function submitForm(formName) {
      var _this2 = this;

      // debugger
      // this.form
      // return false
      this.$refs[formName].validate(function (valid) {
        if (valid && _this2._validQuestions()) {
          _this2.paramsId == 'add' ? _this2._addForm() : _this2._editForm();
        } else {
          return false;
        }
      });
    },

    /*
     * 新增
     */
    _addForm: function _addForm() {
      var _this3 = this;

      this.$request.requestAxios('post', this.$util.basePath + '/v_ballot/add/from_org/' + this.orgCode, this.form, function (response) {
        _this3.$emit('createBack', response.data.data);
      }, function (error, status) {
        status == 200 ? _this3.$message.error(error.data.meta.message) : _this3.$message.error(_this3.$util.basePath + '/v_ballot/add/from_org/' + _this3.orgCode + ' - \u5931\u8D25');
      });
    },

    /*
     * 编辑
     */
    _editForm: function _editForm() {
      var _this4 = this;

      this.$request.requestAxios('put', this.$util.basePath + '/v_ballot/update/from_org/' + this.orgCode, this.form, function (response) {
        _this4.$emit('createBack', _this4.paramsId);
      }, function (error, status) {
        status == 200 ? _this4.$message.error(error.data.meta.message) : _this4.$message.error(_this4.$util.basePath + '/v_ballot/add/from_org/' + _this4.orgCode + ' - \u5931\u8D25');
      });
    },

    /*
     * 验证题库 ，
     */
    _validQuestions: function _validQuestions() {
      var bool = true; //为true，则信息都先写完毕
      // ---------- 问卷的题必须有一个,否者显示提示信息 -------------
      !this.form.questions.length ? this.isQuestionsPrompt = true : this.isQuestionsPrompt = false;

      // ---------- 选项跟题目都不能为null --------
      $.each(this.form.questions, function (index, item) {
        // -------------------------- 将字符串转换为中文 --------------------------
        item.minOption = item.minOption ? parseInt(item.minOption) : item.minOption;
        item.maxOption = item.maxOption ? parseInt(item.maxOption) : item.maxOption;

        item.questionName ? item.isPrompt = false : item.isPrompt = true;
        !item.questionName ? bool = false : '';
        $.each(item.options, function (indexOpt, itemOpt) {
          itemOpt.optionName ? itemOpt.isPrompt = false : itemOpt.isPrompt = true;
          !itemOpt.optionName ? bool = false : '';
        });
      });
      // ----------------- 将附件转为字符串 ---------------
      this.form.privateFiles = (0, _stringify2.default)(this.privateFilesList);
      // --------------- 避免页面监听不到数据变化 -----------------
      this.form = (0, _assign2.default)({}, this.form, this.form);
      return this.form.questions.length ? bool : false;
    },

    /*
     * 附件上传成功后获取后台返回过来的数据
     * 采用了闭包的方式，将自己的参数传入在elementUI的方法中
     * @params {object} res  附件上传成功返回的的信息
     * @params {object} fileList 附件相关的信息
     * @params {string} fileKeyName 附件键名
     */
    handleAvatarSuccess: function handleAvatarSuccess(res, file, item) {
      if (item == 'privateFiles') {
        this.privateFilesList.push({ name: res.original, url: res.url });
      } else {
        item.privateFiles = (0, _stringify2.default)({ name: res.original, url: res.url });
      }
    },

    /* 删除附件
     * 采用了闭包的方式，将自己的参数传入在elementUI的方法中
     * @params {object} res  附件上传成功返回的的信息
     * @params {object} fileList 附件相关的信息
     * @params {string} fileKeyName 附件键名
     */
    handleRemove: function handleRemove(res, fileList, item) {
      if (item == 'privateFiles') {
        this.privateFilesList = fileList;
      } else {
        item.privateFiles = '';
      }
    },

    /*
    * 禁止输入负数
    */
    validateNumber: function validateNumber(evt) {
      console.log(evt.keyCode);
      if (evt.keyCode == 189 || evt.keyCode == 169 || evt.keyCode == 190 || evt.keyCode == 110 || evt.keyCode == 69 || evt.keyCode == 109 || evt.keyCode == 13) {
        // ---- 禁止输入
        evt.preventDefault();
        $(evt.target).val('');
      }
    },

    /*
     * 多选题，中最小数字的变化
     */
    minOptionChange: function minOptionChange(val, item) {
      if (item.minOption > item.maxOption) {
        item.maxOption = item.minOption;
        this._addOptions(item);
      }
    },

    /*
     * 多选题中，最大数字的变化
     */
    maxOptionChange: function maxOptionChange(val, item) {
      this._addOptions(item);
    },

    /*
     * 如果选项的个数，小于最大选择个数，那么就将选项自动添加为最大的选择个数
     */
    _addOptions: function _addOptions(item) {
      // ------------------ 让改数据的this指向变为固定的 ---------------
      var optionsLength = parseInt((0, _stringify2.default)(item.options.length));

      if (item.options.length < item.maxOption) {

        for (var i = 0; i < parseInt(item.maxOption) - optionsLength; i++) {
          item.options.push({
            optionName: null, isChecked: false, privateFiles: null
          });
        }
      }
    }
  }
};

/***/ }),

/***/ 1281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__ = __webpack_require__(1247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3fc58232_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_CreateVote_vue__ = __webpack_require__(1282);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_CreateVote_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3fc58232_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_CreateVote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/common/vote_activity_list/CreateVote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fc58232", Component.options)
  } else {
    hotAPI.reload("data-v-3fc58232", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-main",
    { staticClass: "content-manage" },
    [
      _c(
        "el-card",
        { staticClass: "box-card" },
        [
          _c(
            "el-form",
            { ref: "form", attrs: { model: _vm.form, "label-width": "100px" } },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: "投票主题: ",
                    prop: "ballotSpecial",
                    rules: [
                      {
                        required: true,
                        message: "请填写投票主题",
                        trigger: "blur"
                      }
                    ]
                  }
                },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.form.ballotSpecial,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "ballotSpecial", $$v)
                      },
                      expression: "form.ballotSpecial"
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
                    label: "投票要求: ",
                    prop: "ballotRequire",
                    rules: [
                      {
                        required: true,
                        message: "请填写投票要求",
                        trigger: "blur"
                      }
                    ]
                  }
                },
                [
                  _c("el-input", {
                    attrs: { type: "textarea" },
                    model: {
                      value: _vm.form.ballotRequire,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "ballotRequire", $$v)
                      },
                      expression: "form.ballotRequire"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "投票附件: " } },
                [
                  _c(
                    "el-upload",
                    {
                      staticClass: "upload-demo",
                      attrs: {
                        action:
                          _vm.$util.basePath +
                          "/sys/ueditor/exec?action=uploadfile",
                        headers: {
                          Authorization: "Bearer " + _vm.userData.token
                        },
                        "on-preview": _vm.handlePreview,
                        "on-remove": function(res, fileList) {
                          _vm.handleRemove(res, fileList, "privateFiles")
                        },
                        "before-remove": _vm.beforeRemove,
                        name: "upfile",
                        multiple: "",
                        limit: 100,
                        "on-exceed": _vm.handleExceed,
                        "on-success": function(res, file) {
                          _vm.handleAvatarSuccess(res, file, "privateFiles")
                        },
                        "file-list": _vm.privateFilesList.length
                          ? _vm.privateFilesList
                          : _vm.fileList
                      }
                    },
                    [
                      _c(
                        "el-button",
                        { attrs: { size: "small", type: "primary" } },
                        [_vm._v("点击上传")]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "el-upload__tip",
                          attrs: { slot: "tip" },
                          slot: "tip"
                        },
                        [_vm._v("附件大小不能超过 100MB!（可上传多个附件）")]
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
      ),
      _vm._v(" "),
      _c("el-card", { staticClass: "box-card" }, [
        _c(
          "div",
          {
            staticClass: "clearfix questions-header",
            attrs: { slot: "header" },
            slot: "header"
          },
          [
            _c("span", [_vm._v("问卷内容")]),
            _vm._v(" "),
            _vm.isQuestionsPrompt
              ? _c("span", { staticClass: "color-red" }, [_vm._v("(请添题)")])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticClass: "fr ",
                attrs: { type: "text" },
                on: {
                  click: function($event) {
                    return _vm.addQuestion("checkBoxTem")
                  }
                }
              },
              [
                _c("i", { staticClass: "el-icon-circle-plus font16" }),
                _vm._v("多选题")
              ]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticClass: "fr",
                attrs: { type: "text" },
                on: {
                  click: function($event) {
                    return _vm.addQuestion("radioTem")
                  }
                }
              },
              [
                _c("i", { staticClass: "el-icon-circle-plus font16" }),
                _vm._v("单选题")
              ]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "questions-box" },
          [
            _c(
              "el-form",
              { staticClass: "padr20", attrs: { "label-width": "50px" } },
              [
                _vm._l(_vm.form.questions, function(item, index) {
                  return (item.hasOwnProperty("isDelete")
                  ? !item.isDelete
                  : true)
                    ? _c(
                        "el-form-item",
                        {
                          key: index,
                          staticClass: "questions-box-fix",
                          attrs: { label: index + 1 + ":" }
                        },
                        [
                          _c("el-input", {
                            attrs: { type: "text" },
                            model: {
                              value: item.questionName,
                              callback: function($$v) {
                                _vm.$set(item, "questionName", $$v)
                              },
                              expression: "item.questionName"
                            }
                          }),
                          _vm._v(" "),
                          (item.hasOwnProperty("isPrompt")
                          ? item.isPrompt
                          : false)
                            ? _c("span", { staticClass: "color-red" }, [
                                _vm._v("请填写题目")
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "btn-del el-icon-error",
                            on: {
                              click: function($event) {
                                return _vm.delQuesOrOpt(item, index, "ques")
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "el-form",
                            {
                              staticClass: "mart10",
                              attrs: { "label-width": "80px" }
                            },
                            [
                              _vm._l(item.options, function(itemOpt, indexOpt) {
                                return (itemOpt.hasOwnProperty("isDelete")
                                ? !itemOpt.isDelete
                                : true)
                                  ? _c(
                                      "el-form-item",
                                      {
                                        key: indexOpt,
                                        staticClass: "options-box",
                                        attrs: {
                                          label: "选项" + (indexOpt + 1) + ":"
                                        }
                                      },
                                      [
                                        _c("el-input", {
                                          staticStyle: {
                                            width: "350px",
                                            float: "left"
                                          },
                                          attrs: { type: "text" },
                                          model: {
                                            value: itemOpt.optionName,
                                            callback: function($$v) {
                                              _vm.$set(
                                                itemOpt,
                                                "optionName",
                                                $$v
                                              )
                                            },
                                            expression: "itemOpt.optionName"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "el-upload",
                                          {
                                            staticClass:
                                              "upload-demo marb20 marl20",
                                            staticStyle: { float: "left" },
                                            attrs: {
                                              action:
                                                _vm.$util.basePath +
                                                "/sys/ueditor/exec?action=uploadfile",
                                              headers: {
                                                Authorization:
                                                  "Bearer " + _vm.userData.token
                                              },
                                              "on-preview": _vm.handlePreview,
                                              "on-remove": function(
                                                res,
                                                fileList
                                              ) {
                                                _vm.handleRemove(
                                                  res,
                                                  fileList,
                                                  itemOpt
                                                )
                                              },
                                              "before-remove": _vm.beforeRemove,
                                              name: "upfile",
                                              multiple: "",
                                              limit: 1,
                                              "on-exceed": _vm.handleExceed,
                                              "on-success": function(
                                                res,
                                                file
                                              ) {
                                                _vm.handleAvatarSuccess(
                                                  res,
                                                  file,
                                                  itemOpt
                                                )
                                              },
                                              "file-list": itemOpt.privateFiles
                                                ? [
                                                    JSON.parse(
                                                      itemOpt.privateFiles
                                                    )
                                                  ]
                                                : _vm.fileList
                                            }
                                          },
                                          [
                                            _c(
                                              "el-button",
                                              {
                                                attrs: {
                                                  size: "small",
                                                  type: "primary"
                                                }
                                              },
                                              [_vm._v("点击上传")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass: "el-upload__tip",
                                                attrs: { slot: "tip" },
                                                slot: "tip"
                                              },
                                              [
                                                _vm._v(
                                                  "附件大小不能超过 100MB!（只可上传一个附件）"
                                                )
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        (itemOpt.hasOwnProperty("isPrompt")
                                        ? itemOpt.isPrompt
                                        : false)
                                          ? _c(
                                              "span",
                                              { staticClass: "color-red" },
                                              [_vm._v("请填写选项")]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c("i", {
                                          staticClass: "btn-del el-icon-error",
                                          on: {
                                            click: function($event) {
                                              return _vm.delQuesOrOpt(
                                                itemOpt,
                                                index,
                                                "opt",
                                                indexOpt
                                              )
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e()
                              }),
                              _vm._v(" "),
                              _c(
                                "el-form-item",
                                [
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", size: "mini" },
                                      on: {
                                        click: function($event) {
                                          return _vm.addOption(item)
                                        }
                                      }
                                    },
                                    [_vm._v("添加选项")]
                                  )
                                ],
                                1
                              )
                            ],
                            2
                          ),
                          _vm._v(" "),
                          item.type == 1
                            ? _c(
                                "div",
                                { staticClass: "marl20 padl20" },
                                [
                                  _vm._v("\n            最少选择 "),
                                  _c("el-input", {
                                    staticClass: "line",
                                    staticStyle: { width: "100px" },
                                    attrs: { type: "number", min: "1" },
                                    on: {
                                      change: function($event) {
                                        return _vm.minOptionChange($event, item)
                                      }
                                    },
                                    nativeOn: {
                                      keyup: function($event) {
                                        return _vm.validateNumber($event)
                                      }
                                    },
                                    model: {
                                      value: item.minOption,
                                      callback: function($$v) {
                                        _vm.$set(item, "minOption", $$v)
                                      },
                                      expression: "item.minOption"
                                    }
                                  }),
                                  _vm._v(" 个,\n\n            最多选择 "),
                                  _c("el-input", {
                                    staticClass: "line",
                                    staticStyle: { width: "100px" },
                                    attrs: {
                                      type: "number",
                                      min: item.minOption
                                    },
                                    on: {
                                      change: function($event) {
                                        return _vm.maxOptionChange($event, item)
                                      }
                                    },
                                    nativeOn: {
                                      keyup: function($event) {
                                        return _vm.validateNumber($event)
                                      }
                                    },
                                    model: {
                                      value: item.maxOption,
                                      callback: function($$v) {
                                        _vm.$set(item, "maxOption", $$v)
                                      },
                                      expression: "item.maxOption"
                                    }
                                  }),
                                  _vm._v(" 个\n          ")
                                ],
                                1
                              )
                            : _vm._e()
                        ],
                        1
                      )
                    : _vm._e()
                }),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  [
                    _c(
                      "el-button",
                      {
                        staticClass: "marr20",
                        attrs: { type: "primary", size: "mini" },
                        on: {
                          click: function($event) {
                            return _vm.submitForm("form")
                          }
                        }
                      },
                      [_vm._v("提交")]
                    ),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      { attrs: { to: { path: "/vote_index/vote_list" } } },
                      [
                        _c(
                          "el-button",
                          { attrs: { type: "primary", size: "mini" } },
                          [_vm._v("返回")]
                        )
                      ],
                      1
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
      ])
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3fc58232", esExports)
  }
}

/***/ }),

/***/ 1540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CreateVote = __webpack_require__(1281);

var _CreateVote2 = _interopRequireDefault(_CreateVote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    'create-vote': _CreateVote2.default
  },
  data: function data() {
    return {
      paramsId: this.$route.params.id //为add时表示，新增投票，否者为编辑
    };
  },

  methods: {
    /*
     * 选票回调
     */
    createBackFun: function createBackFun(data) {
      var _this = this;

      this.$message.success({ message: '保存成功，将跳转到列表页！', duration: 1000 });
      setTimeout(function () {
        _this.$router.push({ path: '/vote_index/vote_list' });
      }, 1500);
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

/***/ }),

/***/ 1884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("create-vote", {
    attrs: { paramsId: _vm.paramsId },
    on: { createBack: _vm.createBackFun }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-24535cc6", esExports)
  }
}

/***/ })

});