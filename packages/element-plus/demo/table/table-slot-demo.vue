<template>
  <div>
    <XTable :options="options" @page-change="pageChange">
      <!--头部插槽-->
      <template #nameHeaderSlot="{ header }">
        <el-tag type="primary"> {{ header.attr.label }}</el-tag>
      </template>
      <!--列内容插槽-->
      <template #nameSlot="{ row, columns }">
        <el-tag type="primary"> {{ row.name }}</el-tag>
      </template>
      <template #addressSlot="{ row, columns }">
        <el-input v-model="row.address" />
      </template>
      <template #deliverySlot="{ row, columns }">
        <el-select v-model="row.delivery" placeholder="Select">
          <el-option
            v-for="item in deliveryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #operateSlot="{ row, columns }">
        <el-button type="primary" size="small">提交</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
      <!--表格末尾插槽-->
      <template #appendSlot="{ options }">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="50" />
      </template>
      <!--空状态插槽-->
      <template #emptySlot="{ options }">
        <el-empty description="没有数据了" />
      </template>
    </XTable>
  </div>
</template>

<script setup lang="ts">
import { XTable } from "@/xw-ui/element-plus";
const deliveryOptions = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
// 表格数据
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
    delivery: "送货上门",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    delivery: "自取",
  },
];

//  分页配置
const data = {
  currentPage: 1,
  data: tableData,
  pageSize: 20,
  total: 25,
};

// 表格列配置
const tableColumns = [
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
    headerSlot: "nameHeaderSlot",
    defaultSlot: "nameSlot",
  },
  {
    attr: {
      prop: "address",
      label: "地址",
    },
    defaultSlot: "addressSlot",
  },
  {
    attr: {
      prop: "delivery",
      label: "配送方式",
    },
    defaultSlot: "deliverySlot",
  },
  {
    attr: {
      prop: "",
      label: "操作",
    },
    defaultSlot: "operateSlot",
  },
];

const options = {
  data: data,
  pagination: {
    attr: {
      background: true,
    },
  }, // 分页配置
  columns: tableColumns,
  appendSlot: "appendSlot",
  emptySlot: "emptySlot",
};

const pageChange = (currentPage: number, pageSize: number) => {
  console.log(`🚀当前页面：${currentPage}, 页面大小：${pageSize}`);
};
</script>

<style scoped lang="less"></style>
