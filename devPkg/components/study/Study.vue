<template>
  <div style="width:100vw" class="container">
  <!-- 左侧分类 -->
    <div class="left-manage">
      <ul>
        <a href="javascript:void(0);" v-for="(item, index) in specialListData" @click="changeSpecial(item.id)">
          <li class="special-item" :class="{'active': activeSpecial == item.id}" :title="item.name"> {{ item.name }}</li>
        </a>
      </ul>
    </div>
    <!-- 右侧主体 -->
    <div class="right-manage">
      <div class="add-study-button">
        <el-button :disabled="resource.indexOf(28) == -1" icon="el-icon-circle-plus-outline" @click="addStudy" circle></el-button>
      </div>
      
      <el-tabs v-model="activeTab" @tab-click="clickTab">
        <el-tab-pane label="未完成的" :name="1"></el-tab-pane>
        <el-tab-pane label="已完成的" :name="2"></el-tab-pane>
        <el-tab-pane label="我执行的" :name="3"></el-tab-pane>
        <el-tab-pane label="我发出的" :name="4"></el-tab-pane>
        <el-tab-pane label="抄送我的" :name="5"></el-tab-pane>
      </el-tabs>
      <div v-if="listData && listData.length > 0" v-loading="cardsLoading">
        <el-card v-for="(item, index) in listData" class="card-item" :key="`item${index}`" @click.native="getStudyDetail(item.id)">
          <p class="title-wrap"><span>{{ item.taskName }}</span><span class="right-date-time">创建时间: {{$util._convertDate(item.createTime, 'yyyy-MM-dd')}}</span></p>
          <p class="deadline">截止时间: {{$util._convertDate(item.endTime, 'yyyy-MM-dd')}}</p>
          <div class="bottom-wrap">
            <div class="complete-people">
            <img class="marr5" src="../../images/org_user_icon.png">
              <span v-if="item.allTask == 0 || (item.finishs == item.allTask)">全部已完成</span>
              <span v-else>{{ item.finishs }}/{{ item.allTask }}已完成</span>
            </div>
            <div class="comment-count"><img class="marr5" src="../../images/ifor_icon.png">{{ item.reviewVo.total}}</div>
          </div>
        </el-card>
      </div>
      <p v-else class="no-data-text">暂无数据</p>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="currentPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 添加学习教育 -->
    <el-dialog
      title="添加"
      :visible.sync="studyDialogVisible"
      :close-on-click-modal="false"
      @close="specialDialogClosed"
      width="60vw">
      <el-row v-loading="studyDialogLoading">
        <el-form ref="studyForm" :model="studyForm" :rules="rules" label-width="80px" size="small">
          <el-col :span="14">
            <el-form-item label="标题" prop="learnName">
              <el-input type="text" v-model="studyForm.learnName"></el-input>
            </el-form-item>
            <el-form-item label="形式" prop="learnType">
              <el-select type="text" v-model="studyForm.learnType" class="fill-width">
                <!-- <el-option :value="0" label="自主选择"></el-option> -->
                <el-option :value="1" label="集中学习"></el-option>
                <el-option :value="2" label="自主学习"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" prop="beginTime">
              <el-date-picker
                style="width: 100%"
                type="daterange"
                v-model="studyDateRange"
                value-format="timestamp"
                :editable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="right-participant-list">
            <p class="participant-label">参与: </p>
            <span v-show="participantNull" class="validate-text">请选择参与的 组织/角色 </span>
            <div class="participant-item-wrap" v-if="orgType == 1">
              <p class="participant-title">职能部门</p>
              <el-checkbox-group class="participant-item-inner" v-model="funcData" size="small">
                <el-checkbox v-for="item in funcListData" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
              <div class="no-checkbox-data" v-if="funcListData && funcListData.length == 0">暂无数据</div>
            </div>

            <div class="participant-item-wrap" v-if="orgType == 1">
              <p class="participant-title">支部</p>
              <el-checkbox-group v-if="partListData && partListData.length != 0" class="participant-item-inner" v-model="partData" size="small">
                <el-checkbox  v-for="item in partListData" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
                <div class="no-checkbox-data" v-if="partListData && partListData.length == 0">暂无数据</div>
              </el-checkbox-group>
            </div>

            <div class="participant-item-wrap" v-if="orgType != 1">
              <p class="participant-title">党员</p>
              <tree-selected 
                selectionType="checked"
                pageType="org" @treeCheckedData="peopleTreeChanged">
              </tree-selected>
              <!-- <el-checkbox-group class="participant-item-inner" v-model="memberData" size="small">
                <el-checkbox v-for="item in memberListData" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
              <div class="no-checkbox-data" v-if="memberListData && memberListData.length == 0">暂无数据</div> -->
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="studyForm.learnInfo" placeholder="请输入介绍内容"></el-input>
            </el-form-item>
            <el-form-item label="学习要求">
              <el-input type="textarea" v-model="studyForm.learnRequire" placeholder="请输入学习要求"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="needApprove" label="书记审批" border></el-checkbox>
              <el-checkbox v-model="needSubReport" label="思想汇报" border></el-checkbox>
            </el-form-item>
            <el-form-item label="学习专题" required>
              <div v-if="studyForm.learnSpecials && studyForm.learnSpecials.length > 0">
                <el-tag
                  v-for="tag in studyForm.learnSpecials"
                  :key="tag.name"
                  class="learn-special-tags"
                  closable
                  @close="deleteSpecial(tag)">
                  {{ tag.name }}
                </el-tag>
              </div>
              <div v-if="!addStatus">
                <el-button class="add-special-button" type="primary" size="small" @click="addStatus = true ,choosedSpecial = null">添加专题 + </el-button>
              </div>
              <div v-else class="add-special-content">
                <el-select v-model="choosedSpecial" value-key="id" ref="learnSpecialSelect">
                  <el-option v-for="(item, index) in specialListData" :label="item.name" :value="item" :key="`select列表的${index}`"></el-option>
                </el-select>
                <el-button type="primary" size="small" @click="addSpecial">确认添加</el-button>
                <el-button type="default" size="small" @click="addStatus = false ,choosedSpecial = null">取消</el-button>
              </div>
              <span v-show="specialsNull" class="validate-text" style="margin-top: 0">请至少添加一个专题</span>
            </el-form-item>

          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="addStatus || studyDialogLoading" @click="submitForm('studyForm')">确认</el-button>
        <el-button type="default" @click="studyDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 学习教育 详情 -->
    <el-dialog
      title="学习教育"
      v-loading="detailLoading"
      :visible.sync="detailDialogVisible"
      :close-on-click-modal="false"
      @close="resetDetailForm"
      width="60vw">
      <div class="detail-item-wrap">
        <span class="detail-item-label">标题: </span>
        <span class="detail-item-content">{{ detailData.learnName }}</span>
      </div>
      <div class="detail-item-wrap">
        <span class="detail-item-label">形式: </span>
        <span v-if="detailData.learnType == 0" class="detail-item-content">自主选择</span>
        <span v-else-if="detailData.learnType == 1" class="detail-item-content">集中学习</span>
        <span v-else class="detail-item-content">自主学习</span>
      </div>
      <div class="detail-item-wrap">
        <span class="detail-item-label">描述: </span>
        <span class="detail-item-content">{{ detailData.learnInfo }}</span>
      </div>
      <div class="detail-item-wrap">
        <span class="detail-item-label">要求: </span>
        <span class="detail-item-content">{{ detailData.learnRequire }}</span>
      </div>
      <div class="detail-item-wrap">
        <span class="detail-item-label">时间: </span>
        <span class="detail-item-content">{{ $util._convertDate(detailData.beginTime, 'yyyy-MM-dd') }} 至 {{ $util._convertDate(detailData.endTime, 'yyyy-MM-dd') }}</span>
      </div>
      <div class="detail-item-wrap">
        <span class="detail-item-label">专题: </span>
        <span class="detail-item-content">
          <el-tag
            v-for="tag in detailData.learnSpecials"
            :key="tag.name">
            {{ tag.name }}
          </el-tag>
        </span>
      </div>
      <div class="detail-item-wrap">
        <span class="detail-item-label">子任务: </span>
        <span v-if="detailData.tasks && detailData.tasks.length > 0" class="detail-item-content">
          <div v-for="item in detailData.tasks" :key="`子任务${item.id}`" class="child-misson-wrap">
            <span>{{ item.name }} -- {{item.state}} : {{item.processName}}</span>
          </div>
        </span>
        <span v-else class="detail-item-content child-misson-wrap">暂无子任务</span>
      </div>
      <div class="review-list-wrap">
        <div v-for="(item, index) in reviewData" :key="`评论${index}`" class="review-item-wrap">
          <img :src="item.picture" style="width: 50px;height: 50px;">
          <div>
            <p>{{ item.creator }} {{ $util._convertDate(item.createTime, 'yyyy-MM-dd') }}</p>
            <p>{{ item.commentContent }}</p>
          </div>
        </div>
        <div class="no-data-text" v-if="reviewData && reviewData.length == 0">暂无评论</div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-form ref="reviewForm" :model="reviewForm" size="small" @submit.native.prevent>
          <el-form-item
          prop="commentContent"
          :rules="[
            { required: true, message: '请输入评论内容', trigger: '' }
          ]">
            <div class="input-button-group">
              <el-input ref="commentInput" type="text" v-model="reviewForm.commentContent" @keyup.enter.native="submitForm('reviewForm')"></el-input>
              <el-button type="primary" @click="submitForm('reviewForm')">发送</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs   from "qs"
  import Query_Tree_Selected from '../common/tree_select/Query_Tree_Selected.vue'
  export default {
    data () {
      return {
        orgCode:  sessionStorage.getItem("orgCode"),
        cardsLoading:       false,
        detailLoading:      false,
        studyDialogLoading: false,

        activeTab:       1,     //tab对应的数据
        activeSpecial:   null,
        specialListData: [],    //左侧专题列表

        listData:        [],    //页面主体list
        currentPage:     1,
        currentPerPage:  5,
        total:           null,

        studyDialogVisible: false,
        orgType:            null,  //当前组织的类型, 判定显示职能部门&支部 / 党员的checkbox-group的显示
        needValidate:       true,  //是否需要触发表单验证的标识, 在特殊情况下需要不触发验证, 使用此属性
        /* ----- 表单需要使用的数据 ---- */
        studyDateRange:  null,  //日期选择的数据
        funcListData:    [], //职能部门
        funcData:        [], //职能部门 选中的对象
        partListData:    [], //支部
        partData:        [], //支部 选中的对象
        memberData:      [], //支部 选中的对象
        participantNull: false, //参与 是否全部为空
        needApprove:     false, //书记审批 1需要 2不需要
        needSubReport:   false, //思想汇报 1需要 2不需要
        addStatus:       false, //当前处于添加专题的状态, 显示slecet, 隐藏添加按钮
        choosedSpecial:  null,  //学习教育中添加专题的数据
        specialsNull:    false, //控制是否显示 提示为空字段
        studyForm: {
          beginTime:     null,
          endTime:       null,
          learnInfo:     null,
          learnName:     null,
          learnRequire:  null,
          learnSpecials: [],
          learnType:     1, // 学习形式
          needApprove:   2, //书记审批 1需要 2不需要
          needSubReport: 2, //思想汇报 1需要 2不需要
        },
        rules: {
          learnName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          learnType: [
            { required: true, message: '请输入描述', trigger: 'change' },
          ],
          beginTime: [ //开始和结束时间只需验证一个
            { required: true, message: '请选择时间', trigger: 'blur' },
          ],
          learnSpecials: [
            { required: true, message: '请添加至少一个专题', trigger: 'blur'},
          ],
        },
        /* ----- 表单需要使用的数据 ---- */
        detailDialogVisible: false,
        detailData:          {},
        tempDetailId:        null,
        reviewData:          {},
        reviewForm:          { //评论表单
          commentContent: null,
          fromType:       6,
          fromId:         null
        },

        resource: JSON.parse(sessionStorage.getItem('resource'))
      }
    },
    components:{
      "tree-selected": Query_Tree_Selected ,//人员下拉树
    },
    mounted () {
      this.getSpecialList().then(() => {
        this.getStudyListData(1, 5)
      })
      // 根据当前的组织类型type 查询不同的参与类型
      this.$request.requestAxios("get", `${basePath}/party_orgs/${sessionStorage.getItem("orgId")}/partyorg`, null, 
        (response) => {
          this.orgType = parseInt(response.data.data.type)
          if(this.orgType == 1) {
            this.getParticipantListData(parseInt(response.data.data.type), 1)
            this.getParticipantListData(parseInt(response.data.data.type), 2)
          } else {
            this.getParticipantListData(parseInt(response.data.data.type))
          }
        },
        (error) => {
          this.orgType = null
        }
      )
    },
    computed: {
    },
    watch: {
      // 监听form外部的属性, 根据获得的值写入form中, 并触发表单验证
      "studyDateRange": {
        handler (newV, oldV) {
          if(!newV) {
            this.studyForm.beginTime = null
            this.studyForm.endTime   = null
          } else {
            this.studyForm.beginTime = newV[0]
            this.studyForm.endTime   = newV[1]
          }
          if(this.needValidate) {
            this.$refs.studyForm.validateField("beginTime", (errorMessage) => {
              //验证未通过
              console.log(newV)
            })
          }
        },
        deep: false
      },
      "needApprove": {
        handler (newV) {
          newV ? this.studyForm.needApprove = 1 : this.studyForm.needApprove = 2
        },
        deep: false
      },
      "needSubReport": {
        handler (newV) {
          newV ? this.studyForm.needSubReport = 1 : this.studyForm.needSubReport = 2
        },
        deep: false
      }
    },
    methods: {
      /**
       * 获取左侧学习专题列表
       * @return {[type]} [description]
       */
      getSpecialList () {
        let self = this;

        let p = new Promise((resolve, reject) => {
          self.$request.requestAxios("get", `${basePath}/t_task_special/learn_special/id_name/from_org/${this.orgCode}`, null, 
            (response) => {
              self.specialListData = response.data.data
              if(response.data.data.length > 0) {
                self.activeSpecial   = response.data.data[0].id
              }
              
              resolve(self.activeSpecial)
            },
            (error) => {
              reject("获取学习专题列表失败")
          })
        })

        return p
      },
      /**
       * 点击顶部tabs 切换状态
       * @param  {[type]} tab   [description]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      clickTab (tab, event) {
        this.activeTab = tab.name
        this.getStudyListData()
      },
      /**
       * 点击左侧学习专题
       * @param  {[type]} specialId [description]
       * @return {[type]}           [description]
       */
      changeSpecial(specialId) {
        this.activeSpecial = specialId
        this.getStudyListData(1, 5)
      },
      /**
       * 获取右侧 参与 列表
       * @param  {number} type 当前组织的类型
       * @param  {number} func 当前组织是否是职能部门
       * @return {[type]}      [description]
       */
      getParticipantListData (type, func) {
        let self = this
        let url;
        let data = {
          params: {
            id: parseInt(sessionStorage.getItem("orgId"))
          }
        }
        if (type == 1) {
          url = `${basePath}/party_orgs/chidrens`
          data.params.function = func
        } else {
          url = `${basePath}/party_orgs/members`
        }

        self.$request.requestAxios("get", url, data, 
          (response) => {
            if(func) {
              func == 1 ? self.funcListData = response.data.data : self.partListData = response.data.data
            } else {
              self.memberListData = response.data.data
            }
          },
          (error) => {

        })

      },
      /**
       * 获取主体的学习教育列表
       * @return {[type]} [description]
       */
      getStudyListData (page, perPage) {
        let self = this;

        let search = qs.stringify({
          special:  self.activeSpecial,  //学习专题Id
          type:     2, // 固定为2
          orgId:    parseInt(sessionStorage.getItem("orgId")),
          status:   self.activeTab,
          pageSize: perPage || self.currentPerPage,
          pageNum:  page || self.currentPage
        })

        self.$request.requestAxios("get", `${basePath}/t_tasks/list/org?${search}`, null, 
          (response) => {
            self.listData = response.data.data.rows
            self.total    = response.data.data.total
          },
          (error) => {
        })
      },
      handleSizeChange(val) {
        this.currentPerPage = val
        this.getStudyListData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getStudyListData()
      },
      /**
       * 获取学习教育详情以及评论列表
       * @return {[type]} [description]
       */
      getStudyDetail (studyId) {
        let self = this
        // 查询基本信息
        self.tempDetailId = studyId

        self.$request.requestAxios("get", `${basePath}/t_task/learn/details/from_org/${self.orgCode}`,
          {params :{
            id: studyId
          }}, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.detailData = response.data.data
            } else {
              self.$message.error("获取详情失败")
            }
            this.detailDialogVisible = true
          },
          (error) => {
            self.$message.error("失败")
        })
        // 查询评论列表
        self.$request.requestAxios("get", `${basePath}/t_tasks/review/list?fromId=${studyId}&fromType=6`, null, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.reviewData   = response.data.data.rows
            } else {
              self.$message.error("获取评论失败")
            }
          },
          (error) => {
            self.$message.error("失败")
        })
      },
      /**
       * 点击添加学习
       */
      addStudy () {
        this.studyDialogVisible = true
        this.needValidate       = true //恢复需要验证的状态
      },
      /**
       * 模态框中点击确认添加, 添加一个学习专题, 添加成功时重置learnSpecials表单验证状态
       */
      addSpecial () {
        
        let multiFlag = false // 判断是否重复

        if(this.choosedSpecial) {
          this.studyForm.learnSpecials.forEach((item, index)=>{
            item.id == this.choosedSpecial.id ? multiFlag = true : ""
          })

          if(multiFlag) {
            this.$message.error("已有重复的专题")
          } else { 
            this.studyForm.learnSpecials.push(this.choosedSpecial)
            this.addStatus      = false;
            this.choosedSpecial = null;
            this.specialsNull   = false;
          }
        } else {
          this.$message.error("请在下拉框中选择一个学习专题")
        }
      },
      /**
       * 删除学习专题
       * @param  {[type]} tag [description]
       * @return none
       */
      deleteSpecial(tag) {
        this.studyForm.learnSpecials.splice(this.studyForm.learnSpecials.indexOf(tag), 1);
      },
      /**
       * 提交表单 根据不同的表单进行不同的逻辑处理
       * @param  {string} formName 表单的ref
       * @return none
       */
      submitForm(formName) {
        let self = this

        if (formName == "studyForm") {
          // 提交学习教育的表单
          if (this.funcData.length == 0 && this.partData.length == 0 && this.memberData.length == 0) {
            self.participantNull = true
          } else {
            self.participantNull = false
          }

          if(self.studyForm.learnSpecials.length == 0){
            self.specialsNull = true
          } else {
            self.specialsNull = false
          }

          self.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.funcData.length > 0 && this.partData.length > 0) {
                self.$message.error("职能部门和支部只能选择一种")
                return false;
              } else  {
                if(!self.participantNull && !self.specialsNull) {
                  self.studyDialogLoading = true
                  self.$request.requestAxios("post", `${basePath}/t_task/learn/add/from_org/${self.orgCode}`, self.handleFormData(), 
                    (response) => {
                      self.studyDialogVisible = false
                      self.studyDialogLoading = false
                      self.$message.success("成功")
                      self.getStudyListData(1, 5)
                    },
                    (error) => {
                      self.studyDialogLoading = false
                      self.$message.error(error.data.meta.message)
                    }
                  )
                } else {
                  self.$message.error("请检查必填项")
                }
              }
            } else {
              self.$message.error("请检查必填项")
              return false;
            }
          });
        } else {
          //提交评论的表单
          self.$refs[formName].validate((valid) => {
            if (valid) {
              self[formName].fromId = self.tempDetailId
              self.$request.requestAxios("post", `${basePath}/t_tasks/review`, self[formName], 
                (response) => {
                  if(response.data.meta.code === 0){
                    self.resetDetailForm()
                    self.getStudyDetail(self.tempDetailId)
                    self.$message.success("成功")
                  } else {
                    self.$message.error(response.data.meta.message)
                  } 
                },
                (error) => {
                  self.$message.error("失败")
                }
              )

            } else {
              self.$message.error("请检查必填项")
              return false;
            }
          });
        }
      },
      /**
       * 处理表单数据, 并返回一个新的表单, 用于保存至后台
       * @return {[type]} [description]
       */
      handleFormData () {
        let deepClone = JSON.parse(JSON.stringify(this.studyForm))
        deepClone.learnSpecials = []

        this.studyForm.learnSpecials.forEach((item, index) => {
          deepClone.learnSpecials.push(item.id)
        })
        deepClone.createOrg = parseInt(sessionStorage.getItem("orgId"))

        if (this.orgType != 1) {
          deepClone.accounts = this.memberData
        } else {
          this.funcData.length > 0  ? deepClone.orgIds = this.funcData : deepClone.orgIds = this.partData
        }
        
        return deepClone
      },
      /**
       * 添加学习教育关闭的回调, 还原表单和验证
       * @return {[type]} [description]
       */
      specialDialogClosed () {
        this.$refs["studyForm"].resetFields()
        this.needValidate    = false //关闭对话框,禁用验证,在清空数据时确保不触发多余的表单验证
        this.participantNull = false
        this.specialsNull     = false
        this.studyDateRange  = null  
        this.funcData        = []
        this.partData        = []
        this.memberData      = []
        this.needApprove     = false
        this.needSubReport   = false
        this.addStatus       = false
        this.choosedSpecial  = null
        this.studyForm       = {
          beginTime:     null,
          endTime:       null,
          learnInfo:     null,
          learnName:     null,
          learnRequire:  null,
          learnSpecials: [],
          learnType:     1,
          needApprove:   2,
          needSubReport: 2,
        }
      },
      resetDetailForm () {
        this.$refs["commentInput"].blur()
        this.$refs["reviewForm"].resetFields()
        this.reviewForm = { //评论表单
          commentContent: null,
          fromType:       6,
          fromId:         null
        }
      },
      peopleTreeChanged (data) {
        let self = this
        console.log(data)
        self.memberData = data.map((item) => {
          return item.id
        })
        // switch (self.activeType) {
        //   case "talking":
        //     self.talkingForm.talkingList = data
        //     self.talkingListName = data.map((item) => {
        //       return item.name
        //     })
        //     break;
        //   case "beTalking":
        //     self.talkingForm.beTalkingList = data
        //     self.beTalkingListName = data.map((item) => {
        //       return item.name
        //     })
        //     break;
        //   case "talkingRecord":
        //     self.talkingForm.talkingRecord = data
        //     self.talkingRecordName = data.name
        //     break;
        //   default:
        //     break;
      }
    }
  }
</script>
 
<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .left-manage {
    padding: 10px 20px;
    text-align: center;
    color: #222222;
    border-right: 1px solid #e6e6e6;
    height: calc(100vh - 60px);
    width: 186px;
    background: #fff;
  }
  .left-manage ul{
    height: 90%;
    overflow-y: auto;
  }
  .left-manage li.active {
    background: #ecedf1;
  }
  .left-manage li{
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    margin: 0;
    text-align: left;
  }
  .right-manage{
    position: relative;
    padding: 0 10px;
    width: calc(100vw - 275px);
    height: calc(100vh - 116px);
    overflow-y: auto;
    overflow-x: hidden;
    background: #f5f6f8;
  }
  .add-study-button {
    position: absolute;
    z-index: 999;
    right: 60px;
    top: 5px;
    font-size: 22px;
    color: #808080;
    cursor: pointer;
  }
  .add-study-button .el-button {
    font-size: 20px;
    border: none;
    padding: 0;
    color: #808080;
  }
  /*列表*/
  .card-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .card-item:hover {
    box-shadow: 0 5px 15px #ccc;
    border: 1px solid #eee;
  }
  .title-wrap,
  .deadline,
  .bottom-wrap {
    margin: 8px 0;
  }
  .title-wrap,
  .bottom-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .no-data-text {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #bbb;
  }
  .el-tag {
    margin-right: 10px;
  }
  .right-participant-list {
    padding: 0 20px;
  }
  .right-participant-list .participant-item-wrap {
    margin-bottom: 20px;
  }
  .validate-text {
    position: absolute;
    margin-top: -18px;
    font-size: 12px;
    color: #f56c6c;
  }
  .right-participant-list .participant-label {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 18px;
  }
  .right-participant-list .participant-item-wrap .participant-item-inner {
    padding: 1px;
    min-height: 22px;
    max-height: 110px;
    overflow-y: auto;
  }
  .right-participant-list .participant-item-wrap .participant-item-inner .el-checkbox {
    width: 100%;
    margin-left: 0;
  }
  
  .right-participant-list .participant-title {
    font-size: 14px;
    font-weight: bold;
  }
  .no-checkbox-data {
    position: absolute;
    margin-top: -20px;
  }
  .learn-special-tags {
    margin-bottom: 10px;
  }
  .add-special-button, .add-special-content {

  }
  .detail-item-wrap {
    display: flex;
    min-height: 32px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: flex-start;
  }
  .detail-item-wrap .detail-item-label {
    display: inline-block;
    width: 70px;
    line-height: 32px;
  }
  .detail-item-wrap .detail-item-content {
    display: inline-block;
    width: calc( 100% - 75px);
    line-height: 32px;
  }
  .review-list-wrap {
    max-height: 283px;
    overflow-y: auto;
  }
  .child-misson-wrap {
    text-align: center;
    border: 1px solid #ccc;
  }
  .review-item-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent; 
  }
  .review-item-wrap:last-child {
    border-bottom: none;
  }
  .review-item-wrap div {
    width: calc(100% - 60px);
  }
  .input-button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>