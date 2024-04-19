<template>
  <el-card v-if="options" v-bind="options.cardAttr || {}">
    <XForm
      v-if="options.form"
      class="search-form-container"
      :options="formOptions"
      @changeAfter="formBlurSearchHandler"
    />
    <div class="search-item-container" v-if="showInputs()">
      <el-input
        :placeholder="getInputConfig('attr')?.attr?.placeholder || '请输入关键字'"
        v-model="keyword"
        clearable
        :prefix-icon="Search"
        @change="search"
        v-bind="getInputConfig('attr')"
        v-on="getInputConfig('event')"
      >
      </el-input>
      <el-button-group class="buttons-group-container">
        <el-tooltip
          v-for="(but, butIndex) in getButtons()"
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
import { ref, computed, reactive, watch } from "vue";
import { XForm } from "../../Form";
import type { SearchType } from "../type.d.ts";
import { Search, Delete } from "@element-plus/icons-vue";
interface formChangeParams {
  prop: string;
  value: any;
}
const emit = defineEmits(["search"]);
const props = defineProps<{
  // 表单数据
  options: SearchType;
}>();
let keyword = ref("");
let formOptions = reactive(props.options?.form || {});

/**
 * 输入框配置项目，配置是否显示输入框
 */
const showInputs = function (): boolean | undefined {
  if (props.options.hasOwnProperty("inputShow")) {
    return typeof props.options.inputShow === "boolean" ? props.options.inputShow : true;
  }
  return true;
};

/**
 * 如果传入的输入框参数是对象，则获取输入框配置
 * 否则返回空对象
 */
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
 * 获取按钮配置
 */
const getButtons = function (): object {
  const searchBut = {
    tip: "搜索",
    text: "搜索",
    attr: {
      type: "primary",
      icon: Search,
    },
    event: {
      click: () => {
        formChangeHandler({
          prop: "keyword",
          value: keyword.value,
        });
      },
    },
  };
  const clearBut = {
    tip: "重置",
    text: "重置",
    attr: {
      type: "primary",
      icon: Delete,
    },
    event: {
      click: () => {
        clearSearchData();
      },
    },
  };
  let butsConfigs: Array<any> = [];
  if (!props.options.hasOwnProperty("buttons")) {
    return butsConfigs;
  }
  if (props.options.buttons.button) {
    butsConfigs = JSON.parse(JSON.stringify(props.options.buttons.button));
  }
  if (props.options.buttons.clear) {
    butsConfigs.unshift(clearBut);
  }
  if (props.options.buttons.search) {
    butsConfigs.unshift(searchBut);
  }
  return butsConfigs;
};

/**
 * 模糊搜索
 * @param params
 */
const search = function () {
  formChangeHandler({
    prop: "keyword",
    value: keyword.value,
  });
};

/**
 * 表单失去焦点事件
 */
const formBlurSearchHandler = function (params: formChangeParams) {
  if (
    props.options.hasOwnProperty("form") &&
    props.options.form.hasOwnProperty("blurSearch") &&
    props.options.form.blurSearch === false
  ) {
    return false;
  }
  formChangeHandler(params);
};

/**
 * form 数据统一修改事件
 */
const formChangeHandler = function (params: formChangeParams) {
  const { prop, value } = params;
  const formData = props.options?.form?.mode;
  if (formData) {
    formData[prop] = value;
  }
  emit("search", formData);
};
/**
 * 清空搜索条件
 */
const clearSearchData = function () {
  const formData = props.options?.form?.mode;
  if (formData) {
    for (let key in formData) {
      formData[key] = null;
    }
    keyword.value = null;
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

.buttons-group-container {
  margin-left: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
