<template>
  <XDescriptions :options="desOptions"></XDescriptions>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { XDescriptions } from "@/sewen-ui/element-plus";
const desOptions = {
  attr: {
    title: "描述列表标题",
    extra: "操作区文本，显示在右上方",
    column: "4",
    size: "large",
    border: true,
  }, // 属性对象
  event: {}, // 事件对象
  ref: ref(), // 实例引用
  itemLabelWidth: 100, // 所有描述列表的统一宽度
  items: [
    [
      {
        attr: {
          label: "标题1",
          text: "内容1",
        },
        event: {},
      },
      {
        attr: {
          label: "标题2",
          text: "内容2",
        },
      },
      {
        attr: {
          label: "标题3",
          text: "内容3",
        },
      },
    ],
    [
      {
        attr: {
          label: "标题4",
          text: "内容4",
        },
      },
    ],
    [
      {
        attr: {
          label: "标题5",
          text: "内容5",
        },
      },
      {
        attr: {
          label: "标题6",
          text: "内容6",
        },
      },
    ],
    [
      {
        attr: {
          label: "标题7",
          text: "内容7",
        },
      },
    ],
    [
      {
        attr: {
          label: "标题8",
          text: "内容8",
        },
      },
    ],
  ], // 子组件列表
};
</script>

<style scoped lang="less"></style>
