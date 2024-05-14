<template>
  <el-button type="primary" @click="openDialog">Open Dialog</el-button>
  <el-button @click="closeDialog">Close Dialog</el-button>
</template>

<script setup lang="ts">
import { CreateDialog } from "@/xw-ui/element-plus";
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
  username: "XW-UI",
  description: "an vue2/3 & react componet library",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/X-UI/",
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
  id: "test-table-dialog",
  visible: ref(false),
  attr: {
    title: "表格与表单弹窗",
    draggable: true,
    "close-on-click-modal": false,
  },
  content: [
    {
      type: "Table",
      options: tableOptions,
    },
    {
      type: "Form",
      options: formOptions,
    },
  ],
};

const dialogInst = CreateDialog(dialogOptions);
const openDialog = () => {
  dialogInst?.show();
};

const closeDialog = () => {
  dialogInst?.close();
};
</script>

<style scoped lang="less"></style>
