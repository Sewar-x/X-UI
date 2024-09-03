<template>
  <el-button type="primary" @click="openForm1Dialog">打开 Form1 </el-button>
  <el-button type="primary" @click="openForm2Dialog">打开 Form2 </el-button>
  <el-button type="primary" @click="openTableDialog">打开 table </el-button>
</template>

<script setup lang="ts">
import { CreateDialog } from "@/sewen-ui/element-plus";
import { ref, reactive } from "vue";

interface RuleForm1 {
  username: string;
  description: string;
  place: string;
  remarks: string;
  github: string;
  start: boolean;
}
interface RuleForm2 {
  blog: string;
  author: string;
  start: boolean;
}
// 响应数据
let form1Data = reactive<RuleForm1>({
  username: "sewen-ui",
  description: "an vue2/3 & react componet library",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/sewen-ui/",
  start: true,
});

let form2Data = reactive<RuleForm2>({
  blog: "Sewen Blog",
  github: "https://sewar-x.github.io/myblog/",
  projectstart: true,
});
// from1 表单配置项
const form1Options = {
  mode: form1Data,
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
        span: 4,
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
              window.open(form1Data.github);
            },
          },
        },
      },
    ],
  ],
};

// from2 表单配置项
const form2Options = {
  mode: form2Data,
  attr: {
    "label-width": "auto",
  },
  items: [
    [
      {
        attr: {
          prop: "blog",
          label: "博客名称",
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
    ],
    [
      {
        attr: {
          prop: "start",
          label: "关注",
        },
        component: {
          comp: "el-switch",
        },
      },
    ],
    [
      {
        span: 24,
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
              window.open(form2Data.github);
            },
          },
        },
      },
    ],
  ],
};

// 表格数据
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
    select: "送货上门",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
    select: "自取",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
    select: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    select: "自取",
  },
];
// 表格列配置
const columns = [
  {
    attr: {
      prop: "date",
      label: "日期",
    },
  },
  {
    attr: {
      prop: "name",
      label: "姓名",
    },
  },
  {
    attr: {
      prop: "address",
      label: "地址",
    },
    defaultSlot: {
      comp: "el-input",
    },
  },
  {
    attr: {
      prop: "select",
      label: "配送方式",
    },
    defaultSlot: {
      comp: "el-select",
      attr: {
        placeholder: "Select",
        size: "default",
      },
      children: ["送货上门", "自取"].map((option) => {
        return {
          comp: "el-option",
          attr: {
            key: option,
            label: option,
            value: option,
          },
        };
      }),
      event: {
        change: function (currentRowData: any, val: any) {
          console.log(`🚀 ~ 您选中的行数据是 ${currentRowData}, 选中的值是 ${val}`);
        },
      },
    },
  },
  {
    attr: {
      prop: "",
      label: "操作",
      width: "150",
    },
    defaultSlot: [
      {
        comp: "el-button",
        attr: {
          type: "primary",
          size: "small",
        },
        content: {
          text: "提交",
        },
        event: {
          click: function (currentRowData: any) {
            alert(`🚀 ~ 您提交的行数据是 ${currentRowData}`);
          },
        },
      },
      {
        comp: "el-button",
        attr: {
          type: "danger",
          size: "small",
        },
        content: {
          text: "删除",
        },
        event: {
          click: function (currentRowData: any) {
            alert(`🚀 ~ 您删除的行数据是  ${currentRowData}`);
          },
        },
      },
    ],
  },
];
// 表格配置
const tableOptions = {
  data: tableData,
  pagination: false, //不使用分页模式，需要显示配置 false (默认使用分页模式)
  columns: columns,
};

const dialogOptions = {
  id: "test-dialog",
  visible: ref(false),
  attr: {
    title: "内容动态弹窗",
    draggable: true,
    "close-on-click-modal": false,
  },
  content: [],
};

// 创建弹窗
const dialogInst = CreateDialog(dialogOptions);
// 打开 form1 弹窗内容
const openForm1Dialog = () => {
  // 重置弹窗内容
  dialogInst?.resetContent([
    {
      type: "Form",
      options: form1Options,
    },
  ]);
  dialogInst?.show();
};

const openForm2Dialog = () => {
  // 重置弹窗内容
  dialogInst?.resetContent([
    {
      type: "Form",
      options: form2Options,
    },
  ]);
  dialogInst?.show();
};

const openTableDialog = () => {
  // 重置弹窗内容
  dialogInst?.resetContent([
    {
      type: "Table",
      options: tableOptions,
    },
  ]);
  dialogInst?.show();
};
</script>

<style scoped lang="less"></style>
