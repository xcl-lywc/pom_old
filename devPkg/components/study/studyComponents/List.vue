<template>
  <div>
    <div>
    {{ special }}
      <el-card v-for="(item, index) in listData" class="card-item" :key="`item${index}`" @click.native="showDetail">
        <p class="title-wrap"><span>标题xxxxxxxxxxxxx</span><span class="right-date-time">时间</span></p>
        <p class="deadline">截止时间</p>
        <div class="bottom-wrap">
          <div class="complete-people"><img class="marr5" src="../../../images/org_user_icon.png">已完成</div>
          <div class="comment-count"><img class="marr5" src="../../../images/ifor_icon.png">0</div>
        </div>
      </el-card>

      <el-dialog
        title="学习"
        :visible.sync="studyDialogVisible"
        width="50vw">
        <el-form ref="studtForm" label-width="80px" size="small">
          <el-form-item label="标题">
            <el-input type="text"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="要求">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              style="width: 100%"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="专题">
            <el-select class="fill-width">
              <el-option label="专题" value="啊啊"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          studyDialogVisible: false,
        }
      },
      props: {
        listData: { //列表数据
          type: Array,
          required: true
        },
        special: { //类型分类
          required: true
        }
      },
      components: {

      },
      watch: {
        listData: {
          handler(newV, oldV) {

          },
          deep: true
        },
        special: {
          handler(newV, oldV) {
            console.log(`type变为${newV}`)
          },
          deep: true
        }
      },
      mounted: function () {
        // window.list = this.$route
        console.log(this.listData)
      },
      methods: {
        showDetail () {
          this.studyDialogVisible = true
        },
      }
    }
</script>

<style scoped>
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
</style>