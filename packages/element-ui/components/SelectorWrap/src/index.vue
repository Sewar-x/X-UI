<template>
  <el-select
    ref="selector"
    v-model="data[item.prop]"
    class="item-inputs"
    :placeholder="placeholderFormate(item)"
    :filterable="item.filterable"
    :style="{ width: `${item.width || width || '100%'}` }"
    :collapse-tags="isCollapse(item)"
    v-bind="item.attrs"
    v-on="item.listeners"
    @change="
      eventHandler($event, {
        name: 'change',
        events: item.listeners || item.events,
        item,
      })
    "
  >
    <el-checkbox
      v-if="showCheckBox(item)"
      v-model="checkedAll"
      class="checkbox-wrapper"
      @change="($event) => checkboxChange($event, item)"
    >
      {{ item.checkboxLabel || "全选" }}
    </el-checkbox>
    <el-option
      v-for="option in getOptions(item)"
      :key="option.id"
      ref="selectorOptions"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
      class="selector-options"
    >
      <slot v-if="option.slot === true">
        <template>
          <span class="selector-option-label">{{ option.label }}</span>
          <span class="selector-option-remark">{{ option.remark }}</span>
        </template>
      </slot>
    </el-option>
  </el-select>
</template>
<script>
import {
  placeholderFormate,
  eventHandler,
} from "@/xw-ui/element-ui/components/FormWrap/src/config.js";
import { isDefined } from "@/xw-ui/element-ui/utils";
export default {
  name: "SelectorWrap",
  props: {
    // 选择器配置项
    item: {
      type: Object,
      default: () => {},
    },
    // 表单数据
    data: {
      type: Object,
      default: () => {},
    },
    // 选择器宽度
    width: {
      type: String,
      default: "",
    },
    // 初始是否为全选状态
    checkAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkedAll: false,
    };
  },
  watch: {
    item: {
      handler(val) {
        this.initCheckAll();
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
  methods: {
    placeholderFormate,
    eventHandler,
    // 初始化全选状态
    initCheckAll() {
      if (
        !this.checkAll ||
        !this.item?.attrs?.multiple ||
        this.item?.optionList?.length === 0 ||
        this.checkedAll
      )
        return;
      let { optionList, prop } = this.item;
      if (typeof optionList === "function") {
        optionList = optionList();
      }
      this.checkedAll = this.checkAll;
      const checked = optionList.map((opt) => opt.value);
      this.eventHandler(checked, {
        name: "change",
        events: this.item.listeners || this.item.events,
        item: this.item,
      });
    },
    // checkboxChange
    checkboxChange(value, item) {
      // 非多选情况下不显示全选 checkbox
      if (!item?.attrs?.multiple) return;
      let { optionList, prop } = item;
      if (typeof optionList === "function") {
        optionList = optionList();
      }
      if (value) {
        // 选择全选时，重新查询列表匹配的字段
        const query = this.$refs.selector.query;
        this.data[prop] = [];
        optionList.map((item) => {
          if (item.label.indexOf(query) > -1) {
            this.data[prop].push(item.value);
          }
        });
      } else {
        this.data[prop] = [];
      }
      this.eventHandler(this.data[prop], {
        name: "change",
        events: item.listeners || item.events,
        item,
      });
    },
    // 多选是否折叠
    isCollapse(item) {
      if (!item?.attrs) return false;
      const hasCollapseTagsProperty =
        item?.attrs.hasOwnProperty("collapseTags") ||
        item?.attrs.hasOwnProperty("collapse-tags");
      if (hasCollapseTagsProperty) {
        return item?.attrs.collapseTags || item?.attrs["collapse-tags"];
      }
      if (isDefined(item.attrs["collapse-tags"])) {
        return item.attrs["collapse-tags"];
      } else {
        return item.attrs.multiple;
      }
    },
    showCheckBox(item) {
      return item.attrs && item.attrs.multiple && item.optionList;
    },
    getOptions(item) {
      let { optionList, prop } = item;
      if (typeof optionList === "function") {
        optionList = optionList();
      }
      return optionList;
    },
  },
};
</script>
<style lang="scss" scoped>
.checkbox-wrapper {
  margin: 0 0 5px 20px;
}
</style>
