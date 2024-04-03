<template>
  <XBasicForm :options="createForm"></XBasicForm>
</template>

<script setup lang="ts">
import { XBasicForm } from "@/xw-ui/element-plus";
// 响应数据
let data = {
  username: "XW-UI",
  description: "an vue2/3 & react componet library",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/X-UI/",
};
// from 表单配置项
const createForm = {
  mode: data,
  attr: {
    "label-width": "30px",
  },
  itemArr: [
    [
      {
        attr: {
          prop: "username",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "description",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "place",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "remarks",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "github",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        component: {
          comp: "el-button",
          content: {
            text: "查看",
          },
          event: {
            click: function (val: any) {
              window.open(data.github);
            },
          },
        },
      },
    ],
  ],
};
</script>

<style scoped lang="less"></style>
