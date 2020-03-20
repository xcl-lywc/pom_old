webpackJsonplensyn_ui([62],{

/***/ 1210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionLibrary_vue__ = __webpack_require__(1557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionLibrary_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionLibrary_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionLibrary_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionLibrary_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b5fa9152_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_QuestionLibrary_vue__ = __webpack_require__(1924);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1920)
  __webpack_require__(1922)
}
var normalizeComponent = __webpack_require__(42)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b5fa9152"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_QuestionLibrary_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_b5fa9152_hasScoped_true_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_QuestionLibrary_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "devPkg/components/testing/QuestionLibrary.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b5fa9152", Component.options)
  } else {
    hotAPI.reload("data-v-b5fa9152", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 1557:
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
//
//
//
//
//
//
//
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
    var checkTime = function checkTime(rule, value, callback) {

      if (!value) {
        callback(new Error('请选择时间区间'));
      } else {
        if (value > new Date().getTime()) {
          callback(new Error('时间必须选当前时间之前'));
        } else {
          callback();
        }
      }
    };
    return {
      loading: false,
      cardsLoading: false,

      imgServer: basePath + '/sys/ueditor/file?action=uploadimage',
      fileServer: null,
      token: { "Authorization": 'Bearer ' + JSON.parse(sessionStorage.getItem("userData")).token },

      orgId: JSON.parse(sessionStorage.getItem("orgId")),
      orgCode: sessionStorage.getItem("orgCode"),

      treeData: [], //党组织的树形结构
      defaultProps: {
        children: 'childrens', //树的配置
        label: 'name'
      },
      //表单
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

      //验证
      rules: {
        type: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
        content: [{ required: true, message: '请输入题干信息', trigger: 'blur' }],
        score: [{ required: true, message: '请选择分值', trigger: 'blur' }]
        // createrOrgTime: [
        //   { validator: checkTime, trigger: 'blur' },
        //   { validator: checkTime, trigger: 'change' },
        //   { required: true, message: '请选择成立日期', trigger: 'blur' }
        // ]
      },
      //分页
      listData: [],
      currentPage: 1,
      currentPerPage: 5,
      total: null,

      typeName: null, //类型input名称
      tempLevel: null, //当前操作的层级 sameLevel本级 childLevel子级 topLevel 顶级
      tempId: null, //鼠标移动到对应的节点, 记录此节点id, 显示对应的操作按钮
      tempOperateType: null, //当前操作模式 new新增 edit编辑
      tempOperateObj: {}, //当前触发操作的data对象
      parentType: null, //父节点的类型, 用于判断 添加或编辑节点的类型
      formDialogVisible: false,

      importDialogVisible: false,
      fileList: []
    };
  },


  components: {},
  mounted: function mounted() {
    this.getTreeData('/knowledges/knowledges/all_tree', "treeData");
  },

  watch: {
    "questionForm.type": {
      handler: function handler(oldV, newV) {
        console.log(newV);
        this.questionForm.answerList = [//重置答案列表
        {
          content: "",
          exactness: false
        }];
      },

      deep: true
    }
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
     * 获取字典表数据
     * @return {[type]} [description]
     */
    getDictionaryData: function getDictionaryData() {
      var self = this;

      var config = {
        url: basePath + '/contrast/all_contrast_info',
        method: "get"
      };

      self.$request.requestAxios(config.method, config.url, null, function (response) {
        response.data.data.forEach(function (item) {
          switch (item.id) {
            case 8:
              //党组织职位
              self.dictionaryPosition = item.list;
              break;
            default:
              break;
          }
        });
      }, function (error) {
        self.$message.error("获取数据对照表失败, 部分功能无法使用");
      });
    },

    /**
     * 获取树形数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getTreeData: function getTreeData(url, target, method) {
      var _this = this;

      var self = this;
      self.loading = true;
      self.formDialogVisible = false;

      self.$request.requestAxios(method || 'get', '' + basePath + url, null, function (response) {
        self[target] = response.data.data;
        self.tempId = response.data.data[0].id;
        _this.getListData('/questions/questions/choice/list', "listData");
        self.loading = false;
      }, function (error) {
        self.$message.error(error);
        self.loading = false;
      });
    },

    /**
     * 获取列表数据
     * @param  {string} url    请求地址
     * @param  {string} target 需要保存的数据目标名称
     * @return none
     */
    getListData: function getListData(url, target, method) {
      var self = this;
      self.cardsLoading = true;
      self.formDialogVisible = false;

      var params = {
        knowledgeId: self.tempId,
        pageSize: self.currentPerPage,
        pageNum: self.currentPage
      };

      self.$request.requestAxios('post', '' + basePath + url, params, function (response) {
        self[target] = response.data.data.rows;
        self.total = response.data.data.total;
        self.cardsLoading = false;
      }, function (error) {
        self.$message.error(error);
        self.cardsLoading = false;
      });
    },
    handleSizeChange: function handleSizeChange(val) {
      this.currentPerPage = val;
      this.getListData('/questions/questions/choice/list', "listData");
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData('/questions/questions/choice/list', "listData");
    },

    /**
     * 点击添加至试题篮 取出session中的数据 进行对比添加 不可重复添加
     * @param {[type]} data [description]
     */
    addToBasket: function addToBasket(data) {
      var _this2 = this;

      if (!sessionStorage.getItem("basket")) {
        // 不存在试题篮数据
        var array = [];
        array.push(data.id);
        sessionStorage.setItem("basket", (0, _stringify2.default)(array));
      } else {
        //已经生成过试题篮
        var _array = JSON.parse(sessionStorage.getItem("basket"));

        if (_array.length > 0) {
          var flag = true;

          _array.forEach(function (item, index) {
            if (item == data.id) {
              flag = false;
              _this2.$message.warning("试题篮中已存在本题");
            }
          });

          if (flag) {
            _array.push(data.id);
            this.$message.success("成功添加到试题篮");
          }
        } else {
          _array.push(data.id);
          this.$message.success("成功添加到试题篮");
        }
        sessionStorage.setItem("basket", (0, _stringify2.default)(_array));
      }
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
     * 获取党组织详情中的数据(使用promise时需要将promise放在函数中, 否则将会立刻执行)
     * @return {[type]} [description]
     */
    getPartyDetail: function getPartyDetail(item) {
      var self = this;
      //初始化promise对象, 完成异步操作后return此对象, 外部方法链式调用then进行下一步操作
      self.$request.requestAxios("get", basePath + '/knowledges/knowledges/details', { params: { id: item.id } }, function (response) {
        self.questionForm = response.data.data;

        self.loading = false;
        self.formDialogVisible = true;
        self.$nextTick(function () {
          if (self.$refs.questionForm) {
            self.$refs.questionForm.clearValidate();
          }
        });
      }, function (error) {
        self.loading = false;
        self.$message.error(error.data.meta.message || "失败");
      });
    },

    /**
     * 点击节点, 保存当前的Id, 并查询列表
     * @param  {object} data 当前树节点的数据
     * @return {[type]}      [description]
     */
    clickNode: function clickNode(data) {
      this.tempId = data.id;
      this.currentPage = 1;
      this.currentPerPage = 5;
      this.getListData('/questions/questions/choice/list', "listData");
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
      var _this3 = this;

      var index = this.questionForm.answerList.indexOf(item);
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        if (index !== -1) {
          _this3.questionForm.answerList.splice(index, 1);
        }
        // TODO 优化当用户删除已有答案时, 当前选中的正确答案需要跟随变化
      }).catch(function () {});
    },

    /**
     * 点击确定, 添加/编辑 节点提交 (顶层/子集), 提示当前选择的公司数组
     * @param  {string} formName [description]
     * @return {[type]}          [description]
     */
    submitForm: function submitForm(formName) {
      var self = this;

      self[formName].knowledgeId = self.tempId;

      var result = self.handleForm(self[formName]);

      if (result) {

        var config = {
          url: basePath + '/questions/questions/add/from_org/' + self.orgCode,
          method: "post",
          data: result
        };
        self.$refs[formName].validate(function (valid) {
          if (valid) {
            self.loading = true;
            self.$request.requestAxios(config.method, config.url, config.data, function (response) {
              self.$message.success(response.data.meta.message);
              //重新查询
              self.getListData('/questions/questions/choice/list', "listData");
              self.loading = false;
              self.formDialogVisible = false;
            }, function (error) {
              self.$message.error(error.data.meta.message || "失败");
              self.loading = false;
            });
          } else {
            self.$message.error("请检查必填项");
            return false;
          }
        });
      } else {
        self.$message.error("请至少选中一个将其设为正确答案");
      }

      // if(self.tempOperateType == "edit") {
      //   config.url    = `${basePath}/knowledges/knowledges/update/${self.tempOperateObj.id}/from_org/${self.orgCode}`
      //   config.method = "patch"
      // }

      // if (self.tempLevel == "sameLevel") { //添加同级党组织
      //   self.questionForm.parentId   = self.tempOperateObj.parentId
      // } else if (self.tempLevel == "childLevel") { // 添加本级公司的下级党组织
      //   self.questionForm.parentId = self.tempOperateObj.id
      // } else { //点击添加顶层组织
      //   self.questionForm.parentId = null
      // }
      // //追加选中公司的id数组
      // // self.questionForm.companyId = self.$refs.companyEdit.getArray("id")

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
    importButtonClicked: function importButtonClicked() {
      this.fileList = [];
      this.fileServer = basePath + '/questions/import/' + this.tempId + '/from_org/' + sessionStorage.getItem("orgCode");
      this.importDialogVisible = true;
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
    importQuestions: function importQuestions() {
      var self = this;
    },
    beforeImportUpload: function beforeImportUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      var extension = testmsg === 'xls';
      var extension2 = testmsg === 'xlsx';
      var isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.preventBeforeDelete = true;
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.preventBeforeDelete = true;
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M;
    },

    /**
     * 自定义上传
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    userUpload: function userUpload(fileParams) {

      var self = this;

      var param = new FormData(); //创建form对象
      param.append('file', fileParams.file); //通过append向form对象添加数据

      var config = {
        url: basePath + '/questions/import/' + this.tempId + '/from_org/' + sessionStorage.getItem("orgCode"),
        method: "post",
        data: param
      };

      self.$request.requestAxios(config.method, config.url, config.data, function (response) {
        self.$util._fileBold(response);
      }, function (error) {}, { responseType: "blob" }, { headers: { 'Content-Type': 'application/' } });
    },

    /**
     * 上传文件成功的回调
     * @param  {object} response 响应
     * @param  {object} file     当前文件的信息
     * @param  {array}  fileList 文件列表
     * @return none
     */
    handleImportSuccess: function handleImportSuccess(response, file, fileList, sad) {
      // let fileName = decodeURI(respose.headers['content-disposition'].substring(20, respose.headers['content-disposition'].length));
      var url = window.URL.createObjectURL(new Blob([response.data]));
      var link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', '010.xlsx');
      document.body.appendChild(link);
      link.click();
    },

    /**
     * 确认删除, 还原上传状态, 清空数据
     * @param  {object} file     当前文件的信息
     * @param  {array}  fileList 文件列表
     * @return none
     */
    handleImportRemove: function handleImportRemove(file, fileList) {},

    /**
     * 文件数量溢出的钩子
     * @param  {object} file     当前文件的信息
     * @param  {array}  fileList 文件列表
     * @return none
     */
    handleImportExceed: function handleImportExceed(files, fileList) {
      this.$message.warning('\u5F53\u524D\u9650\u5236\u9009\u62E9 1 \u4E2A\u6587\u4EF6\uFF0C\u672C\u6B21\u9009\u62E9\u4E86 ' + files.length + ' \u4E2A\u6587\u4EF6\uFF0C\u5171\u9009\u62E9\u4E86 ' + (files.length + fileList.length) + ' \u4E2A\u6587\u4EF6');
    },

    /**
     * 上传出错的钩子
     * @param  {object} file     当前文件的信息
     * @param  {array}  fileList 文件列表
     * @return none
     */
    handleImportError: function handleImportError(errorMsg, file, fileList) {
      this.$message.error(errorMsg);
    }
  }
};

/***/ }),

/***/ 1920:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1921);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("7072c393", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b5fa9152\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./QuestionLibrary.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b5fa9152\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=0!./QuestionLibrary.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1921:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.card-item[data-v-b5fa9152] {\n  margin-bottom: 20px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n}\n.card-item[data-v-b5fa9152]:hover {\n  box-shadow: 0 5px 15px #ccc;\n  border: 1px solid #eee;\n}\n.button-group[data-v-b5fa9152] {\n  padding: 10px;\n  background: #fff;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n}\n.custom-tree-node[data-v-b5fa9152] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  font-size: 14px;\n}\n.custom-tree-node .tree-right-operate[data-v-b5fa9152] {\n  margin-left: 15px;\n}\n.answer-wrap[data-v-b5fa9152] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.answer-wrap .margin-radio[data-v-b5fa9152] {\n  margin: 0 10px;\n}\n.flex-form-item[data-v-b5fa9152] {\n  height: 32px;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n.cards-wrap[data-v-b5fa9152] {\n  max-height: calc( 100vh - 205px);\n  overflow: auto;\n}\n.el-card[data-v-b5fa9152] {\n  margin: 10px 0;\n}\n.el-card .img-wrap[data-v-b5fa9152] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n}\n.el-card .img-wrap img[data-v-b5fa9152],\n.el-card .img-wrap .no-img-div[data-v-b5fa9152] {\n  line-height: 100px;\n  text-align: center;\n  height: 100px;\n  width: 100px;\n}\n.question-info[data-v-b5fa9152] {\n  margin-top: 15px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n/*上传图片*/\n.avatar-wrap[data-v-b5fa9152] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  border: 1px dashed #ccc;\n  border-radius: 5px;\n}\n.avatar-wrap[data-v-b5fa9152]:hover {\n  border: 1px dashed #409EFF;\n  color: #409EFF;\n}\n.avatar-img[data-v-b5fa9152] {\n  max-width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 1922:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1923);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("18879ef6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b5fa9152\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./QuestionLibrary.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.11@css-loader/index.js!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b5fa9152\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.7.3@vue-loader/lib/selector.js?type=styles&index=1!./QuestionLibrary.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1923:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.left-margin-50 .el-form-item__content {\n  margin-left: 50px!important;\n}\n.text-blue {\n  color: #409EFF;\n}\n", ""]);

// exports


/***/ }),

/***/ 1924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "content-area" },
    [
      _c(
        "el-row",
        { attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { span: 6 } },
            [
              _c("el-tree", {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.loading,
                    expression: "loading"
                  }
                ],
                ref: "partyTree",
                attrs: {
                  data: _vm.treeData,
                  "node-key": "id",
                  props: _vm.defaultProps,
                  "expand-on-click-node": false
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var node = ref.node
                      var data = ref.data
                      return _c(
                        "span",
                        {
                          staticClass: "custom-tree-node",
                          on: {
                            click: function($event) {
                              return _vm.clickNode(data)
                            }
                          }
                        },
                        [
                          _c(
                            "span",
                            { class: { "text-blue": _vm.tempId == data.id } },
                            [
                              _vm.tempId == data.id
                                ? _c("i", {
                                    staticClass: "el-icon-circle-check",
                                    attrs: { "aria-hidden": "true" }
                                  })
                                : _vm._e(),
                              _vm._v(
                                "\n          " +
                                  _vm._s(node.label) +
                                  "\n          "
                              )
                            ]
                          )
                        ]
                      )
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { span: 18 } },
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary", icon: "el-icon-plus" },
                  on: {
                    click: function($event) {
                      _vm.formDialogVisible = true
                    }
                  }
                },
                [_vm._v("添加题目")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary", icon: "el-icon-document" },
                  on: { click: _vm.importButtonClicked }
                },
                [_vm._v("导入题目")]
              ),
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
                    { key: index + "列表", staticClass: "card-item" },
                    [
                      _c(
                        "el-row",
                        { attrs: { gutter: 10 } },
                        [
                          _c("el-col", { attrs: { span: 18 } }, [
                            _vm._v(
                              "\n              " +
                                _vm._s(item.content) +
                                "\n              "
                            ),
                            _c(
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
                            {
                              staticClass: "question-info",
                              attrs: { span: 24 }
                            },
                            [
                              _c("p", [
                                _vm._v("题型:\n                "),
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
                                          return _vm.$router.push({
                                            name: "Question_Detail",
                                            params: { id: item.id }
                                          })
                                        }
                                      }
                                    },
                                    [_vm._v("查看解析")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", size: "small" },
                                      on: {
                                        click: function($event) {
                                          return _vm.addToBasket(item)
                                        }
                                      }
                                    },
                                    [_vm._v("试题篮")]
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
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "添加",
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
                  value: _vm.loading,
                  expression: "loading"
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
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "导入",
            visible: _vm.importDialogVisible,
            "close-on-click-modal": false,
            top: "150px",
            width: "65%"
          },
          on: {
            "update:visible": function($event) {
              _vm.importDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-upload",
            {
              attrs: {
                action: _vm.fileServer,
                headers: _vm.token,
                "on-success": _vm.handleImportSuccess,
                "on-remove": _vm.handleImportRemove,
                "on-error": _vm.handleImportError,
                limit: 1,
                "http-request": _vm.userUpload,
                "on-exceed": _vm.handleImportExceed,
                "file-list": _vm.fileList,
                beforeUpload: _vm.beforeImportUpload
              }
            },
            [
              _c("el-button", { attrs: { size: "small", type: "primary" } }, [
                _vm._v("点击上传")
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "el-upload__tip",
                  attrs: { slot: "tip" },
                  slot: "tip"
                },
                [_vm._v("单次仅支持一次上传一个文件, 文件大小不可超过10M")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "el-upload__tip",
                  attrs: { slot: "tip" },
                  slot: "tip"
                },
                [_vm._v("重复上传时请删除当前文件后, 重新上传")]
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
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-b5fa9152", esExports)
  }
}

/***/ })

});