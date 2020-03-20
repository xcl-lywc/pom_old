webpackJsonplensyn_ui([53],{

/***/ 1112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__ = __webpack_require__(1285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0289bd41_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Archiveses_vue__ = __webpack_require__(1336);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1334)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_0289bd41_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Archiveses_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/message/Archiveses.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0289bd41", Component.options)
  } else {
    hotAPI.reload("data-v-0289bd41", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1268:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {},

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
      "applicationDateFormat": 'yyyy-MM-dd',
      "joinPartyDateFormat": 'yyyy-MM-dd',
      "qualificationTimeFormat": 'yyyy-MM-dd',
      "lostTimeFormat": 'yyyy-MM-dd'
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
        // this.getQueryOrgList();
      }
    }
  },
  mounted: function mounted() {
    this.afferentUserId ? this.userData.userId = this.afferentUserId : '';
    this.getQueryContrast();
    this.initTableData();
    // this.getQueryOrgList();
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
    * 查询用户获得相关荣誉
    */
    getQueryArchiveses: function getQueryArchiveses() {
      var _this2 = this;

      this.typeData.archiveses.forEach(function (typeId) {
        _this2._getQueryUserManage('/archiveses/forUser/' + _this2.userData.userId, 'archivesesData', typeId);
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
    * 添加一行用户获得性结果档案      
    */
    addArchivesesRow: function addArchivesesRow() {
      this.archivesesData['archivesesData' + this.editTypeId].push({
        "address": null,
        "creater": 1,
        "name": null,
        "owner": 1,
        "status": 1,
        "dateTime": null,
        "timeFormat": 'yyyy-MM-dd',
        "typeId": this.editTypeId,
        'newAdd': 1, //有此键表示新建
        'isBool': 1 //默认第一次都为1，
      });
    },

    /*
    * 添加用户的获得性结果档案
    * @params {string} type add为新增，update为编辑修改
    * @params {object} row 
    */
    saveArchiveses: function saveArchiveses(type, row) {
      var self = this;
      if (self._validate(row)) {
        self._add('/archiveses/create/forUser/' + self.userData.userId, row, function (res) {
          self.getQueryArchiveses();
        });
      }
    },
    _addArchivesesParams: function _addArchivesesParams() {
      return {
        "address": "string",
        "creater": 0,
        "name": "string",
        "owner": 1,
        "status": 1,
        "dateTime": new Date().getTime(),
        "timeFormat": 'yyyy-MM-dd',
        "typeId": this.editTypeId
      };
    },

    /*
    * 删除指定ID的一条荣誉
    * @params {string} arrayKey 指定的数组键
    * @params {number/string} id 不为undefined时，表示不是新增的数据
    * @params {object} rowData 当前行数据
    * @params {number} index 当前行的下标
    */
    delArchiveses: function delArchiveses(arrayKey, id, rowData, index) {
      var self = this;
      if (id) {
        self._del('/archiveses/delete/' + id + '/forUser/' + self.userData.userId, function () {
          self.getQueryArchiveses();
        });
      } else {
        self.archivesesData[arrayKey].splice(index, 1);
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
      debugger;
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
      return new Date(date).getFullYear() + '年' + (new Date(date).getMonth() + 1) + '月' + new Date(date).getDate() + '日';
    },

    /*
    * 图片上传成功后
    */
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      this.form.picture = res.path;
    },

    /*
    * 上传头像验证
    */
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type;
      var isLt2M = file.size / 1024 / 1024 < 100;

      if (isJPG != "image/png" && isJPG != "image/jpeg" && isJPG != "image/bmp" && isJPG != "image/jpg") {
        this.$message.error('上传头像格式.png, .jpeg, .bmp, jpg!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
     * 查询组织列表数据
     */
    getQueryOrgList: function getQueryOrgList() {
      var self = this;
      self.orgChlidrensimple = [];
      self.$request.requestAxios('get', basePath + '/party_orgs/' + self.userData.partyOrgId + '/partyorgtree', "", function (response) {
        // -------- 给当前的组织树赋值 -----------
        self._getQueryOrgList(response.data.data);
      }, function (error, status) {
        status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('/party_orgs/' + self.userData.partyOrgId + '/partyorgtree - 失败');
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
        this.getQueryArchiveses();
        this.loading = false;
      }
    },
    resetPassword: function resetPassword(formName) {
      var _this3 = this;

      var self = this;
      self.$refs[formName].validate(function (valid) {
        if (valid) {
          self.$request.requestAxios('patch', basePath + '/hr_users/password/', _this3.resetPasswordForm, function (response) {
            self.$message.success(response.data.meta.message);
            self.$refs[formName].resetFields();
          }, function (error, status) {
            status == 200 ? self.$message.error(error.data.meta.message) : self.$message.error('hr_users/password/ - \u5931\u8D25');
          });
        } else {
          return false;
        }
      });
    }
  }
};

/***/ }),

/***/ 1285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Archiveses = __webpack_require__(1318);

var _Archiveses2 = _interopRequireDefault(_Archiveses);

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
    'my-archiveses': _Archiveses2.default //获得性
  },
  data: function data() {
    return {};
  },
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

/***/ 1318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__ = __webpack_require__(1268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1ff7c4ea_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Archiveses_vue__ = __webpack_require__(1321);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1319)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_Archiveses_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1ff7c4ea_hasScoped_false_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_Archiveses_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/personal_manage/messageComponents/Archiveses.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ff7c4ea", Component.options)
  } else {
    hotAPI.reload("data-v-1ff7c4ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1319:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1320);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("48f6207a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ff7c4ea\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Archiveses.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ff7c4ea\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Archiveses.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1320:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.date-type-div {\n  position: relative;\n}\n.date-type-div .type {\n  position: absolute;\n  right: 0;\n  width: 100px;\n  top: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return (_vm.hisToryData
  ? _vm.hisToryData.fromType == 4
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
            [_c("span", [_vm._v("获得性")])]
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
                    _vm._v("|| 个人荣誉 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 1
                              _vm.addArchivesesRow()
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
                        data: _vm.archivesesData.archivesesData1
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "250px",
                          label: "获得荣誉日期"
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
                                              scope.row.dateTime != 1
                                                ? _vm._convertDate(
                                                    scope.row.dateTime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c("el-date-picker", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.dateTime
                                        },
                                        attrs: { type: "date" },
                                        model: {
                                          value: scope.row.dateTime,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "dateTime", $$v)
                                          },
                                          expression: "scope.row.dateTime"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3927665036
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "获得地址" },
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
                        attrs: { align: "left", label: "荣誉名称" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  !scope.row.hasOwnProperty("newAdd")
                                    ? _c("span", [
                                        _vm._v(_vm._s(scope.row.name))
                                      ])
                                    : _c("el-input", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.name
                                        },
                                        model: {
                                          value: scope.row.name,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "name", $$v)
                                          },
                                          expression: "scope.row.name"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          2451335633
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
                                                _vm.saveArchiveses(
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
                                            _vm.delArchiveses(
                                              "archivesesData1",
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
                              4115012390
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
                    _vm._v("|| 技术职称 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 2
                              _vm.addArchivesesRow()
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
                        data: _vm.archivesesData.archivesesData2
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "250px",
                          label: "获得职称日期"
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
                                              scope.row.dateTime != 1
                                                ? _vm._convertDate(
                                                    scope.row.dateTime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c("el-date-picker", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.dateTime
                                        },
                                        attrs: { type: "date" },
                                        model: {
                                          value: scope.row.dateTime,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "dateTime", $$v)
                                          },
                                          expression: "scope.row.dateTime"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3927665036
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "获得地址" },
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
                        attrs: { align: "left", label: "技术职称" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _c(
                                    "span",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            _vm.hisToryData ||
                                            _vm.afferentUserId,
                                          expression:
                                            "hisToryData || afferentUserId"
                                        }
                                      ]
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$util.controlTable(scope.row.name)
                                        )
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !(
                                            _vm.hisToryData ||
                                            _vm.afferentUserId
                                          ),
                                          expression:
                                            "!(hisToryData || afferentUserId)"
                                        }
                                      ],
                                      class: {
                                        "border-red":
                                          scope.row.hasOwnProperty("isBool") &&
                                          scope.row.isBool === 2 &&
                                          !scope.row.name
                                      },
                                      attrs: { placeholder: "请选择" },
                                      model: {
                                        value: scope.row.name,
                                        callback: function($$v) {
                                          _vm.$set(scope.row, "name", $$v)
                                        },
                                        expression: "scope.row.name"
                                      }
                                    },
                                    _vm._l(_vm.tPostOptions, function(item) {
                                      return _c("el-option", {
                                        key: item.key,
                                        attrs: {
                                          label: item.value,
                                          value: item.key
                                        }
                                      })
                                    }),
                                    1
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          1568048367
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
                                                _vm.saveArchiveses(
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
                                            _vm.delArchiveses(
                                              "archivesesData2",
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
                              2127237957
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
                    _vm._v("|| 学历 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 3
                              _vm.addArchivesesRow()
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
                        data: _vm.archivesesData.archivesesData3
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "250px",
                          label: "获得学历日期"
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
                                              scope.row.dateTime != 1
                                                ? _vm._convertDate(
                                                    scope.row.dateTime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c("el-date-picker", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.dateTime
                                        },
                                        attrs: { type: "date" },
                                        model: {
                                          value: scope.row.dateTime,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "dateTime", $$v)
                                          },
                                          expression: "scope.row.dateTime"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3927665036
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "获得地址" },
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
                        attrs: { align: "left", label: "学历名称" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _c(
                                    "span",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            _vm.hisToryData ||
                                            _vm.afferentUserId,
                                          expression:
                                            "hisToryData || afferentUserId"
                                        }
                                      ]
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$util.controlTable(scope.row.name)
                                        )
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !(
                                            _vm.hisToryData ||
                                            _vm.afferentUserId
                                          ),
                                          expression:
                                            "!(hisToryData || afferentUserId)"
                                        }
                                      ],
                                      class: {
                                        "border-red":
                                          scope.row.hasOwnProperty("isBool") &&
                                          scope.row.isBool === 2 &&
                                          !scope.row.name
                                      },
                                      attrs: { placeholder: "请选择" },
                                      model: {
                                        value: scope.row.name,
                                        callback: function($$v) {
                                          _vm.$set(scope.row, "name", $$v)
                                        },
                                        expression: "scope.row.name"
                                      }
                                    },
                                    _vm._l(_vm.educationOptions, function(
                                      item
                                    ) {
                                      return _c("el-option", {
                                        key: item.key,
                                        attrs: {
                                          label: item.value,
                                          value: item.key
                                        }
                                      })
                                    }),
                                    1
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          1208876521
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
                                                _vm.saveArchiveses(
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
                                            _vm.delArchiveses(
                                              "archivesesData3",
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
                              3357987556
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
                    _vm._v("|| 学位 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 4
                              _vm.addArchivesesRow()
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
                        data: _vm.archivesesData.archivesesData4
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "250px",
                          label: "获得学位日期"
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
                                              scope.row.dateTime != 1
                                                ? _vm._convertDate(
                                                    scope.row.dateTime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c("el-date-picker", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.dateTime
                                        },
                                        attrs: { type: "date" },
                                        model: {
                                          value: scope.row.dateTime,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "dateTime", $$v)
                                          },
                                          expression: "scope.row.dateTime"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3927665036
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "获得地址" },
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
                        attrs: { align: "left", label: "学位名称" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _c(
                                    "span",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            _vm.hisToryData ||
                                            _vm.afferentUserId,
                                          expression:
                                            "hisToryData || afferentUserId"
                                        }
                                      ]
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$util.controlTable(scope.row.name)
                                        )
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !(
                                            _vm.hisToryData ||
                                            _vm.afferentUserId
                                          ),
                                          expression:
                                            "!(hisToryData || afferentUserId)"
                                        }
                                      ],
                                      class: {
                                        "border-red":
                                          scope.row.hasOwnProperty("isBool") &&
                                          scope.row.isBool === 2 &&
                                          !scope.row.name
                                      },
                                      attrs: { placeholder: "请选择" },
                                      model: {
                                        value: scope.row.name,
                                        callback: function($$v) {
                                          _vm.$set(scope.row, "name", $$v)
                                        },
                                        expression: "scope.row.name"
                                      }
                                    },
                                    _vm._l(_vm.academicDegreeOptions, function(
                                      item
                                    ) {
                                      return _c("el-option", {
                                        key: item.key,
                                        attrs: {
                                          label: item.value,
                                          value: item.key
                                        }
                                      })
                                    }),
                                    1
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          605048338
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
                                                _vm.saveArchiveses(
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
                                            _vm.delArchiveses(
                                              "archivesesData4",
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
                              4020142595
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
                    _vm._v("|| 执业资格证书 "),
                    !_vm.hisToryData && !_vm.afferentUserId
                      ? _c("i", {
                          staticClass: "el-icon-circle-plus",
                          on: {
                            click: function($event) {
                              _vm.editTypeId = 5
                              _vm.addArchivesesRow()
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
                        data: _vm.archivesesData.archivesesData5
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          align: "left",
                          width: "250px",
                          label: "获得执业资格证书日期"
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
                                              scope.row.dateTime != 1
                                                ? _vm._convertDate(
                                                    scope.row.dateTime
                                                  )
                                                : ""
                                            ) +
                                            "\n          "
                                        )
                                      ])
                                    : _c("el-date-picker", {
                                        class: {
                                          "border-red":
                                            scope.row.hasOwnProperty(
                                              "isBool"
                                            ) &&
                                            scope.row.isBool === 2 &&
                                            !scope.row.dateTime
                                        },
                                        attrs: { type: "date" },
                                        model: {
                                          value: scope.row.dateTime,
                                          callback: function($$v) {
                                            _vm.$set(scope.row, "dateTime", $$v)
                                          },
                                          expression: "scope.row.dateTime"
                                        }
                                      })
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          3927665036
                        )
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { align: "left", label: "获得地址" },
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
                        attrs: { align: "left", label: "执业资格证书名称" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(scope) {
                                return [
                                  _c(
                                    "span",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            _vm.hisToryData ||
                                            _vm.afferentUserId,
                                          expression:
                                            "hisToryData || afferentUserId"
                                        }
                                      ]
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.$util.controlTable(scope.row.name)
                                        )
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-select",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !(
                                            _vm.hisToryData ||
                                            _vm.afferentUserId
                                          ),
                                          expression:
                                            "!(hisToryData || afferentUserId)"
                                        }
                                      ],
                                      class: {
                                        "border-red":
                                          scope.row.hasOwnProperty("isBool") &&
                                          scope.row.isBool === 2 &&
                                          !scope.row.name
                                      },
                                      attrs: { placeholder: "请选择" },
                                      model: {
                                        value: scope.row.name,
                                        callback: function($$v) {
                                          _vm.$set(scope.row, "name", $$v)
                                        },
                                        expression: "scope.row.name"
                                      }
                                    },
                                    _vm._l(_vm.practiceOptions, function(item) {
                                      return _c("el-option", {
                                        key: item.key,
                                        attrs: {
                                          label: item.value,
                                          value: item.key
                                        }
                                      })
                                    }),
                                    1
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          false,
                          1367970744
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
                                                _vm.saveArchiveses(
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
                                            _vm.delArchiveses(
                                              "archivesesData5",
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
                              4066184354
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-1ff7c4ea", esExports)
  }
}

/***/ }),

/***/ 1334:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1335);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("6f48698a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0289bd41\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Archiveses.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0289bd41\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!../../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./Archiveses.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1335:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.date-type-div {\n  position: relative;\n}\n.date-type-div .type {\n  position: absolute;\n  right: 0;\n  width: 100px;\n  top: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 1336:
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
      _c("my-archiveses", {
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-0289bd41", esExports)
  }
}

/***/ })

});