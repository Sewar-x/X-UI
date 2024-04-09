<template>
  <div class="timer-change-container">
    <div v-if="!isEdit" class="timer-change">
      <span class="timer time-text">{{ time }}</span>
      <el-tooltip effect="dark" content="编辑" placement="top">
        <i class="el-icon-edit icon edit-icon" @click="isEdit = !isEdit" />
      </el-tooltip>
    </div>
    <div v-else>
      <date-picker-wrap
        class="timer"
        :style="{ width: width }"
        v-bind="$attrs"
        :date="time"
        v-on="$listeners"
        @change="dateChange"
      />
      <el-tooltip effect="dark" content="提交" placement="top">
        <i class="el-icon-check icon picker-icon" @click="submitHandler()" />
      </el-tooltip>
      <el-tooltip effect="dark" content="取消" placement="top">
        <i class="el-icon-close icon picker-icon" @click="cancelChange" />
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import DatePickerWrap from "./index.vue";
export default {
  name: "DateChangerWrap",
  components: {
    DatePickerWrap,
  },
  props: {
    time: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: "130px",
    },
    submit: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      isEdit: false,
      newDate: null,
    };
  },
  methods: {
    dateChange(value) {
      this.newDate = value;
    },
    cancelChange() {
      this.isEdit = !this.isEdit;
      this.newDate = null;
    },
    async submitHandler() {
      if (!this.submit) return;
      if (this.submit(this.newDate)) {
        this.isEdit = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
  font-size: 15px;
  &:hover {
    color: #409eff;
  }
}
.picker-icon {
  font-size: 18px;
  margin: 0 4px;
}
.edit-icon {
  margin-right: 4px;
}
.timer-change {
  display: flex;
  justify-content: space-between;
}
</style>
