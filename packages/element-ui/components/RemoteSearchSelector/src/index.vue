<template>
  <el-select
    :value="bindValue"
    v-bind="$attrs"
    filterable
    remote
    reserve-keyword
    :loading="loading"
    :remote-method="remoteMethodDebounce"
    v-on="$listeners"
    @change="remoteChange"
    @remove-tag="removeTag"
    @clear="clear"
  >
    <el-checkbox
      v-if="$attrs.multiple && options.length > 1"
      class="checkbox-wrapper"
      @change="checkboxChange"
    >
      全选
    </el-checkbox>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <!-- 判断是否有插槽 -->
      <div v-if="item.slot" class="selector-options">
        <span class="selector-label">{{ item.label }}</span>
        <span class="selector-remark">{{ item.remark }}</span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { formateOptions, debounce } from "@/sewen-ui/element-ui/utils/index.js";
export default {
  name: "RemoteSearchSelector",
  model: {
    prop: "value", // 子组件 v-model 绑定的属性
    event: "change", // 子组件 v-model 触发的事件
  },
  props: {
    formates: {
      // 下拉选项格式化参数
      type: Object,
      default: function () {
        return {
          labelKey: "title", // 格式化 label 的key
          valueKey: "id", // 格式化 value 的key
          level: 1,
          remarkKey: null,
        };
      },
    },
    initValue: {
      // 绑定值
      type: [String, Number, Array],
      default: null,
    },
    // 远程搜索初始显示值
    showValue: {
      type: [String, Array],
      default: null,
    },
    remoteMethods: {
      // 远程方法
      type: Function,
      default: null,
    },
    // 防抖时间间隔
    debounce: {
      type: [Number, String],
      default: 500,
    },
  },
  data() {
    return {
      remoteSearchMethod: null,
      options: [],
      loading: false,
      formateParams: this.formates,
      bindValue: null, // 组件绑定值，用于显示 label
      values: null, // 组件 value 值, 用于传给后端的 id 数组
      initValueObj: {}, // 初始值 key 和 value对象，用于查找删除 tag 的 value 值
    };
  },
  watch: {
    remoteMethods: {
      handler(val) {
        if (!val) return;
        this.remoteSearchMethod = val;
      },
      deep: true,
      immediate: true,
    },
    showValue: {
      handler(val) {
        if (!val) {
          this.bindValue = null;
          return;
        }
        this.initDatas();
      },
      immediate: true,
    },
  },
  mounted() {
    this.initDatas();
  },
  methods: {
    //
    initDatas() {
      if (!this.$attrs.multiple) {
        this.bindValue = this.showValue;
      } else {
        // 初始化组件绑定显示值
        this.bindValue = this.showValue || [];
        this.values = this.initValue || [];
        this.showValue &&
          this.showValue.map((label, index) => {
            this.initValueObj[label] = this.initValue[index];
          });
      }
    },
    // 远程搜索处理方法
    async remoteMethodWrap(query) {
      if (!this.remoteSearchMethod) return;
      if (query !== "") {
        if (query.length > 30) {
          this.$onlyMessage.error("输入字符长度不能超过 30 个字符");
          return false;
        }
        this.loading = true;
        const { data } = await this.remoteSearchMethod({ keyword: query });
        const {
          labelKey = "title",
          valueKey = "id",
          level = 1,
          remarkKey,
        } = this.formates;
        this.options = formateOptions(data, labelKey, valueKey, level, remarkKey);
      } else {
        this.options = [];
      }
      this.loading = false;
    },
    remoteMethodDebounce: debounce(
      async function (query) {
        if (!this.remoteSearchMethod) return;
        if (query !== "") {
          this.loading = true;
          const { data } = await this.remoteSearchMethod({ keyword: query });
          const {
            labelKey = "title",
            valueKey = "id",
            level = 1,
            remarkKey,
          } = this.formates;
          this.options = formateOptions(data, labelKey, valueKey, level, remarkKey);
        } else {
          this.options = [];
        }
        this.loading = false;
      },
      800,
      true
    ),
    // 改变远程搜索组件内容
    remoteChange(value) {
      if (this.$attrs.multiple) {
        // 多选处理:bindValu为远程搜索回显值，传入值长度大于回显值长度，则将新增内容加入回显值
        if (value && this.bindValue && value.length > this.bindValue.length) {
          // 获取新增数据
          const addValue = value.pop();
          // 传入后端的值中已包含新增数据，返回
          if (this.values.indexOf(addValue) > -1) return;
          // 从选项中查找新增数据对象
          const addObj = this.options.filter((item) => item.value === addValue);
          const addLabel = addObj && addObj[0] && addObj[0].label;
          this.bindValue.push(addLabel); // 回显值中添加新增数据对象的 label
          this.values.push(addValue); // 传入后端的值中添加新增数据对象的 value
          this.initValueObj[addLabel] = addValue; // initValueObj 初始化对象中添加新增数据对象
          this.$emit("valueChange", this.values); // 触发事件，返回新增数据的 value
          this.$emit("labelChange", this.bindValue); // 触发事件，返回新增数据的 label
          this.$emit("selected", addObj && addObj[0]); // 触发事件，返回新增数据对象
        }
      } else {
        // 单选处理
        this.values = value;
        // 从选项中查找新增数据对象
        const addObj = this.options.filter((item) => item.value === value);
        this.bindValue = addObj && addObj[0] && addObj[0].label;
        this.$emit("valueChange", this.values); // 触发事件，返回新增数据的 value
        this.$emit("labelChange", this.bindValue); // 触发事件，返回新增数据的 label
        this.$emit("selected", addObj && addObj[0]); // 触发事件，返回新增数据对象
      }
    },
    // 删除数据
    removeTag(value) {
      if (this.$attrs.multiple) {
        // 多选处理
        if (this.bindValue instanceof Array) {
          // 过滤获取删除后剩余的显示数据
          this.bindValue = this.bindValue.filter((item) => item !== value);
          this.values = this.bindValue.map((label) => {
            return this.initValueObj[label];
          });
          this.$emit("valueChange", this.values);
          this.$emit("labelChange", this.bindValue);
        }
      } else {
        // 单选处理
        this.values = null;
        this.bindValue = null;
        this.$emit("valueChange", this.values);
        this.$emit("labelChange", this.bindValue);
      }
    },
    // 清空数据
    clear() {
      if (this.$attrs.multiple) {
        // 多选处理
        if (this.bindValue instanceof Array) {
          // 过滤获取删除后剩余的显示数据
          this.bindValue = [];
          this.values = [];
          this.$emit("valueChange", this.values);
          this.$emit("labelChange", this.bindValue);
          this.$emit("selected", []);
        }
      } else {
        // 单选处理
        this.values = null;
        this.bindValue = null;
        this.$emit("valueChange", this.values);
        this.$emit("labelChange", this.bindValue);
        this.$emit("selected", null);
      }
    },
    // checkboxChange
    checkboxChange(value) {
      if (value) {
        this.bindValue = [];
        this.values = [];
        this.options.map((item) => {
          this.bindValue.push(item.label); // 回显值中添加新增数据对象的 label
          this.values.push(item.value); // 传入后端的值中添加新增数据对象的 value
        });
        this.$emit("valueChange", this.values);
        this.$emit("labelChange", this.bindValue);
        this.$emit("selected", this.options);
      } else {
        this.clear();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selector-options {
  display: flex;
  justify-content: start;

  .selector-label {
    max-width: 200px;
    min-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .selector-remark {
    color: #8492a6;
    font-size: 12px;
  }
}

.checkbox-wrapper {
  margin: 0 0 5px 20px;
}
</style>
