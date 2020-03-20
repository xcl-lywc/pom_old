/*********************首页***********************/
  Author: Mingzhang.Zhao
  Date:   2018-05-01
/************************************************/
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- 分类列表样式框 -->
        <div class="type-list-wrap">
          <ul class="type-list" v-loading="navLoading">
            <draggable v-if="asideNavArray.length" v-model="asideNavArray" :options="{animation: 100}" @end="saveNavDataToServer">
              <li v-for="(item, index) in asideNavArray" :key="'nav' + index" class="list-item" @click.stop.right="rightClick($event, item, index)">{{ item.atName }}</li>
            </draggable>
            <el-button v-else class="fill-width" type="primary" size="mini" @click="newAsideType">添加+</el-button>
          </ul>

          <!-- 左侧分类列表的右键菜单 -->
          <div id="aside-right-menu" v-show="rightMenuShow" :style="{ 'left': rightMenuX, 'top': rightMenuY}">
            <ul>
              <li class="" @click="newAsideType">新增</li>
              <li class="" @click="editAsideType">编辑</li>
              <li class="" type="danger" @click="deleteAsideType">删除</li>
            </ul>
          </div>
        </div>
        <!-- <div class="qr-code-wrap">
          <img src="https://sp0.baidu.com/5aU_bSa9KgQFm2e88IuM_a/micxp1.duapp.com/qr.php?value=%E5%88%AB%E6%89%AB%E4%BA%86%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A" alt="">
          <p class="qr-code-text">APP下载</p>
        </div>
        <div class="qr-code-wrap">
          <img src="https://sp0.baidu.com/5aU_bSa9KgQFm2e88IuM_a/micxp1.duapp.com/qr.php?value=%E5%88%AB%E6%89%AB%E4%BA%86%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A" alt="">
          <p class="qr-code-text">党建公众号</p>
        </div> -->
      </el-aside>
      <el-main v-loading="loading">
        <!-- 首页模块内容 -->
        <el-row :gutter="20" v-if="contentData && contentData.length > 0">
        <!-- 轮播块, col=16 -->
          <el-col v-if="item.type == 'swiper'" v-for='(item, index) in contentData' :span="16" class="block-wrap swiper-wrap"  :key="index">
            <div class="grid-content" >
              <div class="fix-padding" :xxx="index">
                <el-carousel height="363px">
                  <div class="btn-group swiper-btn-group">
                    <el-button size="mini" @click="addContentButtonClicked('swiper', index)">添加轮播</el-button>
                    <el-button size="mini" @click="addContentButtonClicked('news', index)">添加分类</el-button>
                    <el-button size="mini" type="primary" @click="editContentButtonClicked(item, index)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteContentButtonClicked(index)">删除</el-button>
                  </div>
                  <el-carousel-item v-for="(swiperItem, swiperIndex) in item.swiperData" :key="swiperIndex" >
                    <p class="swiper-title">{{ swiperItem.title || "暂无标题"}}</p>
                    <img :src="swiperItem.imgUrl" :alt="swiperIndex" style="width:100%" @click="pictureDialogVisible = true">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </el-col>
        <!-- 新闻块, col=8 -->
          <el-col v-else :span="8" class="block-wrap news-wrap" :key="index">
            <div class="grid-content">
              <div class="main-block-wrap">
                <span class="main-block-title">{{ item.atName }}</span>
                <div class="btn-group">
                  <el-button size="mini" @click="addArticle(item)">写文章</el-button>
                  <el-button size="mini" @click="addContentButtonClicked('swiper', index)">添加轮播</el-button>
                  <el-button size="mini" @click="addContentButtonClicked('news', index)">添加分类</el-button>
                  <el-button size="mini" type="primary" @click="editContentButtonClicked(item, index)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="deleteContentButtonClicked(index)">删除</el-button>
                </div>
                <news-list v-if="item.atId" :atId="item.atId"></news-list>
              </div>
            </div>
          </el-col>
        </el-row>
        <div v-else>
          <p><i class="el-icon-warning warning-icon"></i>当前主页没有内容, 请添加</p>
          <el-button size="mini" type="primary" @click="addContentButtonClicked('swiper', 0)">添加轮播</el-button>
          <el-button size="mini" type="primary" @click="addContentButtonClicked('news', 0)">添加分类</el-button>
        </div>
      </el-main>
    </el-container>
    
    <!-- (左侧边类型)新增, 编辑 -->
    <el-dialog
      :title="asideOperateType == 'new' ? '新增' : '编辑'"
      id="aside-dialog"
      :visible.sync="asideDialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <el-form label-width="100px" class="fill-width" size="small">
        <el-form-item :label="asideOperateType == 'new' ? '添加：' : '修改为：'" required>
          <el-select class="fill-width" v-model="asideTypeOptionValue" @change="changeAsideOptionValue($event)">
            <el-option
              v-for="item in asideTypeOption"
              :key="item.atId"
              :label="item.atName"
              :value="item.atId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="asideTypeOptionValue == null" @click="submitAsideType">确 定</el-button>
      </span>
    </el-dialog>

    <!-- (轮播图)新增, 编辑 -->
    <el-dialog
      :title="contentOperateType == 'new' ? '新增轮播' : '编辑轮播'"
      id="swiper-dialog"
      :visible.sync="swiperDialogVisible"
      width="40%"
      :close-on-click-modal="false">
      <el-form label-width="80px" class="fill-width" size="small">
        <el-button type='primary' size="mini" class="fill-width add-swiper-item" @click="addSwiperItem">添加一项</el-button>
        <div v-for="(item, index) in tempSwiperData.swiperData">
          <el-form-item :label="'文章:'">
            <el-input placeholder="请输入文章地址" v-model="item.link"></el-input>
          </el-form-item>
          <el-form-item :label="'标题:'">
            <el-input placeholder="请输入文章标题" v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item :label="'图片:'" required>
            <el-upload
              class="avatar-uploader"
              :action="imgServer"
              :headers="token"
              :show-file-list="false"
              :on-success="uploadSuccess"
              name="upfile">
              <img v-if="item.imgUrl" :src="item.imgUrl" class="avatar" @click="clickIndex(index)">
              <i v-else class="el-icon-plus avatar-uploader-icon" @click="clickIndexNew(index)"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="default" :disabled="index == 0" size="mini" @click="changeIndex(index, 'forward')">上移一项</el-button>
            <el-button type="default" :disabled="index == (tempSwiperData.swiperData.length - 1)" size="mini" @click="changeIndex(index, 'backword')">下移一项</el-button>
            <el-button type="danger" size="mini" @click="deleteSwiperItem(item, index)">删除</el-button>
          </el-form-item>
          <div class="divide-line"></div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="tempSwiperData.swiperData.length <= 0 || !swiperHasImg" @click="saveSwiper">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- (新闻)新增, 编辑 -->
    <el-dialog
      :title="contentOperateType == 'new' ? '新增' : '编辑'"
      id="news-dialog"
      :visible.sync="newsDialogVisible"
      width="30%"
      :close-on-click-modal="false">
      <small class="tips-text">先选择(分类/专题), 再选择下方筛选条件</small>
      <el-form label-width="100px" class="fill-width" v-loading="newsLoading" size="small">
        <el-form-item :label="'分类/专题：'" required>
          <el-select class="fill-width" v-model="tempNewsData.atType" @change="clickChange = true">
            <el-option
              v-for="item in keyTpyeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'筛选条件：'" required>
          <el-select class="fill-width" v-model="tempNewsData.atId" @change="changeFilterOptionValue($event)">
            <el-option
              v-for="item in filterOptions"
              :key="item.atId"
              :label="item.atName"
              :value="item.atId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="tempNewsData.atId == null" @click="saveNews">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>



<script>
  import draggable from 'vuedraggable'
  import Sortable  from 'sortablejs'

  import newsList from "../common/NewsList.vue";

  export default {
    data() {
      return {
        imgServer: `${basePath}/sys/ueditor/file?action=uploadimage`,
        token:     { "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("userData")).token}`},
        imageUrl:  '',

        orgCode: sessionStorage.getItem("orgCode"),
        //------------- 左侧分类 -------------//
        asideNavArray:        [],     //左侧分类列表
        asideTypeOption:      [],     //左侧 分类 > 新增/编辑 > select的option
        asideTypeOptionValue: null,
        asideTypeTempChoosed: null,   //左侧 分类 > 新增 > select的option value完整对象

        asideChoosed: {               //当前选中的左侧分类项
          atId:  null,
          index: null
        },
        asideOperateType:   null,  //右键菜单操作类型 "new" 新增 "edit" 编辑
        asideDialogVisible: false, //左侧dialog显示

        rightMenuShow: false,
        rightMenuX: 0,
        rightMenuY: 0,

        //------------- 右侧主体 -------------//
        tempSwiperData: { //点击新增 编辑 后, 暂时的轮播数据
          type: 'swiper',
          swiperData: [   //轮播数据(包含图片和文章地址,用于保存和编辑)
          ],
          title:    null,
          interval: 3000, //轮播时间间隔
        },
        tempNewsData: {     //点击新增 编辑 后, 暂时的新闻数据
          type:   'news',   
          atName: null,     //名称
          atId:   null,     //类型/专题对应的Id
          atType: "1",      //类型种类
        },
        swiperHasImg: false,
        //页面主体 数据
        contentData:        [],
        contentOperateType: null,  //右侧主体操作类型 new 新增 edit 编辑
        tempContentIndex:   null,  //右侧主体的操作位置 用于添加
        tempSwiperIndex:    null,  //右侧主体的操作位置 > 操作的swiper的位置

        // 分类 或 主题的选项
        keyTpyeOptions: [
          {
            value: "1",
            label: '分类'
          }, {
            value: "2",
            label: '专题'
          }
        ],

        // 分类名 (筛选条件)
        filterOptions: [],
        filterTypeTempChoosed: null, //当前过滤所选中的对象

        editDialogVisible:    false, //主体 - 编辑dialog
        pictureDialogVisible: false, //主体 - 轮播dialog
        swiperDialogVisible:  false,
        newsDialogVisible:    false,

        loading: false,
        navLoading:  false,
        newsLoading: false,
        clickChange: false,  //当点击了上层select, 此时需要刷新并重置下层, 将此值变为true
      }
    },
    components: {
      "news-list": newsList,
      draggable,
      Sortable
    },
    watch: {
      //监听左侧列表的diaolog, 关闭后取消选中
      asideDialogVisible (newV, oldV) {
        if(newV == false) {
          this.asideChoosed.atId = null;
          this.asideChoosed.index = null;
        }
      },
      tempSwiperData : {
        // 监听tempSwiperData, 如有某一条图片为空, 则无法提交
        handler: function (newV, oldV) {
          let self = this
          self.swiperHasImg = true
          self.tempSwiperData.swiperData.forEach((item, index) => {
            if (!item.imgUrl) { //为空
              self.swiperHasImg = false
            }
          })
        },
        deep: true
      },
      "tempNewsData.atType": {
        handler: function (newV, oldV) {
          this.getFilterOptions(newV)
          if(this.clickChange) {
            this.tempNewsData.atId = null
          }
          this.clickChange = false //结束点击切换, 此值变为false
        },
        deep: true
      }
    },
    created () {
      
    },
    mounted () {
      var self = this;
      document.addEventListener("click", function(){
        self.rightMenuShow = false;
      });
      //获取左侧列表 与 分类
      this.getAsideTypeList()
      this.getAsideTypeOption()
      this.getContentData()
    },
    methods: {
      /**
       * 获取主页数据
       * @return {[type]} [description]
       */
      getContentData () {
        this.loading = true

        var self = this
        self.$request.requestAxios('get', `${basePath}/home/data/from_org/${self.orgCode}`, null, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.contentData  = response.data.data;
            } else {
              self.$message.error(response.data.meta.message)
            }
            self.loading = false
          },
          (error) => {
            self.loading = false
            self.$message.error("失败")
          }
        )
      },
      /**
       * 用户不点击确定, 点击了取消或者关闭了dialog, 则重新查询数据
       * @return {[type]} [description]
       */
      refreshData () {
        this.getContentData()
        this.newsDialogVisible = false;
        this.swiperDialogVisible = false;
      },
      /**
       * 右键菜单,禁用默认菜单,并显示自定义菜单
       * @param  {object} event 
       * @return none
       */
      rightClick (event, item, index) {
        event.preventDefault();

        this.rightMenuShow = true;
        this.rightMenuX    = event.clientX + 10 + 'px';
        this.rightMenuY    = event.clientY + 5 + 'px';
        this.asideChoosed.atId     = item.atId
        this.asideChoosed.index    = index
      },
      /**
       * 新增左侧类型导航, 控制dialog部分显示
       * @return {[type]} [description]
       */
      newAsideType () {
        this.asideTypeOptionValue = null; //还原select选中
        this.rightMenuShow        = false;
        this.asideOperateType     = "new";
        this.asideDialogVisible   = true;
      },
      /**
       * 编辑左侧类型导航, 控制dialog部分显示
       * @return {[type]} [description]
       */
      editAsideType () {
        this.rightMenuShow        = false;
        this.asideOperateType     = "edit";
        this.asideDialogVisible   = true;
        this.asideTypeOptionValue = this.asideChoosed.atId //将当前选中的aside的id赋值到select中
      },
      /**
       * 点击类型列表,选中某一项, 记录此条完整对象,用于push进navArray
       * @param  {Number} value 当前选中的值atId
       * @return none
       */
      changeAsideOptionValue (value) {
        let obj = {};
        obj = this.asideTypeOption.find((item)=> {
          return item.atId === value;
        });
        this.asideTypeTempChoosed = obj
      },
      /**
       * 提交左侧类型列表( 新增 / 编辑)
       * @return none
       */
      submitAsideType () {
        this.asideDialogVisible = false;
        if(this.asideOperateType == "new") { //新增分类, 末尾push
          this.asideNavArray.push(this.asideTypeTempChoosed)
          this.saveNavDataToServer()
        } else { //编辑分类, 删除本位置的item并重新插入新的item
          if(!this.asideTypeTempChoosed) {
            this.$message.success("成功")
          } else {
            this.asideNavArray.splice(this.asideChoosed.index, 1, this.asideTypeTempChoosed)
            this.saveNavDataToServer()
          }
        }
      },
      /**
       * 将修改的导航数组保存
       * @return {[type]} [description]
       */
      saveNavDataToServer () {
        let self = this;

        self.$request.requestAxios('post', `${basePath}/home/nav/from_org/${self.orgCode}`, self.asideNavArray, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.$message.success("成功")
              this.getAsideTypeList()
            } else {
              self.$message.error(response.data.meta.message)
            }
          },
          (error) => {
            self.loading = false
            this.getAsideTypeList()
            self.$message.error("失败")
          }
        )
      },
      /**
       * 删除左侧类型导航, 不需要传参, 当前操作的全局asideChoosed
       * @return none
       */
      deleteAsideType () {
        let self = this
        self.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.asideNavArray.splice(self.asideChoosed.index, 1)
          self.saveNavDataToServer()
          self.$message({
            type: 'success',
            message: '删除成功!'
          });
          self.getAsideTypeList()
        }).catch(() => {
          self.asideChoosed.atId  = null;
          self.asideChoosed.index = null;
        });
      },
      /**
       * 在本类型下点击 写文章, 
       */
      addArticle (item) {
        sessionStorage.setItem("tempType", JSON.stringify(item))
        this.$router.push({name: "Settings_Upload_Article"})
      },
      /**
       * 点击添加 主区域 内容
       * @param {String} typeName 类型名称 news 新闻 swiper 轮播
       * @param {Number} index    当前点击的顺序index
       * @return none
       */
      addContentButtonClicked (typeName, index) {
        this.contentOperateType = "new"
        if(typeName == 'swiper') {
          this.swiperDialogVisible = true
          //创建一个空的数据, 用于新增
          this.tempSwiperData = {
            type: 'swiper',
            swiperData: [],
            title:    null,
            interval: 3000
          }
        } else {
          this.newsDialogVisible = true
          //创建一个空的新闻对象, 使用前需要提前清空数据
          this.tempNewsData = {
            type:    'news',
            atType:  "1",
            atId:    null,
            atName:  null,
          }
          this.getFilterOptions("1") // 新增时查询一次atType为1的 filterOptions
        }
        this.tempContentIndex = index;
      },

      /**
       * 编辑 主区域 内容
       * @param {String} typeName 类型名称 news 新闻 swiper 轮播
       * @param {Number} index    当前点击的顺序index
       * @return none
       */
      editContentButtonClicked (item, index) {
        this.contentOperateType = "edit"
        //深拷贝, 避免影响原有数据
        if(item.type == 'swiper') {
          this.tempSwiperData      = JSON.parse(JSON.stringify(item));
          this.swiperDialogVisible = true
        } else {
          this.tempNewsData        = JSON.parse(JSON.stringify(item));
          this.newsDialogVisible   = true
        }
        //记录操作的index
        this.tempContentIndex = index
      },
      /**
       * 删除 主区域 内容
       * @param  {Number} index 删除内容索引值
       * @return none
       */
      deleteContentButtonClicked (index) {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.contentData.splice(index, 1)
          this.saveContentDataToServer()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      /**
       * 过滤select change事件
       * @param  {[type]} value [description]
       * @return {[type]}       [description]
       */
      changeFilterOptionValue (value) {
        let obj = {};
        obj = this.filterOptions.find((item)=> {
          return item.atId === value;
        });
        this.filterTypeTempChoosed = obj
      },
      /**
       * 点击确定保存新闻( 新增 / 编辑 ) 
       * @return {[type]} [description]
       */
      saveNews () {
        //判断是否重复
        let repeatedFlag = false // 是否重复的标识
        this.contentData.forEach((item, index) => {
          if(item.type == "news") {
            if(this.tempNewsData.atId == item.atId){
              repeatedFlag = true
            }
          }
        })
        //操作完contentData完成之后且没有重复内容, 将本次修改后的数据提交
        if(repeatedFlag) {
          this.$message.error("失败, 存在重复的分类/专题!")
        } else {
          if(this.contentOperateType == "new") {
            //无删除时index + 1
            this.contentData.splice(this.tempContentIndex + 1, 0,
              {
                type:    'news',
                atType:  this.tempNewsData.atType,
                atId:    this.tempNewsData.atId,
                atName:  this.filterTypeTempChoosed.atName,
              })
          } else {
            this.contentData.splice(this.tempContentIndex, 1,
              {
                type:    'news',
                atType:  this.tempNewsData.atType,
                atId:    this.filterTypeTempChoosed.atId,
                atName:  this.filterTypeTempChoosed.atName,
              })
          }
          this.saveContentDataToServer()
          this.newsDialogVisible = false
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * 获取分类列表
       * @param  {String} typeStr 分类1 主题2
       * @return none
       */
      getAsideTypeList (typeStr) {
        var self = this
        self.navLoading = true

        self.$request.requestAxios('get', `${basePath}/home/nav/from_org/${self.orgCode}`, null, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.asideNavArray = response.data.data;
            } else {
              self.$message.error(response.data.meta.message)
            }
            self.navLoading = false
          },
          (error) => {
            self.loading = false
            self.$message.error("失败")
          }
        )
      },
      /**
       * 获取顶层分类(aside的select中使用)
       * @return {[type]} [description]
       */
      getAsideTypeOption () {
        var self = this

        self.$request.requestAxios('get', `${basePath}/a_types/toparticletypes/from_org/${self.orgCode}`, null, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.asideTypeOption = response.data.data;
            } else {
              self.$message.error(response.data.meta.message)
            }
          },
          (error) => {
            self.loading = false
            self.$message.error("失败")
          }
        )
      },
      /**
       * 获取筛选条件的分类(content的select中使用)
       * @param  {String} typeValue 分类的type 1分类 2专题 默认分类
       * @return {[type]}           [description]
       */
      getFilterOptions (typeValue) {
        var self = this
        self.newsLoading = true
        // 还原选中
        self.$request.requestAxios('get', `${basePath}/a_types/articletypes/from_org/${self.orgCode}`, {params: {type: typeValue}}, 
          (response) => {
            if(response.data.meta.code == 0) {
              self.filterOptions = response.data.data;
            } else {
              self.$message.error(response.data.meta.message)
            }
            self.newsLoading = false
          },
          (error) => {
            self.loading = false
            self.$message.error("失败")
          }
        )
      },
      /**
       * 将修改的主体数组保存
       * @return {[type]} [description]
       */
      saveContentDataToServer () {
        let self = this;
        self.$request.requestAxios('post', `${basePath}/home/data/from_org/${self.orgCode}`, 
          {
            homeData: JSON.stringify(self.contentData)
          }, 
          (response) => {
            self.$message.success("成功")
            self.refreshData()
          },
          (error) => {
            self.loading = false
            self.refreshData()
            self.$message.error("失败")
          }
        )
      },
      /**
       * 添加轮播 > 点击添加一项
       */
      addSwiperItem () {
        this.tempSwiperData.swiperData.unshift({
          link:   null,
          imgUrl: null,
          title:  null
        })
      },
      /**
       * 删除本条轮播小项目
       * @return {[type]} [description]
       */
      deleteSwiperItem (item, index) {
        this.tempSwiperData.swiperData.splice(index, 1)
      },
      /**
       * 点击新增/编辑 轮播 点击对应的上传, 记录index
       * @param  {[type]} index [description]
       * @return {[type]}       [description]
       */
      clickIndex (index) {
        this.tempSwiperIndex = index
      },
      clickIndexNew (index) {
        this.tempSwiperIndex = index
      },
      /**
       * 点击上移 或 下移(需要重新触发tempSwiperData的watch, 驱使页面刷新)
       * @param  {object} item     当前点击的对象
       * @param  {string} moveType 上移forward 或是 下移backword
       * @return {[type]}          [description]
       */
      changeIndex (index, moveType) {
        if(moveType == "forward") { //点击上移
          let temp = this.tempSwiperData.swiperData[index - 1]
          this.tempSwiperData.swiperData[index - 1] = this.tempSwiperData.swiperData[index]
          this.tempSwiperData.swiperData[index] = temp
        } else { //点击下移
          let temp = this.tempSwiperData.swiperData[index + 1]
          this.tempSwiperData.swiperData[index + 1] = this.tempSwiperData.swiperData[index]
          this.tempSwiperData.swiperData[index] = temp
        }
        let swiper = JSON.parse(JSON.stringify(this.tempSwiperData))
        this.tempSwiperData = swiper
      },
      /**
       * 上传成功, 写入img对应的path
       * @param  {[type]} response [description]
       * @param  {[type]} file     [description]
       * @param  {[type]} fileList [description]
       * @return {[type]}          [description]
       */
      uploadSuccess (response, file, fileList) {
        //上传完成后把信息写入对应tempSwiperData.swiperData的path
        this.tempSwiperData.swiperData[this.tempSwiperIndex].imgUrl = response.data.path
      },
      /**
       * 点击确定, 保存数据
       * @return {[type]} [description]
       */
      saveSwiper () {
        if(this.contentOperateType == "new") {
          //无删除时index + 1
          this.contentData.splice(this.tempContentIndex + 1, 0,this.tempSwiperData)
        } else if(this.contentOperateType == "edit") {
          this.contentData.splice(this.tempContentIndex, 1, this.tempSwiperData)
        }
        this.saveContentDataToServer()
        this.swiperDialogVisible = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  /*侧边栏*/
  .el-aside {
    padding: 10px;
  }
  /*侧边栏 >> 类型列表*/
  .type-list-wrap {
    background: #fff;
    border: 1px solid #eee; 
  }
  .type-list-wrap .type-list{
    list-style: none;
    padding: 0;
    margin: 10px;
  }
  .type-list-wrap .type-list .list-item {
    padding: 8px 16px;
  }
  .type-list-wrap .type-list .list-item:hover {
    background: #e4e4e4;
    cursor: pointer;
  }
  .type-list-wrap .type-list .list-item.active {
    color: #dc3a3a;
    border-left: 3px solid #dc3a3a;
  }
  .qr-code-wrap {
    margin: 20px 0;
  }
  .qr-code-wrap img {
    width: 100%;
    border: 1px solid #d8d8d8;
  }
  .qr-code-wrap p {
    margin: 0;
    text-align: center;
  }
  /*侧边栏 >> 右键菜单*/
  #aside-right-menu {
    position: absolute;
    z-index: 99;
  }
  #aside-right-menu ul{
    margin: 0;
    padding: 5px;
    list-style: none;
    font-size: 14px;
    background: #fff;
    outline: 1px solid #ececec;
  }
  #aside-right-menu ul li {
    padding: 5px 10px;
    cursor: pointer;  
  }
  #aside-right-menu ul li:hover {
    background: #e4e4e4;
  }
  /*主体 >> 模块*/
  .el-main {
    max-height: calc(100vh - 115px);
    padding: 10px;
    overflow-y: auto;
  }
  .block-wrap {
    padding: 10px;
  }
  .block-wrap.swiper-wrap {
    padding: 0; 
    height: 373px; /*统一两种类型的高度*/
  }
  .block-wrap.news-wrap {
    padding-top: 32px;
    height: 373px; /*统一两种类型的高度*/
  }
  .grid-content {
    position: relative;
  }
  .main-block-wrap {
    height: 328px;
    border: 1px solid #d8d8d8;
    border-top: 2px solid #dc3a3a;
    background: #fff;
  }
  .main-block-wrap .btn-group {
    display: block;
    height: 28px;
    padding: 5px;
    font-size: 14px;
    text-align: right;
  }
  .btn-group button {
    margin: 0;
    padding: 7px;
  }
  .block-wrap .swiper-title {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 30px 20px;
    margin: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    line-height: 40px;
    z-index: 99;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  .block-wrap .btn-group.swiper-btn-group {
    position: relative;
    z-index: 99;
    text-align: right;
    padding: 5px;
  }
  .main-block-wrap .main-block-title{
    position: absolute;
    top: -31px;
    left: 0;
    padding: 5px 10px;
    background: #dc3a3a;
    color: #fff;
  }
  .el-carousel__item {
    background-color: #99a9bf;
  }
  .add-swiper-item {
    margin-bottom: 10px;
  }
  .divide-line {
    border-top: 1px solid #c7c7c7;
    border-bottom: 1px solid #c7c7c7;
    height: 0px;
    padding-top: 2px;
    margin: 20px 0; 
  }
  .tips-text {
    display: block;
    font-size: 14px;
    color: #909090;
    margin-bottom: 10px;
  }
</style>

<!-- 强制样式 -->
<style> 
  /* 主体 > 新增/编辑 轮播 */
  .avatar-uploader .el-upload {
    width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 250px;
    display: block;
  }
</style>