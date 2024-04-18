<template>
  <el-card v-if="options" v-bind="options.cardAttr || {}">
    <XForm
      v-if="options.form"
      class="search-form-container"
      :options="options.form"
      @changeAfter="formChangeHandler"
    />
    <div class="search-item-container" v-if="showInputs()">
      <el-input
        placeholder="请输入关键字"
        clearable
        :prefix-icon="Search"
        @change="search"
        v-bind="getInputConfig('attr')"
        v-on="getInputConfig('event')"
      >
      </el-input>
      <el-button-group v-if="options.buttons">
        <el-tooltip
          v-for="(but, butIndex) in options.buttons"
          :key="butIndex"
          :content="but.tip"
          placement="top"
        >
          <el-button v-bind="but.attr" v-on="but.event">{{ but.text }}</el-button>
        </el-tooltip>
      </el-button-group>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { XForm } from "../../Form";
import type { SearchType } from "../type.d.ts";
import { Search } from "@element-plus/icons-vue";

const emit = defineEmits(["search"]);
const props = defineProps<{
  // 表单数据
  options: SearchType;
}>();

const showInputs = function (): boolean | undefined {
  if (props.options.hasOwnProperty("inputShow")) {
    return typeof props.options.inputShow === "boolean" ? props.options.inputShow : true;
  }
  return true;
};
const getInputConfig = function (type: string): object {
  if (
    props.options.hasOwnProperty("inputShow") &&
    typeof props.options.inputShow === "object"
  ) {
    return props.options.inputShow[type] || {};
  }
  return {};
};

/**
 * 模糊搜索
 * @param params
 */
const search = function (params: any) {
  formChangeHandler({
    prop: "keyword",
    value: params,
  });
};

interface formChangeParams {
  prop: string;
  value: any;
}
/**
 * form 数据统一修改事件
 */
const formChangeHandler = function (params: formChangeParams) {
  const { prop, value } = params;
  const formData = props.options?.mode;
  if (formData) {
    formData[prop] = value;
  }
  emit("search", formData);
};
</script>

<style scoped lang="less">
.search-form-container {
  :deep(.el-form-item__label) {
    justify-content: center;
  }
}

.search-item-container {
  display: flex;
  justify-content: flex-start;
}
</style>
