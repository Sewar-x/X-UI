<template>
  <el-date-picker
    ref="datePickerWrap"
    v-model="newDate"
    :type="type"
    value-format="yyyy-MM-dd"
    :picker-options="instPickerOptions"
    :size="size"
    v-bind="$attrs"
    v-on="$listeners"
    @focus="focusInput"
  />
</template>

<script>
export default {
  name: "DatePickerWrap",
  props: {
    date: {
      type: String,
      default: "",
    },
    calenderData: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "date",
    },
    // 是否展示日期右上部分标签
    showTag: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "mini",
    },
    disabledDate: {
      type: String,
      default: "smaller", // 时间禁止类型:smaller 小于当前时间；greater 大于当前时间
    },
    pickerOptions: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      newDate: "",
      calenderDatas: [],
    };
  },
  computed: {
    instPickerOptions() {
      return Object.assign(
        {
          // 限制时间选择
          disabledDate: (time) => {
            if (this.disabledDate === "smaller" && time.getTime() > Date.now()) {
              // 今天之前的日期可选
              return true;
            }
            if (this.disabledDate === "greater" && time.getTime() < Date.now()) {
              // 今天之后的日期可选
              return true;
            }
            if (
              this.disabledDate === "greaterEqual" &&
              time.getTime() < Date.now() - 1 * 24 * 3600 * 1000
            ) {
              // 今天或今天以后的日期可选
              return true;
            }
            return false;
          },
          cellClassName: (time) => {
            let className = "";
            const mon = time.getMonth() + 1;
            const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
            const month = mon < 10 ? `0${mon}` : mon;
            const tempDate = time.getFullYear() + "-" + month + "-" + day;
            this.calenderDatas.forEach((everyDate) => {
              if (tempDate === everyDate.date) {
                className = `calender-${everyDate.color} calender-tag-${
                  everyDate.title || everyDate.color
                }`;
              }
            });
            return className;
          },
        },
        this.pickerOptions
      );
    },
  },
  watch: {
    date: {
      handler(newData) {
        // 监听日期，解决子组件改变父组件值问题
        this.newDate = newData;
      },
      immediate: true,
    },
    calenderData: {
      handler(newData) {
        // 监听日期，解决子组件改变父组件值问题
        this.calenderDatas = newData;
        this.$nextTick(() => {
          this.setTitleAttrs();
        });
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 日期选择器输入框聚焦事件
    focusInput() {
      this.$nextTick(() => {
        // 输入框聚焦后，查询日期表单年份及月份按钮元素，添加点击事件
        document
          .querySelectorAll(".el-picker-panel__icon-btn")
          .forEach((but) => but.addEventListener("click", this.monthChange));
        // 输入框聚焦后，查询月份按钮元素，添加点击事件
        document
          .querySelectorAll(".el-month-table")
          .forEach((but) => but.addEventListener("click", this.monthChange));
        this.setTitleAttrs();
      });
    },
    // 设置标题属性
    setTitleAttrs() {
      if (!this.showTag) return;
      this.calenderDatas.forEach((everyDate) => {
        if (everyDate.title) {
          this.setClassAttr({
            className: `.calender-tag-${everyDate.title}`,
            attrs: "calender-tag",
            value: everyDate.title || "",
          });
        }
      });
    },
    // 为指定类设置指定属性和值
    setClassAttr({ className, attrs, value }) {
      // 先移除所有具有指定属性元素 的属性
      document.querySelectorAll(`*[${attrs}]`).forEach((dom) => {
        dom.removeAttribute(attrs);
      });
      // 在下一帧重新添加指定属性
      this.$nextTick(() => {
        document.querySelectorAll(className).forEach((dom) => {
          dom.setAttribute(attrs, value);
        });
      });
    },
    // 选中日历月份事件，获取日历选中月份
    monthChange() {
      const date = [];
      document.querySelectorAll(".el-date-picker__header-label").forEach((label) => {
        date.push(label.innerText.replace(/[^0-9]/gi, ""));
      });
      const day = date[1] < 10 ? `0${date[1]}` : date[1];
      this.$emit("monthChange", `${date[0]}-${day}`);
      this.$nextTick(() => {
        this.setTitleAttrs();
      });
    },
    changePickerOptions() {
      const mothod = this.instPickerOptions.cellClassName;
      if (mothod) {
        mothod(this.optionsCallback)();
      }
    },
  },
};
</script>

<style lang="scss">
.el-date-table td.current:not(.disabled) span {
  color: #409eff;
  background-color: white;
}
.calender-red span {
  background-color: #ed1731 !important;
  color: white;
}
.calender-green span {
  background-color: #67c23a !important;
  color: white;
}
.calender-grey span {
  background-color: #e6a23c !important;
  color: white;
}
.calender-yellow span {
  background-color: #f4f4f5 !important;
  color: white;
}

td[calender-tag] {
  &::after {
    content: attr(calender-tag);
    position: absolute;
    top: -7px;
    right: 5px;
  }
}

.el-date-table td.today div {
  border-bottom: 3px solid #409eff;
  &::after {
    background-color: #409eff;
  }
}
</style>
<style lang="scss" scoped>
.el-picker-panel__content {
  &::v-deep .current div {
    background-color: pink;
    border: 1px solid black;
  }
}
</style>
