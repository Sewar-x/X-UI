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
    direction: "vertical",
    column: "4",
    size: "large",
    border: true,
  }, // 属性对象
  event: {}, // 事件对象
  ref: ref(), // 实例引用
  // titleSlot: {}, // 描述列表标题插槽配置对象或标题插槽名称（使用配置对象方式生成插槽组件）
  // defaultSlot: {}, // 默认插槽配置对象或插槽名称
  extraSlot: {
    comp: "el-button",
    attr: {
      type: "primary",
    },
    content: {
      text: "顶部操作",
    },
  }, // 	自定义操作区配置对象或者操作区插槽名称，显示在右上方
  items: [
    {
      attr: {
        label: "标题1",
      },
      event: {},
      defaultSlot: {
        comp: "el-input",
        attr: {
          width: "50px",
        },
      }, // 默认插槽配置对象或插槽名称
    },
    {
      attr: {
        text: "内容2",
      },
      labelSlot: {
        comp: "el-tag",
        content: {
          text: "标题2",
        },
      }, // 自定义标签插槽名称或标签配置对象
    },
    {
      attr: {
        label: "标题3",
      },
      defaultSlot: {
        comp: "el-select",
        attr: {
          placeholder: "项目地址",
        },
        children: [
          {
            comp: "el-option",
            attr: {
              label: "惠州",
              value: "huizhou",
            },
          },
          {
            comp: "el-option",
            attr: {
              label: "广州",
              value: "guangzhou",
            },
          },
        ],
      },
    },
    {
      attr: {
        label: "标题4",
        text: "内容4",
      },
    },
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
    {
      attr: {
        label: "标题7",
        text: "内容7",
      },
    },
    {
      attr: {
        label: "标题8",
        text: "内容8",
      },
    },
  ], // 子组件列表
};
</script>

<style scoped lang="less"></style>
