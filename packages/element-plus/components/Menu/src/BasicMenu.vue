<template>
  <el-menu v-bind="options.attr" v-on="options.event || {}" :ref="options.ref">
    <XMenuItem
      v-for="menuItem in options.menu"
      :key="menuItem.attr?.index"
      :options="menuItem"
    />
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuType } from "../type";
import { XMenuItem } from "..";

defineProps<{
  options: MenuType;
}>();
</script>

<style scoped lang="less"></style>
