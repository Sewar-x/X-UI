<template>
  <!-- 没有子节点，使用 el-menu-item 渲染 -->
  <el-menu-item
    v-if="!subMenu || !subMenu.length"
    v-bind="options.attr"
    v-on="options.event || {}"
  >
    <XIcon
      v-if="options.icon"
      :isSvgIcon="options.icon?.isSvgIcon || false"
      :name="options.icon?.name"
      :color="options.icon?.color"
      :size="options.icon?.size"
      :style="options.icon?.style"
    />
    <BasicComponent v-if="options.component" :options="options.component" />
    <template #title>{{ options.title }}</template>
  </el-menu-item>

  <!-- 有子节点，使用 el-sub-menu 渲染 -->
  <el-sub-menu v-else v-bind="options.attr" v-on="options.event || {}">
    <template #title>
      <XIcon
        v-if="options.icon"
        :isSvgIcon="options.icon?.isSvgIcon || false"
        :name="options.icon?.name"
        :color="options.icon?.color"
        :size="options.icon?.size"
        :style="options.icon?.style"
      />
      <span>{{ options.title }}</span>
    </template>
    <!-- 循环渲染 -->
    <XMenuItem
      v-for="(subMenuItem, index) in subMenu"
      :key="index + subMenuItem.attr?.index"
      :options="subMenuItem"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { MenuItemType } from "../type";
import { XMenuItem } from "..";
import { XIcon } from "../../Icon";

const props = defineProps<{
  options: MenuItemType;
}>();
let subMenu = computed(() => props.options.subMenu);
</script>

<style scoped lang="less"></style>
