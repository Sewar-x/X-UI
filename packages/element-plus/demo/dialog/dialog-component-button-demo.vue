<template>
  <el-button type="primary" @click="openDialog">Open Dialog</el-button>
  <XDialog :options="dialogOptions"></XDialog>
</template>

<script setup lang="ts">
import { XDialog } from "@/sewen-ui/element-plus";
import { ref, reactive } from "vue";

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
// from 表单配置项
const formOptions = {
  mode: data,
  attr: {
    "label-width": "auto",
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
      {
        attr: {
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
    ],
  ],
};

const dialogOptions = {
  visible: ref(false),
  attr: {
    title: "基础弹窗",
    draggable: true,
  },
  content: [
    {
      type: "Form",
      options: formOptions,
    },
  ],
  footer: {
    // 配置底部插槽
    type: "Button", // 配置底部类型为按钮
    fixedButton: true, // 使用固定按钮
    cancelCallback: () => {
      // 取消操作回调
      alert("您点击了取消按钮！");
      setTimeout(() => {
        console.log("=======取消按钮=========", dialogOptions.visible.value);
      }, 1000);
    },
    comfirmCallback: () => {
      // 确定操作回调
      alert("您点击了提交按钮！");
      setTimeout(() => {
        console.log("=======提交按钮=========", dialogOptions.visible.value);
      }, 1000);
    },
  },
};

const openDialog = () => {
  console.log("=====openDialog========");
  dialogOptions.visible.value = true;
};
</script>

<style scoped lang="less"></style>
