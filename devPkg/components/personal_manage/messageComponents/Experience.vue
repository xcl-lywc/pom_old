/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 经历性
**************************************/ 
<template> 
  <!-- 经历性 -->
  <el-card v-loading="loading" class="box-card marb20" v-if="hisToryData ? hisToryData.fromType == 3 : true">
    <div style="font-size: 25px;" slot="header" class="clearfix">
      <span>经历性</span>
    </div>
    <!-- 工作经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 1 : true">
      <h1 class="title">|| 工作经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 1; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData1"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="工作开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else class="date-type-div"> 
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="工作单位/地址">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="工作经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope"> 
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 1;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData1', scope.row.id, scope.row, scope.$index); editTypeId = 1;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 学习经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 2 : true">
      <h1 class="title">|| 学习经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 2; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData2"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="学习开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else class="date-type-div">
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="学习单位/地点">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="学习经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 2;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData2', scope.row.id, scope.row, scope.$index); editTypeId = 2;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 培训经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 3 : true">
      <h1 class="title">|| 培训经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 3; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData3"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="培训开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else class="date-type-div">
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="培训单位/地点">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="培训经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 3;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData3', scope.row.id, scope.row, scope.$index); editTypeId = 3;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 团组织职务经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 4 : true">
      <h1 class="title">|| 团组织职务经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 4; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData4"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="团组织职务开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else>
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="团组织职务单位/地点">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="团组织职务经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 4;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData4', scope.row.id, scope.row, scope.$index); editTypeId = 4;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 党政职务经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 5 : true">
      <h1 class="title">|| 党政职务经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 5; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData5"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="党政职务开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else>
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div> 
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="党政职务单位/地点">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="党政职务经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 5;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData5', scope.row.id, scope.row, scope.$index); editTypeId = 5;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 工会组织职务经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 6 : true">
      <h1 class="title">|| 工会组织职务经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 6; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData6"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="工会组织职务开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else>
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="工会组织职务单位/地点">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="工会组织职务经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 6;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData6', scope.row.id, scope.row, scope.$index); editTypeId = 6;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 党组织内职务经历 -->
    <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 7 : true">
      <h1 class="title">|| 党组织内职务经历 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 7; addExperienceRow();" class="el-icon-circle-plus"></i></h1>
      <el-table
        :stripe="true"
        :data="experienceData.experienceData7"
        style="width: 100%">
        <el-table-column
          align="left"
          width="400px"
          label="党组织内职务开始-结束">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">
              {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.beginDatetime) : ''}} - {{scope.row.beginDatetime != 1 ? _convertDate(scope.row.endDatetime) : ''}}
            </span>
            <div v-else>
              <date-select 
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.beginDatetime && !scope.row.endDatetime) }" 
                isTimeRange="true"
                :dateType="scope.row.beginTimeType" 
                :isDisabled="false"
                :beginDatetime="scope.row.beginDatetime"
                :endDatetime="scope.row.endDatetime" 
                @dateEmit="((val) => ( dateEmitFun(val, scope.row) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row) ))">
              </date-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="党组织内职务单位/地点">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.address}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.address) }" 
            v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="党组织内职务经历">
          <template slot-scope="scope">
            <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.position}}</span>
            <el-input v-else 
            :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.position) }" 
            v-model="scope.row.position"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!hisToryData && !afferentUserId"
          width="100px"
          label="操作">
          <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveExperience('add', scope.row); editTypeId = 7;" title="保存" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="delExperience('experienceData7', scope.row.id, scope.row, scope.$index); editTypeId = 7;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>  
</template>

<script>
  import dateSelect from './Date.vue'
  export default {
    props:{
      hisToryData:{ //当有表单数据时，表示是从任务哪儿发送过来的。
        required: false,
        default: null,
      },
      rosterId:{ //人员Id
        required: false,
        default: null,
      },
      mathRandom: { // 适用于花名册，查看详情
        required: false,
        default:  0,
      },
      afferentUserId:{ //父组件传入的用户Id
        required: false,
        default: null,
      }
    },
    components:{
      'date-select': dateSelect,
    },
    data() {
      let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码长度必须是6位以上!'));
        } else {
          if (this.resetPasswordForm.confirmPassword !== '') {
            this.$refs.resetPasswordForm.validateField('confirmPassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPasswordForm.newPassword) {
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
          confirmPassword:  null,
          oldPassword:      null,
          newPassword:      null,
        },
        resetPasswordFormRules: {
          oldPassword: [
            { required: true, message: '请输入旧密码'}
          ],
          newPassword: [
            { required: true, message: '请输入新密码'},
            { validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码'},
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        form:{
          "account":        null,
          "address":        null,
          "areaCodel":      null,
          "borthday":       null,
          "desc":           null,
          "education":      null,
          "englishLevel":   null,
          "idNumber":       null,
          "maritalStatus":  null,
          "mobilNumber":    null,
          "nativeName":     null,
          "nativePlace":    null,
          "outLook":        null,
          "phoneNumber":    null,
          "picture":        null,
          "position":       null,
          "tPost":          null,
          "sex":            null,
          "userId":         0,
          "name":           null,
          "technicalJob":   null,
          "administrationJob": null,
        },
        sexOptions:          [],   //性别列表
        nationOptions:       [],   //民族列表
        educationOptions:    [],   //最高学历列表
        academicDegreeOptions:      [],   //学位列表
        practiceOptions:     [],   //执业资格证书
        englishLevelOptions: [],   //外语等级列表
        marriageOptions:     [],   //婚姻状态列表
        outLookOptions:      [],   //政治面貌
        tPostOptions:        [],   //技术职务
        positionOptions:     [],   //岗位
        nativePlaceOptions:  [],   //籍贯
        relationshipOptions: [],   //人际关系
        relationsData:       {     //用户的社会关系列表
          relationsData1:    []
        },
        experienceData:      {     //用户的个人学历详情列表
          experienceData1:  [],
          experienceData2:  [],
          experienceData3:  [],
          experienceData4:  [],
          experienceData5:  [],
          experienceData6:  [],
          experienceData7:  [],
        }, 
        archivesesData:      {      //用户的个人荣誉列表
          archivesesData1:  [],
          archivesesData2:  [],
          archivesesData3:  [],
          archivesesData4:  [],
          archivesesData5:  [],
        },
        typeData:{
          relations:  [1], //人际关系
          experience: [1,2,3,4,5,6,7], //工作经历，学习经历，培训经历，团组织职务经历，党政职务经历，工会组织职务经历，党组织内职务经历
          archiveses: [1,2,3,4,5], //个人荣誉，技术职务，学历，学位，执业资格证书
        },
        editTypeId:        null, //当前被操作的类型Id
        orgChlidrensimple: [],   //支部数据
        partyMemberForm: {       //新增/编辑：党员基本信息
          "applicationDate":      null,
          "introducer":           null,
          "joinPartyDate":        null,
          "lost":                 true,
          "lostTime":             null,
          "mobile":               true,
          "partyOrgsId":          null,
          "qualificationTime":    null,
          "userId":               null,
        },
        "applicationDateFormat":'yyyy-MM',
        "joinPartyDateFormat":  'yyyy-MM',
        "qualificationTimeFormat":'yyyy-MM',
        "lostTimeFormat":'yyyy-MM',
      }
    },
    watch:{
      mathRandom(data){
        if(data){
          this.form = {
          "account":        null,
          "address":        null,
          "areaCodel":      null,
          "borthday":       null,
          "desc":           null,
          "education":      null,
          "englishLevel":   null,
          "idNumber":       null,
          "maritalStatus":  null,
          "mobilNumber":    null,
          "nativeName":     null,
          "nativePlace":    null,
          "outLook":        null,
          "phoneNumber":    null,
          "picture":        null,
          "position":       null,
          "tPost":          null,
          "sex":            null,
          "userId":         0,
          "name":           null
          };
          // ----- 将用户Id赋值为父组件传入的用户Id 
          this.userData.userId = this.afferentUserId;
          this.getQueryContrast();
          this.initTableData(); 
        }
      },
    },
    mounted() { 
      this.afferentUserId ? this.userData.userId = this.afferentUserId : '';
      this.getQueryContrast();
      this.initTableData(); 
    },
    methods:{
      /*
       * 获取所有对照表分类及对照键值对
       */
      getQueryContrast(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/contrast/all_contrast_info', "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self._getQueryContrast(responseData.data);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/contrast/all_contrast_info - 失败');
        });
      },
      _getQueryContrast(data){
        let self = this;
        $.each(data, function(index, item){
          switch(item.id){
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
      getQueryUserDetail(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/hr_users/info/'+ self.userData.userId +'/forUser', "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.form = responseData.data;
            self.loading = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/hr_users/info/'+ currentUserId +'/forUser - 失败');
            self.loading = false;
        });
      },
      /*
      * 修改个人信息
      */
      updatePersonalMesg(formName){
        let self = this;
        
        self.form.nation = self.form.nativeName;
        self.form.nationPlace = self.form.nativePlace;
        self.form.educationLevel = self.form.education;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('put', basePath + '/hr_users/update/'+ self.userData.userId +'/forUser', self.form,
              function(response) { //请求成功的回调...
                var responseData = response.data;
                self.getQueryUserDetail();
                self.$message(responseData.meta.message, 20);
              },function(error, status) {// 请求失败回调函数...
                status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/hr_users/update/'+ self.userData.userId +'/forUser - 失败');
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
      getQueryExperience(){
        this.typeData.experience.forEach( (typeId) => {
          this._getQueryUserManage('/experience//forUser/' + this.userData.userId, 'experienceData',typeId);
        });
        
      }, 
      /*
      * 添加一行用户的社会关系
      */
      addRelationRow(){
        this.relationsData['relationsData' + this.editTypeId].push({
          "otherName": null,
          "otherPosition": null,
          "owner": 1,
          "relationName": null,
          "status": 1,
          "typeId": this.editTypeId,
          'newAdd': 1,     //有此键表示新建
          'isBool': 1,  //默认第一次都为1，
        });
      },
      /*
      * 添加用户的社会关系
      * @params {string} type add为新增，update为编辑修改
      * @params {object} row 
      */
      saveRelationship(type, row){
        let self = this;
        if(self._validate(row)){
          // debugger
          self._add('/relations/create/forUser/' + this.userData.userId,  row, 
          function(res){
            self.getQueryRelationship();
          })
        }
        
      },
      _addRelationshipParams(){
        return {
          "otherName": "张三",
          "otherPosition": "开发",
          "owner": 1,
          "relationName": "父女",
          "status": 1,
          "typeId": this.editTypeId
        }
      },
      
      /*
      * 删除指定ID的一条人际关系
      * @params {number/string} id 不为undefined时，表示不是新增的数据
      * @params {object} rowData 当前行数据
      * @params {number} index 当前行的下标
      */
      delRelationship(id,rowData,index){
        let self = this;
        if(id){
          self._del('/relations/delete/'+ id +'/forUser/' + self.orgId + '_' + self.userData.userId, 
          function(){
            self.getQueryRelationship();
          })
        }else{
          self.relationsData.splice(index,1)
        }
      },
      /*
      * 添加一行用户相关经历      
      */
      addExperienceRow(){
        this.experienceData['experienceData' + this.editTypeId].push({
          "address":   null,
          "beginDatetime": new Date(),     //默认为1，保存后将数据设置为真实的时间
          "endDatetime":   new Date(),     //默认为1，保存后将数据设置为真实的时间
          "beginTimeType": 1,
          "endTimeType":   1,
          "timeFormat": 'yyyy-MM-dd',
          "owner":     1,
          "position":  null,
          "status":    1,
          "typeId":    this.editTypeId,
          'newAdd':    1,     //有此键表示新建
          'isBool':    1,     //默认第一次都为1，
        });
      },
      /*
      * 添加用户相关经历
      * @params {string} type add为新增，update为编辑修改
      * @params {object} row 
      */
      saveExperience(type,row){
        let self = this; 
        if(self._validate(row)){
          // -------------------------- 给开始结束时间赋值 ----------------------------
          row.beginDatetime = row.beginDatetime.getTime();
          row.endDatetime = row.endDatetime.getTime();

          self._add('/experience/create/forUser/' + self.userData.userId,  row, 
          function(){
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
      delExperience(arrayKey,id,rowData,index){
        let self = this;
        if(id){
          self._del('/experience/delete/'+ id +'/forUser/' + self.userData.userId, 
          function(){
            self.getQueryExperience();
          })
        }else{
          self.experienceData[arrayKey].splice(index,1)
        }
      }, 
      _validate(row){
        let bool = true; //为true表示数据都不为null
        $.each(row, function(key, item) {
          if(!item){
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
      _getQueryUserManage(url,receiveDataName, typeId){
        let self = this;
        self.$request.requestAxios('get', basePath + url , {params: {typeId: typeId}},
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self[receiveDataName][receiveDataName + typeId] = responseData.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
          });
      },
      /*
      * 合并添加函数
      * @params {string} url 请求地址
      * @params {object} params 请求参数
      * @params {object} success 回调函数
      */
      _add(url, params, success){
        let self = this;
        self.$request.requestAxios('post', basePath + url, params,
          function(response) { //请求成功的回调...
            var responseData = response.data;
            self.$message.success(responseData.data);
            success(responseData);
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
          });
      },
      /*
      * 合并删除函数
      * @params {string} url 请求地址
      * @params {object} success 回调函数
      */
      _del(url, successs){
        let self = this;
        self.$request.requestAxios('delete', basePath + url, "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
            setTimeout(function() {
              self.$message.success(responseData.data);
              successs();
            },20)
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error(url + ' - 失败');
        });
      },
      /*
      * 时间转换
      */
      _convertDate(date){
        return new Date(date).getFullYear() + '年' +
               (new Date(date).getMonth() + 1) + '月';
      }, 
      /*
       * 查询党员信息
       */
      getQueryPartyMemberDetail(){
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_member_infos/'+ this.userData.memInfoId +'/detail', "",
          function(response) { //请求成功的回调...
            self.partyMemberForm = response.data.data;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/'+ this.userData.memInfoId +'/detail - 失败');
        });
      },  
      /*
       * 初始化表格数据,当时从历史记录页面跳转过来的就显示历史数据；否则，直接根据接口查询
       */
      initTableData(){
        let hisTory = this.hisToryData
        if(hisTory){
          let formData = JSON.parse(hisTory.formData);
          switch(hisTory.fromType){
            case '1': //基本信息
              this.form = JSON.parse(this.hisToryData.formData)
              break;
            case '7': //党员信息
              this.partyMemberForm = JSON.parse(this.hisToryData.formData)
              break;
            case '6': //关系
              this.relationsData['relationsData' + formData.typeId] = [formData];
              break;
            case '3': //经历
              this.experienceData['experienceData' + formData.typeId] = [formData];
              break;
            case '4': //获得性
              this.archivesesData['archivesesData' + formData.typeId] = [formData];
              break;
          }
          this.loading = false;
        }else{ 
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
      dateEmitFun(val,formDateKey){  
        formDateKey.beginDatetime = val[0];
        formDateKey.endDatetime = val[1];
      },
      /*
       * 时间组件广播回来的时间类型
       * @params {string} val 时间组件返回回来的值
       * @params {string} formDateKey 当前页面的字段 
       */
      dateTypeEmitFun(val,formDateKey){ 
        formDateKey.beginTimeType = val;
        formDateKey.endTimeType = val;
      },
    }
  }
</script>
<style lang="less">
  .date-type-div{
    position: relative;
    .type{
      position: absolute;
      right: 0;
      width: 100px;
      top: 0;
    }
  }
</style>