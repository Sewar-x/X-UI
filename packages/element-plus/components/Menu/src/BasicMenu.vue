<template>
  <el-menu v-bind="options.attr" v-on="options.event || {}" :ref="options.ref">
    <MenuItem
      v-for="(menuItem, index) in options.items"
      :key="index + menuItem.attr?.index"
      :menuItemInfo="menuItem"
    />
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuType } from "../type";
import { MenuItem } from "..";

defineProps<{
  options: MenuType;
}>();
</script>

<style scoped lang="less"></style>
