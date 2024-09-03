<template>
  <div>
    <XButton :options="multOpions"></XButton>
  </div>
</template>

<script setup lang="ts">
import { XButton } from "@/sewen-ui/element-plus";
import { ArrowLeft, ArrowRight, Delete, Edit, Share } from "@element-plus/icons-vue";

const multOpions = [
  {
    attr: {
      size: "default",
      type: "primary",
    },
    event: {
      click: () => {
        alert("您点击了按钮1！");
      },
    },
    text: "按钮1",
    colAttr: {
      span: 4,
    },
    icon: {
      name: ArrowLeft,
    },
  },
  {
    attr: {
      size: "default",
      type: "success",
    },
    event: {
      click: () => {
        alert("您点击了按钮2！");
      },
    },
    text: "按钮2",
    colAttr: {
      span: 4,
    },
    icon: {
      name: Delete,
    },
  },
  {
    attr: {
      size: "default",
      type: "info",
    },
    text: "按钮3",
    event: {
      click: () => {
        alert("您点击了按钮3！");
      },
    },
    colAttr: {
      span: 4,
    },
    icon: {
      name: Edit,
    },
  },
  {
    attr: {
      size: "default",
      type: "warning",
    },
    text: "按钮4",
    event: {
      click: () => {
        alert("您点击了按钮4！");
      },
    },
    colAttr: {
      span: 4,
    },
    icon: {
      name: Share,
    },
  },
  {
    attr: {
      size: "default",
      type: "danger",
    },
    text: "按钮5",
    event: {
      click: () => {
        alert("您点击了按钮5！");
      },
    },
    colAttr: {
      span: 4,
    },
    icon: {
      name: ArrowRight,
    },
  },
];
</script>
