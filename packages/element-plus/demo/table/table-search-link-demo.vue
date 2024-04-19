<template>
  <div>
    <XTable :options="options" @search="advanceSearch"></XTable>
  </div>
</template>

<script setup lang="ts">
import { XTable } from "@/xw-ui/element-plus";
import { reactive } from "vue";

//下拉选项
const selectOpt = ["送货上门", "自取"].map((option) => {
  return {
    comp: "el-option",
    attr: {
      key: option,
      label: option,
      value: option,
    },
  };
});
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
      children: selectOpt,
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
            console.log(`🚀 ~ 您提交的行数据是 `, currentRowData);
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
            console.log(`🚀 ~ 您删除的行数据是 `, currentRowData);
          },
        },
      },
    ],
  },
];

// 高级搜索初始数据
let seachData = reactive<{
  date: string;
  name: string;
  address: string;
  select: string;
}>({
  date: "2016-05-02",
  name: "王小虎",
  address: "",
  select: "送货上门",
});

// 高级搜索配置项
const seachOptions = {
  cardAttr: {
    shadow: "none",
  },
  form: {
    mode: seachData,
    blurSearch: false, // 是否失去焦点时触发搜索
    attr: {
      "label-width": "auto",
    },
    items: [
      [
        {
          attr: {
            prop: "date",
            label: "日期",
          },
          component: {
            comp: "el-date-picker",
          },
        },

        {
          attr: {
            prop: "name",
            label: "姓名",
          },
          component: {
            comp: "el-input",
          },
        },

        {
          attr: {
            prop: "select",
            label: "配送方式",
            "label-width": "70px",
          },
          component: {
            comp: "el-select",
            attr: {
              placeholder: "项目地址",
            },
            children: selectOpt,
          },
        },
      ],
    ],
  },
  inputShow: {
    attr: {
      class: "input-container",
    },
  },
  buttons: {
    search: true, // 显示搜索框搜索按钮
    clear: true, // 显示清除搜索按钮
    columnFilter: true, // 显示列筛选按钮
    fixColFilter: true, // 固定列筛选按钮
  },
};
// 表格配置
const options = {
  data: tableData,
  seach: seachOptions,
  pagination: false, //不使用分页模式，需要显示配置 false (默认使用分页模式)
  columns: columns,
};

const advanceSearch = (params: any) => {
  console.log("🚀 ~ advanceSearch ~ params:", params);
};
</script>

<style scoped lang="less"></style>
