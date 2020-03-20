webpackJsonplensyn_ui([35],{

/***/ 1111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__ = __webpack_require__(1284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6e50e668_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Experience_vue__ = __webpack_require__(1333);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1331)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_6e50e668_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Experience_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/message/Experience.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e50e668", Component.options)
  } else {
    hotAPI.reload("data-v-6e50e668", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1257:
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

exports.default = {
  props: {
    dateType: { //时间类型 
      default: '1' //1为年，2为年-月，3为年-月-日 4为年-月-日 时:分:秒
    },
    isDisabled: { //为true禁用时间器
      default: false
    },
    value: { //时间值
      default: null
    },
    isTimeRange: { //true是一个时间区间，否则不是
      default: false
    },
    beginDatetime: { //用于时间区间
      default: null
    },
    endDatetime: { //用于时间区间
      default: null
    }
  },
  computed: {
    dateTypeCom: function dateTypeCom() {
      // ------------------ 将数字转为字符串 ----------------- 
      this.dateType = this.dateType ? this.dateType.toString() : '';

      if (this.dateType == 1) {
        return 'year';
      } else if (this.dateType == 2) {
        return 'month';
      } else if (this.dateType == 3) {
        return 'date';
      } else {
        return 'datetime';
      }
    }
  },
  components: {},
  data: function data() {
    return {
      dateTypeString: '1', //用于下拉
      minTime: null // 日期区间中结束日期的最小值
    };
  },

  watch: {},
  mounted: function mounted() {},

  methods: {
    /*
     * 广播时间类型
     */
    selectChange: function selectChange(val) {
      this.$emit('dateTypeEmit', val);
    },

    /*
     * 广播时间
     */
    dateChange: function dateChange(val) {
      this.$emit('dateEmit', new Date(val).getTime());
    },

    /*
     * 时间区间
     */
    dataRangeChange: function dataRangeChange(val, dataType) {
      if (dataType == 'bengin') {
        // ----------- 结束时间小于开始时间，将结束时间绑定为开始时间
        if (this.endDatetime < this.beginDatetime) {
          this.endDatetime = this.beginDatetime;
          this.$emit('dateEmit', [this.beginDatetime, this.beginDatetime]);
        } else {
          this.$emit('dateEmit', [this.beginDatetime, this.endDatetime]);
        }
      } else {
        if (this.endDatetime < this.beginDatetime) {
          this.beginDatetime = this.endDatetime;
          this.$emit('dateEmit', [this.beginDatetime, this.beginDatetime]);
        } else {
          this.$emit('dateEmit', [this.beginDatetime, this.endDatetime]);
        }
      }
    }
  }
};

/***/ }),

/***/ 1260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Date_vue__ = __webpack_require__(1257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Date_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Date_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Date_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Date_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_93ee3f4c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Date_vue__ = __webpack_require__(1306);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1304)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Date_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_93ee3f4c_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Date_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/messageComponents/Date.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93ee3f4c", Component.options)
  } else {
    hotAPI.reload("data-v-93ee3f4c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Date = __webpack_require__(1260);

var _Date2 = _interopRequireDefault(_Date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    hisToryData: { //当有表单数据时，表示是从任务哪儿发送过来的。
      required: false,
      default: null
    },
    rosterId: { //人员Id
      required: false,
      default: null
    },
    mathRandom: { // 适用于花名册，查看详情
      required: false,
      default: 0
    },
    afferentUserId: { //父组件传入的用户Id
      required: false,
      default: null
    }
  },
  components: {
    'date-select': _Date2.default
  },
  data: function data() {
    var _this = this;

    var validatePass = function validatePass(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度必须是6位以上!'));
      } else {
        if (_this.resetPasswordForm.confirmPassword !== '') {
          _this.$refs.resetPasswordForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    var validatePass2 = function validatePass2(rule, value, callback) {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== _this.resetPasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else if (value.length < 6) {
        callback(new Error('密码长度必须是6位以上!'));
      } else {
        callback();
      }
    };
    return {
      loading: true,
      basePath: basePath,
      userData: JSON.parse(sessionStorage.getItem('userData')),
      orgId: 1, //暂定为1，后期可能会取消
      resetPasswordForm: {
        confirmPassword: null,
        oldPassword: null,
        newPassword: null
      },
      resetPasswordFormRules: {
        oldPassword: [{ required: true, message: '请输入旧密码' }],
        newPassword: [{ required: true, message: '请输入新密码' }, { validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '请再次输入密码' }, { validator: validatePass2, trigger: 'blur' }]
      },
      form: {
        "account": null,
        "address": null,
        "areaCodel": null,
        "borthday": null,
        "desc": null,
        "education": null,
        "englishLevel": null,
        "idNumber": null,
        "maritalStatus": null,
        "mobilNumber": null,
        "nativeName": null,
        "nativePlace": null,
        "outLook": null,
        "phoneNumber": null,
        "picture": null,
        "position": null,
        "tPost": null,
        "sex": null,
        "userId": 0,
        "name": null,
        "technicalJob": null,
        "administrationJob": null
      },
      sexOptions: [], //性别列表
      nationOptions: [], //民族列表
      educationOptions: [], //最高学历列表
      academicDegreeOptions: [], //学位列表
      practiceOptions: [], //执业资格证书
      englishLevelOptions: [], //外语等级列表
      marriageOptions: [], //婚姻状态列表
      outLookOptions: [], //政治面貌
      tPostOptions: [], //技术职务
      positionOptions: [], //岗位
      nativePlaceOptions: [], //籍贯
      relationshipOptions: [], //人际关系
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
      typeData: {
        relations: [1], //人际关系
        experience: [1, 2, 3, 4, 5, 6, 7], //工作经历，学习经历，培训经历，团组织职务经历，党政职务经历，工会组织职务经历，党组织内职务经历
        archiveses: [1, 2, 3, 4, 5] //个人荣誉，技术职务，学历，学位，执业资格证书
      },
      editTypeId: null, //当前被操作的类型Id
      orgChlidrensimple: [], //支部数据
      partyMemberForm: { //新增/编辑：党员基本信息
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
      "applicationDateFormat": 'yyyy-MM',
      "joinPartyDateFormat": 'yyyy-MM',
      "qualificationTimeFormat": 'yyyy-MM',
      "lostTimeFormat": 'yyyy-MM'
    };
  },

  watch: {
    mathRandom: function mathRandom(data) {
      if (data) {
        this.form = {
          "account": null,
          "address": null,
          "areaCodel": null,
          "borthday": null,
          "desc": null,
          "education": null,
          "englishLevel": null,
          "idNumber": null,
          "maritalStatus": null,
          "mobilNumber": null,
          "nativeName": null,
          "nativePlace": null,
          "outLook": null,
          "phoneNumber": null,
          "picture": null,
          "position": null,
          "tPost": null,
          "sex": null,
          "userId": 0,
          "name": null
        };
        // ----- 将用户Id赋值为父组件传入的用户Id 
        this.userData.userId = this.afferentUserId;
        this.getQueryContrast();
        this.initTableData();
      }
    }
  },
  mounted: function mounted() {
    this.afferentUserId ? this.userData.userId = this.afferentUserId : '';
    this.getQueryContrast();
    this.initTableData();
  },

  methods: {
    /*
     * 获取所有对照表分类及对照键值对
     */
    getQueryContrast: function getQueryContrast() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/contrast/all_contrast_info', "", function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self._getQueryContrast(responseData.data);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/contrast/all_contrast_info - 失败');
      });
    },
    _getQueryContrast: function _getQueryContrast(data) {
      var self = this;
      $.each(data, function (index, item) {
        switch (item.id) {
          case 1:
            self.sexOptions = item.list;
            break;
          case 2:
            self.nationOptions = item.list;
            break;
          case 3:
            self.educationOptions = item.list;
            break;
          case 4:
            self.marriageOptions = item.list;
            break;
          case 5:
            self.englishLevelOptions = item.list;
            break;
          case 6:
            self.outLookOptions = item.list;
            break;
          case 9:
            self.nativePlaceOptions = item.list;
            break;
          case 10:
            self.positionOptions = item.list;
            break;
          case 13:
            self.academicDegreeOptions = item.list;
            break;
          case 14:
            self.relationshipOptions = item.list;
            break;
          case 15:
            self.practiceOptions = item.list;
            break;
          case 17:
            self.tPostOptions = item.list;
            break;

          default:
            break;
        }
      });
    },

    /*
     * 查询用户信息
     */
    getQueryUserDetail: function getQueryUserDetail() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/hr_users/info/' + self.userData.userId + '/forUser', "", function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.form = responseData.data;
        self.loading = false;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/hr_users/info/' + currentUserId + '/forUser - 失败');
        self.loading = false;
      });
    },

    /*
    * 修改个人信息
    */
    updatePersonalMesg: function updatePersonalMesg(formName) {
      var self = this;

      self.form.nation = self.form.nativeName;
      self.form.nationPlace = self.form.nativePlace;
      self.form.educationLevel = self.form.education;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          self.$request.requestAxios('put', basePath + '/hr_users/update/' + self.userData.userId + '/forUser', self.form, function (response) {
            //请求成功的回调...
            var responseData = response.data;
            self.getQueryUserDetail();
            self.$message(responseData.meta.message, 20);
          }, function (error, status) {
            // 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/hr_users/update/' + self.userData.userId + '/forUser - 失败');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /*
    * 查询用户相关经历
    */
    getQueryExperience: function getQueryExperience() {
      var _this2 = this;

      this.typeData.experience.forEach(function (typeId) {
        _this2._getQueryUserManage('/experience//forUser/' + _this2.userData.userId, 'experienceData', typeId);
      });
    },

    /*
    * 添加一行用户的社会关系
    */
    addRelationRow: function addRelationRow() {
      this.relationsData['relationsData' + this.editTypeId].push({
        "otherName": null,
        "otherPosition": null,
        "owner": 1,
        "relationName": null,
        "status": 1,
        "typeId": this.editTypeId,
        'newAdd': 1, //有此键表示新建
        'isBool': 1 //默认第一次都为1，
      });
    },

    /*
    * 添加用户的社会关系
    * @params {string} type add为新增，update为编辑修改
    * @params {object} row 
    */
    saveRelationship: function saveRelationship(type, row) {
      var self = this;
      if (self._validate(row)) {
        // debugger
        self._add('/relations/create/forUser/' + this.userData.userId, row, function (res) {
          self.getQueryRelationship();
        });
      }
    },
    _addRelationshipParams: function _addRelationshipParams() {
      return {
        "otherName": "张三",
        "otherPosition": "开发",
        "owner": 1,
        "relationName": "父女",
        "status": 1,
        "typeId": this.editTypeId
      };
    },


    /*
    * 删除指定ID的一条人际关系
    * @params {number/string} id 不为undefined时，表示不是新增的数据
    * @params {object} rowData 当前行数据
    * @params {number} index 当前行的下标
    */
    delRelationship: function delRelationship(id, rowData, index) {
      var self = this;
      if (id) {
        self._del('/relations/delete/' + id + '/forUser/' + self.orgId + '_' + self.userData.userId, function () {
          self.getQueryRelationship();
        });
      } else {
        self.relationsData.splice(index, 1);
      }
    },

    /*
    * 添加一行用户相关经历      
    */
    addExperienceRow: function addExperienceRow() {
      this.experienceData['experienceData' + this.editTypeId].push({
        "address": null,
        "beginDatetime": new Date(), //默认为1，保存后将数据设置为真实的时间
        "endDatetime": new Date(), //默认为1，保存后将数据设置为真实的时间
        "beginTimeType": 1,
        "endTimeType": 1,
        "timeFormat": 'yyyy-MM-dd',
        "owner": 1,
        "position": null,
        "status": 1,
        "typeId": this.editTypeId,
        'newAdd': 1, //有此键表示新建
        'isBool': 1 //默认第一次都为1，
      });
    },

    /*
    * 添加用户相关经历
    * @params {string} type add为新增，update为编辑修改
    * @params {object} row 
    */
    saveExperience: function saveExperience(type, row) {
      var self = this;
      if (self._validate(row)) {
        // -------------------------- 给开始结束时间赋值 ----------------------------
        row.beginDatetime = row.beginDatetime.getTime();
        row.endDatetime = row.endDatetime.getTime();

        self._add('/experience/create/forUser/' + self.userData.userId, row, function () {
          self.getQueryExperience();
        });
      }
    },

    /*
    * 删除指定ID的一条经历
    * @params {string} arrayKey 指定的数组键
    * @params {number/string} id 不为undefined时，表示不是新增的数据
    * @params {object} rowData 当前行数据
    * @params {number} index 当前行的下标
    */
    delExperience: function delExperience(arrayKey, id, rowData, index) {
      var self = this;
      if (id) {
        self._del('/experience/delete/' + id + '/forUser/' + self.userData.userId, function () {
          self.getQueryExperience();
        });
      } else {
        self.experienceData[arrayKey].splice(index, 1);
      }
    },
    _validate: function _validate(row) {
      var bool = true; //为true表示数据都不为null
      $.each(row, function (key, item) {
        if (!item) {
          bool = false;
          // -- 将文本框标红
          row.isBool = 2;
        }
      });
      return bool;
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
        self[receiveDataName][receiveDataName + typeId] = responseData.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error(url + ' - 失败');
      });
    },

    /*
    * 合并添加函数
    * @params {string} url 请求地址
    * @params {object} params 请求参数
    * @params {object} success 回调函数
    */
    _add: function _add(url, params, success) {
      var self = this;
      self.$request.requestAxios('post', basePath + url, params, function (response) {
        //请求成功的回调...
        var responseData = response.data;
        self.$message.success(responseData.data);
        success(responseData);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error(url + ' - 失败');
      });
    },

    /*
    * 合并删除函数
    * @params {string} url 请求地址
    * @params {object} success 回调函数
    */
    _del: function _del(url, successs) {
      var self = this;
      self.$request.requestAxios('delete', basePath + url, "", function (response) {
        //请求成功的回调...
        var responseData = response.data;
        setTimeout(function () {
          self.$message.success(responseData.data);
          successs();
        }, 20);
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error(url + ' - 失败');
      });
    },

    /*
    * 时间转换
    */
    _convertDate: function _convertDate(date) {
      return new Date(date).getFullYear() + '年' + (new Date(date).getMonth() + 1) + '月';
    },

    /*
     * 查询党员信息
     */
    getQueryPartyMemberDetail: function getQueryPartyMemberDetail() {
      var self = this;
      self.$request.requestAxios('get', basePath + '/party_member_infos/' + this.userData.memInfoId + '/detail', "", function (response) {
        //请求成功的回调...
        self.partyMemberForm = response.data.data;
      }, function (error, status) {
        // 请求失败回调函数...
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_member_infos/' + this.userData.memInfoId + '/detail - 失败');
      });
    },

    /*
     * 初始化表格数据,当时从历史记录页面跳转过来的就显示历史数据；否则，直接根据接口查询
     */
    initTableData: function initTableData() {
      var hisTory = this.hisToryData;
      if (hisTory) {
        var formData = JSON.parse(hisTory.formData);
        switch (hisTory.fromType) {
          case '1':
            //基本信息
            this.form = JSON.parse(this.hisToryData.formData);
            break;
          case '7':
            //党员信息
            this.partyMemberForm = JSON.parse(this.hisToryData.formData);
            break;
          case '6':
            //关系
            this.relationsData['relationsData' + formData.typeId] = [formData];
            break;
          case '3':
            //经历
            this.experienceData['experienceData' + formData.typeId] = [formData];
            break;
          case '4':
            //获得性
            this.archivesesData['archivesesData' + formData.typeId] = [formData];
            break;
        }
        this.loading = false;
      } else {
        if (this.userData.memInfoId) {
          this.getQueryPartyMemberDetail();
        }
        this.getQueryExperience();
        this.loading = false;
      }
    },

    /*
     * 时间组件广播回来的时间值
     * @params {string} val 时间组件返回回来的值
     * @params {string} formDatTypeeKey 当前页面的字段 
     */
    dateEmitFun: function dateEmitFun(val, formDateKey) {
      formDateKey.beginDatetime = val[0];
      formDateKey.endDatetime = val[1];
    },

    /*
     * 时间组件广播回来的时间类型
     * @params {string} val 时间组件返回回来的值
     * @params {string} formDateKey 当前页面的字段 
     */
    dateTypeEmitFun: function dateTypeEmitFun(val, formDateKey) {
      formDateKey.beginTimeType = val;
      formDateKey.endTimeType = val;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 1284:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Experience = __webpack_require__(1314);

var _Experience2 = _interopRequireDefault(_Experience);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    hisToryData: { //当有表单数据时，表示是从任务哪儿发送过来的。
      required: false,
      default: null
    },
    rosterId: { //人员Id
      required: false,
      default: null
    },
    mathRandom: { // 适用于花名册，查看详情
      required: false,
      default: 0
    },
    afferentUserId: { //父组件传入的用户Id
      required: false,
      default: null
    }
  },
  components: {
    'my-experience': _Experience2.default //经历性
  },
  data: function data() {
    return {};
  },

  watch: {},
  mounted: function mounted() {},

  methods: {}
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

/***/ 1304:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1305);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("35d181fa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-93ee3f4c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Date.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-93ee3f4c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Date.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1305:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.date-type-div {\n  position: relative;\n}\n.date-type-div .type {\n  position: absolute;\n  right: 0;\n  width: 100px;\n  top: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "date-type-div" },
    [
      _vm.isTimeRange
        ? _c(
            "div",
            [
              _c("el-date-picker", {
                staticStyle: { width: "40%" },
                attrs: {
                  disabled: _vm.isDisabled,
                  type: _vm.dateTypeCom,
                  placeholder: "选择日期"
                },
                on: {
                  change: function(val) {
                    return _vm.dataRangeChange(val, "bengin")
                  }
                },
                model: {
                  value: _vm.beginDatetime,
                  callback: function($$v) {
                    _vm.beginDatetime = $$v
                  },
                  expression: "beginDatetime"
                }
              }),
              _vm._v("\n    -\n    "),
              _c("el-date-picker", {
                staticStyle: { width: "50%" },
                attrs: {
                  disabled: _vm.isDisabled,
                  type: _vm.dateTypeCom,
                  placeholder: "选择日期",
                  "picker-options": _vm.minTime
                },
                on: {
                  change: function(val) {
                    return _vm.dataRangeChange(val, "end")
                  }
                },
                model: {
                  value: _vm.endDatetime,
                  callback: function($$v) {
                    _vm.endDatetime = $$v
                  },
                  expression: "endDatetime"
                }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.isTimeRange
        ? _c(
            "el-date-picker",
            {
              staticStyle: { width: "100%" },
              attrs: {
                disabled: _vm.isDisabled,
                type: _vm.dateTypeCom,
                placeholder: "选择日期"
              },
              on: { change: _vm.dateChange },
              model: {
                value: _vm.value,
                callback: function($$v) {
                  _vm.value = $$v
                },
                expression: "value"
              }
            },
            [_vm._v("-\n  ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-select",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.isDisabled,
              expression: "!isDisabled"
            }
          ],
          staticClass: "type",
          on: { change: _vm.selectChange },
          model: {
            value: _vm.dateType,
            callback: function($$v) {
              _vm.dateType = $$v
            },
            expression: "dateType"
          }
        },
        [
          _c("el-option", { attrs: { label: "年", value: "1" } }),
          _vm._v(" "),
          _c("el-option", { attrs: { label: "年-月", value: "2" } }),
          _vm._v(" "),
          _c("el-option", { attrs: { label: "年-月-日", value: "3" } }),
          _vm._v(" "),
          _c("el-option", { attrs: { label: "年-月-日 时:分:秒", value: "4" } })
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-93ee3f4c", esExports)
  }
}

/***/ }),

/***/ 1314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__ = __webpack_require__(1267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_935c25d4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Experience_vue__ = __webpack_require__(1317);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1315)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Experience_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_935c25d4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Experience_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/messageComponents/Experience.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-935c25d4", Component.options)
  } else {
    hotAPI.reload("data-v-935c25d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1315:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1316);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("c1931dca", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-935c25d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Experience.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-935c25d4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Experience.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1316:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.date-type-div {\n  position: relative;\n}\n.date-type-div .type {\n  position: absolute;\n  right: 0;\n  width: 100px;\n  top: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return (_vm.hisToryData
  ? _vm.hisToryData.fromType == 3
  : true)
    ? _c(
        "el-card",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          staticClass: "box-card marb20"
        },
        [
          _c(
            "div",
            {
              staticClass: "clearfix",
              staticStyle: { "font-size": "25px" },
              attrs: { slot: "header" },
              slot: "header"
            },
            [_c("span", [_vm._v("经历性")])]
          ),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 1
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 工作经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 1
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData1
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "工作开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        { staticClass: "date-type-div" },
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3046815948
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "工作单位/地址" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "工作经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 1
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData1",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 1
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              4178178815
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 2
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 学习经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 2
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData2
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "学习开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        { staticClass: "date-type-div" },
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3046815948
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "学习单位/地点" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "学习经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 2
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData2",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 2
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              4217127324
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 3
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 培训经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 3
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData3
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "培训开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        { staticClass: "date-type-div" },
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3046815948
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "培训单位/地点" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "培训经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 3
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData3",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 3
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              2648660029
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 4
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 团组织职务经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 4
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData4
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "团组织职务开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2163768317
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "团组织职务单位/地点" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "团组织职务经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 4
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData4",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 4
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              2895445978
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 5
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 党政职务经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 5
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData5
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "党政职务开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2163768317
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "党政职务单位/地点" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "党政职务经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 5
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData5",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 5
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              270826619
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 6
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 工会组织职务经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 6
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData6
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "工会组织职务开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2163768317
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          label: "工会组织职务单位/地点"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "工会组织职务经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 6
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData6",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 6
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              3939799832
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          (_vm.hisToryData
          ? JSON.parse(_vm.hisToryData.formData).typeId == 7
          : true)
            ? _c(
                "div",
                { staticClass: "personal-wrapper" },
                [
                  _c("h1", { staticClass: "title" }, [
                    _vm._v("|| 党组织内职务经历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 7
                              _vm.addExperienceRow()
                            }
                          }
                        })
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: {
                        stripe: true,
                        data: _vm.experienceData.experienceData7
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "400px",
                          label: "党组织内职务开始-结束"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.beginDatetime
                                                  )
                                                : ""
                                            ) +
                                            " - " +
                                            _vm._s(
                                              scope.row.beginDatetime != 1
                                                ? _vm._convertDate(
                                                    scope.row.endDatetime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c(
                                        "div",
                                        [
                                          _c("date-select", {
                                            class: {
                                              "border-red":
                                                scope.row.hasOwnProperty(
                                                  "isBool"
                                                ) &&
                                                scope.row.isBool === 2 &&
                                                !scope.row.beginDatetime &&
                                                !scope.row.endDatetime
                                            },
                                            attrs: {
                                              isTimeRange: "true",
                                              dateType: scope.row.beginTimeType,
                                              isDisabled: false,
                                              beginDatetime:
                                                scope.row.beginDatetime,
                                              endDatetime: scope.row.endDatetime
                                            },
                                            on: {
                                              dateEmit: function(val) {
                                                return _vm.dateEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              },
                                              dateTypeEmit: function(val) {
                                                return _vm.dateTypeEmitFun(
                                                  val,
                                                  scope.row
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2163768317
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          label: "党组织内职务单位/地点"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.address))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.address
                                        },
                                        model: {
                                          value: scope.row.address,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "address", $$v)
                                          },
                                          expression: "scope.row.address"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          202749856
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "党组织内职务经历" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.position))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.position
                                        },
                                        model: {
                                          value: scope.row.position,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "position", $$v)
                                          },
                                          expression: "scope.row.position"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2832260527
                        )
                      }),
                      _vm._v(" "),
                      !_vm.hisToryData && !_vm.afferentUserId
                        ? _c("el-table-column", {
                            attrs: { width: "100px", label: "操作" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(scope) {
                                    return [
                                      scope.row.hasOwnProperty("newAdd")
                                        ? _c("el-button", {
                                            attrs: {
                                              title: "保存",
                                              type: "success",
                                              icon: "el-icon-check",
                                              circle: ""
                                            },
                                            on: {
                                              click: function($event) {
                                                _vm.saveExperience(
                                                  "add",
                                                  scope.row
                                                )
                                                _vm.editTypeId = 7
                                              }
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("el-button", {
                                        attrs: {
                                          title: "删除",
                                          type: "danger",
                                          icon: "el-icon-delete",
                                          circle: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            _vm.delExperience(
                                              "experienceData7",
                                              scope.row.id,
                                              scope.row,
                                              scope.$index
                                            )
                                            _vm.editTypeId = 7
                                          }
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              741772217
                            )
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e()
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-935c25d4", esExports)
  }
}

/***/ }),

/***/ 1331:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1332);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("2ef3e8e2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e50e668\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Experience.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6e50e668\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Experience.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1332:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.date-type-div {\n  position: relative;\n}\n.date-type-div .type {\n  position: absolute;\n  right: 0;\n  width: 100px;\n  top: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "personal-message content-manage personal-top" },
    [
      _c("my-experience", {
        attrs: {
          hisToryData: _vm.hisToryData,
          rosterId: _vm.rosterId,
          mathRandom: _vm.mathRandom,
          afferentUserId: _vm.afferentUserId
        }
      })
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-6e50e668", esExports)
  }
}

/***/ })

});