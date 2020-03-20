/*************************************
*  create by xieyuanyuan date 2018/05/11
*  首页管理 - 任务管理 - 任务表单
**************************************/
<template>
  <el-dialog
    v-if="hisToryData"
    class="task-detail-dialog dialog"
    :title="hisToryData.commentContent"
    :visible.sync="showDialog"
    width="75%">
    <el-container> 
      <el-main>
        <el-form 
          v-if=" hisToryData.formData && 
                hisToryData.fromType != 1 && 
                hisToryData.fromType != 3 && 
                hisToryData.fromType != 4 && 
                hisToryData.fromType != 6 && 
                hisToryData.fromType != 7" class="task-form" ref="formData" :model="formData" label-width="180px">
          <!-- 排除按钮 -->
          <el-form-item 
              v-for="(item, index) in JSON.parse(hisToryData.formData)" 
              :key="index"
              v-if="item.type != 'inputButton'"
              :label="`${item.type != 'skipApproval' ? item.title + '：' : '' }`">
              <span v-if="item.type == 'inputText' || 
                          item.type == 'inputNumber' || 
                          item.type == 'textarea'">
                {{item.value}}
              </span>  

              <span v-if=" item.type == 'tree' " v-for="(itemTree, indexTree) in item.value">
                {{itemTree}},
              </span>
              <!-- 下拉菜单 -->
              <el-select 
                  v-if=" item.type == 'select' "
                  v-model="item.value" disabled>
                  <el-option
                      v-for="(itemBox, indexBox) in item.option"
                      :key="indexBox"
                      :label="itemBox.name"
                      :value="itemBox.value">
                  </el-option>
              </el-select>
              <span v-if="item.type == 'date'">
                {{$util._convertDate(item.value, 'yyyy年MM月dd日 hh:mm:ss')}}
              </span> 
              <span v-if="item.type == 'dateRange'">
                {{$util._convertDate(item.value[0], 'yyyy年MM月dd日 hh:mm:ss')}} ~ 
                {{$util._convertDate(item.value[1], 'yyyy年MM月dd日 hh:mm:ss')}}
              </span>     
              <!-- 单选框 --> 
              <el-radio-group 
                v-if=" item.type == 'inputRadio' "
                v-model="item.value" disabled>
                <el-radio 
                    v-for="(itemBox, indexBox) in item.option" 
                    v-model="item.value" 
                    :key="indexBox"
                    :label="itemBox.value">{{itemBox.name}}
                </el-radio>
              </el-radio-group>
              <!-- 复选框 -->
              <el-checkbox-group v-if=" item.type == 'inputCheckBox' " v-model="item.value">
                  <el-checkbox v-for="(itemBox, indexBox) in item.option" :label="itemBox.value" :key="indexBox">{{itemBox.name}}</el-checkbox>
              </el-checkbox-group>
              
              <!-- 固定下拉数据 -->
              <span v-if=" item.type == 'appointSelect' " v-for="(itemSelect, indexSelect) in item.value">
                <user-info :userId="itemSelect"></user-info>,
              </span>

              <!-- 附件 (.native主要用于监听组件根元素的原生事件,主要是给自定义的组件添加原生事件。)-->
              <div v-if=" item.type == 'inputFile' || item.type == 'editFile' " 
                v-for="(itemFile, indexFile) in item.value" 
                :key="indexFile">
                <el-button 
                  type="text"
                  title="点击下载"
                  @click="$util.downloadFile(itemFile.fileId)">
                    {{itemFile.fileName}},
                </el-button>
                <el-button 
                  v-if="$util._validateFileFormat(itemFile.fileName)" 
                  type="primary" 
                  size="mini" 
                  @click="$util.fileEditOrPreview(itemFile.fileId, 'onlyread')">可在线预览</el-button>
              </div>

              <!-- 缴费码 -->
              <div v-if=" item.type == 'payCode' ">
                  <img :src="item.codeUrl" />
              </div>
              
              <!-- 表格 -->
              <my-table v-if=" item.type == 'table' " :tableParams="item" :taskId="processTaskId" :instanceId="instanceId" isEditPage="false"></my-table>

              <!-- 编辑器 -->
              <span v-if=" item.type == 'ueditor' " v-html="item.value"></span>

              <!-- 导出结果 -->
              <export-result v-if=" item.type == 'exportResult' " :itemParams="item" :taskId="processTaskId" :instanceId="instanceId"></export-result>
              <!-- 选票详情 -->
              <vote-detail v-if=" item.type == 'createVote' " :voteDetailId=" item.value " ></vote-detail>
              <!-- 跳过审批 -->
              <el-checkbox v-if=" item.type == 'skipApproval' " v-model="item.value">跳过审批</el-checkbox>
          </el-form-item>
        </el-form>
      </el-main>
      <!-- 个人信息 -->
      <personal-message 
        :mathRandom="mathRandom"
        v-if="hisToryData.fromType == 1 || 
              hisToryData.fromType == 6 || 
              hisToryData.fromType == 7 " 
        :hisToryData="hisToryData">
      </personal-message>
      <!-- 经历性 -->
      <experience-com 
        v-if="hisToryData.fromType == 3" 
        :hisToryData="hisToryData">
      </experience-com>
      <!-- 获得性 -->
      <archiveses-com 
        v-if="hisToryData.fromType == 4" 
        :hisToryData="hisToryData">
      </archiveses-com>
    </el-container>
  </el-dialog>
</template>
<script>
  import myTable from './Table_Component.vue'
  import userInfo from './User_Info.vue'
  import exportResult from './Export_Result.vue'
  import personalMessage from '../../personal_manage/message/My_Message.vue' //我的信息
  import experience from '../../personal_manage/message/Experience.vue' //经历性
  import archiveses from '../../personal_manage/message/Archiveses.vue' //获得性
  import voteDetail from '../../vote_manage/vote_list/VoteDetail.vue'
  import Query_Tree_Selected      from './Query_Tree_Selected.vue'
  export default {
      components: {
        'my-table':         myTable,
        'user-info':        userInfo,
        'export-result':    exportResult,
        'personal-message': personalMessage,
        'vote-detail':      voteDetail,
        'tree-selected-last': Query_Tree_Selected,
        'experience-com':       experience,
        'archiveses-com':       archiveses,
      },
      props:{
          hisToryData: {   //历史详情数据
              required: true,
          },
          
          mathRandom: {
              type: Number, 
              required: true,
              default: 0,     //为0不显示弹框
          },
          processTaskId: {   //详情ID
              required: false,
          },
          instanceId: {      
              required: false,
          },
      },
      data() {
          return {
              orgCode: sessionStorage.getItem('orgCode'),
              orgId: sessionStorage.getItem('orgId'),
              radio: "", 
              showDialog: false,
          }
      },
      mounted() {

      },
      watch:{
          mathRandom:{
              handler(data){
                if(data != 0 ){ //当页面不为0的情况先查询数据
                  this.showDialog = true; 
                }
              },
              deep: true,
          },
      },
      destoryed() {

      },
      methods:{ 
      }
  }
</script>