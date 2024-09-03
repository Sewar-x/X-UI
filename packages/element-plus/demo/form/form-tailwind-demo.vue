<template>
  <XForm :options="options"></XForm>
</template>

<script setup lang="ts">
import { XForm } from "@/sewen-ui/element-plus";
import { reactive } from "vue";
import type { FormRules } from "element-plus";
interface RuleForm {
  username: string;
  description: string;
  place: string;
  remarks: string;
  github: string;
  start: boolean;
}

// 响应数据
let data = reactive<RuleForm>({
  username: "sewen-ui",
  description: "an vue2/3 & react componet library",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/sewen-ui/",
  start: true,
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "Please input  name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  description: [
    {
      required: true,
      message: "Please input description",
      trigger: "change",
    },
  ],
  place: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  remarks: [
    {
      required: true,
      message: "Please input a remarks",
      trigger: "change",
    },
  ],
  github: [
    {
      required: true,
      message: "Please input github",
      trigger: "change",
    },
  ],
  start: [
    {
      required: true,
      message: "Please input github",
      trigger: "change",
    },
  ],
});
// from 表单配置项
const options = {
  mode: data,
  attr: {
    "label-width": "auto",
    rules: rules,
  },
  items: [
    [
      {
        attr: {
          // 使用 Tailwind CSS: 背景颜色
          class: "bg-slate-200 hover:bg-slate-300",
          prop: "username",
          label: "项目名称",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          // 使用 Tailwind CSS: 字体加粗
          class: "font-extrabold",
          prop: "description",
          label: "项目描述",
        },
        component: {
          comp: "el-input",
          attr: {
            type: "textarea",
          },
        },
      },
    ],
    [
      {
        attr: {
          // 使用 Tailwind CSS: 模糊
          class: "blur-sm",
          prop: "place",
          label: "项目地址",
        },
        component: {
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
    ],
    [
      {
        attr: {
          prop: "remarks",
          label: "标签",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          // 使用 Tailwind CSS:阴影
          class: "drop-shadow-xl",
          prop: "github",
          label: "GitHub",
        },
        component: {
          comp: "el-input",
        },
      },
      {
        span: 3,
        attr: {
          class: "scale-150",
          prop: "start",
          label: "关注",
        },
        component: {
          comp: "el-switch",
        },
      },
      {
        span: 2,
        component: {
          comp: "el-button",
          attr: {
            // 使用 Tailwind CSS: 放大
            class: "hover:scale-150",
            size: "mini",
            type: "primary",
          },
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
    [
      {
        span: 4,
        component: {
          attr: {
            // 使用 Tailwind CSS: 旋转动画、放大
            class: "animate-spin scale-125",
          },
          comp: "el-button",
          content: {
            text: "提交",
          },
          event: {
            submit: (val: any) => {
              // 表单提交事件
              alert(`提交表单：${JSON.stringify(val)}`);
            },
          },
        },
      },
    ],
  ],
};
</script>

<style scoped lang="less"></style>
