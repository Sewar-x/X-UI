<template>
  <el-col v-bind="options.colAttr">
    <el-button v-bind="options.attr" v-on="options.event || {}">
      <template #icon v-if="options.icon">
        <XIcon
          v-if="options.icon"
          :isSvgIcon="options.icon?.isSvgIcon || false"
          :name="options.icon?.name"
          :size="options.icon?.size"
          :color="options.icon?.color"
          :style="options.icon?.style"
        />
        <slot name="btnIcon"></slot>
      </template>
      <template #default>
        <BasicComponent v-if="options.content" :elementOption="options.content" />
        <slot name="btnDefault"></slot>
      </template>
      <template #loading>
        <BasicComponent v-if="options.loading" :elementOption="options.loading" />
        <slot name="btnLoading"></slot>
      </template>
    </el-button>
  </el-col>
</template>

<script setup lang="ts">
import type { ButtonType } from "../type";
import { XIcon } from "../../Icon";

defineProps<{ options: ButtonType }>();
</script>
./type
