<template>
  <el-col v-if="!isGroup" v-bind="options.colAttr || {}">
    <el-button v-bind="options.attr || {}" v-on="options.event || {}">
      <template #icon v-if="options.icon">
        <XIcon
          v-if="options.icon"
          :isSvgIcon="options.icon?.isSvgIcon || false"
          :name="options.icon?.name"
          :size="options.icon?.size"
          :color="options.icon?.color"
          :style="options.icon?.style"
        />
        <slot v-else name="btnIcon"></slot>
      </template>
      <template #default>
        {{ options.text }}
        <slot name="default"></slot>
      </template>
      <template #loading>
        <BasicComponent v-if="options.loading" :options="options.loading" />
        <slot v-else name="btnLoading"></slot>
      </template>
    </el-button>
  </el-col>
  <el-button-group v-else>
    <el-button
      v-for="opt in options"
      :key="opt"
      v-bind="opt.attr || {}"
      v-on="opt.event || {}"
    >
      <template #icon v-if="opt.icon">
        <XIcon
          v-if="opt.icon"
          :isSvgIcon="opt.icon?.isSvgIcon || false"
          :name="opt.icon?.name"
          :size="opt.icon?.size"
          :color="opt.icon?.color"
          :style="opt.icon?.style"
        />
        <slot v-else name="btnIcon"></slot>
      </template>
      <template #default>
        {{ opt.text }}
        <slot name="default"></slot>
      </template>
      <template #loading>
        <BasicComponent v-if="opt.loading" :options="opt.loading" />
        <slot v-else name="btnLoading"></slot>
      </template>
    </el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import type { ButtonType } from "../type";
import { XIcon } from "../../Icon";

const props = defineProps<{
  options: ButtonType | Array<ButtonType>;
}>();
const isGroup = Array.isArray(props.options);
</script>
