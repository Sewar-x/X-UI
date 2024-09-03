<template>
  <BasicComponent :options="element"></BasicComponent>
</template>

<script setup lang="ts">
import { BasicComponent } from "@/sewen-ui/element-plus";

const element = {
  // 节点标签名
  comp: "ul",
  // DOM属性,用一个对象存储键值对
  attr: {
    id: "list",
  },
  // 配置项
  children: [
    { comp: "li", attr: { class: "item" }, content: "Item 1" },
    { comp: "li", attr: { class: "item" }, content: "Item 2" },
    { comp: "li", attr: { class: "item" }, content: "Item 3" },
  ],
};
</script>

<style scoped lang="less"></style>
