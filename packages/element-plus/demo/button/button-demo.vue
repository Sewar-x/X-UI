<template>
  <div>
    <p>单个按钮</p>
    <XButton :options="buttonOptions">测试按钮</XButton>
    <br />
    <br />
    <br />
    <p>多个按钮</p>
    <XButton v-for="(opt, index) in multOpions" :key="opt" :options="opt"
      >按钮{{ index + 1 }}
    </XButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { XButton } from "@/xw-ui/element-plus";
import { Share } from "@element-plus/icons-vue";
const buttonOptions = {
  attr: {
    size: "default",
    type: "primary",
  },
  event: {
    click: () => {
      alert("您点击了按钮！");
    },
  },
  colAttr: {
    span: 24,
  },
  icon: {
    name: Share,
  },
};
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
      type: "success",
    },
    event: {
      click: () => {
        alert("您点击了按钮2！");
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
      type: "info",
    },
    event: {
      click: () => {
        alert("您点击了按钮3！");
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
      type: "warning",
    },
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
    event: {
      click: () => {
        alert("您点击了按钮5！");
      },
    },
    colAttr: {
      span: 4,
    },
    icon: {
      name: Share,
    },
  },
];
</script>
