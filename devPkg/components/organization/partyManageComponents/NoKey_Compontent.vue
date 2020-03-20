/*********************************************************************
* Created by xieyuanyaun on 2017/12/27                                *
* 表单组件                                                            *
**********************************************************************/
<template>
  <div class="form-setting" ref="formSettingR">
    <!-- 组件库 -->
    <div class="setting-header">
      <!-- 当不是请假类型时 -->
      <div v-for="(itemElement, key) in formSetting.element" :key="key" class="single-sub"> 
        <div class="single-sub-fix"
             :class="{'single-sub-disabled'
             :itemElement.isDisabled,'single-sub-disabled':itemElement.isDisabled}"
             @click="clickSinleAdd(key, $event)">
          <div>
            <span class='title'>{{itemElement.title}}</span>
            <i class="iconfont icon-apply" :class="itemElement.style.iconFontClass"></i>
          </div>
        </div>
        <!-- 浮框 -->
        <div @mouseover="_showSinleSub(key, itemElement)"
             @mouseout="_hideSinleSub(key, itemElement)"
             :style="{'width': itemElement.style.hoverChoice.width + 'px'}"
             class="hover-check-form form-inline"
             :class="{'show-display':itemElement.isShow,'hide-display':!itemElement.isShow}">
          <div>
            <div class="form-group"><label class="label-control">{{itemElement.title}}：</label></div>
            <!-- 单行文本 -->
            <div v-if="itemElement.type == 'inputText'" class="form-group">
              <input type="text" class="form-control" >
            </div>
            <!-- 多行文本 -->
            <div v-if="itemElement.type == 'textarea'" class="form-group">
              <textarea class="form-control"></textarea>
            </div>
            <!-- 数字 -->
            <div v-if="itemElement.type == 'inputNumber'" class="form-group">
              <input type="number" class="form-control" >
            </div>
            <!-- 单选框 -->
            <div v-if="itemElement.type == 'inputRadio'" class="form-group se-radio-group se-radio-group-large se-radio-group-horizontal ">
              <label class="se-radio-wrapper hover-option-wrapper">
                                  <span class="se-radio">
                                    <span class="se-radio-inner"></span>
                                    <input type="radio" class="se-radio-input" value="on"/>
                                  </span>
                <span>选项一</span>
              </label>
              <label class="se-radio-wrapper hover-option-wrapper">
                                  <span class="se-radio">
                                    <span class="se-radio-inner"></span>
                                    <input type="radio" class="se-radio-input" value="on"/>
                                  </span>
                <span>选项二</span>
              </label>
              <label class="se-radio-wrapper hover-option-wrapper">
                                  <span class="se-radio">
                                    <span class="se-radio-inner"></span>
                                    <input type="radio" class="se-radio-input" value="on"/>
                                  </span>
                <span>选项三</span>
              </label>
            </div>
            <!-- 复选框 -->
            <div v-if="itemElement.type == 'inputCheckBox'" class="form-group se-checkbox-group se-checkbox-group-large se-checkbox-group-horizontal ">
              <label class="se-checkbox-wrapper hover-option-wrapper">
                    <span class="se-checkbox">
                      <span class="se-checkbox-inner"></span>
                      <input type="checkbox" class="se-checkbox-input" value="on"/>
                    </span>
                <span>选项一</span>
              </label>
              <label class="se-checkbox-wrapper hover-option-wrapper">
                    <span class="se-checkbox">
                      <span class="se-checkbox-inner"></span>
                      <input type="checkbox" class="se-checkbox-input" value="on"/>
                    </span>
                <span>选项二</span>
              </label>
              <label class="se-checkbox-wrapper hover-option-wrapper">
                    <span class="se-checkbox">
                      <span class="se-checkbox-inner"></span>
                      <input type="checkbox" class="se-checkbox-input" value="on"/>
                    </span>
                <span>选项三</span>
              </label>
            </div>
            <!-- 下拉 -->
            <div v-if="itemElement.type == 'select'" class="form-group">
              <div class="se-select">
                <div class="se-select-selection" @click="_clickShowSelectDrapdown(itemElement, $event)">
                  <div class="se-select-selection-rendered">
                    <div v-for="itemSelect in itemElement.option" v-show="itemSelect.isChecked" class="se-select-selection-selected-value" title="itemSelect.name">{{itemSelect.name}}</div>
                  </div>
                  <span class="se-select-arrow"></span>
                </div>
                <div class="se-select-dropdown" v-show="itemElement.optionIsShow">
                  <div>
                    <ul class="se-select-dropdown-menu">
                      <li v-for="itemSelect in itemElement.option" @click="_clickSelected(itemElement, itemSelect, $event)" class="se-select-dropdown-menu-item" :title="itemSelect.name">{{itemSelect.name}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- 日期 -->
            <div v-if="itemElement.type == 'date'" class="form-group">
              <div class="se-input-date-wrapper" >
                <input class="se-input-date form-control" type="text" readonly="readonly"/>
                <i class="se-input-date-inner iconfont icon-apply" :class="itemElement.style.iconFontClass"></i>
              </div>
            </div>
            <!-- 日期区间 -->
            <div v-if="itemElement.type == 'dateRange'" class="form-group">
              <div class="se-input-date-wrapper" >
                <input :style="{'width': itemElement.style.hoverChoice.inputStyle.width + 'px'}" class="se-input-date form-control" type="text" readonly="readonly" placeholder="开始日期"/>
                <i class="se-input-date-inner iconfont icon-apply" :class="itemElement.style.iconFontClass"></i>
              </div>~
              <div class="se-input-date-wrapper" >
                <input :style="{'width': itemElement.style.hoverChoice.inputStyle.width + 'px'}" class="se-input-date form-control" type="text" readonly="readonly" placeholder="结束日期"/>
                <i class="se-input-date-inner iconfont icon-apply" :class="itemElement.style.iconFontClass"></i>
              </div>
            </div>
            <!-- 缴费码 -->
            <div v-if="itemElement.type == 'payCode'" class="form-group">
              <div class="se-input-date-wrapper" >
               <img :src="itemElement.codeUrl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 实体组件 -->
    <div class="setting-body" ref="settingBodyREF">
      <!-- 只显示表单数据，不显示按钮 -->
      <draggable v-model="formSetting.storageData"
                 :options="{group:'people'}"
                 @start="drag=true"
                 @end="drag=false">
        <div v-for="(itemStorageData,index) in formSetting.storageData"
             :key="index"
             class="setting-fix"
             :class="{ 'se-fix-active' :  itemStorageData.style.isActive }"
             :ref="'storageRef'+index" >
          <div class="setting-fix-sub" v-if="itemStorageData.type != 'inputButton'">
            <!-- 关闭按钮 -->
            <i class="se-icon-alertoff-black" @click.stop.self="_delFormSetting(index ,$event)">x</i>
            <div class="se-tags" :class="" @click.stop="clickShowToolTipPortal(itemStorageData, index, $event)">
              <!-- 在不是缴费码的情况下 -->
              <div class="se-form-no-colon">
                <!-- 标题 -->
                <div class="se-form-item-label">
                  <label class="label-control" :class="{ 'se-form-item-required' : itemStorageData.isRequired }">
                    {{ itemStorageData.title}}：
                    <br/>
                    ( {{itemStorageData.backstageKey[0].keyName}} )
                  </label>
                </div>

                <!-- 内容 -->
                <div class="se-form-item-wrapper">
                  <div class="se-form-item-control" >

                    <!-- 单行文本，多行文本，数字，-->
                    <input v-if=" itemStorageData.type == 'inputText' || itemStorageData.type == 'textarea' || itemStorageData.type == 'inputNumber' || itemStorageData.type == 'ueditor' || itemStorageData.type == 'tree'" :placeholder="itemStorageData.prompt" v-model="itemStorageData.prompt" type="text" class="form-control input-text" />

                    <!-- 单选框 -->
                    <div v-if=" itemStorageData.type == 'inputRadio'" class="se-radio-group se-radio-group-large " :class="{'se-radio-group-horizontal' : !itemStorageData.direction, 'se-radio-group-longitudinal' : itemStorageData.direction}">
                      <label v-for="itemRadio in itemStorageData.option" class="se-radio-wrapper" @click="_radioChecked(itemStorageData, itemRadio, $event)">
                            <span class="se-radio" :class="{'se-radio-checked' : itemRadio.isChecked}">
                              <span class="se-radio-inner"></span>
                              <!-- <input type="radio" class="se-radio-input" value="on" /> -->
                            </span>
                        <span>{{itemRadio.name}}</span>
                      </label>

                    </div>
                    <!-- 复选框   -->
                    <div v-if="itemStorageData.type == 'inputCheckBox'" class="se-checkbox-group se-checkbox-group-large " :class="{'se-checkbox-group-horizontal' : !itemStorageData.direction, 'se-checkbox-group-longitudinal' : itemStorageData.direction}">
                      <label  v-for="itemCheckbox in itemStorageData.option" class="se-checkbox-wrapper" @click="_checkboxChecked(itemStorageData, itemCheckbox, $event)">
                            <span class="se-checkbox" :class="{'se-checkbox-checked' : itemCheckbox.isChecked}">
                              <span class="se-checkbox-inner"></span>
                              <!-- <input type="checkbox" class="se-checkbox-input" value="on"/> -->
                            </span>
                        <span>{{itemCheckbox.name}}</span>
                      </label>
                    </div>
                    <!-- 下拉框   -->
                    <div class="se-select" v-if="itemStorageData.type == 'select'">
                      <div class="se-select-selection" @click="_clickShowSelectDrapdown(itemStorageData, $event)">
                        <div class="se-select-selection-rendered">
                          <div v-for="itemSelect in itemStorageData.option" v-show="itemSelect.isChecked" class="se-select-selection-selected-value" :title="itemSelect.name">{{itemSelect.name}}
                          </div>
                        </div>
                        <span class="se-select-arrow"></span>
                      </div>
                      <div class="se-select-dropdown" v-show="itemStorageData.optionIsShow">
                        <div>
                          <ul class="se-select-dropdown-menu">
                            <li v-for="itemSelect in itemStorageData.option" @click="_clickSelected(itemStorageData, itemSelect, $event)" class="se-select-dropdown-menu-item" :title="itemSelect.name">{{itemSelect.name}}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- 日期   -->
                    <div v-if="itemStorageData.type == 'date'">
                      <div class="se-input-date-wrapper" >
                        <input class="se-input-date form-control" type="text" readonly="readonly" :placeholder="itemStorageData.prompt"/>
                        <i class="se-input-date-inner iconfont icon-apply" :class="itemStorageData.style.iconFontClass"></i>
                      </div>
                    </div>
                    <!-- 日期区间   -->
                    <div v-if="itemStorageData.type == 'dateRange'">
                      <div class="se-input-date-wrapper" >
                        <input class="se-input-date form-control" type="text" readonly="readonly" :placeholder="itemStorageData.prompt"/>
                        <i class="se-input-date-inner iconfont icon-apply" :class="itemStorageData.style.iconFontClass"></i>
                      </div>~
                      <div class="se-input-date-wrapper" >
                        <input class="se-input-date form-control" type="text" readonly="readonly" :placeholder="itemStorageData.prompt"/>
                        <i class="se-input-date-inner iconfont icon-apply" :class="itemStorageData.style.iconFontClass"></i>
                      </div>
                    </div>
                    <!-- 缴费码 -->
                    <div v-if="itemStorageData.type == 'payCode'">
                      <div class="se-input-date-wrapper" >
                        <img :src="itemStorageData.codeUrl"/>
                      </div>
                    </div>
                    <!-- 附件 -->
                    <div v-if="itemStorageData.type == 'inputFile' || itemStorageData.type == 'editFile'">
                      <div class="se-input-date-wrapper" >
                        <input class="se-input-date form-control" type="file" readonly="readonly" :placeholder="itemStorageData.prompt"/>
                        <i class="se-input-date-inner iconfont icon-apply" :class="itemStorageData.style.iconFontClass"></i>
                      </div>
                    </div>
                    <!-- 固定数据的下来 -->
                    <div class="se-select" v-if="itemStorageData.type == 'appointSelect'">
                      <div class="se-select-selection">
                        <div class="se-select-selection-rendered">
                          <div v-for="itemSelect in itemStorageData.option" v-show="itemSelect.isChecked" class="se-select-selection-selected-value" :title="itemSelect.name">{{itemSelect.name}}
                          </div>
                        </div>
                        <span class="se-select-arrow"></span>
                      </div>
                    </div>
                    <!-- 表格 -->
                    <div v-if="itemStorageData.type == 'table'" class="se-table-tab">
                      <table>
                        <thead>
                          <tr>
                            <th v-for="colItem in itemStorageData.cols">{{colItem.name}}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td v-for="colItem in itemStorageData.cols"><input type="text" class="form-control" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- 选票 -->
                    <el-button v-if="itemStorageData.type == 'createVote'" type="primary" size="mini">{{itemStorageData.btnName}}</el-button>
                    <el-button v-if="itemStorageData.type == 'exportResult'" type="primary" size="mini">导出结果</el-button>
                    
                    <!-- 跳过审批   -->
                    <div v-if="itemStorageData.type == 'skipApproval'" class="se-checkbox-group se-checkbox-group-large " >
                      <label class="se-checkbox-wrapper">
                            <span class="se-checkbox" >
                              <span class="se-checkbox-inner"></span>
                              <!-- <input type="checkbox" class="se-checkbox-input" value="on"/> -->
                            </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </draggable>
      <!-- 显示按钮 -->
      <hr>
      <div class="se-form-footer">
        <div v-for="(itemStorageData,index) in formSetting.storageData"
             :key="index"
             class="se-form-footer-btn"
             :class="{ 'se-fix-active' :  itemStorageData.style.isActive }"
             :ref="'storageRef'+index"
             v-if="itemStorageData.type == 'inputButton'">
          <!-- 关闭按钮 -->
          <i class="se-icon-alertoff-black" @click.stop.self="_delFormSetting(index ,$event)">x</i>
          <el-button @click.stop="clickShowToolTipPortal(itemStorageData, index, $event)">{{itemStorageData.title}}</el-button>
        </div>
      </div>
    </div>
    <!-- 弹框 ToolTipPortal-->
    <div v-if="transferStorage.data"
      v-show="transferStorage.data.toolTipPortal.isShow"
      :style="{position: transferStorage.style.position, left:transferStorage.style.left +'px', top:transferStorage.style.top +'px'}"
      class="ToolTipPortal"
      notClose="toolTipPortal" >
      <div :class="{'ToolTipPortal-horizontal' : !transferStorage.direction, 'ToolTipPortal-longitudinal' : transferStorage.direction}"
        notClose="toolTipPortal"
        class="ToolTipPortal-fix">
        <h2 notClose="toolTipPortal">编辑控件</h2>
        <!-- 显示标题 -->
        <div notClose="toolTipPortal"  class="se-row se-form-item">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" for="label" class="se-form-item-required">标题</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control">
              <span notClose="toolTipPortal" class="se-input-wrapper">
                <input maxlength="8" notClose="toolTipPortal" type="text" placeholder="标题"  v-model="transferStorage.data.title" class="se-input form-control" />
              </span>
            </div>
          </div>
        </div>

        <!-- 后台所需存入数据库字段，必填 (按钮类型不需要字段) -->
        <div 
          v-if="transferStorage.data.type != 'inputButton' && transferStorage.data.type != 'exportResult'"  
          notClose="toolTipPortal" class="se-row se-form-item">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" for="label" :class="{'se-form-item-required': transferStorage.data.isProcess}">字段名</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control" v-for="(itemBackKey,index) in transferStorage.data.backstageKey" >
                  <span notClose="toolTipPortal" class="se-input-wrapper">
                    <input notClose="toolTipPortal" v-model="itemBackKey.keyName" type="text" @blur="_humpNaming(index, transferStorage.data.formId, $event)" placeholder="只能填写英文数字下划线" :class="{'border-red': (!itemBackKey.keyName && itemBackKey.isRequired) }" class="se-input form-control"/>
                  </span>
            </div> 
            <div notClose="toolTipPortal" class="form-group se-checkbox-group se-checkbox-group-large se-checkbox-group-horizontal ">
              <span :class="{ 'font-red': transferStorage.data.isKeyPrompt }"> {{transferStorage.data.isKeyPrompt}} </span>
            </div>
          </div>
        </div>

        <!-- 单行文本，多行文本，数字，-->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'inputText' || transferStorage.data.type == 'textarea' || transferStorage.data.type == 'inputNumber' ">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">提示文字</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
                  <span notClose="toolTipPortal" class="se-input-wrapper">
                    <input notClose="toolTipPortal" type="text" placeholder="请输入提示文字" maxlength="64" v-model="transferStorage.data.prompt" class="se-input form-control" />
                  </span>
            </div>
          </div>
        </div>
        <!-- 单选框，复选框, 下拉 选项设置   -->
        <div notClose="toolTipPortal" class="se-row se-form-item"  v-if=" transferStorage.data.type == 'inputRadio' || transferStorage.data.type == 'inputCheckBox' || transferStorage.data.type == 'select'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="se-form-item-required">选项设置</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div 
              notClose="toolTipPortal" 
              class="se-form-item-control "
              style="height: 40px; position: relative;" 
              v-for="(optionItem, optionIndex) in transferStorage.data.option">
              <span notClose="toolTipPortal" class="se-textarea-wrapper"  style="width: 100%; ">
                <!-- <textarea notClose="toolTipPortal" id="textareaShowFile" v-html="_filterOption(transferStorage.data.option)" class="form-control" @keyup="_editTextarea(transferStorage.data, transferStorage.data.formId, $event)">
                </textarea> -->
                <div notClose="toolTipPortal" class="se-form-item-label" style="width: 50px; float: left;">
                  <label notClose="toolTipPortal">label</label>
                </div>
                <input notClose="toolTipPortal" 
                       type="text" 
                       placeholder="展示名字" 
                       maxlength="64"  
                       class="se-input form-control" 
                       v-model="optionItem.name"
                       style="width: 210px; float: left;"/>
                <div notClose="toolTipPortal" class="se-form-item-label"  style="width: 60px; float: left;">
                  <label notClose="toolTipPortal">key</label>
                </div>
                <input notClose="toolTipPortal" 
                       type="text" 
                       placeholder="键名" 
                       maxlength="64" 
                       v-model="optionItem.value" 
                       class="se-input form-control" 
                       style="width: 120px; float: left;"/>
              </span>
              <!-- 关闭按钮 -->
              <i class="se-icon-alertoff-black" 
                 style="position: absolute;
                    background: red;
                    color: #fff;
                    width: 14px;
                    height: 14px;
                    line-height: 10px;
                    border-radius: 16px;
                    font-size: 12px;
                    text-align: center;
                    font-style: inherit;
                    cursor: pointer;" 
                  @click.stop.self="_delOption(transferStorage.data, optionIndex, $event)">x</i>
              <!-- <div notClose="toolTipPortal" class="se-form-explain">请用回车隔开不同选项</div> -->
            </div>
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <button notClose="toolTipPortal" @click.stop.self="_addOption(transferStorage.data, transferStorage.data.formId, $event)">添加选项</button>(每个key都必填，并且不能相同)
            </div>
          </div>
        </div>
        <!-- 单选框，复选框 排列方式  -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'inputRadio' || transferStorage.data.type == 'inputCheckBox'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">排列方式</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <!-- 单选框 -->
              <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large">
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_directionFun(transferStorage.data, false, transferStorage.data.formId, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-group-horizontal':!transferStorage.data.direction}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">横向</span>
                </label>
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_directionFun(transferStorage.data, true, transferStorage.data.formId, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-group-longitudinal':transferStorage.data.direction}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">纵向</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- 日期，日期区间，请假; 时间格式   -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'date' || transferStorage.data.type == 'dateRange' || transferStorage.data.type == 'leave'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">时间格式</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large se-radio-group-longitudinal">
                <label notClose="toolTipPortal" v-for="itemDate in transferStorage.data.dateType" class="se-radio-wrapper" @click="_dateFormatScreen(transferStorage.data, itemDate, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked' : itemDate.isChecked}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">{{itemDate.formatShowField}}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- 日期，日期区间，设置时间是从什么时间开始   -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'date' || transferStorage.data.type == 'dateRange' || transferStorage.data.type == 'leave'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">开始时间</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <el-select v-model="transferStorage.data.selectionRange" placeholder="请选择">
                <el-option
                  label="不限"
                  value="1">
                </el-option>
                <el-option
                  label="大于当前时间"
                  value="2">
                </el-option>
                <el-option
                  label="大于等于当前时间"
                  value="3">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        
        <!-- 表格编辑 -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if="transferStorage.data.type == 'table'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">表头</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper ">
              <div notClose="toolTipPortal" class="se-form-item-control ">
                <div notClose="toolTipPortal" v-for="(colItem,index) in transferStorage.data.cols" class="se-table-wrapper">
                  <div notClose="toolTipPortal" class="col-xs-12 se-table-control">
                    <div notClose="toolTipPortal" class="col-xs-1 se-table-item-label">
                      <label notClose="toolTipPortal" class="label-control ">{{index+1}}</label>
                    </div>
                    <div notClose="toolTipPortal" class="col-xs-4">
                      <input notClose="toolTipPortal" v-model="colItem.name" placeholder="请填写列名" class="form-control" type="text" name="">
                    </div>
                    <div notClose="toolTipPortal" class="col-xs-4">
                      <input notClose="toolTipPortal" v-model="colItem.keyName" placeholder="请填写键名" class="form-control" type="text" name="">
                    </div>
                    <div notClose="toolTipPortal" class=" col-xs-2 se-table-item-label ">
                      <label notClose="toolTipPortal" class="label-control">值类型</label>
                    </div>
                    <div notClose="toolTipPortal" class="col-xs-3">
                      <select :disabled="colItem.dataType == 'operaBtn'" notClose="toolTipPortal" class="form-control" v-model="colItem.dataType">
                        <option notClose="toolTipPortal" value="text">文本</option>
                        <option notClose="toolTipPortal" value="controlTable">对照表</option>
                        <option notClose="toolTipPortal" value="text">文本</option>
                        <option notClose="toolTipPortal" value="yyyy年MM月dd日 hh:mm:ss">年月日 时分秒</option>
                        <option notClose="toolTipPortal" value="yyyy年MM月dd日">年月日</option>
                        <option notClose="toolTipPortal" value="yyyy年MM月">年月</option>
                        <option notClose="toolTipPortal" value="yyyy年">年</option>
                      </select>
                    </div>
                  </div>
                  <div notClose="toolTipPortal" class="btn-del" @click="delCol(colItem, index, transferStorage.data)">
                    <i notClose="toolTipPortal">x</i>
                  </div>
                </div>
                <div notClose="toolTipPortal">
                  <button notClose="toolTipPortal" class="btn btn-primary" @click="addTableCol(transferStorage.data)">添加列</button>
                </div>
              </div>
          </div>
          <hr>
          <div notClose="toolTipPortal" class="se-form-item-label" v-if="!transferStorage.data.isShowHeader">
            <label notClose="toolTipPortal" class="se-form-item-required">请求地址</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper" v-if="!transferStorage.data.isShowHeader">
              <div notClose="toolTipPortal" class="se-form-item-control ">
                <div notClose="toolTipPortal" class="col-xs-12 se-table-control">
                  <div notClose="toolTipPortal" class="col-xs-6">
                    <input notClose="toolTipPortal" v-model="transferStorage.data.requestUrl" placeholder="请填写操作请求地址" class="form-control" type="text" name="">
                  </div>
                </div>
              </div>
          </div>
          <!-- 是否允许操作 -->
          <div notClose="toolTipPortal" 
            v-if="!transferStorage.data.isShowHeader"
            class="se-row se-form-item">
            <div notClose="toolTipPortal" class="se-form-item-label">
              <label notClose="toolTipPortal" class="">是否允许操作</label>
            </div>
            <div notClose="toolTipPortal" class="se-form-item-wrapper" style="width: 170px; padding-left: 0;display: inline-block;">
              <div notClose="toolTipPortal" class="se-form-item-control ">
                <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large se-radio-group-horizontal">
                  <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_isOperationFun(transferStorage.data, true, $event)">
                        <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':transferStorage.data.isOperation}">
                          <span notClose="toolTipPortal" class="se-radio-inner"></span>
                          <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                        </span>
                    <span notClose="toolTipPortal">是</span>
                  </label>
                  <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_isOperationFun(transferStorage.data, false, $event)">
                        <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':!transferStorage.data.isOperation}">
                          <span notClose="toolTipPortal" class="se-radio-inner"></span>
                          <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                        </span>
                    <span notClose="toolTipPortal">否</span>
                  </label>
                </div>
              </div>
            </div>
            <label notClose="toolTipPortal" class="">操作类型：</label>
            <div notClose="toolTipPortal" style="width: 100px; display: inline-block;">
              <select notClose="toolTipPortal" class="form-control" v-model="transferStorage.dataType">
                <option notClose="toolTipPortal" value="radio">单选</option>
                <option notClose="toolTipPortal" value="checkbox">多选</option>
              </select>
            </div>
          </div>
          <!-- 是否只显示表头 -->
          <div notClose="toolTipPortal" 
            class="se-row se-form-item">
            <div notClose="toolTipPortal" class="se-form-item-label">
              <label notClose="toolTipPortal" class="">是否只显示表头</label>
            </div>
            <div notClose="toolTipPortal" class="se-form-item-wrapper" style="width: 170px; padding-left: 0;display: inline-block;">
              <div notClose="toolTipPortal" class="se-form-item-control ">
                <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large se-radio-group-horizontal">
                  <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_isShowHeaderFun(transferStorage.data, true, $event)">
                        <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':transferStorage.data.isShowHeader}">
                          <span notClose="toolTipPortal" class="se-radio-inner"></span>
                          <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                        </span>
                    <span notClose="toolTipPortal">是</span>
                  </label>
                  <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_isShowHeaderFun(transferStorage.data, false, $event)">
                        <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':!transferStorage.data.isShowHeader}">
                          <span notClose="toolTipPortal" class="se-radio-inner"></span>
                          <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                        </span>
                    <span notClose="toolTipPortal">否</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <!-- 按钮 -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'inputButton' ">
          <div notClose="toolTipPortal" class="se-form-item-label" style="display: none;">
            <label notClose="toolTipPortal" class="se-form-item-required">请求地址类型</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper" style="display: none;">
            <div notClose="toolTipPortal" class="se-form-item-control ">
                  <span notClose="toolTipPortal" class="se-input-wrapper">
                    <select 
                        notClose="toolTipPortal" 
                        style="height: 34px; border-radius:5px; border: 1px solid #ccc; width: 100%"
                        v-model="transferStorage.data.requestUrlTypeId"
                        @change="getButtonList(transferStorage.data.requestUrlTypeId)">
                      <option 
                        notClose="toolTipPortal"
                        v-for="(itemTUrl, indexTurl) in buttonUrlTypeList" 
                        :key="indexTurl" 
                        :value="itemTUrl.id" 
                        :label="itemTUrl.name"></option>
                    </select>
                  </span>
            </div>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-label" style="margin-top: 10px;">
            <label notClose="toolTipPortal" class="se-form-item-required">请求地址</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper" style="margin-top: 10px;">
            <div notClose="toolTipPortal" class="se-form-item-control ">
                  <span notClose="toolTipPortal" class="se-input-wrapper">
                    <select 
                      notClose="toolTipPortal"
                      v-model="transferStorage.data.requestUrl"
                      style="height: 34px; border-radius:5px; border: 1px solid #ccc; width: 100%"
                      @change="reuqestUrlFun(transferStorage.data.requestUrl, 'buttonUrlList', transferStorage.data)">
                      <option 
                        notClose="toolTipPortal"
                        v-for="(itemUrl, indexUrl) in buttonUrlList" 
                        :key="indexUrl" 
                        :value="itemUrl.requestUrl" 
                        :label="itemUrl.requestName"></option>
                    </select>
                  </span>
            </div>
          </div>
        </div>
        <!-- 固定下拉 -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'appointSelect' ">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="se-form-item-required">请求地址</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
                  <span notClose="toolTipPortal" class="se-input-wrapper">
                    <select 
                      notClose="toolTipPortal"
                      v-model="transferStorage.data.requestUrl"
                      style="height: 34px; border-radius:5px; border: 1px solid #ccc; width: 100%"
                      @change="reuqestUrlFun(transferStorage.data.requestUrl, 'personnelUrlList', transferStorage.data)">
                      <option 
                        notClose="toolTipPortal"
                        v-for="(itemUrl, indexUrl) in personnelUrlList" 
                        :key="indexUrl" 
                        :value="itemUrl.requestUrl" 
                        :label="itemUrl.requestName"></option>
                    </select>
                  </span>
            </div>
          </div>
        </div>
        <!-- 固定附件/导出结果/二维码/人员组织树 -->
        <div notClose="toolTipPortal" class="se-row se-form-item" v-if=" transferStorage.data.type == 'editFile' || transferStorage.data.type == 'exportResult' || transferStorage.data.type == 'payCode' || transferStorage.data.type == 'tree'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="se-form-item-required">请求地址</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
                <div notClose="toolTipPortal" class="col-xs-12 se-table-control">
                  <div notClose="toolTipPortal" class="col-xs-6">
                    <input notClose="toolTipPortal" v-model="transferStorage.data.requestUrl" placeholder="请填写操作请求地址" class="form-control" type="text" name="">
                  </div>
                </div>
              </div>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">是否能全选</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large se-radio-group-horizontal">
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="isCheckboxFun(transferStorage.data, true, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':transferStorage.data.checkboxType}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">是</span>
                </label>
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="isCheckboxFun(transferStorage.data, false, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':!transferStorage.data.checkboxType}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">否</span>
                </label>
              </div>
            </div>
          </div> 
        </div>
        <!-- 固定下拉 允许单选还是多选  -->
        <div notClose="toolTipPortal" 
             class="se-row se-form-item" 
             v-show="transferStorage.data.type == 'appointSelect'">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">是否允许多选</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large se-radio-group-horizontal">
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="isMultiSelectionFun(transferStorage.data, true, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':transferStorage.data.isMultiSelection}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">是</span>
                </label>
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="isMultiSelectionFun(transferStorage.data, false, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':!transferStorage.data.isMultiSelection}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">否</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- 不是按钮类型的情况，显示是否必填权限 -->
        <div notClose="toolTipPortal" 
             class="se-row se-form-item" 
             v-show="transferStorage.data.type != 'inputButton'  
                    && transferStorage.data.type !='payCode' 
                    && (transferStorage.data.type == 'table' ? transferStorage.data.isOperation : true)">
          <div notClose="toolTipPortal" class="se-form-item-label">
            <label notClose="toolTipPortal" class="">是否必填</label>
          </div>
          <div notClose="toolTipPortal" class="se-form-item-wrapper">
            <div notClose="toolTipPortal" class="se-form-item-control ">
              <div notClose="toolTipPortal" class="se-radio-group se-radio-group-large se-radio-group-horizontal">
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_isRequiredFun(transferStorage.data, true, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':transferStorage.data.isRequired}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">是</span>
                </label>
                <label notClose="toolTipPortal" class="se-radio-wrapper" @click="_isRequiredFun(transferStorage.data, false, $event)">
                      <span notClose="toolTipPortal" class="se-radio" :class="{'se-radio-checked':!transferStorage.data.isRequired}">
                        <span notClose="toolTipPortal" class="se-radio-inner"></span>
                        <input notClose="toolTipPortal" type="radio" class="se-radio-input" value="on"/>
                      </span>
                  <span notClose="toolTipPortal">否</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 是否删除组件弹框 -->
    <div class="se-popover" style="left: 775px; top: 538px; transform-origin: 206px 50% 0px;" ref="numm">
      <div class="se-popover-content">
        <div class="se-popover-arrow"></div>
        <div class="se-popover-inner">
          <div class="se-popover-inner-content">
            <div class="se-popover-message">
              <i type="exclamation-circle" class="jgicon  jgicon-exclamation-circle"></i>
              <div class="se-popover-message-title">您确定要删除这个控件吗？</div>
            </div>
            <div class="se-popover-buttons">
              <button type="button" class="se-btn se-btn-ghost btn" @click="_delComponentNo"><span>取 消</span></button>
              <button type="button" class="se-btn se-btn-primary btn btn-primary" @click="_delComponentYes"><span>确 定</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import '../../../styles/custom_form.less'
  import '../../../styles/component.less'
  import draggable from 'vuedraggable';
  export default {
    props:{
      processTypeId: {  //流程类型ID，当ID为 '2' 时请假组件只能看不能操作
        // required: true,
        default: null,
        type: 'string',
      },
      objProps: {   //当流程是编辑状态是会有一个组件数组
        default: null,
      },
      countNum: { //用这个中间变量来避免数据重定向
        default: 0,
      },
      taskFormDataAFew: {
        default: 'default',
      },
      activeTypeItem: {
        default:null,
      },
      deployNode:{
        default: null
      },
      backStorageKeyArray: { //存储键的数组
        default: [],
      },
      activeComTypeParentId: { //被选中组织父级Id
        default: null, 
      }
     },
    components: {
      draggable,
     },
    watch: {
      //监听数据变化，并广播事件 storageData
      formSetting: { 
        handler: function(datas){ 
          this.$emit('storageData' , datas.storageData.length == 0 ? "" : datas.storageData);
        },
        deep: true, //深度监听
      },
      //监听数据变化，验证信息是否填写完整
      transferStorage: {
        handler: function(datas){
          // this._verificationKeyName(datas);
        },
        deep: true, //深度监听
      },
      //监听操作框中键名提示信息
      "transferStorage.data.value": function (prompt) {
        // console.log("提示信息"+prompt)
      },
      //监听流程类型ID的变化
      "processTypeId": function(Id){
        this._switchProcessType(Id);
      },
      //监听改对象是否有变化，有变化给formSetting.storageData赋值
      countNum: {
        handler: function(datas){   
          this.formSetting.storageData = this.objProps ? this.objProps : []; 
          this.getComponentKu();
        },
        deep: true, //深度监听
      },
      activeTypeItem(){ 
        // this.getButtonList(this.activeTypeItem.id)
      },
     },
    data: function(){
      return {
        deployNodeList: [],
        // userData: JSON.parse(sessionstorage.getItem('userData')),
        buttonUrlList:          [],  //请求地址列表
        buttonUrlTypeList:      [],  //请求地址类型列表
        activeButtonUrlTypeId:  null,//被选中地址类型Id
        activeRequestUrl:       null,//被选中的地址
        personnelUrlList:       [{"requestName":"获取党组织党员","requestMethod":"GET","requestUrl":"/party_orgs/members"}],//查询人员请求地址数据
        formSetting: {               //表单设置
          element: [],               //组件库
          storageData: [],           //存储数据
        },
        transferStorage: {           //转接数据
          data: null,
          direction: false,          //false横向;true纵向
          textareaHtmlData: null,    //修改选项展示数据
          style: {
            position:'absolute',
            left: 650,
            top: 0,
            zIndex: 9999,
          }
        } ,
        delComponentIndex: null,    //需要删除的组件下标 
      }
    },
    created: function(){         //页面加载前
      var self = this;
      // 点击其他不在的区域触发事件
      document.addEventListener('click', function(ev) {
        self._clickToolNotClose(ev,'toolTipPortal');

      }); 
    },
    mounted: function(){         //页面加载后 
      this.getButtonList(98)
      this.getPersonnelUrlList(11); //查询人员数据 
      this.formSetting.storageData = this.objProps ? this.objProps : []; 
      // this.getComponentKu();
    },
    methods: {
      /*
       * 获取组件库
       */
      getComponentKu(){  
        this.$request.requestAxios('get', `${this.$util.basePath}/wrecord/input/input`, null, (response) => {
          if(!response.data.data) return false;
          response.data.data.forEach( (item) => {
            item.isProcess = true;
          })
          this.formSetting.element = response.data.data;
        }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
              this.$message.error(`wrecord/input/input - 失败`);
            },
        ); 
      }, 
      /*
       * 查询表单按钮类型请求地址
       */
      getButtonTypeList(){
        this.$request.requestAxios('get', `${this.$util.basePath}/t_form_data/button/type`, null, (response) => {
          this.buttonUrlTypeList = response.data.data; 
        }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
              this.$message.error(`t_form_data/button/type - 失败`);
            },
        );
       },
      /*
       * 查询表单按钮请求地址
       */
      getButtonList(typeId){
        this.$request.requestAxios('get', `${this.$util.basePath}/t_form_data/button/${typeId}`, null, (response) => {
          this.buttonUrlList = response.data.data;
          this.formSetting.element.forEach( (item) => {
            if(item.type == 'inputButton'){
              item.isDisabled = false;
            }
          });
        }, (error, status) => {
          this.buttonUrlList = [];
          this.formSetting.element.forEach( (item) => {
            if(item.type == 'inputButton'){
              item.isDisabled = true;
            }
          });
          status == 200 ? this.$message.error(error.data.meta.message) : 
          this.$message.error(`t_form_data/button - 失败`);
          },
        );   
       },
       /*
       * 查询表单按钮请求地址
       */
      getPersonnelUrlList(typeId){

        this.$request.requestAxios('get', `${this.$util.basePath}/t_form_data/button/${typeId}`, null, (response) => {
          this.personnelUrlList = response.data.data;
        }, (error, status) => {
              status == 200 ? this.$message.error(error.data.meta.message) : 
              this.$message.error(`t_form_data/button - 失败`);
            },
        );
       },
      /**
       * 验证键名是否填写完整
       * @param {object} datas 被编辑组件数据
       * @return {boolean} bool 为true表示有空的必填项，则不能操作其他操作；为false可以操作其他操作
       */
      _verificationKeyName: function(datas){
        var self = this;
        var dataItem = datas.data ,
          bool = false;

        if(dataItem){

          //当编辑控件已经是关闭状态或者打开状态
          if(!dataItem.toolTipPortal.isShow || dataItem.toolTipPortal.isShow){
            if(dataItem.isProcess && dataItem.type != 'inputButton'){
              $.each(dataItem.backstageKey, (index, item) => {
                //如果勾选了必填选择框，那么当操作框时，验证文本框中的值是否有填写
                if(!item.keyName){
                  bool = true; 
                }

                if(dataItem.isKeyPrompt ){
                  bool = true;
                }

                if(!dataItem.title ){
                  bool = true; 
                }
              });
            }else{
              dataItem.isKeyPrompt = '';
            }
          }
        }

        //满足条件表示有必填项,并且必填项有为空文本框，那么操作框就不能关闭操作框，并且不能执行其他的任何操作
        if(bool ){
          dataItem.toolTipPortal.isShow = true;
        }

        return bool;
      },
      //点击其他空白位置关闭弹框
      _clickToolNotClose: function(ev,name){
        var self = this;
        if ($(ev.target).attr('notClose') != name && $(ev.target).attr('notClose') != 'other'){
        // if ($(ev.target).attr('notClose') != name){
          //返回false取反能操作其他信息
          if(!self._verificationKeyName(self.transferStorage)){
            $.each(self.formSetting.storageData, function(index, item){
              item.toolTipPortal.isShow = false;
              item.style.isActive = false;
              if(item.type == 'select'){
                item.optionIsShow = false;
              }
              self._closePopover($(".se-popover"));
            });
          }

        }
      },
      // 浮动显示文本详情
      _showSinleSub: function(type, itemElementData) {
        var self = this;
        itemElementData.isShow = true;
      },
      // 移开隐藏文本详情
      _hideSinleSub: function(type, itemElementData) {
        var self = this;
        itemElementData.isShow = false;
      },
      /**
       * 点击添加控件
       * @param  {string} type 组件类型
       * @param  {object} ev   元素对象
       */
      clickSinleAdd: function(type,ev) { 
        var self = this;

        //当前转接组件有数据时,验证编辑框中的数据
        if(self.transferStorage.data){

          //返回false取反能操作其他信息
          if(!self._verificationKeyName(self.transferStorage)){
            self._sinleAdd(type,ev);
          }
        }else{
          self._sinleAdd(type,ev);
        }

      },
      /**
       * 添加控件
       * @param  {string} type 组件类型
       * @param  {object} ev   元素对象
       */
      _sinleAdd: function(type,ev) { 
        var self = this,
          data = self._cloneObj(self.formSetting.element[type]);

        //当组件类型为创建选票类型时，再判断组件是否已经被添加过，如果添加了，那么就不能再添加；如果没有添加，就可添加并将禁用状态改为不禁用
        if(type != 'createVote' ){
          // 当类型为按钮类型时，只有在按钮有请求地址的情况下才能添加
          if(type == 'inputButton' && this.buttonUrlList.length){
            self.formSetting.storageData.push(data)
          }else if(type != 'inputButton'){
            self.formSetting.storageData.push(data)
          }
          
        }else{
          if(!self.formSetting.element[type].isDisabled){
            self.formSetting.storageData.push(data);
            self.formSetting.element[type].isDisabled = !self.formSetting.element[type].isDisabled;
          }
        }
      },
      //克隆对象，防止添加相同的对象，出现指向相同
      _cloneObj(data) {
        return JSON.parse(JSON.stringify(data));
      },
      //删除指定的控件
      _delFormSetting: function(index, ev){
        this.delComponentIndex = index;
        $(".se-popover").css({
          transition: 'all .2s',
          position: 'absolute',
          top: parseInt($('.setting-body').find('.setting-fix').eq(index).offset().top) - parseInt($('.form-setting').offset().top) -20,
          left: parseInt($('.form-setting').width()) - parseInt($('.se-popover').width()) -50,
          opacity: 1,
          visibility:'visible',
        });
      },
      /**
       * 删除被选中组件
       */
      _delComponentYes: function(){ 
        //将组件禁用状态变为开放状态
        // this.formSetting.element[this.formSetting.storageData[this.delComponentIndex].type].isDisabled = false;

        //删除被选中组件数据
        this.formSetting.storageData.splice(this.delComponentIndex, 1);

        //清空转接数据
        this.transferStorage.data = null;

        //关闭弹框
        this._closePopover($(".se-popover"));

      },
      /**
       * 取消删除被选中组件
       */
      _delComponentNo: function(){
        this._closePopover($(".se-popover"));
      },
      /**
       * 关闭弹框
       * @param {object} elObject 元素对象
       */
      _closePopover: function(elName){
        elName.css({
          transition: 'all .2s',
          position: 'absolute',
          opacity: 0,
          visibility:'hidden',
        });
      },
      /**
       * 点击组件显示组件编辑框
       * @param {object} itemStorageData - json对象
       * @param {number} index - 对象下标
       * @param {object} ev - 元素对象
       */
      clickShowToolTipPortal: function(itemStorageData, index, ev) {
          
        var self = this;

        //当前转接组件有数据时,验证编辑框中的数据
        if(self.transferStorage.data){

          //返回false取反能操作其他信息
          if(!self._verificationKeyName(self.transferStorage)){
            self._showToolTipPortal(itemStorageData, index, ev);
          }
        }else{
          self._showToolTipPortal(itemStorageData, index, ev);
        }
      },
      /**
       * 显示组件编辑框
       * @param {object} itemStorageData - json对象
       * @param {number} index - 对象下标
       * @param {object} ev - 元素对象
       */
      _showToolTipPortal: function(itemStorageData, index, ev) {
        var self = this;

        //计算组件编辑框的摆放位置
        self._countToolTipPortalPostion(index, itemStorageData)

        //改变编辑框显示状态
        $.each(self.formSetting.storageData, function(_index, item){
          if(itemStorageData === item) {
            // ---- 组件为跳过审批按钮不能编辑 ----
            if(itemStorageData.type == 'skipApproval'){
              return false;
            }
            item.toolTipPortal.isShow = item.style.isActive= true;
          }else{
            item.toolTipPortal.isShow = item.style.isActive = false;
          }
        });

        //转接数据赋值
        self.transferStorage.data = itemStorageData;
        self.transferStorage.data.formId = index; //新增一个下标
        //避免视图不能实时刷新，就先行使用jQuery赋值
        if(self.transferStorage.data.hasOwnProperty('option')){
          $("#textareaShowFile").val(self._filterOption(self.transferStorage.data.option))
        }
      },
      /**
       * 计算组件编辑框的摆放位置
       * @param {number} index - 对象下标
       * @param {object} itemStorageData- 操作对象
       */
      _countToolTipPortalPostion: function(index, itemStorageData) {
        var self = this;
        self.$nextTick(function() {
          // 计算弹框所在的位置top
          if(itemStorageData.type == 'inputButton'){
             self.transferStorage.style.top = parseInt($('.se-form-footer').offset().top) - parseInt($('.form-setting').offset().top);
          }else{
            self.transferStorage.style.top = parseInt($('.setting-body').find('.setting-fix').eq(index).offset().top) - parseInt($('.form-setting').offset().top);
          }

          // 计算弹框所在的位置右边空白位置距离（页面总宽度 - (当前点击元素的offset().left + 自身宽度)）
          var bodyRightWidth = $("body").width() - ($('.setting-body').find('.setting-fix').offset().left + $('.form-setting').width());
          if(bodyRightWidth < 515){
            self.transferStorage.style.left = 45;
            self.transferStorage.style.top = parseInt($('.setting-body').find('.setting-fix').eq(index).offset().top) - parseInt($('.form-setting').offset().top) + parseInt($('.setting-body').find('.setting-fix').eq(index).height());
            self.transferStorage.direction = true;
          }


          

        });
      },
      /**
       * 改变是否必填的值
       * @param {object} itemStorageData - json对象
       * @param {boolean} bool - json对象
       * @param {object} ev - 元素对象
       */
      _isRequiredFun: function(itemStorageData, bool, ev) {
        itemStorageData.isRequired = bool;
      },
      /**
       * 表格：是否允许操作的值
       * @param {object} itemStorageData - json对象
       * @param {boolean} bool - json对象
       * @param {object} ev - 元素对象
       */
      _isOperationFun: function(itemStorageData, bool, ev) {
        itemStorageData.isOperation = bool;
      },
      /**
       * 表格: 是否只显示表头 
       * @param {object} itemStorageData - json对象
       * @param {boolean} bool - json对象
       * @param {object} ev - 元素对象
       */
      _isShowHeaderFun: function(itemStorageData, bool, ev) {
        itemStorageData.isShowHeader = bool;
      },
      /**
       * 改变(指定请求地址的下拉)组件是否为多选的值
       * @param {object} itemStorageData - json对象
       * @param {boolean} bool - json对象
       * @param {object} ev - 元素对象
       */
      isMultiSelectionFun: function(itemStorageData, bool, ev) {
        itemStorageData.isMultiSelection = bool;
      },
      /**
       * 改变(指定请求地址的下拉)组件是否为多选的值
       * @param {object} itemStorageData - json对象
       * @param {boolean} bool - json对象
       * @param {object} ev - 元素对象
       */
      isCheckboxFun: function(itemStorageData, bool, ev) {
        itemStorageData.checkboxType = bool;
      },
      
      /**
       * 单选框选中效果
       * @param {object} itemStorageData - json对象
       * @param {object} itemRadioData - json对象
       * @param {object} ev - 元素对象
       */
      _radioChecked: function(itemStorageData, itemRadioData, ev) {
        $.each(itemStorageData.option, function(index, item){
          if(itemRadioData === item) {
            item.isChecked = true;
          }else{
            item.isChecked = false;
          }
        });
      },
      /**
       * 复选框选中效果
       * @param {object} itemStorageData - json对象
       * @param {object} itemRadioData - json对象
       * @param {object} ev - 元素对象
       */
      _checkboxChecked: function(itemStorageData, itemRadioData, ev) {
        itemRadioData.isChecked = !itemRadioData.isChecked;
      },
      /**
       * 过滤选项，显示在多行文本框中
       * @param {object} optionData - json对象
       * @returns {string} htmlData
       */
      _filterOption: function(optionData) {
        var htmlData = "";
        $.each(optionData, function(index, item) {
          htmlData+= item.name + "\n";
        });
        return htmlData;
      },
      /**
       * 添加选项/编辑选项
       * @param {object} itemStorageData - json对象
       * @param {number} id - 对象下标
       * @param {object} ev - 元素对象
       */
      _editTextarea: function(itemStorageData, id, ev){
        var self = this;
        if(ev.keyCode != 13){
          var options = $(ev.target).val().split('\n');

          //先清空数据再添加
          itemStorageData.option = [];
          $.each(options, function(index, item){
            if(item){
              if(index === 0){ //选中第一个选项
                itemStorageData.option.push({value:'key'+index, name:item, isChecked: true});
              }else{
                itemStorageData.option.push({value:'key'+index, name:item,isChecked: false});
              }
            }
          });
        }
        //计算组件编辑框的摆放位置
        self._countToolTipPortalPostion(id, itemStorageData);
      },
      /**
       * 添加选项
       * @param {object} itemStorageData - json对象
       * @param {number} id - 对象下标
       * @param {object} ev - 元素对象
       */
      _addOption(itemStorageData, id, ev){
        itemStorageData.option.push({value:'key', name:'选项名称', isChecked: false});
      },
      /**
       * 删除指定选项
       * @param {object} itemStorageData - json对象
       * @param {number} index - 需要删除的选项下标
       * @param {object} ev - 元素对象
       */
      _delOption(itemStorageData, index, ev){
        itemStorageData.option.splice(index, 1);
      },
      /**
       * 选项展示方向
       * @param {object} itemStorageData - json对象
       * @param {boolean} true 表示纵向 ，false表示横向
       * @param {number} id - 对象下标
       * @param {object} ev - 元素对象
       */
      _directionFun: function(itemStorageData, bool, id, ev) {
        itemStorageData.direction = bool;

        //计算组件编辑框的摆放位置
        this._countToolTipPortalPostion(id,itemStorageData);
      },
      /**
       * 点击下拉标头显示下拉选项
       * @param {object} itemData - json对象
       * @param {object} ev - 元素对象
       */
      _clickShowSelectDrapdown: function(itemData, ev){
        itemData.optionIsShow = !itemData.optionIsShow;
      },
      /**
       * 筛选日期格式
       * @param {object} itemStorageData - json对象
       * @param {object} itemData - json对象
       * @param {object} ev - 元素对象
       */
      _dateFormatScreen: function(itemStorageData, itemData, ev){
        $.each(itemStorageData.dateType, function(index, item){
          if(itemData === item) {
            item.isChecked = true;
            itemStorageData.prompt = itemData.value;
            itemStorageData.dateCheckedFormat = itemData.format;
            itemStorageData.dateCheckedFormatFiled = itemData.formatShowField;

            //当组件是请假类型时
            if(itemStorageData.type == 'leave'){
              if(itemData.format == 'yyyy-MM-dd hh:mm:ss'){
                itemStorageData.title['2'] = '时长(小时)';
              }else if(itemData.format == 'yyyy-MM-dd'){
                itemStorageData.title['2'] = '时长(天)';
              }
            }

          }else{
            item.isChecked = false;
          }
        });
      },
      /**
       * 点击下拉选中对应的向
       * @param {object} itemStorageData - json对象
       * @param {object} itemData - json对象
       * @param {object} ev - 元素对象
       */
      _clickSelected: function(itemStorageData, itemData, ev){
        $.each(itemStorageData.option, function(index, item){
          if(itemData === item) {
            item.isChecked = true;
          }else{
            item.isChecked = false;
          }
        });
        itemStorageData.optionIsShow = !itemStorageData.optionIsShow;
      },
      /**
       * 命名正则验证
       * @param {number} index 键名下标
       * @param {number} transStorIndex  当前被编辑的组件下标
       * @param {object} ev 文本对象
       */
      _humpNaming: function(index, transStorIndex, ev){
        var self = this ,
          backKey = self.transferStorage.data.backstageKey ,  //组建中存在的键数组
          reg = /^[0-9a-zA-Z_]{1,}$/ ,
          val = $(ev.target).val();

        reg.test(val) ? backKey[index].keyName = val : backKey[index].keyName = "";
        $(ev.target).val(backKey[index].keyName); 
        self._validationKeyEqual(self.backStorageKeyArray, index, transStorIndex);
        // self.transferStorage.data.isProcess = !self.transferStorage.data.isProcess;
      },
      /**
       * 验证键名是否重复,不是重复的键可以添加
       * @param {Object} datas 需要循环编辑的数据
       * @param {number} appointIndex 被指定需要需要判断是否相同键的下标
       * @param {number} transStorIndex 当前被编辑的组件下标
       */
      _validationKeyEqual: function (datas, appointIndex, transStorIndex) { 
        var self = this;
        var keyIsExist = true , //为true表示不是重复的键可以添加
          backKey = self.transferStorage.data.backstageKey ;  //组建中存在的键数组
        $.each(datas,function(_index, item){ 
          //第一步：
          //键名不为空的情况下
          if(backKey[appointIndex].keyName){
            //第二步：
            //键名相同，组件下标不相同。同时满足这两个条件，表明键名已经存在不能重复添加
            if(backKey[appointIndex].keyName == item.keyName 
              // && appointIndex != _index 
              && transStorIndex != item.transStorIndex){
              self.$set(self.transferStorage.data,'isKeyPrompt','键名已存在，请重新填写！');
              keyIsExist = false;

              //键名不相同，组件下标相同。同时满足这两个条件，修改键名
            }else if(backKey[appointIndex].keyName != item.keyName 
                    // && appointIndex == _index 
                    && transStorIndex == item.transStorIndex){

               item.keyName = backKey[appointIndex].keyName;

              self.$set(self.transferStorage.data,'isKeyPrompt','');

              keyIsExist = false;
              
              //键名相同，组件下标相同。同时满足这两个条件，不做修改
            }else if(backKey[appointIndex].keyName == item.keyName 
                    // && appointIndex == _index 
                    && transStorIndex == item.transStorIndex){

              keyIsExist = false;
            }
          }
        });

        if(keyIsExist){ 
          self.backStorageKeyArray.push({
            'keyName': backKey[appointIndex].keyName,
            'transStorIndex': transStorIndex,
            'id':      appointIndex
          });
          self.$set(self.transferStorage.data,'isKeyPrompt','');
        }
        self.backStorageKeyArray = datas;

        return keyIsExist;
      },
      /**
       * 勾选多选框指定必须填写键名
       * @param {object} itemStorageData json对象
       * @param {object} ev 文本对象
       */
      _humpNamingRequired: function(itemStorageData, ev){
        itemStorageData.isProcess = !itemStorageData.isProcess;
      },
      /**
       * 根据流程不同的流程Id做出不同的操作
       * @param  {Numbger/String} processTypeId 流程Id
       */
      _switchProcessType: function(processTypeId) {
        var self = this, isBool = false;
        //为2表示选中的是请假流程
        if(processTypeId == '2') {
          self._sinleAdd("leave");
        }

      },
      /**
       * 添加表格列
       * @param {Object} itemStorageData json对象
       */
      addTableCol: function(itemStorageData) {
        itemStorageData.cols.push({keyName: '', name: '', dataType: 'text'},);
      },
      /**
       * 删除指定的列，并给所有列的键重命名
       * @param {Object} colItem   表单列
       * @param {Number} colIndex  表单对应的列下表
       * @param {Object} itemStorageData json对象
       */
      delCol: function(colItem, colIndex, itemStorageData) {
        itemStorageData.cols.splice(colIndex,1);
        $.each(itemStorageData.cols, function(index, item) {
          item.key = 'col' + (index+1);
        });
      },
      /**
       *添加表格操作按钮
       *@params {object} itemStorageData json对象
       */
      addOperaBtn: function(itemStorageData) {

        if(!itemStorageData.isColAddOpera){
          itemStorageData.cols.push({key: 'operaBtn', name: '操作', dataType: 'operaBtn'});
        }

        //设置添加操作按钮的权限
        itemStorageData.isColAddOpera = true;

        itemStorageData.colOperaBtn.push({btnName: null, requestUrl: null});

        //计算组件编辑框的摆放位置
        this._countToolTipPortalPostion(itemStorageData.formId,itemStorageData);
      },
      /**
       *删除操作按钮
       * @param {Object} colOpearItem   操作按钮
       * @param {Number}  colOperaIndex  操作按钮对应下标
       * @param {Object} itemStorageData json对象
       */
      delColOperaBtn: function(colOpearItem, colOperaIndex, itemStorageData) {
        itemStorageData.colOperaBtn.splice(colOperaIndex, 1);

        //当没有一个操作按钮的情况下将操作列去掉
        if(!itemStorageData.colOperaBtn.length){
          var lastIndex = itemStorageData.cols.length - 1;
          //列表类型为操作按钮类型时，就删除最后一列
          if(itemStorageData.cols[lastIndex].dataType == 'operaBtn'){
            itemStorageData.cols.splice(lastIndex, 1);
            //设置添加操作按钮的权限
            itemStorageData.isColAddOpera = false;
          }
        }
        //计算组件编辑框的摆放位置
        this._countToolTipPortalPostion(itemStorageData.formId, itemStorageData);
      },
      /**
       * 添加关联组件
       * @param {Object} itemStorageData json对象
       */
      addRelationComponent: function(itemStorageData) {
        itemStorageData.components.push({key: 'col'+itemStorageData.components.length, title: '请填写标题', dataType: 'inputText'});
        //计算组件编辑框的摆放位置
        this._countToolTipPortalPostion(itemStorageData.formId, itemStorageData);
      },
      /**
       * 删除指定的组件，并给所有组件的键重命名
       * @param {Object} compontentItem   表单组件
       * @param {Number} compontentIndex  表单对应的组件下表
       * @param {Object} itemStorageData json对象
       */
      delComponent: function(compontentItem, compontentIndex, itemStorageData) {
        itemStorageData.components.splice(compontentIndex,1);
        $.each(itemStorageData.components, function(index, item) {
          item.key = 'component' + (index+1);
        });
        //计算组件编辑框的摆放位置
        this._countToolTipPortalPostion(itemStorageData.formId, itemStorageData);
      },
      /*
       * 根据选中的按钮地址，获取按钮更多的数据 
       * @params {string} activeRequestUrl 被选中的数据请求地址
       * @params {object} dataName 需要遍历的数据
       */
      reuqestUrlFun(activeReuqestUrl, dataName){
        $.each(this[dataName], (index, item) => {
          item.requestUrl == activeReuqestUrl ? this.transferStorage.data.buttonMess = item : '';
        });
      },
    },
  }
  //格式化日期格式
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
</script>
