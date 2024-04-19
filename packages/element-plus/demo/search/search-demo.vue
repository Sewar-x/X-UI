<template>
  <XSearch :options="seachOptions" @search="searchHandler"></XSearch>
</template>

<script setup lang="ts">
import { XSearch } from "@/xw-ui/element-plus";
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
          span: 7,
          component: {
            comp: "el-date-picker",
          },
        },

        {
          attr: {
            prop: "name",
            label: "姓名",
          },
          span: 7,
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
          span: 8,
          component: {
            comp: "el-select",
            attr: {
              placeholder: "项目地址",
            },
            children: selectOpt,
          },
        },
        {
          span: 2,
          attr: {
            "label-width": "10%",
          },
          component: {
            comp: "el-button",
            attr: {
              type: "primary",
            },
            content: {
              text: "搜索",
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
  },
};

// 搜索事件
const searchHandler = (val: any) => {
  alert(`搜索事件: ${JSON.parse(JSON.stringify(val))}`);
};
</script>

<style scoped lang="less"></style>
