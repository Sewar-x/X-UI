<template>
  <el-button type="primary" @click="openDialog">Open Dialog</el-button>
  <el-button @click="closeDialog">Close Dialog</el-button>
</template>

<script setup lang="ts">
import { CreateDialog } from "@/sewen-ui/element-plus";
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
  id: "test-dialog",
  visible: ref(false),
  attr: {
    title: "基础弹窗",
    draggable: true,
    modal: false,
    "close-on-click-modal": false,
  },
  content: [
    {
      type: "Form",

      options: formOptions,
    },
  ],
};

// 创建弹窗
const dialogInst = CreateDialog(dialogOptions);
const openDialog = () => {
  dialogInst?.show();
};

const closeDialog = () => {
  dialogInst?.close();
};
</script>

<style scoped lang="less"></style>
