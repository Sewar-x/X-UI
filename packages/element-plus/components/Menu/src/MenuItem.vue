<template>
  <!-- 没有子节点，使用 el-menu-item 渲染 -->
  <el-menu-item
    v-if="!menuItemInfo.items || !menuItemInfo.items.length"
    v-bind="menuItemInfo.attr"
    v-on="menuItemInfo.event || {}"
  >
    <XIcon
      v-if="menuItemInfo.icon?.name"
      :isSvgIcon="menuItemInfo.icon?.isSvgIcon || false"
      :name="menuItemInfo.icon?.name"
      :color="menuItemInfo.icon?.color"
      :size="menuItemInfo.icon?.size"
      :style="menuItemInfo.icon?.style"
    />
    <template #title>{{ menuItemInfo.text }}</template>
  </el-menu-item>

  <!-- 有子节点，使用 el-sub-menu 渲染 -->
  <el-sub-menu v-else v-bind="menuItemInfo.attr" v-on="menuItemInfo.event || {}">
    <template #title>
      <XIcon
        v-if="menuItemInfo.icon?.name"
        :isSvgIcon="menuItemInfo.icon?.isSvgIcon || false"
        :name="menuItemInfo.icon?.name"
        :color="menuItemInfo.icon?.color"
        :size="menuItemInfo.icon?.size"
        :style="menuItemInfo.icon?.style"
      />
      <span>{{ menuItemInfo.text }}</span>
    </template>
    <!-- 循环渲染 -->
    <MenuItem
      v-for="(subMenuItem, index) in menuItemInfo.items"
      :key="index + subMenuItem.attr?.index"
      :menuItemInfo="subMenuItem"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
import type { MenuItemType } from "../type";
import { MenuItem } from "..";
import { XIcon } from "../../Icon";

defineProps<{
  menuItemInfo: MenuItemType;
}>();
</script>

<style scoped lang="less"></style>
