<template>
  <XSearch :options="seachOptions" @search="searchHandler"></XSearch>
</template>

<script setup lang="ts">
import { XSearch } from "@/sewen-ui/element-plus";
import { reactive } from "vue";
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
    button: [
      {
        tip: "过滤",
        text: "过滤",
        attr: {
          type: "primary",
          icon: Share,
        },
      },
    ],
  },
};
// 搜索事件
const searchHandler = (val: any) => {
  alert(`搜索事件: ${JSON.parse(JSON.stringify(val))}`);
};
</script>

<style lang="less">
.input-container {
  width: 50%;
}
</style>
