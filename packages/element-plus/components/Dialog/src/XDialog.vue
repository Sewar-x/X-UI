<template>
  <el-dialog
    v-if="options"
    v-model="options.visible.value"
    v-bind="options.attr"
    v-on="options.event || {}"
  >
    <template v-if="options.header" #header>
      <BasicComponent :options="options.header" />
    </template>
    <template v-for="dialogItem in content" :key="index">
      <XForm v-if="dialogItem.type === 'Form'" :options="dialogItem.options" />
      <XTable
        v-else-if="dialogItem.type === 'Table'"
        :options="<ContentTableType>dialogItem.options"
      />
      <BasicComponent v-else :options="dialogItem.options" />
    </template>
    <template v-if="options.footer" #footer>
      <template v-if="footerType">
        <XButton v-if="footerType === 'Button'" :options="footerOptions" />
        <XForm v-else-if="footerType === 'Form'" :options="footerOptions" />
        <BasicComponent v-else :options="footerOptions" />
      </template>
      <BasicComponent v-else :options="options.footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, isRef, defineEmits } from "vue";
import type { OptionType } from "../type";
import { XForm } from "../../Form";
import { XTable } from "../../Table";
import { XButton } from "../../Button";
import { isFunction } from "../../../utils/is.ts";
import BasicComponent from "../../BasicComponent";
const emit = defineEmits(["closeDialog"]);
const props = defineProps<{
  options: OptionType;
}>();

const content = props.options?.content ? props.options.content : [];

const footerType = props.options?.footer?.type ? props.options?.footer?.type : false;
let footerOptions: object = props?.options?.footer?.options || {};

// 根据按钮配置自动配置按钮
if (
  footerType === "Button" &&
  props.options?.footer.hasOwnProperty("fixedButton") &&
  props.options?.footer?.fixedButton
) {
  const {
    cancelCallback = null,
    comfirmCallback = null,
    options = null,
  } = props.options?.footer;
  // 固定按钮配置
  const fixedButtons = [
    {
      attr: {
        size: "default",
      },
      event: {
        click: async () => {
          if (cancelCallback && isFunction(cancelCallback)) {
            await cancelCallback();
          }
          props.options.visible.value = false;
          emit("closeDialog");
        },
      },
      text: "取消",
    },
    {
      attr: {
        size: "default",
        type: "primary",
      },
      event: {
        click: async () => {
          if (comfirmCallback && isFunction(comfirmCallback)) {
            await comfirmCallback();
          }
          props.options.visible.value = false;
          emit("closeDialog");
        },
      },
      text: "确认",
    },
  ];
  if (options && Array.isArray(options)) {
    options.unshift(fixedButtons);
    footerOptions = options;
  } else {
    footerOptions = fixedButtons;
  }
}
</script>

<style lang="less"></style>
