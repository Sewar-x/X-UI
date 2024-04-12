<template>
  <div>
    <BasicComponent :options="element"></BasicComponent>
  </div>
</template>

<script setup lang="ts">
import { BasicComponent, XForm } from "@/xw-ui/element-plus";
// 响应数据
let data = {
  username: "XW-UI",
  description: "an vue2/3 & react componet library",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/X-UI/",
};

const formOptions = {
  mode: data,
  attr: {
    "label-width": "30px",
  },
  items: [
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

const element = {
  comp: XForm, // 注意直接传入自定义组件对象
  attr: {
    style: {
      width: "100%",
      height: "100%",
    },
    options: formOptions,
  },
};
</script>

<style scoped lang="less"></style>
