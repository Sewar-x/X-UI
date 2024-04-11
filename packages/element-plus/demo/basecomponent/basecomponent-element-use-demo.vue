<template>
  <BasicComponent :options="textarea"></BasicComponent>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BasicComponent } from "@/xw-ui/element-plus";
const inputValue = ref("输出框初始值");
const textarea = {
  comp: "div",
  children: [
    {
      // 节点标签名
      comp: "el-input",
      data: inputValue,
      // DOM属性,用一个对象存储键值对
      attr: {
        style: "width: 240px",
        autosize: true,
        type: "textarea",
        placeholder: "Please input",
      },
    },
    {
      // 节点标签名
      comp: "el-button",
      content: "提交",

      // DOM属性,用一个对象存储键值对
      attr: {
        type: "primary",
      },
      event: {
        click: () => {
          alert(`您输入的值是${inputValue.value}`);
        },
      },
    },
  ],
};
</script>

<style scoped lang="less"></style>
