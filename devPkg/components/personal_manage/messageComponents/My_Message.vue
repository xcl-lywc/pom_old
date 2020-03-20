/*************************************
*  create by xieyuanyuan date 2018/05/22
*  首页管理 - 个人工作台 - 我的信息
**************************************/ 
<template>
  <div>
    <!-- 个人基本信息 (如果是从历史记录跳转过来的那么就判断是否是只显示基本信息，否者的话，就直接显示) -->
    <div  v-loading="loading" class="personal-wrapper" v-if="hisToryData ? hisToryData.fromType == 1 : true">
      <h1 class="title marb20">|| 个人基本信息</h1>
      <el-form v-show="form" ref="form" size="small" :rules="rules" :model="form" label-width="150px">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark photo-message">
              <div class="photo">
                <el-upload
                  class="avatar-uploader"
                  :action="basePath + '/sys/ueditor/exec?action=uploadimage'"
                  :headers="{Authorization: 'Bearer ' + userData.token}"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  name="upfile"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.picture" :src="form.picture" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="other">
                <p>
                  工号：{{form.account}} &nbsp;&nbsp;&nbsp;&nbsp; 
                  姓名：{{form.name}} &nbsp;&nbsp;&nbsp;&nbsp;
                  公司：{{form.orgName}} &nbsp;&nbsp;&nbsp;&nbsp; 
                  党委：{{form.partyCommitteeName}} &nbsp;&nbsp;&nbsp;&nbsp; 
                  支部：{{form.partyBranchName}} &nbsp;&nbsp;&nbsp;&nbsp; 党小组：{{form.partyGroupName}}
                </p>
                <el-input type="textarea" :disabled="hisToryData || afferentUserId" v-model="form.desc"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="性别:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.sex)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" v-model="form.sex" placeholder="">
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="民族:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.nation)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.nation" placeholder="">
                  <el-option
                    v-for="item in nationOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="出生日期:">
                <!-- <el-date-picker :disabled="hisToryData || afferentUserId"  style="width: 100%" type="date" placeholder="选择日期" v-model="form.borthday"></el-date-picker> -->
                <date-select 
                  :dateType="form.borthday.type" 
                  :isDisabled="(hisToryData || afferentUserId) ? true : false"
                  :value="form.borthday.date_time"
                  @dateEmit="((val) => ( dateEmitFun(val, form.borthday) ))"
                  @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.borthday) ))">
                </date-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item 
                label="身份证号:"
                prop="idNumber"
                :rules="[
                  { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码格式错误' , trigger: blur }
                ]">
                <el-input :disabled="hisToryData || afferentUserId"  style="width: 100%" v-model="form.idNumber"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="籍贯:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.nationPlace)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.nationPlace" placeholder="">
                  <el-option
                    v-for="item in nativePlaceOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="婚姻状况:">
                <el-select :disabled="hisToryData || afferentUserId" style="width: 100%" v-model="form.maritalStatus" placeholder="">
                  <el-option
                    v-for="item in marriageOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="政治面貌:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.outLook)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.outLook" placeholder="">
                  <el-option
                    v-for="item in outLookOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进入中铁二局时间:" prop="workBorth">
              <date-select 
                :dateType="form.workBorth.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="form.workBorth.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, form.workBorth) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.workBorth) ))">
              </date-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进入本公司时间:" prop="joinComplanyTime"> 
              <date-select 
                :dateType="form.joinComplanyTime.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="form.joinComplanyTime.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, form.joinComplanyTime) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.joinComplanyTime) ))">
              </date-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="初始学历:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.initialDegree)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.initialDegree" placeholder="">
                  <el-option
                    v-for="item in educationOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>           
          </el-col>
          <el-col :span="8">
            <el-form-item label="初始学历毕业院校:" class="no-border" prop="initialSchool">
              <el-input :disabled="hisToryData || afferentUserId" placeholder="请输入初始学位毕业院校" v-model="form.initialSchool"></el-input>
            </el-form-item>
          </el-col> 
          <el-col :span="8">
            <el-form-item label="初始学历毕业时间:" prop="initialTime"> 
              <date-select 
                :dateType="form.initialTime.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="form.initialTime.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, form.initialTime) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.initialTime) ))">
              </date-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="最高学历:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.highestDegree)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.highestDegree" placeholder="">
                  <el-option
                    v-for="item in educationOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>           
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高学历毕业院校:" class="no-border" prop="highestSchool">
              <el-input :disabled="hisToryData || afferentUserId" placeholder="请输入最高学位毕业院校" v-model="form.highestSchool"></el-input>
            </el-form-item>
          </el-col> 
          <el-col :span="8">
            <el-form-item label="最高学历毕业时间:" prop="highestTime"> 
              <date-select 
                :dateType="form.highestTime.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="form.highestTime.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, form.highestTime) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.highestTime) ))">
              </date-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="最高学位:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.education)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.education" placeholder="">
                  <el-option
                    v-for="item in academicDegreeOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>           
          </el-col> 
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="外语语种:"> 
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.fgLanguage)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" v-model="form.fgLanguage" placeholder="">
                  <el-option
                    v-for="item in fgLanguageOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="外语等级:"> 
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.englishLevel)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" v-model="form.englishLevel" placeholder="">
                  <el-option
                    v-for="item in englishLevelOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="技术职称:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.tPost)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.tPost" placeholder="">
                  <el-option
                    v-for="item in tPostOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="技术职称获得时间:" prop="techPostTime">
              <date-select 
                :dateType="form.techPostTime.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="form.techPostTime.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, form.techPostTime) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.techPostTime) ))">
              </date-select>
            </el-form-item>
          </el-col> 
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="执业资格:">
                <el-input :disabled="hisToryData || afferentUserId" v-model="form.technicalJob"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执业资格获得时间:" prop="technicalJobTime"> 
              <date-select 
                :dateType="form.technicalJobTime.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="form.technicalJobTime.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, form.technicalJobTime) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, form.technicalJobTime) ))">
              </date-select>
            </el-form-item>
          </el-col> 
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="岗位性质:">
                <span v-show="hisToryData || afferentUserId">{{$util.controlTable(form.position)}}</span>
                <el-select v-show="!(hisToryData || afferentUserId)" style="width: 100%" filterable v-model="form.position" placeholder="">
                  <el-option
                    v-for="item in positionOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="党内职务:">
                <el-input :disabled="hisToryData || afferentUserId" v-model="form.partyJob"></el-input>
                <!-- <span v-for="(itemPos, indexPos) in form.positions">
                  {{$util.controlTable(itemPos.name)}}，
                </span> -->
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="行政职务:">
                <el-input :disabled="hisToryData || afferentUserId" v-model="form.administrationJob"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item 
                label="移动电话:"
                prop="mobilNumber"
                :rules="[
                  { pattern: /^1[34578]\d{9}$/, message: '联系方式格式错误' , trigger: blur }
                ]">
                <el-input :disabled="hisToryData || afferentUserId" style="width: 100%" v-model="form.mobilNumber"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="固定电话(区号):">
                <el-row>
                  <el-col :span="9">
                    <el-input :disabled="hisToryData || afferentUserId" v-model="form.areaCodel"></el-input>
                  </el-col>
                  <el-col :span="15">
                    <div style="display: inline-block; width: 68px;">
                      <i class="marl5 el-icon-plus"></i>
                      <span>(电话)</span>
                    </div>
                    <el-input :disabled="hisToryData || afferentUserId" style="display: inline-block; width: calc(100% - 75px)" v-model="form.phoneNumber"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="家庭地址:">
                <el-input :disabled="hisToryData || afferentUserId" v-model="form.address"></el-input>
                (请具体到门牌号)
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="邮政编码:">
                <el-input :disabled="hisToryData || afferentUserId" v-model="form.emailCode"></el-input>
              </el-form-item>
            </div>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="24"> 
            <div class="grid-content bg-purple-dark">
              <el-form-item label="青年组织及职务:">
                <el-table
                  :data="groupInfoTable"
                  border
                  style="width: 100%"> 
                  <el-table-column
                    prop="key1"
                    label="入团时间"
                    align="center">
                    <template slot-scope="scope"> 
                      <date-select 
                        :dateType="scope.row.key1.type" 
                        :isDisabled="(hisToryData || afferentUserId) ? true : false"
                        :value="scope.row.key1.date_time"
                        @dateEmit="((val) => ( dateEmitFun(val, scope.row.key1) ))"
                        @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row.key1) ))">
                      </date-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key2"
                    label="现在团委名称"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key2"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key3"
                    label="现在团委职务"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key3"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key4"
                    label="现在团支部名称"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key4"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key5"
                    label="现在团支部职务"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key5"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-form-item label="工会组织及职务:">
                <el-table
                  :align="center"
                  :data="guildInfoTable"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="key1"
                    label="入会时间"
                    align="center">
                    <template slot-scope="scope"> 
                      <date-select 
                        :dateType="scope.row.key1.type" 
                        :isDisabled="(hisToryData || afferentUserId) ? true : false"
                        :value="scope.row.key1.date_time"
                        @dateEmit="((val) => ( dateEmitFun(val, scope.row.key1) ))"
                        @dateTypeEmit="((val) => ( dateTypeEmitFun (val, scope.row.key1) ))">
                      </date-select>
                    </template>
                  </el-table-column> 
                  <el-table-column
                    prop="key2"
                    label="现在工会（三级）名称"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key2"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key3"
                    label="现在工会（三级）职务"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key3"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key4"
                    label="现在工会（四级）名称"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key4"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="key5"
                    label="现在工会（四级）职务"
                    align="center">
                    <template slot-scope="scope">
                      <el-input :disabled="hisToryData || afferentUserId" placeholder="" v-model="scope.row.key5"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="!hisToryData && !afferentUserId">
           <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="updatePersonalMesg('form')">基本信息提交</el-button>
            </el-form-item>
           </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 重置密码 -->
    <div v-loading="loading" 
      class="personal-wrapper" 
      v-if="(hisToryData ? hisToryData.fromType == 'resetPassword' : true) && !afferentUserId && userData.memInfoId ">
      <h1 class="title marb20">|| 重置密码</h1>
      <el-form class="demo-ruleForm add-task-left" :rules="resetPasswordFormRules" ref="resetPasswordForm" :model="resetPasswordForm" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="旧密码" prop="oldPassword"  >
              <el-input type="text" v-model="resetPasswordForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" >
              <el-input type="password" v-model="resetPasswordForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" >
              <el-input type="password" v-model="resetPasswordForm.confirmPassword" autocomplete="off"></el-input>
            </el-form-item>
            </el-col> 
        </el-row>
        <el-form-item class="no-border marr20">
          <el-button size="small" type="primary" @click="resetPassword('resetPasswordForm')">确认提交密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 党员信息 -->
    <div v-loading="loading" class="personal-wrapper" v-if="(hisToryData ? hisToryData.fromType == 7 : true) && !afferentUserId && userData.memInfoId ">
      <h1 class="title marb20">|| 党员信息</h1>
      <el-form class="demo-ruleForm add-task-left" ref="partyMemberForm" :model="partyMemberForm" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item  label-width="80px" v-if="orgChlidrensimple.length != 0" label="所属支部:">
              <span v-show="hisToryData || afferentUserId">{{$util.controlTable(partyMemberForm.partyOrgsId)}}</span>
              <div class="tree-selected">
                <tree-selected-last  
                pageType="personal"
                class="marb20"  
                :paramsData="selectItem"
                isEditPage="0"
                isCheckbox="1"
                :mathRandom="mathRandomSelect"
                @treeValData="treeValDataFun"> 
              </tree-selected-last>
              </div> 
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间:" prop="applicationDate"> 
              <date-select 
                :dateType="partyMemberForm.applicationDate.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="partyMemberForm.applicationDate.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, partyMemberForm.applicationDate) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, partyMemberForm.applicationDate) ))">
              </date-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="介绍者:" class="no-border" prop="introducer">
              <el-input :disabled="hisToryData || afferentUserId" placeholder="请输入介绍者" v-model="partyMemberForm.introducer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入党时间:" class="no-border" prop="joinPartyDate">
              <date-select 
                :dateType="partyMemberForm.joinPartyDate.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="partyMemberForm.joinPartyDate.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, partyMemberForm.joinPartyDate) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, partyMemberForm.joinPartyDate) ))">
              </date-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转正时间:" class="no-border date-type-div" prop="qualificationTime">
              <date-select 
                :dateType="partyMemberForm.qualificationTime.type" 
                :isDisabled="(hisToryData || afferentUserId) ? true : false"
                :value="partyMemberForm.qualificationTime.date_time"
                @dateEmit="((val) => ( dateEmitFun(val, partyMemberForm.qualificationTime) ))"
                @dateTypeEmit="((val) => ( dateTypeEmitFun (val, partyMemberForm.qualificationTime) ))">
              </date-select> 
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否是流动党员:" class="no-border">
              <el-radio-group :disabled="hisToryData || afferentUserId" v-model="partyMemberForm.mobile">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否失联:" class="no-border">
              <el-radio-group :disabled="hisToryData || afferentUserId" v-model="partyMemberForm.lost">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8"> 
            <el-form-item v-if="partyMemberForm.lost" label="失联时间:" class="no-border" prop="lostTime">
              <el-date-picker
                v-model="partyMemberForm.lostTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item> 
          </el-col>
          <el-col :span="16" class="text-center"> 
            <el-button size="small" type="primary" @click="savePartyMemberForm('partyMemberForm')">党员信息提交</el-button> 
          </el-col>
        </el-row>
        <!-- <el-form-item class="no-border marr20 class">
          <el-button size="small" type="primary" @click="savePartyMemberForm('partyMemberForm')">党员信息提交</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <!-- 关系 -->
    <el-card v-loading="loading" class="box-card marb20" v-if="hisToryData ? hisToryData.fromType == 6 : true">
      <div style="font-size: 25px;" slot="header" class="clearfix">
        <span>关系</span>
      </div>
      <!-- 家庭成员 -->
      <div  class="personal-wrapper" v-if="hisToryData ? JSON.parse(hisToryData.formData).typeId == 1 : true ">
        <h1 class="title">|| 家庭成员 <i v-if="!hisToryData && !afferentUserId" @click=" editTypeId = 1; addRelationRow();" class="el-icon-circle-plus"></i></h1>
        <el-table
          :stripe="true"
          :data="relationsData.relationsData1"
          style="width: 100%">
          <el-table-column
            align="left"
            label="姓名">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.otherName}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.otherName) }" 
              v-model="scope.row.otherName"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="职业">
            <template slot-scope="scope">
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{scope.row.otherPosition}}</span>
              <el-input v-else 
              :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.otherPosition) }" 
              v-model="scope.row.otherPosition"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="关系">
            <template slot-scope="scope"> 
              <span v-if="!scope.row.hasOwnProperty('newAdd')">{{$util.controlTable(scope.row.relationName)}}</span>
              <el-select v-else="!(hisToryData || afferentUserId)"
                :class="{'border-red': (scope.row.hasOwnProperty('isBool') && scope.row.isBool === 2 && !scope.row.relationName) }"  v-model="scope.row.relationName" placeholder="请选择">
                <el-option
                  v-for="item in relationshipOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            v-if="!hisToryData && !afferentUserId"
            width="100px"
            label="操作">
            <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button v-if="scope.row.hasOwnProperty('newAdd')" @click="saveRelationship('add', scope.row); editTypeId = 1;" type="success" icon="el-icon-check" circle></el-button>
            <el-button @click="delRelationship(scope.row.id, scope.row, scope.$index); editTypeId = 1;" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
            
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card> 
  </div>
</template>

<script>
  import dateSelect from './Date.vue'
  import Query_Tree_Selected      from './Query_Tree_Selected.vue'
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
      afferentUserId:{ //父组件传入的用户fId
        required: false,
        default: null,
      }
    },
    components:{
      'date-select': dateSelect,
      'tree-selected-last': Query_Tree_Selected,
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
        mathRandomSelect: 0,
        selectItem: {
          requestUrl: "/party_orgs/top/single/tree",
          value: null,
          checkboxType: true,
        },
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
          "positions":      [],
          "account":        null,
          "address":        null,
          "areaCodel":      null,
          "borthday":       {date:null,date_time:null,month:null,time:null,time_id:null,type:3,year:null,},
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
          "initialDegree":            null,// 初始学位
          "initialSchool":            null, //初始学位毕业院校
          "initialTime": {date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, //初始学位毕业时间
          "highestDegree":            null, //最高学位
          "highestSchool":            null, //最高学位毕业院校
          "highestTime":{date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, //最高学位毕业时间
          "politicalOutlookTime":{date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, 
          "groupInfo":                null, //团组织信息
          "guildInfo":                null, //工会组织信息
          "techPostTime":{date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, //技术职务获得时间
          "joinComplanyTime":{date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, //加入公司时间
          "partyPosions":             null, //党组织职务
          "administrationJob":        null, //行政职务
          "technicalJob":             null, //执业资格
          "technicalJobTime":{date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, //执业资格获得时间
          "fgLanguage":               null, //外语语种
          "partyJob":                 null, //党内职务
          "workBorth": {date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,}, //加入中铁二局时间
        }, 
        sexOptions:          [],   //性别列表
        nationOptions:       [],   //民族列表
        educationOptions:    [],   //学历列表
        academicDegreeOptions:[],   //学位列表
        practiceOptions:     [],   //执业资格证书
        englishLevelOptions: [],   //外语等级列表
        marriageOptions:     [],   //婚姻状态列表
        outLookOptions:      [],   //政治面貌
        tPostOptions:        [],   //技术职务
        positionOptions:     [],   //岗位
        nativePlaceOptions:  [],   //籍贯
        relationshipOptions: [],   //人际关系
        fgLanguageOptions:   [],   //外语语种
        groupInfoTable:      [{key1: {date_time: null, type: 1},key2: null,key3: null,key4: null,key5: null}], //团组织信息
        guildInfoTable:      [{key1: {date_time: null, type: 1},key2: null,key3: null,key4: null,key5: null}], //工会组织信息
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
          "applicationDate":  {date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null},
          "introducer":       null,
          "joinPartyDate":    {date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,},
          "lost":             true,
          "lostTime":         null,
          "mobile":           true,
          "partyOrgsId":      null,
          "qualificationTime":{date:null,date_time:null,month:null,time:null,time_id:null,type:1,year:null,},
          "userId":           null,
        }, 
      }
    },
    watch:{
      mathRandom(data){
        if(data){
          // this.form = {
          // "account":        null,
          // "address":        null,
          // "areaCodel":      null,
          // "borthday":       null,
          // "desc":           null,
          // "education":      null,
          // "englishLevel":   null,
          // "idNumber":       null,
          // "maritalStatus":  null,
          // "mobilNumber":    null,
          // "nativeName":     null,
          // "nativePlace":    null,
          // "outLook":        null,
          // "phoneNumber":    null,
          // "picture":        null,
          // "position":       null,
          // "tPost":          null,
          // "sex":            null,
          // "userId":         0,
          // "name":           null
          // }; 
          // ----- 将用户Id赋值为父组件传入的用户Id 
          this.userData.userId = this.afferentUserId;
          this.getQueryContrast();
          this.initTableData();
          this.getQueryOrgList();
        }
      },
    },
    mounted() {
      this.afferentUserId ? this.userData.userId = this.afferentUserId : '';
      this.getQueryContrast();
      this.initTableData();
      this.getQueryOrgList();
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
            case 18:
                self.fgLanguageOptions = item.list;
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
        let url = url = `${basePath}/hr_users/info/${self.afferentUserId ? self.afferentUserId : self.userData.userId}`;
        self.$request.requestAxios('get', url, "",
          function(response) { //请求成功的回调...
            var responseData = response.data;
             //给两个组织赋值  
            if(responseData.data.groupInfo){ 
              self.groupInfoTable = [responseData.data.groupInfo]
              self.groupInfoTable = Object.assign({}, self.groupInfoTable, self.groupInfoTable);
            }
            if(responseData.data.guildInfo){ 
              self.guildInfoTable = [responseData.data.guildInfo];
              self.guildInfoTable = Object.assign({}, self.guildInfoTable, self.guildInfoTable);
            } 
            self.form = self._formExtend(self.form,responseData.data)
            self.loading = false;
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/hr_users/info/self - 失败');
            self.loading = false;
        });
      },
      /*
      * 修改个人信息
      */
      updatePersonalMesg(formName){
        let self = this;
        // self.form.nation = self.form.nativeName;
        // self.form.nationPlace = self.form.nativePlace;
        self.form.educationLevel = self.form.education;
        self.form.groupInfo = self.groupInfoTable[0];
        self.form.guildInfo = self.guildInfoTable[0];
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
      * 查询用户人际关系
      */
      getQueryRelationship(){
        this.typeData.relations.forEach( (typeId) => {
          this._getQueryUserManage('/relations/forType/forUser/' + this.userData.userId, 'relationsData', typeId);
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
          self._del('/relations/delete/'+ id +'/forUser/' + self.userData.userId, 
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
          "beginTime": 1,     //默认为1，保存后将数据设置为真实的时间
          "endTime":   1,     //默认为1，保存后将数据设置为真实的时间
          'experienceBETime': null,
          "timeFormat": 'yyyy-MM-dd',
          "owner":     1,
          "position":  null,
          "status":    1,
          "typeId":    this.editTypeId,
          'newAdd':    1,     //有此键表示新建
          'isBool':    1,     //默认第一次都为1，
        });
      }, 
      _addExperienceParams(){
        return {
          "address": "string",
          "beginTime": new Date('2018-08-09').getTime(),
          "endTime": new Date('2018-08-10').getTime(),
          "timeFormat": 'yyyy-MM-dd',
          "owner": 1,
          "position": "string",
          "status": 1,
          "typeId": this.editTypeId
        }
      }, 
      /*
      * 添加一行用户获得性结果档案      
      */
      addArchivesesRow(){
        this.archivesesData['archivesesData' + this.editTypeId].push({
          "address":   null,
          "creater":   1,
          "name":      null,
          "owner":     1,
          "status":    1,
          "time":      null,
          "timeFormat": 'yyyy-MM-dd',
          "typeId":    this.editTypeId,
          'newAdd':    1,     //有此键表示新建
          'isBool':    1,     //默认第一次都为1，
        });
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
      * 图片上传成功后
      */
      handleAvatarSuccess(res, file) {
        this.form.picture = res.path;
      },
      /*
      * 上传头像验证
      */
      beforeAvatarUpload(file) {
        const isJPG = file.type;
        const isLt2M = file.size / 1024 / 1024 < 100;

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
      getQueryPartyMemberDetail(){ 
        let self = this;
        self.$request.requestAxios('get', basePath + '/party_member_infos/'+ this.userData.memInfoId +'/detail', "",
          function(response) { //请求成功的回调... 
            // --------------- 初始表单跟数据库查询出来的表单合并值 ---------- 
            self.partyMemberForm = self._formExtend(self.partyMemberForm, response.data.data);
            self.selectItem.value = self.partyMemberForm.partyOrgsId; 
          },function(error, status) {// 请求失败回调函数...
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_member_infos/'+ this.userData.memInfoId +'/detail - 失败');
        });
      },
      /*
       * 初始表单跟数据库查询出来的表单合并值
       */
      _formExtend(oldFormD, newFormD){ 
        let oldForm = JSON.parse(JSON.stringify(oldFormD)),
            newForm = JSON.parse(JSON.stringify(newFormD))
        $.each(oldForm, (oldKey, oldValue) => {
          $.each(newForm, (newKey, newValue) => {
            if(oldKey == newKey){
              // ---- 不用感叹号判断是避免有值为0的时候不赋值
              if(!newValue && newValue != 0){
                // -------- 旧表单中的值赋值给新表单中的值
                newForm[newKey] = oldForm[oldKey];
              }
            }
          });
        });    
        return newForm;  
      },
      /*
       * 查询组织列表数据
       */
      getQueryOrgList(){
        let self = this;
        self.orgChlidrensimple = [];
        self.$request.requestAxios('get',basePath + '/party_orgs/top/single/tree/', {params: {id: self.userData.partyOrgId}}, 
          function(response) {
            // -------- 给当前的组织树赋值 -----------
            self._getQueryOrgList(response.data.data);
          },function(error, status) {
            status == 200 ? self.$message.error(error.data.meta.message) :
                            self.$message.error('/party_orgs/' + self.userData.partyOrgId + '/partyorgtree - 失败');
        });
      },
      /*
       * 排除掉不要的数据
       */
      _getQueryOrgList(data){
        this.orgChlidrensimple.push(data);
        this._childrensSimple(data.childrens);
      },
      _childrensSimple(child){
        $.each(child,  (index, item) => {
          this.orgChlidrensimple.push(item);
          if(item.childrens) this._childrensSimple(item.childrens);
        })
      },
      savePartyMemberForm(formName){ 
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('put', basePath + `/party_member_infos/info/update/${self.partyMemberForm.id}/`, self._saveParams(),
              function(response) {
                self.getQueryPartyMemberDetail();
                self.$message.success(response.data.meta.message)
              },
              function(error, status) {
                status == 200 ? self.$message.error(error.data.meta.message) :
                  self.$message.error(`/party_member_infos/info/update/${self.partyMemberForm.id}/from_org/${self.userData.orgCode} - 失败`);
            });
          } else {
            return false;
          }
        });
      },
      _saveParams(){
        this.partyMemberForm.lostTime = this.partyMemberForm.lostTime ? this.partyMemberForm.lostTime.getTime() : '';
        console.log('save',this.partyMemberForm) 
        this.partyMemberForm.partyOrgsId = this.orgChlidrensimple.length == 0 ? this.userData.partyOrgId : this.partyMemberForm.partyOrgsId;
        return this.partyMemberForm;
      },
      /*
       * 初始化表格数据,当是从历史记录页面跳转过来的就显示历史数据；否则，直接根据接口查询
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
          this.getQueryUserDetail()
          this.getQueryRelationship(); 
          this.loading = false;
        }
      },
      resetPassword(formName){ 
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$request.requestAxios('patch', basePath + `/hr_users/password/`, this.resetPasswordForm,
              function(response) {
                self.$message.success(response.data.meta.message);
                self.$refs[formName].resetFields();
              },
              function(error, status) {
                status == 200 ? self.$message.error(error.data.meta.message) :
                  self.$message.error(`hr_users/password/ - 失败`);
            });
          } else {
            return false;
          }
        });
      },
      /*
       * 时间组件广播回来的时间值
       * @params {string} val 时间组件返回回来的值
       * @params {string} formDatTypeeKey 当前页面的字段 
       */
      dateEmitFun(val,formDateKey){  
        formDateKey.date_time = val;
      },
      /*
       * 时间组件广播回来的时间类型
       * @params {string} val 时间组件返回回来的值
       * @params {string} formDateKey 当前页面的字段 
       */
      dateTypeEmitFun(val,formDateKey){ 
        formDateKey.type = val;
      },
      /*
       * 获取树结构的值
       */
      treeValDataFun(val){ 
        this.partyMemberForm.partyOrgsId = val.id; 
      }
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
  .tree-selected{
    border: 1px solid #d2d2d2;
    padding: 0 10px;
    overflow: auto;
    min-height: 200px;
    max-height: 500px;
  }
</style>