<template>
  <div>
    <XTable :options="options" @operate="operateHandler"></XTable>
  </div>
</template>

<script setup lang="ts">
import { XTable } from "@/sewen-ui/element-plus";
import { Share } from "@element-plus/icons-vue";
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
];
// 表格配置
const options = {
  data: tableData,
  pagination: false, //不使用分页模式，需要显示配置 false (默认使用分页模式)
  columns: columns,
  operations: [
    {
      text: "查看",
      icon: null,
      command: {
        name: "查看name参数",
      },
    },
    {
      text: "新增",
      command: {
        test: "新增test参数",
      },
    },
    {
      text: "编辑",
      disabled: true,
      icon: null,
      command: {
        id: "编辑id参数",
      },
    },
    {
      text: "审核",
      disabled: false,
      type: "warning",
      notGroup: true,
      command: {
        id: "审核id参数",
      },
    },
    {
      text: "删除",
      icon: null,
      command: {
        key: "编辑key参数",
      },
    },
  ],
};

// 查看处理方法
const viewHandler = (params: any) => {
  alert(`🚀 您点击查看操作,参数是:${JSON.stringify(params)}`);
};
// 新增处理方法
const addHandler = (params: any) => {
  alert(`🚀 您点击新增操作,参数是:${JSON.stringify(params)}`);
};

// 审核处理方法
const approvalHandler = (params: any) => {
  alert(`🚀 您点击审核操作,参数是:${JSON.stringify(params)}`);
};
// 删除处理方法
const delHandler = (params: any) => {
  alert(`🚀 您点击删除操作,参数是:${JSON.stringify(params)}`);
};

// 操作列统一处理函数
const operateHandler = (params: any) => {
  console.log("🚀 您点击的操作参数是:", params);
  const handlerMap = {
    查看: viewHandler,
    新增: addHandler,
    审核: approvalHandler,
    删除: delHandler,
  };
  const handler = handlerMap[params.operation as string];
  return handler(params);
};
</script>

<style scoped lang="less"></style>
