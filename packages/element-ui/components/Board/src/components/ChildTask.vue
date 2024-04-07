<template>
  <div>
    <el-card :style="{ width: width }" shadow="never">
      <div class="list-area">
        <div v-for="item in taskList" :key="item.id" class="task-item">
          <el-checkbox
            v-model="item.check"
            @change="checkTask(item)"
            class="checkbox-class"
            :disabled="!showEdit"
          ></el-checkbox>
          <!-- content -->
          <el-popover placement="top-start" width="235" trigger="click">
            <span class="items" slot="reference">
              {{ item.content }}
              <i class="el-icon-edit edit-class" v-if="showEdit" />
            </span>
            <el-input
              type="textarea"
              v-model="item.content"
              @blur="editContent(item.content)"
            />
          </el-popover>
          <!-- date -->
          <el-popover placement="top-start" width="235" trigger="click">
            <span class="items-date" slot="reference">
              <span v-if="item.plan_time">{{ item.plan_time }}</span>
              <i v-else class="el-icon-date date-class" />
            </span>
            <el-date-picker
              v-model="item.plan_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              @blur="editDate(item.plan_time)"
            >
            </el-date-picker>
          </el-popover>
          <!-- delete -->
          <i class="el-icon-delete delete-class" @click="delTask(item)" v-if="showEdit" />
        </div>
      </div>
    </el-card>
    <div class="add-more" @click="addTask(taskList)" v-if="showEdit">
      <i class="el-icon-plus" />{{ addMoreTitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChildTask",
  components: {},
  props: {
    taskList: {
      type: Array,
      // {check:false,content:'',plan_time:'',complete_time:''}
      default: () => [],
    },
    width: {
      type: String,
      default: "400px",
    },
    addMoreTitle: {
      type: String,
      default: "添加子任务",
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    checkTask(item) {
      item.check = !item.check;
    },
    // 添加子任务
    addTask(taskList) {
      this.$emit("addTask", taskList);
    },
    // 删除子任务
    delTask(task) {
      this.$emit("delTask", task);
    },
    editDate(planTime) {
      if (!planTime) {
        this.$message({
          type: "error",
          message: "请填写计划时间！",
        });
      }
    },
    editContent(content) {
      if (!content) {
        this.$message({
          type: "error",
          message: "请填写内容！",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  height: 130px;
  overflow: auto;
}
.list-area {
  display: block;
}
.task-item {
  width: 100%;
  line-height: 30px;
}
.items {
  display: inline-flex;
  width: 200px;
  cursor: pointer;
}
.checkbox-class {
  display: flex;
  float: inline-start;
  margin-right: 10px;
  margin-top: 5px;
}
.items-date {
  width: 200px;
  text-align: right;
  display: inline-block;
  padding-right: 20px;
  cursor: pointer;
}
.delete-class,
.edit-class {
  cursor: pointer;
}
.edit-class {
  line-height: 30px;
  padding-left: 6px;
}
.date-class {
  cursor: pointer;
}
.add-more {
  margin-top: 6px;
  color: #39f;
  cursor: pointer;
  .el-icon-plus {
    margin-right: 6px;
  }
}
</style>
