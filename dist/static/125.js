webpackJsonplensyn_ui([125],{

/***/ 1145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ARosterOfPartyMembers_vue__ = __webpack_require__(1477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ARosterOfPartyMembers_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ARosterOfPartyMembers_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ARosterOfPartyMembers_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ARosterOfPartyMembers_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3e85c36e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ARosterOfPartyMembers_vue__ = __webpack_require__(1726);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_ARosterOfPartyMembers_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_3e85c36e_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_ARosterOfPartyMembers_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/organization/ARosterOfPartyMembers.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e85c36e", Component.options)
  } else {
    hotAPI.reload("data-v-3e85c36e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1477:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      resource: JSON.parse(sessionStorage.getItem('resource')),
      resourceManage: { //权限管理, 为false按钮不能操作
        isAddMember: false,
        isUpdateMember: false,
        isDeleteMember: false
      },
      isLoad: true,
      orgId: sessionStorage.getItem('orgId'),
      orgCode: sessionStorage.getItem('orgCode'),
      userData: JSON.parse(sessionStorage.getItem('userData')),
      addOrUploadDialogVisible: false, //新建或者修改花名册弹框
      dialogType: 'add', //  add为新增，update为修改
      tableData: [], //花名册数据,
      companyUser: [], //组织下所有公司成员
      orgChlidrensimple: [], //支部数据
      newOrupdateUrl: null,
      lostOptions: [//失联状态
      { label: '是', value: 1 }, { label: '否', value: 0 }, { label: '请选择', value: 2 }],
      mobileOptions: [//失联状态
      { label: '是', value: 1 }, { label: '否', value: 0 }, { label: '请选择', value: 2 }],
      form: { // 新增/修改花名册的筛选条件
        "applicationDate": null,
        "introducer": null,
        "joinPartyDate": null,
        "lost": true,
        "lostTime": null,
        "mobile": true,
        "partyOrgsId": null,
        "qualificationTime": null,
        "userId": null
      },
      formScreen: { // 查询列表的筛选条件
        orgId: sessionStorage.getItem('orgId'),
        userName: null,
        account: null,
        smallAge: null,
        largeAge: null,
        smallPartyAge: null,
        largePartyAge: null,
        lost: 2,
        mobile: 2
      },
      rules: { //验证信息
        applicationDate: [{ required: true, message: '请选择申请时间', trigger: 'change' }],
        introducer: [{ required: true, message: '请输入介绍人', trigger: 'blur' }],
        joinPartyDate: [{ required: true, message: '请选择入党时间' }],
        lostTime: [{ required: true, message: '请选择失联时间' }],
        qualificationTime: [{ required: true, message: '请选择转正时间' }]
      }
    };
  },
  mounted: function mounted() {
    // ---- 获取权限 ----
    this.resourceFun();

    this.partyorgMembers();
    this.getCompanyUser();
    this.getQueryOrgList();
  },

  methods: {
    /*
    * 查询党员花名册
    */
    partyorgMembers: function partyorgMembers() {
      var self = this;
      self.$request.requestAxios('post', basePath + '/party_member_infos/all/formore', self.formScreen, function (response) {
        var responseData = response.data;
        self.tableData = responseData.data;
        self.isLoad = false;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_member_infos/all/formore');
        self.isLoad = false;
      });
    },

    /*
    * 点击查询按钮，查询数据
    */
    onSubmitPartyorgMembers: function onSubmitPartyorgMembers() {
      this.partyorgMembers();
    },

    /*
    * 显示党员花名册弹框
    * @params {string} title 弹框title
    * @params {object} rowData 当前需要修改的数据
    */
    addOrUploadDialogVisibleFun: function addOrUploadDialogVisibleFun(type, rowData) {
      this.dialogType = type;
      console.log(this.dialogType);
      this.addOrUploadDialogVisible = true;
      // ---- add 为新增，update为编辑 -----
      this.dialogType == 'add' ? this._initForm() : this.getQueryById(rowData);
    },

    /*
    * 查询指定ID的党员花名册
    * @param { object } rowData 当前需要修改的数据
    */
    getQueryById: function getQueryById(rowData) {
      var self = this;
      self.$request.requestAxios('get', basePath + '/party_member_infos/' + rowData.partyInfoId + '/detail', "", function (response) {
        var responseData = response.data;
        self.form = responseData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_member_infos/' + rowData.partyInfoId + '/detail');
      });
    },

    /*
    * 新建花名册
    * @params {string} formName 表单数据名字
    */
    saveClick: function saveClick(formName) {
      this.dialogType == 'add' ? this._saveAdd(formName) : this._updateAdd(formName);
    },
    _saveAdd: function _saveAdd(formName) {
      var self = this;
      self.$refs[formName].validate(function (valid) {
        if (valid) {
          self.$request.requestAxios('post', basePath + '/party_member_infos/info/add/from_org/' + self.orgCode, self._saveParams(), function (response) {
            var responseData = response.data;
            self.partyorgMembers();
          }, function (error, status) {
            // 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_member_infos/info/add/from_org/');
          });
          self.addOrUploadDialogVisible = false;
          self._initForm();
        } else {
          return false;
        }
      });
    },
    _updateAdd: function _updateAdd(formName, row) {
      var self = this;
      console.log(self.form);
      self.$refs[formName].validate(function (valid) {
        if (valid) {
          self.$request.requestAxios('put', basePath + '/party_member_infos/info/update/' + self.form.id + '/from_org/' + self.orgCode, self._saveParams(), function (response) {
            var responseData = response.data;
            self.partyorgMembers();
          }, function (error, status) {
            // 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_member_infos/info/update/' + self.form.id + '/from_org/' + self.orgCode);
          });
          self.addOrUploadDialogVisible = false;
          self._initForm();
        } else {
          return false;
        }
      });
    },
    _saveParams: function _saveParams() {
      this.form.applicationDate = new Date(this.form.applicationDate).getTime();
      this.form.joinPartyDate = new Date(this.form.joinPartyDate).getTime();
      this.form.lostTime = this.form.lostTime ? new Date(this.form.lostTime).getTime() : '';
      this.form.qualificationTime = new Date(this.form.qualificationTime).getTime();
      this.form.partyOrgsId = this.orgChlidrensimple.length == 0 ? this.orgId : this.form.partyOrgsId;
      return this.form;
    },

    /*
    * 初始化表单数据
    */
    _initForm: function _initForm() {
      this.form = {
        "applicationDate": null,
        "introducer": null,
        "joinPartyDate": null,
        "lost": true,
        "lostTime": null,
        "mobile": true,
        "partyOrgsId": null,
        "qualificationTime": null,
        "userId": null
      };
    },

    /*
    * 删除一条指定ID花名册
    * @params {object} row 当前需要删除的数据
    */
    delClick: function delClick(row) {
      var self = this;
      self.$request.requestAxios('delete', basePath + '/party_member_infos/info/delete/' + row.partyInfoId + '/from_org/' + self.orgCode, "", function (response) {
        self.partyorgMembers();
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_member_infos/info/delete/' + row.partyInfoId + '/from_org/' + self.orgCode);
      });
    },

    /*
    * 查询组织下所有公司成员
    */
    getCompanyUser: function getCompanyUser() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/party_mem_positions/' + self.orgId + '/company/user', "", function (response) {
        var responseData = response.data;
        self.companyUser = responseData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_mem_positions/' + self.orgId + '/company/user');
      });
    },

    /*
    * 查询组织列表数据
    */
    getQueryOrgList: function getQueryOrgList() {
      var self = this;
      self.orgChlidrensimple = [];
      self.$request.requestAxios('get', basePath + '/party_orgs/' + self.orgId + '/partyorgtree', "", function (response) {
        var responseData = response.data;
        // -------- 给当前的组织树赋值 -----------
        self._getQueryOrgList(responseData.data);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_orgs/' + self.orgId + '/partyorgtree - 失败');
      });
    },

    /*
    * 排除掉不要的数据
    */
    _getQueryOrgList: function _getQueryOrgList(data) {
      var self = this;
      self.orgChlidrensimple.push(data);
      $.each(data.childrens, function (index, item) {
        self.orgChlidrensimple.push(item);
      });
    },

    /*
    * 时间转换
    */
    _convertDate: function _convertDate(date) {
      return new Date(date).getFullYear() + '年' + (new Date(date).getMonth() + 1) + '月' + new Date(date).getDate() + '日';
    },
    handleCascaderChange: function handleCascaderChange(val) {
      console.log(val);
    },

    /*
    * 禁止输入负数
    */
    validateNumber: function validateNumber(evt) {
      if (evt.keyCode == 189 || evt.keyCode == 169 || evt.keyCode == 69 || evt.keyCode == 109 || evt.keyCode == 13) {
        console.log(evt.keyCode);
        // ---- 禁止输入
        evt.preventDefault();
        $(evt.target).val('');
      }
    },

    /*
    * 获取权限
    */
    resourceFun: function resourceFun() {
      var self = this;
      $.each(self.resource, function (index, item) {
        switch (item) {
          case 9:
            self.resourceManage.isAddMember = true;
            break;
          case 14:
            self.resourceManage.isUpdateMember = true;
            break;
          case 15:
            self.resourceManage.isDeleteMember = true;
            break;
        }
      });
    }
  }
};

/***/ }),

/***/ 1726:
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
        "div",
        { staticClass: "mart20" },
        [
          _c(
            "el-form",
            {
              staticClass: "demo-form-inline",
              attrs: { inline: true, model: _vm.formInline }
            },
            [
              _c(
                "el-form-item",
                { staticClass: "padr20", attrs: { label: "姓名:" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.formScreen.userName,
                      callback: function($$v) {
                        _vm.$set(_vm.formScreen, "userName", $$v)
                      },
                      expression: "formScreen.userName"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { staticClass: "padr20", attrs: { label: "账号:" } },
                [
                  _c("el-input", {
                    model: {
                      value: _vm.formScreen.account,
                      callback: function($$v) {
                        _vm.$set(_vm.formScreen, "account", $$v)
                      },
                      expression: "formScreen.account"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { staticClass: "padr20", attrs: { label: "失联党员:" } },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "请选择" },
                      model: {
                        value: _vm.formScreen.lost,
                        callback: function($$v) {
                          _vm.$set(_vm.formScreen, "lost", $$v)
                        },
                        expression: "formScreen.lost"
                      }
                    },
                    _vm._l(_vm.lostOptions, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
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
                { staticClass: "padr20", attrs: { label: "流动党员:" } },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "请选择" },
                      model: {
                        value: _vm.formScreen.mobile,
                        callback: function($$v) {
                          _vm.$set(_vm.formScreen, "mobile", $$v)
                        },
                        expression: "formScreen.mobile"
                      }
                    },
                    _vm._l(_vm.mobileOptions, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("br"),
              _vm._v(" "),
              _c("el-form-item", { attrs: { label: "党龄:" } }, [
                _c("div", { staticClass: "el-form-item__content" }, [
                  _c("div", { staticClass: "el-input" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.formScreen.smallPartyAge,
                          expression: "formScreen.smallPartyAge"
                        }
                      ],
                      staticClass: "el-input__inner",
                      staticStyle: { width: "50%", display: "inline-block" },
                      attrs: { type: "number", min: "0", autocomplete: "off" },
                      domProps: { value: _vm.formScreen.smallPartyAge },
                      on: {
                        keyup: function($event) {
                          return _vm.validateNumber($event)
                        },
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.formScreen,
                            "smallPartyAge",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v("~")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.formScreen.largePartyAge,
                          expression: "formScreen.largePartyAge"
                        }
                      ],
                      staticClass: "el-input__inner",
                      staticStyle: {
                        width: "calc(50% - 22px)",
                        display: "inline-block"
                      },
                      attrs: { type: "number", min: "0", autocomplete: "off" },
                      domProps: { value: _vm.formScreen.largePartyAge },
                      on: {
                        keyup: function($event) {
                          return _vm.validateNumber($event)
                        },
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.formScreen,
                            "largePartyAge",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("el-form-item", { attrs: { label: "年龄:" } }, [
                _c("div", { staticClass: "el-form-item__content" }, [
                  _c("div", { staticClass: "el-input" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.formScreen.smallAge,
                          expression: "formScreen.smallAge"
                        }
                      ],
                      staticClass: "el-input__inner",
                      staticStyle: { width: "50%", display: "inline-block" },
                      attrs: { type: "number", min: "0", autocomplete: "off" },
                      domProps: { value: _vm.formScreen.smallAge },
                      on: {
                        keyup: function($event) {
                          return _vm.validateNumber($event)
                        },
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.formScreen,
                            "smallAge",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("span", [_vm._v("~")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.formScreen.largeAge,
                          expression: "formScreen.largeAge"
                        }
                      ],
                      staticClass: "el-input__inner",
                      staticStyle: {
                        width: "calc(50% - 22px)",
                        display: "inline-block"
                      },
                      attrs: { type: "number", min: "0", autocomplete: "off" },
                      domProps: { value: _vm.formScreen.largeAge },
                      on: {
                        keyup: function($event) {
                          return _vm.validateNumber($event)
                        },
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.formScreen,
                            "largeAge",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ])
                ])
              ]),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary", size: "small" },
                      on: { click: _vm.onSubmitPartyorgMembers }
                    },
                    [_vm._v("查询")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { staticClass: "padl20" },
                [
                  _c(
                    "el-button",
                    {
                      attrs: {
                        disabled: !(
                          _vm.companyUser.length != 0 &&
                          _vm.resourceManage.isAddMember
                        ),
                        title: !(
                          _vm.companyUser.length != 0 &&
                          _vm.resourceManage.isAddMember
                        )
                          ? "满足公司成员个数不为0，并且有此权限，才能操作此按钮"
                          : "",
                        size: "small",
                        type: "primary"
                      },
                      on: {
                        click: function($event) {
                          _vm.addOrUploadDialogVisibleFun("add")
                        }
                      }
                    },
                    [_vm._v("新增")]
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
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.isLoad,
              expression: "isLoad"
            }
          ],
          staticClass: "mart20",
          staticStyle: { width: "100%" },
          attrs: { data: _vm.tableData, stripe: "" }
        },
        [
          _c("el-table-column", {
            attrs: { prop: "account", label: "账号", width: "" }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "name", label: "名字" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "申请时间" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm._convertDate(scope.row.applicationTime)) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "introducer", label: "介绍者" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "joinPartyTime", label: "入党时间" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm._convertDate(scope.row.joinPartyTime)) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { align: "center", label: "是否失联" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(scope.row.lost ? "是" : "否") +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { align: "center", label: "是否是流动党员" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(scope.row.mobile ? "是" : "否") +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "orgName", label: "组织名称" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "qualification_time", label: "转正时间" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm._convertDate(scope.row.qualification_time)) +
                        "\n      "
                    )
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作", width: "180px" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "el-button",
                      {
                        attrs: {
                          disabled: !_vm.resourceManage.isUpdateMember,
                          title: !_vm.resourceManage.isUpdateMember
                            ? "无权限"
                            : "",
                          type: "primary",
                          size: "mini"
                        },
                        on: {
                          click: function($event) {
                            _vm.addOrUploadDialogVisibleFun("update", scope.row)
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
                          disabled: !_vm.resourceManage.isDeleteMember,
                          title: !_vm.resourceManage.isDeleteMember
                            ? "无权限"
                            : "",
                          type: "danger",
                          size: "mini"
                        },
                        on: {
                          click: function($event) {
                            return _vm.delClick(scope.row)
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
      _c(
        "el-dialog",
        {
          staticClass: "dialog",
          attrs: {
            title: _vm.dialogType == "add" ? "新建花名册" : "编辑花名册",
            visible: _vm.addOrUploadDialogVisible,
            width: "700px"
          },
          on: {
            "update:visible": function($event) {
              _vm.addOrUploadDialogVisible = $event
            }
          }
        },
        [
          _c(
            "div",
            [
              _c(
                "el-form",
                {
                  ref: "form",
                  staticClass: "demo-ruleForm add-task-left",
                  attrs: {
                    model: _vm.form,
                    rules: _vm.rules,
                    "label-width": "120px"
                  }
                },
                [
                  _vm.dialogType != "update"
                    ? _c(
                        "el-form-item",
                        { attrs: { label: "职工:" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: { placeholder: "请选择" },
                              model: {
                                value: _vm.form.userId,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "userId", $$v)
                                },
                                expression: "form.userId"
                              }
                            },
                            _vm._l(_vm.companyUser, function(item) {
                              return _c("el-option", {
                                key: item.userId,
                                attrs: { label: item.name },
                                model: {
                                  value: item.userId,
                                  callback: function($$v) {
                                    _vm.$set(item, "userId", $$v)
                                  },
                                  expression: "item.userId"
                                }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.orgChlidrensimple.length != 0
                    ? _c(
                        "el-form-item",
                        { attrs: { label: "所属支部:" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: { placeholder: "请选择" },
                              model: {
                                value: _vm.form.partyOrgsId,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "partyOrgsId", $$v)
                                },
                                expression: "form.partyOrgsId"
                              }
                            },
                            _vm._l(_vm.orgChlidrensimple, function(item) {
                              return _c("el-option", {
                                key: item.id,
                                attrs: { label: item.name },
                                model: {
                                  value: item.id,
                                  callback: function($$v) {
                                    _vm.$set(item, "id", $$v)
                                  },
                                  expression: "item.id"
                                }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "申请时间:", prop: "applicationDate" } },
                    [
                      _c("el-date-picker", {
                        staticStyle: { width: "100%" },
                        attrs: { type: "date", placeholder: "选择日期" },
                        model: {
                          value: _vm.form.applicationDate,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "applicationDate", $$v)
                          },
                          expression: "form.applicationDate"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      staticClass: "no-border",
                      attrs: { label: "介绍者:", prop: "introducer" }
                    },
                    [
                      _c("el-input", {
                        attrs: { placeholder: "请输入介绍者" },
                        model: {
                          value: _vm.form.introducer,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "introducer", $$v)
                          },
                          expression: "form.introducer"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      staticClass: "no-border",
                      attrs: { label: "入党时间:", prop: "joinPartyDate" }
                    },
                    [
                      _c("el-date-picker", {
                        staticStyle: { width: "100%" },
                        attrs: { type: "date", placeholder: "选择日期" },
                        model: {
                          value: _vm.form.joinPartyDate,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "joinPartyDate", $$v)
                          },
                          expression: "form.joinPartyDate"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { staticClass: "no-border", attrs: { label: "是否失联:" } },
                    [
                      _c(
                        "el-radio-group",
                        {
                          model: {
                            value: _vm.form.lost,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "lost", $$v)
                            },
                            expression: "form.lost"
                          }
                        },
                        [
                          _c("el-radio", { attrs: { label: true } }, [
                            _vm._v("是")
                          ]),
                          _vm._v(" "),
                          _c("el-radio", { attrs: { label: false } }, [
                            _vm._v("否")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.form.lost
                    ? _c(
                        "el-form-item",
                        {
                          staticClass: "no-border",
                          attrs: { label: "失联时间:", prop: "lostTime" }
                        },
                        [
                          _c("el-date-picker", {
                            staticStyle: { width: "100%" },
                            attrs: { type: "date", placeholder: "选择日期" },
                            model: {
                              value: _vm.form.lostTime,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "lostTime", $$v)
                              },
                              expression: "form.lostTime"
                            }
                          })
                        ],
                        1
                      )
                    : _c(
                        "el-form-item",
                        {
                          staticClass: "no-border no-required",
                          attrs: { label: "失联时间:" }
                        },
                        [
                          _c("el-date-picker", {
                            staticStyle: { width: "100%" },
                            attrs: { type: "date", placeholder: "选择日期" },
                            model: {
                              value: _vm.form.lostTime,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "lostTime", $$v)
                              },
                              expression: "form.lostTime"
                            }
                          })
                        ],
                        1
                      ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      staticClass: "no-border",
                      attrs: { label: "是否是流动党员:" }
                    },
                    [
                      _c(
                        "el-radio-group",
                        {
                          model: {
                            value: _vm.form.mobile,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "mobile", $$v)
                            },
                            expression: "form.mobile"
                          }
                        },
                        [
                          _c("el-radio", { attrs: { label: true } }, [
                            _vm._v("是")
                          ]),
                          _vm._v(" "),
                          _c("el-radio", { attrs: { label: false } }, [
                            _vm._v("否")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    {
                      staticClass: "no-border",
                      attrs: { label: "转正时间:", prop: "qualificationTime" }
                    },
                    [
                      _c("el-date-picker", {
                        staticStyle: { width: "100%" },
                        attrs: { type: "date", placeholder: "选择日期" },
                        model: {
                          value: _vm.form.qualificationTime,
                          callback: function($$v) {
                            _vm.$set(_vm.form, "qualificationTime", $$v)
                          },
                          expression: "form.qualificationTime"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { staticClass: "no-border text-right marr20" },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: {
                            click: function($event) {
                              return _vm.saveClick("form")
                            }
                          }
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-3e85c36e", esExports)
  }
}

/***/ })

});