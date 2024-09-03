<template>
  <XForm :options="options">
    <template #formItemRemarksLabelSlot="items">
      <el-tag type="danger" effect="plain"> 标签插槽 </el-tag>
      <div>这是传入插槽：{{ items.items.attr.label }}</div>
    </template>
    <template #labelSlot="items">
      <el-tag type="warning" effect="plain"> {{ items.data }} </el-tag>
    </template>
    <template #formItemStartSlot>
      <div>
        <span>评分内容插槽: </span>
        <el-rate v-model="data.start" size="large" />
      </div>
    </template>
  </XForm>
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
        slot: "labelSlot",
        labelSlot: "formItemRemarksLabelSlot", //该插槽内容会将配置项目内容覆盖
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "github",
          label: "GitHub",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          prop: "start",
          label: "评分",
        },
        slot: "formItemStartSlot", //该插槽内容会将配置项目内容覆盖
      },
    ],
    [
      {
        span: 2,
        component: {
          comp: "el-button",
          attr: {
            size: "mini",
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
      {
        span: 2,
        component: {
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
