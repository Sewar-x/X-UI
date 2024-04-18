<template>
  <XSearch :options="seachOptions"></XSearch>
</template>

<script setup lang="ts">
import { XSearch } from "@/xw-ui/element-plus";
import { reactive } from "vue";
import { Search, Delete, Share } from "@element-plus/icons-vue";
//配送方式下拉选项
const deliverOpt = ["送货上门", "自取"].map((option) => {
  return {
    comp: "el-option",
    attr: {
      key: option,
      label: option,
      value: option,
    },
  };
});
const typeOpt = ["搜索1", "搜索2"].map((option) => {
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
  type: string;
  date: string;
  name: string;
  address: string;
  select: string;
}>({
  type: "搜索1",
  date: "2016-05-02",
  name: "王小虎",
  address: "",
  select: "送货上门",
});

const getSearchItems = (type: string): Array<object> => {
  if (type === "搜索1") {
    return reactive([
      {
        attr: {
          prop: "date",
          label: "日期",
        },
        component: {
          comp: "el-date-picker",
        },
      },
    ]);
  } else {
    return reactive([
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
        },
        component: {
          comp: "el-select",
          attr: {
            placeholder: "项目地址",
          },
          children: deliverOpt,
        },
      },
    ]);
  }
};
// 高级搜索配置项
const seachOptions = {
  cardAttr: {
    shadow: "none",
  },
  form: {
    mode: seachData,
    attr: {
      "label-width": "80px",
    },
    items: reactive([
      [
        {
          attr: {
            prop: "type",
            label: "搜索类型",
          },
          component: {
            comp: "el-select",
            attr: {
              placeholder: "搜索类型",
            },
            children: typeOpt,
          },
        },
        ...getSearchItems(seachData.type),
      ],
    ]),
  },
  inputShow: {
    attr: {
      class: "input-container",
    },
  },
  buttons: [
    {
      tip: "搜索",
      text: "搜索",
      attr: {
        type: "primary",
        icon: Search,
      },
      event: {
        click: (val: any) => {
          // 表单提交事件
          alert(`提交表单：${JSON.stringify(seachData)}`);
        },
      },
    },
    {
      tip: "分享",
      text: "分享",
      attr: {
        type: "primary",
        icon: Share,
      },
    },
    {
      tip: "删除",
      text: "删除",
      attr: {
        type: "primary",
        icon: Delete,
      },
    },
  ],
};
</script>

<style lang="less">
.input-container {
  width: 60%;
}
</style>
