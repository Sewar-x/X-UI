<template>
  <XBasicForm :options="createForm"></XBasicForm>
</template>

<script setup lang="ts">
import { XBasicForm } from "@xw-ui/xw-element-plus";
// 响应数据
let obj = {
  username: "kooriookami",
  telephone: "18100000000",
  place: "Suzhou",
  remarks: "School",
  address: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
};
// from 表单配置项
const createForm = {
  mode: obj,
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
          prop: "telephone",
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
          prop: "address",
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
            text: "测试",
          },
          event: {
            submit: function (val: any) {},
          },
        },
      },
    ],
  ],
};
</script>

<style scoped lang="less"></style>
