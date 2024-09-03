<template>
  <XDescriptions v-for="opt in options" :options="opt"></XDescriptions>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { XDescriptions } from "@/sewen-ui/element-plus";
const desOptions1 = {
  attr: {
    title: "描述列表标题",
    extra: "操作区文本，显示在右上方",
    column: "4",
    size: "large",
    border: true,
  }, // 属性对象
  event: {}, // 事件对象
  ref: ref(), // 实例引用
  items: [
    {
      attr: {
        label: "标题1",
        text: "内容1",
        width: 100,
      },
      event: {},
    },
    {
      attr: {
        label: "标题2",
        text: "内容2",
        width: 100,
      },
    },
    {
      attr: {
        label: "标题3",
        text: "内容3",
        width: 100,
      },
    },
    {
      attr: {
        label: "标题4",
        text: "内容4",
        width: 100,
      },
    },
    {
      attr: {
        label: "标题5",
        text: "内容5",
        width: 100,
      },
    },
    {
      attr: {
        label: "标题6",
        text: "内容6",
        width: 100,
      },
    },
    {
      attr: {
        label: "标题7",
        text: "内容7",
        width: 100,
      },
    },
    {
      attr: {
        label: "标题8",
        text: "内容8",
        width: 100,
      },
    },
  ], // 子组件列表
};

const desOptions2 = {
  attr: {
    size: "large",
    border: true,
  }, // 属性对象
  event: {}, // 事件对象
  ref: ref(), // 实例引用
  items: [
    {
      attr: {
        label: "标题2-1",
        text: "内容2-1",
        width: 100,
      },
      event: {},
    },
  ],
};

const desOptions3 = {
  attr: {
    size: "large",
    border: true,
  }, // 属性对象
  event: {}, // 事件对象
  ref: ref(), // 实例引用
  items: [
    {
      attr: {
        label: "标题3-1",
        text: "内容3-1",
        width: 100,
      },
      event: {},
    },
    {
      attr: {
        label: "标题3-2",
        text: "内容3-2",
        width: 100,
      },
      event: {},
    },
  ],
};

const options = [desOptions1, desOptions2, desOptions3];
</script>

<style scoped lang="less"></style>
